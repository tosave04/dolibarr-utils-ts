import { Dolibarr } from "../dolibarr.class"
import type { Invoice } from "../interfaces/Invoice.interfaces"

export function invoices(this: Dolibarr) {
	/**
	 * List invoices
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Limit for list
	 * @param	number	parameters.page				Page number
	 * @param	string	parameters.thirdparty_ids	Thirdparty ids to filter orders of (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string	parameters.status			Filter by invoice status : draft | unpaid | paid | cancelled
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<Invoice[]>					Array of invoice objects
	 */
	const list = this.commonList<InvoicesListParameters, Invoice>("invoices")

	/**
	 * Create invoice object
	 * @param	array	request_data	Request datas
	 * @return	Promise<number>			ID of invoice
	 */
	const create = this.commonCreate<Invoice>("invoices")

	/**
	 * Delete invoice
	 * @param	number		id 	Invoice ID
	 * @return	Promise<{ success: { code: number; message: string } }>
	 */
	const deleteObject = this.commonDelete("invoices")

	/**
	 * Get properties of a invoice object
	 * Return an array with invoice informations
	 * @param	number		id							ID of invoice
	 * @param	number		parameters.contact_list		0:Return array contains all properties, 1:Return array contains just id, -1: Do not return contacts/adddesses
	 * @return	Promise<Invoice>
	 */
	const getById = this.commonGetById<{ contact_list?: -1 | 0 | 1 }, Invoice>("invoices")

	/**
	 * Update invoice
	 * @param	number	id				Id of invoice to update
	 * @param	array	request_data	Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<Invoice>("invoices")

	/**
	 * Delete a contact type of given invoice
	 * @param	number	id			Id of invoice to update
	 * @param	number	contactid	Row key of the contact in the array contact_ids.
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER).
	 * @return	Promise<number>
	 */
	const unlinkContact = this.commonUnlinkContact("invoices")

	/**
	 * Add a contact type of given invoice
	 * @param	number	id			Id of invoice to update
	 * @param	number	contactid	Id of contact to add
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER)
	 * @return	Promise<number>
	 */
	const linkContact = this.commomLinkContact("invoices")

	/**
	 * Adds a contact to an invoice
	 * @param	number	id					Order ID
	 * @param	number	data.fk_socpeople	Id of thirdparty contact (if source = 'external') or id of user (if souce = 'internal') to link
	 * @param	string	data.type_contact	Type of contact (code). Must a code found into table llx_c_type_contact. For example: BILLING
	 * @param	string	data.source			external=Contact extern (llx_socpeople), internal=Contact intern (llx_user)
	 * @param	number	data.notrigger		Disable all triggers
	 * @return	Promise<Invoice>
	 */
	const addContactToInvoice = (
		id: number,
		data: { fk_socpeople: number; type_contact: string; source: string; notrigger?: number },
		init?: RequestInit
	) => this.post<Invoice>(`invoices/${id}/contacts`, data, init)

	/**
	 * Get discount from invoice
	 * @param	number	id	Id of invoice
	 * @return	Promise<DiscountAbsolute>
	 */
	const getDiscount = (id: number, init?: RequestInit) =>
		this.get<Record<string, unknown>>(`invoices/${id}/discount`, undefined, init)

	/**
	 * Get lines of an invoice
	 * @param	number	id	Id of invoice
	 * @return	Promise<Line[]>
	 */
	const getLines = this.commonGetLines("invoices")

	/**
	 * Add a line to a given invoice
	 * Exemple of POST query :
	 * {
	 *     "desc": "Desc", "subprice": "1.00000000", "qty": "1", "tva_tx": "20.000", "localtax1_tx": "0.000", "localtax2_tx": "0.000",
	 *     "fk_product": "1", "remise_percent": "0", "date_start": "", "date_end": "", "fk_code_ventilation": 0,  "info_bits": "0",
	 *     "fk_remise_except": null,  "product_type": "1", "rang": "-1", "special_code": "0", "fk_parent_line": null, "fk_fournprice": null,
	 *     "pa_ht": "0.00000000", "label": "", "array_options": [], "situation_percent": "100", "fk_prev_id": null, "fk_unit": null
	 * }
	 * @param	number	id				Id of invoice
	 * @param	array	request_data	InvoiceLine data
	 * @return	Promise<number>
	 */
	const addLine = this.commonAddLine("invoices")

	/**
	 * Deletes a line of a given invoice
	 * @param	number	id		Id of invoice
	 * @param	number	lineid	Id of the line to delete
	 * @return	Promise<number>
	 */
	const deleteLine = this.commonDeleteLine("invoices")

	/**
	 * Update a line to a given invoice
	 * @param	number	id				Id of invoice to update
	 * @param	number	lineid			Id of line to update
	 * @param	array	request_data	InvoiceLine data
	 * @return	Promise<Invoice>
	 */
	const updateLine = this.commonUpdateLine<Invoice>("invoices")

	/**
	 * Create a discount (credit available) for a credit note or a deposit.
	 * @param	number	id			Invoice ID
	 * @return	Promise<Invoice>	An invoice object
	 */
	const createDiscount = (id: number, init?: RequestInit) =>
		this.post<Invoice>(`invoices/${id}/markAsCreditAvailable}`, undefined, init)

	/**
	 * Get list of payments of a given invoice
	 * @param	number	id	Id of invoice
	 * @return	Promise<Payment>
	 */
	const getPayments = (id: number, init?: RequestInit) =>
		this.get<Record<string, unknown>>(`invoices/${id}/payments`, undefined, init)

	/**
	 * Add payment line to a specific invoice with the remain to pay as amount.
	 * @param	number		id						Id of invoice
	 * @param	string		data.datepaye			{@from body}  Payment date        {@type timestamp}
	 * @param	number		data.paymentid			{@from body}  Payment mode Id {@min 1}
	 * @param	string		data.closepaidinvoices	{@from body}  Close paid invoices {@choice yes,no}
	 * @param	number		data.accountid			{@from body}  Account Id {@min 1}
	 * @param	string		data.num_payment		{@from body}  Payment number (optional)
	 * @param	string		data.comment			{@from body}  Note private (optional)
	 * @param	string		data.chqemetteur		{@from body}  Payment issuer (mandatory if paymentcode = 'CHQ')
	 * @param	string		data.chqbank			{@from body}  Issuer bank name (optional)
	 * @return	Promise<number>						Payment ID
	 */
	const addPayment = (
		id: number,
		data: {
			datepaye: string
			paymentid: number
			closepaidinvoices: "yes" | "no"
			accountid: number
			num_payment?: string
			comment?: string
			chqemetteur?: string
			chqbank?: string
		},
		init?: RequestInit
	) => this.post<number>(`invoices/${id}/payments`, data, init)

	/**
	 * Sets an invoice as draft
	 * @param	number	id				Order ID
	 * @param	number	idwarehouse		Warehouse ID
	 * @return	Promise<Invoice>
	 */
	const setToDraft = this.commonSetToDraft<Invoice>("invoices")

	/**
	 * Sets an invoice as paid
	 * @param	number	id			Order ID
	 * @param	string	data.close_code	Code filled if we classify to 'Paid completely' when payment is not complete (for escompte for example)
	 * @param	string	data.close_note	Comment defined if we classify to 'Paid' when payment is not complete (for escompte for example)
	 * @return	Promise<Invoice>	An invoice object
	 */
	const setToPaid = (id: number, data?: { close_code?: string; close_note?: string }, init?: RequestInit) =>
		this.post<Invoice>(`invoices/${id}/settopaid`, data, init)

	/**
	 * Sets an invoice as unpaid
	 * @param	number	id		Order ID
	 * @return	Promise<Invoice>
	 */
	const setToUnpaid = (id: number, init?: RequestInit) =>
		this.post<Invoice>(`invoices/${id}/settounpaid`, undefined, init)

	/**
	 * Add an available credit note discount to payments of an existing invoice.
	 * Note that this consume the credit note.
	 * @param	number	id			Id of invoice
	 * @param	number	discountid	Id of a discount coming from a credit note
	 * @return	Promise<number>
	 */
	const addCreditNote = (id: number, discountid: number, init?: RequestInit) =>
		this.post<number>(`invoices/${id}/usecreditnote/${discountid}`, undefined, init)

	/**
	 * Add a discount line into an invoice (as an invoice line) using an existing absolute discount
	 * Note that this consume the discount.
	 * @param	number	id			Id of invoice
	 * @param	number	discountid	Id of discount
	 * @return	Promise<number>
	 */
	const addDiscount = (id: number, discountid: number, init?: RequestInit) =>
		this.post<number>(`invoices/${id}/usediscount/${discountid}`, undefined, init)

	/**
	 * Validate an invoice
	 * If you get a bad value for param notrigger check that ou provide this in body
	 * {
	 *   "idwarehouse": 0,
	 *   "notrigger": 0
	 * }
	 * @param	number	id				Invoice ID
	 * @param	number	idwarehouse		Warehouse ID
	 * @param	number	notrigger		1=Does not execute triggers, 0= execute triggers
	 * @return	Promise<Invoice>
	 */
	const validate = this.commonValidate<Invoice>("invoices")

	/**
	 * Create an invoice using an existing order.
	 * @param	number	orderid		Id of the order
	 * @return	Promise<number>
	 */
	const createFromOrder = (orderid: number, init?: RequestInit) =>
		this.post<number>(`invoices/createfromorder/${orderid}`, undefined, init)

	/**
	 * Update a payment
	 * @param	number	id				Id of payment
	 * @param	string	num_payment		Payment number
	 * @return	Promise<{ success: { code: 200; message: "Payment updated" } }>
	 */
	const updatePayment = (id: number, num_payment?: string, init?: RequestInit) =>
		this.put<{ success: { code: 200; message: "Payment updated" } }>(`invoices/payments/${id}`, { num_payment }, init)

	/**
	 * Add a payment to pay partially or completely one or several invoices.
	 * Warning: Take care that all invoices are owned by the same customer.
	 * Example of value for parameter arrayofamounts: {"1": {"amount": "99.99", "multicurrency_amount": ""}, "2": {"amount": "", "multicurrency_amount": "10"}}
	 * @param	array	data.arrayofamounts			{@from body}  Array with id of invoices with amount to pay for each invoice
	 * @param	string	data.datepaye				{@from body}  Payment date        {@type timestamp}
	 * @param	number	data.paymentid				{@from body}  Payment mode Id {@min 1}
	 * @param	string	data.closepaidinvoices		{@from body}  Close paid invoices {@choice yes,no}
	 * @param	number	data.accountid				{@from body}  Account Id {@min 1}
	 * @param	string	data.num_payment			{@from body}  Payment number (optional)
	 * @param	string	data.comment				{@from body}  Note private (optional)
	 * @param	string	data.chqemetteur			{@from body}  Payment issuer (mandatory if paiementcode = 'CHQ')
	 * @param	string	data.chqbank				{@from body}  Issuer bank name (optional)
	 * @param	string	data.ref_ext				{@from body}  External reference (optional)
	 * @param	bool	data.accepthigherpayment	{@from body}  Accept higher payments that it remains to be paid (optional)
	 * @return	Partial<number>						Payment ID
	 */
	const addDistributedPayment = (
		data: {
			arrayofamounts: { amount: string; multicurrency_amount: string }[]
			datepaye: string
			paymentid: number
			closepaidinvoices: "yes" | "no"
			accountid: number
			num_payment?: string
			comment?: string
			chqemetteur?: string
			chqbank?: string
			ref_ext?: string
			accepthigherpayment?: boolean
		},
		init?: RequestInit
	) => this.post<number>(`invoices/paymentsdistributed`, data, init)

	/**
	 * Get properties of an invoice object by ref_ext
	 * Return an array with invoice informations
	 * @param	string	ref_ext			External reference of object
	 * @param	number	contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id, -1: Do not return contacts/adddesses
	 * @return	Promise<Invoice>		data without useless information
	 */
	const getByRefExt = this.commonGetByRefExt<{ contact_list?: -1 | 0 | 1 }, Invoice>("invoices")

	/**
	 * Get properties of an invoice object by ref
	 * Return an array with invoice informations
	 * @param	string	ref				Ref of object
	 * @param	number	contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id, -1: Do not return contacts/adddesses
	 * @return	Promise<Invoice>		data without useless information
	 */
	const getByRef = this.commonGetByRef<{ contact_list?: -1 | 0 | 1 }, Invoice>("invoices")

	/**
	 * Get properties of a template invoice object
	 * Return an array with invoice informations
	 * @param	number	id					ID of template invoice
	 * @param	number	contact_list		0:Return array contains all properties, 1:Return array contains just id, -1: Do not return contacts/adddesses
	 * @return	Promise<TemplateInvoice>	data without useless information
	 */
	const getTemplate = (id: number, contact_list?: -1 | 0 | 1, init?: RequestInit) =>
		this.get<Record<string, unknown>>(`invoices/templates/${id}`, { contact_list }, init)

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		unlinkContact,
		linkContact,
		addContactToInvoice,
		getDiscount,
		getLines,
		addLine,
		deleteLine,
		updateLine,
		createDiscount,
		getPayments,
		addPayment,
		setToDraft,
		setToPaid,
		setToUnpaid,
		addCreditNote,
		addDiscount,
		validate,
		createFromOrder,
		updatePayment,
		addDistributedPayment,
		getByRefExt,
		getByRef,
		getTemplate,
	}
}

export type InvoicesListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	thirdparty_ids?: string
	status?: "draft" | "unpaid" | "paid" | "cancelled"
	sqlfilters?: string
}
