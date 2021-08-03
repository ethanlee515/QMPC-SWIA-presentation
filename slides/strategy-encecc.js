function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawEncThenQECC();
			break;
		}
		case 1: {
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
		case 2: {
			location.href = "strategy-homecc.html";
			break;
		}
	}
}
