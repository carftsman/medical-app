import { z } from 'zod';
 
/* Debit Card */
export const debitCardSchema = z.object({
  cardNumber: z
    .string()
    .transform(val => val.replace(/\s/g, '')) 
    .refine(val => /^\d{16}$/.test(val), {
      message: 'Enter a valid 16-digit card number',
    }),
 
  cardHolderName: z
    .string()
    .min(3, 'Enter card holder name')
    .regex(/^[A-Za-z ]+$/, 'Name should contain only letters'),
 
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Enter expiry in MM/YY format')
    .refine(value => {
      const [month, year] = value.split('/');
      const expiryDate = new Date(2000 + Number(year), Number(month));
      return expiryDate > new Date();
    }, 'Card has expired'),
 
  cvv: z
    .string()
    .regex(/^\d{3}$/, 'CVV must be 3 digits'),
 
  secureCard: z.boolean().optional(),
});
 
/* UPI */
export const upiSchema = z.object({
  upiId: z
    .string()
    .regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID'),
  saveVpa: z.boolean().optional(),
});
 