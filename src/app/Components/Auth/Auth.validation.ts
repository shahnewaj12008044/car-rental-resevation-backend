import { z } from "zod";

const singInValidationSchema = z.object({
    body:z.object({
        email:z.string().email(),
        password:z.string()
    })
})

export const AuthValidations = {
    singInValidationSchema,
    
}