import fetchMock from "./mocks/fetchMock"
import { Dolibarr } from "../src/dolibarr.class"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Documents", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: Dolibarr

	beforeEach(() => {
		api = new Dolibarr(api_url, api_key)
	})

	it("should delete a document", async () => {
		const response = await api.documents.delete("test", "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get documents", async () => {
		const response = await api.documents.getDocuments("test", { id: 1 })
		expect(response).toEqual({ data: "test" })
	})

	it("should build a document", async () => {
		const response = await api.documents.build("test", { original_file: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should download a document", async () => {
		const response = await api.documents.download("test", "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should upload a document", async () => {
		const response = await api.documents.upload("test", "test.pdf", { filecontent: "test" })
		expect(response).toEqual({ data: "test" })
	})
})
