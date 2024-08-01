import { get, post, put, deleteRequest } from "./methods/_rest"
import { agendaevents } from "./methods/agendaevents"
import { bankaccounts } from "./methods/bankaccounts"
import { categories } from "./methods/categories"
import { contacts } from "./methods/contacts"
import { documents } from "./methods/documents"
import { invoices } from "./methods/invoices"
import { login } from "./methods/login"
import { orders } from "./methods/orders"
import { products } from "./methods/products"
import { proposals } from "./methods/proposals"
import { setup } from "./methods/setup"
import { shipments } from "./methods/shipments"
import { status } from "./methods/status"
import { stockmovements } from "./methods/stockmovements"
import { thirdparties } from "./methods/thirdparties"
import { tickets } from "./methods/tickets"
import { users } from "./methods/users"
import { warehouses } from "./methods/warehouses"
import type { Line } from "./interfaces/Line.interfaces"

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
export class Dolibarr {
	protected api_url: string
	protected api_key: string

	protected endpoint: string = ""

	constructor(api_url: string, api_key: string) {
		if (!api_url || !api_key) {
			throw new Error("api_url and api_key are required")
		}

		this.api_url = api_url
		this.api_key = api_key
	}

	/** REST methods */

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

	/** CRUD methods */

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

	/** Common methods */

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
			this.update<number>(`${module}/${id}`, data, init)

	commonUnlinkContact =
		(module: string) =>
		(id: number, contactid: number, type: "BILLING" | "SHIPPING" | "CUSTOMER", init?: RequestInit) =>
			this.delete<number>(`${module}/${id}/contact/${contactid}/${type}`, undefined, init)

	commomLinkContact =
		(module: string) =>
		(id: number, contactid: number, type: "BILLING" | "SHIPPING" | "CUSTOMER", init?: RequestInit) =>
			this.post<number>(`${module}/${id}/contact/${contactid}/${type}`, undefined, init)

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

	/** Example structure to create the methods */
	// <unknown> is the return type to complete

	commonGetDummy = (PROPS: any, parameters?: {}, init?: RequestInit) => this.get<unknown>(`MODULE`, parameters, init)

	commonPostDummy = (PROPS: any, data: Partial<{}>, init?: RequestInit) => this.post<unknown>(`MODULE`, data, init)

	commonPutDummy = (PROPS: any, data: Partial<{}>, init?: RequestInit) => this.put<unknown>(`MODULE`, data, init)

	commonDeleteDummy = (PROPS: any, parameters?: {}, init?: RequestInit) =>
		this.delete<{ success: { code: number; message: string } }>(`MODULE`, parameters, init)

	/** Modules */

	agendaevents = agendaevents.call(this)

	bankaccounts = bankaccounts.call(this)

	categories = categories.call(this)

	contacts = contacts.call(this)

	documents = documents.call(this)

	invoices = invoices.call(this)

	login = login.call(this)

	orders = orders.call(this)

	products = products.call(this)

	proposals = proposals.call(this)

	setup = setup.call(this)

	shipments = shipments.call(this)

	status = status.call(this)

	stockmovements = stockmovements.call(this)

	thirdparties = thirdparties.call(this)

	tickets = tickets.call(this)

	users = users.call(this)

	warehouses = warehouses.call(this)

	// object = object.call<this, [], ReturnType<typeof object>>(this)
	// object = object.call(this)

	/** Modules */

	ping = (init?: RequestInit) => this.status.getStatus(init)
}
