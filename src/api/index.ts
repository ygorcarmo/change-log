import { Router } from "express"
import productRouter from "./routes/product.js"
import updateRouter from "./routes/update.js"
import updatePointRouter from "./routes/updatePoint.js"

const apiRouter = Router()

apiRouter.use("/product", productRouter)
apiRouter.use("/update", updateRouter)
apiRouter.use("/updatepoint", updatePointRouter)

export default apiRouter
