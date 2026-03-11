let buttonHandlers1 = {
	
	test1(){
		//тестовая функция 1
		log2("test1")
	},
	test2(){
		//тестовая функция 2
		log2("test2")
	},
	test3(){
		//тестовая функция 3
		log2("test3")
	},
	
}

function test1Init(){
	//init function
}


$(document).ready(function() {

	//для демо-функции можно задать связанную функцию, которая будет выводится в лог при её выполнении.
	buttonHandlers1.test1.init = test1Init;
	
	//добавляем демо-кнопки
	addDemoButtons(buttonHandlers1)
	
});



