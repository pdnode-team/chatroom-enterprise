import dotenv from "dotenv";
dotenv.config(); // 手动加载 .env 文件

// Prisma
import { PrismaClient } from "./generated/prisma/index.js";
export const prisma = new PrismaClient();

// ----------
//     ENV
// ----------

// JWT
export const secretKey: string | undefined = process.env.JWT_SECRET;
export const PORT: string | number | undefined = process.env.PORT;

// EMAIL
export const EMAIL_PASSWORD: string | undefined = process.env.EMAIL_PASSWORD;

// SITE URL
export const SITE_URL: string | undefined = process.env.SITE_URL;
