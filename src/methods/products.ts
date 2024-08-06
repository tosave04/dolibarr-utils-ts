import { Dolibarr } from "../dolibarr.class"
import type { Category } from "../interfaces/Category.interfaces"
import type { Product } from "../interfaces/Product.interfaces"

// TODO: Add missing parameters
type ProductSupplier = Record<string, unknown>

// TODO: Add missing parameters
type ProductPriceLine = Record<string, unknown>

// TODO: Add missing parameters
type ProductVariant = Record<string, unknown>

// TODO: Add missing parameters
type ProductAttribute = Record<string, unknown>

// TODO: Add missing parameters
type ProductAttributeValue = Record<string, unknown>

// TODO: Add missing parameters
type ProductPropertie = Record<string, unknown>

export function products(this: Dolibarr) {
	/**
	 * List products
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Limit for list
	 * @param	number	parameters.page				Page number
	 * @param	number	parameters.mode				Use this param to filter list (0 for all, 1 for only product, 2 for only service)
	 * @param	number	parameters.category			Use this param to filter list by category
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.tobuy:=:0) and (t.tosell:=:1)"
	 * @param	bool	parameters.ids_only			Return only IDs of product instead of all properties (faster, above all if list is long)
	 * @param	number	parameters.variant_filter	Use this param to filter list (0 = all, 1=products without variants, 2=parent of variants, 3=variants only)
	 * @param	bool	parameters.pagination_data	If this parameter is set to true the response will include pagination data. Default value is false. Page starts from 0
	 * @param	number	parameters.includestockdata	Load also information about stock (slower)
	 * @return	Promise<Product[]>					Array of product objects
	 */
	const list = this.commonList<InvoicesListParameters, Product>("products")

	/**
	 * Create product object
	 * @param	Partial<Product>	request_data	Request data
	 * @return	Promise<number>						ID of product
	 */
	const create = this.commonCreate<Product>("products")

	/**
	 * Delete product
	 * @param	number	id	Product ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("products")

	/**
	 * Get properties of a product object by id
	 * Return an array with product information.
	 * @param	number	id								ID of product
	 * @param	number	parameters.includestockdata		Load also information about stock (slower)
	 * @param	bool	parameters.includesubproducts	Load information about subproducts
	 * @param	bool	parameters.includeparentid		Load also ID of parent product (if product is a variant of a parent product)
	 * @param	bool	parameters.includetrans			Load also the translations of product label and description
	 * @return	Promise<Product>		Data			without useless information
	 */
	const getById = this.commonGetById<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	/**
	 * Update product.
	 * Price will be updated by this API only if option is set on "One price per product". See other APIs for other price modes.
	 * @param	number				id				Id of product to update
	 * @param	Partial<Product>	request_data	Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<Product>("products")

	/**
	 * Get categories for a product
	 * @param	number		id						ID of product
	 * @param	string		parameters.sortfield	Sort field
	 * @param	string		parameters.sortorder	Sort order
	 * @param	number		parameters.limit		Limit for list
	 * @param	number		parameters.page			Page number
	 * @return	Promise<Category[]>
	 */
	const getCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<Category[]>(`products/${id}/categories`, parameters, init)

	/**
	 * Get purchase prices for a product
	 * Return an array with product information.
	 * (getting product by "ref" or "ref_ext" not implemented)
	 * @param	number	id					ID of product
	 * @param	string	parameters.ref		Ref of element
	 * @param	string	parameters.ref_ext	Ref ext of element
	 * @param	string	parameters.barcode	Barcode of element
	 * @return	Promise<ProductSupplier>	Data	without useless information
	 *
	 */
	const getPurchasePrices = (
		id: number,
		parameters?: { ref?: string; ref_ext?: string; barcode?: string },
		init?: RequestInit
	) => this.get<ProductSupplier>(`products/${id}/purchase_prices`, parameters, init)

	/**
	 * Add/Update purchase prices for a product.
	 * @param	number	id	ID of Product
	 * @param	float	data.qty							Min quantity for which price is valid
	 * @param	float	data.buyprice						Purchase price for the quantity min
	 * @param	string	data.price_base_type				HT or TTC
	 * @param	number	data.fourn_id						Supplier ID
	 * @param	number	data.availability					Product availability
	 * @param	string	data.ref_fourn						Supplier ref
	 * @param	float	data.tva_tx							New VAT Rate (For example 8.5. Should not be a string)
	 * @param	string	data.charges						costs affering to product
	 * @param	float	data.remise_percent					Discount regarding qty (percent)
	 * @param	float	data.remise							Discount regarding qty (amount)
	 * @param	number	data.newnpr							Set NPR or not
	 * @param	number	data.delivery_time_days				Delay in days for delivery (max). May be '' if not defined.
	 * @param	string	data.supplier_reputation			Reputation with this product to the defined supplier (empty, FAVORITE, DONOTORDER)
	 * @param	array	data.localtaxes_array				Array with localtaxes info array('0'=>type1,'1'=>rate1,'2'=>type2,'3'=>rate2) (loaded by getLocalTaxesFromRate(vatrate, 0, ...) function).
	 * @param	string	data.newdefaultvatcode				Default vat code
	 * @param	float	data.multicurrency_buyprice			Purchase price for the quantity min in currency
	 * @param	string	data.multicurrency_price_base_type	HT or TTC in currency
	 * @param	float	data.multicurrency_tx				Rate currency
	 * @param	string	data.multicurrency_code				Currency code
	 * @param	string	data.desc_fourn						Custom description for product_fourn_price
	 * @param	string	data.barcode						Barcode
	 * @param	number	data.fk_barcode_type				Barcode type
	 * @return	Promise<number>
	 */
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
	) => this.post<number>(`products/${id}/purchase_prices`, data, init)

	const updatePurchasePrice = addPurchasePrice

	/**
	 * Delete purchase price for a product
	 * @param	number	id			Product ID
	 * @param	number	priceid		purchase price ID
	 * @return	Promise<ProductSupplier>
	 */
	const deletePurchasePrice = (id: number, priceid: number, init?: RequestInit) =>
		this.delete<ProductSupplier>(`products/${id}/purchase_prices/${priceid}`, undefined, init)

	/**
	 * Get prices per customer for a product
	 * @param	number	id							ID of product
	 * @param	string	parameters.thirdparty_id	Thirdparty id to filter orders of (example '1') {@pattern /^[0-9,]*$/i}
	 * @return	Promise<ProductPriceLine>
	 */
	const getPricesPerCustomer = (id: number, parameters?: { thirdparty_id?: string }, init?: RequestInit) =>
		this.get<ProductPriceLine>(`products/${id}/selling_multiprices/per_customer`, parameters, init)

	/**
	 * Get prices per quantity for a product
	 * @param	number	id	ID of product
	 * @return	Promise<{ prices_by_qty: any; prices_by_qty_list: any }>
	 */
	const getPricesPerQuantity = (id: number, init?: RequestInit) =>
		this.get<{ prices_by_qty: unknown; prices_by_qty_list: unknown }>(
			`products/${id}/selling_multiprices/per_quantity`,
			undefined,
			init
		)

	/**
	 * Get prices per segment for a product
	 * @param	number	id	ID of product
	 * @return	Promise<{ multiprices: any; multiprices_inc_tax: any; multiprices_min: any; multiprices_min_inc_tax: any; multiprices_vat: any; multiprices_base_type: any }>
	 */
	const getPricesPerSegment = (id: number, init?: RequestInit) =>
		this.get<{
			multiprices: any
			multiprices_inc_tax: any
			multiprices_min: any
			multiprices_min_inc_tax: any
			multiprices_vat: any
			multiprices_base_type: any
		}>(`products/${id}/selling_multiprices/per_segment`, undefined, init)

	/**
	 * Get stock data for the product id given.
	 * Optionaly with $selected_warehouse_id parameter user can get stock of specific warehouse
	 * @param	number	id									ID of Product
	 * @param	number	parameters.selected_warehouse_id	ID of warehouse
	 * @return	Promise<{ stock_warehouses: any }>
	 */
	const getStock = (id: number, parameters?: { selected_warehouse_id?: number }, init?: RequestInit) =>
		this.get<{ stock_warehouses: any }>(`products/${id}/stock`, parameters, init)

	/**
	 * Get the list of subproducts of the product.
	 * @param	number	id	Id of parent product/service
	 * @return	Promise<Product[]>
	 */
	const getSubproducts = (id: number, init?: RequestInit) =>
		this.get<Product[]>(`products/${id}/subproducts`, undefined, init)

	/**
	 * Add subproduct.
	 * Link a product/service to a parent product/service
	 * @param	number	id					Id of parent product/service
	 * @param	number	data.subproduct_id	Id of child product/service
	 * @param	number	data.qty			Quantity
	 * @param	number	data.incdec			1=Increase/decrease stock of child when parent stock increase/decrease
	 * @return	Promise<number>
	 */
	const addSubproduct = (
		id: number,
		data: { subproduct_id: number; qty: number; incdec?: 0 | 1 },
		init?: RequestInit
	) => this.post<number>(`products/${id}/subproducts/add`, data, init)

	/**
	 * Remove subproduct.
	 * Unlink a product/service from a parent product/service
	 * @param	number	id				Id of parent product/service
	 * @param	number	subproduct_id	Id of child product/service
	 * @return	Promise<number>
	 */
	const deleteSubproduct = (id: number, subproduct_id: number, init?: RequestInit) =>
		this.delete<number>(`products/${id}/subproducts/remove/${subproduct_id}`, undefined, init)

	/**
	 * Get product variants.
	 * @param	number	id							ID of Product
	 * @param	number	parameters.includestock		Default value 0. If parameter is set to 1 the response will contain stock data of each variant
	 * @return	Promise<ProductVariant[]>
	 */
	const getVariants = (id: number, parameters?: { includestock?: 0 | 1 }, init?: RequestInit) =>
		this.get<ProductVariant[]>(`products/${id}/variants`, parameters, init)

	/**
	 * Add variant.
	 * "features" is a list of attributes pairs id_attribute=>id_value. Example: array(id_color=>id_Blue, id_size=>id_small, id_option=>id_val_a, ...)
	 * @param	number	id								ID of Product
	 * @param	float	data.weight_impact				Weight impact of variant
	 * @param	float	data.price_impact				Price impact of variant
	 * @param	bool	data.price_impact_is_percent	Price impact in percent (true or false)
	 * @param	array	data.features					List of attributes pairs id_attribute->id_value. Example: array(id_color=>id_Blue, id_size=>id_small, id_option=>id_val_a, ...)
	 * @param	string	data.reference					Customized reference of variant
	 * @param	string	data.ref_ext					External reference of variant
	 * @return	Promise<number>
	 */
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

	/**
	 * Get attributes.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:color)"
	 * @return	Promise<ProductAttribute[]>
	 */
	const getAttributes = (
		parameters?: {
			sortfield?: string
			sortorder?: "ASC" | "DESC"
			limit?: number
			page?: number
			sqlfilters?: string
		},
		init?: RequestInit
	) => this.get<ProductAttribute[]>(`products/attributes`, parameters, init)

	/**
	 * Add attribute.
	 * @param	string	data.ref		Reference of Attribute
	 * @param	string	data.label		Label of Attribute
	 * @param	string	data.ref_ext	Reference of Attribute
	 * @return	Promise<number>
	 */
	const addAttribute = (data: { ref: string; label: string; ref_ext?: string }, init?: RequestInit) =>
		this.post<number>(`products/attributes`, data, init)

	/**
	 * Delete attributes by id.
	 * @param	number		id		ID of Attribute
	 * @return	Promise<number>		Result of deletion
	 */
	const deleteAttribute = (id: number, init?: RequestInit) =>
		this.delete<number>(`products/attributes/${id}`, undefined, init)

	/**
	 * Get attribute by ID.
	 * @param	number	id	ID of Attribute
	 * @return	Promise<ProductAttribute>
	 */
	const getAttribute = (id: number, init?: RequestInit) =>
		this.get<ProductAttribute>(`products/attributes/${id}`, undefined, init)

	/**
	 * Update attributes by id.
	 * @param	number						id				ID of Attribute
	 * @param	Partial<ProductAttribute>	request_data	Datas
	 * @return	Promise<ProductAttribute>
	 */
	const updateAttribute = (id: number, data: Partial<ProductAttribute>, init?: RequestInit) =>
		this.update<ProductAttribute>(`products/attributes/${id}`, data, init)

	/**
	 * Get all values for an attribute id.
	 * @param	number		id		ID of an Attribute
	 * @return	Promise<ProductAttributeValue[]>
	 */
	const getAttributeValues = (id: number, init?: RequestInit) =>
		this.get<ProductAttributeValue[]>(`products/attributes/${id}/values`, undefined, init)

	/**
	 * Add attribute value.
	 * @param	number	id			ID of Attribute
	 * @param	string	data.ref	Reference of Attribute value
	 * @param	string	data.value	Value of Attribute value
	 * @return	Promise<number>
	 */
	const addAttributeValue = (id: number, data: { ref: string; value: string }, init?: RequestInit) =>
		this.post<number>(`products/attributes/${id}/values`, data, init)

	/**
	 * Delete attribute value by ref.
	 * @param	number	id		ID of Attribute
	 * @param	string	ref		Ref of Attribute value
	 * @return	Promise<number>
	 */
	const deleteAttributeValueByRef = (id: number, ref: string, init?: RequestInit) =>
		this.delete<number>(`products/attributes/${id}/values/ref/${ref}`, undefined, init)

	/**
	 * Get attribute value by ref.
	 * @param	number	id		ID of Attribute value
	 * @param	string	ref		Ref of Attribute value
	 * @return	Promise<ProductAttributeValue>
	 */
	const getAttributeValueByRef = (id: number, ref: string, init?: RequestInit) =>
		this.get<ProductAttributeValue>(`products/attributes/${id}/values/ref/${ref}`, undefined, init)

	/**
	 * Get attributes by ref_ext.
	 * @param	string	ref_ext		External reference of Attribute
	 * @return	Promise<ProductAttribute[]>
	 */
	const getAttributeByRefExt = (ref_ext: string, init?: RequestInit) =>
		this.get<ProductAttribute[]>(`products/attributes/ref_ext/${ref_ext}`, undefined, init)

	/**
	 * Get attributes by ref.
	 * @param	string	ref	Reference of Attribute
	 * @return	Promise<ProductAttribute[]>
	 */
	const getAttributeByRef = (ref: string, init?: RequestInit) =>
		this.get<ProductAttribute[]>(`products/attributes/ref/${ref}`, undefined, init)

	/**
	 * Get all values for an attribute ref.
	 * @param	string	ref		Ref of an Attribute
	 * @return	Promise<ProductAttributeValue[]>
	 */
	const getValuesByAttributeRef = (ref: string, init?: RequestInit) =>
		this.get<ProductAttributeValue[]>(`products/attributes/ref/${ref}/values`, undefined, init)

	/**
	 * Delete attribute value by id.
	 * @param	number	id	ID of Attribute value
	 * @return	Promise<number>
	 */
	const deleteAttributeValue = (id: number, init?: RequestInit) =>
		this.delete<number>(`products/attributes/values/${id}`, undefined, init)

	/**
	 * Get attribute value by id.
	 * @param	number	id	ID of Attribute value
	 * @return	Promise<ProductAttributeValue>
	 */
	const getAttributeValue = (id: number, init?: RequestInit) =>
		this.get<ProductAttributeValue>(`products/attributes/values/${id}`, undefined, init)

	/**
	 * Update attribute value.
	 * @param	number	id					ID of Attribute
	 * @param	array	data.request_data	Datas
	 * @return	Promise<ProductAttributeValue>
	 */
	const updateAttributeValue = (id: number, data: { request_data: string[] }, init?: RequestInit) =>
		this.update<ProductAttributeValue>(`products/attributes/values/${id}`, data, init)

	/**
	 * Get properties of a product object by barcode
	 * Return an array with product information.
	 * @param	string	barcode							Barcode of element
	 * @param	number	parameters.includestockdata		Load also information about stock (slower)
	 * @param	bool	parameters.includesubproducts	Load information about subproducts
	 * @param	bool	parameters.includeparentid		Load also ID of parent product (if product is a variant of a parent product)
	 * @param	bool	parameters.includetrans			Load also the translations of product label and description
	 * @return	Promise<ProductPropertie[]>		Data	without useless information
	 */
	const getByBarcode = (
		barcode: string,
		parameters?: {
			includestockdata?: number
			includesubproducts?: boolean
			includeparentid?: boolean
			includetrans?: boolean
		},
		init?: RequestInit
	) => this.get<ProductPropertie[]>(`products/barcode/${barcode}`, parameters, init)

	/**
	 * Get a list of all purchase prices of products
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	number	parameters.mode			Use this param to filter list (0 for all, 1 for only product, 2 for only service)
	 * @param	number	parameters.category		Use this param to filter list by category of product
	 * @param	number	parameters.supplier		Use this param to filter list by supplier
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.tobuy:=:0) and (t.tosell:=:1)"
	 * @return	Promise<Record<number, { prodid: number; sortfield: string; sortorder: string; limit: number; offset: number; socid: number }>>	Array of product objects
	 */
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
	) =>
		this.get<
			Record<
				number,
				{ prodid: number; sortfield: string; sortorder: string; limit: number; offset: number; socid: number }
			>
		>(`products/purchase_prices`, parameters, init)

	/**
	 * Get properties of a product object by ref_ext
	 * Return an array with product information.
	 * @param	string	ref_ext							Ref_ext of element
	 * @param	number	parameters.includestockdata		Load also information about stock (slower)
	 * @param	bool	parameters.includesubproducts	Load information about subproducts
	 * @param	bool	parameters.includeparentid		Load also ID of parent product (if product is a variant of a parent product)
	 * @param	bool	parameters.includetrans			Load also the translations of product label and description
	 * @return	Promise<Product>		Data			without useless information
	 */
	const getByRefExt = this.commonGetByRefExt<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	/**
	 * Get properties of a product object by ref
	 * Return an array with product information.
	 * @param	string	ref	Ref of element
	 * @param	number	parameters.includestockdata		Load also information about stock (slower)
	 * @param	bool	parameters.includesubproducts	Load information about subproducts
	 * @param	bool	parameters.includeparentid		Load also ID of parent product (if product is a variant of a parent product)
	 * @param	bool	parameters.includetrans			Load also the translations of product label and description
	 * @return	Promise<Product>		Data			without useless information
	 */
	const getByRef = this.commonGetByRef<
		{ includestockdata?: number; includesubproducts: boolean; includeparentid: boolean; includetrans: boolean },
		Product
	>("products")

	/**
	 * Get product variants by Product ref.
	 * @param	string		ref		Ref of Product
	 * @return	Promise<ProductVariant[]>
	 */
	const variantsByProductRef = (ref: string, init?: RequestInit) =>
		this.get<ProductVariant[]>(`products/ref/${ref}/variants`, undefined, init)

	/**
	 * Add variant by product ref.
	 * "features" is a list of attributes pairs id_attribute=>id_value. Example: array(id_color=>id_Blue, id_size=>id_small, id_option=>id_val_a, ...)
	 * @param	string	ref								Ref of Product
	 * @param	float	data.weight_impact				Weight impact of variant
	 * @param	float	data.price_impact				Price impact of variant
	 * @param	bool	data.price_impact_is_percent	Price impact in percent (true or false)
	 * @param	array	data.features					List of attributes pairs id_attribute->id_value. Example: array(id_color=>id_Blue, id_size=>id_small, id_option=>id_val_a, ...)
	 * @return	Promise<number>
	 */
	const addVariantByProductRef = (
		ref: string,
		data: {
			weight_impact: number
			price_impact: number
			price_impact_is_percent: boolean
			features: Record<string, string>
		},
		init?: RequestInit
	) => this.post<number>(`products/ref/${ref}/variants`, data, init)

	/**
	 * Delete product variants.
	 * @param	number		id		ID of Variant
	 * @return	Promise<number>		Result of deletion
	 */
	const deleteVariant = (id: number, init?: RequestInit) =>
		this.delete<number>(`products/variants/${id}`, undefined, init)

	/**
	 * Put product variants.
	 * @param	number						id				ID of Variant
	 * @param	Partial<ProductVariant>		request_data	Datas
	 * @return	Promise<number>
	 */
	const updateVariant = (id: number, data: Partial<ProductVariant>, init?: RequestInit) =>
		this.update<number>(`products/variants/${id}`, data, init)

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
		deleteAttributeValue,
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
