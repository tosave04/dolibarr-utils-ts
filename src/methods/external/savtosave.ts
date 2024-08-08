import { DolibarrApi } from "../../DolibarrApi.class.js"
import type { DashboardTosave } from "../../interfaces/external/DashboardTosave.interfaces.js"
import type { SavTosave } from "../../interfaces/external/SavTosave.interfaces.js"

export function savtosave(this: DolibarrApi) {
	/**
	 * List savs
	 * @param	string	sortfield		Sort field
	 * @param	string	sortorder		Sort order
	 * @param	number	limit			Limit for list
	 * @param	number	page			Page number
	 * @param	string	sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<SavTosave[]>	Array of order objects
	 */
	const list = this.commonList<SavtosaveListParameters, SavTosave>("savtosave")

	/**
	 * Ping sav object
	 * Return true if sav object is available
	 * @return	boolean
	 */
	const ping = (init?: RequestInit) => this.get<boolean>(`savtosave/ping`, undefined, init)

	/**
	 * Get properties of a sav object
	 * Return an array with sav informations
	 * @param	number		id		ID of sav
	 * @return	Promise<SavTosave>	data without useless information
	 */
	const getById = this.commonGetById<{}, SavTosave>("savtosave")

	/**
	 * Update sav
	 * @param	number	            id				Id of sav to update
	 * @param	Partial<SavTosave>	request_data	Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<SavTosave>("savtosave")

	/**
	 * Update ckeckbox "a_valider"
	 * @param	number	id		    Id of sav to update
	 * @param	number	value		A valider (1 or 0)
	 * @param	number	author_id	Author id
	 * @return	Promise<number>
	 */
	const toValidate = (id: number, value: number, author_id: number, init?: RequestInit) =>
		this.put<number>(`savtosave/sav/${id}/avalider/${value}/${author_id}`, {}, init)

	/**
	 * Update checkbox "info_client"
	 * @param	number	id		    Id of sav to update
	 * @param	number	value		Info client (1 or 0)
	 * @param	number	author_id	Author id
	 * @return	Promise<number>
	 */
	const pending = (id: number, value: number, author_id: number, init?: RequestInit) =>
		this.put<number>(`savtosave/sav/${id}/infoclient/${value}/${author_id}`, {}, init)

	/**
	 * Update shipping date
	 * @param	number	id				Id of sav to update
	 * @param	string	datelivraison	Shipping date (yyyy-mm-dd)
	 * @param	number	author_id		Author id
	 * @return	Promise<number>
	 */
	const updateShippingDate = (id: number, datelivraison: string, author_id: number, init?: RequestInit) =>
		this.put<number>(`savtosave/sav/${id}/shippingdate/${datelivraison}/${author_id}`, {}, init)

	/**
	 * Update shipping method
	 * @param	number	id		        Id of sav to update
	 * @param	number	shippingid		Id of shipping method
	 * @param	number	author_id		Author id
	 * @return	Promise<number>
	 */
	const updateShippingMethod = (id: number, shippingid: number, author_id: number, init?: RequestInit) =>
		this.put<number>(`savtosave/sav/${id}/shippingmethod/${shippingid}/${author_id}`, {}, init)

	/**
	 * List for Dashboard
	 * Get a detailed list for the dashboard of orders invoiced in progress or having an after-sales service.
	 * With the additional information: invoice, shipment, billing contact, shipping contact, thirdparty, sav, savs.
	 * @return	Promise<DashboardTosave>	Array of order objects
	 */
	const getAllForDashboard = (init?: RequestInit) => this.get<DashboardTosave>(`savtosave/dashboard`, undefined, init)

	return {
		list,
		ping,
		getById,
		update,
		toValidate,
		pending,
		updateShippingDate,
		updateShippingMethod,
		getAllForDashboard,
	}
}

type SavtosaveListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	sqlfilters?: string
}
