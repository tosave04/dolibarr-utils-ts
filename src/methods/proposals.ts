import { Dolibarr } from "../dolibarr.class"
import type { Proposal } from "../interfaces/Proposal.interfaces"
import type { Line } from "../interfaces/Line.interfaces"

export function proposals(this: Dolibarr) {
	/**
	 * List commercial proposals
	 * @param	string			parameters.sortfield		Sort field
	 * @param	string			parameters.sortorder		Sort order
	 * @param	number			parameters.limit			Limit for list
	 * @param	number			parameters.page				Page number
	 * @param	string			parameters.thirdparty_ids	Thirdparty ids to filter commercial proposals (example '1' or '1,2,3') {@pattern /^[0-9,]*$/i}
	 * @param	string			parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.datec:<:'20160101')"
	 * @param	RequestCache	cache						Cache configuration
	 * @return	Promise<Proposal[]>							List of commercial proposals
	 */
	const list = this.commonList<ProposalsListParameters, Proposal>("proposals")

	/**
	 * Create commercial proposal object
	 * @param	Partial<Proposal>	data	Request data
	 * @return	Promise<number>				ID of proposal
	 */
	const create = this.commonCreate<Proposal>("proposals")

	/**
	 * Delete commercial proposal
	 * @param	number	id		Commercial proposal ID
	 * @return	Promise<{ success: { code: number; message: string } }>
	 */
	const deleteObject = this.commonDelete("proposals")

	/**
	 * Get properties of a commercial proposal object
	 * Return an array with commercial proposal informations
	 * @param	number	id						ID of commercial proposal
	 * @param	number	parameters.contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Proposal>
	 */
	const getById = this.commonGetById<{ contact_list?: 0 | 1 }, Proposal>("proposals")

	/**
	 * Update commercial proposal general fields (won't touch lines of commercial proposal)
	 * @param	number				id		Id of commercial proposal to update
	 * @param	Partial<Proposal>	data	Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<Proposal>("proposals")

	/**
	 * Close (Accept or refuse) a quote / commercial proposal
	 * @param	number	id					Commercial proposal ID
	 * @param	number	data.status			Must be 2 (accepted) or 3 (refused)	{@min 2}{@max 3}
	 * @param	string	data.note_private	Add this mention at end of private note
	 * @param	number	data.notrigger		Disabled triggers
	 * @return	Promise<Proposal>
	 */
	const close = this.commonClose<Proposal>("proposals")

	/**
	 * Delete a contact type of given commercial proposal
	 * @param	number	id			Id of commercial proposal to update
	 * @param	number	contactid	Row key of the contact in the array contact_ids.
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER).
	 * @return	Promise<number>
	 */
	const unlinkContact = this.commonUnlinkContact("proposals")

	/**
	 * Add a contact type of given commercial proposal
	 * @param	number	id			Id of commercial proposal to update
	 * @param	number	contactid	Id of contact to add
	 * @param	string	type		Type of the contact (BILLING, SHIPPING, CUSTOMER)
	 * @return	Promise<number>
	 */
	const linkContact = this.commomLinkContact("proposals")

	/**
	 * Add a line to given commercial proposal
	 * @param	number			id		Id of commercial proposal to update
	 * @param	Partial<Line>	data	Commercial proposal line data
	 * @return	Promise<number>
	 */
	const addLine = this.commonAddLine("proposals")

	/**
	 * Get lines of a commercial proposal
	 * @param	number	id						Id of commercial proposal
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. d is the alias for proposal lines table, p is the alias for product table. "Syntax example "(p.ref:like:'SO-%') and (d.date_start:<:'20220101')"
	 * @return	Promise<Line[]>
	 */
	const getLines = this.commonGetLines<{ sqlfilters: string }>("proposals")

	/**
	 * Add lines to given commercial proposal
	 * @param	number				id		Id of commercial proposal to update
	 * @param	Partial<Line>[]		data	Commercial proposal lines data list
	 * @return	Promise<number>
	 */
	const addLines = this.commonAddLines("proposals")

	/**
	 * Delete a line of given commercial proposal
	 * @param	number	id		Id of commercial proposal to update
	 * @param	number	lineid	Id of line to delete
	 * @return	Promise<number>
	 */
	const deleteLine = this.commonDeleteLine("proposals")

	/**
	 * Update a line of given commercial proposal
	 * @param	number			id			Id of commercial proposal to update
	 * @param	number			lineid		Id of line to update
	 * @param	Partial<Line> 	data		Commercial proposal line data
	 * @return	Promise<Proposal>
	 */
	const updateLine = this.commonUpdateLine<Proposal>("proposals")

	/**
	 * Set a commercial proposal billed. Could be also called setbilled
	 * @param	number	id		Commercial proposal ID
	 * @return	Promise<Proposal>
	 */
	const setBilled = (id: number) => this.post<Proposal>(`proposals/${id}/setinvoiced`)

	/**
	 * Set a proposal to draft
	 * @param	number	id		Order ID
	 * @return	Promise<Proposal>
	 */
	const setToDraft = this.commonSetToDraft<Proposal>("proposals")

	/**
	 * Validate a commercial proposal
	 * @param	number	id				Commercial proposal ID
	 * @param	number	data.notrigger	1=Does not execute triggers, 0= execute triggers
	 * @return	Promise<Proposal>
	 */
	const validate = this.commonValidate<Proposal>("proposals")

	/**
	 * Get properties of an proposal object by ref_ext
	 * Return an array with proposal informations
	 * @param	string	ref_ext					External reference of object
	 * @param	number	parameters.contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return	Promise<Proposal>
	 */
	const getByRefExt = this.commonGetByRefExt<{ contact_list?: 0 | 1 }, Proposal>("proposals")

	/**
	 * Get properties of an proposal object by ref
	 * Return an array with proposal informations
	 * @param	string	ref						Ref of object
	 * @param	number	parameters.contact_list	0: Returned array of contacts/addresses contains all properties, 1: Return array contains just id
	 * @return 	Promise<Proposal>
	 */
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
}
