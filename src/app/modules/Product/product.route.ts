import express, { NextFunction, Request, Response } from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { ProductValidation } from './product.validation'
import { ProductControllers } from './product.controller'
import { upload } from '../../utils/sendUtilsToCloudinary'

const router = express.Router()
//post product
router.post(
  '/create-product',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(ProductValidation.createProductZodSchema),
  ProductControllers.createProduct,
)
//update product
router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductControllers.updateProduct,
)

//get product
router.get(
  '/',

  ProductControllers.getProduct,
)

export const ProductRoutes = router
