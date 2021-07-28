function makeCanvas(width, height) {
	let canvas = $("<canvas></canvas>", {
		width,
		height
	});
	let container = $("<div class='canvas-container' />");
	container.css({
		position: 'relative',
		width,
		height
	});
	container.append(canvas);
	return container;
}

function make4parties(container) {
	let canvas = container.find('canvas');
	let width = canvas.width();
	let height = canvas.height();
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fillStyle = "white";
	ctx.fill();

	let p1svg = $(MathJax.tex2svg("P_1")).find('svg');
	p1svg.css({
		position: 'absolute',
		left: 20,
		top: 30
	});
	container.append(p1svg);

	

}

function main() {
	let container = makeCanvas(800, 500);
	make4parties(container);

	$('body').append(container);
}
