import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "./init.js";

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
