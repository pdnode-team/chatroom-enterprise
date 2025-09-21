// routes/users.ts
import { Hono } from "hono";
import createUser from "../services/users/create.js";
import loginUser from "../services/users/login.js";

const router = new Hono();

router.post("/register", async (c) => {
    return await createUser(c);
});

router.post("/login", async (c) => {
    return await loginUser(c);
});

export default router;
