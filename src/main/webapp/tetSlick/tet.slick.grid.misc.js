

//Опции таблицы и их значения по умолчанию
export const tableDefaults = {
	
	//Если true - нужно явно вызывать метод init() для инициализации таблицы. 
	//Иначе - он будет вызыван конструктором 
	explicitInitialization: false,
	
	rowHeight: 25,
	defaultColumnWidth: 100,
	minColumnWidth: 30,
	maxColumnWidth: 1000,
	
	//Данные с сервера подгружаются страницами. Это - размер страницы по умолчанию. 
	defaultPageSize: 20,


	//Заголовок, содержащий название таблицы и вспомогательные кнопки
	//По умолчанию для его создания используется модуль TsgTitleView, но можно задать и свой 
	showTitleHeader: false,
	customTitleView: null,

	//заголовки столбцов
	showColumnHeaders: true,
	columnHeadersHeight: 50,

	//Показывать заголовочную строку (обычно она содержит фильтры, которые добавляет модуль FiltersModel)
	showHeaderRow: false,
	headerRowHeight: 31,

	//фильтры, которые не надо очищать при очистке фильтра
//	noClearInputs: [],

	//с каким запасом прорисовывать строки
	rowRenderReserve: 5,
	
	//размеры разделителя столбцов (для изменения их размеров)
	splitterArea: 10,

	//добавить в заголовок кнопку для показа диалога настройки столбцов
//	enableColumnReorder: false,
	
	
	singleRowSelectionModel: false,
	multiRowSelectionModel: false,
	
	
	selectedCellCssClass: "selected",
	enableTextSelectionOnCells: false,

	defaultFormatter: defaultFormatter,

	enableHeaderRowFilters: false,

//	gridId: null,

	//callback для доп. обработки полей фильтрации (после их помещения в headerRow) 
	//Содержит поля: ($filter,m)
	//выполняется однократно для каждого поля!
//	filtersProcessingCallback: null,

	//при задании - этот url будет использоваться для отправки условий фильтрации на сервер
	

	//Если задано - при первой загрузке будет восстанавливать предыдущий скруллинг таблицы 
	restoreScroll: false,
	//имя куки, используемого для хранения скрулинга
	restoreScrollCookieName: null,
	


	//callback функция, позволяющая задавать свой класс на заданные строки
	//Например: (row, rowNo, data) => {return row.odd? "cssGrayRow": null;}
	cssClassForRowCallback: null,
	
	//callback функция, позволяющая задавать свой класс на заданные ячейки
	//Например: (row, col, data, rowNo, colNo) => {return col.odd? "cssGrayRow": null;}
	cssClassForCellCallback: null,
	
	//массив с полями, у которых нет пустых значений
	notEmptyFields: [],
	//массив с полями, содержимое которых не используется для фильтрации
	notFieldByValueFields: [],
	
	
	//Как будет реализовано редактирование данных
	// 'none' - редактирование отключено
	// 'clickSelected' - редактирование ячейки при клике на выделенной записи
	// 'dblClick' - редактирование ячейки при двойном клике
	editMode: null,
	
	//режим отладки: выводит отладочные сообщения
	debugMode: false,
	
	//---------------------remote data load---------------------------------
	
	//отправлять данные формы через updateFilterUrl в формате Json.
	//По умолчанию используется формат "application/x-www-form-urlencoded"
	postFormDataAsJson: false,

	//url для получения страницы данных
	pageUrl: null,	
	//url для отправки условий фильтрации на сервер
	updateFilterUrl: null,
	//url для очистки условий фильтрации на сервере
	clearFilterUrl: null,
	
	//при инициализации таблицы будет очищать текущий фильтр на сервере, вызывая метод dataLoader.clearFilters(); 
	clearFilterAtInit: false,
	
	hiddenFields: null,
	colCookieName: null,

	clearUserPreferencesUrl: null,
	
	
	//---------------------additional modules---------------------------------
	
	withColumnDialog: false,	//Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
	withGridMenu: false,		//Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
	
	//---------------------grouping---------------------------------
	
	
	//группировать данные так, чтобы одинаковые ячейки одной группы были объединены
	groupExcelStyle: false,
	
	//Поле, идентифицирующее группировку
	//Например: "contractId" 
	groupFieldId: null,
	
	//Сортировка, используемая для задания группировки
	//Например: "contractId+"
	groupSort: null,

	//массив с именами столбцов, содержащих данные строк подгруппы
	//Для группировки необходимо задать лишь одну из двух опций: subgroupColumns или groupColumns (как удобнее)
	subgroupColumns: null,

	//массив с именами столбцов, по которым идёт группировка.
	//Внутри группы ячейки этих столбцов будут объединяться
	groupColumns: null,
	
	
	//опции для таблицы в ColumnOrderDialogModel
	columnDialogTableOptions: null
	
	
};

//способ фильтрации записей по полю
export const matchTypes = Object.freeze({
	
	//авто определение по типу данных в строках
	AUTO_CALC: 0,
	//фильтровать как числа
	NUMBER: 1,
	//прямое соответствие (default)
	STRING_EQUAL: 2,
	//искать похожие записи
	STRING_LIKE: 3
	
});	

export const columnDefaults = {
	id: null,			//поле, в котором лежит значение столбца. Так же является идентификатором столбца.
	name: "",			//заголовок столбца
	captionField: null,	//поле, в котором лежит отформатированное значение, которое нужно показывать в таблице. (default = id)
	valueField: null,	//поле, в котором лежит значение, по которому выполняется фильтрация. (default = id)
	sortField: null,	//поле, по которому выполняется сортировка. (default = captionField)
	resizable: true,	//Столбец можно растягивать/сокращать
	sortable: true,		//Столбец можно сортировать
	formatter: null,	//Кастомный форматтер
	editor: null,		//Редактор столбца. Срабатывает при двойном щелчке. Стандартные редакторы - в модуле tet.slick.grid.editors.js
	showTitleForContent: false,  //показывать текстовое содержимое ячейки во всплывающей подсказке,
	matchType: matchTypes.AUTO_CALC,	//как фильтровать по данному полю
	matchFunction: null		//кастомная функция фильтрации по данному полю
};


/**
 * Основа всех модулей таблицы.
 */
export class AbstractModule {

	grid;
	
	_initiated = false;
	
	constructor(grid){
		this.grid = grid;
		grid._addModule(this);
	}
	
	/**
	 * Инициализация: создание элементов, подключение обработчиков
	 */
	init(){
		this._initiated = true;
	}

	/**
	 * Очистка всего, что было сделано методом init().
	 * Подклассы могут и не отменять инициализацию (если она была слишком сложной и комплексной).
	 * В этом случае они просто не будут очищать флаг _initiated
	 */
	clear(){
//		this._initiated = false;
	}

	
}

//вспомогательная функция для создания объекта с описанием столбца таблицы
export function mkColDesc(id,name,width,sort,formatter,editor) {
	
	let col = {
			id : id,
			name : name
		};

	if (width){
		col.width = width;
	}
	if (sort){
		col.sort = sort;
	}
	if (formatter){
		col.formatter = formatter;
	}
	if (editor){
		col.editor = editor;
	}
	return col;
	
}

//с заданием имени столбца, который используется для сортировки
export function mkSortColDesc(id,name,sortName,width,sort,formatter,editor) {
	
	let col = {
			id : id,
			name : name,
			sortName : sortName,
		};

	if (width){
		col.width = width;
	}
	if (sort!=null){
		col.sortable = sort;
	}
	if (formatter){
		col.formatter = formatter;
	}
	if (editor){
		col.editor = editor;
	}
	return col;
	
}

export function mkExpSortColDesc(id,name,sortName,width,sort,formatter) {
	let col = mkSortColDesc(id,name,sortName,width,sort,formatter);
	col.exp = true;
	return col;
}



export function nameFormatter(rowNo, column, value, row) {
	if (value){
		return value.name;
	}
	return "";
}


export function defaultFormatter(rowNo, column, value, row) {
	if (value == null) {
		return "";
	} else {
		return (value + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
}

export function checkmarkFormatter(rowNo, column, value, row) {
  return value ? '<div class="tick-png"></div>' : '';
}

//вычисляет положение заданного тега в окне
export function getPosition(e){
	var left = 0
	var top  = 0

	while (e.offsetParent){
		left += e.offsetLeft
		top  += e.offsetTop
		e	 = e.offsetParent
	}

	left += e.offsetLeft
	top  += e.offsetTop

	return {x:left, y:top}
}







let scriptSrc = import.meta.url;
export let tetSlickRelativePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);





//загрузка в dom фрагментов из папки  fragments
export function loadFragment(fragmentFileName, $target){
	return accordUtils.loadHtmlFragmentXHR(tetSlickRelativePath+"fragments/"+fragmentFileName, $target, false);	
}


export function fixSelectTextToVal(selector){
	
	$(selector+" option").each(function() {
	  let $opt = $(this);
	  let val = $opt.val();
	  if (!val){
	    return;
	  }
	  let text = $opt.text();
	  $opt.val(text);
	});		
	
}




$(document).ready(function() {



});






