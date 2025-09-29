import { DolibarrApi } from "../DolibarrApi.class.js"
import type { AgendaEvent } from "../interfaces/AgendaEvent.interface.js"

export function agendaevents(this: DolibarrApi): ReturnType<typeof agendaeventsTypes> {
	const list = this.commonList<EventListParameters, AgendaEvent>("agendaevents")

	const create = this.commonCreate<AgendaEvent>("agendaevents")

	const deleteObject = this.commonDelete("agendaevents")

	const getById = this.commonGetById<{}, AgendaEvent>("agendaevents")

	const update = this.commonUpdate<AgendaEvent>("agendaevents")

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
	properties?: string
}

export declare function agendaeventsTypes(this: DolibarrApi): {
	/**
	 * List Agenda Events
	 * @param	string	sortfield	Sort field
	 * @param	string	sortorder	Sort order
	 * @param	number	limit		Limit for list
	 * @param	number	page		Page number
	 * @param	string	user_ids	User ids filter field (owners of event). Example: '1' or '1,2,3'          {@pattern /^[0-9,]*$/i}
	 * @param	string	sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.label:like:'%dol%') and (t.datec:<:'20160101')"
	 * @param	string	properties	Restrict the data returned to these properties. Ignored if empty. Comma separated list of properties names
	 * @return	Promise<AgendaEvent[]>	Array of Agenda Events objects
	 */
	list: (parameters?: EventListParameters | undefined, init?: RequestInit) => Promise<AgendaEvent[]>

	/**
	 * Create Agenda Event object
	 * @param	array	request_data	Request data
	 * @return	Promise<number>			ID of Agenda Event
	 */
	create: (data: Partial<AgendaEvent>, init?: RequestInit) => Promise<number>

	/**
	 * Delete Agenda Event
	 * @param	number	id		Agenda Event ID
	 * @return	Promise<{success: {code: number; message: string}}>
	 */
	delete: (id: number, init?: RequestInit) => Promise<{ success: { code: number; message: string } }>

	/**
	 * Get properties of a Agenda Events object
	 * Return an array with Agenda Events informations
	 * @param	number			id		ID of Agenda Events
	 * @return	Promise<AgendaEvent>	Data 	without useless information
	 */
	getById: (id: number, parameters?: {} | undefined, init?: RequestInit) => Promise<AgendaEvent>

	/**
	 * Update Agenda Event general fields
	 * @param	number			id				Id of Agenda Event to update
	 * @param	Partial<AgendaEvent>	request_data	Datas
	 * @return Promise<AgendaEvent>
	 */
	update: (id: number, data: Partial<AgendaEvent>, init?: RequestInit) => Promise<AgendaEvent>
}
