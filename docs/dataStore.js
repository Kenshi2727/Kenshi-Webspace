export const dataList = [
    {
        id: 1,
        heading: "Overview",
        subHeading: "What is Kenshi Webspace (Full Stack)",
        content: `<p><strong>Kenshi Webspace</strong> is a comprehensive full-stack blogging and web platform managed via an NPM Workspaces monorepo. It is split into a modern frontend (Client), a robust backend REST API (Server), a dedicated ORM layer (Database), and isolated microservices (Services).</p>
<p>The application supports advanced features like Role-Based Access Control, planned AI integration pipelines, rich text blogging, and analytics.</p>`,
        code: `
Repo: https://github.com/Kenshi-Webspace/Kenshi-Webspace.git
`
    },
    {
        id: 2,
        heading: "Architecture Structure",
        subHeading: "Main directories and separation of concerns",
        content: "<p>The project follows a modular NPM Workspaces monorepo structure, strictly separating the presentation layer, business logic, data access, and microservices.</p>",
        code: `
Kenshi-Webspace/
├─ Client/      (React + Vite + Tailwind CSS frontend)
├─ Server/      (Express.js REST API)
├─ Database/    (Prisma ORM and schemas)
├─ Services/    (Microservices like AI-Pipeline, Encryption, etc.)
├─ Architecture/(Design docs and diagrams)
├─ docs/        (Documentation UI components and data)
└─ Dev_Notes.md (Ongoing plans and notes)
`
    },
    {
        id: 3,
        heading: "Tech Stack - Client",
        subHeading: "Frontend technologies and libraries",
        content: `<ul>
  <li><strong>Core:</strong> React 19, Vite, React Router DOM</li>
  <li><strong>Styling & UI:</strong> Tailwind CSS, Framer Motion, Radix UI primitives, Lucide React</li>
  <li><strong>State Management:</strong> Redux Toolkit</li>
  <li><strong>Authentication:</strong> @clerk/clerk-react</li>
  <li><strong>Content Rendering:</strong> React Markdown, React-quill, highlight.js, rehype/remark plugins</li>
  <li><strong>Monitoring:</strong> Sentry (@sentry/react), Vercel Analytics/Speed Insights</li>
</ul>`
    },
    {
        id: 4,
        heading: "Tech Stack - Server",
        subHeading: "Backend infrastructure",
        content: `<ul>
  <li><strong>Core:</strong> Node.js (ES Modules), Express.js</li>
  <li><strong>Architecture:</strong> Heavy workloads (e.g. AI modules) are planned to be delegated to isolated microservices rather than running directly on the Express server.</li>
  <li><strong>Authentication:</strong> @clerk/express, svix (for Webhooks)</li>
  <li><strong>Storage & Media:</strong> Cloudinary, Firebase Admin, multer</li>
  <li><strong>Security & Utils:</strong> Helmet, cors, dotenv</li>
  <li><strong>Monitoring:</strong> Sentry (@sentry/node), custom CSV/text logging</li>
</ul>`
    },
    {
        id: 5,
        heading: "Tech Stack - Database",
        subHeading: "Data layer and ORM",
        content: `<p>The <code>Database</code> directory encapsulates all database interactions.</p>
<ul>
  <li><strong>ORM:</strong> Prisma</li>
  <li><strong>Integration:</strong> Accessed by the Server securely through NPM Workspace linking.</li>
</ul>`
    },
    {
        id: 6,
        heading: "Quick Start",
        subHeading: "Running the application locally",
        content: `<p>Since the project uses NPM Workspaces, dependencies are managed at the root. Each tier requires its own environment variables but shares a unified package installation.</p>`,
        code: `
# 1. Install all dependencies (at repository root)
npm install

# 2. Setup Database
cd Database
npm run generate

# 3. Run Development Servers (in separate terminals)
# Server
cd Server && npm run dev

# Client
cd Client && npm run dev
`
    },
    {
        id: 7,
        heading: "Authentication & Authorization",
        subHeading: "Clerk integration & RBAC limits",
        content: `<p>Authentication flows securely through Clerk. On the Client, <code>@clerk/clerk-react</code> handles sessions. On the Server, <code>@clerk/express</code> protects endpoints.</p>
<p><strong>Role-Based Access Control (RBAC):</strong> Essential for Admin/Editor routes. Middleware must explicitly check user ID, email, and roles against the database to protect privileged actions (e.g., redundant Cloudinary image deletion).</p>`
    },
    {
        id: 8,
        heading: "API Routes",
        subHeading: "Server endpoint structure",
        content: `<p>Namespaced endpoints reside in <code>Server/src/routes/</code>.</p>`,
        code: `
# Example namespaces
/api/posts   -> Handled by post.controller.js
/api/media   -> Handled by media.controller.js (Cloudinary uploads)
/api/users   -> Handled by user.controller.js
`
    },
    {
        id: 9,
        heading: "Logging & Analytics",
        subHeading: "Monitoring system behavior",
        content: `<ul>
  <li><strong>Server Logging:</strong> Raw logs written to <code>logs.txt</code> and structured metrics to <code>logs.csv</code> (using geoip-lite & Clerk info).</li>
  <li><strong>Production Analytics:</strong> Sentry is integrated on both Client and Server. Vercel Web Analytics is active on the Client.</li>
  <li><strong>Inter-service Auth:</strong> Planned Apache Kafka integration for extensive inter-service logging.</li>
</ul>`
    },
    {
        id: 10,
        heading: "AI Integrations & Workflows",
        subHeading: "Next-gen platform features",
        content: `<p>AI is a core focus for ongoing development, enhancing user reading and writing experiences. The architecture is prepared for a dedicated Python <code>AI-Pipeline</code> microservice, though active development on it has not yet started.</p>
<ul>
  <li><strong>Planned Features:</strong> Vercel AI SDK integration, Gemini / Langchain incorporation for client-side AI.</li>
  <li><strong>Workflows:</strong> n8n, MCP Servers, and automated tag generation/content enrichment.</li>
  <li><strong>Media:</strong> Image generation flows via Clipdrop / Stable Diffusion APIs.</li>
</ul>`
    },
    {
        id: 11,
        heading: "Advanced UI/UX",
        subHeading: "Blog interactions and design",
        content: `<p>The frontend strives for a premium interactive feel.</p>
<ul>
  <li><strong>Rich Text & PDF:</strong> Integration of React-quill for authoring, and React-PDF for blog downloads.</li>
  <li><strong>Reading Tools:</strong> Percentage reading progress bars, voice-reading capabilities, Wikipedia API enrichment.</li>
  <li><strong>Social:</strong> Built-in tagging (React-mentions), isolated bookmark/like sections, polling and shareable dynamic links.</li>
</ul>`
    },
    {
        id: 12,
        heading: "Environment Variables Management",
        subHeading: "Securing keys across workspaces and microservices",
        content: `<p>Environment variables must be securely maintained in their respective <code>.env</code> files across the different workspaces. Here are the types of variables required per service:</p>
<ul>
  <li><strong>Client:</strong> Public identifiers like <code>VITE_CLERK_PUBLISHABLE_KEY</code>, <code>VITE_BASE_URL</code>, and public Firebase configuration keys (e.g., <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_VAPID_KEY</code>).</li>
  <li><strong>Server:</strong> <code>PORT</code>, <code>CORS_ORIGIN</code>, <code>CLERK_PUBLISHABLE_KEY</code>, <code>CLERK_SECRET_KEY</code>, <code>CLERK_WEBHOOK_SECRET</code>, <code>CLOUDINARY_CLOUD_NAME</code>, <code>CLOUDINARY_API_KEY</code>, <code>CLOUDINARY_API_SECRET</code>, <code>SENTRY_DSN</code>, <code>MODE</code>.</li>
  <li><strong>Database:</strong> Connection strings including <code>DATABASE_URL</code> for the Prisma ORM.</li>
  <li><strong>Services/AI-Pipeline (Planned):</strong> LLM provider API keys (e.g., Gemini, OpenAI, Stable Diffusion).</li>
  <li><strong>Services/Encryption-Service:</strong> Master secret keys or salt values for cryptographic operations.</li>
  <li><strong>Services/Logger-Service:</strong> External centralized logging platform credentials.</li>
  <li><strong>Services/Notification-Service:</strong> SMTP, Push, or SMS gateway keys.</li>
</ul>`,
        code: `
# Expected Structure
Client/.env
Server/.env
Database/.env
Services/AI-Pipeline/.env
Services/Encryption-Service/.env
# (Remember to add all .env files to .gitignore)
`
    },
    {
        id: 13,
        heading: "Deployment",
        subHeading: "Vercel and continuous delivery",
        content: `<p>The platform is optimized for Vercel deployment via root-level or directory-level <code>vercel.json</code> files. Sentry source maps and Vite PWA plugins run during the build step. Make sure production environment variables are synchronized in the deployment dashboard.</p>`
    }
];
