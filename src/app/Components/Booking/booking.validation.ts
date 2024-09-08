import { z } from "zod";

const time24HourFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
const createBookingValidationSchema = z.object({
    body:z.object({
        user:z.string().optional(),
        carId:z.string(),
        date:z.string(),
        startTime: z.string().regex(time24HourFormat, {
            message: "Invalid time format. Please use HH:MM in 24-hour format."
          }),
        
    })
})

const returnBookingValidation = z.object({
    body:z.object({
        bookingId:z.string(),
        endTime: z.string().regex(time24HourFormat, {
            message: "Invalid time format. Please use HH:MM in 24-hour format."
          }),
    })
})



export const BookingValidation = {
    createBookingValidationSchema,
    returnBookingValidation,
}