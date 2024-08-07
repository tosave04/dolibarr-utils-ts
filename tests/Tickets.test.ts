import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Tickets", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list tickets", async () => {
		const response = await api.tickets.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a ticket", async () => {
		const response = await api.tickets.create({ partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a ticket", async () => {
		const response = await api.tickets.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a ticket by id", async () => {
		const response = await api.tickets.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a ticket", async () => {
		const response = await api.tickets.update(1, { partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should create a new message for a ticket", async () => {
		const response = await api.tickets.newMessage({ partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get a ticket by ref", async () => {
		const response = await api.tickets.getByRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get a ticket by track id", async () => {
		const response = await api.tickets.getByTrackId("test")
		expect(response).toEqual({ data: "test" })
	})
})
