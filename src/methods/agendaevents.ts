import { Dolibarr } from "../dolibarr.class"

type Event = Record<string, unknown>

export function agendaevents(this: Dolibarr) {
	const list = this.commonList<EventListParameters, Event>("agendaevents")

	const create = this.commonCreate<Event>("agendaevents")

	const deleteObject = this.commonDelete("agendaevents")

	const getById = this.commonGetById<{}, Event>("agendaevents")

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
