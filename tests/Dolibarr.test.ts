import fetchMock from "./mocks/fetchMock"
import { Dolibarr } from "../src/dolibarr.class"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr REST", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: Dolibarr

	beforeEach(() => {
		api = new Dolibarr(api_url, api_key)
	})

	it("should throw an error if api_url or api_key is not provided", () => {
		expect(() => new Dolibarr("", "")).toThrow("api_url and api_key are required")
	})

	it("should call ping method and return data", async () => {
		const response = await api.ping()
		expect(response).toEqual({ data: "test" })
	})

	it("should call get method and return data", async () => {
		const response = await api.get("ping")
		expect(response).toEqual({ data: "test" })
	})

	it("should call post method and return data", async () => {
		const response = await api.post("ping", { key: "value" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call put method and return data", async () => {
		const response = await api.put("ping", { key: "value" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call create method and return data", async () => {
		const response = await api.create("ping", { key: "value" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call read method and return data", async () => {
		const response = await api.read("ping")
		expect(response).toEqual({ data: "test" })
	})

	it("should call update method and return data", async () => {
		const response = await api.update("ping", { key: "value" })
		expect(response).toEqual({ data: "test" })
	})

	it("should call delete method and return data", async () => {
		const response = await api.delete("ping")
		expect(response).toEqual({ data: "test" })
	})
})
