import { DolibarrApi } from "../DolibarrApi.class.js"
import type { BankAccount } from "../interfaces/BankAccount.interfaces.js"
import type { BankAccountLine } from "../interfaces/BankAccountLine.interfaces.js"

export function bankaccounts(this: DolibarrApi): ReturnType<typeof bankaccountsTypes> {
	const list = this.commonList<BankAccountListParameters, BankAccount>("bankaccounts")

	const create = this.commonCreate<BankAccount>("bankaccounts")

	const deleteObject = this.commonDelete("bankaccounts")

	const getById = this.commonGetById<{}, BankAccount>("bankaccounts")

	const update = this.commonUpdate<BankAccount>("bankaccounts")

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
	) => this.post<number>(`bankaccounts/${id}/lines/${line_id}/links`, data, init)

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
	) =>
		this.post<{ success: { code: 201; message: string; bank_id_from: number; bank_id_to: number } }>(
			`bankaccounts/transfer`,
			data,
			init
		)

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

export declare function bankaccountsTypes(this: DolibarrApi): {
	/**
	 * Get the list of accounts.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	number	parameters.category		Use this param to filter list by category
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.import_key:<:'20160101')"
	 * @return	Promise<BankAccount[]>				List of account objects
	 */
	list: (parameters?: BankAccountListParameters | undefined, init?: RequestInit) => Promise<BankAccount[]>

	/**
	 * Create account object
	 * @param	Partial<BankAccount>	request_data	Request data
	 * @return	Promise<number>							ID of account
	 */
	create: (data: Partial<BankAccount>, init?: RequestInit) => Promise<number>

	/**
	 * Delete account
	 * @param	number	id	ID of account
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	delete: (id: number, init?: RequestInit) => Promise<{ success: { code: number; message: string } }>

	/**
	 * Get account by ID.
	 * @param	number	id		ID of account
	 * @return	Promise<BankAccount>	Account	object
	 */
	getById: (id: number, parameters?: {} | undefined, init?: RequestInit) => Promise<BankAccount>

	/**
	 * Update account
	 * @param	number			id				ID of account
	 * @param	Partial<BankAccount>	request_data	data
	 * @return	Promise<number>
	 */
	update: (id: number, data: Partial<BankAccount>, init?: RequestInit) => Promise<number>

	/**
	 * Get the list of lines of the account.
	 * @param	number	id						ID of account
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.import_key:<:'20160101')"
	 * @return	Promise<BankAccountLine[]>		of AccountLine objects
	 */
	getLines: (id: number, parameters?: { sqlfilters: string }, init?: RequestInit) => Promise<BankAccountLine[]>

	/**
	 * Add a line to an account
	 * @param	number	id						ID of account
	 * @param	string	data.date				Payment date (timestamp) {@from body} {@type timestamp}
	 * @param	string	data.type				Payment mode (TYP,VIR,PRE,LIQ,VAD,CB,CHQ...) {@from body}
	 * @param	string	data.label				Label {@from body}
	 * @param	number	data.amount				Amount (may be 0) {@from body}
	 * @param	number	data.category			Category
	 * @param	string	data.cheque_number		Cheque numero {@from body}
	 * @param	string	data.cheque_writer		Name of cheque writer {@from body}
	 * @param	string	data.cheque_bank		Bank of cheque writer {@from body}
	 * @param	string	data.accountancycode	Accountancy code {@from body}
	 * @param	string	data.datev				Payment date value (timestamp) {@from body} {@type timestamp}
	 * @param	string	data.num_releve			Bank statement numero {@from body}
	 * @return	Promise<number>					ID of line
	 */
	addLine: (
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
	) => Promise<number>

	/**
	 * Add a link to an account line
	 * @param	number	id			ID of account
	 * @param	number	line_id		ID of account line
	 * @param	number	data.url_id		ID to set in the URL {@from body}
	 * @param	string	data.url			URL of the link {@from body}
	 * @param	string	data.label		Label {@from body}
	 * @param	string	data.type		Type of link ('payment', 'company', 'member', ...) {@from body}
	 * @return	Promise<number>	ID of link
	 */
	linkLine: (
		id: number,
		line_id: number,
		data: {
			url_id: number
			url: string
			label: string
			type: "payment" | "company" | "member" | string
		},
		init?: RequestInit
	) => Promise<number>

	/**
	 * Create an internal wire transfer between two bank accounts
	 * @param	number	data.bankaccount_from_id	BankAccount ID to use as the source of the internal wire transfer		{@from body}{@required true}
	 * @param	number	data.bankaccount_to_id		BankAccount ID to use as the destination of the internal wire transfer  {@from body}{@required true}
	 * @param	string	data.date					Date of the internal wire transfer (UNIX timestamp)						{@from body}{@required true}{@type timestamp}
	 * @param	string	data.description			Description of the internal wire transfer								{@from body}{@required true}
	 * @param	number	data.amount					Amount to transfer from the source to the destination BankAccount		{@from body}{@required true}
	 * @param	number	data.amount_to				Amount to transfer to the destination BankAccount (only when accounts does not share the same currency)		{@from body}{@required false}
	 * @return	Promise<{ success: { code: 201; message: string; bank_id_from: number; bank_id_to: number } }>
	 */
	transfert: (
		data: {
			bankaccount_from_id: number
			bankaccount_to_id: number
			date: string
			description: string
			amount: number
			amount_to?: number
		},
		init?: RequestInit
	) => Promise<{ success: { code: 201; message: string; bank_id_from: number; bank_id_to: number } }>
}
