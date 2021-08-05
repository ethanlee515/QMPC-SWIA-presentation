function drawOurStrategy() {
	let canvas = $("#our-strategy");
	let y1 = 60;
	let y2 = 100;
	let y3 = 140;

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
			drawOurStrategy();
			break;
		}
		case 1: {
			let canvas = $("#our-strategy");
			let ctx = canvas[0].getContext("2d");
			ctx.setLineDash([8, 3]);

			let [pktX, pktY] = getPacketRads();
			let y1 = 60;
			let y3 = 140;

			let width = (x_eval + 20) - (x_commit - 20);
			let rectTop = y1 - pktY - 5;
			let rectBot = y3 + pktY + 5;
			let height = rectBot - rectTop;
			ctx.strokeStyle = "#55F";
			ctx.strokeRect(x_commit - 20, rectTop, width, height);

			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.font = "30px sans-serif";
			ctx.fillStyle = "#55F";
			ctx.fillText("Local Homomorphic Evaluation", x_eval - 300, 0);
			break;
		}
		case 5: {
			location.href = "summary.html";
			break;
		}
	}
}
