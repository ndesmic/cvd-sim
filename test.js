function srgbToRgb(color) {
	return color.map(component => {
		const sign = component < 0 ? -1 : 1; const abs = Math.abs(component); return abs <= 0.04045 ? component
			/ 12.92 : sign * Math.pow((abs + 0.055) / 1.055, 2.4);
	});
} 

function rgbToSrgb(color) {
	return color.map(component => {
		return component < 0.0031308 ? component * 12.92 : 1.055 * Math.pow(component, 1 / 2.4) - 0.055
	});
} 

const e = [65.5178, 34.4782, 1.68427, 1]; //RGB white in LMS space
function lmsColorToTritanopia([l, m, s, alpha]) { //input "Q"
	const anchor = (m / l) < (e[1] / e[0]) // anchor "A"
		? [9.30085E-02, 7.30255E-03, 0.0] //660nm
		: [1.63952E-01, 2.68063E-01, 2.90322E-01] //485nm
	
	const a = (e[1] * anchor[2]) - (e[2] * anchor[1]);
	const b = (e[2] * anchor[0]) - (e[0] * anchor[2]);
	const c = (e[0] * anchor[1]) - (e[1] * anchor[0]);
	return [l, m, -((a * l) + (b * m)) / c, alpha ];
}

//Smith and Porkony
const rgbToLms = [
	[17.8824, 43.5161, 4.1193, 0],
	[3.4557, 27.1554, 3.8671, 0],
	[0.02996, 0.18431, 1.4700, 0],
	[0, 0, 0, 1]
];

const lmsToRgb = [
	[0.0809, -0.1305, 0.1167, 0],
	[-0.0102, 0.0540, -0.1136, 0],
	[-0.0003, -0.0041, 0.6932, 0],
	[0, 0, 0, 1]
];

//Hunt-Pointer-Estevez
const rgbToLms2 = [
	[31.3989492, 63.95129383, 4.64975462, 0],
	[15.53714069, 75.78944616, 8.67014186, 0],
	[1.77515606, 10.94420944, 87.25692246, 0],
	[0, 0, 0, 1]
];

const lmsToRgb2 = [
	[0.0547, -0.0464, 0.0017, 0],
	[-0.0112, 0.0229, -0.0017, 0],
	[0.0002, -0.0019, 0.0116, 0],
	[0, 0, 0, 1]
];


export default function(color, Matrix, Globals){
	const linearColor = srgbToRgb(color);
	const lmsColor = Matrix.crossMultiplyMatrixVector(linearColor, rgbToLms2);
	const lmsTritanopia = lmsColorToTritanopia(lmsColor);
	const rgbTritanopia = Matrix.crossMultiplyMatrixVector(lmsTritanopia, lmsToRgb2);
	const srgbResult = rgbToSrgb(rgbTritanopia);
	return srgbResult;
}