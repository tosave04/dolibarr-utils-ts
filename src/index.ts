import { DolibarrApi } from "./DolibarrApi.class.js"

const index = async () => {
	console.log("Début de l'appel, une erreur est attendue car l'URL est volontairement incorrecte")

	const api = new DolibarrApi("http://localhost:8080/api/index.php", "dolibarr_api_key")

	api
		.get("ping")
		.then((response) => {
			console.log(response)
		})
		.catch((error) => console.error("Error in ping", error instanceof Error ? error.message : JSON.stringify(error)))
}

index()
