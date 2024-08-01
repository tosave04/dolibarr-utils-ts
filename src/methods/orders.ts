import { Dolibarr } from "../dolibarr.class"
import type { Order } from "../interfaces/Order.interfaces"

export function orders(this: Dolibarr) {
	const list = this.commonList<OrdersListParameters, Order>("orders")

	const create = this.commonCreate<Order>("orders")

	const deleteObject = this.commonDelete("orders")

	const getById = this.commonGetById<{ contact_list?: 0 | 1 }, Order>("orders")

	const update = this.commonUpdate<Order>("orders")

	const close = this.commonClose<Order>("orders")

	const unlinkContact = this.commonUnlinkContact("orders")

	const linkContact = this.commomLinkContact("orders")

	const getContacts = null

	const getLines = null

	const addLine = this.commonAddLine("orders")

	const deleteLine = this.commonDeleteLine("orders")

	const updateLine = this.commonUpdateLine<Order>("orders")

	const reOpen = null

	const setInvoiced = null

	const setToDraft = this.commonSetToDraft<Order>("orders")

	const getShipments = null

	const createShipment = null

	const validate = this.commonValidate<Order>("orders")

	const createFromProposal = null

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
