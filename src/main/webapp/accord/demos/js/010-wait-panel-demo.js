
import {showWaitPanel,hideWaitPanel} from '../../../accord/js/accord-bundle.js';


let buttonHandlers1 = {
	
	showWaitPanel1(){
		//показ панели ожидания без параметров
		showWaitPanel();
	},
	showWaitPanel2(){
		//показ панели ожидания с заданием заголовка
		showWaitPanel("test1");
	},
	showWaitPanel3(){
		//при подключении accord-publish.js - методы и классы библиотеки становятся глобальными.
		window.showWaitPanel("test2");
	},
	hideWaitPanel(){
		//скрыть панель
		hideWaitPanel();
	},
	
	
	
}



$(document).ready(function() {

	addDemoButtons(buttonHandlers1)
	
});







