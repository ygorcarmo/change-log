import express from "express"
import apiRouter from "./api/index.js"
import morgan from "morgan"
import { PrismaClient } from "@prisma/client"
import { protect } from "./modules/auth.js"
import { RequestWithUserClaims } from "./types.js"

const app = express()
const PORT = process.env.PORT || 3000

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const dbClient = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = dbClient

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/api", protect, apiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
