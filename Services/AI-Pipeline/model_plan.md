🧠 Core Idea
Don’t rely on one AI.
👉 Split AI by usage to control cost.
🏗️ Architecture Summary
1. 🎨 Frontend
Deploy on Vercel
Only handles UI + light API logic
2. 🧠 AI Split (MOST IMPORTANT)
🟢 Cheap / Free AI
For small tasks (autocomplete, short text)
Use:
Hugging Face free tier OR small models
🔴 Powerful AI (Paid but controlled)
For heavy tasks (resume generation, long content)
Use:
OpenAI / Claude / Gemini APIs
Call only when needed
🐉 Offline AI (Your secret weapon)
Run locally using Ollama
Use for:
Development
Testing
Backup
⚙️ Backend Logic (Cost Control Brain)
Route requests smartly:
Small task → cheap model
Big task → paid API
Dev/testing → local model