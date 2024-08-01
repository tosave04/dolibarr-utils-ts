import { Dolibarr } from "../dolibarr.class"

export function status(this: Dolibarr) {
	const getStatus = (init?: RequestInit) =>
		this.get<{ success: { code: 200; dolibarr_version: string; access_locked: string } }>(`status`, undefined, init)

	return {
		getStatus,
	}
}
