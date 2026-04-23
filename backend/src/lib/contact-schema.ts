import { z } from 'zod'

export const contactInquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  inquiryType: z.string().min(2).max(80),
  subject: z.string().min(3).max(120),
  message: z.string().min(20).max(2000),
})

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>
