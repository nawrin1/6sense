
import { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

export const validateRequest=(schema:ZodObject)=>{
    return catchAsync(async(req,res,next)=>{
        await schema.parseAsync({
            body:req.body
        })
        next();


    }
    )

}