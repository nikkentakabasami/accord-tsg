

import { TetSlickGrid } from '../tet.slick.grid.js';
import {tableDefaults, mkColDesc,checkmarkFormatter} from '../tet.slick.grid.misc.js';

let myGrid;

//Упрощённый способ объявления столбцов
var columns = [
	mkColDesc("title","Заголовок",150,true,
		(rowNo, column, value, row) => {
			return '<a href="myTestPage?requestid=' + row.id
					+ '" target="test">' + row.title
					+ '</a>';
		},
	),
	mkColDesc("duration","Длительность",150),
	mkColDesc("percentComplete","% Завершения",150),
	mkColDesc("start","Начало",150),
	mkColDesc("finish","Окончание",150),
	mkColDesc("effortDriven","Выполнено",150,true,checkmarkFormatter)
];


let options = {

	//метод myGrid.init() теперь нужно вызывать явно
	explicitInitialization: true,
	
	//Добавит заголовок таблицы
	showTitleHeader: true,
	
	//Добавит элеметы фильтрации в заголовочную строку.
	enableHeaderRowFilters: true,
	
	//Возможность выбора нескольких строк
	multiRowSelectionModel: true,
	
	//Своя высота строки
	rowHeight: 30,
	
	//Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
	withColumnDialog: true,
	//Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
	withGridMenu: true,
	
	//подкрашиваем нечётные строки серым
	cssClassForRowCallback: (row, rowNo, data) => {
		return row.odd? "cssGrayRow": null;
	},
	
	//подкрашивем percentComplete в зависимости от значения
	cssClassForCellCallback: (row, col, data, rowNo, colNo) => {
		if (col.id==="percentComplete") {
			if (row.percentComplete<=20) {
				return "cssRedRow";
			}
			if (row.percentComplete>=80) {
				return "cssGreenRow";
			}
		}
		return null;
	}	
	

};




$(function() {
	let myData = makeTableData1(100);

	myGrid = new TetSlickGrid("#myGrid", myData, columns, options);
	
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

