import { z } from "zod"

export const ContactsIdsSchema = z
	.object({
		parentId: z.string(),
		source: z.string(),
		socid: z.string(),
		id: z.string(),
		nom: z.string(),
		civility: z.string(),
		lastname: z.string(),
		firstname: z.string(),
		email: z.string(),
		login: z.string(),
		photo: z.string(),
		statuscontact: z.string(),
		rowid: z.string(),
		code: z.enum(["BILLING", "SHIPPING", "CUSTOMER"]),
		libelle: z.string(),
		status: z.string(),
		fk_c_type_contact: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface ContactsIds extends z.infer<typeof ContactsIdsSchema> {}
