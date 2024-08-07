import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Thirdparties", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list thirdparties", async () => {
		const response = await api.thirdparties.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a thirdparty", async () => {
		const response = await api.thirdparties.create({ partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a thirdparty", async () => {
		const response = await api.thirdparties.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a thirdparty by id", async () => {
		const response = await api.thirdparties.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a thirdparty", async () => {
		const response = await api.thirdparties.update(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get bank account for a thirdparty", async () => {
		const response = await api.thirdparties.getBankAccount(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should create a bank account for a thirdparty", async () => {
		const response = await api.thirdparties.createBankAccount(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a bank account for a thirdparty", async () => {
		const response = await api.thirdparties.deleteBankAccount(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a bank account for a thirdparty", async () => {
		const response = await api.thirdparties.updateBankAccount(1, 1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get customer categories for a thirdparty", async () => {
		const response = await api.thirdparties.getCustomerCategories(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should unlink a customer category from a thirdparty", async () => {
		const response = await api.thirdparties.unlinkCustomerCategory(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should link a customer category to a thirdparty", async () => {
		const response = await api.thirdparties.linkCustomerCategory(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get fixed amount discounts for a thirdparty", async () => {
		const response = await api.thirdparties.getFixedAmountDiscounts(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should delete gateways for a thirdparty", async () => {
		const response = await api.thirdparties.deleteGateways(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a specific gateway for a thirdparty", async () => {
		const response = await api.thirdparties.getSpecificGateway(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a new gateway to a thirdparty", async () => {
		const response = await api.thirdparties.addNewGateway(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a specific gateway from a thirdparty", async () => {
		const response = await api.thirdparties.deleteSpecificGateway(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a specific gateway to a thirdparty", async () => {
		const response = await api.thirdparties.addSpecificGateway(1, 1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should update a specific gateway for a thirdparty", async () => {
		const response = await api.thirdparties.updateSpecificGateway(1, 1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should generate a bank account document for a thirdparty", async () => {
		const response = await api.thirdparties.generateBankAccountDocument(1, 1, "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get invoices qualified for credit note for a thirdparty", async () => {
		const response = await api.thirdparties.getInvoicesQualifiedForCreditNote(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get invoices qualified for replacement for a thirdparty", async () => {
		const response = await api.thirdparties.getInvoicesQualifiedForReplacement(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should merge thirdparties", async () => {
		const response = await api.thirdparties.merge(1, 2)
		expect(response).toEqual({ data: "test" })
	})

	it("should get outstanding invoices for a thirdparty", async () => {
		const response = await api.thirdparties.getOustandingInvoices(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get outstanding orders for a thirdparty", async () => {
		const response = await api.thirdparties.getOustandingOrders(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get outstanding proposals for a thirdparty", async () => {
		const response = await api.thirdparties.getOustandingProposals(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get representatives for a thirdparty", async () => {
		const response = await api.thirdparties.getRepresentatives(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should set price level for a thirdparty", async () => {
		const response = await api.thirdparties.setPriceLevel(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get supplier categories for a thirdparty", async () => {
		const response = await api.thirdparties.getSupplierCategories(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should unlink a supplier category from a thirdparty", async () => {
		const response = await api.thirdparties.unlinkSupplierCategory(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should link a supplier category to a thirdparty", async () => {
		const response = await api.thirdparties.linkSupplierCategory(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a thirdparty by barcode", async () => {
		const response = await api.thirdparties.getByBarcode("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get a thirdparty by email", async () => {
		const response = await api.thirdparties.getByEmail("test")
		expect(response).toEqual({ data: "test" })
	})
})
