import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("External module SavTosave", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	test("should list savs", async () => {
		const response = await api.savtosave.list({ sortfield: "t.rowid", sortorder: "ASC" })
		expect(response).toEqual({ data: "test" })
	})

	test("should ping sav object", async () => {
		const response = await api.savtosave.ping()
		expect(response).toEqual({ data: "test" })
	})

	test("should get properties of a sav object", async () => {
		const response = await api.savtosave.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	test("should update sav", async () => {
		const response = await api.savtosave.update(1, { partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	test("should update ckeckbox 'a_valider'", async () => {
		const response = await api.savtosave.toValidate(1, 1, 1)
		expect(response).toEqual({ data: "test" })
	})

	test("should update checkbox 'info_client'", async () => {
		const response = await api.savtosave.pending(1, 1, 1)
		expect(response).toEqual({ data: "test" })
	})

	test("should update shipping date", async () => {
		const response = await api.savtosave.updateShippingDate(1, "2024-08-31", 1)
		expect(response).toEqual({ data: "test" })
	})

	test("should update shipping method", async () => {
		const response = await api.savtosave.updateShippingMethod(1, 1, 1)
		expect(response).toEqual({ data: "test" })
	})

	test("should get all detailed orders for dashboard", async () => {
		const response = await api.savtosave.getAllForDashboard()
		expect(response).toEqual({ data: "test" })
	})
})
