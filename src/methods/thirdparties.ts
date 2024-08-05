import { Dolibarr } from "../dolibarr.class"
import type { CompanyBankAccount } from "../interfaces/CompanyBankAccount.interface"
import type { CustomerCategory } from "../interfaces/CustomerCategory.interface"
import type { Gateway } from "../interfaces/Gateway.interface"
import type { Invoice } from "../interfaces/Invoice.interfaces"
import type { Order } from "../interfaces/Order.interfaces"
import type { Proposal } from "../interfaces/Proposal.interfaces"
import type { Representative } from "../interfaces/Representative.interface"
import type { SupplierCategory } from "../interfaces/SupplierCategory.interface"
import type { Thirdparty } from "../interfaces/Thirdparty.interfaces"

export function thirdparties(this: Dolibarr) {
	const list = this.commonList<ThirdpartiesListParameters, Thirdparty>("thirdparties")

	const create = this.commonCreate<Thirdparty>("thirdparties")

	const deleteObject = this.commonDelete("thirdparties")

	const getById = this.commonGetById<{}, Thirdparty>("thirdparties")

	const update = this.commonUpdate<Thirdparty>("thirdparties")

	const getBankAccount = (id: number, init?: RequestInit) =>
		this.get<CompanyBankAccount>(`thirdparties/${id}/bankaccounts`, undefined, init)

	const createBankAccount = (id: number, data: Partial<CompanyBankAccount>, init?: RequestInit) =>
		this.post<number>(`thirdparties/${id}/bankaccounts`, data, init)

	const deleteBankAccount = (id: number, bankaccount_id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(
			`thirdparties/${id}/bankaccounts/${bankaccount_id}`,
			undefined,
			init
		)

	const updateBankAccount = (id: number, bankaccount_id: number, data: Record<string, unknown>, init?: RequestInit) =>
		this.update<CompanyBankAccount>(`thirdparties/${id}/bankaccounts/${bankaccount_id}`, data, init)

	const getCustomerCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<CustomerCategory[]>(`thirdparties/${id}/categories`, parameters, init)

	const unlinkCustomerCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(
			`thirdparties/${id}/categories/${category_id}`,
			undefined,
			init
		)

	const linkCustomerCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.post<number>(`thirdparties/${id}/categories/${category_id}`, undefined, init)

	const getFixedAmountDiscounts = (
		id: number,
		parameters?: {
			filter?: "none" | "available" | "used"
			sortfield?: string
			sortorder?: "ASC" | "DESC"
		},
		init?: RequestInit
	) => this.get<unknown[]>(`thirdparties/${id}/fixedamountdiscounts`, parameters, init)

	const deleteGateways = (id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`thirdparties/${id}/gateways`, undefined, init)

	const getSpecificGateway = (id: number, parameters?: { site?: string }, init?: RequestInit) =>
		this.get<unknown>(`thirdparties/${id}/gateways`, parameters, init)

	const addNewGateway = (id: number, data: Partial<Gateway>, init?: RequestInit) =>
		this.post<number>(`thirdparties/${id}/gateways`, data, init)

	const deleteSpecificGateway = (id: number, site: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`thirdparties/${id}/gateways/${site}`, undefined, init)

	const updateSpecificGateway = (id: number, site: number, data: Partial<Gateway>, init?: RequestInit) =>
		this.update<Gateway>(`thirdparties/${id}/gateways/${site}`, data, init)

	const addSpecificGateway = (id: number, site: number, data: Gateway, init?: RequestInit) =>
		this.patch<Gateway>(`thirdparties/${id}/gateways/${site}`, data, init)

	const generateBankAccountDocument = (id: number, companybankid: number, model?: string, init?: RequestInit) =>
		this.get<unknown>(
			`thirdparties/${id}/generateBankAccountDocument/${companybankid}/${model ?? "sepamandate"}`,
			undefined,
			init
		)

	const getInvoicesQualifiedForCreditNote = (id: number, init?: RequestInit) =>
		this.get<Invoice[]>(`thirdparties/${id}/getinvoicesqualifiedforcreditnote`, undefined, init)

	const getInvoicesQualifiedForReplacement = (id: number, init?: RequestInit) =>
		this.get<Invoice[]>(`thirdparties/${id}/getinvoicesqualifiedforreplacement`, undefined, init)

	const merge = (id: number, idtodelete: number, init?: RequestInit) =>
		this.put<Thirdparty>(`thirdparties/${id}/merge/${idtodelete}`, {}, init)

	const getOustandingInvoices = (id: number, parameters?: { mode?: "customer" | "supplier" }, init?: RequestInit) =>
		this.get<Invoice[]>(`thirdparties/${id}/outstandinginvoices`, parameters, init)

	const getOustandingOrders = (id: number, parameters?: { mode?: "customer" | "supplier" }, init?: RequestInit) =>
		this.get<Order[]>(`thirdparties/${id}/outstandingorders`, parameters, init)

	const getOustandingProposals = (id: number, parameters?: { mode?: "customer" | "supplier" }, init?: RequestInit) =>
		this.get<Proposal[]>(`thirdparties/${id}/outstandingproposals`, parameters, init)

	const getRepresentatives = (id: number, parameters?: { mode?: 0 | 1 }, init?: RequestInit) =>
		this.get<Representative[]>(`thirdparties/${id}/representatives`, parameters, init)

	const setPriceLevel = (id: number, data: { priceLevel: number }, init?: RequestInit) =>
		this.put<Thirdparty>(`thirdparties/${id}/setpricelevel`, data, init)

	const getSupplierCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<SupplierCategory[]>(`thirdparties/${id}/supplier_categories`, parameters, init)

	const unlinkSupplierCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(
			`thirdparties/${id}/supplier_categories/${category_id}`,
			undefined,
			init
		)

	const linkSupplierCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.post<number>(`thirdparties/${id}/supplier_categories/${category_id}`, undefined, init)

	const getByCode = (barcode: string, init?: RequestInit) =>
		this.get<Thirdparty>(`thirdparties/barcode/${barcode}`, undefined, init)

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
		getByCode,
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
