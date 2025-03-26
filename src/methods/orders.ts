import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Contact } from "../interfaces/Contact.interfaces.js"
import type { Line } from "../interfaces/Line.interfaces.js"
import type { Order } from "../interfaces/Order.interfaces.js"
import type { Shipment } from "../interfaces/Shipment.interfaces.js"

export function orders(this: DolibarrApi): ReturnType<typeof ordersTypes> {
	const list = this.commonList<OrdersListParameters, Order>("orders")

	const create = this.commonCreate<Order>("orders")

	const deleteObject = this.commonDelete("orders")

	const getById = this.commonGetById<{ contact_list?: 0 | 1 }, Order>("orders")

	const update = this.commonUpdate<Order>("orders")

	const close = this.commonClose<number>("orders")

	const unlinkContact = this.commonUnlinkContact("orders")

	const linkContact = this.commomLinkContact("orders")

	const getContacts = (id: number, parameters?: { type?: "BILLING" | "SHIPPING" | "CUSTOMER" }, init?: RequestInit) =>
		this.get<Contact[]>(`orders/${id}/contacts`, parameters, init)

	const getLines = (id: number, init?: RequestInit) => this.get<Line[]>(`orders/${id}/lines`, undefined, init)

	const addLine = this.commonAddLine("orders")

	const deleteLine = this.commonDeleteLine("orders")

	const updateLine = this.commonUpdateLine<Order | boolean>("orders")

	const reOpen = (id: number, init?: RequestInit) => this.post<Order>(`orders/${id}/reopen`, undefined, init)

	const setInvoiced = (id: number, init?: RequestInit) => this.post<Order>(`orders/${id}/setinvoiced`, undefined, init)

	const setToDraft = (id: number, data?: { idwarehouse?: number }, init?: RequestInit) =>
		this.post<Order>(`$orders/${id}/settodraft`, data, init)

	const getShipments = (id: number, init?: RequestInit) =>
		this.get<Shipment[]>(`orders/${id}/shipment`, undefined, init)

	const createShipment = (id: number, warehouse_id: number, init?: RequestInit) =>
		this.post<number>(`orders/${id}/shipment/${warehouse_id}`, undefined, init)

	const validate = (id: number, data?: { idwarehouse?: number; notrigger?: number }, init?: RequestInit) =>
		this.post<Order>(`orders/${id}/validate`, data, init)

	const createFromProposal = (proposalid: number, init?: RequestInit) =>
		this.post<Order>(`orders/createfromproposal/${proposalid}`, undefined, init)

	const getByExtRef = this.commonGetByRefExt<{ contact_list?: 0 | 1 }, Order>("orders")

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
	properties?: string
}

export declare function ordersTypes(this: DolibarrApi): {
	/**
	 * List orders
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Limit for list
	 * @param	number	parameters.page				Page number
	 * @param	string	parameters.thirdparty_ids	Thirdparty ids to filter orders of (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @param	string	parameters.properties		Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<Order[]>					Array of order objects
	 */
	list: (parameters?: OrdersListParameters | undefined, init?: RequestInit) => Promise<Order[]>

	/**
	 * Create a sale order
	 * Exemple: { "socid": 2, "date": 1595196000, "type": 0, "lines": [{ "fk_product": 2, "qty": 1 }] }
	 * @param	array	request_data	Request data
	 * @return	Promise<number>			ID of order
	 */
	create: (data: Partial<Order>, init?: RequestInit) => Promise<number>

	/**
	 * Delete order
	 *
	 * @param	number	id	Order ID
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
	 * Get properties of an order object by id
	 * Return an array with order informations
	 * @param	number			id				ID of order
	 * @param	number			contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Order>	data			without useless information
	 */
	getById: (
		id: number,
		parameters?:
			| {
					contact_list?: 0 | 1
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Order>

	/**
	 * Update order general fields (won't touch lines of order)
	 * @param	number			id				Id of order to update
	 * @param	Partial<Order>	request_data	Datas
	 * @return	Promise<number>
	 */
	update: (id: number, data: Partial<Order>, init?: RequestInit) => Promise<number>

	/**
	 * Close an order (Classify it as "Delivered")
	 * @param	number	id				Order ID
	 * @param	number	data.notrigger	Disabled triggers
	 * @return  Promise<number>
	 */
	close: (
		id: number,
		data: {
			status: 2 | 3
			note_private?: string
			notrigger?: number
		},
		init?: RequestInit
	) => Promise<number>

	/**
	 * Unlink a contact type of given order
	 * @param	number	id			Id of order to update
	 * @param	number	contactid	Id of contact
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER).
	 * @return	Promise<number>
	 */
	unlinkContact: (
		id: number,
		contactid: number,
		type: "BILLING" | "SHIPPING" | "CUSTOMER",
		init?: RequestInit
	) => Promise<number>

	/**
	 * Add a contact type of given order
	 * @param	number	id			Id of order to update
	 * @param	number	contactid	Id of contact to add
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER)
	 * @return	Promise<number>
	 */
	linkContact: (
		id: number,
		contactid: number,
		type: "BILLING" | "SHIPPING" | "CUSTOMER",
		init?: RequestInit
	) => Promise<number>

	/**
	 * Get contacts of given order
	 * Return an array with contact informations
	 * @param	number				id				ID of order
	 * @param	string				parameters.type	Type of the contact (BILLING, SHIPPING, CUSTOMER)
	 * @return	Promise<Contact[]>	data			without useless information
	 */
	getContacts: (
		id: number,
		parameters?: {
			type?: "BILLING" | "SHIPPING" | "CUSTOMER"
		},
		init?: RequestInit
	) => Promise<Contact[]>

	/**
	 * Get lines of an order
	 * @param	number	id	Id of order
	 * @return	Promise<Line[]>
	 */
	getLines: (id: number, init?: RequestInit) => Promise<Line[]>

	/**
	 * Add a line to given order
	 * @param	number			id				Id of order to update
	 * @param	Partial<Line>	request_data	OrderLine data
	 * @return	Promise<number>
	 */
	addLine: (id: number, data: Partial<Line>, init?: RequestInit) => Promise<number>

	/**
	 * Delete a line to given order
	 * @param	number	id		Id of order to update
	 * @param	number	lineid	Id of line to delete
	 * @return	Promise<number>
	 */
	deleteLine: (id: number, lineid: number, init?: RequestInit) => Promise<number>

	/**
	 * Update a line to given order
	 * @param	number			id				Id of order to update
	 * @param	number			lineid			Id of line to update
	 * @param	Partial<Line>	request_data	OrderLine data
	 * @return	Promise<Order | boolean>
	 */
	updateLine: (id: number, lineid: number, data: Partial<Line>, init?: RequestInit) => Promise<boolean | Order>

	/**
	 * Tag the order as validated (opened)
	 * Function used when order is reopend after being closed.
	 * @param	number	id	Id of the order
	 * @return	Promise<Order>
	 */
	reOpen: (id: number, init?: RequestInit) => Promise<Order>

	/**
	 * Classify the order as invoiced. Could be also called setbilled
	 * @param	number	id	Id of the order
	 * @return	Promise<Order>
	 */
	setInvoiced: (id: number, init?: RequestInit) => Promise<Order>

	/**
	 * Set an order to draft
	 * @param	number	id					Order ID
	 * @param	number	data.idwarehouse	Warehouse ID to use for stock change (Used only if option STOCK_CALCULATE_ON_VALIDATE_ORDER is on)
	 * @return	Promise<Order>
	 */
	setToDraft: (
		id: number,
		data?: {
			idwarehouse?: number
		},
		init?: RequestInit
	) => Promise<Order>

	/**
	 * Get the shipments of an order
	 * @param	number	id	Id of the order
	 * @return	Promise<Shipment[]>
	 */
	getShipments: (id: number, init?: RequestInit) => Promise<Shipment[]>

	/**
	 * Create the shipment of an order
	 * @param	number	id				Id of the order
	 * @param	number	warehouse_id	Id of a warehouse
	 * @return	Promise<number>
	 */
	createShipment: (id: number, warehouse_id: number, init?: RequestInit) => Promise<number>

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
	validate: (
		id: number,
		data?: {
			idwarehouse?: number
			notrigger?: number
		},
		init?: RequestInit
	) => Promise<Order>

	/**
	 * Create an order using an existing proposal.
	 * @param	number	proposalid	Id of the proposal
	 * @return	Promise<number>
	 */
	createFromProposal: (proposalid: number, init?: RequestInit) => Promise<Order>

	/**
	 * Get properties of an order object by ref_ext
	 * Return an array with order informations
	 * @param	string			ref_ext						External reference of object
	 * @param	number			parameters.contact_list		0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Order>	data						without useless information
	 */
	getByExtRef: (
		ref_ext: string,
		parameters?:
			| {
					contact_list?: 0 | 1
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Order>

	/**
	 * Get properties of an order object by ref
	 * Return an array with order informations
	 * @param	string			ref							Ref of object
	 * @param	number			parameters.contact_list		0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Order>	data						without useless information
	 */
	getByRef: (
		ref: string,
		parameters?:
			| {
					contact_list?: 0 | 1
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Order>
}
