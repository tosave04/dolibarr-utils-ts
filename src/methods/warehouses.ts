import { Dolibarr } from "../dolibarr.class"
import type { Warehouse } from "../interfaces/Warehouse.interface"

export function warehouses(this: Dolibarr) {
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
}
