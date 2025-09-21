import { serve } from "@hono/node-server";
import bcrypt from "bcrypt";
import "dotenv/config";
import { Hono } from "hono";
import jwt from "jsonwebtoken";
import validator from "validator";
import { PrismaClient } from "./generated/prisma/index.js";

// JWT Key
const secretKey: string | undefined = process.env.JWT_TOKEN;

// 一些工具函数
// 密码加密
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

//密码验证
const verifyPassword = async (hash: string, password: string) => {
  return await bcrypt.compare(password, hash);
};

// JWT生成
const generateToken = (data: object): string => {
  return jwt.sign(data, secretKey!, { expiresIn: "1h" });
};

// 数据库
const prisma = new PrismaClient();

const app = new Hono();

// 定义状态码
enum APP_CODES {
  GENERAL_HEALTY = "GENERAL_HEALTY",
  USER_CREATE = "USER_CREATE",
  NOT_JSON = "NOT_JSON",
  NO_EMAIL_OR_PASSWORD = "NO_EMAIL_OR_PASSWORD",
  EMAIL_FORMAT = "EMAIL_FORMAT",
  EMAIL_EXISTS = "EMAIL_EXISTS",
  USER_ERROR = "USER_ERROR",
}

// 基础路由
app.get("/", (c) => {
  return c.text("Hello Pdnode!");
});

// 健康检查
app.all("/healthy", (c) => {
  return c.json({ status: APP_CODES.GENERAL_HEALTY });
});

// 创建用户
app.post("/users", async (c) => {
  let body;

  // 检查是否是JSON
  try {
    body = await c.req.json<{ email: string; password: string }>();
  } catch (e) {
    console.error(e);
    return c.json({ status: APP_CODES.NOT_JSON }, 400);
  }

  // 检查用户是否提供密码和邮箱
  if (!body.email || !body.password) {
    return c.json(
      { status: APP_CODES.NO_EMAIL_OR_PASSWORD },
      400,
    );
  }
  // 检查邮箱
  if (!validator.isEmail(body.email)) {
    return c.json({ status: APP_CODES.EMAIL_FORMAT }, 400);
  }

  // 检查邮箱是否存在
  if (await prisma.user.findUnique({ where: { email: body.email } })) {
    return c.json({ status: APP_CODES.EMAIL_EXISTS }, 400);
  }

  // 哈希密码
  let hashedPassword = await hashPassword(body.password);

  let user;
  try {
    user = await prisma.user.create({
      data: {
        email: body.email,
        //提交哈希密码
        password: hashedPassword,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ status: APP_CODES.USER_ERROR }, 500);
  }

  // 创建用户访问密钥
  const token = generateToken({ uid: user.id });

  //创建成功
  return c.json({ status: APP_CODES.USER_CREATE, user, token }, 201);
});

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
