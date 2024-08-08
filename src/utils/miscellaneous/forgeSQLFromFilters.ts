/**
 * Converts an array of filter objects into a MySQL WHERE clause string.
 *
 * @param	{Filter[]}	filters	    The list of filters to convert.
 * @returns	{string}			    The resulting SQL WHERE clause string.
 * 
 * @example
const filters: SQLFilterObject[] = [
	{ key: "t.ref", operator: "like", value: "SO-%" },
	{ key: "t.date_creation", operator: "<", value: "20240831" },
	{ key: "t.status", operator: "in", value: [1, 2, 3] },
]
const sqlfilters = forgeSQLFilters(filters);
console.log(sqlfilters);
// Output: "(t.ref:like:'SO-%') and (t.date_creation:<:'20240831') and (t.status:in:('1','2','3'))"
 */
export const forgeSQLFilters = (filters: SQLFilterObject[]): string => {
	return filters
		.map(({ key, operator, value }) => {
			let sqlValue: string

			if (value === null) {
				sqlValue = "NULL"
			} else if (Array.isArray(value)) {
				sqlValue = `(${value.map((v) => `'${v}'`).join(",")})`
			} else if (typeof value === "string") {
				sqlValue = `'${value.replace(/'/g, "''")}'` // Escape single quotes
			} else {
				sqlValue = String(value)
			}

			// Normalize operators to expected format
			let normalizedOperator = operator as string
			if (operator === "not like") normalizedOperator = "notlike"
			if (operator === "is not") normalizedOperator = "isnot"
			if (operator === "!=") normalizedOperator = "<>"
			if (operator === "not in") normalizedOperator = "notin"

			return `(${key}:${normalizedOperator}:${sqlValue})`
		})
		.join(" and ")
}

export interface SQLFilterObject {
	key: string
	operator: "=" | "<" | ">" | "<=" | ">=" | "!=" | "in" | "not in" | "like" | "not like" | "is" | "is not"
	value: string | number | boolean | null | (string | number | boolean)[]
}
