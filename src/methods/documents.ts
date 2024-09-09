import { DolibarrApi } from "../DolibarrApi.class.js"
import type { Document } from "../interfaces/Document.interfaces.js"
import type { DocumentContent } from "../interfaces/DocumentContent.interfaces.js"

export function documents(this: DolibarrApi): ReturnType<typeof documentsTypes> {
	const deleteObject = (modulepart: string, original_file: string, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`documents`, { modulepart, original_file }, init)

	const getDocuments = (
		modulepart: GetDocumentsModulepart | string,
		parameters?: { id?: number; ref?: string; sortfield?: string; sortorder?: "ASC" | "DESC" },
		init?: RequestInit
	) => this.get<Document[]>(`documents`, { ...parameters, modulepart }, init)

	const build = (
		modulepart: BuildModulepart | string,
		data: { original_file?: string; doctemplate?: string; langcode?: string },
		init?: RequestInit
	) => this.put<Document>(`documents/builddoc`, { ...data, modulepart }, init)

	const download = (modulepart: string, original_file: string, init?: RequestInit) =>
		this.get<DocumentContent>(`documents/download`, { modulepart, original_file }, init)

	const upload = (
		filename: string,
		modulepart: UploadModulepart | string,
		data: {
			ref?: string
			subdir?: string
			filecontent?: string
			fileencoding?: string
			overwriteifexists?: number
			createdirifnotexists?: number
		},
		init?: RequestInit
	) => this.post<string>(`documents/upload`, { ...data, filename, modulepart }, init)

	return {
		delete: deleteObject,
		getDocuments,
		build,
		download,
		upload,
	}
}

type GetDocumentsModulepart =
	| "societe"
	| "thirdparty"
	| "user"
	| "adherent"
	| "member"
	| "propal"
	| "proposal"
	| "supplier_proposal"
	| "commande"
	| "order"
	| "commande_fournisseur"
	| "supplier_order"
	| "shipment"
	| "expedition"
	| "facture"
	| "invoice"
	| "facture_fournisseur"
	| "supplier_invoice"
	| "produit"
	| "product"
	| "agenda"
	| "action"
	| "event"
	| "expensereport"
	| "knowledgemanagement"
	| "categorie"
	| "category"

type BuildModulepart = "facture" | "invoice" | "commande" | "order" | "propal" | "proposal"

type UploadModulepart =
	| "facture"
	| "invoice"
	| "facture_fournisseur"
	| "supplier_invoice"
	| "commande"
	| "order"
	| "commande_fournisseur"
	| "supplier_order"
	| "project"
	| "task"
	| "project_task"
	| "product"
	| "produit"
	| "service"
	| "produit|service"
	| "expensereport"
	| "fichinter"
	| "adherent"
	| "member"
	| "proposal"
	| "propal"
	| "propale"

export declare function documentsTypes(this: DolibarrApi): {
	/**
	 * Delete a document.
	 * @param	string	modulepart		Name of module or area concerned by file download ('product', ...)
	 * @param	string	original_file	Relative path with filename, relative to modulepart (for example: PRODUCT-REF-999/IMAGE-999.jpg)
	 * @return	Promise<{ success: { code: number; message: string } }>
	 */
	delete: (
		modulepart: string,
		original_file: string,
		init?: RequestInit
	) => Promise<{
		success: {
			code: number
			message: string
		}
	}>

	/**
	 * Return the list of documents of a dedicated element (from its ID or Ref)
	 * @param	string	modulepart				Name of module or area concerned ('thirdparty', 'member', 'proposal', 'order', 'invoice', 'supplier_invoice', 'shipment', 'project',  ...)
	 * @param	number	parameters.id			ID of element
	 * @param	string	parameters.ref			Ref of element
	 * @param	string	parameters.sortfield	Sort criteria ('','fullname','relativename','name','date','size')
	 * @param	string	parameters.sortorder	Sort order ('asc' or 'desc')
	 * @return	Promise<Document[]>				Array of documents with path
	 */
	getDocuments: (
		modulepart: GetDocumentsModulepart | string,
		parameters?: {
			id?: number
			ref?: string
			sortfield?: string
			sortorder?: "ASC" | "DESC"
		},
		init?: RequestInit
	) => Promise<Document[]>

	/**
	 * Build a document.
	 * Test sample 1: { "modulepart": "invoice", "original_file": "FA1701-001/FA1701-001.pdf", "doctemplate": "crabe", "langcode": "fr_FR" }.
	 * @param	string	modulepart			Name of module or area concerned by file download ('thirdparty', 'member', 'proposal', 'supplier_proposal', 'order', 'supplier_order', 'invoice', 'supplier_invoice', 'shipment', 'project',  ...)
	 * @param	string	data.original_file	Relative path with filename, relative to modulepart (for example: IN201701-999/IN201701-999.pdf).
	 * @param	string	data.doctemplate	Set here the doc template to use for document generation (If not set, use the default template).
	 * @param	string	data.langcode		Language code like 'en_US', 'fr_FR', 'es_ES', ... (If not set, use the default language).
	 * @return	Promise<Document>			List of documents
	 */
	build: (
		modulepart: BuildModulepart | string,
		data: {
			original_file?: string
			doctemplate?: string
			langcode?: string
		},
		init?: RequestInit
	) => Promise<Document>

	/**
	 * Download a document.
	 * Note that, this API is similar to using the wrapper link "documents.php" to download a file (used for
	 * internal HTML links of documents into application), but with no need to have a session cookie (the token is used instead).
	 * @param	string	modulepart			Name of module or area concerned by file download ('facture', ...)
	 * @param	string	original_file		Relative path with filename, relative to modulepart (for example: IN201701-999/IN201701-999.pdf)
	 * @return	Promise<DocumentContent>	List of documents
	 */
	download: (modulepart: string, original_file: string, init?: RequestInit) => Promise<DocumentContent>

	/**
	 * Upload a file.
	 * Test sample for invoice: { "filename": "mynewfile.txt", "modulepart": "invoice", "ref": "FA1701-001", "subdir": "", "filecontent": "content text", "fileencoding": "", "overwriteifexists": "0" }.
	 * Test sample for supplier invoice: { "filename": "mynewfile.txt", "modulepart": "supplier_invoice", "ref": "FA1701-001", "subdir": "", "filecontent": "content text", "fileencoding": "", "overwriteifexists": "0" }.
	 * Test sample for medias file: { "filename": "mynewfile.txt", "modulepart": "medias", "ref": "", "subdir": "image/mywebsite", "filecontent": "Y29udGVudCB0ZXh0Cg==", "fileencoding": "base64", "overwriteifexists": "0" }.
	 * @param	string	data.filename				Name of file to create ('FA1705-0123.txt')
	 * @param	string	data.modulepart				Name of module or area concerned by file upload ('product', 'service', 'invoice', 'proposal', 'project', 'project_task', 'supplier_invoice', 'expensereport', 'member', ...)
	 * @param	string	data.ref					Reference of object (This will define subdir automatically and store submited file into it)
	 * @param	string	data.subdir					Subdirectory (Only if ref not provided)
	 * @param	string	data.filecontent			File content (string with file content. An empty file will be created if this parameter is not provided)
	 * @param	string	data.fileencoding			File encoding (''=no encoding, 'base64'=Base 64)
	 * @param	number	data.overwriteifexists		Overwrite file if exists (1 by default)
	 * @param	number	data.createdirifnotexists	Create subdirectories if the doesn't exists (1 by default)
	 * @return	Promise<string>
	 */
	upload: (
		filename: string,
		modulepart: UploadModulepart | string,
		data: {
			ref?: string
			subdir?: string
			filecontent?: string
			fileencoding?: string
			overwriteifexists?: number
			createdirifnotexists?: number
		},
		init?: RequestInit
	) => Promise<string>
}
