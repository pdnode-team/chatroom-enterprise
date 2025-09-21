import dotenv from "dotenv";
dotenv.config(); // 手动加载 .env 文件

// Prisma
import { PrismaClient } from "./generated/prisma/index.js";
export const prisma = new PrismaClient();

// JWT
export const secretKey: string | undefined = process.env.JWT_SECRET;
export const PORT: string | number | undefined = process.env.PORT;
