import { Router } from "express";
const productRouter = Router();
productRouter.get("/", (req, res) => {
    res.json({ message: "heelo product" });
});
productRouter.get("/:id", (req, res) => { });
productRouter.post("/", (req, res) => { });
productRouter.put("/:id", (req, res) => { });
productRouter.delete("/:id", (req, res) => { });
export default productRouter;
//# sourceMappingURL=product.js.map