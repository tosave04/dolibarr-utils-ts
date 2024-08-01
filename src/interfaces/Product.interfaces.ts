import { z } from "zod"

export const ProductSchema = z
	.object({
		label: z.any(),
		description: z.any(),
		other: z.any(),
		type: z.any(),
		price: z.any(),
		price_formated: z.any(),
		price_ttc: z.any(),
		price_ttc_formated: z.any(),
		price_min: z.any(),
		price_min_ttc: z.any(),
		price_base_type: z.any(),
		multiprices: z.array(z.any()),
		multiprices_ttc: z.array(z.any()),
		multiprices_base_type: z.array(z.any()),
		multiprices_min: z.array(z.any()),
		multiprices_min_ttc: z.array(z.any()),
		multiprices_tva_tx: z.array(z.any()),
		prices_by_qty: z.array(z.any()),
		prices_by_qty_list: z.array(z.any()),
		multilangs: z.array(z.any()),
		default_vat_code: z.any(),
		tva_tx: z.any(),
		remise_percent: z.any(),
		localtax1_tx: z.any(),
		localtax2_tx: z.any(),
		localtax1_type: z.any(),
		localtax2_type: z.any(),
		desc_supplier: z.any(),
		vatrate_supplier: z.any(),
		default_vat_code_supplier: z.any(),
		fourn_multicurrency_price: z.any(),
		fourn_multicurrency_unitprice: z.any(),
		fourn_multicurrency_tx: z.any(),
		fourn_multicurrency_id: z.any(),
		fourn_multicurrency_code: z.any(),
		packaging: z.any(),
		lifetime: z.any(),
		qc_frequency: z.any(),
		stock_reel: z.any(),
		stock_theorique: z.any(),
		cost_price: z.any(),
		pmp: z.any(),
		seuil_stock_alerte: z.any(),
		desiredstock: z.any(),
		duration_value: z.any(),
		fk_default_workstation: z.any(),
		duration_unit: z.any(),
		status: z.any(),
		tosell: z.any(),
		status_buy: z.any(),
		tobuy: z.any(),
		finished: z.any(),
		fk_default_bom: z.any(),
		status_batch: z.any(),
		batch_mask: z.any(),
		customcode: z.any(),
		url: z.any(),
		weight: z.any(),
		weight_units: z.any(),
		length: z.any(),
		length_units: z.any(),
		width: z.any(),
		width_units: z.any(),
		height: z.any(),
		height_units: z.any(),
		surface: z.any(),
		surface_units: z.any(),
		volume: z.any(),
		volume_units: z.any(),
		net_measure: z.any(),
		net_measure_units: z.any(),
		accountancy_code_sell: z.any(),
		accountancy_code_sell_intra: z.any(),
		accountancy_code_sell_export: z.any(),
		accountancy_code_buy: z.any(),
		accountancy_code_buy_intra: z.any(),
		accountancy_code_buy_export: z.any(),
		barcode: z.any(),
		barcode_type: z.any(),
		date_creation: z.any(),
		date_modification: z.any(),
		fk_default_warehouse: z.any(),
		fk_price_expression: z.any(),
		fourn_qty: z.any(),
		fk_unit: z.any(),
		price_autogen: z.any(),
		is_object_used: z.any(),
		mandatory_period: z.any(),
		id: z.any(),
		entity: z.any(),
		import_key: z.any(),
		array_options: z.array(z.any()),
		array_languages: z.any(),
		contacts_ids: z.any(),
		linked_objects: z.any(),
		linkedObjectsIds: z.any(),
		canvas: z.any(),
		ref: z.any(),
		ref_ext: z.any(),
		country_id: z.any(),
		country_code: z.any(),
		state_id: z.any(),
		region_id: z.any(),
		barcode_type_coder: z.any(),
		last_main_doc: z.any(),
		note_public: z.any(),
		note_private: z.any(),
		total_ht: z.any(),
		total_tva: z.any(),
		total_localtax1: z.any(),
		total_localtax2: z.any(),
		total_ttc: z.any(),
		date_validation: z.any(),
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
		duration: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Product extends z.infer<typeof ProductSchema> {}
