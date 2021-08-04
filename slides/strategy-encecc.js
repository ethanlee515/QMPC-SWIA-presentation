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

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawEncThenQECC();
			break;
		}
		case 3: {
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
			location.href = "strategy-homecc.html";
			break;
		}
	}
}
