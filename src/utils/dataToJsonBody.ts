import { objectToStringRecord } from "./objectToStringRecord.js"

export const dataToJsonBody = (data?: Record<string, any> | Record<string, any>[]) => {
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
