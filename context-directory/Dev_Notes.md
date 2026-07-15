## Quickies-
- author image 
- pagination
- third party services config and integration

## System Design Change(PRIORITY!)
- API Gateway

## Clerk user managemnt CRUD detailed audit-
- checking the updation of user data in clerk dashboard and DB
- checking other access privileges like email verification, password reset, etc
- media like profile picture, cover picture, etc

## Delete resource cleanup and optimization-
- are all asscoiated resources not deleted from dtabase when user deleted form clerk db
- using onDelete Cascade for all resources and checking if all associated resources are deleted or not.
- adding UI path for account deletion.

## Configurations-
- yaml for config management(github workflow)
- eslint config

## Validation layer-
- zod validation for all client and server side inputs
 
## LOGGER Service-
- APACHE KAFKA INTEGRATION FOR INTER SERVICE COMMUNICATION AND LOGGING
- Aiven kafka deployment
- log summary using AI workflow(eg.- n8n)
- all log files under one root log directory to avoid instance spin up

## V.IMP- Protect ROLE-BASED privileged routes both client and server side
- Example- admin routes, edit-article routes,editor routes,etc
         - cloudinary redundant images deletion route if role based acess is denied.

- study vercel config

## Privileged route access plan-
middleware that will check -> user id
                           -> user email   <br>
                           -> user role in DB  <br>
                           -> file logger will log this entry in a separate file for security audits  <br>
- refer to
[video-for logging](https://youtu.be/m2q1Cevl_qw?si=3MesM5A2LkhcmoHS)


## Client Side & Vercel Analytics & AI Pipeline-
- study the vercel client side analytics object
- integrate client side langchain for client side ai features

## Web Analytics
- Sentry Service Integration
- Server Log Monitoring setup left
- Aiven Analytics

## TO_DO-
- CLERK AUTOMATIC WEBHOOK DISABLING HANDLER
- global error logging
- server attacks and security
- Prisma major update
- logger system
- scalable notification system
- clerk user info optimization and management
- websocket(supabase) vs SSE(serverless friendly)
- study Framer docs
- remove rendundant code and animations from above and all of frontend
- gemini integration for ai features
- @contentful/rich-text-from-markdown
- sitemap.xml 

## Restructuring_Plan-
> This restructuring is planned soon, but will be handled after the current higher-priority tasks are completed. Keep this section as context for the future restructuring pass.

### Main Goal-
- Keep the current monorepo architecture, but tighten boundaries so the project is easier to scale, test, and maintain.
- Avoid a full rewrite; restructure gradually around the existing working system.

### Current Architecture-
- `Client/` owns React + Vite frontend UI, routing, browser state, and API calls.
- `Server/` owns Express routes, authentication, authorization, business logic, and database-facing API behavior.
- `Database/` owns Prisma schema, migrations, and shared Prisma client.
- `Services/` owns microservices such as AI Pipeline, Notification, Logger, Encryption, and other independent service workloads.
- Runtime flow should remain: Client -> Server -> Database, with Server calling external/internal services when needed.

### Server Restructuring-
- Split heavy controllers into clearer layers:
  - `routes/` for endpoint definitions only.
  - `controllers/` for HTTP request/response handling.
  - `services/` for business logic.
  - `repositories/` for Prisma/database queries.
  - `validators/` for request validation.
  - `integrations/` for Cloudinary, Firebase, AI Pipeline, notification, logger, and other external clients.
  - `config/` for environment and app configuration.
- Move post/media logic out of large controller files into focused service modules.
- Keep controllers thin: read request data, call service, return response.
- Add shared error response helpers and consistent API response formats.
- Add validation for client and server inputs, preferably with Zod or a similar schema validator.

### Client Restructuring-
- Split `Client/src/services/GlobalApi.js` into domain-based API files:
  - `apiClient.js`
  - `postApi.js`
  - `userApi.js`
  - `mediaApi.js`
  - `notificationApi.js`
  - future AI/service API modules as needed.
- Organize feature-specific code under `features/` where useful:
  - `posts/`
  - `users/`
  - `auth/`
  - `media/`
  - `notifications/`
- Keep shared UI in `components/`, shared helpers in `lib/`, and route-level screens in `pages/`.

### Database Restructuring-
- Keep Prisma centralized in `Database/`.
- Consider moving the Prisma client wrapper into a clearer package entry such as `Database/src/client.js` or `Database/src/index.js`.
- Treat generated Prisma output as generated code only; never hand-edit generated files.
- Review old migrations and schema naming before major Prisma upgrades.

### Services Restructuring-
- Standardize all `Services/*` folders around a consistent internal structure where possible.
- Use `Services/AI-Pipeline` as the reference pattern because it already separates API routes, controllers, core logic, models, providers, prompts, middleware, and utils.
- Keep service-specific concerns inside the service folder.
- Let the main `Server/` communicate with services through explicit integration/client modules instead of scattered direct calls.

### Docs And Workspace-
- Update `Architecture/` docs after restructuring so documentation matches the real repo.
- Add or improve root workspace scripts for common development commands:
  - dev
  - build
  - lint
  - test
  - prisma generate/migrate
- Keep restructuring commits separate from feature commits where possible.

### Suggested Priority Order-
1. Refactor `Server/` controller/service/repository boundaries.
2. Split frontend API service files by domain.
3. Standardize service folder patterns.
4. Clean up database package exports.
5. Update architecture documentation.
6. Add workspace-level scripts and checks.

## UI/UX Improvements-
- separate page for likes,bookmarks section for user profile
- adding boomark count,download counts,etc in articles page
- %age reading progress bar for blogs
- react pdf for downloading blogs instaed of html2pdf/canvas
- **react-quill editor integration**


## AFTER FRONTEND DEV UI FULL FEATURE COMPLETION-
* Exploring custom Webhooks and custom React hooks for better client and server management.
* Database rollback and optimization mechanism.

## AI INTEGRATION PLANS-
* Vercel AI SDK [Auto Complete Example](https://ai-sdk.dev/docs/ai-sdk-ui/completion)

### Planned Features-  
1. Web Sockets --> for realtime broadcasting for admin approval 
2. In browser notification service --> manifest.json
                                  |--> web push npm package
                                  |--> author/topic specific notifications
3. **Security-->Research Encryption Algorithms**
4. geoip-lite/turfjs for Geospatial data and clerk---> for logs.csv
5. tagging users --> react-mentions
5. Draggable features using react-draggable/html draggable property
6. Download blogs as pdf
7. Wikipedia API integration for content enrichment
8. Grammarly API integration for content enhancement
9. Shareable link beautification
12. Attached files option in blog posts
              |--> downloadable resources
              |--> code snippets
              |--> links
13. Image upload ctrl c+v / normal user expectation --> medium style
15. blog tagginng and filtering (AI assisted)
              |--> notify user if tagged
16. Voice reading of blogs
17. polling feature for author to ask his users.
   
### Analytics -
* Posthemus
* Uptime Karma

### AI Workflow-
* AI model integration
   ``` 
   ├─ langchain
   ├─ copilot kit
   └─ open source models
   ```
* Image generation
   ```
   ├─ Clipdrop api
   ├─ Other open source models like banana
   ├─ Stable Diffusion
   ├─ DALL-E
   └─ Midjourney
   ```
* AI Automation
   ``` 
   ├─ n8n
   ├─ MCP Servers
   └─ Apache Kafka
   ```

### Future Plans-
* Integration with whatsapp and telegram
* Integration with github and linkedIn
* Mobile App Development
* Security Enhancements
* Performance Optimization
* Voice Assistants
* Advanced AI Features
* cloud and devops
