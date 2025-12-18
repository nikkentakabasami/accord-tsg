

import { TetSlickGrid, tsgUtils } from '../tet.slick.grid.js';
import {TsgDataSource1} from './tsgDataSource1.js'

let myGrid;
let dataSource;

var columns = [
	tsgUtils.mkColDesc("id","id",150),
	tsgUtils.mkColDesc("title","Заголовок",150),
	{
		id: "customer", 
		valueField: "customer.id",
		captionField: "customer.name",
		name: "Заказчик",
		width: 150
//		filterInput: tsgUtils.generateSelect("customer",dataSource.customers)
	},{
		id: "section",
		captionField: "section.name",
		valueField: "section.id",
		sortField: "section.id",
		matchType: tsgUtils.matchTypes.NUMBER,
		name: "Раздел",
		width: 150 
	},{
		id: "durationInt",
		captionField: "duration",
		sortField: "durationInt",
		name: "Длительность",
		width: 150 
	},
	
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
		filterInput: accordUtils.generateBooleanSelect,
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
	rowHeight: 30
	
	

};

$(function() {

	dataSource = new TsgDataSource1(100);
	window.dataSource = dataSource;
	
	myGrid = new TetSlickGrid("#myGrid", dataSource.rows, columns, options);
	
	let customerColumn = myGrid.model.columnsById["customer"];
	customerColumn.filterInput = accordUtils.generateSelect("customer",dataSource.customers);
	
	
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

