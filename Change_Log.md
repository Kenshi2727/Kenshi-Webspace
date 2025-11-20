# Kenshi Webspace – Technical Change Log

This document tracks important internal configuration and development changes that affect the codebase, build systems, CI/CD, or developer workflows.

---

## [2025-11-20] – Prisma 7 Configuration Change

### What Changed

Prisma no longer supports defining database URLs inside `schema.prisma`.

Old (deprecated):

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

New:

```
datasource db {
  provider = "postgresql"
}
```

### New Requirements

* Connection URL must now be defined in `prisma.config.ts`(separate file) OR passed to `PrismaClient`.

### Files Added

* `prisma/prisma.config.js` (typeScript not required for Keenshi Webspace, but recommended)

### Packages Added

* `dotenv`
*  `prisma v7.x`

  ```js
import 'dotenv/config'
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: env('DATABASE_URL'),
    },
});

```

### Reason

Prisma 7 removed inline datasource URLs to:

* Improve configuration consistency
* Support Accelerate routing
* Reduce migration runtime coupling

---

## [2025-XX-XX] – Dependency & Tooling Changes (Future Entries)

### Change

*

### Impact

*

### Files Modified

*

### Notes

*

---

## HOW TO USE THIS FILE

For every technical/platform change, record:

* **Date**
* **What changed**
* **Why it changed**
* **Files affected**
* **Developer impact**
* Short code examples **if needed**

This helps future developers understand:

* Why decisions were made
* How major config changes impact deployments
* What to fix if something breaks
