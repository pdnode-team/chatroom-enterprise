import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { PORT, secretKey } from "./init.js";
import indexRoutes from "./routes/index.js";
import userRoutes from "./routes/users.js";
import { getClientKey } from "./tools.js";
// ----------
//  检查设置
// ----------

if (!secretKey) {
  throw new Error("Missing JWT_SECRET environment variable");
}

// ----------
//   初始化
// ----------

export const app = new Hono();

// ----------
//    路由
// ----------
app.route("/", indexRoutes);
app.route("/users", userRoutes);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: "draft-6",
    keyGenerator: getClientKey,
  }),
);

// 启动服务
serve({
  fetch: app.fetch,
  port: Number(PORT),
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
