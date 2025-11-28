

import { TetSlickGrid } from '../tet.slick.grid.js';
import {tableDefaults, mkColDesc,checkmarkFormatter} from '../tet.slick.grid.misc.js';


let myGrid;

//Упрощённый способ объявления столбцов
var columns = [
	mkColDesc("processed","Обработано",150),
	mkColDesc("id","Id",150),
	mkColDesc("title","Заголовок",150),
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
	groupFieldId: "processed",
	
	//Сортировка группировки
	groupSort: "processed+",
	
	//Поля, ячейки которых будут объединены в пределах группы
	groupColumns: ["processed"],

};


	
	


$(function() {

	let myData = makeTableData2(100);

	myGrid = new TetSlickGrid("#myGrid", myData, columns, options);
	
	myGrid.init();

	myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

