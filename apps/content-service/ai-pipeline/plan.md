# ai-pipeline-plan.md

AI Development Strategy for Kenshi Webspace

---

## Overview

This document summarizes two possible architectural paths for integrating AI functionality into Kenshi Webspace:

1. **Monolithic Architecture** (Node.js + Python inside the same project under `/src`)
2. **Microservice Architecture** (Separate Python AI pipeline alongside Node.js)

This file explains:

* When each approach makes sense
* Pros and cons
* Technical implications
* Deployment concerns
* Scaling and maintenance trade-offs

This is meant to guide future development decisions when the AI pipeline is implemented.

---

# 1️⃣ Option A – Monolithic Architecture

**(Python inside `src/ai/` and controlled directly by Node)**

## 📌 Structure

```
Server/
└─ src/
   ├─ controllers/
   ├─ routes/
   ├─ middlewares/
   ├─ utils/
   └─ ai/
      ├─ pipeline.py
      ├─ langchain_processor.py
      └─ embeddings.py
```

## 🔧 How it works

* Node.js invokes Python scripts using:

  * `child_process`
  * `python-shell`
  * local bindings
* Everything is one application and one deployment.

## 🧠 When this approach is good

* Small to medium system
* Local machine or single-server deployment
* No Kafka or external workers
* Node and Python tightly coupled
* Fast development without infrastructure complexity
* AI is helper logic, not a standalone service

## ⚙ Pros

* Easier to develop
* Single deployment
* No networking between Node & Python
* Easier debugging
* No need for container orchestration

## ❌ Cons

* If Python crashes, whole backend may crash
* Node and Python can't scale independently
* Harder to Dockerize or deploy in distributed environments
* Hard to add:

  * Kafka consumers
  * Background AI workers
  * Multiple GPU/CPU processing units
* Logs and resource usage become mixed

## 🧩 Best for

Early stages of Kenshi Webspace where:

* AI usage is small
* Low user traffic
* No heavy compute
* Want fast results

---

# 2️⃣ Option B – Microservice Architecture

**(Python in a separate directory such as `/ai-pipeline` running its own process)**

## 📌 Structure

```
Server/
├─ src/              → Node.js main backend
└─ ai-pipeline/      → Python AI microservice
   ├─ main.py
   ├─ workers/
   ├─ llm/
   └─ utils/
```

## 🔧 How it works

* Python runs independently using:

  * FastAPI/Flask
  * Kafka consumers
  * Workers
* Node communicates through:

  * REST API
  * gRPC
  * Kafka
  * Redis queue
* Each service has its own:

  * Dependencies
  * Deployment
  * Resources
  * Runtime

## 🧠 When this approach is best

* Large user base
* Heavy or frequent AI processing
* Python needs:

  * LangChain pipelines
  * Embeddings
  * Vector stores
  * Model hosting
* AI might run on:

  * GPU servers
  * Containers
  * Auto-scaling clusters

## ⚙ Pros

* Node and Python scale independently
* If Python crashes, Node continues normally
* Better resource monitoring
* Fits distributed architectures
* Supports:

  * Kafka
  * Workers
  * Long-running tasks
* Clean DevOps separation

## ❌ Cons

* More complex deployment
* Needs networking between services
* Requires Docker or service orchestration
* Slightly slower development pace early on

## 🚀 Best for

Future production version of Kenshi Webspace where:

* AI becomes a core feature
* Needs separate scaling
* Needs uptime and resilience
* Heavy traffic is expected

---

# 🔄 Decision Rule Summary

| Question                                         | If YES →             | If NO →            |
| ------------------------------------------------ | -------------------- | ------------------ |
| Will Python be its own API or Kafka worker?      | Use **Microservice** | Monolithic is fine |
| Will AI need separate scaling?                   | Microservice         | Monolithic         |
| Small/medium system with single deployment?      | Monolithic           | Microservice       |
| Will Node and Python run in separate containers? | Microservice         | Monolithic         |
| Is the goal fast early development?              | Monolithic           | —                  |
| Is this for long-term production readiness?      | Microservice         | —                  |

---

# 💡 Recommended Evolution Path

### Phase 1 (Early development)

* Use **Monolithic approach**
* AI under `src/ai/`
* Minimal setup
* No Kafka needed

### Phase 2 (Growth)

* Split into dedicated service:

```
Server/
├─ src/          (Node)
└─ ai-pipeline/  (Python)
```

### Phase 3 (Scaling)

* Add:

  * Kafka
  * Docker
  * independent deployment
  * GPU compute if needed




# ai-pipeline-plan.md

AI Development Strategy for Kenshi Webspace

---

## Overview

This document summarizes two possible architectural paths for integrating AI functionality into Kenshi Webspace:

1. **Monolithic Architecture** (Node.js + Python inside the same project under `/src`)
2. **Microservice Architecture** (Separate Python AI pipeline alongside Node.js)

This file explains:

* When each approach makes sense
* Pros and cons
* Technical implications
* Deployment concerns
* Scaling and maintenance trade-offs
* Kafka usage design
* Docker deployment guidance
* Migration plan for small → large scale

Reference document when starting AI development later.

---
<br>
<br>
<br>

---

# Code examples for refrerence and clarity.


# 1️⃣ Option A – Monolithic Architecture

**Node + Python under the same project (`/src`)**

## Folder Structure

```
Server/
└─ src/
   ├─ controllers/
   ├─ routes/
   ├─ middlewares/
   ├─ utils/
   └─ ai/
      ├─ pipeline.py
      ├─ langchain_processor.py
      ├─ embeddings.py
      └─ sentiment.py
```

## How It Works

Node directly executes Python scripts using:

* `child_process`
* `python-shell`
* local execution

Everything runs as **one backend service**.

## System Diagram

```
┌─────────────┐
│  Node.js    │
│ (web server)│
└──────┬──────┘
       │ Local call
       ▼
┌───────────────┐
│ Python scripts│
│ (inside /src) │
└───────────────┘
```

---

# 2️⃣ Option B – Microservice Architecture

**Python AI lives separately (`/ai-pipeline`) and runs independently**

## Folder Structure

```
Server/
├─ src/              → Node backend
└─ ai-pipeline/      → Python microservice
   ├─ main.py
   ├─ workers/
   ├─ llm/
   └─ utils/
```

## System Diagram

```
┌────────────┐     HTTP / gRPC / Kafka     ┌────────────────────┐
│  Node.js   │ ─────────────────────────→  │ Python AI Pipeline │
│  Backend   │ ←─────────────────────────  │ (FastAPI,LangChain)│
└────────────┘                             └────────────────────┘
```

# Kafka Integration (Recommended for Microservice)

## Example Flow

```
[User → Kenshi frontend]
         │
         ▼
     Node API
         │  produces event
         ▼
      Kafka topic
         │
         ▼
Python AI consumer
         │
         ▼
 vector DB / results
         │
         ▼
Node fetches and serves result
```

## Event Types

Possible Kafka topics:

* `content.summarize`
* `post.generateEmbeddings`
* `seo.score`
* `recommendation.compute`

## Benefits

✔ Decoupled architecture
✔ No request timeout issues
✔ Can run long AI tasks safely
✔ Scales horizontally

---

# Docker Deployment Notes

## Monolithic (Single Container)

**`Dockerfile`**

```
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "src/index.js"]
```

Run Python inside from Node.

Good for early stage.

---

## Microservice (Two Containers)

### Node container

```
FROM node:20
WORKDIR /app
COPY ./server .
RUN npm install
CMD ["node", "src/index.js"]
```

### Python AI container

```
FROM python:3.12
WORKDIR /ai
COPY ./ai-pipeline .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
```

### docker-compose

```
services:
  api-server:
    build: ./server
    ports:
      - "3000:3000"
    depends_on:
      - ai-pipeline

  ai-pipeline:
    build: ./ai-pipeline
    ports:
      - "5000:5000"
```

If Kafka is used:

```
  kafka:
  zookeeper:
```

---

# Migration Plan (Recommended Path)

## Phase 1 (Early Development)

* Use Monolithic:

  * Python under `/src/ai/`
* No Kafka
* Node calls Python locally

### Why?

Fastest development.

---

## Phase 2 (Medium Scale)

Move Python to its own folder:

```
/ai-pipeline
```

But still run both on the same machine.

---

## Phase 3 (Production Scale)

* Use Docker or Kubernetes
* Add Kafka
* Deploy Node and Python separately
* Add monitoring:

  * Prometheus
  * Grafana
  * Loki logs

---



