import QueryBuilder from '../../builder/QueryBuilder'
import { generateProductCode } from '../../utils/generateProductCode'
import { sendImageToCloudinary } from '../../utils/sendUtilsToCloudinary'
import { TProduct } from './product.interface'
import { Product } from './product.model'



const createProductIntoDB = async (
  file: any,
  productData: Partial<TProduct>,
) => {
  const productCode = generateProductCode(productData.name as string)

  console.log('Generated Product Code:', productCode)
  let imageName =
    (productData?.name as string).replace(/\s+/g, '_') + '_' + productCode
  const { secure_url } = (await sendImageToCloudinary(
    imageName,
    file?.path,
  )) as any as { secure_url: string }

  const productWithCode = {
    ...productData,
    productCode,
    image: secure_url as string,
  }

  return Product.create(productWithCode)
}
const getProductFromDB = async (
 query:Record<string, unknown>
) => {
   const productQuery = new QueryBuilder(Product.find(), query)
    .search(["name"])
    .filter()
    .DiscountCalculation();
   

  const result = await productQuery.modelQuery;
  console.log(result)
  return result;
}

const updateProductIntoDB = async (
  id: string,
  productData: Partial<TProduct>,
) => {
  const updateFields: Partial<TProduct> = {}
  if (productData?.status) updateFields.status = productData.status
  if (productData?.description)
    updateFields.description = productData.description
  if (productData.discount !== undefined)
    updateFields.discount = productData.discount

  // Find the product by id and update
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true },
  )

  return updatedProduct
}

export const ProductServices = {
  createProduct: createProductIntoDB,
  updateProductIntoDB,
  getProductFromDB
}
