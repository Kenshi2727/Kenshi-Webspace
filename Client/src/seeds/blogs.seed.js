export const featuredPosts = [
  {
    id: 1,
    title: 'Redis Explained: The In-Memory Data Store Powering Real-Time Applications',
    excerpt:
      'Redis is a lightning-fast, in-memory data store used for caching, real-time analytics, and high-performance applications.',
    category: 'React',
    date: 'June 15, 2023',
    readTime: '5 min read',
    category: 'Web Dev',
    author: 'Kenshi',
    thumbnail: '/thumbnail1.png',
    authorImg: 'https://i.pravatar.cc/150?u=kenshi',
    coverImg: '/cover1.png',
    content:
      `If you’ve ever wondered how real-time applications like chat systems, gaming leaderboards, or caching layers work so seamlessly, chances are Redis is behind the scenes. Redis is a blazing-fast, in-memory key-value store that’s revolutionized how developers build high-performance applications.

🚀 What is Redis?
Redis (REmote DIctionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. Unlike traditional databases that store data on disk, Redis stores everything in RAM, offering sub-millisecond response times.

It supports various data types such as:

 * Strings
 * Hashes
 * Lists
 * Sets
 * Sorted Sets
 * Streams
 * Bitmaps
 * HyperLogLogs
 * Geospatial Indexes

Redis is written in C and is known for its simplicity, speed, and reliability.

⚡ Why is Redis So Fast?
  * Redis achieves its incredible speed because:
  * It operates entirely in memory.
  * It uses simple data structures.
  * It is single-threaded, avoiding the complexity and overhead of locks.
  * It supports pipelining, allowing multiple commands in one round-trip.
  * It has minimal network latency due to its binary protocol.
   
While Redis does support persistence by writing snapshots or logs to disk, its primary design goal is performance.

💡 Popular Use Cases-

Redis can be used in a variety of scenarios:

1. Caching
Reduce load on primary databases by caching frequently accessed data.

  GET user:1234
  SET user:1234 {name: "Abhishek", age: 22}

2. Session Storage
Store user sessions in scalable, high-speed memory for login systems.

3. Real-time Analytics
Track user activity, page views, and other real-time metrics.

4. Rate Limiting
Prevent abuse by limiting the number of API requests per user/IP.

5. Pub/Sub Messaging
Redis supports a lightweight publish/subscribe messaging system useful for chat apps, notifications, etc.


🧠 How Redis Works (Under the Hood)

Redis stores data as key-value pairs in memory, similar to a large dictionary. Here's how it handles different concerns:

->Data Persistence

Redis supports two main persistence methods:

1) RDB (Snapshotting): Saves snapshots of data at specified intervals.
2) AOF (Append Only File): Logs every write operation received by the server.

Eviction Policies-
When memory is full, Redis can evict keys based on policies like:

1) Least Recently Used (LRU)
2) Least Frequently Used (LFU)
3) TTL-based eviction

Replication and Clustering-
Redis can replicate data across multiple nodes and supports sharding for horizontal scaling.

🔧 Getting Started with Redis-
Here’s how you can start using Redis locally:

1. Install Redis
On macOS: brew install redis
On Linux: sudo apt install redis

Or use Docker:

docker run --name redis -p 6379:6379 redis

2. Start Redis CLI

3. Basic Commands
SET language "JavaScript"
GET language
DEL language

🧪 Redis in Modern Tech Stack
Redis pairs beautifully with:

Node.js (via ioredis or redis package)
1) Python (redis-py)
2) Go (go-redis)
3) Express apps for storing sessions
4) GraphQL and REST APIs for caching responses

🔐 Is Redis Secure?
Out-of-the-box Redis doesn’t use encryption or authentication (for speed). In production:

Use Redis AUTH
Run it behind a firewall
Use TLS encryption for data in transit

Prefer Redis Sentinel or Redis Cluster for HA setups

🧭 Final Thoughts-
Redis isn’t just a cache—it’s a multi-purpose powerhouse that supports real-time data handling, queues, pub/sub messaging, and even lightweight databases. Whether you're building a social media app, an analytics dashboard, or an e-commerce platform, Redis can be your secret weapon for speed and scalability.


        `
  },

  {
    id: 2,
    title: 'Mastering WebSockets: Real-Time Communication Made Simple',
    excerpt:
      'WebSockets enable real-time, full-duplex communication between the client and server over a single connection.',
    category: 'Web Dev',
    date: 'July 10, 2023',
    readTime: '6 min read',
    author: 'Wild Coyote',
    thumbnail: '/thumbnail2.png',
    authorImg: 'https://i.pravatar.cc/150?u=kenshi2',
    coverImg: '/cover2.png',
    content:
      `
# GitHub Flavored Markdown Example

## Features
- **Bold**, *Italic*, ~~Strikethrough~~
- Task List:
  - [x] Done
  - [ ] Pending

## Table
| Name | Value |
|------|-------|
| One  | 1     |
| Two  | 2     |

## Code Block
\`\`\`js
console.log('Hello, world!');
\`\`\`


            `
  },

  {
    id: 3,
    title: 'PostgreSQL Essentials: Powerful, Open-Source Relational Database',
    excerpt:
      'PostgreSQL is a robust, enterprise-grade open-source database system known for extensibility and SQL compliance.',
    category: 'Databases',
    date: 'July 24, 2023',
    readTime: '7 min read',
    author: 'Ragnar Lothbrok',
    thumbnail: '/thumbnail3.png',
    authorImg: 'https://i.pravatar.cc/150?u=kenshi3',
    coverImg: '/cover3.png',
    content: `
PostgreSQL, also known as Postgres, is a powerful, open-source object-relational database system used by organizations of all sizes.

💡 Why PostgreSQL?

- ACID compliant
- Extensible via custom data types, functions, and extensions
- Full-text search, JSON support, geospatial queries (PostGIS)
- Active open-source community

🚀 Core Features:

- Strong SQL compliance
- MVCC for concurrent transactions
- Custom functions in languages like PL/pgSQL, Python, etc.
- Role-based authentication and permissions

🔧 Basic Setup:

Install PostgreSQL:
- On macOS: brew install postgresql
- On Ubuntu: sudo apt install postgresql

Start using the 'psql' CLI:

\c mydatabase
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, age INT);
INSERT INTO users (name, age) VALUES ('Alice', 25);
SELECT * FROM users;

🔐 Security:

- Enable SSL
- Use roles and granular permissions
- Encrypt sensitive columns (or use extensions)

PostgreSQL is ideal for applications needing reliable, feature-rich relational data management — from web apps to financial systems.
`
  }



];