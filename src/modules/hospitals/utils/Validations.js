import { z } from "zod";

export const patientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter patient name")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be under 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can contain only letters"),

  mobile: z
    .string()
    .min(1, "Please enter mobile number")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  email: z
    .string()
    .min(1, "Please enter email ID")
    .email("Enter a valid email address"),

  reason: z
    .string()
    .min(1, "Please enter reason for visit")
    .min(3, "Reason must be at least 3 characters"),

  dob: z
    .string()
    .min(1, "Please select date of birth")
    .refine((value) => {
      const [d, m, y] = value.split("/").map(Number);
      const date = new Date(y, m - 1, d);
      return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
      );
    }, "Invalid date of birth"),
});
