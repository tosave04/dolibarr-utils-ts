import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Contacts", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list contacts", async () => {
		const response = await api.contacts.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a contact", async () => {
		const response = await api.contacts.create({ partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a contact", async () => {
		const response = await api.contacts.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a contact by id", async () => {
		const response = await api.contacts.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a contact", async () => {
		const response = await api.contacts.update(1, { partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get categories for a contact", async () => {
		const response = await api.contacts.getCategories(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should remove a category from a contact", async () => {
		const response = await api.contacts.removeCategory(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a category to a contact", async () => {
		const response = await api.contacts.addCategory(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should create a user from a contact", async () => {
		const response = await api.contacts.createUserFromContact(1, "johndoe", "password")
		expect(response).toEqual({ data: "test" })
	})

	it("should get a contact by email", async () => {
		const response = await api.contacts.getByEmail("john@doe.com")
		expect(response).toEqual({ data: "test" })
	})
})
