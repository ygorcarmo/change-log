import { Router } from "express"
import { body, validationResult } from "express-validator"
import { handleInputErrors } from "../../modules/middleware.js"
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../handlers/product.js"

const productRouter = Router()

productRouter.get("/", getProducts)

productRouter.get("/:id", getProduct)

productRouter.post(
  "/",
  body("name").isString(),
  handleInputErrors,
  createProduct
)

productRouter.put(
  "/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
)

productRouter.delete("/:id", deleteProduct)

export default productRouter
