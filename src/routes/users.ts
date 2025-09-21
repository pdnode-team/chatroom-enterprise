// routes/users.ts
import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import createUser from "../services/users/create.js";
import loginUser from "../services/users/login.js";
import createEmailVerify from "../services/users/createEmailVerify.js";
import verifyEmail from "../services/users/verifyEmail.js";

import { getClientKey,isLogin } from "../tools.js";


const router = new Hono();

// 给整个路由加限流
router.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 分钟
    limit: 10,
    keyGenerator: getClientKey,
    standardHeaders: "draft-6", // 返回速率限制信息
}));

router.use("/email/create",isLogin)

router.post("/register", async (c) => {
    return await createUser(c);
});

router.post("/login", async (c) => {
    return await loginUser(c);
});

router.post("/email/create", async (c) => {
    return await createEmailVerify(c);
})

router.get("/email/verify", async (c) => {
    return await verifyEmail(c)
})

export default router;
