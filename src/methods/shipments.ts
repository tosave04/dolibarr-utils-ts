import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Shipment } from "../interfaces/Shipment.interfaces.js"

export function shipments(this: DolibarrApi): ReturnType<typeof shipmentsTypes> {
	const list = this.commonList<ShipmentsListParameters, Shipment>("shipments")

	const create = this.commonCreate<Shipment>("shipments")

	const deleteObject = this.commonDelete("shipments")

	const getById = this.commonGetById<{}, Shipment>("shipments")

	const update = this.commonUpdate<Shipment>("shipments")

	const close = this.commonClose<Shipment>("shipments")

	const deleteLine = (id: number, lineid: number, parameters?: {}, init?: RequestInit) =>
		this.delete<Shipment>(`shipments/${id}/lines/${lineid}`, parameters, init)

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
	properties?: string
}

export declare function shipmentsTypes(this: DolibarrApi): {
	/**
	 * List shipments
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Limit for list
	 * @param	number	parameters.page				Page number
	 * @param	string	parameters.thirdparty_ids	Thirdparty ids to filter shipments of (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @param	string	parameters.properties		Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<Shipment[]>					Array of shipment objects
	 */
	list: (parameters?: ShipmentsListParameters | undefined, init?: RequestInit) => Promise<Shipment[]>

	/**
	 * Create shipment object
	 * @param	Partial<Shipment>	request_data	Request data
	 * @return	Promise<number>						ID of shipment
	 */
	create: (data: Partial<Shipment>, init?: RequestInit) => Promise<number>

	/**
	 * Delete shipment
	 * @param	number		id		Shipment ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	delete: (
		id: number,
		init?: RequestInit
	) => Promise<{
		success: {
			code: number
			message: string
		}
	}>

	/**
	 * Get properties of a shipment object
	 * Return an array with shipment informations
	 * @param	number		id		ID of shipment
	 * @return	Promise<Shipment>	data without useless information
	 */
	getById: (id: number, parameters?: {} | undefined, init?: RequestInit) => Promise<Shipment>

	/**
	 * Update shipment general fields (won't touch lines of shipment)
	 * @param	number	id					Id of shipment to update
	 * @param	array	Partial<Shipment>	Datas
	 * @return	Promise<Shipment>
	 */
	update: (id: number, data: Partial<Shipment>, init?: RequestInit) => Promise<Shipment>

	/**
	 * Close a shipment (Classify it as "Delivered")
	 * @param	number	id				Expedition ID
	 * @param	number	data.notrigger	Disabled triggers
	 * @return	Promise<Shipment>
	 */
	close: (
		id: number,
		data: {
			status: 2 | 3
			note_private?: string
			notrigger?: number
		},
		init?: RequestInit
	) => Promise<Shipment>

	/**
	 * Delete a line to given shipment
	 * @param	number	id			Id of shipment to update
	 * @param	number	lineid		Id of line to delete
	 * @return	Promise<Shipment>
	 */
	deleteLine: (id: number, lineid: number, parameters?: {}, init?: RequestInit) => Promise<Shipment>

	/**
	 * Validate a shipment
	 * This may record stock movements if module stock is enabled and option to
	 * decrease stock on shipment is on.
	 * @param	number		id		Shipment ID
	 * @param	number		notrigger		1=Does not execute triggers, 0= execute triggers
	 * @return	Promise<>
	 */
	validate: (
		id: number,
		data?: {
			notrigger?: number
		},
		init?: RequestInit
	) => Promise<Shipment>
}
