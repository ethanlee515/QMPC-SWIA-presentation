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
	//Upper right line
	ctx.lineTo(x + packetRadX, y - packetRadY + 2 * packetRadX);
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

function drawArrow(canvas, startX, startY, endX, endY, r, wide) {
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	let dy = endY - startY;
	let dx = endX - startX;
	let theta = Math.atan2(dy, dx) + Math.PI;
	for(let dtheta of [-Math.PI / 6, Math.PI / 6]) {
		if(wide)
			dtheta *= 2;
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


