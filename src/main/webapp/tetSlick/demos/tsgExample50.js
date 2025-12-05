


import { TetSlickGrid } from '../tet.slick.grid.js';
import {tableDefaults, mkColDesc,checkmarkFormatter,matchTypes} from '../tet.slick.grid.misc.js';
import {TsgDataSource1} from './tsgDataSource1.js'



let myGrid;


var columns = [
	{
		id: "section",
		captionField: "section.name",
		valueField: "section.id",
		name: "Раздел",
		width: 150 
	},
	
	mkColDesc("title","Заголовок",150),
	{
		id: "customer", 
		captionField: "customer.name",
		valueField: "customer.name",
		sortField: "customer.name",
		matchType: matchTypes.STRING_LIKE,
		name: "Заказчик",
		width: 150 
	},
	mkColDesc("duration","Длительность",150),
	mkColDesc("percentComplete","% Завершения",150),
	
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
		formatter: checkmarkFormatter,
	},
	
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

	//Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
	withColumnDialog: true,
	//Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
	withGridMenu: true,

	//Добавить группировку записей
	groupExcelStyle: true,
	
	//Поле группировки
	groupFieldId: "section",
	
	//Сортировка группировки
	groupSort: "section+",
	
	//Поля, ячейки которых будут объединены в пределах группы
	groupColumns: ["section"],

};


	
	


$(function() {

	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);
	
	
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

