import { Dolibarr } from "../dolibarr.class"
import type { User } from "../interfaces/User.interfaces"

export function users(this: Dolibarr) {
	const list = this.commonList<UsersListParameters, User>("users")

	const create = this.commonCreate<User>("users")

	const deleteObject = this.commonDelete("users")

	const getById = this.commonGetById<{ includepermissions?: number }, User>("users")

	const update = this.commonUpdate<User>("users")

	const getGroups = null

	const linkGroup = null

	const getByEmail = null

	const groupsList = null

	const getGroup = null

	const getMoreById = null

	const getByLogin = null

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
		getMoreById,
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
