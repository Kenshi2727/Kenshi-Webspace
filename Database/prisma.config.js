require('dotenv').config();
const { defineConfig, env } = require('prisma/config');

module.exports = defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'jsx prisma/seed.js',
    },
    datasource: {
        url: process.env.DATABASE_URL
    }
});
