

import { TetSlickGrid } from '../tet.slick.grid.js';
import {tableDefaults, mkColDesc,checkmarkFormatter} from '../tet.slick.grid.misc.js';

let myGrid;

//Упрощённый способ объявления столбцов
var columns = [
	mkColDesc("title","Заголовок",150,null,null,"text"),
	mkColDesc("duration","Длительность",150,null,null,"text"),
	mkColDesc("percentComplete","% Завершения",150,null,null,"text"),
	mkColDesc("start","Начало",150,null,null,"date"),
	mkColDesc("finish","Окончание",150,null,null,"date"),
	
	//Кастомное форматирование для поля с булевым значением
	mkColDesc("effortDriven","Выполнено",150,true,checkmarkFormatter,"boolean")
];


let options = {
	
	//метод myGrid.init() теперь нужно вызывать явно
	explicitInitialization: true,
	
	//Добавит заголовок таблицы
	showTitleHeader: true,

	//Добавит в таблицу дополнительную заголовочную строку (для элементов фильтрации)
	showHeaderRow: true,
	
	//Добавит элеметы фильтрации в заголовочную строку.
	enableHeaderRowFilters: true,
	
	//Возможность выбора нескольких строк
	multiRowSelectionModel: true,
	
	//Своя высота строки
	rowHeight: 30,
	
	editMode: 'clickSelected',
	

};


$(function() {

	let myData = makeTableData1(100);

	myGrid = new TetSlickGrid("#myGrid", myData, columns, options);
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')





})

