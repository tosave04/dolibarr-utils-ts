"use server"

import { getApi } from "./getApi.js"
import type { DolibarrApi } from "../DolibarrApi.class.js"
import type { Thirdparty } from "../interfaces/Thirdparty.interfaces.js"

/**
 * Searches for customers (third parties) in Dolibarr based on a provided search string.
 *
 * @param	{string}					params.search	The search string used to find customers.
 * @param	{DolibarrApi}				[api=getApi()]	An instance of the Dolibarr API. Defaults to getApi() if not provided.
 * @returns	{Promise<Thirdparty[]>}		A promise resolving to a list of matching customers.
 * @throws	{Error}						Throws an error if the API request fails.
 *
 * This function searches for customers in Dolibarr by name, alias, client code, or phone number,
 * sorted by creation date in descending order, limited to 12 results.
 */
export const customerResearch = async (
	params: { search: string },
	api: DolibarrApi = getApi()
): Promise<Thirdparty[]> => {
	const { search } = params

	try {
		const thirdparties =
			(await api.thirdparties.list(
				{
					sortfield: "t.datec",
					sortorder: "DESC",
					limit: 12,
					sqlfilters: `(t.nom:like:'%${search}%') or (t.name_alias:like:'%${search}%') or (t.code_client:like:'%${search}%') or (t.phone:like:'%${search}')`,
				},
				{ cache: "reload" }
			)) || []

		return thirdparties
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "An error has occurred")
	}
}
