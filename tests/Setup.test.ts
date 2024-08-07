import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Setup", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should check integrity", async () => {
		const response = await api.setup.checkIntegrity("default")
		expect(response).toEqual({ data: "test" })
	})

	it("should get company properties", async () => {
		const response = await api.setup.getCompanyProperties()
		expect(response).toEqual({ data: "test" })
	})

	it("should get setup variable", async () => {
		const response = await api.setup.getSetupVariable("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should list delivery times", async () => {
		const response = await api.setup.deliveryTimesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list civilities", async () => {
		const response = await api.setup.civilitiesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list contacts types", async () => {
		const response = await api.setup.contactsTypesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list countries", async () => {
		const response = await api.setup.countriesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should get country", async () => {
		const response = await api.setup.getCountry(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get country by code", async () => {
		const response = await api.setup.getCountryByCode("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get country by iso", async () => {
		const response = await api.setup.getCountryByIso("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should list currencies", async () => {
		const response = await api.setup.currenciesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list events types", async () => {
		const response = await api.setup.eventsTypesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list expense report types", async () => {
		const response = await api.setup.expenseReportTypesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list legal form business", async () => {
		const response = await api.setup.legalFormBusinessList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list ordering methods", async () => {
		const response = await api.setup.orderingMethodsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list ordering origins", async () => {
		const response = await api.setup.orderingOriginsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list payments terms", async () => {
		const response = await api.setup.paymentsTermsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list payments types", async () => {
		const response = await api.setup.paymentsTypesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list shipping methods", async () => {
		const response = await api.setup.shippingMethodsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list social networks", async () => {
		const response = await api.setup.socialNetworksList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list staff", async () => {
		const response = await api.setup.staffList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list states provinces", async () => {
		const response = await api.setup.statesProvincesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should get state", async () => {
		const response = await api.setup.getState(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get state by code", async () => {
		const response = await api.setup.getStateByCode("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should list tickets categories", async () => {
		const response = await api.setup.ticketsCategoriesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list tickets severity", async () => {
		const response = await api.setup.ticketsSeverityList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list tickets types", async () => {
		const response = await api.setup.ticketsTypesList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list towns", async () => {
		const response = await api.setup.townsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list measuring units", async () => {
		const response = await api.setup.measuringUnitsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list establishments", async () => {
		const response = await api.setup.establishmentsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should get establishment", async () => {
		const response = await api.setup.getEstablishment(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should list extra fields", async () => {
		const response = await api.setup.extraFieldsList()
		expect(response).toEqual({ data: "test" })
	})

	it("should list enabled modules", async () => {
		const response = await api.setup.enabledModulesList()
		expect(response).toEqual({ data: "test" })
	})
})
