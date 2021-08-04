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
			location.href = "strategy-ours.html";
			break;
		}
	}
}
