# Kenshi Webspace – Technical Change Log

> **Purpose:** This document tracks important internal configuration and development changes that affect the codebase, build systems, CI/CD, or developer workflows.

---

## Pending Dependencies and Software Updates

> **Last Checked:** March 15, 2026
> The following list highlights outdated packages across the monorepo workspaces that require attention.

### Server & Database 
* **`@clerk/express`** (Server)
  * Current: `1.7.76` ➞ **Latest: `2.0.4`**
* **`@prisma/client`** (Database)
  * Current: `6.19.2` ➞ **Latest: `7.5.0`**
* **`prisma`** (Database)
  * Current: `6.19.2` ➞ **Latest: `7.5.0`**

### Client
* **`vite-plugin-pwa`** (Client)
  * Current: `0.21.2` ➞ **Latest:** *(Update needed)*

---

## [2025-11-20] – Prisma 7 Configuration Changes
*(Cancelled Release)*

###  What Changed

Prisma no longer supports defining database URLs inside `schema.prisma`.

**Old (deprecated):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**New:**
```prisma
datasource db {
  provider = "postgresql"
}
```

###  New Requirements

* Connection URL must now be defined in `prisma.config.ts` (separate file) OR passed to `PrismaClient`.

###  Files Modified / Added

* `[NEW]` `prisma/prisma.config.js` *(TypeScript not required for Kenshi Webspace, but recommended)*

###  Packages Added

* `dotenv`
* `prisma v7.x`

**Configuration Example (`prisma.config.js`):**
```javascript
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

###  Reason for Change

Prisma 7 removed inline datasource URLs to:
* Improve configuration consistency
* Support Accelerate routing
* Reduce migration runtime coupling

---

## [YYYY-MM-DD] – Dependency & Tooling Changes (Template)

### Change
* [Describe the change...]

### Impact
* [Describe the impact...]

### Files Modified
* [List affected files...]

### Notes
* [Additional context...]

---

## HOW TO USE THIS FILE

For every technical/platform change, record:
- **Date**
- **What changed**
- **Why it changed**
- **Files affected**
- **Developer impact**
- **Short code examples** (if needed)

> **Why do we need this?**
> This helps future developers understand why decisions were made, how major config changes impact deployments, and what to fix if something breaks.
