import { getConnInfo } from "@hono/node-server/conninfo";
import bcrypt from "bcrypt";
import type {Context, Next} from "hono";
import jwt from "jsonwebtoken";
import { secretKey, EMAIL_PASSWORD } from "./init.js";
import nodemailer from "nodemailer";
import {APP_CODES} from "./codes.js";


// 配置邮件
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
        user: "info@mail.pdnode.com",
        pass: EMAIL_PASSWORD,
    },
});


// ----------
//  工具函数
// ----------
// 密码加密
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

//密码验证
export const verifyPassword = async (hash: string, password: string) => {
    return await bcrypt.compare(password, hash);
};

// JWT生成
export const generateToken = (data: object): string => {
    return jwt.sign(data, secretKey!, { expiresIn: "1h" });
};

// JWT验证

export const verifyToken = (token: string): boolean => {
    try {
        jwt.verify(token, secretKey!); // 返回 string | JwtPayload
        return true; // 如果没有抛异常，就返回 true
    } catch (err) {
        return false; // 验证失败返回 false
    }
};

// 速率限制
export const getClientKey = (c: Context): string => {
    // 优先使用代理头部（X-Forwarded-For 或 CF-Connecting-IP）
    const forwardedFor = c.req.header("X-Forwarded-For") ||
        c.req.header("CF-Connecting-IP");
    if (forwardedFor) {
        // 有可能是多个 IP，取第一个
        return forwardedFor.split(",")[0].trim();
    }

    // Node 原生环境：使用 getConnInfo
    const info = getConnInfo(c);
    if (info.remote.address) {
        return info.remote.address;
    }

    // Fallback
    return "unknown";
};

// 是否登录
export const isLogin = async (c: Context, next: Next) => {
    const authHeader = c.req.header('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ status: APP_CODES.NO_AUTHORIZATION }, 401)
    }


    const token = authHeader.substring(7)

    try {
        const isVerify = verifyToken(token)
        if (!isVerify) {
            return c.json({ status: APP_CODES.AUTH_FAILED }, 401)
        }

        const data = jwt.decode(token)

        c.set("user", data)
        await next()
    }catch (e: any){
        if (e.name === 'TokenExpiredError') {
            return c.json({ status: APP_CODES.TOKEN_EXPIRED }, 401)
        }
        return c.json({ status: APP_CODES.AUTH_FAILED }, 401)
    }

}

// 发送邮件
export const sendEmail = async (subject: string, text: string, to: string) => {
    return await transporter.sendMail({
        from: '"Pdnode Chat" <info@mail.pdnode.com>', // 必须和 transporter.auth.user 一致
        to,
        subject,
        text
    });
}