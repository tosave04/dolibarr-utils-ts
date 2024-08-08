/**
 * Converts all values in an object to strings.
 *
 * @param	{Record<string, unknown>} [obj]	The object to transform.
 * @returns	{Record<string, string> | undefined}	A new object with all values as strings, or undefined if no object is provided.
 */
export const objectToStringRecord = (obj?: Record<string, unknown>): Record<string, string> | undefined => {
	if (!obj) return

	const result: Record<string, string> = {}
	for (const key in obj) {
		result[key] = String(obj[key])
	}
	return result
}
