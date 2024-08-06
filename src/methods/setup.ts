import { Dolibarr } from "../dolibarr.class"
import type { BusinessLegalForm } from "../interfaces/BusinessLegalForm.interface"
import type { Civility } from "../interfaces/Civility.interface"
import type { Company } from "../interfaces/Company.interfaces"
import type { ContactType } from "../interfaces/ContactType.interface"
import type { Country } from "../interfaces/Country.interfaces"
import type { Currency } from "../interfaces/Currency.interface"
import type { DeliveryTime } from "../interfaces/DeliveryTime.interface"
import type { Establishment } from "../interfaces/Establishment.interface"
import type { EventType } from "../interfaces/EventType.interface"
import type { ExpenseReportType } from "../interfaces/ExpenseReportType.interface"
import type { ExtraField } from "../interfaces/ExtraField.interface"
import type { MeasuringUnit } from "../interfaces/MeasuringUnit.interface"
import type { OrderingMethod } from "../interfaces/OrderingMethod.interface"
import type { OrderingOrigin } from "../interfaces/OrderingOrigin.interface"
import type { PaymentTerm } from "../interfaces/PaymentTerm.interface"
import type { PaymentType } from "../interfaces/PaymentType.interface"
import type { ShippingMethod } from "../interfaces/ShippingMethod.interface"
import type { SocialNetwork } from "../interfaces/SocialNetwork.interface"
import type { Staff } from "../interfaces/Staff.interface"
import type { StateProvince } from "../interfaces/StateProvince.interface"
import type { TicketCategory } from "../interfaces/TicketCategory.interface"
import type { TicketSeverity } from "../interfaces/TicketSeverity.interface"
import type { TicketType } from "../interfaces/TicketType.interface"
import type { Town } from "../interfaces/Town.interface"

export function setup(this: Dolibarr) {
	/**
	 * Do a test of integrity for files and setup.
	 * @param	string	target	Can be 'local' or 'default' or Url of the signatures file to use for the test. Must be reachable by the tested Dolibarr.
	 * @return	Promise<{ resultcode: string; resultcomment: string; expectedchecksum: string; currentchecksum: string; out: string }>	Result of file and setup integrity check
	 */
	const checkIntegrity = (target: "local" | "default" | string, init?: RequestInit) =>
		this.get<{
			resultcode: string
			resultcomment: string
			expectedchecksum: string
			currentchecksum: string
			out: string
		}>(`setup/checkintegrity`, { target }, init)

	/**
	 * Get properties of company
	 * @return	Promise<Company>	Mysoc object
	 */
	const getCompanyProperties = (init?: RequestInit) => this.get<Company>(`/setup/company`, undefined, init)

	/**
	 * Get value of a setup variables
	 * Note that conf variables that stores security key or password hashes can't be loaded with API.
	 * @param	string		constantname	Name of conf variable to get
	 * @return	Promise<string>				Data without useless information
	 */
	const getSetupVariable = (constantname: string, init?: RequestInit) =>
		this.get<string>(`setup/conf/${constantname}`, undefined, init)

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
	const deliveryTimesList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<DeliveryTime[]>(`setup/dictionary/availability`, parameters, init)

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
	const civilitiesList = (parameters?: { module?: string; lang?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<Civility[]>(`setup/dictionary/civilities`, parameters, init)

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
	const contactsTypesList = (
		parameters?: { type?: string; module?: string; lang?: string } & DefaultParameters,
		init?: RequestInit
	) => this.get<ContactType[]>(`setup/dictionary/contact_types`, parameters, init)

	/**
	 * Get the list of countries.
	 * The names of the countries will be translated to the given language if
	 * the $lang parameter is provided. The value of $lang must be a language
	 * code supported by Dolibarr, for example 'en_US' or 'fr_FR'.
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
	const countriesList = (
		parameters?: { filter?: string; lang?: string } & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) => this.get<Country[]>(`setup/dictionary/countries`, parameters, init)

	/**
	 * Get country by ID.
	 * @param	number	id					ID of country
	 * @param	string	parameters.lang		Code of the language the name of the
	 * @return	Promise<Country>			Array of cleaned object properties
	 */
	const getCountry = (id: number, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<Country>(`setup/dictionary/countries/${id}`, parameters, init)

	/**
	 * Get country by Code.
	 * @param	string	code				Code of country (2 characters)
	 * @param	string	parameters.lang		Code of the language the name of the
	 * @return	Promise<Country>			Array of cleaned object properties
	 */
	const getCountryByCode = (code: string, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<Country>(`setup/dictionary/countries/byCode/${code}`, parameters, init)

	/**
	 * Get country by Iso.
	 * @param	string	iso					ISO of country (3 characters)
	 * @param	string	parameters.lang		Code of the language the name of the
	 * @return	Promise<Country>			Array of cleaned object properties
	 */
	const getCountryByIso = (iso: string, parameters?: { lang?: string }, init?: RequestInit) =>
		this.get<Country>(`setup/dictionary/countries/byISO/${iso}`, parameters, init)

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
	const currenciesList = (parameters?: { multicurrency?: 0 | 1 | 2 } & DefaultParameters, init?: RequestInit) =>
		this.get<Currency[]>(`setup/dictionary/currencies`, parameters, init)

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
	const eventsTypesList = (parameters?: { type?: string; module?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<EventType[]>(`setup/dictionary/event_types`, parameters, init)

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
	const expenseReportTypesList = (parameters?: { module?: string } & DefaultParameters, init?: RequestInit) =>
		this.get<ExpenseReportType[]>(`setup/dictionary/expensereport_types`, parameters, init)

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
	const legalFormBusinessList = (parameters?: { country?: number } & DefaultParameters, init?: RequestInit) =>
		this.get<BusinessLegalForm[]>(`setup/dictionary/legal_form`, parameters, init)

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
	const orderingMethodsList = (parameters?: { country?: number } & DefaultParameters, init?: RequestInit) =>
		this.get<OrderingMethod[]>(`setup/dictionary/ordering_methods`, parameters, init)

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
	const orderingOriginsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<OrderingOrigin[]>(`setup/dictionary/ordering_origins`, parameters, init)

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
	const paymentsTermsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<PaymentTerm[]>(`setup/dictionary/payment_terms`, parameters, init)

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
	const paymentsTypesList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<PaymentType[]>(`setup/dictionary/payment_types`, parameters, init)

	/**
	 * Get the list of shipping methods.
	 * @param	number	parameters.limit		Number of items per page
	 * @param	number	parameters.page			Page number {@min 0}
	 * @param	number	parameters.active		Shipping methodsm is active or not {@min 0} {@max 1}
	 * @param	string	parameters.lang			Code of the language the label of the method must be translated to
	 * @param	string	parameters.sqlfilters	SQL criteria to filter. Syntax example "(t.code:=:'CHQ')"
	 * @return	Promise<ShippingMethod[]>		List of shipping methods
	 */
	const shippingMethodsList = (
		parameters?: { lang?: string } & Omit<DefaultParameters, "sortfield" | "sortorder">,
		init?: RequestInit
	) => this.get<ShippingMethod[]>(`setup/dictionary/shipping_methods`, parameters, init)

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
	const socialNetworksList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<SocialNetwork[]>(`setup/dictionary/socialnetworks`, parameters, init)

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
	const staffList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<Staff[]>(`setup/dictionary/staff`, parameters, init)

	/**
	 * Get the list of states/provinces.
	 * The names of the states will be translated to the given language if
	 * the $lang parameter is provided. The value of $lang must be a language
	 * code supported by Dolibarr, for example 'en_US' or 'fr_FR'.
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
	const statesProvincesList = (
		parameters?: { country: number; filter: string } & Omit<DefaultParameters, "active">,
		init?: RequestInit
	) => this.get<StateProvince[]>(`setup/dictionary/states`, parameters, init)

	/**
	 * Get state by ID.
	 * @param	number		id			ID of state
	 * @return	Promise<StateProvince>	Array of cleaned object properties
	 */
	const getState = (id: number, init?: RequestInit) =>
		this.get<StateProvince>(`setup/dictionary/states/${id}`, undefined, init)

	/**
	 * Get state by Code.
	 * @param	string		code		Code of state
	 * @return	Promise<StateProvince>	Array of cleaned object properties
	 */
	const getStateByCode = (code: string, init?: RequestInit) =>
		this.get<StateProvince>(`setup/dictionary/states/byCode/${code}`, undefined, init)

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
	const ticketsCategoriesList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<TicketCategory[]>(`setup/dictionary/ticket_categories`, parameters, init)

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
	const ticketsSeverityList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<TicketSeverity[]>(`setup/dictionary/ticket_severities`, parameters, init)

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
	const ticketsTypesList = (parameters?: { lang: string } & DefaultParameters, init?: RequestInit) =>
		this.get<TicketType[]>(`setup/dictionary/ticket_types`, parameters, init)

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
	const townsList = (parameters?: { zipcode: string; town: string } & DefaultParameters, init?: RequestInit) =>
		this.get<Town[]>(`setup/dictionary/towns`, parameters, init)

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
	const measuringUnitsList = (parameters?: DefaultParameters, init?: RequestInit) =>
		this.get<MeasuringUnit[]>(`setup/dictionary/units`, parameters, init)

	/**
	 * Get the list of establishments.
	 * @return	Promise<Establishment[]>	List of establishments
	 */
	const establishmentsList = (init?: RequestInit) => this.get<Establishment[]>(`MODULE`, undefined, init)

	/**
	 * Get establishment by ID.
	 * @param	number		id			ID of establishment
	 * @return	Promise<Establishment>	Array of cleaned object properties
	 */
	const getEstablishment = (id: number, init?: RequestInit) =>
		this.get<Establishment>(`setup/establishments/${id}`, undefined, init)

	/**
	 * Get the list of extra fields.
	 * @param	string	parameters.sortfield	Sort field
	 * @param	string	parameters.sortorder	Sort order
	 * @param	string	parameters.type			Type of element ('adherent', 'commande', 'thirdparty', 'facture', 'propal', 'product', ...)
	 * @param	string	parameters.sqlfilters	Other criteria to filter answers separated by a comma. Syntax example "(t.label:like:'SO-%')"
	 * @return	Promise<Record<string, Record<string, ExtraField>>>		List of extra fields
	 */
	const extraFieldsList = (
		parameters?: { type: string } & Pick<DefaultParameters, "sortfield" | "sortorder" | "sqlfilters">,
		init?: RequestInit
	) => this.get<Record<string, Record<string, ExtraField>>>(`setup/extrafields`, parameters, init)

	/**
	 * Get list of enabled modules
	 * @return	string[]	Data without useless information
	 */
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
