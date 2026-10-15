const bcrypt = require("bcrypt");
const prisma = require("../src/config/prisma");

async function main() {
    const existingAdmin = await prisma.user.findUnique({
        where: {
            email: "admin@teamhub.com",
        },
    });

    if (existingAdmin) {
        console.log("Admin user already exists.");
        return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await prisma.user.create({
        data: {
            name: "System Administrator",
            email: "admin@teamhub.com",
            password: hashedPassword,
            role: "ADMIN",
            profile: {
                create: {
                    phone: "",
                    designation: "Administrator",
                },
            },
        },
    });

    console.log("Admin user created successfully.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });