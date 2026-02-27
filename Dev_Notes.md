## V.IMP- Protect ROLE-BASED privileged routes both client and server side
- rbac is not enough---> need strict checking for specific routes that are meant for specific roles only.

- Example- admin routes, edit-article routes,editor routes,etc
         - cloudinary redunandnt images deletion route if role based acess is denied.

## Privileged route access plan-
middleware that will check -> user id
                           -> user email   <br>
                           -> user role in DB  <br>
                           -> file logger will log this entry in a separate file for security audits  <br>
- refer to
[video-for logging](https://youtu.be/m2q1Cevl_qw?si=3MesM5A2LkhcmoHS)


## Client Side & Vercel Analytics & AI Pipeline-
- Loading pages while client side isSignedIn is being checked 
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
4. geoip-lite and clerk---> for logs.csv
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
