function makeCanvas(width, height) {
	let canvas = $(`<canvas width='${width}' height = '${height}'></canvas>`);
	let container = $("<div class='canvas-container' />");
	container.css({
		width,
		height
	});
	container.append(canvas);
	return container;
}

function getPartyLocation(canvas, p) {
	let width = canvas.width();
	let height = canvas.height();
	switch(p) {
		case 1:
			return [width / 5, height / 5];
		case 2:
			return [4 * width / 5, height / 5];
		case 3:
			return [width / 5, 4 * height / 5];
		case 4:
			return [4 * width / 5, 4 * height / 5];
	}
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

	function drawParty(partyID) {
		let [partyX, partyY] = getPartyLocation(canvas, partyID);
		let partyRadius = height / 10;
		ctx.beginPath();
		ctx.arc(partyX, partyY, partyRadius, 0, 2 * Math.PI);
		ctx.stroke();

		let svg = $(MathJax.tex2svg(`\\huge{P_${partyID}}`, {
			scale: 3
		})).find('svg');
		container.append(svg);
		svg.on("load", () => {
			svg.css({
				position: 'absolute',
				left: partyX - svg.width() / 2,
				top: partyY - svg.height() / 2
			});
		});
	}
	for(let i = 1; i <= 4; ++i) {
		drawParty(i);
	}
}

function drawLineBetweenParties(pi, pj, canvas, isArrow) {
	let [piLocX, piLocY] = getPartyLocation(canvas, pi);
	let [pjLocX, pjLocY] = getPartyLocation(canvas, pj);
	let startX = (5 * piLocX + pjLocX) / 6;
	let startY = (5 * piLocY + pjLocY) / 6;
	let endX = (piLocX + 5 * pjLocX) / 6;
	let endY = (piLocY + 5 * pjLocY) / 6;
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	if(isArrow) {
		let dy = endY - startY;
		let dx = endX - startX;
		let theta = Math.atan2(dy, dx) + Math.PI;
		for(let dtheta of [-Math.PI / 6, Math.PI / 6]) {
			let r = 20;
			let t = theta + dtheta;
			let vx = endX + r * Math.cos(t);
			let vy = endY + r * Math.sin(t);
			ctx.beginPath();
			ctx.moveTo(vx, vy);
			ctx.lineTo(endX, endY);
			ctx.stroke();
		}
	}
}

let currentSlide = 0;

function main() {
	nextSlide();
	$('body').keydown(e => {
		if(e.key == "ArrowRight") {
			currentSlide++;
			nextSlide();
		}
	});
}

