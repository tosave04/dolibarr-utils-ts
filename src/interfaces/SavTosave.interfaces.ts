import { z } from "zod"

import { ContactSchema } from "./Contact.interfaces"
import { InvoiceSchema } from "./Invoice.interfaces"
import { ShipmentSchema } from "./Shipment.interfaces"
import { ThirdpartySchema } from "./Thirdparty.interfaces"

export const SavTosaveSchema = z
	.object({
		id: z.number(),
		ref: z.string(),
		entity: z.number(),
		statut: z.enum(["open", "progress", "shipped", "closed"]).optional(),
		elements: z.string().optional(),
		recovery: z.string().optional(),
		adresse: z.string().optional(),
		suivi: z.string().optional(),
		fk_soc: z.number(),
		fk_order: z.number().optional(),
		date_creation: z.number().optional(),
		tms: z.number().optional(),
		date_cloture: z.number().optional(),
		fk_user_author: z.number().optional(),
		fk_user_close: z.number().optional(),
		fk_shipping_method: z.number().optional(),
		info_client: z.literal(0).or(z.literal(1)).optional(),
		a_valider: z.literal(0).or(z.literal(1)).optional(),
		fk_administrator: z.number().optional(),
		date_livraison: z.number().optional(),
	})
	.catchall(z.any())

export interface SavTosave extends z.infer<typeof SavTosaveSchema> {}

export const EncoursSchema = z.object({
	opened: z.number(),
	total_ht: z.number(),
	total_ttc: z.number(),
	refs: z.record(z.string()),
	refsopened: z.record(z.string()),
})

export interface Encours extends z.infer<typeof EncoursSchema> {}

export const AllForDashboardSchema = z.object({
	thirdparty: ThirdpartySchema.extend({ encours: EncoursSchema.optional() }).partial(),
	invoice: InvoiceSchema,
	shipment: ShipmentSchema,
	billing_contact: ContactSchema,
	shipping_contact: ContactSchema,
	sav: SavTosaveSchema.optional(),
	savs: z.array(SavTosaveSchema).optional(),
})

export interface AllForDashboard extends z.infer<typeof AllForDashboardSchema> {}
