customElements.define("dom-view",
	class extends HTMLElement {
		static get observedAttributes(){
			return [];
		}
		constructor(){
			super();
			this.bind(this);
		}
		bind(element){
			element.attachEvents = element.attachEvents.bind(element);
			element.cacheDom = element.cacheDom.bind(element);
		}
		connectedCallback(){
			this.cacheDom();
			this.attachEvents();

			this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			this.svg.setAttribute("width", document.documentElement.clientWidth);
			this.svg.setAttribute("height", document.documentElement.clientHeight);
			this.foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
			this.foreignObject.setAttribute("width", document.documentElement.clientWidth);
			this.foreignObject.setAttribute("height", document.documentElement.clientHeight);
			this.svg.appendChild(this.foreignObject);
			this.foreignObject.innerHTML = window.document.documentElement.innerHTML;
			const svgString = new XMLSerializer().serializeToString(this.svg);
			this.textEncoder = new TextEncoder();

			const svgBuffer = this.textEncoder.encode(svgString);
			const svgUrl = window.URL.createObjectURL(new Blob([svgBuffer], { type: "image/svg+xml" }));

			const img = document.createElement("img");

			document.body.appendChild(img);

			this.canvas = document.createElement("canvas");
			this.context = this.canvas.getContext("2d");

			img.src = svgUrl;
			img.onload = () => {
				this.context.drawImage(img, 0, 0);
			}
		}
		cacheDom(){
			this.dom = {};
		}
		attachEvents(){

		}
		attributeChangedCallback(name, oldValue, newValue){
			this[name] = newValue;
		}
	}
)
