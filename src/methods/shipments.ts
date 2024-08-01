import { Dolibarr } from "../dolibarr.class"
import type { Shipment } from "../interfaces/Shipment.interfaces"

export function shipments(this: Dolibarr) {
	const list = this.commonList<ShipmentsListParameters, Shipment>("shipments")

	const create = this.commonCreate<Shipment>("shipments")

	const deleteObject = this.commonDelete("shipments")

	const getById = this.commonGetById<{}, Shipment>("shipments")

	const update = this.commonUpdate<Shipment>("shipments")

	const close = this.commonClose<Shipment>("shipments")

	const deleteLine = this.commonDeleteLine("shipments")

	const validate = this.commonValidate<Shipment>("shipments")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		close,
		deleteLine,
		validate,
	}
}

export type ShipmentsListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	thirdparty_ids?: string
	sqlfilters?: string
}
