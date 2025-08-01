import { get, post, put, deleteRequest, patch } from "./methods/_rest.js"
import { agendaevents } from "./methods/agendaevents.js"
import { bankaccounts } from "./methods/bankaccounts.js"
import { categories } from "./methods/categories.js"
import { contacts } from "./methods/contacts.js"
import { documents } from "./methods/documents.js"
import { invoices } from "./methods/invoices.js"
import { login } from "./methods/login.js"
import { orders } from "./methods/orders.js"
import { products } from "./methods/products.js"
import { proposals } from "./methods/proposals.js"
import { setup } from "./methods/setup.js"
import { shipments } from "./methods/shipments.js"
import { status } from "./methods/status.js"
import { stockmovements } from "./methods/stockmovements.js"
import { thirdparties } from "./methods/thirdparties.js"
import { tickets } from "./methods/tickets.js"
import { users } from "./methods/users.js"
import { warehouses } from "./methods/warehouses.js"
import { savtosave } from "./methods/external/savtosave.js"
import type { Line } from "./interfaces/Line.interfaces.js"

/**
 * Typescript communication tools, zod schemas and utils for Dolibarr REST API
 * @author Thomas Savournin <tosave.vbl@gmail.com>
 * @github https://github.com/tosave04
 * @copyright Thomas Savournin <tosave.vbl@gmail.com> 2024
 * @license GPL-3.0
 *
 * @example
 * const api = new Dolibarr("http://localhost:8080/api/index.php", "dolibarr_api_key")
 * api.ping().then(console.log)
 * api.proposals.list({ sortfield: "t.rowid", sortorder: "ASC" })
 */
export class DolibarrApi {
	protected api_url: string
	protected api_key: string | undefined

	protected endpoint: string = ""

	constructor(api_url: string, api_key?: string | undefined) {
		if (!api_url) {
			throw new Error("api_url are required")
		}

		this.api_url = api_url
		this.api_key = api_key
	}

	// REST methods

	get = <R>(input: string, parameters?: Record<string, unknown>, init?: RequestInit) =>
		get.call<this, [string, Record<string, unknown> | undefined, RequestInit | undefined], Promise<R>>(
			this,
			input,
			parameters,
			init
		)

	post = <R>(input: string, data?: Record<string, unknown> | Record<string, unknown>[], init?: RequestInit) =>
		post.call<
			this,
			[string, Record<string, unknown> | Record<string, unknown>[] | undefined, RequestInit | undefined],
			Promise<R>
		>(this, input, data, init)

	put = <R>(input: string, data: Record<string, unknown>, init?: RequestInit) =>
		put.call<this, [string, Record<string, unknown>, RequestInit | undefined], Promise<R>>(this, input, data, init)

	patch = <R>(input: string, data?: Record<string, unknown> | Record<string, unknown>[], init?: RequestInit) =>
		patch.call<
			this,
			[string, Record<string, unknown> | Record<string, unknown>[] | undefined, RequestInit | undefined],
			Promise<R>
		>(this, input, data, init)

	// CRUD methods

	create = this.post

	read = this.get

	update = this.put

	delete = <R>(input: string, parameters?: Record<string, unknown>, init?: RequestInit) =>
		deleteRequest.call<this, [string, Record<string, unknown> | undefined, RequestInit | undefined], Promise<R>>(
			this,
			input,
			parameters,
			init
		)

	// Common methods

	commonList =
		<P extends {}, R>(module: string) =>
		(parameters?: P, init?: RequestInit) =>
			this.get<R[]>(`${module}`, parameters, init)

	commonCreate =
		<T>(module: string) =>
		(data: Partial<T>, init?: RequestInit) =>
			this.create<number>(module, data, init)

	commonDelete = (module: string) => (id: number, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`${module}/${id}`, undefined, init)

	commonGetById =
		<P extends {}, R>(module: string) =>
		(id: number, parameters?: P, init?: RequestInit) =>
			this.get<R>(`${module}/${id}`, parameters, init)

	commonUpdate =
		<T>(module: string) =>
		(id: number, data: Partial<T>, init?: RequestInit) =>
			this.update<T>(`${module}/${id}`, data, init)

	commonUnlinkContact =
		<T>(module: string) =>
		(id: number, contactid: number, type: "BILLING" | "SHIPPING" | "CUSTOMER", init?: RequestInit) =>
			this.delete<T>(`${module}/${id}/contact/${contactid}/${type}`, undefined, init)

	commomLinkContact =
		(module: string) =>
		(id: number, contactid: number, type: "BILLING" | "SHIPPING" | "CUSTOMER", init?: RequestInit) =>
			this.post<{ success: { code: number; message: string } }>(
				`${module}/${id}/contact/${contactid}/${type}`,
				undefined,
				init
			)

	commonClose =
		<R>(module: string) =>
		(id: number, data: { status: 2 | 3; note_private?: string; notrigger?: number }, init?: RequestInit) =>
			this.post<R>(`${module}/${id}/close`, data, init)

	commonAddLine = (module: string) => (id: number, data: Partial<Line>, init?: RequestInit) =>
		this.post<number>(`${module}/${id}/line`, data, init)

	commonGetLines =
		<P extends {}>(module: string) =>
		(id: number, parameters?: P, init?: RequestInit) =>
			this.get<Line[]>(`${module}/${id}/lines`, parameters, init)

	commonAddLines = (module: string) => (id: number, data: Partial<Line>[], init?: RequestInit) =>
		this.post<number>(`${module}/${id}/lines`, data, init)

	commonDeleteLine = (module: string) => (id: number, lineid: number, init?: RequestInit) =>
		this.delete<number>(`${module}/${id}/lines/${lineid}`, undefined, init)

	commonUpdateLine =
		<R>(module: string) =>
		(id: number, lineid: number, data: Partial<Line>, init?: RequestInit) =>
			this.update<R>(`${module}/${id}/lines/${lineid}`, data, init)

	commonSetToDraft =
		<R>(module: string) =>
		(id: number, init?: RequestInit) =>
			this.post<R>(`${module}/${id}/settodraft`, undefined, init)

	commonValidate =
		<R>(module: string) =>
		(id: number, data?: { notrigger?: number }, init?: RequestInit) =>
			this.post<R>(`${module}/${id}/validate`, data, init)

	commonGetByRefExt =
		<P extends {}, R>(module: string) =>
		(ref_ext: string, parameters?: P, init?: RequestInit) =>
			this.get<R>(`${module}/ref_ext/${ref_ext}`, parameters, init)

	commonGetByRef =
		<P extends {}, R>(module: string) =>
		(ref: string, parameters?: P, init?: RequestInit) =>
			this.get<R>(`${module}/ref/${ref}`, parameters, init)

	commonGetByEmail =
		<P extends {}, R>(module: string) =>
		(email: string, parameters?: P, init?: RequestInit) =>
			this.get<R>(`${module}/email/${email}`, parameters, init)

	// Example structure to create the methods
	// <unknown> is the return type to complete

	commonGetDummy = (PROPS: any, parameters?: {}, init?: RequestInit) => this.get<unknown>(`MODULE`, parameters, init)

	commonPostDummy = (PROPS: any, data: Partial<{}>, init?: RequestInit) => this.post<unknown>(`MODULE`, data, init)

	commonPutDummy = (PROPS: any, data: Partial<{}>, init?: RequestInit) => this.put<unknown>(`MODULE`, data, init)

	commonDeleteDummy = (PROPS: any, parameters?: {}, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`MODULE`, parameters, init)

	// Modules

	agendaevents: ReturnType<typeof agendaevents> = agendaevents.call(this)

	bankaccounts: ReturnType<typeof bankaccounts> = bankaccounts.call(this)

	categories: ReturnType<typeof categories> = categories.call(this)

	contacts: ReturnType<typeof contacts> = contacts.call(this)

	documents: ReturnType<typeof documents> = documents.call(this)

	invoices: ReturnType<typeof invoices> = invoices.call(this)

	login: ReturnType<typeof login> = login.call(this)

	orders: ReturnType<typeof orders> = orders.call(this)

	products: ReturnType<typeof products> = products.call(this)

	proposals: ReturnType<typeof proposals> = proposals.call(this)

	setup: ReturnType<typeof setup> = setup.call(this)

	shipments: ReturnType<typeof shipments> = shipments.call(this)

	status: ReturnType<typeof status> = status.call(this)

	stockmovements: ReturnType<typeof stockmovements> = stockmovements.call(this)

	thirdparties: ReturnType<typeof thirdparties> = thirdparties.call(this)

	tickets: ReturnType<typeof tickets> = tickets.call(this)

	users: ReturnType<typeof users> = users.call(this)

	warehouses: ReturnType<typeof warehouses> = warehouses.call(this)

	// External modules

	/**
	 * Provides methods to manage "sav" (after-sales service) objects in Dolibarr.
	 * Allows for listing, retrieving, updating, and managing sav-related data.
	 * @returns {object} {list, ping, getById, update, toValidate, pending, updateShippingDate, updateShippingMethod, getAllForDashboard}
	 */
	savtosave: ReturnType<typeof savtosave> = savtosave.call(this)

	// object = object.call<this, [], ReturnType<typeof object>>(this)
	// object = object.call(this)

	// Ping

	ping = (init?: RequestInit) => this.status.getStatus(init)
}
