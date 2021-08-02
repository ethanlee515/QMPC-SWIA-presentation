const canvas_width = 1200;
const canvas_height = 800;
const party_radius = 50;


function setupParties() {
	let p1x = 5 + party_radius;
	let p1y = 5 + party_radius;

	let p2x = canvas_width - 5 - party_radius;
	let rx = p2x - p1x;

	let p5y = canvas_height - 5 - party_radius;
	let ry = p5y - p1y;

	for(let party = 2; party <= 5; ++party) {
		let theta = 30 * (party - 2) * (Math.PI / 180);
		let x = p1x + rx * Math.cos(theta);
		let y = p1y + ry * Math.sin(theta);
		makeClient(x, y, `P_${party}`);
	}
}

function makeClient(x, y, name) {
	let canvas = $('#protocol');
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(x, y, party_radius, 0, 2 * Math.PI);
	ctx.stroke();

	//Name
	let container = $("#canvas-container");
	let svg = $(MathJax.tex2svg(name)).find('svg');
	container.append(svg);
	svg.on("load", () => {
		svg.css({
			position: 'absolute',
			left: x - svg.width() / 2,
			top: y - svg.height() / 2
		});
	});
}


function nextSlide() {
	switch(currentSlide) {
		case 0: {
			setupParties();

		}
	}
}


