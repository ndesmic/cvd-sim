function loadImage(url) {
	return new Promise((res, rej) => {
		const image = new Image();
		image.src = url;
		image.onload = () => res(image);
		image.onerror = rej;
	});
}

export class SvgCalc{
	_canvas;
	_context;
	_width;
	_height;
	_lanes;
	constructor(lanes = 1){
		this._lanes = lanes;
		this._canvas = document.createElement("canvas");
		this._canvas.width = lanes;
		this._canvas.height = lanes;
		this._height = lanes;
		this._width = lanes;
		this._context = this._canvas.getContext("2d");
	}
	async run(color, colorMatrix){
		this._context.fillRect(0, 0, 1, 1);

		const svg = encodeURIComponent(`
		<svg xmlns="http://www.w3.org/2000/svg" width="${this._lanes}" height="${this.lanes}">
			<defs>
				<filter id="test">
					<feColorMatrix type="matrix" values="
						${colorMatrix.join(" ")}
					" />
				</filter>
			</defs>
			<rect x="0" y="0" height="${this._lanes}" width="${this._lanes}" fill="${color}" filter="url(#test)" />
		</svg>
		`);

		const image = await loadImage(`data:image/svg+xml,${svg}`);
		this._context.drawImage(image, 0, 0);

		return [...this._context.getImageData(0,0,this._width,this._height).data].map(x => x / 255);
	}
	get canvas() {
		return this._canvas;
	}
}