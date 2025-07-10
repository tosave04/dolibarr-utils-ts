import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Category } from "../interfaces/Category.interfaces.js"

export function categories(this: DolibarrApi): ReturnType<typeof categoriesTypes> {
	const list = this.commonList<CategoriesListParameters, Category>("categories")

	const create = this.commonCreate<Category>("categories")

	const deleteObject = this.commonDelete("categories")

	const getById = this.commonGetById<{ include_childs?: boolean }, Category>("categories")

	const update = this.commonUpdate<Category>("categories")

	const getObjects = (
		id: number,
		parameters: { type: "member" | "customer" | "supplier" | "product" | "contact" | "project"; onlyids?: number },
		init?: RequestInit
	) => this.get<Record<string, any>[]>(`categories/${id}/objects`, parameters, init)

	const unlinkObject = (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_id: number,
		init?: RequestInit
	) => this.delete(`categories/${id}/objects/${type}/${object_id}`, undefined, init)

	const linkObject = (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_id: number,
		init?: RequestInit
	) => this.post(`categories/${id}/objects/${type}/${object_id}`, undefined, init)

	const unlinkObjectByRef = (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_ref: string,
		init?: RequestInit
	) => this.delete(`categories/${id}/objects/${type}/ref/${object_ref}`, undefined, init)

	const linkObjectByRef = (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_ref: string,
		init?: RequestInit
	) => this.post(`categories/${id}/objects/${type}/ref/${object_ref}`, undefined, init)

	const listObjectCategories = (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact" | "project",
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<Category[]>(`categories/object/${type}/${id}`, parameters, init)

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		getObjects,
		unlinkObject,
		linkObject,
		unlinkObjectByRef,
		linkObjectByRef,
		listObjectCategories,
	}
}

export type CategoriesListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	type?: "member" | "customer" | "supplier" | "product" | "contact"
	sqlfilters?: string
	properties?: string
}

export declare function categoriesTypes(this: DolibarrApi): {
	/**
	 * List categories
	 * @param 	string	parameters.sortfield	Sort field
	 * @param 	string	parameters.sortorder	Sort order
	 * @param 	number	parameters.limit		Limit for list
	 * @param 	number	parameters.page			Page number
	 * @param 	string	parameters.type			Type of category ('member', 'customer', 'supplier', 'product', 'contact')
	 * @param 	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @param	string	parameters.properties	Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<Category[]>				Array of category objects
	 */
	list: (parameters?: CategoriesListParameters | undefined, init?: RequestInit) => Promise<Category[]>
	/**
	 * Create category object
	 * @param 	Partial<Category>	data	Request data
	 * @return	Promise<number>				ID of category
	 */
	create: (data: Partial<Category>, init?: RequestInit) => Promise<number>

	/**
	 * Delete category
	 * @param 	number	id		Category ID
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
	 * Get properties of a category object
	 * Return an array with category informations
	 * @param	number		id							ID of category
	 * @param	boolean 	parameters.include_childs	Include child categories list (true or false)
	 * @return	Promise<Category>						data without useless information
	 */
	getById: (
		id: number,
		parameters?:
			| {
					include_childs?: boolean
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Category>

	/**
	 * Update category
	 * @param 	number				id		Id of category to update
	 * @param 	Partial<Category>)	data	Datas
	 * @return	Promise<Category>
	 */
	update: (id: number, data: Partial<Category>, init?: RequestInit) => Promise<Category>

	/**
	 * Get the list of objects in a category.
	 * @param 	number	id					ID of category
	 * @param 	string	parameters.type		Type of category ('member', 'customer', 'supplier', 'product', 'contact', 'project')
	 * @param 	number	parameters.onlyids	Return only ids of objects (consume less memory)
	 * @return	Promise<Record<string, any>[]>
	 */
	getObjects: (
		id: number,
		parameters: {
			type: "member" | "customer" | "supplier" | "product" | "contact" | "project"
			onlyids?: number
		},
		init?: RequestInit
	) => Promise<Record<string, any>[]>

	/**
	 * Unlink an object from a category by id
	 * @param 	number	id			ID of category
	 * @param 	string	type		Type of category ('member', 'customer', 'supplier', 'product', 'contact')
	 * @param 	number	object_id	ID of the object
	 * @return	Promise<Category>
	 */
	unlinkObject: (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_id: number,
		init?: RequestInit
	) => Promise<unknown>

	/**
	 * Link an object to a category by id
	 * @param 	number	id			ID of category
	 * @param 	string	type		Type of category ('member', 'customer', 'supplier', 'product', 'contact')
	 * @param 	number	object_id	ID of object
	 * @return	Promise<Category>
	 */
	linkObject: (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_id: number,
		init?: RequestInit
	) => Promise<unknown>

	/**
	 * Unlink an object from a category by ref
	 * @param 	number	id			ID of category
	 * @param 	string	type		Type  of category ('member', 'customer', 'supplier', 'product', 'contact')
	 * @param 	string	object_ref	Reference of the object
	 * @return	Promise<Category>
	 */
	unlinkObjectByRef: (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_ref: string,
		init?: RequestInit
	) => Promise<unknown>

	/**
	 * Link an object to a category by ref
	 * @param 	number	id			ID of category
	 * @param 	string	type		Type of category ('member', 'customer', 'supplier', 'product', 'contact')
	 * @param 	string	object_ref	Reference of object
	 * @return	Promise<Category>
	 */
	linkObjectByRef: (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact",
		object_ref: string,
		init?: RequestInit
	) => Promise<unknown>

	/**
	 * List categories of an object
	 * Get the list of categories linked to an object
	 * @param 	number	id						Object ID
	 * @param 	string	type					Type of category ('member', 'customer', 'supplier', 'product', 'contact', 'project')
	 * @param 	string	parameters.sortfield	Sort field
	 * @param 	string	parameters.sortorder	Sort order
	 * @param 	number	parameters.limit		Limit for list
	 * @param 	number	parameters.page			Page number
	 * @return	Promise<Category[]>				Array of category objects
	 */
	listObjectCategories: (
		id: number,
		type: "member" | "customer" | "supplier" | "product" | "contact" | "project",
		parameters?: {
			sortfield?: string
			sortorder?: "ASC" | "DESC"
			limit?: number
			page?: number
		},
		init?: RequestInit
	) => Promise<Category[]>
}
