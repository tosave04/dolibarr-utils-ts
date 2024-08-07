import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Categories", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should call categories list method and return data", async () => {
		const response = await api.categories.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories create method and return data", async () => {
		const response = await api.categories.create({ data: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories delete method and return data", async () => {
		const response = await api.categories.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories getById method and return data", async () => {
		const response = await api.categories.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories update method and return data", async () => {
		const response = await api.categories.update(1, { data: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories getObjects method and return data", async () => {
		const response = await api.categories.getObjects(1, { type: "member", onlyids: 1 })
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories unlinkObject method and return data", async () => {
		const response = await api.categories.unlinkObject(1, "member", 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories linkObject method and return data", async () => {
		const response = await api.categories.linkObject(1, "member", 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories unlinkObjectByRef method and return data", async () => {
		const response = await api.categories.unlinkObjectByRef(1, "member", "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories linkObjectByRef method and return data", async () => {
		const response = await api.categories.linkObjectByRef(1, "member", "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should call categories listObjects method and return data", async () => {
		const response = await api.categories.listObjectCategories(1, "member")
		expect(response).toEqual({ data: "test" })
	})
})
