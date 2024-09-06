import { z } from "zod";
import { Role } from "./user.constant";




const userRegistrationValidationSchema = z.object({
    body:z.object({
        name: z.string(),
        email: z.string().email("Please input valid Email Id").min(1,"Email is required"),
        role: z.enum([...Role] as [string, ...string[]]),
        password:z.string().min(6,"Password can not be less than 6 letters").max(25,"Password can not be more than 25 characters!!"),
        phone:z.string().min(11,"Phone must be 11 digits in Bangladesh"),
        address:z.string()
    })
})


export const userValidations = {
    userRegistrationValidationSchema,
}