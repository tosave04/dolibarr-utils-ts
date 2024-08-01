import { Dolibarr } from "../dolibarr.class"
import type { Category } from "../interfaces/Category.interfaces"
import type { Contact } from "../interfaces/Contact.interfaces"

export function contacts(this: Dolibarr) {
	/**
	 * List contacts
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	int		parameters.limit			Limit for list
	 * @param	int		parameters.page				Page number
	 * @param	string	parameters.thirdparty_ids	Thirdparty ids to filter contacts of (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	int		parameters.category			Use this param to filter list by category
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @param	int		parameters.includecount		Count and return also number of elements the contact is used as a link for
	 * @param	int		parameters.includeroles		Includes roles of the contact
	 * @return	Promise<Contact[]>					Array of contact objects
	 */
	const list = this.commonList<ContactsListParameters, Contact>("contacts")

	/**
	 * Create contact object
	 * @param	Partial<Contact>	request_data	Request datas
	 * @return	Promise<number>						ID of contact
	 */
	const create = this.commonCreate<Contact>("contacts")

	/**
	 * Delete contact
	 * @param	number		id Contact ID
	 * @return	Promise<{ success: { code: number; message: string } }>
	 */
	const deleteObject = this.commonDelete("contacts")

	/**
	 * Get properties of a contact object by Email
	 * @param	string		email			Email of contact
	 * @param	number		includecount	Count and return also number of elements the contact is used as a link for
	 * @param	number		includeroles	Includes roles of the contact
	 * @return 	Promise<Contact>			data without useless information
	 */
	const getById = this.commonGetById<{ includecount?: number; includeroles?: number }, Contact>("contacts")

	/**
	 * Update contact
	 * @param	number				id		Id of contact to update
	 * @param	Partial<Contact>	data	Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<Contact>("contacts")

	/**
	 * Get categories for a contact
	 * @param	number		id			ID of contact
	 * @param	string		sortfield	Sort field
	 * @param	string		sortorder	Sort order
	 * @param	number		limit		Limit for list
	 * @param	number		page		Page number
	 * @return	Promise<Category[]>
	 */
	const getCategories = (
		id: number,
		parameters?: { sortfield?: string; sortorder?: "ASC" | "DESC"; limit?: number; page?: number },
		init?: RequestInit
	) => this.get<Category[]>(`${module}/${id}/categories`, parameters, init)

	/**
	 * Remove the link between a category and a contact
	 * @param	number	id				Id of contact
	 * @param	number	category_id		Id of category
	 * @return	Promise<Contact>
	 */
	const removeCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.delete<Contact>(`contacts/${id}/categories/${category_id}`, undefined, init)

	/**
	 * Add a category to a contact
	 * @param	number		id				Id of contact
	 * @param	number		category_id		Id of category
	 * @return	Promise<Contact>
	 */
	const addCategory = (id: number, category_id: number, init?: RequestInit) =>
		this.post<Contact>(`contacts/${id}/categories/${category_id}`, undefined, init)

	/**
	 * Create an user account object from contact (external user)
	 * @param	number	id				Id of contact
	 * @param	string	data.login		Request datas
	 * @param	string	data.password	Request datas
	 * @return	Promise<number>			ID of user
	 */
	const createUserFromContact = (id: number, data: { login: string; password: string }, init?: RequestInit) =>
		this.post<unknown>(`contacts/${id}/createUser`, data, init)

	const getByEmail = this.commonGetByEmail<{ includecount?: number; includeroles?: number }, Contact>("contacts")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		getCategories,
		removeCategory,
		addCategory,
		createUserFromContact,
		getByEmail,
	}
}

export type ContactsListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	thirdparty_ids?: string
	category?: number
	sqlfilters?: string
	includecount?: number
	includeroles?: number
}
