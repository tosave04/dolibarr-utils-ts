import { forgeSQLFilters, type SQLFilterObject } from "../../src/utils/miscellaneous/forgeSQLFromFilters"

describe("forgeSQLFromFilters", () => {
	it("should generate custom filter string for basic equality", () => {
		const filters: SQLFilterObject[] = [{ key: "t.status", operator: "=", value: 1 }]
		const result = forgeSQLFilters(filters)
		expect(result).toBe("(t.status:=:1)")
	})

	it("should generate custom filter string for LIKE operator", () => {
		const filters: SQLFilterObject[] = [{ key: "t.ref", operator: "like", value: "SO-%" }]
		const result = forgeSQLFilters(filters)
		expect(result).toBe("(t.ref:like:'SO-%')")
	})

	it("should generate custom filter string for IN operator", () => {
		const filters: SQLFilterObject[] = [{ key: "t.status", operator: "in", value: [1, 2, 3] }]
		const result = forgeSQLFilters(filters)
		expect(result).toBe("(t.status:in:('1','2','3'))")
	})

	it("should generate custom filter string for NULL check", () => {
		const filters: SQLFilterObject[] = [{ key: "t.nature", operator: "is", value: null }]
		const result = forgeSQLFilters(filters)
		expect(result).toBe("(t.nature:is:NULL)")
	})

	it("should generate custom filter string for multiple filters", () => {
		const filters: SQLFilterObject[] = [
			{ key: "t.ref", operator: "like", value: "SO-%" },
			{ key: "t.date_creation", operator: "<", value: "20160101" },
			{ key: "t.status", operator: "in", value: [1, 2, 3] },
		]
		const result = forgeSQLFilters(filters)
		expect(result).toBe("(t.ref:like:'SO-%') and (t.date_creation:<:'20160101') and (t.status:in:('1','2','3'))")
	})

	it("should escape single quotes in string values", () => {
		const filters: SQLFilterObject[] = [{ key: "t.comment", operator: "like", value: "O'Reilly" }]
		const result = forgeSQLFilters(filters)
		expect(result).toBe("(t.comment:like:'O''Reilly')")
	})
})
