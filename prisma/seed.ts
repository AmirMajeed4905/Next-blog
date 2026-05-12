
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("User ban gaya!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());