import { lerp } from "./lib/matrix.js";

const protanomalyRgbJs = document.querySelector("#protanomaly-rgb-js");
const protanomalyLmsJs = document.querySelector("#protanomaly-lms-js");
const protanomalyRgbGlsl = document.querySelector("#protanomaly-rgb-glsl");
const protanomalyRgbWgsl = document.querySelector("#protanomaly-rgb-wgsl");

const protanomalyColorMatrix = document.querySelector("#protanomaly-color-matrix");

function draw() {
	requestAnimationFrame(() => {
		const now = performance.now();
		protanomalyRgbJs.globals = { t: (now % 5000) / 5000 };
		protanomalyLmsJs.globals = { t: (now % 5000) / 5000 };
		protanomalyRgbGlsl.globals = { t: (now % 5000) / 5000 };
		protanomalyColorMatrix.setAttribute("values", computeProtanomaly((now % 5000) / 5000).flat().join(" "));
		protanomalyRgbWgsl.globals = [(now % 5000) / 5000 ];
		draw();
	});
}
draw();

//This is feColorMatrix 5x4 format!
function computeProtanomaly(t){
	const protanopia = [
		[0.1120, 0.8853, -0.0005, 0, 0],
		[0.1126, 0.8897, -0.0001, 0, 0],
		[0.0045, 0.0001, 1.00191, 0, 0],
		[0, 0, 0, 1, 0]
	];
	const normalVision = [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0]
	];

	return lerp(normalVision, protanopia, t);
}