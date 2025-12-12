

import { AccPopup } from '../../js/accord-popup.js';


let p1;


$(function(){
	
	
	let  options = {
		contentText: "Панель созданная динамически, через класс AccPopup. Содержит только текст. Её можно перетаскивать.",
		draggable: true,	//позволяет перетаскивать диалог за заголовок
		centered: true,
		width: "300px"
	}	
	
	let p1 = new AccPopup(options);
	p1.show();
	
	
	options = {
		draggable: true,
		contentSelector: "#popupContent2",
		width: "300px"
	}	
	
	
	let p2 = new AccPopup(options);
	p2.show(100,100);
	
	
	
	
	
	
	
});





