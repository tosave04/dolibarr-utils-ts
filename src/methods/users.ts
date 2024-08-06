import { Dolibarr } from "../dolibarr.class"
import type { Group } from "../interfaces/Group.interface"
import type { User } from "../interfaces/User.interfaces"

export function users(this: Dolibarr) {
	/**
	 * List Users
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	string	parameters.user_ids		User ids filter field. Example: '1' or '1,2,3' {@pattern /^[0-9,]*$/i}
	 * @param	number	parameters.category		Use this param to filter list by category
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<User[]>					Array of User objects
	 */
	const list = this.commonList<UsersListParameters, User>("users")

	/**
	 * Create user account
	 * @param	Partial<User>	request_data	New user data
	 * @return	Promise<number>
	 */
	const create = this.commonCreate<User>("users")

	/**
	 * Delete account/user
	 * @param	number		id		Account ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("users")

	/**
	 * Get properties of an user object
	 * @param	number	id								ID of user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							data without useless information
	 */
	const getById = this.commonGetById<{ includepermissions?: number }, User>("users")

	/**
	 * Update user account
	 * @param	number			id				Id of account to update
	 * @param	Partial<User>	request_data	Datas
	 * @return	Promise<number>					Record after update
	 */
	const update = this.commonUpdate<User>("users")

	/**
	 * List the groups of a user
	 * @param	number		id		Id of user
	 * @return	Promise<Group[]>	Array of group objects
	 */
	const getGroups = (id: number, init?: RequestInit) => this.get<Group[]>(`users/${id}/groups`, undefined, init)

	/**
	 * Add a user into a group
	 * @param	number	id					User ID
	 * @param	number	group				Group ID
	 * @param	number	parameters.entity	Entity ID (valid only for superadmin in multicompany transverse mode)
	 * @return	Promise<number>				1 if success
	 */
	const linkGroup = (id: number, group: number, parameters?: { entity?: number }, init?: RequestInit) =>
		this.get<number>(`users/${id}/setGroup/${group}`, parameters, init)

	/**
	 * Get properties of an user object by Email
	 * @param	string	email							Email of user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							Data without useless information
	 */
	const getByEmail = this.commonGetByEmail<{ includepermissions?: number }, User>("users")

	/**
	 * List Groups
	 * Return an array with a list of Groups
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	string	parameters.group_ids	Groups ids filter field. Example: '1' or '1,2,3' {@pattern /^[0-9,]*$/i}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @return	Promise<Group[]>				Array of User objects
	 */
	const groupsList = (
		parameters?: {
			sortfield?: string
			sortorder?: "ASC" | "DESC"
			limit?: number
			page?: number
			group_ids?: string
			sqlfilters?: string
		},
		init?: RequestInit
	) => this.get<Group[]>(`users/groups`, parameters, init)

	/**
	 * Get properties of an group object
	 * Return an array with group informations
	 * @param	number	group						ID of group
	 * @param	number	parameters.load_members		Load members list or not {@min 0} {@max 1}
	 * @return	Promise<Group>						Array of User objects
	 */
	const getGroup = (group: number, parameters?: { load_members?: number }, init?: RequestInit) =>
		this.get<Group>(`users/groups/${group}`, parameters, init)

	/**
	 * Get more properties of a user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							Data without useless information
	 */
	const getUserProperties = (parameters?: { includepermissions?: number }, init?: RequestInit) =>
		this.get<User>(`users/info`, parameters, init)

	/**
	 * Get properties of an user object by login
	 * @param	string	login							Login of user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							Data without useless information
	 */
	const getByLogin = (login: string, parameters?: { includepermissions?: number }, init?: RequestInit) =>
		this.get<User>(`users/login/${login}`, parameters, init)

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		getGroups,
		linkGroup,
		getByEmail,
		groupsList,
		getGroup,
		getUserProperties,
		getByLogin,
	}
}

export type UsersListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	user_ids?: string
	category?: number
	sqlfilters?: string
}
