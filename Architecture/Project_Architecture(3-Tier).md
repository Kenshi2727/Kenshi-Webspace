## Planned Architecture Reorganization:

```
user-service/
│
├── src/
│   ├── app.js                     # Creates and configures Express app
│   ├── server.js                  # Starts HTTP server
│   │
│   ├── config/
│   │   ├── env.js                 # Environment variable loader
│   │   ├── database.js            # Database connection
│   │   ├── logger.js              # Pino/Winston logger
│   │   ├── cache.js               # Redis configuration
│   │   ├── mail.js                # Email configuration
│   │   └── index.js
│   │
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   ├── user.model.js
│   │   │   ├── user.validation.js
│   │   │   ├── user.mapper.js
│   │   │   ├── user.constants.js
│   │   │   ├── user.events.js
│   │   │   └── index.js
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   ├── auth.validation.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── auth.constants.js
│   │   │   └── index.js
│   │   │
│   │   └── health/
│   │       ├── health.routes.js
│   │       ├── health.controller.js
│   │       └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   ├── notFound.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   ├── requestLogger.middleware.js
│   │   └── cors.middleware.js
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.js
│   │   │
│   │   ├── repositories/
│   │   └── client.js
│   │
│   ├── events/
│   │   ├── publishers/
│   │   ├── subscribers/
│   │   ├── kafka.js
│   │   └── index.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── pagination.js
│   │   ├── crypto.js
│   │   ├── jwt.js
│   │   ├── date.js
│   │   └── helpers.js
│   │
│   ├── constants/
│   │   ├── httpStatus.js
│   │   ├── roles.js
│   │   └── permissions.js
│   │
│   ├── validators/
│   │   └── common.validators.js
│   │
│   ├── jobs/
│   │   ├── cleanup.job.js
│   │   ├── email.job.js
│   │   └── scheduler.js
│   │
│   ├── docs/
│   │   └── swagger.js
│   │
│   └── types/
│       └── index.d.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── setup.js
│
├── scripts/
│   ├── seed.js
│   ├── migrate.js
│   └── reset-db.js
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── secret.yaml
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── eslint.config.js
├── prettier.config.js
└── jsconfig.json
```