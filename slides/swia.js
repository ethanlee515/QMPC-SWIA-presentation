function makeCanvasWithParties(width, height) {
	let container = makeCanvas(width, height);
	container.css({
		position: 'fixed',
		right: 50,
		bottom: 50
	});
	$('body').append(container);
	make4parties(container);	
	return container;
}

function illustrateLostMessage(width, height) {
	let container = makeCanvasWithParties(width, height);
	//Redraw party 1 as malicious
	drawParty(container, 1, true);

	let canvas = container.find("canvas");
	drawLineBetweenParties(1, 2, canvas, true);
	let [p1x, p1y] = getPartyLocation(canvas, 1);
	let [p2x, p2y] = getPartyLocation(canvas, 2);
	let crossX = (p1x + p2x) / 2;
	let crossY = (p1y + p2y) / 2;
	let crossRadius = 20;
	let ctx = canvas[0].getContext("2d");
	ctx.strokeStyle = "#F00";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(crossX + crossRadius, crossY - crossRadius);
	ctx.lineTo(crossX - crossRadius, crossY + crossRadius);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(crossX - crossRadius, crossY - crossRadius);
	ctx.lineTo(crossX + crossRadius, crossY + crossRadius);
	ctx.stroke();
	return container;
}

let container;

function nextSlide() {
	let canvasWidth = 800;
	let canvasHeight = 500;

	function makeAbortMessage(corruption) {
		let abortText = $("<p>ABORT</p>");
		abortText.css({
			"margin": "5px 0",
			"font-size": "xx-large",
			"display": "flex",
			"justify-content": "center"
		});
		let idText = $(`<p>${corruption}</p>`);
		idText.css({
			"margin": "5px 0",
			"font-size": "x-large",
			"display": "flex",
			"justify-content": "center"
		});

		let abortMessage = $("<div></div>");
		abortMessage.append(abortText);
		abortMessage.append(idText);

		let abortMessageWidth = 2 * canvasWidth / 5;
		let abortMessageHeight = canvasHeight / 4;
		abortMessage.css({
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"color": "#a00",
			"flex-direction": "column",

			"border-radius": 10,
			"background-color": "#faa",
			"border-style": "solid",
			"border-width": "thick",
			"border-color": "#f55",
			"position": "absolute",
			"left": canvasWidth / 2 - abortMessageWidth / 2,
			"top": canvasHeight / 2 - abortMessageHeight / 2,
			"width": abortMessageWidth,
			"height": abortMessageHeight
		});
		return abortMessage;
	}

	switch(currentSlide) {
		case 0: {
			let container = makeCanvasWithParties(canvasWidth, canvasHeight);
			let canvas = container.find("canvas");
			drawLineBetweenParties(4, 1, canvas, true);

			let abortMessage = makeAbortMessage("Player 4 is malicious!");
			container.append(abortMessage);
			break;
		}
		case 4: {
			$('.canvas-container').remove();
			container = illustrateLostMessage(canvasWidth, canvasHeight);
			break;
		}
		case 6: {
			let abortMessage = makeAbortMessage("Who is malicious...?");
			$('.canvas-container').append(abortMessage);
			break;
		}
		case 7: {
			drawParty(container, 1, false);
			drawParty(container, 2, true);
			break;
		}
		case 9: {
			location.href = "main-theorem.html";
			break;
		}
	}
}
