import { objectToStringRecord } from "./objectToStringRecord.js"

// TODO: check if this is correct

/**
 * Converts a given data object or array of objects into a JSON string, with each object transformed by objectToStringRecord.
 *
 * @param	{Record<string, any> | Record<string, any>[]} [data]	The data to convert, either a single object or an array of objects.
 * @returns	{string | undefined}	A JSON string representation of the data, or undefined if no valid data is provided.
 */
export const dataToJsonBody = (data?: Record<string, any> | Record<string, any>[]): string | undefined => {
	if (!data) return

	if (isNotObject(data)) {
		const arrayData = data as Record<string, any>[]

		if (!arrayData?.length) return

		return JSON.stringify(arrayData.map((item) => objectToStringRecord(item)).filter((item) => !!item))
	}

	const objectData = data as Record<string, any>

	return JSON.stringify(objectToStringRecord(objectData))
}

const isNotObject = (variable: any) => Object.prototype.toString.call(variable) !== "[object Object]"
