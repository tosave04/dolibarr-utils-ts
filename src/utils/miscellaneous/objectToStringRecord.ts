export const objectToStringRecord = (obj?: Record<string, unknown>) => {
	if (!obj) return

	const result: Record<string, string> = {}
	for (const key in obj) {
		result[key] = String(obj[key])
	}
	return result
}
