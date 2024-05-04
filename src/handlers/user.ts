import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js"
import { dbClient } from "../server.js"
import { Request, Response } from "express"

export const createNewUser = async (req: Request, res: Response) => {
  const user = await dbClient.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  })
  const token = createJWT(user)
  res.json({ token })
}

export const signIn = async (req: Request, res: Response) => {
  const user = await dbClient.user.findUnique({
    where: { username: req.body.username },
  })

  if (!user) return res.status(401).json({ message: "Unauthorized" })

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) return res.status(401).json({ message: "Unauthorized" })

  const token = createJWT(user)
  res.json({ token })
}
