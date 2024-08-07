import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr BankAccounts", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list bank accounts", async () => {
		const response = await api.bankaccounts.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a bank account", async () => {
		const response = await api.bankaccounts.create({ partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a bank account", async () => {
		const response = await api.bankaccounts.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a bank account by id", async () => {
		const response = await api.bankaccounts.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a bank account", async () => {
		const response = await api.bankaccounts.update(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get lines for a bank account", async () => {
		const response = await api.bankaccounts.getLines(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a line to a bank account", async () => {
		const response = await api.bankaccounts.addLine(1, { date: "test", type: "VIR", label: "test", amount: 1 })
		expect(response).toEqual({ data: "test" })
	})

	it("should link a line to a bank account", async () => {
		const response = await api.bankaccounts.linkLine(1, 1, { url_id: 1, url: "test", label: "test", type: "payment" })
		expect(response).toEqual({ data: "test" })
	})

	it("should transfer a line to a bank account", async () => {
		const response = await api.bankaccounts.transfert({
			bankaccount_from_id: 1,
			bankaccount_to_id: 1,
			date: "test",
			description: "test",
			amount: 1,
		})
		expect(response).toEqual({ data: "test" })
	})
})
