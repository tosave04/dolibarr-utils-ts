import { DolibarrApi } from "../DolibarrApi.class.js"
import type { BankAccount } from "../interfaces/BankAccount.interface.js"
import type { CustomerCategory } from "../interfaces/CustomerCategory.interface.js"
import type { Gateway } from "../interfaces/Gateway.interface.js"
import type { Invoice } from "../interfaces/Invoice.interfaces.js"
import type { Order } from "../interfaces/Order.interfaces.js"
import type { Proposal } from "../interfaces/Proposal.interfaces.js"
import type { Representative } from "../interfaces/Representative.interface.js"
import type { SupplierCategory } from "../interfaces/SupplierCategory.interface.js"
import type { Thirdparty } from "../interfaces/Thirdparty.interfaces.js"

export function thirdparties(this: DolibarrApi) {
	/**
	 * List thirdparties
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	number	parameters.mode			Set to 1 to show only customers, Set to 2 to show only prospects, Set to 3 to show only those are not customer neither prospect, Set to 4 to show only suppliers
	 * @param	number	parameters.category		Use this param to filter list by category
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "((t.nom:like:'TheCompany%') or (t.name_alias:like:'TheCompany%')) and (t.datec:<:'20160101')"
	 * @return	Promise<Thirdparty[]>			Array of thirdparty objects
	 */
	const list = this.commonList<ThirdpartiesListParameters, Thirdparty>("thirdparties")

	/**
	 * Create thirdparty object
	 * @param	Partial<Thirdparty>		request_data	Request datas
	 * @return	Promise<number>							ID of thirdparty
	 */
	const create = this.commonCreate<Thirdparty>("thirdparties")

	/**
	 * Delete thirdparty
	 * @param	number		id		Thirdparty ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("thirdparties")

	/**
	 * Get properties of a thirdparty object
	 * Return an array with thirdparty informations
	 * @param	number					id		Id of third party to load
	 * @return	Promise<Thirdparty>				Cleaned Societe object
	 */
	const getById = this.commonGetById<{}, Thirdparty>("thirdparties")

	/**
	 * Update thirdparty
	 * @param	number		id				Id of thirdparty to update
	 * @param	array		request_data	Datas
	 * @return	Promise<Thirdparty>
	 */
	const update = this.commonUpdate<Thirdparty>("thirdparties")

	/**
	 * Get CompanyBankAccount objects for thirdparty
	 * @param	number		id			ID of thirdparty
	 * @return	Promise<BankAccount>
	 */
	const getBankAccount = (id: number, init?: RequestInit) =>
		this.get<BankAccount>(`thirdparties/${id}/bankaccounts`, undefined, init)

	/**
	 * Create CompanyBankAccount object for thirdparty
	 * @param	number					id				ID of thirdparty
	 * @param	Partial<BankAccount>	request_data	Request data
	 * @return	Promise<number>							BankAccount of thirdparty
	 */
	const createBankAccount = (id: number, data: Partial<BankAccount>, init?: RequestInit) =>
		this.post<number>(`thirdparties/${id}/bankaccounts`, data, init)

	/**
	 * Delete a bank account attached to a thirdparty
	 * @param	number	id				ID of thirdparty
	 * @param	number	bankaccount_id	ID of CompanyBankAccount
	 * @return	Promise<number>			-1 if error 1 if correct deletion
	 */
	const deleteBankAccount = (id: number, bankaccount_id: number, init?: RequestInit) =>
		this.delete<number>(`thirdparties/${id}/bankaccounts/${bankaccount_id}`, undefined, init)

	/**
	 * Update CompanyBankAccount object for thirdparty
	 * @param	number					id				ID of thirdparty
	 * @param	number					bankaccount_id	ID of CompanyBankAccount
	 * @param	Partial<BankAccount>	request_data	Request data
	 * @return	Promise<BankAccount>					BankAccount of thirdparty
	 */
	const updateBankAccount = (id: number, bankaccount_id: number, data: Partial<BankAccount>, init?: RequestInit) =>
		this.update<BankAccount>(`thirdparties/${id}/bankaccounts/${bankaccount_id}`, data, init)

	/**
	 * Get customer categories for a thirdparty
	 * @param	number	id						ID of thirdparty
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @return	Promise<CustomerCategory[]>
	 */
	const getCustomerCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<CustomerCategory[]>(`thirdparties/${id}/categories`, parameters, init)

	/**
	 * Remove the link between a customer category and the thirdparty
	 * @param	number	id				Id of thirdparty
	 * @param	number	category_id		Id of category
	 * @return	Promise<Thirdparty>
	 */
	const unlinkCustomerCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.delete<Thirdparty>(`thirdparties/${id}/categories/${category_id}`, undefined, init)

	/**
	 * Add a customer category to a thirdparty
	 * @param	number	id				Id of thirdparty
	 * @param	number	category_id		Id of category
	 * @return	Promise<number>
	 */
	const linkCustomerCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.post<number>(`thirdparties/${id}/categories/${category_id}`, undefined, init)

	/**
	 * Get fixed amount discount of a thirdparty (all sources: deposit, credit note, commercial offers...)
	 * @param	number	id						ID of the thirdparty
	 * @param	string	parameters.filter		Filter exceptional discount. "none" will return every discount, "available" returns unapplied discounts, "used" returns applied discounts   {@choice none,available,used}
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @return	Promise<unknown[]>				List of fixed discount of thirdparty
	 */
	const getFixedAmountDiscounts = (
		id: number,
		parameters?: {
			filter?: "none" | "available" | "used"
			sortfield?: string
			sortorder?: "ASC" | "DESC"
		},
		init?: RequestInit
	) => this.get<unknown[]>(`thirdparties/${id}/fixedamountdiscounts`, parameters, init)

	/**
	 * Delete all gateways attached to a thirdparty
	 * @param	number	id	ID of thirdparty
	 * @return	Promise<void>
	 */
	const deleteGateways = (id: number, init?: RequestInit) =>
		this.delete<void>(`thirdparties/${id}/gateways`, undefined, init)

	/**
	 * Get a specific gateway attached to a thirdparty (by specifying the site key)
	 * @param	number		id		ID of thirdparty
	 * @param	string		site	Site key
	 * @return	Promise<Gateway[]>
	 */
	const getSpecificGateway = (id: number, parameters?: { site?: string }, init?: RequestInit) =>
		this.get<Gateway[]>(`thirdparties/${id}/gateways`, parameters, init)

	/**
	 * Create and attach a new gateway to an existing thirdparty
	 * Possible fields for request_data (request body) are specified in <code>llx_societe_account</code> table.<br>
	 * See <a href="https://wiki.dolibarr.org/index.php/Table_llx_societe_account">Table llx_societe_account</a> wiki page for more information<br><br>
	 * <u>Example body payload :</u> <pre>{"key_account": "cus_DAVkLSs1LYyYI", "site": "stripe"}</pre>
	 * @param	number		id		ID of thirdparty
	 * @param	array		request_data		Request data
	 * @return	Promise<>
	 */
	// TODO: Check if the BankAccount return type is correct
	const addNewGateway = (id: number, data: Partial<Gateway>, init?: RequestInit) =>
		this.post<BankAccount>(`thirdparties/${id}/gateways`, data, init)

	/**
	 * Delete a specific site gateway attached to a thirdparty (by gateway id)
	 * @param	number		id		ID of thirdparty
	 * @param	number		site	Site key
	 * @return	Promise<void>
	 */
	const deleteSpecificGateway = (id: number, site: number, init?: RequestInit) =>
		this.delete<void>(`thirdparties/${id}/gateways/${site}`, undefined, init)

	/**
	 * Create and attach a new (or replace an existing) specific site gateway to a thirdparty
	 * You <strong>MUST</strong> pass all values to keep (otherwise, they will be deleted) !<br>
	 * If you just need to update specific fields prefer <code>PATCH /thirdparties/{id}/gateways/{site}</code> endpoint.<br><br>
	 * When a <strong>SocieteAccount</strong> entity does not exist for the <code>id</code> and <code>site</code>
	 * supplied, a new one will be created. In that case <code>fk_soc</code> and <code>site</code> members form
	 * request body payload will be ignored and <code>id</code> and <code>site</code> query strings parameters
	 * will be used instead.
	 * @param	number		id					ID of thirdparty
	 * @param	string		site				Site key
	 * @param	array		Partial<Gateway>	Request data
	 * @return	Promise<Gateway>
	 */
	const updateSpecificGateway = (id: number, site: number, data: Partial<Gateway>, init?: RequestInit) =>
		this.update<Gateway>(`thirdparties/${id}/gateways/${site}`, data, init)

	/**
	 * Update specified values of a specific gateway attached to a thirdparty
	 * @param	number		id					Id of thirdparty
	 * @param	string		site				Site key
	 * @param	array		Partial<Gateway>	Request data
	 * @return	Promise<Gateway>
	 */
	const addSpecificGateway = (id: number, site: number, data: Gateway, init?: RequestInit) =>
		this.patch<Gateway>(`thirdparties/${id}/gateways/${site}`, data, init)

	/**
	 * Generate a Document from a bank account record (like SEPA mandate)
	 * @param	number		id		Thirdparty id
	 * @param	number		companybankid		Companybank id
	 * @param	string		model		Model of document to generate
	 * @return	Promise<void>
	 */
	const generateBankAccountDocument = (id: number, companybankid: number, model?: string, init?: RequestInit) =>
		this.get<void>(
			`thirdparties/${id}/generateBankAccountDocument/${companybankid}/${model ?? "sepamandate"}`,
			undefined,
			init
		)

	/**
	 * Return list of invoices qualified to be corrected by a credit note.
	 * Invoices matching the following rules are returned
	 * (validated + payment on process) or classified (paid completely or paid partialy) + not already replaced + not already a credit note
	 * @param	number		id		Id of thirdparty
	 * @return	Promise<Invoice[]>
	 */
	const getInvoicesQualifiedForCreditNote = (id: number, init?: RequestInit) =>
		this.get<Invoice[]>(`thirdparties/${id}/getinvoicesqualifiedforcreditnote`, undefined, init)

	/**
	 * Return list of invoices qualified to be replaced by another invoice.
	 * @param	number		id		Id of thirdparty
	 * @return	Promise<Invoice[]>
	 */
	const getInvoicesQualifiedForReplacement = (id: number, init?: RequestInit) =>
		this.get<Invoice[]>(`thirdparties/${id}/getinvoicesqualifiedforreplacement`, undefined, init)

	/**
	 * Merge a thirdparty into another one.
	 * Merge content (properties, notes) and objects (like invoices, events, orders, proposals, ...) of a thirdparty into a target thirdparty,
	 * then delete the merged thirdparty.
	 * If a property has a defined value both in thirdparty to delete and thirdparty to keep, the value into the thirdparty to
	 * delete will be ignored, the value of target thirdparty will remain, except for notes (content is concatenated).
	 * @param	number	id			ID of thirdparty to keep (the target thirdparty)
	 * @param	number	idtodelete	ID of thirdparty to remove (the thirdparty to delete), once data has been merged into the target thirdparty.
	 * @return	Promise<Thirdparty>
	 */
	const merge = (id: number, idtodelete: number, init?: RequestInit) =>
		this.put<Thirdparty>(`thirdparties/${id}/merge/${idtodelete}`, {}, init)

	/**
	 * Get outstanding invoices of thirdparty
	 * @param	number		id		ID of the thirdparty
	 * @param	string		mode	'customer' or 'supplier'
	 * @return	Promise<Invoice[]>	List of outstandings invoices of thirdparty
	 */
	const getOustandingInvoices = (id: number, parameters?: { mode?: "customer" | "supplier" }, init?: RequestInit) =>
		this.get<Invoice[]>(`thirdparties/${id}/outstandinginvoices`, parameters, init)

	/**
	 * Get outstanding orders of thirdparty
	 * @param	number		id		ID of the thirdparty
	 * @param	string		mode	'customer' or 'supplier'
	 * @return	Promise<Order[]>	List of outstandings orders of thirdparty
	 */
	const getOustandingOrders = (id: number, parameters?: { mode?: "customer" | "supplier" }, init?: RequestInit) =>
		this.get<Order[]>(`thirdparties/${id}/outstandingorders`, parameters, init)

	/**
	 * Get outstanding proposals of thirdparty
	 * @param	number		id			ID of the thirdparty
	 * @param	string		mode		'customer' or 'supplier'
	 * @return	Promise<Proposal[]>		List of outstandings proposals of thirdparty
	 */
	const getOustandingProposals = (id: number, parameters?: { mode?: "customer" | "supplier" }, init?: RequestInit) =>
		this.get<Proposal[]>(`thirdparties/${id}/outstandingproposals`, parameters, init)

	/**
	 * Get representatives of thirdparty
	 * @param	number		id				ID of the thirdparty
	 * @param	string		mode			0=Array with properties, 1=Array of id.
	 * @return	Promise<Representative[]>	List of representatives of thirdparty
	 */
	const getRepresentatives = (id: number, parameters?: { mode?: 0 | 1 }, init?: RequestInit) =>
		this.get<Representative[]>(`thirdparties/${id}/representatives`, parameters, init)

	/**
	 * Set new price level for the given thirdparty
	 * @param	number		id				ID of thirdparty
	 * @param	number		priceLevel		Price level to apply to thirdparty
	 * @return	Promise<Thirdparty>			Thirdparty data without useless information
	 */
	const setPriceLevel = (id: number, data: { priceLevel: number }, init?: RequestInit) =>
		this.put<Thirdparty>(`thirdparties/${id}/setpricelevel`, data, init)

	/**
	 * Get supplier categories for a thirdparty
	 * @param	number		id						ID of thirdparty
	 * @param	string		parameters.sortfield	Sort field
	 * @param	string		parameters.sortorder	Sort order
	 * @param	number		parameters.limit		Limit for list
	 * @param	number		parameters.page			Page number
	 * @return	Promise<SupplierCategory[]>
	 */
	const getSupplierCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<SupplierCategory[]>(`thirdparties/${id}/supplier_categories`, parameters, init)

	/**
	 * Remove the link between a category and the thirdparty
	 * @param	number		id				Id of thirdparty
	 * @param	number		category_id		Id of category
	 * @return	Promise<Thirdparty>
	 */
	const unlinkSupplierCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.delete<Thirdparty>(`thirdparties/${id}/supplier_categories/${category_id}`, undefined, init)

	/**
	 * Add a supplier category to a thirdparty
	 * @param	number		id				Id of thirdparty
	 * @param	number		category_id		Id of category
	 * @return	Promise<Thirdparty>
	 */
	const linkSupplierCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.post<Thirdparty>(`thirdparties/${id}/supplier_categories/${category_id}`, undefined, init)

	/**
	 * Get properties of a thirdparty object by barcode.
	 * Return an array with thirdparty informations
	 * @param	string		barcode		Barcode of third party to load
	 * @return	Promise<Thirdparty>		Cleaned Societe object
	 */
	const getByBarcode = (barcode: string, init?: RequestInit) =>
		this.get<Thirdparty>(`thirdparties/barcode/${barcode}`, undefined, init)

	/**
	 * Get properties of a thirdparty object by email.
	 * Return an array with thirdparty informations
	 * @param	string		email		Email of third party to load
	 * @return	Promise<Thirdparty>		Cleaned Societe object
	 */
	const getByEmail = this.commonGetByEmail<{}, Thirdparty>("thirdparties")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		getBankAccount,
		createBankAccount,
		deleteBankAccount,
		updateBankAccount,
		getCustomerCategories,
		unlinkCustomerCategory,
		linkCustomerCategory,
		getFixedAmountDiscounts,
		deleteGateways,
		getSpecificGateway,
		addNewGateway,
		deleteSpecificGateway,
		addSpecificGateway,
		updateSpecificGateway,
		generateBankAccountDocument,
		getInvoicesQualifiedForCreditNote,
		getInvoicesQualifiedForReplacement,
		merge,
		getOustandingInvoices,
		getOustandingOrders,
		getOustandingProposals,
		getRepresentatives,
		setPriceLevel,
		getSupplierCategories,
		unlinkSupplierCategory,
		linkSupplierCategory,
		getByBarcode,
		getByEmail,
	}
}

export type ThirdpartiesListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	mode?: 1 | 2 | 3 | 4
	category?: number
	sqlfilters?: string
}
