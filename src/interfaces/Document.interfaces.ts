import { z } from "zod"

export const DocumentSchema = z
	.object({
		name: z.string(),
		path: z.string(),
		level1name: z.string(),
		relativename: z.string(),
		fullname: z.string(),
		date: z.number(),
		size: z.number(),
		type: z.string(),
		label: z.string(),
		entity: z.string(),
		filename: z.string(),
		filepath: z.string(),
		fullpath_orig: z.string(),
		description: z.string(),
		keywords: z.string(),
		cover: z.string(),
		position: z.string(),
		gen_or_uploaded: z.string(),
		extraparams: z.string(),
		date_c: z.number(),
		date_m: z.number(),
		fk_user_c: z.string(),
		fk_user_m: z.string(),
		acl: z.string(),
		src_object_type: z.string(),
		src_object_id: z.string(),
		id: z.string(),
		ref: z.string(),
		share: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface Document extends z.infer<typeof DocumentSchema> {}
