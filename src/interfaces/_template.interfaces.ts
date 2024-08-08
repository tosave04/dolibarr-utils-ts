import { z } from "zod"

// Define a schema using Zod (replace __NAME__ with the name of the interface)
export const __NAME__Schema = z
	.object({
		// Define a property 'any' that can be of any type
		any: z.any(),
	})

	// Make all properties of the object optional
	.partial()

	// Allow any additional properties of any type
	.catchall(z.any())

// Define a TypeScript interface that matches the structure of BusinessLegalFormSchema
export interface __NAME__Form extends z.infer<typeof __NAME__Schema> {}
