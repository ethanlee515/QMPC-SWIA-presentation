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

function getPacketRads() {
	return [11, 16];
}

function drawPacketAt(canvas, x, y, color) {
	if(!color)
		color = "#000";
	else
		console.log("custom colored packet found");

	let [packetRadX, packetRadY] = getPacketRads();
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;
	ctx.strokeStyle = color;
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
}

function drawArrow(canvas, startX, startY, endX, endY, r) {
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	let dy = endY - startY;
	let dx = endX - startX;
	let theta = Math.atan2(dy, dx) + Math.PI;
	for(let dtheta of [-Math.PI / 6, Math.PI / 6]) {
		let t = theta + dtheta;
		let vx = endX + r * Math.cos(t);
		let vy = endY + r * Math.sin(t);
		ctx.beginPath();
		ctx.moveTo(vx, vy);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	}
}

function illustrateECC(canvas) {
	let height = canvas.height();
	let partyRadius = height / 10;
	let [pktRadX, pktRadY] = getPacketRads();
	let [p1x, p1y] = getPartyLocation(canvas, 1);

	let srcX1 = 2;
	let srcY1 = 5 + 3 * pktRadY;

	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	ctx.rect(srcX1, srcY1, 2 * pktRadX + 1, 2 * pktRadY + 1);
	ctx.stroke();

	for(let num = 0; num < 4; ++num) {
		let x = p1x - partyRadius - 3 * pktRadX;
		let y = srcY1 + pktRadY + (3 * (num - 1) * pktRadY);
		drawPacketAt(canvas, x, y);

		let arrowStartX = srcX1 + 3 * pktRadX;
		let arrowStartY = srcY1 + pktRadY;

		let arrowEndX = x - 2 * pktRadX;
		// This is hard-coded to look "good"
		let arrowEndY = y - (num - 1) * 7;

		drawArrow(canvas,
			arrowStartX,
			arrowStartY,
			arrowEndX,
			arrowEndY,
			10);
	}
}

function removeSenderECC(canvas) {
	let height = canvas.height();
	let partyRadius = height / 10;
	let [pktRadX, pktRadY] = getPacketRads();
	let [p1x, p1y] = getPartyLocation(canvas, 1);
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;

	ctx.fillStyle = "white";
	ctx.fillRect(0,
		0,
		p1x - partyRadius - 2,
		height);
	ctx.fillStyle = "black";
}

function removeReceivedECC(canvas) {
	let width = canvas.width();
	let height = canvas.height();
	let partyRadius = height / 10;
	let [p2x, p2y] = getPartyLocation(canvas, 2);

	let x = p2x + partyRadius + 2;

	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;

	ctx.fillStyle = "white";
	ctx.fillRect(x,
		0,
		width,
		height);
	ctx.fillStyle = "black";
}

function illustrateReceivedECC(canvas) {
	let height = canvas.height();
	let partyRadius = height / 10;
	let [pktRadX, pktRadY] = getPacketRads();
	let [p2x, p2y] = getPartyLocation(canvas, 2);
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;

	let x = p2x + partyRadius + 3 * pktRadX;

	let srcY1 = 5 + 3 * pktRadY;
	for(let num = 0; num < 4; ++num) {
		let y = srcY1 + pktRadY + (3 * (num - 1) * pktRadY);
		if(num == 1)
			drawPacketAt(canvas, x, y, "#666");
		else
			drawPacketAt(canvas, x, y);
	}

	let crossY = srcY1 + pktRadY;
	let crossRadius = pktRadX * 2;

	ctx.strokeStyle = "#F00";
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.moveTo(x + crossRadius, crossY - crossRadius);
	ctx.lineTo(x - crossRadius, crossY + crossRadius);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x - crossRadius, crossY - crossRadius);
	ctx.lineTo(x + crossRadius, crossY + crossRadius);
	ctx.stroke();

	ctx.strokeStyle = "#000";


	


	

	
	

}

//Draw thick white line
function eraseLineBetweenParties(canvas, pi, pj) {
	if(pi < 1 || pi > 4 || pj < 1 || pj > 4)
		throw "Invalid party ID";
	let [piLocX, piLocY] = getPartyLocation(canvas, pi);
	let [pjLocX, pjLocY] = getPartyLocation(canvas, pj);

	// weights for interpolation
	let weightP = pi % 2 == pj % 2 ? 2 / 3 : 5 / 6;
	let weightQ = 1 - weightP;

	let startX = weightP * piLocX + weightQ * pjLocX;
	let startY = weightP * piLocY + weightQ * pjLocY;
	let endX = weightQ * piLocX + weightP * pjLocX;
	let endY = weightQ * piLocY + weightP * pjLocY;
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.strokeStyle = "#FFF";
	/* Jank central... */
	/* This can't be the right way to erase an X */
	ctx.lineWidth = 60;
	ctx.stroke();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000";
}

function drawX(canvas, pi, pj) {
	if(pi < 1 || pi > 4 || pj < 1 || pj > 4)
		throw "Invalid party ID";
	let [piLocX, piLocY] = getPartyLocation(canvas, pi);
	let [pjLocX, pjLocY] = getPartyLocation(canvas, pj);
	let crossX = (piLocX + pjLocX) / 2;
	let crossY = (piLocY + pjLocY) / 2;
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

	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
}

//Global variable is bad practice...
//TODO Just get this through CSS selector instead?
let container;

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			container = makeCanvasWithParties(800, 500);
			let canvas = container.find("canvas");
			drawLineBetweenParties(1, 2, canvas, true);
			break;
		}
		case 1: {
			drawParty(container, 1, true);
			break;
		}
		case 2: {
			drawParty(container, 1, false);
			drawParty(container, 2, true);
			break;
		}
		case 3: {
			let canvas = container.find("canvas");
			drawParty(container, 4, true);
			eraseLineBetweenParties(canvas, 1, 2);
			break;
		}
		case 4: {
			illustrateECC(container.find("canvas"));
			break;
		}
		case 5: {
			// Remove QECC source
			let canvas = container.find("canvas");
			let height = canvas.height();
			let partyRadius = height / 10;
			let [pktRadX, pktRadY] = getPacketRads();
			let [p1x, p1y] = getPartyLocation(canvas, 1);

			let ctx = container.find("canvas")[0].getContext("2d");
			ctx.beginPath();
			ctx.rect(0, 0,
				p1x - partyRadius - 4 * pktRadX - 3,
				height);
			ctx.fillStyle = "white";
			ctx.fill();

			// Draw complete graph
			for(let pi = 1; pi <= 4; ++pi) {
				for(let pj = pi + 1; pj <= 4; ++pj) {
					drawLineBetweenParties(pi, pj, canvas);
				}
			}
			break;
		}
		/* Path 1 */
		case 6: {
			//Green
			let canvas = container.find("canvas");
			drawLineBetweenParties(1, 2, canvas, false, "#0C0");
			break;
		}
		case 7: {
			let canvas = container.find("canvas");
			//Whether "canvas" is first or last argument is really inconsistent right now...
			drawX(canvas, 1, 2);
			break;
		}
		case 8: {
			let canvas = container.find("canvas");
			eraseLineBetweenParties(canvas, 1, 2);
			break;
		}
		/* Path 2 */
		case 9: {
			//Green
			let canvas = container.find("canvas");
			drawLineBetweenParties(1, 3, canvas, false, "#0C0");
			drawLineBetweenParties(3, 2, canvas, false, "#0C0");
			break;
		}
		case 10: {
			let canvas = container.find("canvas");
			//Whether "canvas" is first or last argument is really inconsistent right now...
			drawX(canvas, 3, 2);
			break;
		}
		case 11: {
			let canvas = container.find("canvas");
			eraseLineBetweenParties(canvas, 3, 2);
			drawLineBetweenParties(1, 4, canvas, false, "#000");
			drawLineBetweenParties(1, 3, canvas, false, "#000");
			break;
		}
		/* Path 3 */
		case 12: {
			let canvas = container.find("canvas");
			drawLineBetweenParties(1, 4, canvas, false, "#0C0");
			drawLineBetweenParties(4, 2, canvas, false, "#0C0");
			break;
		}
		/* Success? */
		case 13: {
			let canvas = container.find("canvas");
			//Remove packets
			removeSenderECC(canvas);
			//draw them on receiver side
			illustrateReceivedECC(canvas);
			break;
		}
		/* Back to path 3 */
		case 14: {
			let canvas = container.find("canvas");
			removeReceivedECC(canvas);
			drawX(canvas, 3, 2);
			break;
		}
		case 15: {
			let canvas = container.find("canvas");
			eraseLineBetweenParties(canvas, 1, 4);
			drawLineBetweenParties(4, 2, canvas, false, "#000");
			break;
		}
		/* Path 4 */
		case 16: {
			let canvas = container.find("canvas");
			drawLineBetweenParties(1, 3, canvas, false, "#0C0");
			drawLineBetweenParties(3, 4, canvas, false, "#0C0");
			drawLineBetweenParties(4, 2, canvas, false, "#0C0");
			break;
		}
		case 17: {
			let canvas = container.find("canvas");
			drawX(canvas, 3, 4);
			break;
		}
		case 18: {
			let canvas = container.find("canvas");
			eraseLineBetweenParties(canvas, 3, 4);
			drawLineBetweenParties(1, 3, canvas, false, "#000");
			drawLineBetweenParties(4, 2, canvas, false, "#000");
			break;
		}
		/* SWIA */
		case 19: {
			let canvas = container.find("canvas");
			let canvasWidth = canvas.width();
			let canvasHeight = canvas.height();

			let abortText = $("<p>ABORT</p>");
			abortText.css({
				"margin": "5px 0",
				"font-size": "xx-large",
				"display": "flex",
				"justify-content": "center"
			});
			let idText = $(`<p>
				<span>Players 2 and 4</span>
				<span>are malicious!</span>
				</p>`);
			idText.css({
				"margin": "5px 0",
				"font-size": "x-large",
				"display": "flex",
				"flex-direction": "column",
				"justify-content": "center",
				"align-items": "center"
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
			container.append(abortMessage);
			MathJax.typeset();
			break;
		}
		case 20: {
			location.href = "strategy.html";
			break;
		}
	}



}
