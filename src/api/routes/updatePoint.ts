import { Router, Request, Response } from "express"
import { checkSchema } from "express-validator"
import { handleInputErrors } from "../../modules/middleware.js"

const updatePointRouter = Router()

updatePointRouter.get("/", (req, res) => {})

updatePointRouter.get("/:id", (req, res) => {})

updatePointRouter.post(
  "/",
  checkSchema({
    name: {
      isString: true,
      optional: false,
    },
    description: {
      isString: true,
      optional: false,
    },
  }),
  handleInputErrors,
  (req: Request, res: Response) => {}
)

updatePointRouter.put(
  "/:id",
  checkSchema({
    name: {
      isString: true,
      optional: false,
    },
    description: {
      isString: true,
      optional: false,
    },
    updateId: {
      isString: true,
      optional: false,
    },
  }),
  handleInputErrors,
  (req: Request, res: Response) => {}
)

updatePointRouter.delete("/:id", (req, res) => {})

export default updatePointRouter
