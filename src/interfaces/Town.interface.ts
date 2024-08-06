import { z } from "zod"

// TODO: Please update the interface to match the response of the API
export const TownSchema = z.object({}).partial().catchall(z.any())

export interface Town extends z.infer<typeof TownSchema> {}
