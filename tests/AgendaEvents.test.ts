import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Agenda Events", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list agenda events", async () => {
		const response = await api.agendaevents.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create an agenda event", async () => {
		const response = await api.agendaevents.create({ partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete an agenda event", async () => {
		const response = await api.agendaevents.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get an agenda event by id", async () => {
		const response = await api.agendaevents.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update an agenda event", async () => {
		const response = await api.agendaevents.update(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})
})
