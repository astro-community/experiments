import { render, renderComponent, renderSlot } from 'astro/internal'
import { toHyphenTagName } from './internal/toHyphenTagName.ts'

/* The purpose of this file is to prevent a web component file from throwing during import. */
/* The classes and methods here are not intended to recreate the Document Object Model. */
/* The functionalities here are placeholder shims to access top-level DOM objects. */

// add utilities for handling internal data

const INTERNALS = new WeakMap()

const INTERNALS_FOR = <T>(ref: any): T => INTERNALS.has(ref) ? INTERNALS.get(ref) : INTERNALS.set(ref, {}).get(ref)

/** Registers a property on the global object. */
const REGISTER = <T extends object>(value: T, internals?: {}, name: string = Object(value).name): T => {
	if (globalThis[name] === undefined) {
		globalThis[name] = value
	}

	Object.assign(INTERNALS_FOR(value), internals)

	return value
}

// shim event target constructors

/** Event interface representing an event which takes place. */
export const Event = REGISTER(globalThis.Event || class Event {})

/** Event interface representing an event which takes place. */
export const CustomEvent = REGISTER(globalThis.CustomEvent || class CustomEvent extends Event {})

/** EventTarget interface representing any object that can handle events. */
export const EventTarget = REGISTER(globalThis.EventTarget || class EventTarget {
	addEventListener(type: string, listener: any) {
		void type
		void listener
	}

	dispatchEvent(event: Event) {
		void event

		return true
	}

	removeEventListener(type: string, listener: any) {
		void type
		void listener
	}
})

export const Window = REGISTER(globalThis.Window || class Window extends EventTarget {
	cancelAnimationFrame(id: number) {
		return clearTimeout(id)
	}

	cancelIdleCallback(id: number) {
		return clearTimeout(id)
	}

	matchMedia(mediaQueryString: string) {
		void mediaQueryString

		/** @type {MediaQueryList} */
		const mediaQueryList = Object.create(MediaQueryList.prototype)

		return mediaQueryList
	}

	requestAnimationFrame(callback: (...args: any[]) => any) {
		return setTimeout(callback, 1000 / 60)
	}

	requestIdleCallback(callback: (...args: any[]) => any) {
		void callback

		return setTimeout(callback, 1000 / 60)
	}

	get customElements() {
		const _internals = INTERNALS_FOR<WindowInternals>(this)

		return _internals.customElements
	}

	get document() {
		const _internals = INTERNALS_FOR<WindowInternals>(this)

		return _internals.document
	}

	get location() {
		const _internals = INTERNALS_FOR<WindowInternals>(this)

		return _internals.location
	}

	get window() {
		return this
	}
})

/** MediaQueryList interface representing media queries applied to a document. */
export const MediaQueryList = REGISTER(globalThis.MediaQueryList || class MediaQueryList extends EventTarget {})

/** Node interface representing the base class for all DOM objects. */
export const Node = REGISTER(globalThis.Node || class Node extends EventTarget {
	append(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	appendChild(/** @type {Node} */ childNode) {
		return childNode
	}

	after(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	before(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	prepend(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	replaceChild(newChild: Node, oldChild: Node) {
		void newChild

		return oldChild
	}

	removeChild(childNode: Node) {
		return childNode
	}

	get attributes() {
		return {}
	}

	get childNodes(): Node[] {
		return []
	}

	get children(): Element[] {
		return []
	}

	get ownerDocument() {
		const internals = INTERNALS_FOR<NodeInternals>(this)

		internals.ownerDocument = internals.ownerDocument || null

		return internals.ownerDocument
	}

	get textContent() {
		return ''
	}
})

/** Element interface representing the base class for all element objects. */
export const Element = REGISTER(globalThis.Element || class Element extends Node {
	hasAttribute(name: string) {
		void name

		return false
	}

	getAttribute(name: string) {
		void name

		return null
	}

	setAttribute(name: string, value: string) {
		void name
		void value
	}

	attachShadow(init: { mode?: string }) {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		if (internals.shadowRoot) throw new Error('The operation is not supported.')

		internals.shadowInit = internals.shadowInit || Object(init)
		internals.shadowRoot = internals.shadowRoot || (/^open$/.test(internals.shadowInit.mode) ? new ShadowRoot() as ShadowRoot : null)

		return internals.shadowRoot
	}

	get innerHTML() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		return internals.innerHTML
	}

	set innerHTML(value) {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		internals.innerHTML = String(value)
	}

	get shadowRoot() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		internals.shadowInit = internals.shadowInit || {}
		internals.shadowRoot = internals.shadowRoot || null

		const shadowRootOrNull = /^open$/.test(internals.shadowInit.mode) ? internals.shadowRoot : null

		return shadowRootOrNull
	}

	get nodeName() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		return internals.name || ''
	}

	get tagName() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		return internals.name || ''
	}
})

/** Document interface representing an entire document tree. */
export const Document = REGISTER(globalThis.Document || class Document extends Node {
	createElement(name: string) {
		name = String(name).toUpperCase()

		const internals = INTERNALS_FOR<ElementRegistryInternals>(this.defaultView.customElements)

		const TypeOfHTMLElement = internals.constructorByName.get(name) || HTMLUnknownElement

		const element: HTMLElement = Object.create(TypeOfHTMLElement.prototype)

		Object.assign(INTERNALS_FOR(element), { name, ownerDocument: this })

		return element
	}

	get adoptedStyleSheets(): StyleSheet[] {
		return []
	}

	get body() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.body || null
	}

	get defaultView() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.defaultView || null
	}

	get documentElement() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.documentElement || null
	}

	get head() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.head || null
	}

	get styleSheets(): StyleSheet[] {
		return []
	}
})

/** Document interface representing a minimal document tree. */
export const DocumentFragment = REGISTER(globalThis.DocumentFragment || class DocumentFragment extends Node {})

/** Document interface representing a document subtree. */
export const ShadowRoot = REGISTER(globalThis.ShadowRoot || class ShadowRoot extends DocumentFragment {
	get innerHTML() {
		return ''
	}
})

/** HTMLDocument interface representing an entire HTML document tree. */
export const HTMLDocument = REGISTER(globalThis.HTMLDocument || class HTMLDocument extends Document {})

/** HTMLElement interface representing any HTML element. */
export const HTMLElement = REGISTER(globalThis.HTMLElement || class HTMLElement extends Element {})

export const HTMLDivElement = REGISTER(globalThis.HTMLDivElement || class HTMLDivElement extends HTMLElement {})

export const HTMLHeadElement = REGISTER(globalThis.HTMLHeadElement || class HTMLHeadElement extends HTMLElement {})

export const HTMLHtmlElement = REGISTER(globalThis.HTMLHtmlElement || class HTMLHtmlElement extends HTMLElement {})

export const HTMLImageElement = REGISTER(globalThis.HTMLImageElement || class HTMLImageElement extends HTMLElement {})

export const HTMLStyleElement = REGISTER(globalThis.HTMLStyleElement || class HTMLStyleElement extends HTMLElement {})

export const HTMLTemplateElement = REGISTER(globalThis.HTMLTemplateElement || class HTMLTemplateElement extends HTMLElement {})

export const HTMLUnknownElement = REGISTER(globalThis.HTMLUnknownElement || class HTMLUnknownElement extends HTMLElement {})

export const Image = REGISTER(globalThis.Image || function Image() {
	Object.assign(INTERNALS_FOR(this), { name: 'img', ownerDocument: globalThis.document })
})

Image.prototype = HTMLImageElement.prototype

/** CustomElementRegistry used to register new custom elements and get information about previously registered custom elements. */
export const CustomElementRegistry = REGISTER(globalThis.CustomElementRegistry || class CustomElementRegistry {
	/** Defines a new custom element using the given tag name and HTMLElement constructor. */
	define(name: string, constructor: typeof HTMLElement, options?: any) {
		void options

		const internals = INTERNALS_FOR<ElementRegistryInternals>(this)

		name = String(name).toUpperCase()

		internals.constructorByName.set(name, constructor)
		internals.nameByConstructor.set(constructor, name)
	}

	/** Returns the constructor associated with the given tag name. */
	get(name: string) {
		const internals = INTERNALS_FOR<ElementRegistryInternals>(this)

		name = String(name).toUpperCase()

		return internals.constructorByName.get(name)
	}

	for(constructor: typeof HTMLElement) {
		const internals = INTERNALS_FOR<ElementRegistryInternals>(this)

		return internals.nameByConstructor.get(constructor)
	}
})

export const StyleSheet = REGISTER(globalThis.StyleSheet || class StyleSheet {})

export const CSSStyleSheet = REGISTER(globalThis.CSSStyleSheet || class CSSStyleSheet extends StyleSheet {
	async replace(text: string) {
		void text

		return new CSSStyleSheet()
	}

	replaceSync(text: string) {
		void text

		return new CSSStyleSheet()
	}

	get cssRules() {
		return []
	}
})

/** MutationObserver provides the ability to watch for changes to the DOM tree. */
export const MutationObserver = REGISTER(globalThis.MutationObserver || class MutationObserver {
	disconnect() {}

	observe() {}

	takeRecords() {
		return []
	}

	unobserve() {}
})

/** IntersectionObserver provides the ability to watch for changes in the intersection of elements. */
export const IntersectionObserver = REGISTER(globalThis.IntersectionObserver || class IntersectionObserver {
	disconnect() {}

	observe() {}

	takeRecords() {
		return []
	}

	unobserve() {}
})

/** ResizeObserver provides the ability to watch for changes made to the dimensions of elements. */
export const ResizeObserver = REGISTER(globalThis.ResizeObserver || class ResizeObserver {
	disconnect() {}

	observe() {}

	takeRecords() {
		return []
	}

	unobserve() {}
})

// shim globalThis as an instance of Window

if (!(globalThis instanceof Window)) {
	try {
		Object.setPrototypeOf(globalThis, Window.prototype)
	} catch (error) {
		Object.defineProperties(
			globalThis,
			Object.getOwnPropertyDescriptors(Window.prototype)
		)
	}

	Object.assign(INTERNALS_FOR(globalThis), {
		customElements: globalThis.customElements || new CustomElementRegistry(),
		document: globalThis.document || new HTMLDocument(),
		location: globalThis.location || new URL('http://0.0.0.0/'),
	})

	Object.assign(INTERNALS_FOR(globalThis.customElements), {
		constructorByName: new Map([
			['DIV', HTMLDivElement],
			['HTML', HTMLHtmlElement],
			['IMG', HTMLImageElement],
			['STYLE', HTMLStyleElement],
			['TEMPLATE', HTMLTemplateElement],
		]),
		nameByConstructor: new Map([
			[HTMLDivElement, 'DIV'],
			[HTMLHtmlElement, 'HTML'],
			[HTMLImageElement, 'IMG'],
			[HTMLStyleElement, 'STYLE'],
			[HTMLTemplateElement, 'TEMPLATE'],
		]),
	})

	Object.assign(INTERNALS_FOR(globalThis.document), {
		documentElement: Object.create(HTMLHtmlElement.prototype),
		body: null,
		defaultView: globalThis.window,
		head: Object.create(HTMLHeadElement.prototype)
	})

	Object.assign(INTERNALS_FOR(globalThis.document.documentElement), {
		name: 'HTML',
		ownerDocument: globalThis.document,
	})

	Object.assign(INTERNALS_FOR(globalThis.document.head), {
		name: 'HEAD',
		ownerDocument: globalThis.document,
	})
}

export const window = globalThis.window
export const customElements = globalThis.customElements
export const document = globalThis.document

// utilities for working with internals

/** Returns an Element constructor by a given tag name. */
export const getTypeOfElementByName = (name: string) => {
	name = String(name).toUpperCase()

	const internals = INTERNALS_FOR<ElementRegistryInternals>(customElements)

	return internals.constructorByName.get(name)
}

/** Returns a tag name by a given Element constructor. */
export const getNameByTypeOfElement = (/** @type {typeof HTMLElement} */ TypeOfHTMLElement) => {
	const internals = INTERNALS_FOR<ElementRegistryInternals>(customElements)

	return internals.nameByConstructor?.get(TypeOfHTMLElement)?.toLowerCase() || null
}

export const getComponentPath = (constructor) => {
	let pathname = ''

	try {
		constructor()
	} catch (error) {
		pathname = error.stack.split('\n').map(line => line.replace(/^[^(]*\(|:\d.*$/g, ''))
	}

	return pathname
}

/** Returns a Astro Web Component from an import glob. */
const toAstroWebComponent = async (imports: { [key: string]: () => Promise<{ default: typeof HTMLElement }> }, importMetaUrl) => {
	const key = Object.keys(imports).pop()
	const url = new URL(key, importMetaUrl)

	const Component = (await imports[key]()).default

	const isHTMLElement = HTMLElement.isPrototypeOf(Component)

	if (!isHTMLElement) throw new Error('Not a web component')

	/** Custom Element tag name, if defined from `customElements`. */
	const definedName = customElements.for(Component)

	/** Custom Element tag name, falling back on the display name. */
	const assuredName = definedName || toHyphenTagName(Component.name)

	const AstroComponent = async ($$result, $$props, $$slots) => {
		$$result.scripts.add({
			props: { type: 'module' },
			children: `import('${url.pathname}').then(exports=>customElements.get('${assuredName}')||customElements.define('${assuredName}',exports.default))`
		})

		return render`${renderComponent($$result, assuredName, assuredName, {}, { "default": () => render`${renderSlot($$result, $$slots["default"])}` })}`;
	}

	AstroComponent.isAstroComponentFactory = true

	return AstroComponent
}

export default toAstroWebComponent

interface NodeInternals {
	ownerDocument: Document;
}

interface CustomElementRegistry {
	for(constructor: typeof HTMLElement): string;
}

interface WindowInternals {
	customElements: CustomElementRegistry;
	document: HTMLDocument;
	location: URL;
}

interface DocumentInternals {
	body: HTMLElement;
	defaultView: WindowInternals;
	documentElement: HTMLHtmlElement;
	head: HTMLHeadElement;
}

interface ElementInternals {
	name: string;
	innerHTML: string;
	shadowRoot: ShadowRoot;
	shadowInit: { mode?: string }
}

interface ElementRegistryInternals {
	constructorByName: Map<string, typeof HTMLElement>;
	nameByConstructor: Map<typeof HTMLElement, string>;
}

type NodeOrString = string | Node