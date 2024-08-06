import { Dolibarr } from "../dolibarr.class"
import type { Warehouse } from "../interfaces/Warehouse.interface"

export function warehouses(this: Dolibarr) {
	/**
	 * List warehouses
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	number	parameters.category		Use this param to filter list by category
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.label:like:'WH-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<Warehouse[]>			Array of warehouse objects
	 */
	const list = this.commonList<WarehousesListParameters, Warehouse>("warehouses")

	/**
	 * Create warehouse object
	 * @param	array		Partial<Warehouse>		Request data
	 * @return	Promise<number>						ID of warehouse
	 */
	const create = this.commonCreate<Warehouse>("warehouses")

	/**
	 * Delete warehouse
	 * @param	number		id		Warehouse ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("warehouses")

	/**
	 * Get properties of a warehouse object
	 * Return an array with warehouse informations
	 * @param	number		id		ID of warehouse
	 * @return	Promise<Warehouse>	data without useless information
	 */
	const getById = this.commonGetById<{}, Warehouse>("warehouses")

	/**
	 * Update warehouse
	 * @param	number				id				Id of warehouse to update
	 * @param	Partial<Warehouse>	request_data	Datas
	 * @return	Promise<number>
	 */
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
}
