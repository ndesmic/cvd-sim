import { clampVector, multiplyMatrixVector, crossMultiplyMatrixVector, multiplyMatrix, transpose } from "./lib/matrix.js";
import { GlslCalc } from "./lib/glsl-calc.js";
import { SvgCalc } from "./lib/svg-calc.js";

function printColor(color){
	return `background-color: rgba(${color[0]*255}, ${color[1]*255}, ${color[2]*255}, ${color[3]}); padding: 8px;`;
}

(async () => {


	const rgbToLms = [
		[17.8824, 43.5161, 4.1193, 0],
		[3.4557, 27.1554, 3.8671, 0],
		[0.02996, 0.18431, 1.4700, 0],
		[0, 0, 0, 1]
	];

	const protanopia = [
		[0, 2.02344, -2.52581, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	];

	const deuteranopia = [
		[1, 0, 0, 0],
		[0.4942, 0, 1.2483, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	];

	const tritanopia = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[-0.3959, 0.8011, 0, 0],
		[0, 0, 0, 1]
	]

	const tritanopiaFixed = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0.05, 0, 0],
		[0, 0, 0, 1],
	];

	const lmsToRgb = [
		[0.0809, -0.1305, 0.1167, 0],
		[-0.0102, 0.0540, -0.1136, 0],
		[-0.0003, -0.0041, 0.6932, 0],
		[0, 0, 0, 1]
	];

	console.log("protanopia", multiplyMatrix(lmsToRgb, multiplyMatrix(protanopia, rgbToLms)));
	console.log("deuteranopia", multiplyMatrix(lmsToRgb, multiplyMatrix(deuteranopia, rgbToLms)));
	console.log("tritanopia", multiplyMatrix(lmsToRgb, multiplyMatrix(tritanopia, rgbToLms)));
	console.log("tritanopiaFixed", multiplyMatrix(lmsToRgb, multiplyMatrix(tritanopiaFixed, rgbToLms)));



	const calc = new GlslCalc();
	const redProtanoptaGl = calc.runFragmentShader(`
		precision highp float;
    
        mat4 protanopia = mat4(
        0.1120, 0.8853, -0.0005, 0,
		0.1126, 0.8897, -0.0001, 0,
		0.0045, 0.0001, 1.00191, 0,
		0	  , 0	  , 	  0, 1);
    
        void main() {
			vec4 source = vec4(1.0, 0.0, 0.0, 1.0);
			gl_FragColor = source * protanopia;
		}
	`);
	console.log("%c ", printColor(redProtanoptaGl), "redRgbProtanopia (GLSL)", redProtanoptaGl);

	const redRgbProtanopiaJs = crossMultiplyMatrixVector([1, 0, 0, 1], [
		[0.1120, 0.8853, -0.0005, 0],
		[0.1126, 0.8897, -0.0001, 0],
		[0.0045, 0.0001, 1.00191, 0],
		[0, 0, 0, 1]
	]);
	console.log("%c ", printColor(redRgbProtanopiaJs), "redRgbProtanopia (JS)", redRgbProtanopiaJs);
	
	const svgCalc = new SvgCalc();
	const redRgbProtanopiaSvg = await svgCalc.run("#ff0000", [
		0.5,  0, 0, 0, 0, 
0 ,   0, 0, 0, 0, 
0,    0, 0, 0, 0, 
0 ,   0, 0, 1, 0]);
	console.log("%c ", printColor(redRgbProtanopiaSvg), "halfRed (SVG)", redRgbProtanopiaSvg);
})();