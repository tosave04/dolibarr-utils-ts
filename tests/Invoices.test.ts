import fetchMock from "./mocks/fetchMock"
import { Dolibarr } from "../src/dolibarr.class"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Invoices", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: Dolibarr

	beforeEach(() => {
		api = new Dolibarr(api_url, api_key)
	})

	it("should list invoices", async () => {
		const response = await api.invoices.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create an invoice", async () => {
		const response = await api.invoices.create({ ref: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete an invoice", async () => {
		const response = await api.invoices.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get an invoice by id", async () => {
		const response = await api.invoices.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update an invoice", async () => {
		const response = await api.invoices.update(1, { ref: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should unlink a contact from an invoice", async () => {
		const response = await api.invoices.unlinkContact(1, 1, "BILLING")
		expect(response).toEqual({ data: "test" })
	})

	it("should link a contact to an invoice", async () => {
		const response = await api.invoices.linkContact(1, 1, "BILLING")
		expect(response).toEqual({ data: "test" })
	})

	it("should add a contact to an invoice", async () => {
		const response = await api.invoices.addContactToInvoice(1, {
			fk_socpeople: 1,
			type_contact: "test",
			source: "test",
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should get the discount of an invoice", async () => {
		const response = await api.invoices.getDiscount(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get the lines of an invoice", async () => {
		const response = await api.invoices.getLines(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a line to an invoice", async () => {
		const response = await api.invoices.addLine(1, { label: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a line from an invoice", async () => {
		const response = await api.invoices.deleteLine(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a line from an invoice", async () => {
		const response = await api.invoices.updateLine(1, 1, { label: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should create a discount for an invoice", async () => {
		const response = await api.invoices.createDiscount(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get the payments of an invoice", async () => {
		const response = await api.invoices.getPayments(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a payment to an invoice", async () => {
		const response = await api.invoices.addPayment(1, {
			datepaye: "test",
			paymentid: 1,
			closepaidinvoices: "yes",
			accountid: 1,
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should set an invoice to draft", async () => {
		const response = await api.invoices.setToDraft(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should set an invoice to paid", async () => {
		const response = await api.invoices.setToPaid(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should set an invoice to unpaid", async () => {
		const response = await api.invoices.setToUnpaid(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a credit note to an invoice", async () => {
		const response = await api.invoices.addCreditNote(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a discount to an invoice", async () => {
		const response = await api.invoices.addDiscount(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should validate an invoice", async () => {
		const response = await api.invoices.validate(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should create an invoice from an order", async () => {
		const response = await api.invoices.createFromOrder(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a payment", async () => {
		const response = await api.invoices.updatePayment(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a distributed payment to an invoice", async () => {
		const response = await api.invoices.addDistributedPayment({
			arrayofamounts: [{ amount: "test", multicurrency_amount: "test" }],
			datepaye: "test",
			paymentid: 1,
			closepaidinvoices: "yes",
			accountid: 1,
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should get an invoice by external reference", async () => {
		const response = await api.invoices.getByRefExt("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an invoice by reference", async () => {
		const response = await api.invoices.getByRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an invoice template", async () => {
		const response = await api.invoices.getTemplate(1)
		expect(response).toEqual({ data: "test" })
	})
})
