import { Dolibarr } from "../dolibarr.class"

type Event = Record<string, unknown>

export function agendaevents(this: Dolibarr) {
	/**
	 * List Agenda Events
	 * @param	string	sortfield	Sort field
	 * @param	string	sortorder	Sort order
	 * @param	number	limit		Limit for list
	 * @param	number	page		Page number
	 * @param	string	user_ids	User ids filter field (owners of event). Example: '1' or '1,2,3'          {@pattern /^[0-9,]*$/i}
	 * @param	string	sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.label:like:'%dol%') and (t.datec:<:'20160101')"
	 * @return	Promise<Event[]>	Array of Agenda Events objects
	 */
	const list = this.commonList<EventListParameters, Event>("agendaevents")

	/**
	 * Create Agenda Event object
	 * @param	array	request_data	Request data
	 * @return	Promise<number>			ID of Agenda Event
	 */
	const create = this.commonCreate<Event>("agendaevents")

	/**
	 * Delete Agenda Event
	 * @param	number	id		Agenda Event ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	const deleteObject = this.commonDelete("agendaevents")

	/**
	 * Get properties of a Agenda Events object
	 * Return an array with Agenda Events informations
	 * @param	number			id		ID of Agenda Events
	 * @return	Promise<Event>	Data 	without useless information
	 */
	const getById = this.commonGetById<{}, Event>("agendaevents")

	/**
	 * Update Agenda Event general fields
	 * @param	number			id				Id of Agenda Event to update
	 * @param	Partial<Event>	request_data	Datas
	 * @return Promise<number>
	 */
	const update = this.commonUpdate<Event>("agendaevents")

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
	}
}

export type EventListParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	user_ids?: string
	sqlfilters?: string
}
