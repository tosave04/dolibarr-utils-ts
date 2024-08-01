import { ShipmentLineSchema } from "./ShipmentLine.interfaces"

import { z } from "zod"

export const ShipmentSchema = z
	.object({
		socid: z.any(),
		ref_client: z.any(),
		ref_customer: z.any(),
		brouillon: z.any(),
		entrepot_id: z.any(),
		tracking_number: z.any(),
		tracking_url: z.any(),
		billed: z.any(),
		model_pdf: z.any(),
		trueWeight: z.any(),
		weight_units: z.any(),
		trueWidth: z.any(),
		width_units: z.any(),
		trueHeight: z.any(),
		height_units: z.any(),
		trueDepth: z.any(),
		depth_units: z.any(),
		trueSize: z.any(),
		date_delivery: z.any(),
		date: z.any(),
		date_expedition: z.any(),
		date_shipping: z.any(),
		date_creation: z.any(),
		date_valid: z.any(),
		meths: z.any(),
		listmeths: z.any(),
		lines: z.array(ShipmentLineSchema),
		id: z.any(),
		entity: z.any(),
		import_key: z.any(),
		array_options: z.array(z.any()),
		array_languages: z.any(),
		contacts_ids: z.any(),
		linked_objects: z.any(),
		linkedObjectsIds: z.any(),
		canvas: z.any(),
		fk_project: z.any(),
		contact_id: z.any(),
		user: z.any(),
		origin: z.any(),
		origin_id: z.any(),
		ref: z.any(),
		ref_ext: z.any(),
		statut: z.any(),
		status: z.any(),
		country_id: z.any(),
		country_code: z.any(),
		state_id: z.any(),
		region_id: z.any(),
		mode_reglement_id: z.any(),
		cond_reglement_id: z.any(),
		demand_reason_id: z.any(),
		transport_mode_id: z.any(),
		shipping_method_id: z.any(),
		last_main_doc: z.any(),
		fk_bank: z.any(),
		fk_account: z.any(),
		note_public: z.any(),
		note_private: z.any(),
		total_ht: z.any(),
		total_tva: z.any(),
		total_localtax1: z.any(),
		total_localtax2: z.any(),
		total_ttc: z.any(),
		name: z.any(),
		lastname: z.any(),
		firstname: z.any(),
		civility_id: z.any(),
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
		specimen: z.any(),
		fk_incoterms: z.any(),
		label_incoterms: z.any(),
		location_incoterms: z.any(),
		user_author_id: z.any(),
		shipping_method: z.any(),
		size_units: z.any(),
		fk_multicurrency: z.any(),
		multicurrency_code: z.any(),
		multicurrency_subprice: z.any(),
		multicurrency_total_ht: z.any(),
		multicurrency_total_tva: z.any(),
		multicurrency_total_ttc: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Shipment extends z.infer<typeof ShipmentSchema> {}
