function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawHomomorphicQECC();
			break;
		}
		case 1: {
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
		case 2: {
			location.href = "strategy-ours.html";
			break;
		}
	}
}
