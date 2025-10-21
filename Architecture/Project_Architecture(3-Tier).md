```

+------------------+
|    CLIENT        |  ← React (Vite)
|  (Frontend)      |
+--------▲---------+
         |
         | HTTP (REST / Fetch / Axios)
         ▼
+------------------+
|    SERVER        |  ← Express (Node.js)
|  (Business Logic)|
+--------▲---------+
         |
         | ORM (Prisma)
         ▼
+------------------+
|   DATABASE       |  ← PostgreSQL (on Aiven)
|  (Data Storage)  |
+------------------+

```
