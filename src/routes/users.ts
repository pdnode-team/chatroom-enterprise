// routes/users.ts
import { Hono } from "hono";
import { createUser } from "../services/users.js";

const router = new Hono();

router.post("/", async (c) => {
    return await createUser(c);
});

export default router;
