import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Orders", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list orders", async () => {
		const response = await api.orders.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create an order", async () => {
		const response = await api.orders.create({ partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete an order", async () => {
		const response = await api.orders.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get an order by id", async () => {
		const response = await api.orders.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update an order", async () => {
		const response = await api.orders.update(1, { partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should close an order", async () => {
		const response = await api.orders.close(1, { status: 2 })
		expect(response).toEqual({ data: "test" })
	})

	it("should unlink a contact from an order", async () => {
		const response = await api.orders.unlinkContact(1, 1, "BILLING")
		expect(response).toEqual({ data: "test" })
	})

	it("should link a contact to an order", async () => {
		const response = await api.orders.linkContact(1, 1, "BILLING")
		expect(response).toEqual({ data: "test" })
	})

	it("should get contacts for an order", async () => {
		const response = await api.orders.getContacts(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get lines for an order", async () => {
		const response = await api.orders.getLines(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a line to an order", async () => {
		const response = await api.orders.addLine(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a line from an order", async () => {
		const response = await api.orders.deleteLine(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a line in an order", async () => {
		const response = await api.orders.updateLine(1, 1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should reopen an order", async () => {
		const response = await api.orders.reOpen(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should set an order as invoiced", async () => {
		const response = await api.orders.setInvoiced(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should set an order as draft", async () => {
		const response = await api.orders.setToDraft(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get shipments for an order", async () => {
		const response = await api.orders.getShipments(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should create a shipment for an order", async () => {
		const response = await api.orders.createShipment(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should validate an order", async () => {
		const response = await api.orders.validate(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should create an order from a proposal", async () => {
		const response = await api.orders.createFromProposal(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get an order by external reference", async () => {
		const response = await api.orders.getByExtRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an order by reference", async () => {
		const response = await api.orders.getByRef("test")
		expect(response).toEqual({ data: "test" })
	})
})
