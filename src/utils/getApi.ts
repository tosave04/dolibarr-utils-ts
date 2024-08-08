// TODO: function to be tested

"use server"

import { DolibarrApi } from "../DolibarrApi.class.js"

const DOLIBARR_API_URL = String(process.env.DOLIBARR_API_URL)
const DOLIBARR_API_KEY = String(process.env.DOLIBARR_API_KEY)

/**
 * Creates and returns a Dolibarr API instance using the provided or default URL and API key.
 *
 * @param	{string} [url=DOLIBARR_API_URL] - The Dolibarr API URL (default: process.env.DOLIBARR_API_URL).
 * @param	{string} [key=DOLIBARR_API_KEY] - The Dolibarr API key (default: process.env.DOLIBARR_API_KEY).
 * @returns	{DolibarrApi}	An instance of the Dolibarr API.
 * @throws	{Error}			Throws an error if the API initialization fails.
 */
export const getApi = (url: string = DOLIBARR_API_URL, key: string = DOLIBARR_API_KEY): DolibarrApi => {
	try {
		const api = new DolibarrApi(url, key)

		return api
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "An error has occurred")
	}
}
