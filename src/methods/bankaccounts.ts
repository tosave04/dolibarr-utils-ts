import { Dolibarr } from "../dolibarr.class"
import type { BankAccount } from "../interfaces/BankAccount.interface"
import type { BankAccountLine } from "../interfaces/BankAccountLine.interface"

export function bankaccounts(this: Dolibarr) {
	const list = this.commonList<BankAccountListParameters, Event>("bankaccounts")

	const create = this.commonCreate<BankAccount>("bankaccounts")

	const deleteObject = this.commonDelete("bankaccounts")

	const getById = this.commonGetById<{}, Event>("bankaccounts")

	const update = this.commonUpdate<Event>("bankaccounts")

	const getLines = (id: number, parameters?: { sqlfilters: string }, init?: RequestInit) =>
		this.get<BankAccountLine[]>(`bankaccounts/${id}/lines`, parameters, init)

	const addLine = (
		id: number,
		data: {
			date: string
			type: "TYP" | "VIR" | "PRE" | "LIQ" | "VAD" | "CB" | "CHQ" | string
			label: string
			amount: number
			category?: number
			cheque_number?: string
			cheque_writer?: string
			cheque_bank?: string
			accountancycode?: string
			datev?: string
			num_releve?: string
		},
		init?: RequestInit
	) => this.post<number>(`bankaccounts/${id}/lines`, data, init)

	const linkLine = (
		id: number,
		line_id: number,
		data: { url_id: number; url: string; label: string; type: "payment" | "company" | "member" | string },
		init?: RequestInit
	) => this.post<unknown>(`bankaccounts/${id}/lines/${line_id}/links`, data, init)

	const transfert = (
		data: {
			bankaccount_from_id: number
			bankaccount_to_id: number
			date: string
			description: string
			amount: number
			amount_to?: number
		},
		init?: RequestInit
	) => this.post<unknown>(`bankaccounts/transfer`, data, init)

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		getLines,
		addLine,
		linkLine,
		transfert,
	}
}

export type BankAccountListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	category?: number
	sqlfilters?: string
}
