# @tosave04/dolibarr-utils-ts

Typescript communication tools, Zod schemas, and utilities for the Dolibarr REST API.

## Description

`@tosave04/dolibarr-utils-ts` is a TypeScript library designed to facilitate communication with the Dolibarr REST API. It includes a collection of methods, interfaces, and schemas that simplify the process of interacting with Dolibarr, a popular open-source ERP and CRM system. The library provides a structured way to perform CRUD operations and other common actions on various Dolibarr modules.

## Dolibarr

The module was developed and tested on Dolibarr version `17.0.2`. Further changes to the Dolibarr REST API are not supported at this time.

## Installation

To install the package, use npm:

```bash
npm install @tosave04/dolibarr-utils-ts
```

or

```bash
yarn add @tosave04/dolibarr-utils-ts
```

## Usage

Here's a quick guide on how to use the `@tosave04/dolibarr-utils-ts` module in your project.

### Importing and Instantiating the API

First, you need to import and instantiate the `DolibarrApi` class. You'll need to provide your Dolibarr API URL and API key.

```typescript
import { DolibarrApi } from "@tosave04/dolibarr-utils-ts"

const url = String(process.env.DOLIBARR_API_URL)
const key = String(process.env.DOLIBARR_API_KEY)

const dolibarrApi = new DolibarrApi(url, key)
```

### Example Usage

#### Ping the API

Check the API status using the `ping` method:

```typescript
dolibarrApi
	.ping()
	.then((response) => {
		console.log("API Status:", response)
	})
	.catch((error) => {
		console.error("Error:", error)
	})
```

#### List Proposals

Retrieve a list of proposals with optional sorting:

```typescript
dolibarrApi.proposals
	.list({ sortfield: "t.rowid", sortorder: "ASC" })
	.then((proposals) => {
		console.log("Proposals:", proposals)
	})
	.catch((error) => {
		console.error("Error:", error)
	})
```

#### Create a New Product

Create a new product in Dolibarr:

```typescript
const newProduct = {
	label: "New Product",
	price: 100,
	// Other product fields...
}

dolibarrApi.products
	.create(newProduct)
	.then((productId) => {
		console.log("Created Product ID:", productId)
	})
	.catch((error) => {
		console.error("Error:", error)
	})
```

#### Update an Existing Product

Update an existing product by its ID:

```typescript
const updatedProduct = {
	label: "Updated Product",
	price: 150,
	// Other product fields...
}

dolibarrApi.products
	.update(1, updatedProduct)
	.then((response) => {
		console.log("Update Response:", response)
	})
	.catch((error) => {
		console.error("Error:", error)
	})
```

#### Delete a Product

Delete a product by its ID:

```typescript
dolibarrApi.products
	.delete(1)
	.then((response) => {
		console.log("Delete Response:", response)
	})
	.catch((error) => {
		console.error("Error:", error)
	})
```

## Modules

The `DolibarrApi` class provides methods for various Dolibarr modules, including:

- `agendaevents`
- `bankaccounts`
- `categories`
- `contacts`
- `documents`
- `invoices`
- `login`
- `orders`
- `products`
- `proposals`
- `setup`
- `shipments`
- `status`
- `stockmovements`
- `thirdparties`
- `tickets`
- `users`
- `warehouses`

Each module includes methods for listing, creating, updating, and deleting resources.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the GPL-3.0 License.

---

Feel free to adjust the README file to better match the specifics of your package and any additional information you want to provide.
