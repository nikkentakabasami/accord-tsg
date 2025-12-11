

import { TetSlickGrid, tsgUtils } from '../tet.slick.grid.js';
import {TsgDataSource1} from './tsgDataSource1.js'

let myGrid;


var columns = [
	tsgUtils.mkColDesc("title","Заголовок",150),
	{
		id: "customer", 
		valueField: "customer.name",
		name: "Заказчик",
		width: 150 
	},{
		id: "section",
		captionField: "section.name",
		valueField: "section.id",
		sortField: "section.id",
		matchType: tsgUtils.matchTypes.NUMBER,
		name: "Раздел",
		width: 150 
	},
	
	
/*
mkColDesc("title","Заголовок",150,null,null,"text"),
mkColDesc("duration","Длительность",150,null,null,"text"),
mkColDesc("percentComplete","% Завершения",150,null,null,"text"),
mkColDesc("start","Начало",150,null,null,"date"),
mkColDesc("finish","Окончание",150,null,null,"date"),

//Кастомное форматирование для поля с булевым значением
mkColDesc("effortDriven","Выполнено",150,true,checkmarkFormatter,"boolean")
*/	
	
	
	tsgUtils.mkColDesc("duration","Длительность",150,null,null,"text"),
//	tsgUtils.mkColDesc("percentComplete","% Завершения",150),
	tsgUtils.mkColDesc("percentComplete","% Завершения",150,null,null,"text"),
	
	{
		id: "startStr", 
		captionField: "startStr",
		valueField: "startStr",
		sortField: "startStr",
		name: "Начало",
		editor: "date",
		width: 150 
	},{
		id: "finishStr", 
		captionField: "finishStr",
		valueField: "finishStr",
		sortField: "finishStr",
		name: "Окончание",
		editor: "date",
		width: 150 
	},{
		id: "effortDriven", 
		name: "Окончание",
		width: 150,
		editor: "boolean",
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

	//Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
	withColumnDialog: true,
	//Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
	withGridMenu: true,
		
	//Своя высота строки
	rowHeight: 30,
	
	editMode: 'clickSelected',
	
	

};

$(function() {

	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);
	
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})







