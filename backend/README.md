# SKS World School — Backend API

REST API for the SKS World School (Noida) website. Node.js + Express + MongoDB
(Mongoose). Serves the Next.js frontend in this repo.

- Public endpoints: submit an admission **enquiry**, submit a **contact** message,
  read **news & events** and **achievements** (paginated).
- Admin endpoints: create news / achievements (protected by a static API key).
- Security: Helmet, CORS allow-list, rate limiting on POST routes,
  NoSQL-injection sanitization, express-validator input validation, central
  error handling.

No admin UI — API only.

---

## Requirements

- **Node.js ≥ 18** (uses the built-in `fetch` in the smoke test)
- **MongoDB** — either
  - a local server (`mongod`), or
  - a free MongoDB Atlas cluster (connection string)

---

## Folder structure

```
backend/
├── server.js              # entry point — connects DB, starts HTTP server
├── app.js                 # builds the Express app (middleware + routes)
├── config/
│   ├── env.js             # loads & validates .env
│   └── db.js              # mongoose connection helpers
├── models/                # Enquiry, ContactMessage, NewsEvent, Achievement
├── middleware/            # auth (api key), validate, rateLimiter, errorHandler, notFound
├── validators/            # express-validator rule chains per resource
├── controllers/           # request handlers
├── routes/                # express routers  (index.js mounts them under /api)
├── utils/                 # asyncHandler, ApiError, paginate
└── scripts/
    ├── seed.js            # seed News & Achievements from seed-data.js
    ├── seed-data.js       # content migrated from the frontend pages
    └── smoke-test.js      # end-to-end check against a throwaway DB
```

---

## Setup

```bash
cd backend
npm install
cp .env.example .env        # then edit .env
```

### `.env`

| var | meaning |
| --- | --- |
| `NODE_ENV` | `development` \| `production` \| `test` |
| `PORT` | HTTP port (default `5000`) |
| `MONGODB_URI` | Mongo connection string |
| `CORS_ORIGIN` | comma-separated allowed frontend origins (e.g. `http://localhost:3000`) |
| `ADMIN_API_KEY` | shared secret for admin routes — sent as `x-api-key` header |
| `RATE_LIMIT_WINDOW_MINUTES` | window for the public POST limiter (default `15`) |
| `RATE_LIMIT_MAX_POST` | max public POST requests per IP per window (default `10`) |

A ready-to-use `.env` is already included for local development (Mongo on
`127.0.0.1:27017`, DB `sks_school`). **Change `ADMIN_API_KEY` before deploying.**

---

## Run

Start MongoDB first (skip if using Atlas):

```bash
# Windows (installed as a service, usually already running):
net start MongoDB
# or run a throwaway instance:
mongod --dbpath ./.mongo-data
```

Then:

```bash
npm run dev      # nodemon, restarts on change
# or
npm start        # plain node
```

Server: `http://localhost:5000` — visit `http://localhost:5000/api` for the
endpoint list, `http://localhost:5000/health` for a health check.

### Seed sample content

```bash
npm run seed         # inserts news & achievements only if those collections are empty
npm run seed:fresh   # wipes news & achievements, then re-inserts
```

Enquiries and contact messages are never touched by the seed.

### Smoke test

```bash
npm run smoke        # spins up the app against a <db>_smoke database and drops it after
```

---

## API

Base URL: `/api`. All responses are JSON:

```jsonc
// success
{ "success": true, "data": ... , "pagination": { ... } }
// error
{ "success": false, "message": "…", "errors": [ { "field": "name", "message": "…" } ] }
```

### `POST /api/enquiry` — public

Body:

| field | required | notes |
| --- | --- | --- |
| `name` | yes | 2–120 chars |
| `phone` | yes | 10–20 chars, digits / `+ - ( )` / spaces |
| `email` | no | valid email if provided |
| `grade` | no | ≤ 60 chars |
| `message` | no | ≤ 2000 chars |

`201` → `{ success, message, data: { id, date, status } }` (`status` starts as `new`).

```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H 'Content-Type: application/json' \
  -d '{"name":"Asha Verma","phone":"9876543210","email":"asha@example.com","grade":"Class I","message":"Please call back"}'
```

### `POST /api/contact` — public

Body: `name` (req), `email` (req), `mobile` (req), `message` (req). `201` on success.

```bash
curl -X POST http://localhost:5000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ravi","email":"ravi@example.com","mobile":"9876543210","message":"What are the school timings?"}'
```

### `GET /api/news` — public, paginated

Query: `page` (default 1), `limit` (default 10, max 50), `category`
(`Event`, `Workshop`, `Celebration`, `Competition`, `Trip`, `Assembly`,
`Programme`, `Announcement`, `General`). Sorted newest first.

```bash
curl 'http://localhost:5000/api/news?page=1&limit=5&category=Workshop'
```

```jsonc
{
  "success": true,
  "data": [ { "_id": "…", "title": "…", "description": "…", "images": [], "date": "…", "category": "Workshop" } ],
  "pagination": { "page": 1, "limit": 5, "total": 12, "totalPages": 3, "hasPrevPage": false, "hasNextPage": true }
}
```

### `GET /api/news/:id` — public

`200` with the document, `404` if not found, `422` if `:id` isn't a valid ObjectId.

### `GET /api/achievements` — public, paginated

Query: `page`, `limit` (max 50). Sorted newest first.
`GET /api/achievements/:id` also available.

### `POST /api/news` — admin

Header: `x-api-key: <ADMIN_API_KEY>` (or `Authorization: Bearer <ADMIN_API_KEY>`).
Body: `title` (req), `description` (req), `images` (optional string[]),
`date` (optional ISO-8601), `category` (optional, one of the list above).

```bash
curl -X POST http://localhost:5000/api/news \
  -H 'Content-Type: application/json' \
  -H "x-api-key: $ADMIN_API_KEY" \
  -d '{"title":"Annual Day 2026","description":"A grand celebration...","category":"Celebration","date":"2026-02-20"}'
```

`401` if the key is missing, `403` if it's wrong.

### `POST /api/achievements` — admin

Same auth. Body: `title` (req), `description` (req), `images` (optional string[]),
`year` (optional label like `"2024-25"`), `date` (optional ISO-8601).

---

## Data models

| model | fields |
| --- | --- |
| **Enquiry** | `name`, `phone`, `email`, `grade`, `message`, `date`, `status` (`new`\|`contacted`\|`closed`), timestamps |
| **ContactMessage** | `name`, `email`, `mobile`, `message`, `date`, timestamps |
| **NewsEvent** | `title`, `description`, `images: string[]`, `date`, `category`, timestamps |
| **Achievement** | `title`, `description`, `images: string[]`, `year` (label), `date` (optional), timestamps |

---

## Connecting the Next.js frontend

Point the frontend at this API with an env var, e.g.
`NEXT_PUBLIC_API_URL=http://localhost:5000/api`, and have the enquiry / contact
forms `POST` there. Add the deployed frontend origin(s) to `CORS_ORIGIN`.

_(The existing frontend still posts to its own Next.js route handler — wiring it
to this backend is a separate change and is intentionally not done here.)_

---

## Deployment notes

- Set real `MONGODB_URI`, `CORS_ORIGIN`, and a strong `ADMIN_API_KEY`.
- Set `NODE_ENV=production` (hides stack traces, enables `trust proxy` for the
  first hop so rate limiting sees the real client IP).
- Run `npm start` (or a process manager / container). `npm run seed` once.
