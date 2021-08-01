function getPacketRads() {
	return [11, 16];
}

function drawPacketAt(canvas, x, y, fill) {
	let [packetRadX, packetRadY] = getPacketRads();
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	//To upper left corner
	ctx.moveTo(x - packetRadX, y - packetRadY);
	//To top of packet
	ctx.lineTo(x, y - packetRadY);
	//Upper right line
	ctx.lineTo(x + packetRadX, y - packetRadY + packetRadX);
	//To bottom right corner
	ctx.lineTo(x + packetRadX, y + packetRadY);
	//To bottom left corner
	ctx.lineTo(x - packetRadX, y + packetRadY);
	//To upper left corner
	ctx.lineTo(x - packetRadX, y - packetRadY);
	ctx.stroke();
	if(fill) {
		ctx.fillStyle = fill;
		ctx.fill();
	}
}

function drawDataAt(canvas, x, y, fill) {
	let [packetRadX, packetRadY] = getPacketRads();
	let startX = x - packetRadX;
	let sizeX = 2 * packetRadX + 1;
	let startY = y - packetRadY;
	let sizeY = 2 * packetRadY + 1;

	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000";
	ctx.strokeRect(startX, startY, sizeX, sizeY);
	if(fill) {
		ctx.fillStyle = fill;
		ctx.fillRect(startX, startY, sizeX, sizeY);
		ctx.fillStyle = "#000";
	}

}

function drawArrow(canvas, startX, startY, endX, endY, r) {
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	let dy = endY - startY;
	let dx = endX - startX;
	let theta = Math.atan2(dy, dx) + Math.PI;
	for(let dtheta of [-Math.PI / 6, Math.PI / 6]) {
		let t = theta + dtheta;
		let vx = endX + r * Math.cos(t);
		let vy = endY + r * Math.sin(t);
		ctx.beginPath();
		ctx.moveTo(vx, vy);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	}
}

/* Above is copied from qubit-sending.js */
/* TODO: Don't duplicate code? */

//1600
//200, 600, 1000, 1400

let x_in = 200;
let x_commit = 600;
let x_eval = 1000;
let x_dec = 1400;

//y = 50
function drawTypicalMPC() {
	let canvas = $("#typical-mpc");
	let ctx = canvas[0].getContext("2d");
	ctx.font = "30px sans-serif";
	ctx.textAlign = "center";
	let y = 50;

	/* Input */
	drawDataAt(canvas, x_in, y);
	/* Commit */
	drawArrow(canvas, x_in + 50, y, x_commit - 50, y, 20);
	ctx.fillText("commit", (x_in + x_commit) / 2, y - 25);
	drawDataAt(canvas, x_commit, y, "#EE5");

	/* Eval */
	drawArrow(canvas, x_commit + 50, y, x_eval - 50, y, 20);
	ctx.fillText("eval", (x_commit + x_eval) / 2, y - 25);
	drawDataAt(canvas, x_eval, y, "#EE5");

	/* Dec */
	drawArrow(canvas, x_eval + 50, y, x_dec - 50, y, 20);
	ctx.fillText("dec", (x_eval + x_dec) / 2, y - 25);
	drawDataAt(canvas, x_dec, y);
}

//y=20, 60, 100
function drawEncThenQECC() {

}

function drawHomomorphicQECC() {

}

function drawOurStrategy() {

}

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawTypicalMPC();
			drawEncThenQECC();
			drawHomomorphicQECC();
			drawOurStrategy();
		}
		default: {
			break;
		}

	}
}
