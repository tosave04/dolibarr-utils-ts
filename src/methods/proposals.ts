import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Proposal } from "../interfaces/Proposal.interfaces.js"
import type { Line } from "../interfaces/Line.interfaces.js"

export function proposals(this: DolibarrApi): ReturnType<typeof proposalsTypes> {
	const list = this.commonList<ProposalsListParameters, Proposal>("proposals")

	const create = this.commonCreate<Proposal>("proposals")

	const deleteObject = this.commonDelete("proposals")

	const getById = this.commonGetById<{ contact_list?: 0 | 1 }, Proposal>("proposals")

	const update = this.commonUpdate<Proposal>("proposals")

	const close = this.commonClose<Proposal>("proposals")

	const unlinkContact = this.commonUnlinkContact<Proposal>("proposals")

	const linkContact = (
		id: number,
		contactid: number,
		type: "BILLING" | "SHIPPING" | "CUSTOMER" | "SALESREPFOLL",
		source: "internal" | "external" = "external", // Neccessary for the API, otherwise it will return an error
		init?: RequestInit
	) =>
		this.post<{ success: { code: number; message: string } }>(
			`proposals/${id}/contact/${contactid}/${type}/${source}`,
			undefined,
			init
		)

	const addLine = this.commonAddLine("proposals")

	const getLines = this.commonGetLines<{ sqlfilters: string }>("proposals")

	const addLines = this.commonAddLines("proposals")

	const deleteLine = this.commonDeleteLine("proposals")

	const updateLine = this.commonUpdateLine<Proposal>("proposals")

	const setBilled = (id: number) => this.post<Proposal>(`proposals/${id}/setinvoiced`)

	const setToDraft = this.commonSetToDraft<Proposal>("proposals")

	const validate = this.commonValidate<Proposal>("proposals")

	const getByRefExt = this.commonGetByRefExt<{ contact_list?: 0 | 1 }, Proposal>("proposals")

	const getByRef = this.commonGetByRef<{ contact_list?: 0 | 1 }, Proposal>("proposals")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		close,
		unlinkContact,
		linkContact,
		getLines,
		addLine,
		addLines,
		deleteLine,
		updateLine,
		setBilled,
		setToDraft,
		validate,
		getByRefExt,
		getByRef,
	}
}

export type ProposalsListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	thirdparty_ids?: string
	sqlfilters?: string
	properties?: string
}

export declare function proposalsTypes(this: DolibarrApi): {
	/**
	 * List commercial proposals
	 * @param	string			parameters.sortfield		Sort field
	 * @param	string			parameters.sortorder		Sort order
	 * @param	number			parameters.limit			Limit for list
	 * @param	number			parameters.page				Page number
	 * @param	string			parameters.thirdparty_ids	Thirdparty ids to filter commercial proposals (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string			parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.datec:<:'20160101')"
	 * @param	string			parameters.properties		Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @param	RequestCache	cache						Cache configuration
	 * @return	Promise<Proposal[]>							List of commercial proposals
	 */
	list: (parameters?: ProposalsListParameters | undefined, init?: RequestInit) => Promise<Proposal[]>

	/**
	 * Create commercial proposal object
	 * @param	Partial<Proposal>	data	Request data
	 * @return	Promise<number>				ID of proposal
	 */
	create: (data: Partial<Proposal>, init?: RequestInit) => Promise<number>

	/**
	 * Delete commercial proposal
	 * @param	number	id		Commercial proposal ID
	 * @return	Promise<{ success: { code: number; message: string } }>
	 */
	delete: (
		id: number,
		init?: RequestInit
	) => Promise<{
		success: {
			code: number
			message: string
		}
	}>

	/**
	 * Get properties of a commercial proposal object
	 * Return an array with commercial proposal informations
	 * @param	number	id						ID of commercial proposal
	 * @param	number	parameters.contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Proposal>
	 */
	getById: (
		id: number,
		parameters?:
			| {
					contact_list?: 0 | 1
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Proposal>

	/**
	 * Update commercial proposal general fields (won't touch lines of commercial proposal)
	 * @param	number				id		Id of commercial proposal to update
	 * @param	Partial<Proposal>	data	Datas
	 * @return	Promise<Proposal>
	 */
	update: (id: number, data: Partial<Proposal>, init?: RequestInit) => Promise<Proposal>

	/**
	 * Close (Accept or refuse) a quote / commercial proposal
	 * @param	number	id					Commercial proposal ID
	 * @param	number	data.status			Must be 2 (accepted) or 3 (refused)	{@min 2}{@max 3}
	 * @param	string	data.note_private	Add this mention at end of private note
	 * @param	number	data.notrigger		Disabled triggers
	 * @return	Promise<Proposal>
	 */
	close: (
		id: number,
		data: {
			status: 2 | 3
			note_private?: string
			notrigger?: number
		},
		init?: RequestInit
	) => Promise<Proposal>

	/**
	 * Delete a contact type of given commercial proposal
	 * @param	number	id			Id of commercial proposal to update
	 * @param	number	contactid	Row key of the contact in the array contact_ids.
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER).
	 * @return	Promise<Proposal>
	 */
	unlinkContact: (
		id: number,
		contactid: number,
		type: "BILLING" | "SHIPPING" | "CUSTOMER",
		init?: RequestInit
	) => Promise<Proposal>

	/**
	 * Add a contact type of given commercial proposal
	 * @param	number	id			Id of commercial proposal to update
	 * @param	number	contactid	Id of contact to add
	 * @param	string	type		Type of the external contact (BILLING, SHIPPING, CUSTOMER), internal contact (SALESREPFOLL)
	 * @param	string	source		Source of the contact (internal, external) [default external]
	 * @return	Promise<{ success: { code: number; message: string } }>
	 */
	linkContact: (
		id: number,
		contactid: number,
		type: "BILLING" | "SHIPPING" | "CUSTOMER" | "SALESREPFOLL",
		source?: "internal" | "external",
		init?: RequestInit
	) => Promise<{ success: { code: number; message: string } }>

	/**
	 * Add a line to given commercial proposal
	 * @param	number			id		Id of commercial proposal to update
	 * @param	Partial<Line>	data	Commercial proposal line data
	 * @return	Promise<number>
	 */
	addLine: (id: number, data: Partial<Line>, init?: RequestInit) => Promise<number>

	/**
	 * Get lines of a commercial proposal
	 * @param	number	id						Id of commercial proposal
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. d is the alias for proposal lines table, p is the alias for product table. "Syntax example "(p.ref:like:'SO-%') and (d.date_start:<:'20220101')"
	 * @return	Promise<Line[]>
	 */
	getLines: (
		id: number,
		parameters?:
			| {
					sqlfilters: string
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Line[]>

	/**
	 * Add lines to given commercial proposal
	 * @param	number				id		Id of commercial proposal to update
	 * @param	Partial<Line>[]		data	Commercial proposal lines data list
	 * @return	Promise<number>
	 */
	addLines: (id: number, data: Partial<Line>[], init?: RequestInit) => Promise<number>

	/**
	 * Delete a line of given commercial proposal
	 * @param	number	id		Id of commercial proposal to update
	 * @param	number	lineid	Id of line to delete
	 * @return	Promise<number>
	 */
	deleteLine: (id: number, lineid: number, init?: RequestInit) => Promise<number>

	/**
	 * Update a line of given commercial proposal
	 * @param	number			id			Id of commercial proposal to update
	 * @param	number			lineid		Id of line to update
	 * @param	Partial<Line> 	data		Commercial proposal line data
	 * @return	Promise<Proposal>
	 */
	updateLine: (id: number, lineid: number, data: Partial<Line>, init?: RequestInit) => Promise<Proposal>

	/**
	 * Set a commercial proposal billed. Could be also called setbilled
	 * @param	number	id		Commercial proposal ID
	 * @return	Promise<Proposal>
	 */
	setBilled: (id: number) => Promise<Proposal>

	/**
	 * Set a proposal to draft
	 * @param	number	id		Order ID
	 * @return	Promise<Proposal>
	 */
	setToDraft: (id: number, init?: RequestInit) => Promise<Proposal>

	/**
	 * Validate a commercial proposal
	 * @param	number	id				Commercial proposal ID
	 * @param	number	data.notrigger	1=Does not execute triggers, 0= execute triggers
	 * @return	Promise<Proposal>
	 */
	validate: (
		id: number,
		data?: {
			notrigger?: number
		},
		init?: RequestInit
	) => Promise<Proposal>

	/**
	 * Get properties of an proposal object by ref_ext
	 * Return an array with proposal informations
	 * @param	string	ref_ext					External reference of object
	 * @param	number	parameters.contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Proposal>
	 */
	getByRefExt: (
		ref_ext: string,
		parameters?:
			| {
					contact_list?: 0 | 1
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Proposal>

	/**
	 * Get properties of an proposal object by ref
	 * Return an array with proposal informations
	 * @param	string	ref						Ref of object
	 * @param	number	parameters.contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return 	Promise<Proposal>
	 */
	getByRef: (
		ref: string,
		parameters?:
			| {
					contact_list?: 0 | 1
			  }
			| undefined,
		init?: RequestInit
	) => Promise<Proposal>
}
