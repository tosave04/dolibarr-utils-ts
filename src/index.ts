import { Dolibarr } from "./dolibarr.class"

const api = new Dolibarr("http://localhost:8080/api/index.php", "dolibarr_api_key")

api.get("ping").then(console.log)

api.proposals.list().then(console.log)
