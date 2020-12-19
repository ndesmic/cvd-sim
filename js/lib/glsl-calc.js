export class GlslCalc {
	_lanes;
	_canvas;
	_context;
	_vertexShader;
	_program;
	_fragmentShader;
	_vertexBuffer;
	_indexBuffer;
	constructor(lanes = 1){
		this._lanes = lanes;
		this._canvas = document.createElement("canvas");
		this._canvas.width = lanes;
		this._canvas.height = lanes;
		this._context = this._canvas.getContext("webgl2");

		const vertexShaderSource = `
			precision highp float;
			attribute vec3 aVertexPosition;

			void main(){
				gl_Position = vec4(aVertexPosition, 1.0);
			}
		`;
		this._vertexShader = this._context.createShader(this._context.VERTEX_SHADER);
		this._context.shaderSource(this._vertexShader, vertexShaderSource);
		this._context.compileShader(this._vertexShader);

		if (!this._context.getShaderParameter(this._vertexShader, this._context.COMPILE_STATUS)) {
			throw new Error("Failed to compile vertex shader");
		}

		this._program = this._context.createProgram();
		this._context.attachShader(this._program, this._vertexShader);
		this._vertexBuffer = this._context.createBuffer();
		this._context.bindBuffer(this._context.ARRAY_BUFFER, this._vertexBuffer);
		this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array([
			-1.0, -1.0,
			1.0, -1.0,
			1.0, 1.0,
			-1.0, 1.0
		]), this._context.STATIC_DRAW);

		this._indexBuffer = this._context.createBuffer();
		this._context.bindBuffer(this._context.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
		this._context.bufferData(this._context.ELEMENT_ARRAY_BUFFER, new Uint16Array([
			0, 1, 2,
			0, 2, 3
		]), this._context.STATIC_DRAW);
	}
	runFragmentShader(fragmentShaderSource){
		if(this._fragmentShader){
			this._context.detachShader(this._program, this._fragmentShader);
			this._context.deleteShader(this._fragmentShader);
		}
		this._fragmentShader = this._context.createShader(this._context.FRAGMENT_SHADER);
		this._context.shaderSource(this._fragmentShader, fragmentShaderSource);
		this._context.compileShader(this._fragmentShader);

		if (!this._context.getShaderParameter(this._fragmentShader, this._context.COMPILE_STATUS)) {
			throw new Error(this._context.getShaderInfoLog(this._fragmentShader));
		}

		this._context.attachShader(this._program, this._fragmentShader);

		this._context.linkProgram(this._program);
		const positionLocation = this._context.getAttribLocation(this._program, "aVertexPosition");
		this._context.enableVertexAttribArray(positionLocation);
		this._context.vertexAttribPointer(positionLocation, 2, this._context.FLOAT, false, 0, 0);

		this._context.useProgram(this._program);

		//this.#context.drawArrays(this.#context.POINTS, 0, 1);
		this._context.clear(this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT);
		this._context.drawElements(this._context.TRIANGLES, 6, this._context.UNSIGNED_SHORT, 0);

		const array = new Uint8Array(this._lanes * this._lanes * 4);
		this._context.readPixels(0, 0, this._lanes, this._lanes, this._context.RGBA, this._context.UNSIGNED_BYTE, array);
		return [...array].map(x => x / 255);
	}
	get canvas(){
		return this._canvas;
	}
}