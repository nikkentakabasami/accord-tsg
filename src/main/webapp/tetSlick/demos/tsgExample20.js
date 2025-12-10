

import { TetSlickGrid, tsgUtils } from '../tet.slick.grid.js';
import { TsgDataSource1 } from './tsgDataSource1.js'

let myGrid;

var columns = [
	tsgUtils.mkColDesc("title", "Заголовок", 150),
	{
		id: "customer",
		valueField: "customer.name",	//поле, по которому выполняется фильтрация. (default = id)
		captionField: "customer.name",	//поле, которое нужно показывать в таблице. (default = valueField)
		sortField: "customer.name",		//поле, по которому выполняется сортировка. (default = captionField)
		matchType: tsgUtils.matchTypes.STRING_LIKE,	//можно явно задать тип фильтрации
		//		matchFunction: null, 				//можно явно задать функцию для фильтрации
		name: "Заказчик",
		width: 150

	}, {
		id: "section",
		valueField: "section.name",
		name: "Раздел",
		width: 150
	},
	tsgUtils.mkColDesc("duration", "Длительность", 150),
	tsgUtils.mkColDesc("percentComplete", "% Завершения", 150),

	{
		id: "start",
		captionField: "startStr",
		valueField: "startStr",
		sortField: "start",
		name: "Начало",
		width: 150
	}, {
		id: "finish",
		captionField: "finishStr",
		valueField: "finishStr",
		sortField: "finish",
		name: "Окончание",
		width: 150
	}, {
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

	//Добавит в таблицу дополнительную заголовочную строку (для элементов фильтрации)
	//	showHeaderRow: true,

	//Добавит элеметы фильтрации в заголовочную строку.
	enableHeaderRowFilters: true,

	//Возможность выбора нескольких строк
	multiRowSelectionModel: true,

	//Своя высота строки
	rowHeight: 30,

};


$(function() {

	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

