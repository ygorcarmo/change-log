import { User } from "@prisma/client"
import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface RequestWithUserClaims extends Request {
  user: UserClaims | string
}

export interface UserClaims extends JwtPayload {
  id: string
  username: string
}
