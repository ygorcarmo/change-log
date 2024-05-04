import { Router, Request, Response } from "express"
import { body, checkSchema } from "express-validator"
import { handleInputErrors } from "../../modules/middleware.js"

const updateRouter = Router()

updateRouter.get("/", (req, res) => {})

updateRouter.get("/:id", (req, res) => {})

updateRouter.post(
  "/",
  checkSchema({
    title: {
      exists: true,
      isString: true,
    },
    body: {
      isString: true,
      exists: true,
    },
  }),
  handleInputErrors,
  (req: Request, res: Response) => {}
)

updateRouter.put(
  "/:id",
  checkSchema({
    title: {
      isString: true,
      optional: true,
    },
    body: {
      isString: true,
      optional: true,
    },
    status: {
      optional: true,
      isIn: {
        options: ["IN_PROGRESS", "SHIPPED", "DEPRECATED"],
      },
    },
    version: {
      isString: true,
      optional: true,
    },
    asset: {
      isString: true,
      optional: true,
    },
  }),
  handleInputErrors,
  (req: Request, res: Response) => {}
)

updateRouter.delete("/:id", (req, res) => {})

export default updateRouter
