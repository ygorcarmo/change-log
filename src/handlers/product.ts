import { Request, Response } from "express"
import { dbClient } from "../server.js"
import RequestContext from "../utils/RequestContext.js"

export const getProducts = async (req: Request, res: Response) => {
  const ctx = RequestContext.get(req)

  const user = await dbClient.user.findUnique({
    where: {
      id: ctx?.userClaims.id,
    },
    include: {
      products: true,
    },
  })

  if (!user) return res.status(400).json({ message: "something went wrong" })

  res.json({ data: user.products })
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const ctx = RequestContext.get(req)
    const productId = req.params.id

    const product = await dbClient.product.findUnique({
      where: {
        id: productId,
        userId: ctx?.userClaims.id,
      },
    })
    if (!product) return res.status(400).json({ message: "Product not found" })

    res.json({ data: product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Somthing went wrong" })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const ctx = RequestContext.get(req)

    const product = await dbClient.product.create({
      data: {
        name: req.body.name,
        userId: ctx?.userClaims.id!,
      },
    })

    res.json({ data: product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const ctx = RequestContext.get(req)

    const product = await dbClient.product.update({
      data: {
        name: req.body.name,
        updates: req.body.updates,
      },
      where: {
        id: req.params.id,
        userId: ctx?.userClaims.id,
      },
    })
    console.log(product)
    res.json({ data: product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const ctx = RequestContext.get(req)

    const product = await dbClient.product.delete({
      where: {
        id: req.params.id,
        userId: ctx?.userClaims.id,
      },
    })
    console.log(product)
    res.json({ message: "Product Deleted" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "something went wrong" })
  }
}
