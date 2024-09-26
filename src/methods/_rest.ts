import { DolibarrApi } from "../DolibarrApi.class.js"
import { objectToStringRecord } from "../utils/miscellaneous/objectToStringRecord.js"
// import { dataToJsonBody } from "../utils/miscellaneous/dataToJsonBody.js"

export async function get<R>(
	this: DolibarrApi,
	input: string,
	parameters?: Record<string, unknown>,
	init?: RequestInit
): Promise<R> {
	const searchParams = new URLSearchParams(objectToStringRecord(parameters)).toString()
	const inputWithSearchParams = input + (searchParams.length > 0 ? `?${searchParams}` : "")

	const response = await fetch(
		composeUrl(this.api_url, inputWithSearchParams),
		initAggregation({ method: "GET", api_key: this.api_key, init })
	)

	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}

export async function post<R>(
	this: DolibarrApi,
	input: string,
	data?: Record<string, unknown> | Record<string, unknown>[],
	init?: RequestInit
): Promise<R> {
	const response = await fetch(
		composeUrl(this.api_url, input),
		initAggregation({ method: "POST", api_key: this.api_key, data, init })
	)
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}

export async function put<R>(
	this: DolibarrApi,
	input: string,
	data: Record<string, unknown>,
	init?: RequestInit
): Promise<R> {
	const response = await fetch(
		composeUrl(this.api_url, input),
		initAggregation({ method: "PUT", api_key: this.api_key, data, init })
	)
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}

export async function patch<R>(
	this: DolibarrApi,
	input: string,
	data?: Record<string, unknown> | Record<string, unknown>[],
	init?: RequestInit
): Promise<R> {
	const response = await fetch(
		composeUrl(this.api_url, input),
		initAggregation({ method: "PATCH", api_key: this.api_key, data, init })
	)
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}

export async function deleteRequest<R>(
	this: DolibarrApi,
	input: string,
	parameters?: Record<string, unknown>,
	init?: RequestInit
): Promise<R> {
	const searchParams = new URLSearchParams(objectToStringRecord(parameters)).toString()
	const inputWithSearchParams = input + (searchParams.length > 0 ? `?${searchParams}` : "")

	const response = await fetch(
		composeUrl(this.api_url, inputWithSearchParams),
		initAggregation({ method: "DELETE", api_key: this.api_key, init })
	)
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}

const composeUrl = (base: string, endpoint: string) => {
	const url = new URL(endpoint, base)
	return url.href
}

const initAggregation = ({
	method,
	api_key,
	data,
	init,
}: {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
	api_key?: string
	data?: Record<string, unknown> | Record<string, unknown>[]
	init?: RequestInit
}) => {
	const newInit: RequestInit = { ...init, method }

	newInit.headers = { Accept: "application/json", ...newInit?.headers } as Record<string, string>

	// Add DOLAPIKEY to headers if it exists
	if (!!api_key) {
		if (!newInit.headers) newInit.headers = {}
		newInit.headers["DOLAPIKEY"] = api_key
	} else {
		delete newInit.headers?.DOLAPIKEY
	}

	// Add Content-Type to headers if it doesn't exist and the method is not GET
	if (method !== "GET") {
		if (!newInit.headers) newInit.headers = {}
		newInit.headers["Content-Type"] = "application/json;charset=utf-8"
	}

	// Add body to newInit if they exist
	if (["POST", "PUT", "PATCH"].includes(method) && (!!newInit?.body || !!data)) {
		newInit.body = !!newInit?.body ? newInit.body : JSON.stringify(data)
	}

	return newInit
}
