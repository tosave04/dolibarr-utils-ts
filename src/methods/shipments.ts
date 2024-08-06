import { Dolibarr } from "../dolibarr.class"
import type { Shipment } from "../interfaces/Shipment.interfaces"

export function shipments(this: Dolibarr) {
	/**
	 * List shipments
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Limit for list
	 * @param	number	parameters.page				Page number
	 * @param	string	parameters.thirdparty_ids	Thirdparty ids to filter shipments of (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<Shipment[]>					Array of shipment objects
	 */
	const list = this.commonList<ShipmentsListParameters, Shipment>("shipments")

	/**
	 * Create shipment object
	 * @param	Partial<Shipment>	request_data	Request data
	 * @return	Promise<number>						ID of shipment
	 */
	const create = this.commonCreate<Shipment>("shipments")

	/**
	 * Delete shipment
	 * @param	number		id		Shipment ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("shipments")

	/**
	 * Get properties of a shipment object
	 * Return an array with shipment informations
	 * @param	number		id		ID of shipment
	 * @return	Promise<Shipment>	data without useless information
	 */
	const getById = this.commonGetById<{}, Shipment>("shipments")

	/**
	 * Update shipment general fields (won't touch lines of shipment)
	 * @param	number	id					Id of shipment to update
	 * @param	array	Partial<Shipment>	Datas
	 * @return	Promise<Shipment>
	 */
	const update = this.commonUpdate<Shipment>("shipments")

	/**
	 * Close a shipment (Classify it as "Delivered")
	 * @param	number	id				Expedition ID
	 * @param	number	data.notrigger	Disabled triggers
	 * @return	Promise<Shipment>
	 */
	const close = this.commonClose<Shipment>("shipments")

	/**
	 * Delete a line to given shipment
	 * @param	number	id			Id of shipment to update
	 * @param	number	lineid		Id of line to delete
	 * @return	Promise<Shipment>
	 */
	const deleteLine = (id: number, lineid: number, parameters?: {}, init?: RequestInit) =>
		this.delete<Shipment>(`shipments/${id}/lines/${lineid}`, parameters, init)

	/**
	 * Validate a shipment
	 * This may record stock movements if module stock is enabled and option to
	 * decrease stock on shipment is on.
	 * @param	number		id		Shipment ID
	 * @param	number		notrigger		1=Does not execute triggers, 0= execute triggers
	 * @return	Promise<>
	 */
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
