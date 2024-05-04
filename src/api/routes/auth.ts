import { Router } from "express"
import { createNewUser, signIn } from "../../handlers/user.js"

const authRouter = Router()

authRouter.post("/user", createNewUser)
authRouter.post("/signin", signIn)

export default authRouter
