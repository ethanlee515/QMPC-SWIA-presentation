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
		case 2: {
			location.href = "summary.html";
			break;
		}
	}
}
