import { z } from 'zod'

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.email('Please provide a valid email address.'),
  phone: z.string().max(40).optional().or(z.literal('')),
  inquiryType: z.string().min(2, 'Please select an inquiry type.').max(80),
  subject: z.string().trim().min(3, 'Please provide a short subject.').max(120),
  message: z.string().trim().min(20, 'Please write a more detailed message.').max(2000),
})

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>
