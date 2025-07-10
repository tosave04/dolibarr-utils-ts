import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Warehouse } from "../interfaces/Warehouse.interfaces.js"

export function warehouses(this: DolibarrApi): ReturnType<typeof warehousesTypes> {
	const list = this.commonList<WarehousesListParameters, Warehouse>("warehouses")

	const create = this.commonCreate<Warehouse>("warehouses")

	const deleteObject = this.commonDelete("warehouses")

	const getById = this.commonGetById<{}, Warehouse>("warehouses")

	const update = this.commonUpdate<Warehouse>("warehouses")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
	}
}

type WarehousesListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	category?: number
	sqlfilters?: string
	properties?: string
}

export declare function warehousesTypes(this: DolibarrApi): {
	/**
	 * List warehouses
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	number	parameters.category		Use this param to filter list by category
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.label:like:'WH-%') and (t.date_creation:<:'20160101')"
	 * @param	string	parameters.properties	Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<Warehouse[]>			Array of warehouse objects
	 */
	list: (parameters?: WarehousesListParameters | undefined, init?: RequestInit) => Promise<Warehouse[]>

	/**
	 * Create warehouse object
	 * @param	array		Partial<Warehouse>		Request data
	 * @return	Promise<number>						ID of warehouse
	 */
	create: (data: Partial<Warehouse>, init?: RequestInit) => Promise<number>

	/**
	 * Delete warehouse
	 * @param	number		id		Warehouse ID
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
	 * Get properties of a warehouse object
	 * Return an array with warehouse informations
	 * @param	number		id		ID of warehouse
	 * @return	Promise<Warehouse>	data without useless information
	 */
	getById: (id: number, parameters?: {} | undefined, init?: RequestInit) => Promise<Warehouse>

	/**
	 * Update warehouse
	 * @param	number				id				Id of warehouse to update
	 * @param	Partial<Warehouse>	request_data	Datas
	 * @return	Promise<Warehouse>
	 */
	update: (id: number, data: Partial<Warehouse>, init?: RequestInit) => Promise<Warehouse>
}
