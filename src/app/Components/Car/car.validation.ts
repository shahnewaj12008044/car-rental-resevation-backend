import { z } from "zod";

const createCarValidationSchema = z.object({
   body:z.object({
        name:z.string().min(1,"Name is required!!"),
        description:z.string().min(1,"Descriptin is required!!"),
        color:z.string().min(1,"color is required!!"),
        isElectric:z.boolean(),
        features:z.array(z.string()),
        pricePerHour:z.number(),
        carType: z.string(),
        image: z.string(),
        location: z.string()
    })
})
const updateCarValidationSchema = z.object({
   body:z.object({
        name:z.string().optional(),
        description:z.string().optional(),
        color:z.string().optional(),
        isElectric:z.boolean().optional(),
        features:z.array(z.string()).optional(),
        pricePerHour:z.number().optional(),
        carType: z.string().optional(),
        image: z.string().optional(),
        location: z.string().optional(),
    })
})

export const CarValidations = {
    createCarValidationSchema,
    updateCarValidationSchema,
}