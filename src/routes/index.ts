import { Hono } from "hono";
import { APP_CODES } from "../codes.js";

const router = new Hono();

// 基础路由
router.get("/", (c) => {
    return c.text("Hello Pdnode!");
});

// 健康检查
router.all("/healthy", (c) => {
    return c.json({ status: APP_CODES.HEALTHY });
});

export default router;
