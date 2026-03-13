
let myGrid;
let columns;
let options;

let bh1;

function showCreateFunction(){
	logFunc(createTable);
}

$(document).ready(function() {
	
	addDemoButton("Код создания таблицы", showCreateFunction);
	
	//добавляем демо-кнопки
	addDemoButtons(bh1)
	
	createTable();
		
	window.myGrid = myGrid;
//	demoOptions.initFunction = createTable;
	demoOptions.beforeExecDemoFunc = ()=>{
		clearLog2();
	};
	
	
});


















