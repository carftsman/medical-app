import { z } from 'zod';
 
export const patientDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
      'Name can contain only letters and single spaces'
    ),
 
  phone: z
    .string()
    .trim()
    .length(10, 'Mobile number must be 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
 
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(100, 'Email is too long'),
});