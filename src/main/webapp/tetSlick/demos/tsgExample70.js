

import { TetSlickGrid } from '../tet.slick.grid.js';
import { checkmarkFormatter, nameFormatter, mkColDesc, fixSelectTextToVal } from '../tet.slick.grid.misc.js';

import {MultiselectModule} from '../mtp/tet.slick.grid.multiselect.js';
import {DateRangeModule} from '../mtp/tet.slick.grid.dateRange.js';
import {NumberRangeModule} from '../mtp/tet.slick.grid.numberRange.js';



var columns = [
	mkColDesc("section", "Раздел", 150, true, nameFormatter),
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

	//Будет использоваться кастомный заголовок
	showTitleHeader: false,

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
	postFormDataAsJson: true,
	
	//режим отладки: выводит отладочные сообщения
	debugMode: true

};


let myGrid;

//загружаем с сервера список разделов, чтобы заполнить выпадающий список-фильтр.
async function loadSections(callback){
	
	$.ajax({
	    url: "/accord/tsg/getSectionsJson",
	    type: "GET",
	    dataType : "json",
		success: sections => {
			let options = sections.reduce( (code,section) => {
				code+=`<option value="${section.id}">${section.name}</option>`;
				return code;
			},"");
			$("#section").append(options);
			callback();
		},
		error: (jqXHR, textStatus, errorThrown) => {
			alert(errorThrown);
		}
	})
	
}


$(document).ready(function() {

	myGrid = new TetSlickGrid("#myGrid", null, columns, options);
	
	//Дополнительный модуль.
	//Инициализирует поля фильтрации для ввода даты.
	//На них должен быть назначен класс .date-input.
	let dm = new DateRangeModule(myGrid);
	
	
	//Дополнительный модуль.
	//Инициализирует поля фильтрации для ввода чисел.
	//На них должен быть назначен класс .number-input.
	let nm = new NumberRangeModule(myGrid);
	
	
	//Инициализирует мультиселекты в полях фильтрации.
	//Для использования требуется подключить библиотеки bootstrap 3 и bootstrap-multiselect
	//селекты должны иметь атрибут multiple!
	//Например:
	//<select id="section" name="section" multiple="multiple"></select>
	let mm = new MultiselectModule(myGrid);
	
	
	//загружаем данные для фильтров
	loadSections(()=>{
		
		//после загрузки - инициализируем таблицу.
		myGrid.init();
		myGrid.view.titleHeader.setTitle('Тестовая таблица')
		
	});

	
	
	
});
