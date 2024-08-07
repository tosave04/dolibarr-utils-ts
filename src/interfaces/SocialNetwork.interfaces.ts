import { z } from "zod"

// TODO: Please update the interface to match the response of the API
export const SocialNetworkSchema = z.object({}).partial().catchall(z.any())

export interface SocialNetwork extends z.infer<typeof SocialNetworkSchema> {}
