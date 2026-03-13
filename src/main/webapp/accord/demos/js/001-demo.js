
//демо-функции.
//при вызове addDemoButtons - для каждой такой функции будет создана и добавлена демо-кнопка (на acc-button-panel)
let bh1 = {
	
	test1(){
		//тестовая функция 1
		log2("test1")
	},
	test2(){
	},
	test3(){
	},
	
}

//для демо-функции можно задать связанную функцию, которая будет выводится в лог при её выполнении.
bh1.test1.init = test1Init;


function test1Init(){
	//init function
}


$(document).ready(function() {

	
	//добавляем демо-кнопки
	addDemoButtons(bh1)
	
	
	demoOptions.beforeExecDemoFunc = ()=>{
		reloadSandbox();
	};

	demoOptions.afterExecDemoFunc	= ()=>{
	};

	//сразу запускаем первую демку
	demoButtons[0].trigger("click");
		
	
});



