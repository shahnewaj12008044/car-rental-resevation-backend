import { z } from "zod";
import { Role, Status } from "./user.constant";




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
const userUpdateValidationSchema = z.object({
    body:z.object({
        name: z.string().optional(),
        email: z.string().email("Please input valid Email Id").min(1,"Email is required").optional(),
        role: z.enum([...Role] as [string, ...string[]]).optional(),
        password:z.string().min(6,"Password can not be less than 6 letters").max(25,"Password can not be more than 25 characters!!").optional(),
        phone:z.string().min(11,"Phone must be 11 digits in Bangladesh").optional(),
        address:z.string().optional(),
        status:z.enum([...Status] as [string, ...string[]]).optional(),
        isDeleted:z.boolean().optional(),
    })
})


export const userValidations = {
    userRegistrationValidationSchema,
    userUpdateValidationSchema,
}