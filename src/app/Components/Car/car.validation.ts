import { z, ZodLazy } from "zod";

const createCarValidationSchema = z.object({
   body:z.object({
        name:z.string().min(1,"Name is required!!"),
        description:z.string().min(1,"Descriptin is required!!"),
        color:z.string().min(1,"color is required!!"),
        isElectric:z.boolean(),
        features:z.array(z.string()),
        pricePerHour:z.number(),
    })
})

export const CarValidations = {
    createCarValidationSchema,
}