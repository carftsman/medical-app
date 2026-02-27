import { z } from "zod";

export const familyMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter full name")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be under 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can contain only letters"),

  age: z
    .string()
    .min(1, "Please enter age")
    .regex(/^\d+$/, "Age must be a number")
    .refine((val) => Number(val) > 0 && Number(val) <= 120, {
      message: "Enter a valid age",
    }),

  mobile: z
    .string()
    .min(1, "Please enter mobile number")
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),

  email: z
    .string()
    .min(1, "Please enter email")
    .email("Enter valid email"),

  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select gender" }),
  }),

  relation: z
    .string()
    .min(1, "Please select relation"),
});