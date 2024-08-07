import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr StockMovements", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list stock movements", async () => {
		const response = await api.stockmovements.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a stock movement", async () => {
		const response = await api.stockmovements.create({})
		expect(response).toEqual({ data: "test" })
	})
})
