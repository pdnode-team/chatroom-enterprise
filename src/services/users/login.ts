import type { Context } from "hono";
import validator from "validator";
import { APP_CODES } from "../../codes.js";
import { prisma } from "../../init.js";
import { generateToken, verifyPassword } from "../../tools.js";

const loginUser = async (c: Context) => {
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

    // 搜索用户
    let user = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });

    if (user) {
        if (await verifyPassword(user.password, body.password)) {
            const token = generateToken({ uid: user.id });
            return c.json({ status: APP_CODES.AUTH_SUCCESS, token }, 200);
        } else {
            return c.json({ status: APP_CODES.AUTH_FAILED }, 401);
        }
    } else {
        return c.json({ status: APP_CODES.AUTH_FAILED }, 401);
    }
};
export default loginUser;
