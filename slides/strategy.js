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
	ctx.fillText("enc", (x_in + x_commit) / 2, y - 25);
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
	let canvas = $("#enc-then-qecc");
	let y1 = 20;
	let y2 = 60;
	let y3 = 100;

	/* Input */
	drawDataAt(canvas, x_in, y2);

	/* Commit */
	drawArrow(canvas, x_in + 50, y2, x_commit - 50, y2, 20);
	drawDataAt(canvas, x_commit, y2, "#EE5");
	
	/* ECC */
	let x_ecc = (x_commit + x_eval) / 2;
	drawPacketAt(canvas, x_ecc, y1);
	drawPacketAt(canvas, x_ecc, y2);
	drawPacketAt(canvas, x_ecc, y3);

	drawArrow(canvas, x_commit + 25, y2, x_ecc - 25, y1, 20);
	drawArrow(canvas, x_commit + 25, y2, x_ecc - 25, y2, 20);
	drawArrow(canvas, x_commit + 25, y2, x_ecc - 25, y3, 20);
}

function drawHomomorphicQECC() {
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

function drawOurStrategy() {
	let canvas = $("#our-strategy");
	let y1 = 25;
	let y2 = 65;
	let y3 = 105;

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

	/** Server Ops **/

	let x_homo_ecc_dec = x_commit + 400 / 3;
	let x_homo_eval = x_commit + 800 / 3;
	
	/* Homo_ECC_Dec */

	drawArrow(canvas, x_commit + 20, y1, x_homo_ecc_dec - 20, y2, 0);
	drawArrow(canvas, x_commit + 20, y2, x_homo_ecc_dec - 20, y2, 20, true);
	drawArrow(canvas, x_commit + 20, y3, x_homo_ecc_dec - 20, y2, 0);
	drawDataAt(canvas, x_homo_ecc_dec, y2, "#EE5");

	/* eval */
	drawArrow(canvas, x_homo_ecc_dec + 25, y2, x_homo_eval - 25, y2, 20);
	drawDataAt(canvas, x_homo_eval, y2, "#EE5");

	/* Homo_ECC_Enc */
	drawArrow(canvas, x_homo_eval + 25, y2, x_eval - 25, y1, 20);
	drawArrow(canvas, x_homo_eval + 25, y2, x_eval - 25, y2, 20);
	drawArrow(canvas, x_homo_eval + 25, y2, x_eval - 25, y3, 20);
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

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawTypicalMPC();
			drawEncThenQECC();
			drawHomomorphicQECC();
			drawOurStrategy();
			break;
		}
		case 2: {
			let canvas = $("#enc-then-qecc");
			let y1 = 20;
			let y2 = 60;
			let y3 = 100;

			let x_ecc = (x_commit + x_eval) / 2;
			drawPacketAt(canvas, x_ecc, y1, "#FAA");
			drawPacketAt(canvas, x_ecc, y2, "#FAA");
			drawPacketAt(canvas, x_ecc, y3, "#FAA");

			break;
		}
		case 4: {
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
		case 6: {
			let canvas = $("#our-strategy");
			let ctx = canvas[0].getContext("2d");
			ctx.setLineDash([8, 3]);

			let [pktX, pktY] = getPacketRads();
			let y1 = 25;
			let y3 = 105;

			let width = (x_eval + 20) - (x_commit - 20);
			let rectTop = y1 - pktY - 5;
			let rectBot = y3 + pktY + 5;
			let height = rectBot - rectTop;
			ctx.strokeStyle = "#55F";
			ctx.strokeRect(x_commit - 20, rectTop, width, height);

			ctx.textAlign = "left";
			ctx.font = "30px sans-serif";
			ctx.fillStyle = "#55F";
			ctx.fillText("Homomorphic Encryption", x_eval - 300, rectBot + 30);

			break;
		}
		case 7: {
			//TODO go to next page
			break;
		}
	}
}
