

import { TetSlickGrid,tsgUtils} from '../tet.slick.grid.js';
import {TsgDataSource1} from './tsgDataSource1.js'
//import {tsgUtils} from '../tet.slick.grid.utils.js';

let myGrid;

//Упрощённый способ объявления столбцов
var columns = [
	tsgUtils.mkColDesc("title","Заголовок",150),
	{
		id: "customer", 
		captionField: "customer.name",
		valueField: "customer.id",
		name: "Заказчик",
		width: 150 
	},{
		id: "section",
		captionField: "section.name",
		valueField: "section.id",
		name: "Раздел",
		width: 150 
	},
	tsgUtils.mkColDesc("duration","Длительность",150),
	tsgUtils.mkColDesc("percentComplete","% Завершения",150),
	
	{
		id: "startStr", 
		valueField: "start",
		name: "Начало",
		width: 150 
	},{
		id: "finishStr", 
		valueField: "finish",
		name: "Окончание",
		width: 150 
	},
	
	//Кастомное форматирование для поля с булевым значением
	tsgUtils.mkColDesc("effortDriven","Выполнено",150,true,tsgUtils.checkmarkFormatter)
];


let options = {
	
	//метод myGrid.init() теперь нужно вызывать явно
	explicitInitialization: true,
	
	//Добавит заголовок таблицы
	showTitleHeader: true,

	//Добавит в таблицу дополнительную заголовочную строку (для элементов фильтрации)
//	showHeaderRow: true,
	
	//Добавит элеметы фильтрации в заголовочную строку.
//	enableHeaderRowFilters: true,
	
	//Возможность выбора нескольких строк
	multiRowSelectionModel: true,
	
	//Своя высота строки
	rowHeight: 30,

};


$(function() {

	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);
	
	
//	let myData = makeTableData1(100);
//	myGrid = new TetSlickGrid("#myGrid", myData, columns, options);
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица');

})

