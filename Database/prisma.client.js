const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient()

// Graceful shutdown

// SIGNAL INTERRUPT-termination request from console(CTRL+C)
process.on("SIGINT", async () => {
    console.log("🔴 Received SIGINT. Closing Prisma...");
    await prisma.$disconnect();
    process.exit(0);
});

// SIGNAL TERMINATE-termination request from other sources (e.g., System)
process.on("SIGTERM", async () => {
    console.log("🟠 Received SIGTERM. Closing Prisma...");
    await prisma.$disconnect();
    process.exit(0);
});


module.exports = prisma;