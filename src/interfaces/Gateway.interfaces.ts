import { z } from "zod"

// TODO: create interface for Gateway
export const GatewaySchema = z.object({}).partial().catchall(z.any())

export interface Gateway extends z.infer<typeof GatewaySchema> {}
