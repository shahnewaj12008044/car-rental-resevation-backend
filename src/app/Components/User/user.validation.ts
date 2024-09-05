import { z } from "zod";
import { Role } from "./user.constant";


// Username schema
const userNameValidationSchema = z.object({
    firstName: z
      .string()
      .trim()
      .max(20, 'First name cannot be more than 20 characters')
      .min(1, 'First Name is required'),
    middleName: z.string().trim().optional(),
    lastName: z
      .string()
      .trim()
      .regex(/^[A-Za-z]+$/, 'Last Name is not valid')
      .min(1, 'Last Name is required'),
  });
  

const userRegistrationValidationSchema = z.object({
    body:z.object({
        name: userNameValidationSchema,
        email: z.string().email("Please input valid Email Id").min(1,"Email is required"),
        role: z.array(z.enum([...Role] as [string, ...string[]])),
        password:z.string().min(6,"Password can not be less than 6 letters").max(25,"Password can not be more than 25 characters!!"),
        phone:z.string().min(11,"Phone must be 11 digits in Bangladesh"),
        address:z.string()
    })
})


export const userValidations = {
    userRegistrationValidationSchema,
}