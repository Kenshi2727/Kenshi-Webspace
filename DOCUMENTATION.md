# Tech stack to be added-

```
1) Web Sockets --> for realtime broadcasting for admin approval 
2) In browser notification service --> manifest.json
3) Compression algos
4) Render Postgres deployment---> Aiven
5) finally block retry logic
6) geoip-lite ---> for logs.csv

```

## Proposed Structure-

```
backend/
├─ package.json        (type:"module", scripts: dev/start/migrate/seed)
├─ .env                (DATABASE_URL, CLERK_*, S3 creds, etc.)
├─ src/
│  ├─ index.js         -> app bootstrap (Express)
│  ├─ app.js           -> express app, global middlewares
│  ├─ lib/
│  │  ├─ db.client.js        -> exports Prisma client
│  │  ├─ logger.js           -> pino/winston wrapper
│  │  ├─ errors.js           -> custom Error classes
│  │  └─ storage.js          -> S3 helper (optional)
│  ├─ middlewares/
│  │  ├─ clerk.middleware.js -> use @clerk/express (attach req.auth)
│  │  ├─ error.handler.js
│  │  ├─ validation.js
│  │  └─ rateLimit.js
│  ├─ services/          -> business logic, talk to DB
│  │  ├─ profile.service.js
│  │  ├─ post.service.js
│  │  └─ project.service.js
│  ├─ controllers/        -> parse req/res, call services
│  │  ├─ profile.controller.js
│  │  ├─ post.controller.js
│  │  └─ project.controller.js
│  ├─ routes/
│  │  ├─ index.js         -> mounts routes
│  │  ├─ profile.routes.js
│  │  ├─ post.routes.js
│  │  └─ project.routes.js
│  ├─ jobs/
│  │  └─ email.job.js     -> background worker hookups (BullMQ)
│  └─ utils/
│     ├─ response.js      -> standard API envelope
│     └─ validators.js
├─ prisma/
│  ├─ schema.prisma
│  ├─ seed.js
│  └─ migrations/
└─ README.md

```
