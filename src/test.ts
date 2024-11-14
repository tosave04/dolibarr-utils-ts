import { customerResearch, DolibarrApi } from "./index.js"

export const test = async () => {
	console.log("Starting call, errors are expected because the URL is intentionally incorrect :")

	const api = new DolibarrApi("dolibarr_api_url", "dolibarr_api_key")

	api
		.get("ping")
		.then((response) => {
			console.log(response)
		})
		.catch((error) =>
			console.warn(
				"Error in ping (this is what we want !)",
				error instanceof Error ? error.message : JSON.stringify(error)
			)
		)

	customerResearch({ search: "test" }).catch((error) =>
		console.warn(
			"Error in customerResearch (this is what we want !)",
			error instanceof Error ? error.message : JSON.stringify(error)
		)
	)
}

test()
