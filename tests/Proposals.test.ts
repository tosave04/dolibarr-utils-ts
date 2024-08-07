import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Proposals", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should call proposals list method and return data", async () => {
		const response = await api.proposals.list({ sortfield: "t.rowid", sortorder: "ASC" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals create method and return data", async () => {
		const response = await api.proposals.create({ partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals delete method and return data", async () => {
		const response = await api.proposals.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals getById method and return data", async () => {
		const response = await api.proposals.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals update method and return data", async () => {
		const response = await api.proposals.update(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals close method and return data", async () => {
		const response = await api.proposals.close(1, { status: 2 })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals deleteContact method and return data", async () => {
		const response = await api.proposals.unlinkContact(1, 1, "BILLING")
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals addContact method and return data", async () => {
		const response = await api.proposals.linkContact(1, 1, "BILLING")
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals getLines method and return data", async () => {
		const response = await api.proposals.getLines(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals addLine method and return data", async () => {
		const response = await api.proposals.addLine(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals addLines method and return data", async () => {
		const response = await api.proposals.addLines(1, [{ partialData: "test" }])
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals deleteLine method and return data", async () => {
		const response = await api.proposals.deleteLine(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals updateLine method and return data", async () => {
		const response = await api.proposals.updateLine(1, 1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals setBilled method and return data", async () => {
		const response = await api.proposals.setBilled(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals setToDraft method and return data", async () => {
		const response = await api.proposals.setToDraft(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals validate method and return data", async () => {
		const response = await api.proposals.validate(1, { notrigger: 1 })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals getByRefExt method and return data", async () => {
		const response = await api.proposals.getByRefExt("test", { contact_list: 1 })
		expect(response).toEqual({ data: "test" })
	})

	it("should call proposals getByRef method and return data", async () => {
		const response = await api.proposals.getByRef("test", { contact_list: 1 })
		expect(response).toEqual({ data: "test" })
	})
})
