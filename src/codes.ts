export const APP_CODES = {
    HEALTHY: "HEALTHY", // 健康
    USER_CREATE: "USER_CREATE", // 用户创建
    NOT_JSON: "NOT_JSON", // 非JSON格式提交的数据
    NO_EMAIL_OR_PASSWORD: "NO_EMAIL_OR_PASSWORD", // 缺少邮箱或者密码
    EMAIL_FORMAT: "EMAIL_FORMAT", // 邮箱格式错误
    EMAIL_EXISTS: "EMAIL_EXISTS", // 邮箱已被占用
    USER_ERROR: "USER_ERROR", // 创建用户时出现问题
    AUTH_FAILED: "AUTH_FAILED", // 验证失败
    AUTH_SUCCESS: "AUTH_SUCCESS", // 验证成功
    SEND_EMAIL_SUCCESS: "SEND_EMAIL_SUCCESS", // 发送邮件成功
    SEND_EMAIL_FAILED: "SEND_EMAIL_FAILED", // 发送邮件失败
    NO_AUTHORIZATION: "NO_AUTHORIZATION", // 没有对应的响应头
    TOKEN_EXPIRED: "TOKEN_EXPIRED", // TOKEN已过期
    NO_EXISTS_USER: "NO_EXISTS_USER", // 无此用户
    USER_VERIFIED: "USER_VERIFIED", // 用户已被验证（邮箱）
} as const

export type APP_CODES = typeof APP_CODES[keyof typeof APP_CODES]
