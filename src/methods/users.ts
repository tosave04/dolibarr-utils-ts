import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Group } from "../interfaces/Group.interfaces.js"
import type { User } from "../interfaces/User.interfaces.js"

export function users(this: DolibarrApi): ReturnType<typeof usersTypes> {
	const list = this.commonList<UsersListParameters, User>("users")

	const create = this.commonCreate<User>("users")

	const deleteObject = this.commonDelete("users")

	const getById = this.commonGetById<{ includepermissions?: number }, User>("users")

	const update = this.commonUpdate<User>("users")

	const getGroups = (id: number, init?: RequestInit) => this.get<Group[]>(`users/${id}/groups`, undefined, init)

	const linkGroup = (id: number, group: number, parameters?: { entity?: number }, init?: RequestInit) =>
		this.get<number>(`users/${id}/setGroup/${group}`, parameters, init)

	const getByEmail = this.commonGetByEmail<{ includepermissions?: number }, User>("users")

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

	const getGroup = (group: number, parameters?: { load_members?: number }, init?: RequestInit) =>
		this.get<Group>(`users/groups/${group}`, parameters, init)

	const getUserProperties = (parameters?: { includepermissions?: number }, init?: RequestInit) =>
		this.get<User>(`users/info`, parameters, init)

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
	properties?: string
}

export declare function usersTypes(this: DolibarrApi): {
	/**
	 * List Users
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	string	parameters.user_ids		User ids filter field. Example: '1' or '1,2,3' {@pattern /^[0-9,]*$/i}
	 * @param	number	parameters.category		Use this param to filter list by category
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101')"
	 * @param	string	parameters.properties	Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<User[]>					Array of User objects
	 */
	list: (parameters?: UsersListParameters | undefined, init?: RequestInit) => Promise<User[]>

	/**
	 * Create user account
	 * @param	Partial<User>	request_data	New user data
	 * @return	Promise<number>
	 */
	create: (data: Partial<User>, init?: RequestInit) => Promise<number>

	/**
	 * Delete account/user
	 * @param	number		id		Account ID
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
	 * Get properties of an user object
	 * @param	number	id								ID of user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							data without useless information
	 */
	getById: (
		id: number,
		parameters?:
			| {
					includepermissions?: number
			  }
			| undefined,
		init?: RequestInit
	) => Promise<User>

	/**
	 * Update user account
	 * @param	number			id				Id of account to update
	 * @param	Partial<User>	request_data	Datas
	 * @return	Promise<User>					Record after update
	 */
	update: (id: number, data: Partial<User>, init?: RequestInit) => Promise<User>

	/**
	 * List the groups of a user
	 * @param	number		id		Id of user
	 * @return	Promise<Group[]>	Array of group objects
	 */
	getGroups: (id: number, init?: RequestInit) => Promise<Group[]>

	/**
	 * Add a user into a group
	 * @param	number	id					User ID
	 * @param	number	group				Group ID
	 * @param	number	parameters.entity	Entity ID (valid only for superadmin in multicompany transverse mode)
	 * @return	Promise<number>				1 if success
	 */
	linkGroup: (
		id: number,
		group: number,
		parameters?: {
			entity?: number
		},
		init?: RequestInit
	) => Promise<number>

	/**
	 * Get properties of an user object by Email
	 * @param	string	email							Email of user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							Data without useless information
	 */
	getByEmail: (
		email: string,
		parameters?:
			| {
					includepermissions?: number
			  }
			| undefined,
		init?: RequestInit
	) => Promise<User>

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
	groupsList: (
		parameters?: {
			sortfield?: string
			sortorder?: "ASC" | "DESC"
			limit?: number
			page?: number
			group_ids?: string
			sqlfilters?: string
		},
		init?: RequestInit
	) => Promise<Group[]>

	/**
	 * Get properties of an group object
	 * Return an array with group informations
	 * @param	number	group						ID of group
	 * @param	number	parameters.load_members		Load members list or not {@min 0} {@max 1}
	 * @return	Promise<Group>						Array of User objects
	 */
	getGroup: (
		group: number,
		parameters?: {
			load_members?: number
		},
		init?: RequestInit
	) => Promise<Group>

	/**
	 * Get more properties of a user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							Data without useless information
	 */
	getUserProperties: (
		parameters?: {
			includepermissions?: number
		},
		init?: RequestInit
	) => Promise<User>

	/**
	 * Get properties of an user object by login
	 * @param	string	login							Login of user
	 * @param	number	parameters.includepermissions	Set this to 1 to have the array of permissions loaded (not done by default for performance purpose)
	 * @return	Promise<User>							Data without useless information
	 */
	getByLogin: (
		login: string,
		parameters?: {
			includepermissions?: number
		},
		init?: RequestInit
	) => Promise<User>
}
