
import { TetSlickGrid } from '../tet.slick.grid.js';
import {checkmarkFormatter, mkColDesc,fixSelectTextToVal} from '../tet.slick.grid.misc.js';
import {ColumnOrderDialogModel} from '../tet.slick.grid.column.dialog.js';
import {GridMenuModel1} from '../tet.slick.grid.menu.js';
import {tableEvents} from '../tet.slick.grid.events.js';

import {MultiselectModule} from '../tet.slick.grid.multiselect.js';
import {DateRangeModule} from '../mtp/tet.slick.grid.dateRange.js';
import {NumberRangeModule} from '../mtp/tet.slick.grid.numberRange.js';




var columns = [
	mkColDesc("enplantName","ПЭС",280),
	mkColDesc("regionName","РЭС",239),
	mkColDesc("admRegionName","Административный район",170),
	mkColDesc("customerName","Заявитель",181,true,
		(rowNo, column, value, row) => {
			return '<a href="v2/customer.jsp?customerid='
					+ row.customerId + '" target="customer">'
					+ row.customerName + '</a>';
		},
	),
	mkColDesc("customerType","Тип заявителя",150),
	
	mkColDesc("requestDate","Дата заявки",143), 
	
	mkColDesc("earlyPower","Ранее разрешенная к присоединению мощность, кВт",100,false), 
	mkColDesc("earlyPowerMkg","Ранее присоединенная мощность мкГ, кВт",100,false), 
	mkColDesc("maxPower","Запрашиваемая мощность, кВт",150), 
	
	mkColDesc("objectName","Объект",161),
	mkColDesc("addressPresentation","Адрес",193),
	mkColDesc("requestNumber","Номер заявки",206, true,
		(rowNo, column, value, row) => {
			return '<a href="v2/request.jsp?requestid=' + row.id
					+ '" target="request">' + row.requestNumber
					+ '</a>';
		},
	),
	
	mkColDesc("id","Id",85,false)
];




let options = {

	multiRowSelectionModel: true,

	explicitInitialization: true,
	
	//Добавит заголовок таблицы
	showTitleHeader: false,

	//Добавит в таблицу дополнительную заголовочную строку (для элементов фильтрации)
	showHeaderRow: true,
	
	//Добавит элеметы фильтрации в заголовочную строку.
	enableHeaderRowFilters: true,

	//Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
	withColumnDialog: true,
	//Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
	withGridMenu: true,

	pageUrl: "/enettc-web/v3/getCustomerRequestJson/",
	updateFilterUrl: "/enettc-web/v3/updateCustomerRequestFilter",
	clearFilterUrl: "/enettc-web/v3/clearCustomerRequestFilter"




};


let myGrid;
let data;

// Восстанавливаем сохранённую ширину столбцов.
//restoreColsWidth();

function createGrid(loader){
	
	myGrid = new TetSlickGrid("#myGrid2", loader, columns, options);


	let mm = new MultiselectModule(myGrid);
	
//	let dm = new DateRangeModule(myGrid);
	let nm = new NumberRangeModule(myGrid);
	
	
	myGrid.init();
	
	
	
	

}




$(document).ready(function() {


	let mockMode = getRequestParameter("mockMode");
	
	//При заданном параметре mockMode - будет использоваться DataLoader, загружающий данные из локального json-файла
	if (mockMode){
		
		//в локальном режиме будем фильтровать по тексту		
		fixSelectTextToVal("#enplantName");
		fixSelectTextToVal("#regionName");
		
		$.getJSON("requests400.json", function(data){
			createGrid(data);
		});
	} else {
		createGrid(null);
	}
	

});
