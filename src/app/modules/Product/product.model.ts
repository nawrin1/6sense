import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'
import { NextFunction } from 'express';

const Productschema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    discount: {
      type: Number,
      required: [true, 'Product discount is required'],
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true,
    },
    productCode: {
      type: String,
      required: [true, 'Product code is required'],
      unique: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Stock Out', 'In Stock'],
        message: '{VALUE} is not supported',
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

Productschema.pre<TProduct>('save', async function (next:NextFunction) {
  

  const existing = await Product.findOne({ productCode: this.productCode as any});
  if (existing) {
    const err = new Error(`Product code "${this.productCode as any}" already exists.`);
    return next(err);
  }

  next();
});
export const Product = model<TProduct>('Product', Productschema)
