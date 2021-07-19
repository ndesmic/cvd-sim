customElements.define("partial-deficency-test",
	class extends HTMLElement {
		static get observedAttributes() {
			return [];
		}
		constructor() {
			super();
			this.bind(this);
		}
		bind(element) {
			element.attachEvents = element.attachEvents.bind(element);
			element.cacheDom = element.cacheDom.bind(element);
		}
		connectedCallback() {
			this.cacheDom();
			this.attachEvents();
		}
		cacheDom() {
			this.dom = {};
		}
		attachEvents() {

		}
		attributeChangedCallback(name, oldValue, newValue) {
			this[name] = newValue;
		}
	}
)
