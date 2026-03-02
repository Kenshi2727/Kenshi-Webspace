```         
         
                ┌──────────────────────┐
                │  Kenshi Services     │
                │  (User, Post, Auth)  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Logger Interface   │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Core Logger Engine │
                │  - Level Filtering   │
                │  - Env Awareness     │
                │  - Structuring       │
                └──────────┬───────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Domain Router│   │ Level Router │   │ Formatter     │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       └──────────────┬───┴───────┬──────────┘
                      ▼           ▼
              ┌────────────────────────┐
              │      File Writer       │
              │  (Concurrency Safe)    │
              └──────────┬─────────────┘
                         ▼
                ┌──────────────────────┐
                │      Log Storage     │
                └──────────────────────┘

```


```
logger-service/
│
├── cmd/
│   └── logger-service/
│       └── main.go
│
├── internal/
│   │
│   ├── config/
│   │   └── config.go
│   │
│   ├── core/
│   │   ├── logger.go
│   │   ├── engine.go
│   │   ├── levels.go
│   │   └── context.go
│   │
│   ├── formatter/
│   │   ├── json_formatter.go
│   │   └── text_formatter.go
│   │
│   ├── router/
│   │   ├── domain_router.go
│   │   └── level_router.go
│   │
│   ├── writer/
│   │   ├── file_writer.go
│   │   ├── console_writer.go
│   │   └── rotation.go
│   │
│   ├── domains/
│   │   ├── user_logger.go
│   │   ├── post_logger.go
│   │   ├── auth_logger.go
│   │   ├── system_logger.go
│   │   └── payment_logger.go
│   │
│   ├── middleware/
│   │   └── http_logger.go
│   │
│   └── utils/
│       └── time_utils.go
│
├── pkg/
│   └── models/
│       └── log_entry.go
│
├── logs/
│   └── (auto-generated at runtime)
│
├── configs/
│   ├── development.yaml
│   ├── production.yaml
│   └── testing.yaml
│
├── go.mod
├── go.sum
└── README.md
```



## runtime log storage structure

```
logs/
 └── {year}/
      └── {month}/
           ├── user/
           │    ├── debug.log
           │    ├── info.log
           │    └── error.log
           │
           ├── post/
           ├── auth/
           ├── system/
           └── payment/
```