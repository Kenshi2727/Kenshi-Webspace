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

export const testArticle = {
  id: "demo-1",
  title: "Building My AI Resume Builder: Lessons from a Full-Stack Project",
  excerpt:
    "A behind-the-scenes look at designing, developing, and deploying an AI-powered resume builder using React, Express, PostgreSQL, Clerk, and Gemini AI.",
  cover: null,
  content: `
## Contents

### What Is a Dyson Sphere?

A Dyson Sphere is a hypothetical megastructure built around a star to collect a significant portion of its energy output. The concept was popularized in 1960 by physicist Freeman Dyson, who suggested that an advanced civilization would eventually require vast amounts of energy and might construct structures around its star to meet those needs.

<info>
Contrary to popular belief, Dyson never envisioned a solid shell surrounding a star. Instead, he proposed a swarm of millions or even billions of satellites orbiting the star and collecting solar energy. This arrangement is often called a "Dyson Swarm."
</info>

### Why Would We Need One?

Human civilization's energy consumption has grown continuously throughout history. As our population increases and technology advances, our demand for energy also rises.

The Sun produces approximately 386 septillion watts of power every second. To put this into perspective, humanity currently uses only a tiny fraction of that amount. Capturing even a small percentage of the Sun's output could provide enough energy to power civilization for millions of years.

A Dyson Sphere could support:

* Massive space colonies
* Advanced artificial intelligence systems
* Planetary-scale computing
* Interstellar spacecraft
* Large-scale terraforming projects

## The Kardashev Scale

The idea of Dyson Spheres is closely connected to the Kardashev Scale, a method of measuring a civilization's technological advancement based on its energy consumption.

- #### Type I Civilization
Can harness all the energy available on its home planet.

- #### Type II Civilization

Can harness the total energy output of its star, potentially using a Dyson Sphere.

- #### Type III Civilization

Can utilize the energy of an entire galaxy.

Humanity is currently estimated to be around Type 0.7, meaning we have not yet reached Type I status.

### Could We Actually Build One?

Constructing a Dyson Sphere would be one of the largest engineering projects ever conceived.

The challenges include:

- #### Material Requirements

A traditional solid shell would require more material than exists in all the planets of our Solar System. This is one reason why scientists favor the Dyson Swarm concept.

- #### Manufacturing

Millions of autonomous robots would likely be needed to mine asteroids, process raw materials, and manufacture solar collectors in space.

- #### Orbital Stability

Managing billions of independent satellites without collisions would require highly sophisticated artificial intelligence and navigation systems.

- #### Time Scale

Even with advanced technology, building a Dyson Swarm could take centuries or thousands of years.

### How Would We Detect Alien Dyson Spheres?

If extraterrestrial civilizations have built Dyson Spheres, astronomers might be able to detect them.

A star surrounded by energy-collecting structures would appear dimmer in visible light because some of its energy would be blocked. However, the structures would still radiate heat, producing an unusual infrared signature.

Scientists have searched for such anomalies in astronomical data. While some interesting candidates have been identified, no confirmed Dyson Sphere has ever been discovered.


<success>
One famous example is Tabby's Star, whose unusual brightness fluctuations sparked speculation about alien megastructures. Although natural explanations are now considered more likely, the star renewed public interest in Dyson Spheres.
</success>



### Variations of Dyson Structures

Over time, scientists and science-fiction writers have proposed several alternatives.

- #### Dyson Swarm

A vast collection of orbiting solar collectors.

- #### Dyson Bubble

Energy collectors held in position using solar sails and radiation pressure.

- #### Dyson Ring

A ring of structures orbiting around a star.

- #### Matrioshka Brain

Multiple layers of Dyson-like structures used to power unimaginably large supercomputers.

### Dyson Spheres in Science Fiction

The concept has inspired countless works of science fiction. Dyson Spheres often appear as symbols of civilizations that have transcended planetary limitations and expanded into the cosmos.


<like>
These structures remind us that today's impossible ideas may become tomorrow's engineering projects.
</like>



### The Future of Humanity

Although humanity is nowhere near building a Dyson Sphere, the concept encourages us to think on a cosmic scale. Every major technological achievement—from flight to space travel—once seemed impossible.

If our species survives long enough and continues advancing technologically, future generations may one day begin constructing the first components of a Dyson Swarm around the Sun.

For now, Dyson Spheres remain a bridge between science and imagination, offering a glimpse into what a truly advanced civilization might achieve.

### Conclusion

A Dyson Sphere is more than a science-fiction concept. It represents the ultimate quest for energy and a possible milestone in humanity's journey toward becoming an interplanetary civilization. 



<quote>
Whether built by humans or discovered around distant stars, Dyson Spheres challenge us to imagine a future where the scale of our ambitions matches the scale of the universe itself.
</quote>


![Hot, dust-obscured galaxies (Hot DOGs), like the one circled in purple, may have similar energy signatures to hypothetical alien structures called Dyson spheres, new research suggests. (Image credit: NASA/JPL-Caltech/UCLA)](https://cdn.mos.cms.futurecdn.net/pjCgXoDuVfAQV5SRzErjP8-1280-80.jpg.webp)


`,
  readTime: 6,
  createdAt: "2026-07-03T10:30:00.000Z",
  updatedAt: "2026-07-03T10:30:00.000Z",
};

export const myArticles = [
  {
    id: 'demo-1',
    title: 'How I build Kenshi Webspace — a developer diary',
    excerpt: 'A short tour through architecture, design choices and the lessons I learned while building Kenshi Webspace end-to-end. This demo excerpt is intentionally long to show truncation.',
    status: 'published',
    cover: null,
    content: '# Hello from Kenshi\n\nThis is a demo article used as fallback when the API fails.',
    readTime: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Draft: Ghibli-inspired community art',
    excerpt: 'Ideas for a Ghibli-style hero image that represents community growth and tech with storytelling elements to make it feel warm and adventurous.',
    status: 'draft',
    cover: null,
    content: '## Ideas\n- Community tree\n- Neon circuits',
    readTime: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Draft: Ghibli-inspired community art',
    excerpt: 'Ideas for a Ghibli-style hero image that represents community growth and tech with storytelling elements to make it feel warm and adventurous.',
    status: 'draft',
    cover: null,
    content: '## Ideas\n- Community tree\n- Neon circuits',
    readTime: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    title: 'Ha ha ha ha wo dekho racism ka ladka',
    excerpt: 'Harmony in Racism:a weird concept',
    status: 'rejected',
    cover: null,
    content: '## Ideas\n- Community tree\n- Neon circuits',
    readTime: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const articles = [
  {
    id: 1,
    title: "React Best Practices for Modern Development",
    category: "Technology",
    date: "July 10, 2023",
    readTime: "7 min read",
    excerpt: "Discover the essential patterns and practices that will make your React applications more maintainable, performant, and scalable for production environments.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    trending: true,
    likes: 234,
    views: 1520
  },
  {
    id: 2,
    title: "CSS Grid vs Flexbox: Complete Guide",
    category: "Technology",
    date: "July 5, 2023",
    readTime: "6 min read",
    excerpt: "A comprehensive comparison of CSS Grid and Flexbox layout systems to help you choose the perfect solution for your responsive design challenges.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/blog/tailwindcss/grid-columns.webp",
    likes: 189,
    views: 987
  },
  {
    id: 3,
    title: "Shifting Power in Global Geopolitics",
    category: "Geopolitics",
    date: "July 2, 2023",
    readTime: "8 min read",
    excerpt: "An analysis of how shifting alliances and global economic strategies are reshaping international power balances in the 21st century.",
    image: "https://www.whitehouse.gov/wp-content/uploads/2025/01/Donald-J-Trump.jpg",
    likes: 140,
    views: 1110
  },
  {
    id: 4,
    title: "The Rise and Fall of Ancient Civilizations",
    category: "History",
    date: "June 28, 2023",
    readTime: "9 min read",
    excerpt: "A journey through the stories of ancient civilizations, their rise to power, cultural achievements, and eventual decline.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
    trending: true,
    likes: 305,
    views: 1900
  },
  {
    id: 5,
    title: "Exploring the Mysteries of Black Holes",
    category: "Astronomy",
    date: "June 22, 2023",
    readTime: "10 min read",
    excerpt: "Unveiling what scientists know about black holes, event horizons, and the role they play in shaping the universe.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=250&fit=crop",
    likes: 276,
    views: 1654
  },
  {
    id: 6,
    title: "Cultural Significance of Rituals Across Religions",
    category: "Religion & Culture",
    date: "June 18, 2023",
    readTime: "6 min read",
    excerpt: "Understanding the shared meanings behind diverse rituals across different faiths and how they shape communities.",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=250&fit=crop",
    likes: 120,
    views: 845
  },
  {
    id: 7,
    title: "Top 10 Anime Series to Watch in 2025",
    category: "Anime",
    date: "June 12, 2023",
    readTime: "5 min read",
    excerpt: "A list of must-watch anime series spanning genres from action and fantasy to slice of life and drama.",
    image: "https://tierragamer.com/wp-content/uploads/2023/02/High-School-DxD-Anime-01.jpg",
    trending: true,
    likes: 400,
    views: 2500
  },
  {
    id: 8,
    title: "The Evolution of Modern Literature",
    category: "Literature",
    date: "June 7, 2023",
    readTime: "7 min read",
    excerpt: "Tracing the evolution of literature from classical masterpieces to contemporary digital storytelling.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop",
    likes: 142,
    views: 920
  },
  {
    id: 9,
    title: "Top Destinations for Adventure Travel",
    category: "Travel",
    date: "June 2, 2023",
    readTime: "6 min read",
    excerpt: "Explore breathtaking destinations around the world perfect for adventure seekers and nature enthusiasts.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
    likes: 198,
    views: 1320
  }
];

export const categories = [
  "Technology",
  "Geopolitics",
  "History",
  "Astronomy",
  "Religion & Culture",
  "Anime",
  "Literature",
  "Travel"
];
