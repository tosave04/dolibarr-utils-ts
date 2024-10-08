import { z } from "zod"

export const CategorySchema = z
	.object({
		client_largeur: z.number(),
		fk_parent: z.number(),
		label: z.string(),
		description: z.string(),
		color: z.string(),
		visible: z.number(),
		type: z.number(),
		childs: z.array(z.any()),
		id: z.string(),
		entity: z.number(),
		import_key: z.any(),
		array_options: z.array(z.any()),
		array_languages: z.any(),
		contacts_ids: z.any(),
		linked_objects: z.any(),
		linkedObjectsIds: z.any(),
		origin: z.any(),
		origin_id: z.any(),
		ref: z.any(),
		ref_ext: z.any(),
		status: z.any(),
		state_id: z.any(),
		region_id: z.any(),
		demand_reason_id: z.any(),
		transport_mode_id: z.any(),
		model_pdf: z.any(),
		last_main_doc: z.any(),
		fk_bank: z.any(),
		note_public: z.any(),
		note_private: z.any(),
		date_creation: z.number(),
		date_validation: z.any(),
		date_modification: z.number(),
		date_cloture: z.any(),
		user_author: z.any(),
		user_creation: z.number(),
		user_creation_id: z.number(),
		user_valid: z.any(),
		user_validation: z.any(),
		user_validation_id: z.any(),
		user_closing_id: z.any(),
		user_modification: z.number(),
		user_modification_id: z.number(),
		specimen: z.number(),
	})
	.partial()
	.catchall(z.any())

export interface Category extends z.infer<typeof CategorySchema> {}
