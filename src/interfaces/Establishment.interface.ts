import { z } from "zod"

// TODO: Please update the interface to match the response of the API
export const EstablishmentSchema = z.object({}).partial().catchall(z.any())

export interface Establishment extends z.infer<typeof EstablishmentSchema> {}
