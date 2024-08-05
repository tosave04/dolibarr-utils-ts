import { Dolibarr } from "../dolibarr.class"
import type { Group } from "../interfaces/Group.interface"
import type { User } from "../interfaces/User.interfaces"

export function users(this: Dolibarr) {
	const list = this.commonList<UsersListParameters, User>("users")

	const create = this.commonCreate<User>("users")

	const deleteObject = this.commonDelete("users")

	const getById = this.commonGetById<{ includepermissions?: number }, User>("users")

	const update = this.commonUpdate<User>("users")

	const getGroups = (id: number, init?: RequestInit) => this.get<Group[]>(`users/${id}/groups`, undefined, init)

	const linkGroup = (id: number, group: number, parameters?: { entity?: number }, init?: RequestInit) =>
		this.get<unknown>(`users/${id}/setGroup/${group}`, parameters, init)

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
}
