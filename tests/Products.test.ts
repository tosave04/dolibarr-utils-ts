import fetchMock from "./mocks/fetchMock"
import { DolibarrApi } from "../src/DolibarrApi.class.js"

global.fetch = fetchMock as jest.Mock

describe("Dolibarr Products", () => {
	const api_url = "http://dummy.com/api"
	const api_key = "dummy_key"
	let api: DolibarrApi

	beforeEach(() => {
		api = new DolibarrApi(api_url, api_key)
	})

	it("should list products", async () => {
		const response = await api.products.list()
		expect(response).toEqual({ data: "test" })
	})

	it("should create a product", async () => {
		const response = await api.products.create({ partialData: "John Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a product", async () => {
		const response = await api.products.delete(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get a product by id", async () => {
		const response = await api.products.getById(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a product", async () => {
		const response = await api.products.update(1, { partialData: "Jane Doe" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get categories for a product", async () => {
		const response = await api.products.getCategories(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get purchase prices for a product", async () => {
		const response = await api.products.getPurchasePrices(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a purchase price to a product", async () => {
		const response = await api.products.addPurchasePrice(1, {
			qty: 1,
			buyprice: 1,
			price_base_type: "test",
			fourn_id: 1,
			availability: 1,
			ref_fourn: "test",
			tva_tx: 1,
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should update a purchase price for a product", async () => {
		const response = await api.products.updatePurchasePrice(1, {
			qty: 1,
			buyprice: 1,
			price_base_type: "test",
			fourn_id: 1,
			availability: 1,
			ref_fourn: "test",
			tva_tx: 1,
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a purchase price for a product", async () => {
		const response = await api.products.deletePurchasePrice(1, 1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get prices per customer for a product", async () => {
		const response = await api.products.getPricesPerCustomer(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get prices per quantity for a product", async () => {
		const response = await api.products.getPricesPerQuantity(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get prices per segment for a product", async () => {
		const response = await api.products.getPricesPerSegment(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get stock for a product", async () => {
		const response = await api.products.getStock(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get subproducts for a product", async () => {
		const response = await api.products.getSubproducts(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a subproduct to a product", async () => {
		const response = await api.products.addSubproduct(1, { subproduct_id: 1, qty: 1 })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a subproduct from a product", async () => {
		const response = await api.products.deleteSubproduct(1, 2)
		expect(response).toEqual({ data: "test" })
	})

	it("should get variants for a product", async () => {
		const response = await api.products.getVariants(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add a variant to a product", async () => {
		const response = await api.products.addVariant(1, {
			weight_impact: 1,
			price_impact: 1,
			price_impact_is_percent: false,
			features: {},
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should get attributes for a product", async () => {
		const response = await api.products.getAttributes()
		expect(response).toEqual({ data: "test" })
	})

	it("should add an attribute to a product", async () => {
		const response = await api.products.addAttribute({ ref: "test", label: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should delete an attribute from a product", async () => {
		const response = await api.products.deleteAttribute(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get an attribute for a product", async () => {
		const response = await api.products.getAttribute(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update an attribute for a product", async () => {
		const response = await api.products.updateAttribute(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})

	it("should get attribute values for a product", async () => {
		const response = await api.products.getAttributeValues(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should add an attribute value to a product", async () => {
		const response = await api.products.addAttributeValue(1, "test", "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should delete an attribute value by ref from a product", async () => {
		const response = await api.products.deleteAttributeValueByRef(1, "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an attribute value by ref for a product", async () => {
		const response = await api.products.getAttributeValueByRef(1, "test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an attribute by ref ext for a product", async () => {
		const response = await api.products.getAttributeByRefExt("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should delete an attribute value for a product", async () => {
		const response = await api.products.deleteAttributeValue(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should get values by attribute ref for a product", async () => {
		const response = await api.products.getValuesByAttributeRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an attribute by ref for a product", async () => {
		const response = await api.products.getAttributeByRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get an attribute value for a product", async () => {
		const response = await api.products.getAttributeValue(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update an attribute value for a product", async () => {
		const response = await api.products.updateAttributeValue(1, ["test"])
		expect(response).toEqual({ data: "test" })
	})

	it("should get a product by barcode", async () => {
		const response = await api.products.getByBarcode("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should list purchase prices for a product", async () => {
		const response = await api.products.purchasePricesList({})
		expect(response).toEqual({ data: "test" })
	})

	it("should get a product by ref ext", async () => {
		const response = await api.products.getByRefExt("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get a product by ref", async () => {
		const response = await api.products.getByRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should get variants by product ref", async () => {
		const response = await api.products.variantsByProductRef("test")
		expect(response).toEqual({ data: "test" })
	})

	it("should add a variant by product ref", async () => {
		const response = await api.products.addVariantByProductRef("test", {
			weight_impact: 1,
			price_impact: 1,
			price_impact_is_percent: false,
			features: {},
		})
		expect(response).toEqual({ data: "test" })
	})

	it("should delete a variant", async () => {
		const response = await api.products.deleteVariant(1)
		expect(response).toEqual({ data: "test" })
	})

	it("should update a variant", async () => {
		const response = await api.products.updateVariant(1, { partialData: "test" })
		expect(response).toEqual({ data: "test" })
	})
})
