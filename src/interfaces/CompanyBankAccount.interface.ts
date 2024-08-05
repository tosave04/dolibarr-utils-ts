import { z } from "zod"

// TODO: create interface for CompanyBankAccount
export const CompanyBankAccountSchema = z.object({}).partial().catchall(z.any())

export interface CompanyBankAccount extends z.infer<typeof CompanyBankAccountSchema> {}
