import { DolibarrApi } from "../DolibarrApi.class.js"
import type { BusinessLegalForm } from "../interfaces/BusinessLegalForm.interfaces.js"
import type { Civility } from "../interfaces/Civility.interfaces.js"
import type { Company } from "../interfaces/Company.interfaces.js"
import type { ContactType } from "../interfaces/ContactType.interfaces.js"
import type { Country } from "../interfaces/Country.interfaces.js"
import type { Currency } from "../interfaces/Currency.interfaces.js"
import type { DeliveryTime } from "../interfaces/DeliveryTime.interfaces.js"
import type { Establishment } from "../interfaces/Establishment.interfaces.js"
import type { EventType } from "../interfaces/EventType.interfaces.js"
import type { ExpenseReportType } from "../interfaces/ExpenseReportType.interfaces.js"
import type { ExtraField } from "../interfaces/ExtraField.interfaces.js"
import type { MeasuringUnit } from "../interfaces/MeasuringUnit.interfaces.js"
import type { OrderingMethod } from "../interfaces/OrderingMethod.interfaces.js"
import type { OrderingOrigin } from "../interfaces/OrderingOrigin.interfaces.js"
import type { PaymentTerm } from "../interfaces/PaymentTerm.interfaces.js"
import type { PaymentType } from "../interfaces/PaymentType.interfaces.js"
import type { ShippingMethod } from "../interfaces/ShippingMethod.interfaces.js"
import type { SocialNetwork } from "../interfaces/SocialNetwork.interfaces.js"
import type { Staff } from "../interfaces/Staff.interfaces.js"
import type { StateProvince } from "../interfaces/StateProvince.interfaces.js"
import type { TicketCategory } from "../interfaces/TicketCategory.interfaces.js"
import type { TicketSeverity } from "../interfaces/TicketSeverity.interfaces.js"
import type { TicketType } from "../interfaces/TicketType.interfaces.js"
import type { Town } from "../interfaces/Town.interfaces.js"

export function setup(this: DolibarrApi): ReturnType<typeof setupTypes> {
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
		this.get<DeliveryTime[]>(`setup/dictionary/availability`, parameters, init)

	const civilitiesList = (parameters?: { module?: string; lang?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<Civility[]>(`setup/dictionary/civilities`, parameters, init)

	const contactsTypesList = (
		parameters?: { type?: string; module?: string; lang?: string } & DefaultParameters,
		init?: RequestInit
	) => this.get<ContactType[]>(`setup/dictionary/contact_types`, parameters, init)

	const countriesList = (
		parameters?: { filter?: string; lang?: string } & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) => this.get<Country[]>(`setup/dictionary/countries`, parameters, init)

	const getCountry = (id: number, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<Country>(`setup/dictionary/countries/${id}`, parameters, init)

	const getCountryByCode = (code: string, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<Country>(`setup/dictionary/countries/byCode/${code}`, parameters, init)

	const getCountryByIso = (iso: string, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<Country>(`setup/dictionary/countries/byISO/${iso}`, parameters, init)

	const currenciesList = (parameters?: { multicurrency?: 0 | 1 | 2 } & DefaultParameters, init?: RequestInit) =>
		this.get<Currency[]>(`setup/dictionary/currencies`, parameters, init)

	const eventsTypesList = (parameters?: { type?: string; module?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<EventType[]>(`setup/dictionary/event_types`, parameters, init)

	const expenseReportTypesList = (parameters?: { module?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<ExpenseReportType[]>(`setup/dictionary/expensereport_types`, parameters, init)

	const legalFormBusinessList = (parameters?: { country?: number } & DefaultParameters, init?: RequestInit) =>
		this.get<BusinessLegalForm[]>(`setup/dictionary/legal_form`, parameters, init)

	const orderingMethodsList = (parameters?: { country?: number } & DefaultParameters, init?: RequestInit) =>
		this.get<OrderingMethod[]>(`setup/dictionary/ordering_methods`, parameters, init)

	const orderingOriginsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<OrderingOrigin[]>(`setup/dictionary/ordering_origins`, parameters, init)

	const paymentsTermsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<PaymentTerm[]>(`setup/dictionary/payment_terms`, parameters, init)

	const paymentsTypesList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<PaymentType[]>(`setup/dictionary/payment_types`, parameters, init)

	const shippingMethodsList = (
		parameters?: { lang?: string } & Omit<DefaultParameters, "sortfield" | "sortorder">,
		init?: RequestInit
	) => this.get<ShippingMethod[]>(`setup/dictionary/shipping_methods`, parameters, init)

	const socialNetworksList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<SocialNetwork[]>(`setup/dictionary/socialnetworks`, parameters, init)

	const staffList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<Staff[]>(`setup/dictionary/staff`, parameters, init)

	const statesProvincesList = (
		parameters?: { country: number; filter: string } & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) => this.get<StateProvince[]>(`setup/dictionary/states`, parameters, init)

	const getState = (id: number, init?: RequestInit) =>
		this.get<StateProvince>(`setup/dictionary/states/${id}`, undefined, init)

	const getStateByCode = (code: string, init?: RequestInit) =>
		this.get<StateProvince>(`setup/dictionary/states/byCode/${code}`, undefined, init)

	const ticketsCategoriesList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<TicketCategory[]>(`setup/dictionary/ticket_categories`, parameters, init)

	const ticketsSeverityList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<TicketSeverity[]>(`setup/dictionary/ticket_severities`, parameters, init)

	const ticketsTypesList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<TicketType[]>(`setup/dictionary/ticket_types`, parameters, init)

	const townsList = (parameters?: { zipcode: string; town: string } & DefaultParameters, init?: RequestInit) =>
		this.get<Town[]>(`setup/dictionary/towns`, parameters, init)

	const measuringUnitsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<MeasuringUnit[]>(`setup/dictionary/units`, parameters, init)

	const establishmentsList = (init?: RequestInit) => this.get<Establishment[]>(`MODULE`, undefined, init)

	const getEstablishment = (id: number, init?: RequestInit) =>
		this.get<Establishment>(`setup/establishments/${id}`, undefined, init)

	const extraFieldsList = (
		parameters?: { type: string } & Pick<DefaultParameters, "sortfield" | "sortorder" | "sqlfilters">,
		init?: RequestInit
	) => this.get<Record<string, Record<string, ExtraField>>>(`setup/extrafields`, parameters, init)

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
		currenciesList,
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

export declare function setupTypes(this: DolibarrApi): {
	/**
	 * Do a test of integrity for files and setup.
	 * @param	string	target	Can be 'local' or 'default' or Url of the signatures file to use for the test. Must be reachable by the tested DolibarrApi.
	 * @return	Promise<{ resultcode: string; resultcomment: string; expectedchecksum: string; currentchecksum: string; out: string }>	Result of file and setup integrity check
	 */
	checkIntegrity: (
		target: "local" | "default" | string,
		init?: RequestInit
	) => Promise<{
		resultcode: string
		resultcomment: string
		expectedchecksum: string
		currentchecksum: string
		out: string
	}>

	/**
	 * Get properties of company
	 * @return	Promise<Company>	Mysoc object
	 */
	getCompanyProperties: (init?: RequestInit) => Promise<Company>

	/**
	 * Get value of a setup variables
	 * Note that conf variables that stores security key or password hashes can't be loaded with API.
	 * @param	string		constantname	Name of conf variable to get
	 * @return	Promise<string>				Data without useless information
	 */
	getSetupVariable: (constantname: string, init?: RequestInit) => Promise<string>

	/**
	 * Get the list of delivery times.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Delivery times is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	SQL criteria to filter with.
	 * @return	Promise<DeliveryTime[]>			[List of availability]
	 */
	deliveryTimesList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<DeliveryTime[]>
	/**
	 * Get the list of civilities.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	string	parameters.module		To filter on module events
	 * @param	number	parameters.active		Civility is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the civility must be translated to
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<Civility[]>				List of civility types
	 */
	civilitiesList: (
		parameters?: {
			module?: string
			lang?: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<Civility[]>

	/**
	 * Get the list of contacts types.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	string	parameters.type			To filter on type of contact
	 * @param	string	parameters.module		To filter on module contacts
	 * @param	number	parameters.active		Contact's type is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the civility must be translated to
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<ContactType[]>			List of Contacts types
	 */
	contactsTypesList: (
		parameters?: {
			type?: string
			module?: string
			lang?: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<ContactType[]>

	/**
	 * Get the list of countries.
	 * The names of the countries will be translated to the given language if
	 * the $lang parameter is provided. The value of $lang must be a language
	 * code supported by DolibarrApi, for example 'en_US' or 'fr_FR'.
	 * The returned list is sorted by country ID.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	string	parameters.filter		To filter the countries by name
	 * @param	string	parameters.lang			Code of the language the label of the countries must be translated to
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<Country[]>				List of countries
	 */
	countriesList: (
		parameters?: {
			filter?: string
			lang?: string
		} & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) => Promise<Country[]>

	/**
	 * Get country by ID.
	 * @param	number	id					ID of country
	 * @param	string	parameters.lang		Code of the language the name of the
	 * @return	Promise<Country>			Array of cleaned object properties
	 */
	getCountry: (
		id: number,
		parameters?: {
			lang?: string
		},
		init?: RequestInit
	) => Promise<Country>

	/**
	 * Get country by Code.
	 * @param	string	code				Code of country (2 characters)
	 * @param	string	parameters.lang		Code of the language the name of the
	 * @return	Promise<Country>			Array of cleaned object properties
	 */
	getCountryByCode: (
		code: string,
		parameters?: {
			lang?: string
		},
		init?: RequestInit
	) => Promise<Country>

	/**
	 * Get country by Iso.
	 * @param	string	iso					ISO of country (3 characters)
	 * @param	string	parameters.lang		Code of the language the name of the
	 * @return	Promise<Country>			Array of cleaned object properties
	 */
	getCountryByIso: (
		iso: string,
		parameters?: {
			lang?: string
		},
		init?: RequestInit
	) => Promise<Country>

	/**
	 * Get the list of currencies.
	 * @param	number	parameters.multicurrency	Multicurrency rates (0: no multicurrency, 1: last rate, 2: all rates) {@min 0} {@max 2}
	 * @param	string	parameters.sortfield		Sort field
	 * @param	string	parameters.sortorder		Sort order
	 * @param	number	parameters.limit			Number of items per page
	 * @param	number	parameters.page				Page number (starting from zero)
	 * @param	number	parameters.active			Payment term is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters		Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<Currency[]>					List of currencies
	 */
	currenciesList: (
		parameters?: {
			multicurrency?: 0 | 1 | 2
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<Currency[]>

	/**
	 * Get the list of events types.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	string	parameters.type			To filter on type of event
	 * @param	string	parameters.module		To filter on module events
	 * @param	number	parameters.active		Event's type is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<EventType[]>			List of events types
	 */
	eventsTypesList: (
		parameters?: {
			type?: string
			module?: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<EventType[]>

	/**
	 * Get the list of Expense Report types.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	string	parameters.module		To filter on module
	 * @param	number	parameters.active		Event's type is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<ExpenseReportType[]>	List of expense report types
	 */
	expenseReportTypesList: (
		parameters?: {
			module?: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<ExpenseReportType[]>

	/**
	 * Get the list of legal form of business.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.country		To filter on country
	 * @param	number	parameters.active		Lega form is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<BusinessLegalForm[]>	List of legal form
	 */
	legalFormBusinessList: (
		parameters?: {
			country?: number
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<BusinessLegalForm[]>

	/**
	 * Get the list of ordering methods.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Payment type is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	SQL criteria to filter with. Syntax example "(t.code:=:'OrderByWWW')"
	 * @return	Promise<OrderingMethod[]>		[List of ordering methods]
	 */
	orderingMethodsList: (
		parameters?: {
			country?: number
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<OrderingMethod[]>

	/**
	 * Get the list of ordering origins.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Payment type is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	SQL criteria to filter with. Syntax example "(t.code:=:'OrderByWWW')"
	 * @return	Promise<OrderingOrigin[]>		[List of ordering reasons]
	 */
	orderingOriginsList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<OrderingOrigin[]>

	/**
	 * Get the list of payments terms.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Payment term is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	SQL criteria to filter. Syntax example "(t.code:=:'CHQ')"
	 * @return	Promise<PaymentTerm[]>			List of payment terms
	 */
	paymentsTermsList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<PaymentTerm[]>

	/**
	 * Get the list of payments types.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Payment type is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	SQL criteria to filter with. Syntax example "(t.code:=:'CHQ')"
	 * @return	Promise<PaymentType[]>			[List of payment types]
	 */
	paymentsTypesList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<PaymentType[]>

	/**
	 * Get the list of shipping methods.
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Shipping methodsm is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the method must be translated to
	 * @param	string	parameters.sqlfilters	SQL criteria to filter. Syntax example "(t.code:=:'CHQ')"
	 * @return	Promise<ShippingMethod[]>		List of shipping methods
	 */
	shippingMethodsList: (
		parameters?: {
			lang?: string
		} & Omit<DefaultParameters, "sortfield" | "sortorder">,
		init?: RequestInit
	) => Promise<ShippingMethod[]>

	/**
	 * Get the list of social networks.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.active		Social network is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<SocialNetwork[]>		List of social networks
	 */
	socialNetworksList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<SocialNetwork[]>

	/**
	 * Get the list of staff.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.active		Staff is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<Staff[]>				List of staff
	 */
	staffList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<Staff[]>

	/**
	 * Get the list of states/provinces.
	 * The names of the states will be translated to the given language if
	 * the $lang parameter is provided. The value of $lang must be a language
	 * code supported by DolibarrApi, for example 'en_US' or 'fr_FR'.
	 * The returned list is sorted by state ID.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.country		To filter on country
	 * @param	string	parameters.filter		To filter the states by name
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<StateProvince[]>		List of states
	 */
	statesProvincesList: (
		parameters?: {
			country: number
			filter: string
		} & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) => Promise<StateProvince[]>

	/**
	 * Get state by ID.
	 * @param	number		id			ID of state
	 * @return	Promise<StateProvince>	Array of cleaned object properties
	 */
	getState: (id: number, init?: RequestInit) => Promise<StateProvince>

	/**
	 * Get state by Code.
	 * @param	string		code		Code of state
	 * @return	Promise<StateProvince>	Array of cleaned object properties
	 */
	getStateByCode: (code: string, init?: RequestInit) => Promise<StateProvince>

	/**
	 * Get the list of tickets categories.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.active		Payment term is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the category must be translated to
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<TicketCategory[]>		List of ticket categories
	 */
	ticketsCategoriesList: (
		parameters?: {
			lang: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<TicketCategory[]>

	/**
	 * Get the list of tickets severity.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.active		Payment term is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the severity must be translated to
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<TicketSeverity[]>		List of ticket severities
	 */
	ticketsSeverityList: (
		parameters?: {
			lang: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<TicketSeverity[]>

	/**
	 * Get the list of tickets types.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.active		Payment term is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the type must be translated to
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<TicketType[]>			List of ticket types
	 */
	ticketsTypesList: (
		parameters?: {
			lang: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<TicketType[]>

	/**
	 * Get the list of towns.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	string	parameters.zipcode		To filter on zipcode
	 * @param	string	parameters.town			To filter on city name
	 * @param	number	parameters.active		Town is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<Town[]>					List of towns
	 */
	townsList: (
		parameters?: {
			zipcode: string
			town: string
		} & DefaultParameters,
		init?: RequestInit
	) => Promise<Town[]>

	/**
	 * Get the list of measuring units.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number (starting from zero)
	 * @param	number	parameters.active		Measuring unit is active or not {@min 0} {@max 1}
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.code:like:'A%') and (t.active:>=:0)"
	 * @return	Promise<MeasuringUnit[]>		List of measuring unit
	 */
	measuringUnitsList: (parameters?: DefaultParameters, init?: RequestInit) => Promise<MeasuringUnit[]>

	/**
	 * Get the list of establishments.
	 * @return	Promise<Establishment[]>	List of establishments
	 */
	establishmentsList: (init?: RequestInit) => Promise<Establishment[]>

	/**
	 * Get establishment by ID.
	 * @param	number		id			ID of establishment
	 * @return	Promise<Establishment>	Array of cleaned object properties
	 */
	getEstablishment: (id: number, init?: RequestInit) => Promise<Establishment>

	/**
	 * Get the list of extra fields.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	string	parameters.type			Type of element ('adherent', 'commande', 'thirdparty', 'facture', 'propal', 'product', ...)
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.label:like:'SO-%')"
	 * @return	Promise<Record<string, Record<string, ExtraField>>>		List of extra fields
	 */
	extraFieldsList: (
		parameters?: {
			type: string
		} & Pick<DefaultParameters, "sortfield" | "sortorder" | "sqlfilters">,
		init?: RequestInit
	) => Promise<Record<string, Record<string, ExtraField>>>

	/**
	 * Get list of enabled modules
	 * @return	string[]	Data without useless information
	 */
	enabledModulesList: (init?: RequestInit) => Promise<string[]>
}
