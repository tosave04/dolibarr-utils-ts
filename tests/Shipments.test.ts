import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Shipments", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list shipments", async () => {
		const response = await api.shipments.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a shipment", async () => {
		const response = await api.shipments.create({ partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a shipment", async () => {
		const response = await api.shipments.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a shipment by id", async () => {
		const response = await api.shipments.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a shipment", async () => {
		const response = await api.shipments.update(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should close a shipment", async () => {
		const response = await api.shipments.close(1, { status: 2 })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a line from a shipment", async () => {
		const response = await api.shipments.deleteLine(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should validate a shipment", async () => {
		const response = await api.shipments.validate(1)
		expect(response).toEqual({ data: "test" })
	})
})
