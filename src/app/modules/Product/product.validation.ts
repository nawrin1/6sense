import z from "zod";

const createProductZodSchema=z.object({
    body:z.object({
        name:z.string(),
        description:z.string(),
        price:z.number(),
        discount:z.number(),
        image:z.string().optional(),
        
        category:z.string(),
        status:z.enum(['Stock Out', 'In Stock'])
    })
})

export const updateProductZodSchema = z.object({
  body: z.object({
    status: z.enum(["Stock Out", "In Stock"]).optional(),
    description: z.string().optional(),
    discount: z.number().optional(),
  }),
});



export const ProductValidation={
    createProductZodSchema,
    updateProductZodSchema
}


