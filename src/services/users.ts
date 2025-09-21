import type { Context } from "hono";
import validator from "validator";
import { APP_CODES } from "../codes.js";
import { prisma } from "../init.js";
import { generateToken, hashPassword } from "../tools.js";

export const createUser = async (c: Context) => {
    let body;

    // 检查是否是JSON
    try {
        body = await c.req.json<{ email: string; password: string }>();
    } catch (e) {
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
        return c.json({ status: APP_CODES.USER_ERROR }, 500);
    }

    // 创建用户访问密钥
    const token = generateToken({ uid: user.id });

    //创建成功
    return c.json({ status: APP_CODES.USER_CREATE, user, token }, 201);
};
