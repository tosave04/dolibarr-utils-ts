import { Dolibarr } from "../dolibarr.class"
import type { Product } from "../interfaces/Product.interfaces"

export function products(this: Dolibarr) {
	const list = this.commonList<InvoicesListParameters, Product>("products")

	const create = this.commonCreate<Product>("products")

	const deleteObject = this.commonDelete("products")

	const getById = this.commonGetById<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	const update = this.commonUpdate<Product>("products")

	const getCategories = null

	const getPurchasePrices = null

	const addPurchasePrice = null

	const updatePurchasePrice = addPurchasePrice

	const deletePurchasePrice = null

	const getPricesPerCustomer = null

	const getPricesPerQuantity = null

	const getPricesPerSegment = null

	const getStock = null

	const getSubproducts = null

	const addSubproduct = null

	const deleteSubproduct = null

	const getVariants = null

	const addVariant = null

	const getAttributes = null

	const addAttribute = null

	const deleteAttribute = null

	const getAttribute = null

	const updateAttribute = null

	const getAttributeValues = null

	const addAttributeValue = null

	const deleteAttributeValueByRef = null

	const getAttributeValueByRef = null

	const getAttributeByRefExt = null

	const deleteAttributeByRef = null

	const getValuesByAttributeRef = null

	const deleteAttributeValue = null

	const getAttributeValue = null

	const updateAttributeValue = null

	const getByBarcode = null

	const purchasePricesList = null

	const getByRefExt = this.commonGetByRefExt<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	const getByRef = this.commonGetByRef<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	const variantsByProductRef = null

	const addVariantByProductRef = null

	const deleteVariant = null

	const updateVariant = null

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		getCategories,
		getPurchasePrices,
		addPurchasePrice,
		updatePurchasePrice,
		deletePurchasePrice,
		getPricesPerCustomer,
		getPricesPerQuantity,
		getPricesPerSegment,
		getStock,
		getSubproducts,
		addSubproduct,
		deleteSubproduct,
		getVariants,
		addVariant,
		getAttributes,
		addAttribute,
		deleteAttribute,
		getAttribute,
		updateAttribute,
		getAttributeValues,
		addAttributeValue,
		deleteAttributeValueByRef,
		getAttributeValueByRef,
		getAttributeByRefExt,
		deleteAttributeByRef,
		getValuesByAttributeRef,
		deleteAttributeValue,
		getAttributeValue,
		updateAttributeValue,
		getByBarcode,
		purchasePricesList,
		getByRefExt,
		getByRef,
		variantsByProductRef,
		addVariantByProductRef,
		deleteVariant,
		updateVariant,
	}
}

export type InvoicesListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	mode?: 0 | 1 | 2
	category?: number
	sqlfilters?: string
	ids_only?: boolean
	variant_filter?: 0 | 1 | 2 | 3
	pagination_data?: boolean
	includestockdata?: number
}
