

import { tsgUtils, TetSlickGrid, accordUtils } from '../tet.slick.grid-bundle.js';
import { TsgDataSource1 } from './tsgDataSource1.js';

let myGrid;


/*
column template
Шаблон декларации столбца (со значениями по умолчанию)
	{
		id: null,
		name: ""
		captionField: null,
		valueField: null,
		sortField: null,
		resizable: true,
		sortable: true,
		formatter: null,
		editor: null,
		showTitleForContent: false,
		matchType: matchTypes.AUTO_CALC,
		matchFunction: null
	}

 */




let columns = [
	{
		id: "title",
		name: "Заголовок",
		width: 150
	}, {
		id: "customer",
		valueField: "customer.id",
		name: "Заказчик",
		width: 150
	}, {
		id: "section",
		valueField: "section.name",
		name: "Раздел",
		width: 150
	}, {
		id: "duration",
		name: "Длительность",
		width: 150
	}, {
		id: "percentComplete",
		name: "% Завершения",
		width: 150
	}, {
		id: "startStr",
		valueField: "start",
		name: "Начало",
		width: 150
	}, {
		id: "finishStr",
		valueField: "finish",
		name: "Окончание",
		width: 150
	}, {
		id: "effortDriven",
		name: "Выполнено",
		width: 150
	}




];

let options = {
	singleRowSelectionModel: true
};


$(function() {

	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);

	window.myGrid = myGrid;

})

