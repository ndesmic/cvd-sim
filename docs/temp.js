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

const tritanopia = [
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[-0.3959, 0.8011, 0, 0],
	[0, 0, 0, 1]
]

const lmsToRgb = [
	[0.0809, -0.1305, 0.1167, 0],
	[-0.0102, 0.0540, -0.1136, 0],
	[-0.0003, -0.0041, 0.6932, 0],
	[0, 0, 0, 1]
];

const red = [1, 0, 0, 1];

//const redLms = crossMultiplyMatrixVector(red, rgbToLms);
//const redLmsProtonopia = crossMultiplyMatrixVector(redLms, protanopia);
//const redRgbProtonopia = crossMultiplyMatrixVector(redLmsProtonopia, lmsToRgb);

const lmsProtanopia = multiplyMatrix(protanopia, rgbToLms);
const rgbProtanopia = multiplyMatrix(lmsToRgb, lmsProtanopia);

//PRECALC

(async () => {
	const calc = new GlslCalc();

	/*
	console.log("%c ", printColor(red), "red", red);
	const result1 = calc.runFragmentShader(`
		precision highp float;
    
		void main(){
		   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		}
	`);
	console.log("%c ", printColor(result1), "red (expected)", result1);


	console.log("%c ", printColor(redLms), "redLms", clampVector(redLms));
	const result2 = calc.runFragmentShader(`
		precision highp float;
    
		void main(){
			mat4 rgbToLms = mat4(
				17.8824, 43.5161, 4.1193, 0,
				3.4557 , 27.1554, 3.8671, 0,
				0.02996, 0.18431, 1.4700, 0,
				0 , 0 , 0 , 1);

			vec4 source = vec4(1.0, 0.0, 0.0, 1.0);
			gl_FragColor = source * rgbToLms;
		}
	`);
	console.log("%c ", printColor(result2), "redLms (expected)", result2);



	console.log("%c ", printColor(clampVector(redLmsProtonopia)), "redLmsProtanopia", clampVector(redLmsProtonopia));

	const result3 = calc.runFragmentShader(`
		precision highp float;
    
		mat4 rgbToLms = mat4(
		17.8824, 43.5161, 4.1193, 0,
		3.4557 , 27.1554, 3.8671, 0,
		0.02996, 0.18431, 1.4700, 0,
		0 , 0 , 0 , 1);
    
		mat4 protanopia = mat4(
		0 , 2.02344, -2.52581, 0,
		0 , 1 , 0 , 0,
		0 , 0 , 1 , 0,
		0 , 0 , 0 , 1);
    
		void main() {
			vec4 source = vec4(1.0, 0.0, 0.0, 1.0);
	    
			vec4 lms = source * rgbToLms;
			vec4 lmsTarget = lms * protanopia;
	    
			gl_FragColor = lmsTarget;
		}
	`);
	console.log("%c ", printColor(result3), "split calc", result3);
	const result3b = calc.runFragmentShader(`
		precision highp float;
    
		mat4 rgbToLms = mat4(
		17.8824, 43.5161, 4.1193, 0,
		3.4557 , 27.1554, 3.8671, 0,
		0.02996, 0.18431, 1.4700, 0,
		0 , 0 , 0 , 1);
    
		mat4 protanopia = mat4(
		0 , 2.02344, -2.52581, 0,
		0 , 1 , 0 , 0,
		0 , 0 , 1 , 0,
		0 , 0 , 0 , 1);
    
		void main() {
			vec4 source = vec4(1.0, 0.0, 0.0, 1.0);
	    
			mat4 pre = rgbToLms * protanopia;
			vec4 lmsTarget = source * rgbToLms;
	    
			gl_FragColor = lmsTarget;
		}
	`);
	console.log("%c ", printColor(result3b), "precalc", result3);
	console.log("%c ", printColor(clampVector(test1)), "test1", clampVector(test1));

	console.log("%c ", printColor(clampVector(redRgbProtonopia)), "redRgbProtanopia", clampVector(redRgbProtonopia));
		*/
	const result4 = calc.runFragmentShader(`
		precision highp float;
    
        mat4 rgbToLms = mat4(
        17.8824, 43.5161, 4.1193, 0,
        3.4557 , 27.1554, 3.8671, 0,
        0.02996, 0.18431, 1.4700, 0,
        0 , 0 , 0 , 1);
    
        mat4 protanopia = mat4(
        0 , 2.02344, -2.52581, 0,
        0 , 1 , 0 , 0,
        0 , 0 , 1 , 0,
        0 , 0 , 0 , 1);
    
        mat4 lmsToRgb = mat4(
        0.0809 , -0.1305, 0.1167 , 0,
        -0.0102, 0.0540 , -0.1136, 0,
        -0.0003, -0.0041, 0.6932 , 0,
        0 , 0 , 0 , 1);
    
        void main() {
			vec4 source = vec4(1.0, 0.0, 0.0, 1.0);
		
			vec4 lms = source * rgbToLms;
			vec4 lmsTarget = lms * protanopia;
			vec4 target = lmsTarget * lmsToRgb;
		
			gl_FragColor = target;
		}
	`);
	console.log("%c ", printColor(result4), "redRgbProtanopia (GLSL)", result4);

	const redRgbProtanopia2 = crossMultiplyMatrixVector([1, 0, 0, 1], [
		[0.1120, 0.8853, -0.0005, 0],
		[0.1126, 0.8897, -0.0001, 0],
		[0.0045, 0.0001, 1.00191, 0],
		[0, 0, 0, 1]
	]);
	console.log("%c ", printColor(redRgbProtanopia2), "redRgbProtanopia (JS)", redRgbProtanopia2);

	const svgCalc = new SvgCalc();
	const redRgbProtanopiaSvg = await svgCalc.run("#FF0000", [
		0.1120, 0.8853, -0.0005, 0, 0,
		0.1126, 0.8897, -0.0001, 0, 0,
		0.0045, 0.0001, 1.00191, 0, 0,
		0, 0, 0, 1, 0]);
	console.log("%c ", printColor(redRgbProtanopiaSvg), "redRbgProtanopia (SVG)", redRgbProtanopiaSvg);

	/*const tpose = transpose([
		[0.1120, 0.1126, 0.0045, 0],
		[0.8853, 0.8897, -0.0001, 0],
		[0.0045, 0.0000, 1.00191, 0],
		[0, 0, 0, 1]]);
		console.log(tpose)
	const redRgbProtanopiaSvgT = await svgCalc.run("#FF0000", [
		0.1120 , 0.1126, 0.0045, 0, 0,
		0.8853 , 0.8897, 0.0001, 0, 0,
		-0.0005, -0.0001, 1.00191, 0, 0,
		0	   , 0, 0, 1, 0]);
	console.log("%c ", printColor(redRgbProtanopiaSvgT), "redRbgProtanopiaT (SVG)", redRgbProtanopiaSvgT);

	console.log("matrix", rgbProtanopia);*/
})();

```js
//In LMS space
const tritanopia = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [-0.3959, 0.8011, 0, 0],
  [0, 0, 0, 1]
];
```


mat4 tritanopia = mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0.05, 0, 0,
	0, 0, 0, 1);
