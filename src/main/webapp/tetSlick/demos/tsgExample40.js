

import { TetSlickGrid, tsgUtils } from '../tet.slick.grid.js';
import {TsgDataSource1} from './tsgDataSource1.js'



let myGrid;


var columns = [
	tsgUtils.mkColDesc("title","Заголовок",150),
	{
		id: "customer", 
		valueField: "customer.name",
		name: "Заказчик",
		formatter: (rowNo, column, value, row) => {
			return '<a href="myTestPage?requestid=' + row.id
					+ '" target="test">' + row.title
					+ '</a>';
		},
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
		id: "start", 
		captionField: "startStr",
		valueField: "startStr",
		sortField: "start",
		name: "Начало",
		width: 150 
	},{
		id: "finish", 
		captionField: "finishStr",
		valueField: "finishStr",
		sortField: "finish",
		name: "Окончание",
		width: 150 
	},{
		id: "effortDriven", 
		name: "Окончание",
		width: 150,
		formatter: tsgUtils.checkmarkFormatter,
	},
	
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
	
	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);
	
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

