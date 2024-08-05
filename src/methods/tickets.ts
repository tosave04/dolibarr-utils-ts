import { Dolibarr } from "../dolibarr.class"
import type { Ticket } from "../interfaces/Ticket.interface"

export function tickets(this: Dolibarr) {
	const list = this.commonList<TicketsListParameters, Ticket>("tickets")

	const create = this.commonCreate<Ticket>("tickets")

	const deleteObject = this.commonDelete("tickets")

	const getById = this.commonGetById<{}, Ticket>("tickets")

	const update = this.commonUpdate<Ticket>("tickets")

	const newMessage = (data: Partial<Ticket>, init?: RequestInit) => this.post<number>(`tickets/newmessage`, data, init)

	const getByRed = this.commonGetByRef<{}, Ticket>("tickets")

	const getByTrackId = (track_id: string, init?: RequestInit) =>
		this.get<Ticket>(`tickets/track_id/${track_id}`, undefined, init)

	return {
		list,
		create,
		delete: deleteObject,
		getById,
		update,
		newMessage,
		getByRed,
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
