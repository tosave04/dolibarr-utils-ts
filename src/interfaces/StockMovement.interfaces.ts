import { z } from "zod"

export const StockMovementSchema = z
	.object({
		product_id: z.string(),
		warehouse_id: z.string(),
		qty: z.string(),
		type: z.string(),
		tms: z.number(),
		datem: z.number(),
		price: z.string(),
		fk_user_author: z.string(),
		label: z.string(),
		fk_origin: z.string(),
		origin_id: z.string(),
		origintype: z.string(),
		origin_type: z.string(),
		inventorycode: z.string(),
		batch: z.any(),
		id: z.string(),
		entity: z.any(),
		import_key: z.any(),
		array_options: z.array(z.any()),
		array_languages: z.any(),
		contacts_ids: z.any(),
		linked_objects: z.any(),
		linkedObjectsIds: z.any(),
		origin: z.any(),
		ref: z.any(),
		ref_ext: z.any(),
		statut: z.any(),
		status: z.any(),
		state_id: z.any(),
		region_id: z.any(),
		demand_reason_id: z.any(),
		transport_mode_id: z.any(),
		last_main_doc: z.any(),
		fk_bank: z.any(),
		date_creation: z.any(),
		date_validation: z.any(),
		date_modification: z.any(),
		date_cloture: z.any(),
		user_author: z.any(),
		user_creation: z.any(),
		user_creation_id: z.any(),
		user_valid: z.any(),
		user_validation: z.any(),
		user_validation_id: z.any(),
		user_closing_id: z.any(),
		user_modification: z.any(),
		user_modification_id: z.any(),
		specimen: z.number(),
		eatby: z.string(),
		sellby: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface StockMovement extends z.infer<typeof StockMovementSchema> {}
