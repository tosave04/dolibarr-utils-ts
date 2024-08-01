import { Dolibarr } from "../dolibarr.class"
import type { Contact } from "../interfaces/Contact.interfaces"
import type { Line } from "../interfaces/Line.interfaces"
import type { Order } from "../interfaces/Order.interfaces"
import type { Shipment } from "../interfaces/Shipment.interfaces"

export function orders(this: Dolibarr) {
	const list = this.commonList<OrdersListParameters, Order>("orders")

	const create = this.commonCreate<Order>("orders")

	const deleteObject = this.commonDelete("orders")

	const getById = this.commonGetById<{ contact_list?: 0 | 1 }, Order>("orders")

	const update = this.commonUpdate<Order>("orders")

	const close = this.commonClose<Order>("orders")

	const unlinkContact = this.commonUnlinkContact("orders")

	const linkContact = this.commomLinkContact("orders")

	const getContacts = (id: number, parameters?: { type?: "BILLING" | "SHIPPING" | "CUSTOMER" }, init?: RequestInit) =>
		this.get<Contact[]>(`orders/${id}/contacts`, parameters, init)

	const getLines = (id: number, init?: RequestInit) => this.get<Line[]>(`orders/${id}/lines`, undefined, init)

	const addLine = this.commonAddLine("orders")

	const deleteLine = this.commonDeleteLine("orders")

	const updateLine = this.commonUpdateLine<Order>("orders")

	const reOpen = (id: number, init?: RequestInit) => this.post<Order>(`orders/${id}/reopen`, undefined, init)

	const setInvoiced = (id: number, init?: RequestInit) => this.post<Order>(`orders/${id}/setinvoiced`, undefined, init)

	const setToDraft = this.commonSetToDraft<Order>("orders")

	const getShipments = (id: number, init?: RequestInit) =>
		this.get<Shipment[]>(`orders/${id}/shipment`, undefined, init)

	const createShipment = (id: number, warehouse_id: number, init?: RequestInit) =>
		this.post<number>(`orders/${id}/shipment/${warehouse_id}`, undefined, init)

	const validate = this.commonValidate<Order>("orders")

	const createFromProposal = (proposalid: number, init?: RequestInit) =>
		this.post<number>(`orders/createfromproposal/${proposalid}`, undefined, init)

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
}
