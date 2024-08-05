import { Dolibarr } from "../dolibarr.class"
import type { Company } from "../interfaces/Company.interfaces"

export function setup(this: Dolibarr) {
	const checkIntegrity = (target: "local" | "default" | string, init?: RequestInit) =>
		this.get<{
			resultcode: string
			resultcomment: string
			expectedchecksum: string
			currentchecksum: string
			out: string
		}>(`setup/checkintegrity`, { target }, init)

	const getCompanyProperties = (init?: RequestInit) => this.get<Company>(`/setup/company`, undefined, init)

	const getSetupVariable = (constantname: string, init?: RequestInit) =>
		this.get<string>(`setup/conf/${constantname}`, undefined, init)

	const deliveryTimesList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<{ rowid: string; code: string; label: string }[]>(`setup/dictionary/availability`, parameters, init)

	const civilitiesList = (parameters?: { module?: string; lang?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<{ rowid: string; code: string; label: string; module: string | null }[]>(
			`setup/dictionary/civilities`,
			parameters,
			init
		)

	const contactsTypesList = (
		parameters?: { type?: string; module?: string; lang?: string } & DefaultParameters,
		init?: RequestInit
	) =>
		this.get<
			{
				rowid: string
				code: string
				type: string
				label: string
				source: string
				module: string | null
				position: string
			}[]
		>(`setup/dictionary/contact_types`, parameters, init)

	const countriesList = (
		parameters?: { filter?: string; lang?: string } & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) =>
		this.get<{ id: string; code: string; code_iso: string | null; label: string; active: string }[]>(
			`setup/dictionary/countries`,
			parameters,
			init
		)

	const getCountry = (id: number, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<{ id: string; code: string; code_iso: string; label: string; active: string }>(
			`setup/dictionary/countries/${id}`,
			parameters,
			init
		)

	const getCountryByCode = (code: string, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<{ id: string; code: string; code_iso: string; label: string; active: string }>(
			`setup/dictionary/countries/byCode/${code}`,
			parameters,
			init
		)

	const getCountryByIso = (iso: string, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<{ id: string; code: string; code_iso: string; label: string; active: string }>(
			`setup/dictionary/countries/byISO/${iso}`,
			parameters,
			init
		)

	const CurrenciesList = (parameters?: { multicurrency?: 0 | 1 | 2 } & DefaultParameters, init?: RequestInit) =>
		this.get<{ code_iso: string; label: string; unicode: string | null }[]>(
			`setup/dictionary/currencies`,
			parameters,
			init
		)

	const eventsTypesList = (parameters?: { type?: string; module?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<{ id: string; code: string; type: string; label: string; module: string }[]>(
			`setup/dictionary/event_types`,
			parameters,
			init
		)

	const expenseReportTypesList = (parameters?: { module?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				id: string
				code: string
				label: string
				accountancy_code: string | null
				active: string
				module: string | null
				position: string
			}[]
		>(`setup/dictionary/expensereport_types`, parameters, init)

	const legalFormBusinessList = (parameters?: { country?: number } & DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				rowid: string
				code: string
				fk_pays: string
				libelle: string
				isvatexempted: string
				active: string
				module: string | null
				position: string
			}[]
		>(`setup/dictionary/legal_form`, parameters, init)

	const orderingMethodsList = (parameters?: { country?: number } & DefaultParameters, init?: RequestInit) =>
		this.get<{ rowid: string; code: string; label: string; module: string | null }[]>(
			`setup/dictionary/ordering_methods`,
			parameters,
			init
		)

	const orderingOriginsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<{ rowid: string; code: string; label: string; module: string | null }[]>(
			`setup/dictionary/ordering_origins`,
			parameters,
			init
		)

	const paymentsTermsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				id: string
				code: string
				sortorder: string
				label: string
				descr: string
				type_cdr: string
				nbjour: string
				decalage: string | null
				module: string | null
			}[]
		>(`setup/dictionary/payment_terms`, parameters, init)

	const paymentsTypesList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				id: string
				code: string
				type: string
				label: string
				module: string | null
			}[]
		>(`setup/dictionary/payment_types`, parameters, init)

	const shippingMethodsList = (
		parameters?: { lang?: string } & Omit<DefaultParameters, "sortfield" | "sortorder">,
		init?: RequestInit
	) =>
		this.get<
			{
				id: string
				code: string
				label: string
				description: string
				tracking: string
				module: string | null
			}[]
		>(`setup/dictionary/shipping_methods`, parameters, init)

	const socialNetworksList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<unknown[]>(`setup/dictionary/socialnetworks`, parameters, init)

	const staffList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				id: string
				code: string
				libelle: string
				active: string
				module: string | null
			}[]
		>(`setup/dictionary/staff`, parameters, init)

	const statesProvincesList = (
		parameters?: { country: number; filter: string } & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) =>
		this.get<
			{
				id: string
				code_departement: string
				code: string
				name: string
				nom: string
				label: string | null
				active: string
			}[]
		>(`setup/dictionary/states`, parameters, init)

	const getState = (id: number, init?: RequestInit) =>
		this.get<{
			id: string
			code_departement: string
			code: string
			name: string
			nom: string
			label: string | null
			active: string
		}>(`setup/dictionary/states/${id}`, undefined, init)

	const getStateByCode = (code: string, init?: RequestInit) =>
		this.get<{
			id: string
			code_departement: string
			code: string
			name: string
			nom: string
			label: string | null
			active: string
		}>(`setup/dictionary/states/byCode/${code}`, undefined, init)

	const ticketsCategoriesList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				rowid: string
				code: string
				pos: string
				label: string
				use_default: string
				description: string | null
			}[]
		>(`setup/dictionary/ticket_categories`, parameters, init)

	const ticketsSeverityList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				rowid: string
				code: string
				pos: string
				label: string
				use_default: string
				color: string
				description: string | null
			}[]
		>(`setup/dictionary/ticket_severities`, parameters, init)

	const ticketsTypesList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<
			{
				rowid: string
				code: string
				pos: string
				label: string
				use_default: string
				description: string | null
			}[]
		>(`setup/dictionary/ticket_types`, parameters, init)

	const townsList = (parameters?: { zipcode: string; town: string } & DefaultParameters, init?: RequestInit) =>
		this.get<unknown[]>(`setup/dictionary/towns`, parameters, init)

	const measuringUnitsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<{
			rowid: string
			code: string
			label: string
			short_label: string
			active: string
			scale: string
			unit_type: string
		}>(`setup/dictionary/units`, parameters, init)

	const establishmentsList = (init?: RequestInit) => this.get<unknown[]>(`MODULE`, undefined, init)

	const getEstablishment = (id: number, init?: RequestInit) =>
		this.get<unknown>(`setup/establishments/${id}`, undefined, init)

	const extraFieldsList = (
		parameters?: { type: string } & Pick<DefaultParameters, "sortfield" | "sortorder" | "sqlfilters">,
		init?: RequestInit
	) =>
		this.get<
			Record<
				string,
				Record<
					string,
					{
						type: string
						label: string
						size: string
						elementtype: string
						default: unknown | null
						computed: unknown | null
						unique: string
						required: string
						param: any
						pos: string
						alwayseditable: string
						perms: unknown | null
						list: string
					}
				>
			>
		>(`setup/extrafields`, parameters, init)

	const enabledModulesList = (init?: RequestInit) => this.get<string[]>(`setup/modules`, undefined, init)

	return {
		checkIntegrity,
		getCompanyProperties,
		getSetupVariable,
		deliveryTimesList,
		civilitiesList,
		contactsTypesList,
		countriesList,
		getCountry,
		getCountryByCode,
		getCountryByIso,
		CurrenciesList,
		eventsTypesList,
		expenseReportTypesList,
		legalFormBusinessList,
		orderingMethodsList,
		orderingOriginsList,
		paymentsTermsList,
		paymentsTypesList,
		shippingMethodsList,
		socialNetworksList,
		staffList,
		statesProvincesList,
		getState,
		getStateByCode,
		ticketsCategoriesList,
		ticketsSeverityList,
		ticketsTypesList,
		townsList,
		measuringUnitsList,
		establishmentsList,
		getEstablishment,
		extraFieldsList,
		enabledModulesList,
	}
}

type DefaultParameters = {
	sortfield?: string
	sortorder?: "ASC" | "DESC"
	limit?: number
	page?: number
	active?: number
	sqlfilters?: string
}
