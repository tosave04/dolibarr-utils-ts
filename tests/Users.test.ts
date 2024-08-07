import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Users", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list users", async () => {
		const response = await api.users.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a user", async () => {
		const response = await api.users.create({ partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a user", async () => {
		const response = await api.users.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a user by id", async () => {
		const response = await api.users.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a user", async () => {
		const response = await api.users.update(1, { partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get groups for a user", async () => {
		const response = await api.users.getGroups(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should link a group to a user", async () => {
		const response = await api.users.linkGroup(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a user by email", async () => {
		const response = await api.users.getByEmail("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should list groups", async () => {
		const response = await api.users.groupsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should get a group", async () => {
		const response = await api.users.getGroup(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get user properties", async () => {
		const response = await api.users.getUserProperties()
		expect(response).toEqual({ data: "test" })
	})

	it("should get a user by login", async () => {
		const response = await api.users.getByLogin("test")
		expect(response).toEqual({ data: "test" })
	})
})
