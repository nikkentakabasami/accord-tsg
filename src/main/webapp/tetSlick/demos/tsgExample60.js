
import { TetSlickGrid } from '../tet.slick.grid.js';
import { checkmarkFormatter, nameFormatter, mkColDesc, fixSelectTextToVal } from '../tet.slick.grid.misc.js';



var columns = [
	{
		id: "section",
		captionField: "section.name",
		valueField: "section.id",
		sortField: "section.id",
		name: "Раздел",
		width: 150 
	},
	
//	mkColDesc("section", "Раздел", 150, true, nameFormatter),
	mkColDesc("id", "Id", 150),
	mkColDesc("title", "Заголовок", 150),
	mkColDesc("duration", "Длительность", 150),
	mkColDesc("percentComplete", "% Завершения", 150),
	mkColDesc("start", "Начало", 150),
	mkColDesc("finish", "Окончание", 150),
	mkColDesc("effortDriven", "Выполнено", 150, true, checkmarkFormatter)
];




let options = {

	multiRowSelectionModel: true,

	explicitInitialization: true,

	//Добавит заголовок таблицы
	showTitleHeader: true,

	//Добавит элеметы фильтрации в заголовочную строку.
	enableHeaderRowFilters: true,

	//Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
	withColumnDialog: true,
	//Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
	withGridMenu: true,

	//url для получения страницы данных
	pageUrl: "/accord/tsg/getTasksJson/",
	//url для отправки условий фильтрации на сервер
	updateFilterUrl: "/accord/tsg/updateTasksFilter/",
	//url для очистки условий фильтрации на сервере
	clearFilterUrl: "/accord/tsg/clearTasksFilter/",

	//при инициализации таблицы будет очищать текущий фильтр на сервере, вызывая метод dataLoader.clearFilters(); 
	clearFilterAtInit: true,
	
	//отправлять данные формы через updateFilterUrl в формате Json.
	//По умолчанию используется формат "application/x-www-form-urlencoded"
	postFormDataAsJson: true

};


let myGrid;



$(document).ready(function() {

	myGrid = new TetSlickGrid("#myGrid", null, columns, options);
	myGrid.init();
	myGrid.view.titleHeader.setTitle('Тестовая таблица')

});
