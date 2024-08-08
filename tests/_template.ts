import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

// Mock the global fetch function to use the fetchMock implementation
global.fetch = fetchMock as jest.Mock

describe("__METHODS_FILE__ Events", () => {
	// Dummy API URL and key for testing purposes
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	// Initialize a new instance of DolibarrApi before each test
	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	// Test case for a specific method in the DolibarrApi class
	it("should call __METHOD__ method and return data", async () => {
		// Call the ping method (or replace with another method as needed)
		const response = await api.ping()

		// Assert that the response matches the expected data
		expect(response).toEqual({ data: "test" })
	})
})
