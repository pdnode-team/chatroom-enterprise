import type {Context} from "hono";
import { APP_CODES } from "../../codes.js";
import { sendEmail, generateToken } from "../../tools.js"
import {prisma, SITE_URL} from "../../init.js";

const createEmailVerify = async (c: Context) => {

  const user = c.get("user")
  // console.log("createEmailVerify", user)

  const userData = await prisma.user.findUnique({where: {id: user.uid}})

  if (!userData) {
    return c.json({ status: APP_CODES.NO_EXISTS_USER}, 400)
  }
  if (userData.isVerify) {
    return c.json({ status: APP_CODES.USER_VERIFIED }, 400)
  }

  const token = generateToken({uid: user.id, type: "emailVerify"})

  // console.log(userData)

  try {
    await sendEmail("Pdnode Chat Email Verify", `Your Verification Link is ${SITE_URL}/users/email/verify?token=${token}`,userData.email)

  }catch (error) {
    console.error(error)
    return c.json({status: APP_CODES.SEND_EMAIL_FAILED}, 500)

  }



  return c.json({status: APP_CODES.SEND_EMAIL_SUCCESS})
}
export default createEmailVerify