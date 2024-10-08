import { DolibarrApi } from "../DolibarrApi.class.js"

export function login(this: DolibarrApi): ReturnType<typeof loginTypes> {
	const get = (login: string, password: string, parameters?: { entity?: string; reset?: 0 | 1 }, init?: RequestInit) =>
		this.get<{ success: { code: 200; token: string; entity: number; message: string } }>(
			`login`,
			{ ...parameters, login, password },
			init
		)

	const post = (login: string, password: string, data?: { entity?: string; reset?: 0 | 1 }, init?: RequestInit) =>
		this.post<unknown>(`login`, { ...data, login, password }, init)

	return {
		get,
		post,
	}
}

export declare function loginTypes(this: DolibarrApi): {
	/**
	 * Login
	 * Request the API token for a couple username / password.
	 * WARNING: You should NEVER use this API, like you should never use the similare API that uses the POST method. This will expose your password.
	 * To use the APIs, you should instead set an API token to the user you want to allow to use API (This API token called DOLAPIKEY can be found/set on the user page) and use this token as credential for any API call.
	 * From the API explorer, you can enter directly the "DOLAPIKEY" into the field at the top right of the page to get access to any allowed APIs.
	 * @param	string	login				User login
	 * @param	string	password			User password
	 * @param	string	parameters.entity	Entity (when multicompany module is used). '' means 1=first company.
	 * @param	number	parameters.reset	Reset token (0=get current token, 1=ask a new token and canceled old token. This means access using current existing API token of user will fails: new token will be required for new access)
	 * @return	Promise<{ success: { code: 200; token: string; entity: number; message: string } }>		Response status and user token
	 */
	get: (
		login: string,
		password: string,
		parameters?: {
			entity?: string
			reset?: 0 | 1
		},
		init?: RequestInit
	) => Promise<{
		success: {
			code: 200
			token: string
			entity: number
			message: string
		}
	}>

	/**
	 * Login
	 * Request the API token for a couple username / password.
	 * WARNING: You should NEVER use this API, like you should never use the similare API that uses the POST method. This will expose your password.
	 * To use the APIs, you should instead set an API token to the user you want to allow to use API (This API token called DOLAPIKEY can be found/set on the user page) and use this token as credential for any API call.
	 * From the API explorer, you can enter directly the "DOLAPIKEY" into the field at the top right of the page to get access to any allowed APIs.
	 * @param	string	login			User login
	 * @param	string	password		User password
	 * @param	string	data.entity		Entity (when multicompany module is used). '' means 1=first company.
	 * @param	number	data.reset		Reset token (0=get current token, 1=ask a new token and canceled old token. This means access using current existing API token of user will fails: new token will be required for new access)
	 * @return	Promise<{ success: { code: 200; token: string; entity: number; message: string } }>		Response status and user token
	 */
	post: (
		login: string,
		password: string,
		data?: {
			entity?: string
			reset?: 0 | 1
		},
		init?: RequestInit
	) => Promise<unknown>
}
