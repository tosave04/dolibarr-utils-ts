import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Warehouses", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list warehouses", async () => {
		const response = await api.warehouses.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a warehouse", async () => {
		const response = await api.warehouses.create({ partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a warehouse", async () => {
		const response = await api.warehouses.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a warehouse by id", async () => {
		const response = await api.warehouses.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a warehouse", async () => {
		const response = await api.warehouses.update(1, { partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})
})
