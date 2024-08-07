import { LineSchema } from "./Line.interfaces.js"
import { ContactsIdsSchema } from "./ContactsIds.interfaces.js"
import { LinkedObjectsIdsSchema } from "./LinkedObjectsIds.interfaces.js"

import { z } from "zod"

export const InvoiceSchema = z
	.object({
		brouillon: z.any(),
		socid: z.any(),
		fk_user_author: z.any(),
		fk_user_valid: z.any(),
		fk_user_modif: z.any(),
		date: z.any(),
		datem: z.any(),
		date_livraison: z.any(),
		delivery_date: z.any(),
		ref_client: z.any(),
		ref_customer: z.any(),
		type: z.any(),
		remise_absolue: z.any(),
		remise_percent: z.any(),
		total_ht: z.any(),
		total_tva: z.any(),
		total_localtax1: z.any(),
		total_localtax2: z.any(),
		total_ttc: z.any(),
		revenuestamp: z.any(),
		resteapayer: z.any(),
		close_code: z.any(),
		close_note: z.any(),
		paye: z.any(),
		module_source: z.any(),
		pos_source: z.any(),
		fk_fac_rec_source: z.any(),
		fk_facture_source: z.any(),
		linked_objects: z.array(z.any()),
		date_lim_reglement: z.any(),
		cond_reglement_code: z.any(),
		mode_reglement_code: z.any(),
		fk_bank: z.any(),
		lines: z.array(LineSchema),
		line: z.any(),
		extraparams: z.array(z.any()),
		fac_rec: z.any(),
		date_pointoftax: z.any(),
		fk_multicurrency: z.any(),
		multicurrency_code: z.any(),
		multicurrency_tx: z.any(),
		multicurrency_total_ht: z.any(),
		multicurrency_total_tva: z.any(),
		multicurrency_total_ttc: z.any(),
		situation_cycle_ref: z.any(),
		situation_counter: z.any(),
		situation_final: z.any(),
		tab_previous_situation_invoice: z.array(z.any()),
		tab_next_situation_invoice: z.array(z.any()),
		retained_warranty: z.any(),
		retained_warranty_date_limit: z.any(),
		retained_warranty_fk_cond_reglement: z.any(),
		totalpaid: z.any(),
		totaldeposits: z.any(),
		totalcreditnotes: z.any(),
		sumpayed: z.any(),
		sumpayed_multicurrency: z.any(),
		sumdeposit: z.any(),
		sumdeposit_multicurrency: z.any(),
		sumcreditnote: z.any(),
		sumcreditnote_multicurrency: z.any(),
		remaintopay: z.any(),
		id: z.any(),
		entity: z.any(),
		import_key: z.any(),
		array_options: z.any(),
		array_languages: z.any(),
		contacts_ids: z.array(ContactsIdsSchema),
		linkedObjectsIds: z.array(LinkedObjectsIdsSchema),
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
		model_pdf: z.any(),
		last_main_doc: z.any(),
		fk_account: z.any(),
		note_public: z.any(),
		note_private: z.any(),
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
		cond_reglement_doc: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Invoice extends z.infer<typeof InvoiceSchema> {}
