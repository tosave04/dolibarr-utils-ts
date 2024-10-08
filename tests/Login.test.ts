import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Invoices", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should login with get", async () => {
		const response = await api.login.get("test", "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should login with post", async () => {
		const response = await api.login.post("test", "test")
		expect(response).toEqual({ data: "test" })
	})
})
