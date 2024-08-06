import { Dolibarr } from "../dolibarr.class"
import type { Contact } from "../interfaces/Contact.interfaces"
import type { Line } from "../interfaces/Line.interfaces"
import type { Order } from "../interfaces/Order.interfaces"
import type { Shipment } from "../interfaces/Shipment.interfaces"

export function orders(this: Dolibarr) {
	/**
	 * List orders
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Limit for list
	 * @param	number	parameters.page				Page number
	 * @param	string	parameters.thirdparty_ids	Thirdparty ids to filter orders of (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<Order[]>					Array of order objects
	 */
	const list = this.commonList<OrdersListParameters, Order>("orders")

	/**
	 * Create a sale order
	 * Exemple: { "socid": 2, "date": 1595196000, "type": 0, "lines": [{ "fk_product": 2, "qty": 1 }] }
	 * @param	array	request_data	Request data
	 * @return	Promise<number>			ID of order
	 */
	const create = this.commonCreate<Order>("orders")

	/**
	 * Delete order
	 *
	 * @param	number	id	Order ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("orders")

	/**
	 * Get properties of an order object by id
	 * Return an array with order informations
	 * @param	number			id				ID of order
	 * @param	number			contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Order>	data			without useless information
	 */
	const getById = this.commonGetById<{ contact_list?: 0 | 1 }, Order>("orders")

	/**
	 * Update order general fields (won't touch lines of order)
	 * @param	number			id				Id of order to update
	 * @param	Partial<Order>	request_data	Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<Order>("orders")

	/**
	 * Close an order (Classify it as "Delivered")
	 * @param	number	id				Order ID
	 * @param	number	data.notrigger	Disabled triggers
	 * @return  Promise<number>
	 */
	const close = this.commonClose<number>("orders")

	/**
	 * Unlink a contact type of given order
	 * @param	number	id			Id of order to update
	 * @param	number	contactid	Id of contact
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER).
	 * @return	Promise<number>
	 */
	const unlinkContact = this.commonUnlinkContact("orders")

	/**
	 * Add a contact type of given order
	 * @param	number	id			Id of order to update
	 * @param	number	contactid	Id of contact to add
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER)
	 * @return	Promise<number>
	 */
	const linkContact = this.commomLinkContact("orders")

	/**
	 * Get contacts of given order
	 * Return an array with contact informations
	 * @param	number				id				ID of order
	 * @param	string				parameters.type	Type of the contact (BILLING, SHIPPING, CUSTOMER)
	 * @return	Promise<Contact[]>	data			without useless information
	 */
	const getContacts = (id: number, parameters?: { type?: "BILLING" | "SHIPPING" | "CUSTOMER" }, init?: RequestInit) =>
		this.get<Contact[]>(`orders/${id}/contacts`, parameters, init)

	/**
	 * Get lines of an order
	 * @param	number	id	Id of order
	 * @return	Promise<Line[]>
	 */
	const getLines = (id: number, init?: RequestInit) => this.get<Line[]>(`orders/${id}/lines`, undefined, init)

	/**
	 * Add a line to given order
	 * @param	number			id				Id of order to update
	 * @param	Partial<Line>	request_data	OrderLine data
	 * @return	Promise<number>
	 */
	const addLine = this.commonAddLine("orders")

	/**
	 * Delete a line to given order
	 * @param	number	id		Id of order to update
	 * @param	number	lineid	Id of line to delete
	 * @return	Promise<number>
	 */
	const deleteLine = this.commonDeleteLine("orders")

	/**
	 * Update a line to given order
	 * @param	number			id				Id of order to update
	 * @param	number			lineid			Id of line to update
	 * @param	Partial<Line>	request_data	OrderLine data
	 * @return	Promise<Order | boolean>
	 */
	const updateLine = this.commonUpdateLine<Order | boolean>("orders")

	/**
	 * Tag the order as validated (opened)
	 * Function used when order is reopend after being closed.
	 * @param	number	id	Id of the order
	 * @return	Promise<Order>
	 */
	const reOpen = (id: number, init?: RequestInit) => this.post<Order>(`orders/${id}/reopen`, undefined, init)

	/**
	 * Classify the order as invoiced. Could be also called setbilled
	 * @param	number	id	Id of the order
	 * @return	Promise<Order>
	 */
	const setInvoiced = (id: number, init?: RequestInit) => this.post<Order>(`orders/${id}/setinvoiced`, undefined, init)

	/**
	 * Set an order to draft
	 * @param	number	id					Order ID
	 * @param	number	data.idwarehouse	Warehouse ID to use for stock change (Used only if option STOCK_CALCULATE_ON_VALIDATE_ORDER is on)
	 * @return	Promise<Order>
	 */
	const setToDraft = (id: number, data?: { idwarehouse?: number }, init?: RequestInit) =>
		this.post<Order>(`$orders/${id}/settodraft`, data, init)

	/**
	 * Get the shipments of an order
	 * @param	number	id	Id of the order
	 * @return	Promise<Shipment[]>
	 */
	const getShipments = (id: number, init?: RequestInit) =>
		this.get<Shipment[]>(`orders/${id}/shipment`, undefined, init)

	/**
	 * Create the shipment of an order
	 * @param	number	id				Id of the order
	 * @param	number	warehouse_id	Id of a warehouse
	 * @return	Promise<number>
	 */
	const createShipment = (id: number, warehouse_id: number, init?: RequestInit) =>
		this.post<number>(`orders/${id}/shipment/${warehouse_id}`, undefined, init)

	/**
	 * Validate an order
	 * If you get a bad value for param notrigger check, provide this in body
	 * {
	 *   "idwarehouse": 0,
	 *   "notrigger": 0
	 * }
	 * @param	number	id	Order ID
	 * @param	number	data.idwarehouse	Warehouse ID
	 * @param	number	data.notrigger		1=Does not execute triggers, 0= execute triggers
	 * @return	Promise<Order>
	 */
	const validate = (id: number, data?: { idwarehouse?: number; notrigger?: number }, init?: RequestInit) =>
		this.post<Order>(`orders/${id}/validate`, data, init)

	/**
	 * Create an order using an existing proposal.
	 * @param	number	proposalid	Id of the proposal
	 * @return	Promise<number>
	 */
	const createFromProposal = (proposalid: number, init?: RequestInit) =>
		this.post<number>(`orders/createfromproposal/${proposalid}`, undefined, init)

	/**
	 * Get properties of an order object by ref_ext
	 * Return an array with order informations
	 * @param	string			ref_ext						External reference of object
	 * @param	number			parameters.contact_list		0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Order>	data						without useless information
	 */
	const getByExtRef = this.commonGetByRefExt<{ contact_list?: 0 | 1 }, Order>("orders")

	/**
	 * Get properties of an order object by ref
	 * Return an array with order informations
	 * @param	string			ref							Ref of object
	 * @param	number			parameters.contact_list		0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Order>	data						without useless information
	 */
	const getByRef = this.commonGetByRef<{ contact_list?: 0 | 1 }, Order>("orders")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		close,
		unlinkContact,
		linkContact,
		getContacts,
		getLines,
		addLine,
		deleteLine,
		updateLine,
		reOpen,
		setInvoiced,
		setToDraft,
		getShipments,
		createShipment,
		validate,
		createFromProposal,
		getByExtRef,
		getByRef,
	}
}

export type OrdersListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	thirdparty_ids?: string
	sqlfilters?: string
}
