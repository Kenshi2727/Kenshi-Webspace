## Current Server Structure (as of 5 October 2025 )-

```
Server/
├─ package.json        (type:"module", scripts: dev/start/build/log/tunnel/ngrok)
├─ package-lock.json   (auto-generated dependency lock file)
├─ .gitignore          (ignored: node_modules, .env, .next, etc.)
├─ logs.csv            (ip, timestamp, route, etc. visitor info for analytics)
├─ logs.txt            (app logs, errors, etc.)
├─ vercel.json         (Vercel deployment config)
├─ .env                (DATABASE_URL, CLERK_*, etc.)
├─ node_modules/       (auto-generated dependencies files and folders)
├─ src/
│  ├─ index.js         (app entry point (Express))
│  ├─ controllers/     (functions(logic) for handling requests)
|  |   ├─ media.controller.js  -> media-related request handlers
|  |   ├─ post.controller.js   -> post-related request handlers
|  |   └─ user.controller.js   -> user-related request handlers
│  ├─ middlewares/     (middleware functions for request processing)
│  |   └─ auth.middleware.js   -> authentication middleware
│  ├─ public/          (static files (html, css, js))
|  |   ├─ index.html           -> HTML file
|  |   ├─ styles.css           -> CSS file
|  |   └─ script.js            -> JavaScript file
│  ├─ routes/          (API route definitions)
│  |   ├─ media.route.js      -> media-related routes
│  |   ├─ post.route.js       -> post-related routes
│  |   └─ user.route.js       -> user-related routes
│  ├─ services/        (external service integrations (not used yet))
│  └─ utils/           (utility functions/helpers)
|      └─ cloudinary.js        -> Cloudinary config and helper functions
│  
└─ README.md

```
