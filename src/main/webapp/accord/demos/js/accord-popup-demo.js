

import { AccPopup, accordUtils } from '../../js/accord-bundle.js';


let p1;



/*
const accPopupDefaultOptions = {
	panelSelector: null,	//содержимое,которое нужно показывать в диалоге
	contentSelector: null,	//содержимое,которое нужно показывать в диалоге
	contentText: null,		//содержимое в виде текста
	panelUrl: null,		//путь к содержимому
	draggable: true,	//позволяет перетаскивать диалог за заголовок
	id: null,			//id диалога. по умолчанию генерируется автоматом, но можно задать своё. Будет назначен на dom элемент: $dialog.attr("id");
	fragmentLoadMode: 1,
	centered: false,		//центрирует его по центру браузера
	immediateInit: true,
	width: null,
	height: null,
}

*/



$(function(){
	
	//показ текстового содержимого
	let  options = {
		contentText: "p1 - Панель созданная динамически, через класс AccPopup. <br>Содержит только текст. Он задан опцией contentText. <br>Можно перетаскивать.",
		draggable: true,	//позволяет перетаскивать диалог за заголовок
		centered: true,
		width: "300px"
	}	
	let p1 = new AccPopup(options);
	
	
	
	
	//показ содержимого из template
	options = {
		draggable: true,
		contentSelector: "#popupContent2",
		width: "300px"
	}	
	let p2 = new AccPopup(options);
	
	
	
	//Сделать обычную панель плавающей
	options = {
		draggable: true,
		panelSelector: "#popupContent3",
		width: "300px",
	}	
	let p3 = new AccPopup(options);
	
	
	let scriptSrc = import.meta.url;
	let demosUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/') + 1)
	
	
	options = {
		draggable: false,
		panelExtraClasses: "acc-popup",
		width: "450px",
		height: "300px",
		//путь можно задать относительно библиотеки accord
//		panelUrl: "demos/misc/myPopup.html",
//		panelUrl: accordUtils.accordPath+"demos/misc/myPopup.html",

		//либо относительно своего js-файла:
		panelUrl: demosUrl+"misc/myPopup.html",
	}	
	let p4 = new AccPopup(options);
	
	
	
	

	
	
	
	$("#b1").click(e=>{
		p1.show();
		p2.show(100,200);
		p3.show(400,200);	
		p4.show(10,400);	
	});

	$("#b2").click(e=>{
		p1.hide();
		p2.hide();
		p3.hide();
		p4.hide();
	});
	
	
});





