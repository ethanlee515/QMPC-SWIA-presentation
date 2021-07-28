let container;

function nextSlide() {
	switch(currentSlide) {
		case 0:
			container = makeCanvas(800, 500);
			container.css({
				position: 'fixed',
				right: 50,
				bottom: 50
			});
			$('body').append(container);
			make4parties(container);	
			break;
		case 1:
			drawLineBetweenParties(1, 4, container.find('canvas'), true);
	}
}
