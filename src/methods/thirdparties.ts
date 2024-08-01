import { Dolibarr } from "../dolibarr.class"
import type { Thirdparty } from "../interfaces/Thirdparty.interfaces"

export function thirdparties(this: Dolibarr) {
	const list = this.commonList<ThirdpartiesListParameters, Thirdparty>("thirdparties")

	const create = this.commonCreate<Thirdparty>("thirdparties")

	const deleteObject = this.commonDelete("thirdparties")

	const getById = this.commonGetById<{}, Thirdparty>("thirdparties")

	const update = this.commonUpdate<Thirdparty>("thirdparties")

	const getBankAccount = null

	const createBankAccount = null

	const deleteBankAccount = null

	const updateBankAccount = null

	const getCustomerCategories = null

	const unlinkCustomerCategory = null

	const linkCustomerCategory = null

	const getFixedAmountDiscounts = null

	const deleteGateways = null

	const getSpecificGateway = null

	const addNewGateway = null

	const deleteSpecificGateway = null

	const addSpecificGateway = null

	const updateSpecificGateway = addSpecificGateway

	const generateBankAccountDocument = null

	const getInvoicesQualifiedForCreditNote = null

	const getInvoicesQualifiedForReplacement = null

	const merge = null

	const getOustandingInvoices = null

	const getOustandingOrders = null

	const getOustandingProposals = null

	const getRepresentatives = null

	const setPriceLevel = null

	const getSupplierCategories = null

	const unlinkSupplierCategory = null

	const linkSupplierCategory = null

	const getByCode = null

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
