import { z } from "zod"

import { ContactSchema } from "../Contact.interfaces"
import { InvoiceSchema } from "../Invoice.interfaces"
import { OrderSchema } from "../Order.interfaces"
import { ShipmentSchema } from "../Shipment.interfaces"
import { ThirdpartySchema } from "../Thirdparty.interfaces"
import { SavTosaveSchema } from "./SavTosave.interfaces"

export const DashboardTosaveSchema = z.array(
	OrderSchema.extend({
		invoice: InvoiceSchema,
		shipment: ShipmentSchema,
		shipping_contact: ContactSchema,
		billing_contact: ContactSchema,
		thirdparty: ThirdpartySchema,
		sav: SavTosaveSchema,
		savs: z.array(SavTosaveSchema),
	}).partial()
)

export interface DashboardTosave extends z.infer<typeof DashboardTosaveSchema> {}
