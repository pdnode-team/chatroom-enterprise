import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { secretKey } from "./init.js";
import userRoutes from "./routes/users.js";

import indexRoutes from "./routes/index.js";

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

// 启动服务
serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
