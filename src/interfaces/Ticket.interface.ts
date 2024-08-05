import { z } from "zod"

// TODO: Define the Ticket interface
export const TicketSchema = z.object({}).partial().catchall(z.any())

export interface Ticket extends z.infer<typeof TicketSchema> {}
