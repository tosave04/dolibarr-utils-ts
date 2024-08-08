// TODO: function to be tested

"use server"

import { getApi } from "./getApi.js"
import type { DolibarrApi } from "../DolibarrApi.class.js"
import type { Proposal } from "../interfaces/Proposal.interfaces.js"
import type { Line } from "../interfaces/Line.interfaces.js"

interface NewProposal extends Proposal {
	socid: number
	ref_client: string
	lines: Line[]
}

/**
 * Creates a new proposal in Dolibarr and returns either the proposal ID or the full proposal object.
 *
 * @param	{NewProposal}	data			The data for the new proposal, including client ID and lines.
 * @param	{boolean}		[onlyId=true]	If true, returns only the proposal ID; otherwise, returns the full proposal object.
 * @param	{DolibarrApi}	[api=getApi()]	An instance of the Dolibarr API.
 * @returns	{Promise<number | Proposal>}	The proposal ID or the full proposal object.
 * @throws	{Error}							Throws an error if the proposal creation fails.
 */
export const createProposal = async (
	data: NewProposal,
	onlyId: boolean = true,
	api: DolibarrApi = getApi()
): Promise<number | Proposal> => {
	try {
		const date = data?.date ?? Math.ceil(Date.now() / 1000)

		const proposalId = await api.proposals.create({ ...data, date })

		if (onlyId) return proposalId

		const proposal = await api.proposals.getById(proposalId)

		return proposal
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "An error has occurred")
	}
}
