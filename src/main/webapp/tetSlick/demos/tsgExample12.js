

import { TetSlickGrid } from '../tet.slick.grid.js';
import {mkColDesc,checkmarkFormatter} from '../tet.slick.grid.misc.js';
import {TsgDataSource1} from './tsgDataSource1.js'

let myGrid;

//Упрощённый способ объявления столбцов
var columns = [
	mkColDesc("title","Заголовок",150),
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
	mkColDesc("duration","Длительность",150),
	mkColDesc("percentComplete","% Завершения",150),
	
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
	mkColDesc("effortDriven","Выполнено",150,true,checkmarkFormatter)
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

