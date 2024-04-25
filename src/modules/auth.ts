import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { UserClaims } from "../types.js"
import RequestContext from "../utils/RequestContext.js"
import bcrypt from "bcrypt"

const secret = process.env.JWT_SECRET || ""

export const createJWT = (user: User) => {
  const token = jwt.sign({ id: user.id, username: user.username }, secret)
  return token
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer) return res.status(401).json({ message: "Not Authorized" })

  const [, token] = bearer.split(" ")

  if (!token) return res.status(401).json({ message: "Not Authorized" })

  try {
    const user = jwt.verify(token, secret)
    RequestContext.bind(req, user as UserClaims)
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: "Not Authorized" })
  }
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}
