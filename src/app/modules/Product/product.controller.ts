import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { ProductServices } from './product.service'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProduct(req.file, req.body)
  res.status(200).json({
    success: true,
    message: 'Product created successfully',
    data: result,
  })
})
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params)

  const result = await ProductServices.updateProductIntoDB(
    req.params.id as string,
    req.body,
  )
  res.status(200).json({
    success: true,
    message: 'Product updated created successfully',
    data: result,
  })
})
const getProduct = catchAsync(async (req: Request, res: Response) => {


  const result = await ProductServices.getProductFromDB(req.query)
  res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    data: result,
  })
})

export const ProductControllers = {
  createProduct,
  updateProduct,
  getProduct
}
