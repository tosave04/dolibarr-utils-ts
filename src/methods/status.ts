import { Dolibarr } from "../dolibarr.class"

export function status(this: Dolibarr) {
	/**
	 * Get status of Dolibarr instance
	 * @return	Promise<{ success: { code: 200; dolibarr_version: string; access_locked: string } }>
	 */
	const getStatus = (init?: RequestInit) =>
		this.get<{ success: { code: 200; dolibarr_version: string; access_locked: string } }>(`status`, undefined, init)

	return {
		getStatus,
	}
}
