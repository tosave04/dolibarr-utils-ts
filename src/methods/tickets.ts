import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Ticket } from "../interfaces/Ticket.interface.js"

export function tickets(this: DolibarrApi) {
	/**
	 * List tickets
	 * Get a list of tickets
	 * @param	number	parameters.socid		Filter list with thirdparty ID
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Limit for list
	 * @param	number	parameters.page			Page number
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.ref:like:'SO-%') and (t.date_creation:<:'20160101') and (t.fk_statut:=:1)"
	 * @return	Promise<Ticket[]>				Array of ticket objects
	 */
	const list = this.commonList<TicketsListParameters, Ticket>("tickets")

	/**
	 * Create ticket object
	 * @param	array	Partial<Ticket>		Request datas
	 * @return	Promise<number>				ID of ticket
	 */
	const create = this.commonCreate<Ticket>("tickets")

	/**
	 * Delete ticket
	 * @param	number		id		Ticket ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("tickets")

	/**
	 * Get properties of a Ticket object.
	 * Return an array with ticket informations
	 * @param	number		id		ID of ticket
	 * @return	Promise<Ticket>		Data without useless information
	 */
	const getById = this.commonGetById<{}, Ticket>("tickets")

	/**
	 * Update ticket
	 * @param	number		id					Id of ticket to update
	 * @param	array		Partial<Ticket>		Datas
	 * @return	Promise<number>
	 */
	const update = this.commonUpdate<Ticket>("tickets")

	/**
	 * Create ticket message object
	 * @param	array		Partial<Ticket>		Request datas
	 * @return	Promise<number>					ID of ticket
	 */
	const newMessage = (data: Partial<Ticket>, init?: RequestInit) => this.post<number>(`tickets/newmessage`, data, init)

	/**
	 * Get properties of a Ticket object from ref
	 * Return an array with ticket informations
	 * @param	string		ref		Reference for ticket
	 * @return	Promise<Ticket>		Data without useless information
	 */
	const getByRef = this.commonGetByRef<{}, Ticket>("tickets")

	/**
	 * Get properties of a Ticket object from track id
	 * Return an array with ticket informations
	 * @param	string		track_id	Tracking ID of ticket
	 * @return	Promise<Ticket>			Data without useless information
	 */
	const getByTrackId = (track_id: string, init?: RequestInit) =>
		this.get<Ticket>(`tickets/track_id/${track_id}`, undefined, init)

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		newMessage,
		getByRef,
		getByTrackId,
	}
}

export type TicketsListParameters = {
	socid?: number
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	sqlfilters?: string
}
