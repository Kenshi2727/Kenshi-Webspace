/* syntax */
//  {
//         id: 1,
//         heading: "This is just a dummy data",
//         subHeading: "Soon these docs will be replaced",
//         content: "Web Page under development!",
//         code:
//             `
//     function haha(){
//         console.log("This is a fucky fucntion!");
//     }
//     `
//     }

// export const dataList = [
//     {
//         id: 1,
//         heading: "This is just a dummy data",
//         subHeading: "Soon these docs will be replaced",
//         content: "Web Page under development!",
//         code:
//             `
//     function haha(){
//         console.log("This is a fucky fucntion!");
//     }
//     `
//     }

// ]


export const dataList = [
    {
        id: 1,
        heading: "Overview",
        subHeading: "What is Kenshi Webspace (server)",
        content: `<p><strong>Kenshi Webspace server</strong> is a lightweight Express.js backend that provides REST endpoints for posts, media and user profiles. It uses ES modules and includes helpers for Cloudinary and auth integration (Clerk). This document describes structure, setup, scripts and recommended next steps.</p>
<p>Repo: <a href="https://github.com/Kenshi-Webspace/Kenshi-Webspace.git" target="_blank" rel="noopener">https://github.com/Kenshi-Webspace/Kenshi-Webspace.git</a></p>`
    },
    {
        id: 2,
        heading: "Tech stack",
        subHeading: "Libraries and services used / planned",
        content: `<ul>
  <li>Node.js (ES modules)</li>
  <li>Express.js</li>
  <li>Cloudinary (utils/cloudinary.js)</li>
  <li>Clerk (auth integration points in .env)</li>
  <li>Vercel (vercel.json present)</li>
</ul>
<p>Use this list to show badges or icons in your docs UI.</p>`
    },
    {
        id: 3,
        heading: "Project structure",
        subHeading: "Filesystem layout for the <code>Server</code> folder",
        content: "Canonical layout of the Server directory. Keep controllers, routes and middlewares separated for readability and testability.",
        code: `
Server/
├─ package.json
├─ package-lock.json
├─ .gitignore
├─ logs.csv
├─ logs.txt
├─ vercel.json
├─ .env
├─ node_modules/
├─ src/
│  ├─ index.js
│  ├─ controllers/
│  │   ├─ media.controller.js
│  │   ├─ post.controller.js
│  │   └─ user.controller.js
│  ├─ middlewares/
│  │   └─ auth.middleware.js
│  ├─ public/
│  │   ├─ index.html
│  │   ├─ styles.css
│  │   └─ script.js
│  ├─ routes/
│  │   ├─ media.route.js
│  │   ├─ post.route.js
│  │   └─ user.route.js
│  ├─ services/
│  └─ utils/
│      └─ cloudinary.js
└─ README.md
`
    },
    {
        id: 4,
        heading: "Quick start",
        subHeading: "Clone, install and run locally",
        content: `<p>Commands to get the server running locally. Ensure you create a <code>.env</code> with required keys before starting.</p>`,
        code: `
# clone
git clone https://github.com/Kenshi-Webspace/Kenshi-Webspace.git
cd Kenshi-Webspace/Server

# install dependencies
npm install

# run dev server
npm run dev

# production start (after build, if applicable)
npm run start
`
    },
    {
        id: 5,
        heading: "Environment variables",
        subHeading: "Minimum <code>.env</code> example",
        content: `<p>Store secrets in <code>.env</code> and never commit it. Match variable names to your implementation.</p>`,
        code: `
# .env (example)
DATABASE_URL=postgresql://user:password@host:5432/dbname
CLERK_API_KEY=sk_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
NODE_ENV=development
`
    },
    {
        id: 6,
        heading: "Logging",
        subHeading: "logs.csv and logs.txt usage",
        content: `<p>Two files live at project root. Use <code>logs.csv</code> for structured analytics and <code>logs.txt</code> for raw app-level errors. Avoid persisting secrets into logs.</p>
<pre><code>logs.csv (recommended headers):
ip,timestamp,route,method,status,userId,userAgent,extra
</code></pre>
<p>In <code>logs.txt</code> append stack traces with timestamps and a request id for correlation.</p>`
    },
    {
        id: 7,
        heading: "Routes & API",
        subHeading: "Main endpoints and expected payloads",
        content: `<p>Routes are namespaced per resource in <code>src/routes</code>. Controllers contain handler logic. Typical endpoints & payload shapes are below.</p>`,
        code: `
# Posts
GET  /api/posts            -> list posts (query: page, limit)
GET  /api/posts/:id        -> get single post
POST /api/posts            -> create post (protected)

Create post payload:
{
  "title": "My first post",
  "content": "Markdown or HTML",
  "authorId": "user_123",
  "media": ["media_1", "media_2"]
}

# Media
GET  /api/media
POST /api/media            -> multipart/form-data (field 'file')

# Users
GET  /api/users/:id
PUT  /api/users/:id        -> update profile (protected)
`
    },
    {
        id: 8,
        heading: "Authentication & middleware",
        subHeading: "Protecting routes and attaching <code>req.user</code>",
        content: `<p>Implement middleware in <code>src/middlewares/auth.middleware.js</code> that validates tokens (Clerk or another provider) and attaches minimal user info to <code>req.user</code> for controllers to consume.</p>
<p>Example usage inside a route (<code>no code</code> block so you can render it inline):</p>
<ul>
  <li><code>router.post('/', requireAuth, postController.createPost);</code></li>
  <li>Middleware pattern: validate token → find session → <code>req.user = { id, email }</code> → <code>next()</code></li>
</ul>`
    },
    {
        id: 9,
        heading: "Utils & external services",
        subHeading: "Cloudinary helper and services folder",
        content: `<p>Put service integrations (email, analytics) in <code>services/</code>. Cloudinary helpers belong in <code>utils/cloudinary.js</code>; they should export upload and delete helpers that return <code>{ url, id }</code>.</p>`,
        code: `
/utils/cloudinary.js (concept)
export async function uploadToCloudinary(buffer, options) {
  // configure cloudinary with env keys, call uploader.upload_stream or uploader.upload
  // return { url, public_id }
}
export async function deleteFromCloudinary(publicId) {
  // call cloudinary.uploader.destroy(publicId)
}
`
    },
    {
        id: 10,
        heading: "Starting the app",
        subHeading: "Typical responsibilities of <code>src/index.js</code>",
        content: `<p><strong>index.js</strong> should initialize DB, apply express middlewares (CORS, body parser), mount routes and start the server on <code>process.env.PORT</code>. Add a lightweight logging middleware that writes to <code>logs.csv</code> or <code>logs.txt</code>.</p>`,
        code: `
// simplified src/index.js
import express from 'express';
import postRoutes from './routes/post.route.js';
import mediaRoutes from './routes/media.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
app.use(express.json());
// basic logging middleware
app.use((req, res, next) => {
  // append to logs.csv or logs.txt
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server listening on \${PORT}\`));
`
    },
    {
        id: 11,
        heading: "Deployment",
        subHeading: "Vercel notes and environment setup",
        content: `<p>Vercel configuration file exists. When deploying to Vercel, add environment variables in project settings. For local tunnels use the provided <strong>tunnel/ngrok scripts</strong> (if implemented).</p>
<ul>
  <li>Ensure <code>vercel.json</code> is configured for server functions (if using Vercel Serverless).</li>
  <li>Add env vars via Vercel dashboard: <code>DATABASE_URL</code>, <code>CLERK_*</code>, <code>CLOUDINARY_*</code>.</li>
</ul>`
    },
    {
        id: 12,
        heading: "Testing & CI",
        subHeading: "Recommended tests and tooling",
        content: `<p>The repo currently has no tests. Recommended approach:</p>
<ul>
  <li>Jest for unit tests</li>
  <li>Supertest for route/integration tests</li>
  <li>ESLint + Prettier for linting and formatting</li>
  <li>GitHub Actions workflow to run tests and lint on PRs</li>
</ul>`,
        code: `
# suggestions
- jest + supertest for route/controller tests
- eslint + prettier for linting/formatting
- add .github/workflows/ci.yml to run test and lint on PRs
`
    },
    {
        id: 13,
        heading: "Contribution guide",
        subHeading: "How to contribute code",
        content: `<p>Fork the repo, create a feature branch, run tests locally, and open a PR with a clear description. Keep changes small and unit-tested where possible.</p>
<ol>
  <li>Fork repo</li>
  <li>git checkout -b feat/your-feature</li>
  <li>npm install</li>
  <li>npm run dev</li>
  <li>write tests & run <code>npm test</code></li>
  <li>push and open PR</li>
</ol>`
    },
    {
        id: 14,
        heading: "TODOs & improvements",
        subHeading: "Near-term items to prioritize",
        content: `<ul>
  <li>Add database schema and migrations</li>
  <li>Implement full Clerk auth flows and document token usage</li>
  <li>Add unit and integration tests</li>
  <li>Add input validation (celebrate/joi or express-validator)</li>
  <li>Add rate limiting and request validation</li>
  <li>Move logging to a centralized service in production</li>
</ul>`
    },
    {
        id: 15,
        heading: "Contact / next steps",
        subHeading: "Need an API reference, Postman collection, or CI config?",
        content: `<p>If you want, I can generate any of the following and return it in the same <code>dataList</code> format so you can plug it directly into your docs site:</p>
<ul>
  <li>API_REFERENCE (endpoints + schemas)</li>
  <li>Postman collection (JSON)</li>
  <li>Jest + Supertest examples</li>
  <li>GitHub Actions CI workflow</li>
</ul>
<p>Pick one and I'll output it in <code>dataList</code> format.</p>`
    }
];
