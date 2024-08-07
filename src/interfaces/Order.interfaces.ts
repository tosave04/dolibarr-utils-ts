import { z } from "zod"
import { LineSchema } from "./Line.interfaces.js"
import { ContactsIdsSchema } from "./ContactsIds.interfaces.js"

export const OrderSchema = z
	.object({
		socid: z.any(),
		ref_client: z.any(),
		contactid: z.any(),
		statut: z.any(),
		billed: z.any(),
		brouillon: z.any(),
		cond_reglement_code: z.any(),
		deposit_percent: z.any(),
		fk_account: z.any(),
		mode_reglement_id: z.any(),
		mode_reglement_code: z.any(),
		availability_id: z.any(),
		availability_code: z.any(),
		availability: z.any(),
		demand_reason_id: z.any(),
		demand_reason_code: z.any(),
		date: z.any(),
		date_commande: z.any(),
		date_livraison: z.any(),
		delivery_date: z.any(),
		fk_remise_except: z.any(),
		remise_percent: z.any(),
		remise_absolue: z.any(),
		info_bits: z.any(),
		rang: z.any(),
		special_code: z.any(),
		source: z.any(),
		warehouse_id: z.any(),
		extraparams: z.array(z.any()),
		linked_objects: z.array(z.any()),
		user_author_id: z.any(),
		user_valid: z.any(),
		lines: z.array(LineSchema),
		fk_multicurrency: z.any(),
		multicurrency_code: z.any(),
		multicurrency_tx: z.any(),
		multicurrency_total_ht: z.any(),
		multicurrency_total_tva: z.any(),
		multicurrency_total_ttc: z.any(),
		module_source: z.any(),
		pos_source: z.any(),
		expeditions: z.any(),
		online_payment_url: z.any(),
		id: z.any(),
		entity: z.any(),
		validateFieldsErrors: z.array(z.any()),
		import_key: z.any(),
		array_options: z.any(),
		array_languages: z.any(),
		contacts_ids: z.array(ContactsIdsSchema),
		linkedObjectsIds: z.any(),
		linkedObjectsFullLoaded: z.any(),
		canvas: z.any(),
		fk_project: z.any(),
		fk_projet: z.any(),
		contact_id: z.any(),
		user: z.any(),
		origin: z.any(),
		origin_id: z.any(),
		ref: z.any(),
		ref_ext: z.any(),
		status: z.any(),
		country_id: z.any(),
		country_code: z.any(),
		state_id: z.any(),
		region_id: z.any(),
		cond_reglement_id: z.any(),
		transport_mode_id: z.any(),
		shipping_method_id: z.any(),
		model_pdf: z.any(),
		last_main_doc: z.any(),
		fk_bank: z.any(),
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
		date_creation: z.any(),
		date_validation: z.any(),
		date_modification: z.any(),
		date_cloture: z.any(),
		user_author: z.any(),
		user_creation: z.any(),
		user_creation_id: z.any(),
		user_validation: z.any(),
		user_validation_id: z.any(),
		user_closing_id: z.any(),
		user_modification: z.any(),
		user_modification_id: z.any(),
		specimen: z.any(),
		fk_incoterms: z.any(),
		label_incoterms: z.any(),
		location_incoterms: z.any(),
		ref_customer: z.any(),
		remise: z.any(),
		cond_reglement_doc: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Order extends z.infer<typeof OrderSchema> {}
