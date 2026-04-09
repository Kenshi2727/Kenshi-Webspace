# Kenshi Webspace Services

This directory contains the various backend microservices that support the Kenshi Webspace architecture. Each service is designed with a specific domain in mind, ensuring modularity and clear separation of concerns.

## Services Overview

| Service Name | Description | Primary Tech Stack | Status |
|--------------|-------------|--------------------|--------|
| **[AI-Pipeline](./AI-Pipeline)** | Manages AI-related tasks and model planning. | Python/LangChain | Under Development |
| **[Encryption-Service](./Encryption-Service)** | Core encryption service for securing Kenshi Webspace data. | Java (Maven) / Go / JS | Under Development |
| **[Logger-Service](./Logger-Service)** | Centralized logger engine with level filtering, active routing, and formatted log generation. | Go | Inactive(Under Development) |
| **[Notification-Service](./Notification-Service)** | Handles push notifications, emails, and other SMTP communications for user events. | Node.js (Express) | Disabled(Under Development) |

## Getting Started

Each service is self-contained and manages its own dependencies and configurations. 

To get started with a specific service:
1. Navigate to the service's directory.
2. Read the local `README.md` file for architectural details, system design, and required environment configurations.
3. Follow the installation steps (e.g., `npm install`, `go mod download`, or using Maven).
