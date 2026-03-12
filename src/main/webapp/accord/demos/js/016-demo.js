

let p1,p2,p3,p4;

let buttonHandlers1 = {
	
	test1_contentText(){
		
		//класс AccPopup - позволяет быстро создавать модальные плавающие панели.
		
		//показ текстового содержимого
		if (!p1){
			let  options = {
				contentText: "p1 - Панель созданная динамически, через класс AccPopup. <br>Содержит только текст. Он задан опцией contentText. <br>Можно перетаскивать.",
				draggable: true,	//позволяет перетаскивать диалог за заголовок
				centered: true,
				width: "300px"
			}	
			p1 = new AccPopup(options);
		}
		
		p1.show();
		
		
	},
	test2_contentSelector(){

		//показ содержимого из template
		if (!p2){
			let options = {
				draggable: true,
				contentSelector: "#popupContent2",
				width: "300px",
				handleElementSelector: ".acc-filler-panel"
			}	
			p2 = new AccPopup(options);
		}
		p2.show(400,200);
	},

	test3_panelSelector(){
		
		//Сделать обычную панель плавающей
		if (!p3){
			let options = {
				draggable: true,
				panelSelector: "#popupContent3",
				width: "300px",
			}	
			p3 = new AccPopup(options);
		}
		p3.show(500,300);	
		
	},
	
	
	
	test4(){
		
		//загрузка панели из html-фрагмента
		if (!p4){
				let options = {
					draggable: true,
					panelExtraClasses: "acc-popup",
					width: "450px",
					height: "300px",
					//путь можно задать относительно библиотеки accord
			//		panelUrl: "demos/misc/myPopup.html",
			//		panelUrl: accordUtils.accordPath+"demos/misc/myPopup.html",

					//либо относительно своего js-файла:
					panelUrl: accordUtils.accordPath+"demos/misc/myPopup.html",
				}	
				p4 = new AccPopup(options);
		}
		p4.show(500,300);	
		
	},	
	
	hideAll(){
		//скрыть все панели
		p1.hide();
		p2.hide();
		p3.hide();
		p4.hide();		
	}
	
	
}


$(document).ready(function() {

	//добавляем демо-кнопки
	addDemoButtons(buttonHandlers1)
	
	
		
	
});



