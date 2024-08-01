import { Dolibarr } from "../dolibarr.class"
import type { Category } from "../interfaces/Category.interfaces"
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

	const getCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<Category[]>(`products/${id}/categories`, parameters, init)

	const getPurchasePrices = (
		id: number,
		parameters?: { ref?: string; ref_ext?: string; barcode?: string },
		init?: RequestInit
	) => this.get<unknown>(`products/${id}/purchase_prices`, parameters, init)

	const addPurchasePrice = (
		id: number,
		data: {
			qty: number
			buyprice: number
			price_base_type: string
			fourn_id: number
			availability: number
			ref_fourn: string
			tva_tx: number
			charges?: string
			remise_percent?: number
			remise?: number
			newnpr?: number
			delivery_time_days?: number
			supplier_reputation?: string
			localtaxes_array?: string[]
			newdefaultvatcode?: string
			multicurrency_buyprice?: number
			multicurrency_price_base_type?: string
			multicurrency_tx?: number
			multicurrency_code?: string
			desc_fourn?: string
			barcode?: string
			fk_barcode_type?: number
		},
		init?: RequestInit
	) => this.post<unknown>(`products/${id}/purchase_prices`, data, init)

	const updatePurchasePrice = addPurchasePrice

	const deletePurchasePrice = (id: number, priceid: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(
			`products/${id}/purchase_prices/${priceid}`,
			undefined,
			init
		)

	const getPricesPerCustomer = (id: number, parameters?: { thirdparty_id?: string }, init?: RequestInit) =>
		this.get<unknown>(`products/${id}/selling_multiprices/per_customer`, parameters, init)

	const getPricesPerQuantity = (id: number, init?: RequestInit) =>
		this.get<unknown>(`products/${id}/selling_multiprices/per_quantity`, undefined, init)

	const getPricesPerSegment = (id: number, init?: RequestInit) =>
		this.get<unknown>(`products/${id}/selling_multiprices/per_segment`, undefined, init)

	const getStock = (id: number, parameters?: { selected_warehouse_id?: number }, init?: RequestInit) =>
		this.get<unknown>(`products/${id}/stock`, parameters, init)

	const getSubproducts = (id: number, init?: RequestInit) =>
		this.get<Product[]>(`products/${id}/subproducts`, undefined, init)

	const addSubproduct = (
		id: number,
		data: { subproduct_id: number; qty: number; incdec?: 0 | 1 },
		init?: RequestInit
	) => this.post<number>(`products/${id}/subproducts/add`, data, init)

	const deleteSubproduct = (id: number, subproduct_id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(
			`products/${id}/subproducts/remove/${subproduct_id}`,
			undefined,
			init
		)

	const getVariants = (id: number, parameters?: { includestock?: 0 | 1 }, init?: RequestInit) =>
		this.get<unknown>(`products/${id}/variants`, parameters, init)

	const addVariant = (
		id: number,
		data: {
			weight_impact: number
			price_impact: number
			price_impact_is_percent: boolean
			features: Record<string, string>
			reference?: string
			ref_ext?: string
		},
		init?: RequestInit
	) => this.post<number>(`products/${id}/variants`, data, init)

	const getAttributes = (
		parameters?: {
			sortfield?: string
			sortorder?: "ASC" | "DESC"
			limit?: number
			page?: number
			sqlfilters?: string
		},
		init?: RequestInit
	) => this.get<unknown>(`products/attributes`, parameters, init)

	const addAttribute = (data: { ref: string; label: string; ref_ext?: string }, init?: RequestInit) =>
		this.post<unknown>(`products/attributes`, data, init)

	const deleteAttribute = (id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`products/attributes/${id}`, undefined, init)

	const getAttribute = (id: number, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/${id}`, undefined, init)

	const updateAttribute = (id: number, data: Record<string, string>, init?: RequestInit) =>
		this.update<unknown>(`products/attributes/${id}`, data, init)

	const getAttributeValues = (id: number, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/${id}/values`, undefined, init)

	const addAttributeValue = (id: number, data: { ref: string; value: string }, init?: RequestInit) =>
		this.post<number>(`products/attributes/${id}/values`, data, init)

	const deleteAttributeValueByRef = (id: number, ref: string, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(
			`products/attributes/${id}/values/ref/${ref}`,
			undefined,
			init
		)

	const getAttributeValueByRef = (id: number, ref: string, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/${id}/values/ref/${ref}`, undefined, init)

	const getAttributeByRefExt = (ref_ext: string, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/ref_ext/${ref_ext}`, undefined, init)

	const getAttributeByRef = (ref: string, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/ref/${ref}`, undefined, init)

	const getValuesByAttributeRef = (ref: string, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/ref/${ref}/values`, undefined, init)

	const deleteAttributeByRef = (id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`products/attributes/values/${id}`, undefined, init)

	const getAttributeValue = (id: number, init?: RequestInit) =>
		this.get<unknown>(`products/attributes/values/${id}`, undefined, init)

	const updateAttributeValue = (id: number, data: { request_data: string[] }, init?: RequestInit) =>
		this.update<unknown>(`products/attributes/values/${id}`, data, init)

	const getByBarcode = (
		barcode: string,
		parameters?: {
			includestockdata?: number
			includesubproducts?: boolean
			includeparentid?: boolean
			includetrans?: boolean
		},
		init?: RequestInit
	) => this.get<unknown>(`products/barcode/${barcode}`, parameters, init)

	const purchasePricesList = (
		parameters?: {
			sortfield?: string
			sortorder?: "ASC" | "DESC"
			limit?: number
			page?: number
			mode?: 0 | 1 | 2
			category?: number
			supplier?: number
			sqlfilters?: string
		},
		init?: RequestInit
	) => this.get<unknown>(`products/purchase_prices`, parameters, init)

	const getByRefExt = this.commonGetByRefExt<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	const getByRef = this.commonGetByRef<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	const variantsByProductRef = (ref: string, init?: RequestInit) =>
		this.get<unknown>(`products/ref/${ref}/variants`, undefined, init)

	const addVariantByProductRef = (
		ref: string,
		data: {
			weight_impact: number
			price_impact: number
			price_impact_is_percent: boolean
			features: Record<string, string>
		},
		init?: RequestInit
	) => this.post<unknown>(`products/ref/${ref}/variants`, data, init)

	const deleteVariant = (id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`products/variants/${id}`, undefined, init)

	const updateVariant = (id: number, data: { request_data: string[] }, init?: RequestInit) =>
		this.update<unknown>(`products/variants/${id}`, data, init)

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
		getAttributeByRef,
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
