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

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			drawTypicalMPC();
			break;
		}
		case 9: {
			location.href = "strategy-encecc.html";
			break;
		}
	}
}
