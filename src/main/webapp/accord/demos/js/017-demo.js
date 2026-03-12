

let p1;

let buttonHandlers1 = {
	
	show(){
		p1.show();
	},
	
	hideAll(){
		p1.hide();
	}
	
	
}

function init(){
	//опция hideOnOutsideClick - скрывает панель при клике за её пределами
	
	//функция showForElement - показывает AccPopup рядом с заданным элементом ввода 
	
	let options = {
	contentText: "p1 - Тестовая панель.",
	draggable: true,
	width: "300px",
	hideOnOutsideClick: true
	}
	p1 = new AccPopup(options);
	
		
	$("#tf1").focus(e => {
		p1.showForElement(e.target, AccPopup.Layouts.BOTTOM_RIGHT);
	});

	$("#tf2").click(e => {
		p1.showForElement(e.target, AccPopup.Layouts.BOTTOM);
	});

	$("#sel1").click(e => {
	  p1.showForElement(e.target, AccPopup.Layouts.RIGHT);
	});		
	
}

$(document).ready(function() {

	init();
	
	buttonHandlers1.show.init = init;
	
/*	
	$("div.acc-desc-panel").click(e => {
	p1.showForClickEvent(e);
	});
*/
	

	
	
	
	
	//добавляем демо-кнопки
	addDemoButtons(buttonHandlers1)
	
	
		
	
});



