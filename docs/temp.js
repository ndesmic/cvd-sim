import { clampVector, multiplyMatrixVector, crossMultiplyMatrixVector, multiplyMatrix, transpose } from "./lib/matrix.js";
import { GlslCalc } from "./lib/glsl-calc.js";
import { SvgCalc } from "./lib/svg-calc.js";

function printColor(color) {
	return `background-color: rgba(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255}, ${color[3]}); padding: 8px;`;
}

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


function tritanopia(l, m, s){
	if(m/l > 1){
		return [l, m, -1 * (-0.00730255 * l + 0.0930085 * m) / -0.15664945]
	} else {
		return [l, m, -1 * (0.02225900000000003 * l - 0.12637000000000004 * m) / 0.10411100000000001]
	}
}
