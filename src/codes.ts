export const APP_CODES = {
  // 系统健康
  HEALTHY: "HEALTHY",
  // 用户创建
  USER_CREATE: "USER_CREATE",
  // 非JSON格式提交的数据
  NOT_JSON: "NOT_JSON",
  // 缺少必要参数
  MISSING_ARGUMENTS: "MISSING_ARGUMENTS",
  // 邮箱格式错误
  EMAIL_FORMAT: "EMAIL_FORMAT",
  // 邮箱已被占用
  EMAIL_EXISTS: "EMAIL_EXISTS",
  // 创建用户时出现问题
  USER_ERROR: "USER_ERROR",
  // 验证失败
  AUTH_FAILED: "AUTH_FAILED",
  // 验证成功
  AUTH_SUCCESS: "AUTH_SUCCESS",
  // 发送邮件成功
  SEND_EMAIL_SUCCESS: "SEND_EMAIL_SUCCESS",
  // 发送邮件失败
  SEND_EMAIL_FAILED: "SEND_EMAIL_FAILED",
  // 没有对应的响应头
  NO_AUTHORIZATION: "NO_AUTHORIZATION",
  // TOKEN已过期
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  // 无此用户
  NO_EXISTS_USER: "NO_EXISTS_USER",
  // 用户已被验证（邮箱）
  USER_VERIFIED: "USER_VERIFIED",
  // 用户验证成功（邮箱）
  USER_VERIFY: "USER_VERIFY",
  // 出现未知错误
  ERROR: "ERROR",

} as const

export type APP_CODES = typeof APP_CODES[keyof typeof APP_CODES]
