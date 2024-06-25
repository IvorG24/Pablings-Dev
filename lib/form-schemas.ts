import * as z from "zod";
const { object, string } = z;

export const signInSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = object({
  firstname: string({ required_error: "first name is required" }),
  lastname: string({ required_error: "last name is required" }),
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignUpValues = z.infer<typeof signUpSchema>;
export const stepServiceSchema = z.object({
  service: z.string().min(1, "Please choose a service"),
});

export const stepExtraServicesSchema = z.object({
  extraservices: z.array(z.string()).optional(),
});

export const stepStaffSchema = z.object({
  barber: z.string().min(1, "Select a barber"),
});

export const stepDateTimeSchema = z.object({
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
});

export const stepPersonalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
});

export const confirmationSchema = z.object({
  totalprice: z.number(),
});
export const combinedSchema = stepServiceSchema
  .merge(stepExtraServicesSchema)
  .merge(stepStaffSchema)
  .merge(stepDateTimeSchema)
  .merge(stepPersonalInfoSchema)
  .merge(confirmationSchema);

export type AppointmentValues = z.infer<typeof combinedSchema>;
