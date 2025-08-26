const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient()

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("🔴 Received SIGINT. Closing Prisma...");
    await prisma.$disconnect();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("🟠 Received SIGTERM. Closing Prisma...");
    await prisma.$disconnect();
    process.exit(0);
});


module.exports = prisma;