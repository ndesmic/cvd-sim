export function loadImage(url) {
	return new Promise((res, rej) => {
		const image = new Image();
		image.src = url;
		image.onload = () => res(image);
		image.onerror = rej;
	});
}

export function srgbToRgb(color) {
	return color.map(component => {
		const sign = component < 0 ? -1 : 1; 
		const abs = Math.abs(component); 
		return abs <= 0.04045
			? component / 12.92
			: sign * Math.pow((abs + 0.055) / 1.055, 2.4);
	});
}

export function rgbToSrgb(color) {
	return color.map(component => {
		component < 0.0031308
			? component * 12.92
			: 1.055 * Math.pow(component, 1/2.4) - 0.055
	});
}