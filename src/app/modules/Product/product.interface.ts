import { Types } from "mongoose"

export type TStatus="Stock Out" | "In Stock"

export type TProduct={

    name:string,
    description:string,
    price:number,
    discount:number,
    image:string,
    productCode:string,
    category:Types.ObjectId
    status:TStatus
}