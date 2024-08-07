import { z } from "zod"

// TODO: create interface for Representative
export const RepresentativeSchema = z.object({}).partial().catchall(z.any())

export interface Representative extends z.infer<typeof RepresentativeSchema> {}
