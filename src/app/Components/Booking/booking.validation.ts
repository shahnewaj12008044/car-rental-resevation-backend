
import { z } from "zod";

const time24HourFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, "Date is required."), // Assuming the date is in string format, adjust if necessary.
    car:z.string(),
    startTime: z.string().min(1,"Start time is required."),
 // Can be null
    gps: z.boolean().default(false),
    childSeat: z.boolean().default(false),
    drivingLicense: z.string().min(1,"Driving license is required."),
    nidOrPassport: z.string().min(1,"NID or Passport is required."),
    phone: z.string().min(1,"Phone number is required."),
    premiumInsurance: z.boolean().default(false),
    fullInsurance: z.boolean().default(false),
    basicInsurance: z.boolean().default(false),

    // Example of using the schema for validation
  }),
});
const updateBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, "Date is required.").optional(), // Assuming the date is in string format, adjust if necessary.
    car:z.string().optional(),
    startTime: z.string().min(1,"Start time is required.").optional(),
    isBooked: z.enum(["pending", "approved", "cancelled"], {
      required_error: "Booking status is required.",
    }).optional(),
    payment: z.enum(["pending", "paid"]).optional(), // Can be null
    gps: z.boolean().default(false).optional(),
    childSeat: z.boolean().default(false).optional(),
    drivingLicense: z.string().min(1,"Driving license is required.").optional(),
    nidOrPassport: z.string().min(1,"NID or Passport is required.").optional(),
    phone: z.string().min(1,"Phone number is required.").optional(),
    premiumInsurance: z.boolean().default(false).optional(),
    fullInsurance: z.boolean().default(false).optional(),
    basicInsurance: z.boolean().default(false).optional(),

    // Example of using the schema for validation
  }),
});
const updateMyBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, "Date is required.").optional(), // Assuming the date is in string format, adjust if necessary.
    car:z.string().optional(),
    startTime: z.string().min(1,"Start time is required.").optional(),
    gps: z.boolean().default(false).optional(),
    childSeat: z.boolean().default(false).optional(),
    drivingLicense: z.string().min(1,"Driving license is required.").optional(),
    nidOrPassport: z.string().min(1,"NID or Passport is required.").optional(),
    phone: z.string().min(1,"Phone number is required.").optional(),
    premiumInsurance: z.boolean().default(false).optional(),
    fullInsurance: z.boolean().default(false).optional(),
    basicInsurance: z.boolean().default(false).optional(),

    // Example of using the schema for validation
  }),
});

const returnBookingValidation = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().regex(time24HourFormat, {
      message: "Invalid time format. Please use HH:MM in 24-hour format.",
    }),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  returnBookingValidation,
  updateBookingValidationSchema,
  updateMyBookingValidationSchema,
};
