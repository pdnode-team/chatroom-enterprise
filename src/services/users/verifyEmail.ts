import type {Context} from "hono";
import {APP_CODES} from "../../codes.js";
import {verifyToken, decodeToken} from "../../tools.js";
import {prisma} from "../../init.js";


const verifyEmail = async (c: Context) => {
  const token = c.req.query("token")
  if (!token) {
    return c.json({status: APP_CODES.MISSING_ARGUMENTS}, 400)
  }

  if (!verifyToken(token)) {
    return c.json({status: APP_CODES.AUTH_FAILED}, 401)
  }

  const data = decodeToken(token)

  // console.log(data)

  if (data.type != "emailVerify") {
    return c.json({status: APP_CODES.AUTH_FAILED}, 400)
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: data.uid,
    }
  })

  if (userData!.isVerify) {
    return c.json({
      status: APP_CODES.USER_VERIFIED
    }, 400)
  }

  try {
    await prisma.user.update({
      where: {
        id: data.uid,
      }, data: {isVerify: true}
    })
  } catch (e) {
    c.json({status: APP_CODES.ERROR}, 500)
  }
  return c.json({status: APP_CODES.USER_VERIFY}, 200)


}

export default verifyEmail;