import { DolibarrApi } from "../DolibarrApi.class.js"
import { objectToStringRecord } from "../utils/objectToStringRecord.js"
import { dataToJsonBody } from "../utils/dataToJsonBody.js"

export async function get<R>(
	this: DolibarrApi,
	input: string,
	parameters?: Record<string, unknown>,
	init?: RequestInit
): Promise<R> {
	const searchParams = new URLSearchParams(objectToStringRecord(parameters)).toString()
	const inputWithSearchParams = input + (searchParams.length > 0 ? `?${searchParams}` : "")

	const response = await fetch(composeUrl(this.api_url, inputWithSearchParams), {
		...init,
		method: "GET",
		headers: {
			Accept: "application/json",
			DOLAPIKEY: this.api_key,
			...init?.headers,
		},
	})
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
	const response = await fetch(composeUrl(this.api_url, input), {
		...init,
		method: "POST",
		headers: {
			Accept: "application/json",
			DOLAPIKEY: this.api_key,
			"Content-Type": "application/json;charset=utf-8",
			...init?.headers,
		},
		body: init?.body ? init.body : dataToJsonBody(data),
	})
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
	const response = await fetch(composeUrl(this.api_url, input), {
		...init,
		method: "PUT",
		headers: {
			Accept: "application/json",
			DOLAPIKEY: this.api_key,
			"Content-Type": "application/json;charset=utf-8",
			...init?.headers,
		},
		body: init?.body ? init.body : dataToJsonBody(data),
	})
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
	const response = await fetch(composeUrl(this.api_url, input), {
		...init,
		method: "PATCH",
		headers: {
			Accept: "application/json",
			DOLAPIKEY: this.api_key,
			"Content-Type": "application/json;charset=utf-8",
			...init?.headers,
		},
		body: init?.body ? init.body : dataToJsonBody(data),
	})
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

	const response = await fetch(composeUrl(this.api_url, inputWithSearchParams), {
		...init,
		method: "DELETE",
		headers: {
			Accept: "application/json",
			DOLAPIKEY: this.api_key,
			"Content-Type": "application/json;charset=utf-8",
			...init?.headers,
		},
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}

const composeUrl = (base: string, endpoint: string) => {
	const url = new URL(endpoint, base)
	return url.href
}
