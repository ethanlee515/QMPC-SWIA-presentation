function draw_party_input(container, partyID) {
	if(partyID < 1 || partyID > 4)
		throw "Invalid party ID";
	let canvas = container.find('canvas');
	let width = canvas.width();
	let height = canvas.height();

	let [partyX, partyY] = getPartyLocation(canvas, partyID);
	let offsetX = 1.5 * height / 10;
	let offsetY = -height / 10;
	offsetX *= partyID % 2 ? -1 : 1;

	let svg = $(MathJax.tex2svg(`|x_${partyID}\\rangle`)).find('svg');
	container.append(svg);
	svg.css({
		position: 'absolute',
		left: partyX + offsetX - svg.width() / 2,
		top: partyY + offsetY - svg.height() / 2
	});
	svg.on("load", () => {
		svg.css({
			position: 'absolute',
			left: partyX + offsetX - svg.width() / 2,
			top: partyY + offsetY - svg.height() / 2
		});
	});
}

function draw_party_output(container, partyID) {
	if(partyID < 1 || partyID > 4)
		throw "Invalid party ID";
	let canvas = container.find('canvas');
	let width = canvas.width();
	let height = canvas.height();

	let [partyX, partyY] = getPartyLocation(canvas, partyID);
	let offsetX = 1.5 * height / 10;
	let offsetY = height / 10;
	offsetX *= partyID % 2 ? -1 : 1;

	let svg = $(MathJax.tex2svg(`|y_${partyID}\\rangle`)).find('svg');
	container.append(svg);
	svg.css({
		position: 'absolute',
		left: partyX + offsetX - svg.width() / 2,
		top: partyY + offsetY - svg.height() / 2
	});
	svg.on("load", () => {
		svg.css({
			position: 'absolute',
			left: partyX + offsetX - svg.width() / 2,
			top: partyY + offsetY - svg.height() / 2
		});
	});
}

function makeCanvasWithParties() {
	let container = makeCanvas(800, 500);
	container.css({
		position: 'fixed',
		right: 50,
		bottom: 50
	});
	$('body').append(container);
	make4parties(container);	
	return container;
}

function redrawPartiesWithRandomMessage() {
	$(".canvas-container").remove();
	let container = makeCanvasWithParties();
	let x, y;
	while(x == y) {
		x = Math.floor(Math.random() * 4) + 1;
		y = Math.floor(Math.random() * 4) + 1;
	}
	drawLineBetweenParties(x, y, container.find("canvas"), true);
}

let animation;

function nextSlide() {
	switch(currentSlide) {
		case 0: {
			let container = makeCanvasWithParties();
			for(let i = 1; i <= 4; ++i) {
				draw_party_input(container, i);
			}
			break;
		}
		case 1: {
			redrawPartiesWithRandomMessage();
			animation = setInterval(redrawPartiesWithRandomMessage, 600);
			break;
		}
		case 2: {
			clearInterval(animation);
			$(".canvas-container").remove();
			let container = makeCanvasWithParties();
			for(let i = 1; i <= 4; ++i) {
				draw_party_output(container, i);
			}
			break;
		}
		case 4: {
			let container = $(".canvas-container");
			let canvasWidth = container.width();
			let canvasHeight = container.height();
			container.remove();
			container = makeCanvasWithParties();
			let canvas = container.find("canvas");
			drawLineBetweenParties(4, 1, canvas, true);

			let abortMessage = $("<div>ABORT</div>");
			let abortMessageWidth = canvasWidth / 3;
			let abortMessageHeight = canvasHeight / 5;
			abortMessage.css({
				"display": "flex",
				"align-items": "center",
				"justify-content": "center",
				"color": "#a00",
				"font-size": "xx-large",

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
			$(".canvas-container").append(abortMessage);
		}
	}
}


