
//import { AccSplitter } from '../../js/accord-splitter.js';


let bh1 = {
	
	init_splitter1(){
		//класс AccSplitter
		// Добавляет на заданную div-панель splitter, который позволяет менять размеры подпанелей.
		// Всё что надо - передать в конструктор селектор родительской панели, содержащей 2 дочерние div-панели.
		
		splitterPanel1 = new AccSplitter(	{
			panelSelector: "#mySplitPanel1",
			startLeftPanelWidth: 300
		});	
	},
	
}

function test1Init(){
	//init function
}


$(document).ready(function() {

	//добавляем демо-кнопки
	addDemoButtons(bh1)
		
	
});



