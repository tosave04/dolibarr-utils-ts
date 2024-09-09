import { DolibarrApi } from "../DolibarrApi.class.js"

export function status(this: DolibarrApi): ReturnType<typeof statusTypes> {
	const getStatus = (init?: RequestInit) =>
		this.get<{ success: { code: 200; dolibarr_version: string; access_locked: string } }>(`status`, undefined, init)

	return {
		getStatus,
	}
}

export declare function statusTypes(this: DolibarrApi): {
	/**
	 * Get status of DolibarrApi instance
	 * @return	Promise<{ success: { code: 200; dolibarr_version: string; access_locked: string } }>
	 */
	getStatus: (init?: RequestInit) => Promise<{
		success: {
			code: 200
			dolibarr_version: string
			access_locked: string
		}
	}>
}
