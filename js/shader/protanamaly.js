export default function(color, Matrix){
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

	const protanopia = [
		[0, 2.02344, -2.52581, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	];

	const normalVision = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	];

	const d = Matrix.lerp(normalVision, protanopia, 0.5);

	var result = Matrix.crossMultiplyMatrixVector(
		Matrix.crossMultiplyMatrixVector(
			Matrix.crossMultiplyMatrixVector(color, rgbToLms),
			d
		),
		lmsToRgb
	);

	return result;
}