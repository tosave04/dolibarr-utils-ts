import { z } from "zod"

export const LineSchema = z
	.object({
		fk_propal: z.any(),
		fk_parent_line: z.any(),
		desc: z.any(),
		fk_product: z.any(),
		fk_product_type: z.any(),
		product_type: z.any(),
		qty: z.any(),
		tva_tx: z.any(),
		vat_src_code: z.any(),
		subprice: z.any(),
		remise_percent: z.any(),
		fk_remise_except: z.any(),
		rang: z.any(),
		fk_fournprice: z.any(),
		pa_ht: z.any(),
		marge_tx: z.any(),
		marque_tx: z.any(),
		special_code: z.any(),
		info_bits: z.any(),
		total_ht: z.any(),
		total_tva: z.any(),
		total_ttc: z.any(),
		remise: z.any(),
		price: z.any(),
		ref: z.any(),
		product_ref: z.any(),
		libelle: z.any(),
		label: z.any(),
		product_label: z.any(),
		product_desc: z.any(),
		product_tobatch: z.any(),
		product_barcode: z.any(),
		localtax1_tx: z.any(),
		localtax2_tx: z.any(),
		localtax1_type: z.any(),
		localtax2_type: z.any(),
		total_localtax1: z.any(),
		total_localtax2: z.any(),
		date_start: z.any(),
		date_end: z.any(),
		multicurrency_subprice: z.any(),
		multicurrency_total_ht: z.any(),
		multicurrency_total_tva: z.any(),
		multicurrency_total_ttc: z.any(),
		id: z.any(),
		rowid: z.any(),
		fk_unit: z.any(),
		date_debut_prevue: z.any(),
		date_debut_reel: z.any(),
		date_fin_prevue: z.any(),
		date_fin_reel: z.any(),
		weight: z.any(),
		weight_units: z.any(),
		width: z.any(),
		width_units: z.any(),
		height: z.any(),
		height_units: z.any(),
		length: z.any(),
		length_units: z.any(),
		surface: z.any(),
		surface_units: z.any(),
		volume: z.any(),
		volume_units: z.any(),
		multilangs: z.any(),
		product: z.any(),
		duree: z.any(),
		entity: z.any(),
		validateFieldsErrors: z.array(z.any()),
		import_key: z.any(),
		array_options: z.any(),
		array_languages: z.any(),
		contacts_ids: z.any(),
		linked_objects: z.any(),
		linkedObjectsIds: z.any(),
		linkedObjectsFullLoaded: z.array(z.any()),
		canvas: z.any(),
		origin: z.any(),
		origin_id: z.any(),
		ref_ext: z.any(),
		statut: z.any(),
		status: z.any(),
		state_id: z.any(),
		region_id: z.any(),
		barcode_type: z.any(),
		barcode_type_coder: z.any(),
		demand_reason_id: z.any(),
		transport_mode_id: z.any(),
		last_main_doc: z.any(),
		fk_bank: z.any(),
		fk_account: z.any(),
		lines: z.array(z.any()),
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
		specimen: z.any(),
		description: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Line extends z.infer<typeof LineSchema> {}
