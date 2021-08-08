function drawEccEnc() {
	let canvas = $("#homomorphic-qecc");
	let y1 = 20;
	let y2 = 60;
	let y3 = 100;

	/* Input */
	drawDataAt(canvas, x_in, y2);

	/* ECC */
	let x_ecc = (x_in + x_commit) / 2;
	drawPacketAt(canvas, x_ecc, y1);
	drawPacketAt(canvas, x_ecc, y2);
	drawPacketAt(canvas, x_ecc, y3);

	drawArrow(canvas, x_in + 25, y2, x_ecc - 25, y1, 20);
	drawArrow(canvas, x_in + 25, y2, x_ecc - 25, y2, 20);
	drawArrow(canvas, x_in + 25, y2, x_ecc - 25, y3, 20);

	/* Commit */
	drawArrow(canvas, x_ecc + 25, y1, x_commit - 25, y1, 20);
	drawArrow(canvas, x_ecc + 25, y2, x_commit - 25, y2, 20);
	drawArrow(canvas, x_ecc + 25, y3, x_commit - 25, y3, 20);
	drawPacketAt(canvas, x_commit, y1, "#EE5");
	drawPacketAt(canvas, x_commit, y2, "#EE5");
	drawPacketAt(canvas, x_commit, y3, "#EE5");
}

function drawHomomorphicQECC() {
	let canvas = $("#homomorphic-qecc");
	let y1 = 20;
	let y2 = 60;
	let y3 = 100;
	
	/* eval */
	drawArrow(canvas, x_commit + 50, y1, x_eval - 50, y1, 20);
	drawArrow(canvas, x_commit + 50, y2, x_eval - 50, y2, 20);
	drawArrow(canvas, x_commit + 50, y3, x_eval - 50, y3, 20);
	drawPacketAt(canvas, x_eval, y1, "#EE5");
	drawPacketAt(canvas, x_eval, y2, "#EE5");
	drawPacketAt(canvas, x_eval, y3, "#EE5");

	/* ECC Dec */
	let x_ecc_dec = (x_eval + x_dec) / 2;
	drawArrow(canvas, x_eval + 25, y1, x_ecc_dec - 25, y1, 20);
	drawArrow(canvas, x_eval + 25, y2, x_ecc_dec - 25, y2, 20);
	drawArrow(canvas, x_eval + 25, y3, x_ecc_dec - 25, y3, 20);
	drawPacketAt(canvas, x_ecc_dec, y1);
	drawPacketAt(canvas, x_ecc_dec, y2);
	drawPacketAt(canvas, x_ecc_dec, y3);

	/* Dec */
	drawDataAt(canvas, x_dec, y2);
	drawArrow(canvas, x_ecc_dec + 25, y1, x_dec - 25, y2, 0);
	drawArrow(canvas, x_ecc_dec + 25, y2, x_dec - 25, y2, 20);
	drawArrow(canvas, x_ecc_dec + 25, y3, x_dec - 25, y2, 0);

}

function drawHomECC() {
	//1600 x 200
	let y1 = 50;
	let y2 = 100;
	let y3 = 150;
	let wireStart = 500;
	let cnot1 = 700;
	let cnot2 = 900;
	let wireEnd = 1100;

	let gateRad = 10;

	let canvas = $("#hom-ecc");
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000";

	//draw wires
	for(let y of [y1, y2, y3]) {
		ctx.beginPath();
		ctx.moveTo(wireStart, y);
		ctx.lineTo(wireEnd, y);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.moveTo(cnot1, y1 - gateRad);
	ctx.lineTo(cnot1, y3 + gateRad);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(cnot2, y2 - gateRad);
	ctx.lineTo(cnot2, y3 + gateRad);
	ctx.stroke();

	for(let ctrl of [[cnot1, y1], [cnot2, y2]]) {
		ctx.beginPath();
		ctx.arc(ctrl[0], ctrl[1], gateRad, 0, 2 * Math.PI);
		ctx.stroke();
	}

	for(let tgt of [[cnot1, y3], [cnot2, y3]]) {
		ctx.beginPath();
		ctx.arc(tgt[0], tgt[1], gateRad, 0, 2 * Math.PI);
		ctx.fill();
	}

	let container = $("#hom-ecc-container");

	//ancilla
	let svg1 = $(MathJax.tex2svg(`|0\\rangle`)).find('svg');
	container.append(svg1);
	svg1.attr('id', 'ancilla');
	svg1.css({
		position: 'absolute',
		left: wireStart - 10 - svg1.width(),
		top: y3 - svg1.height() / 2
	});
	svg1.on("load", () => {
		svg1.css({
			position: 'absolute',
			left: wireStart - 10 - svg1.width(),
			top: y3 - svg1.height() / 2
		});
	});
}

function drawHomEccIO() {
	$('#ancilla').remove();

	let y1 = 50;
	let y2 = 100;
	let y3 = 150;
	let wireStart = 500;
	let wireEnd = 1100;

	let container = $("#hom-ecc-container");

	//first input
	let svg1 = $(MathJax.tex2svg(`\\color{OrangeRed}{|100\\rangle}`)).find('svg');
	container.append(svg1);
	svg1.css({
		position: 'absolute',
		left: wireStart - 10 - svg1.width(),
		top: y1 - svg1.height() / 2
	});
	svg1.on("load", () => {
		svg1.css({
			position: 'absolute',
			left: wireStart - 10 - svg1.width(),
			top: y1 - svg1.height() / 2
		});
	});

	//second input
	let svg2 = $(MathJax.tex2svg(`\\color{OrangeRed}{|010\\rangle}`)).find('svg');
	container.append(svg2);
	svg2.css({
		position: 'absolute',
		left: wireStart - 10 - svg2.width(),
		top: y2 - svg2.height() / 2
	});
	svg2.on("load", () => {
		svg2.css({
			position: 'absolute',
			left: wireStart - 10 - svg2.width(),
			top: y2 - svg2.height() / 2
		});
	});

	//last input
	let svg3 = $(MathJax.tex2svg(`|0\\rangle\\mapsto|000\\rangle`)).find('svg');
	container.append(svg3);
	svg3.css({
		position: 'absolute',
		left: wireStart - 10 - svg3.width(),
		top: y3 - svg3.height() / 2
	});
	svg3.on("load", () => {
		svg3.css({
			position: 'absolute',
			left: wireStart - 10 - svg3.width(),
			top: y3 - svg3.height() / 2
		});
	});

	//first output
	let svg4 = $(MathJax.tex2svg(`|100\\rangle\\mapsto|0\\rangle`)).find('svg');
	container.append(svg4);
	svg4.css({
		position: 'absolute',
		left: wireEnd + 10,
		top: y1 - svg4.height() / 2
	});
	svg4.on("load", () => {
		svg4.css({
			position: 'absolute',
			left: wireEnd + 10,
			top: y1 - svg4.height() / 2
		});
	});

	//second output
	let svg5 = $(MathJax.tex2svg(`|010\\rangle\\mapsto|0\\rangle`)).find('svg');
	container.append(svg5);
	svg5.css({
		position: 'absolute',
		left: wireEnd + 10,
		top: y2 - svg5.height() / 2
	});
	svg5.on("load", () => {
		firstOutput.css({
			position: 'absolute',
			left: wireEnd + 10,
			top: y2 - svg5.height() / 2
		});
	});

	//third output
	let svg6 = $(MathJax.tex2svg(`|110\\rangle\\mapsto|1\\rangle`)).find('svg');
	container.append(svg6);
	svg6.css({
		position: 'absolute',
		left: wireEnd + 10,
		top: y3 - svg6.height() / 2
	});
	svg6.on("load", () => {
		firstOutput.css({
			position: 'absolute',
			left: wireEnd + 10,
			top: y3 - svg6.height() / 2
		});
	});

}

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawEccEnc();
			break;
		}
		case 1: {
			drawHomomorphicQECC();
			break;
		}
		case 2: {
			let canvas = $("#homomorphic-qecc");
			let y1 = 20;
			let y2 = 60;
			let y3 = 100;

			let x_ecc = (x_in + x_commit) / 2;
			drawPacketAt(canvas, x_ecc, y1, "#FAA");
			drawPacketAt(canvas, x_ecc, y2, "#FAA");
			drawPacketAt(canvas, x_ecc, y3, "#FAA");

			let x_cross = (x_in + x_ecc) / 2;
			let cross_rad_x = (x_cross - x_in) / 3;
			let cross_rad_y = y2 - y1;

			let ctx = canvas[0].getContext("2d");
			ctx.strokeStyle = "#F00";

			ctx.beginPath();
			ctx.moveTo(x_cross - cross_rad_x, y2 - cross_rad_y);
			ctx.lineTo(x_cross + cross_rad_x, y2 + cross_rad_y);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(x_cross - cross_rad_x, y2 + cross_rad_y);
			ctx.lineTo(x_cross + cross_rad_x, y2 - cross_rad_y);
			ctx.stroke();

			ctx.strokeStyle = "#000";

			break;
		}
		case 5: {
			drawHomECC();
			break;
		}
		case 6: {
			drawHomEccIO();
			break;
		}
		case 8: {
			location.href = "strategy-ours.html";
			break;
		}
	}
}
