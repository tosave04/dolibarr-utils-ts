import { DolibarrApi } from "../DolibarrApi.class.js"
import type { StockMovement } from "../interfaces/StockMovement.interfaces.js"

export function stockmovements(this: DolibarrApi): ReturnType<typeof stockmovementsTypes> {
	const list = this.commonList<StockmovementsListParameters, StockMovement>("stockmovements")

	const create = this.commonCreate<{
		product_id: number
		warehouse_id: number
		qty: number
		type?: number
		lot?: string
		movementcode?: string
		movementlabel?: string
		price?: string
		datem?: string
		dlc?: string
		dluo?: string
		origin_type?: string
		origin_id?: string
	}>("stockmovements")

	return {
		list,
		create,
	}
}

export type StockmovementsListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	sqlfilters?: string
	properties?: string
}

export declare function stockmovementsTypes(this: DolibarrApi): {
	/**
	 * Get a list of stock movement
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.product_id:=:1) and (t.date_creation:<:'20160101')"
	 * @param	string	parameters.properties		Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<StockMovement[]>		Array of warehouse objects
	 */
	list: (parameters?: StockmovementsListParameters | undefined, init?: RequestInit) => Promise<StockMovement[]>

	/**
	 * Create stock movement object.
	 * You can use the following message to test this RES API:
	 * { "product_id": 1, "warehouse_id": 1, "qty": 1, "lot": "", "movementcode": "INV123", "movementlabel": "Inventory 123", "price": 0 }
	 * "price" Can be set to update AWP (Average Weighted Price) when you make a stock increase
	 * "dlc" Eat-by date. Will be used if lot does not exists yet and will be created.
	 * "dluo" Sell-by date. Will be used if lot does not exists yet and will be created.
	 * @param	number	data.product_id		Id product id {@min 1} {@from body} {@required true}
	 * @param	number	data.warehouse_id	Id warehouse {@min 1} {@from body} {@required true}
	 * @param	number	data.qty			Qty to add (Use negative value for a stock decrease) {@from body} {@required true}
	 * @param	number	data.type			Optionally specify the type of movement. 0=input (stock increase by a stock transfer), 1=output (stock decrease by a stock transfer), 2=output (stock decrease), 3=input (stock increase). {@from body} {@type int}
	 * @param	string	data.lot			Lot {@from body}
	 * @param	string	data.movementcode	Movement code {@example INV123} {@from body}
	 * @param	string	data.movementlabel	Movement label {@example Inventory number 123} {@from body}
	 * @param	string	data.price			To update AWP (Average Weighted Price) when you make a stock increase (qty must be higher then 0). {@from body}
	 * @param	string	data.datem			Date of movement {@from body} {@type date}
	 * @param	string	data.dlc			Eat-by date. {@from body} {@type date}
	 * @param	string	data.dluo			Sell-by date. {@from body} {@type date}
	 * @param	string	data.origin_type	Origin type (Element of source object, like 'project', 'inventory', ...)
	 * @param	string	data.origin_id		Origin id (Id of source object)
	 * @return	Promise<number>				ID of stock movement
	 */
	create: (
		data: Partial<{
			product_id: number
			warehouse_id: number
			qty: number
			type?: number
			lot?: string
			movementcode?: string
			movementlabel?: string
			price?: string
			datem?: string
			dlc?: string
			dluo?: string
			origin_type?: string
			origin_id?: string
		}>,
		init?: RequestInit
	) => Promise<number>
}
