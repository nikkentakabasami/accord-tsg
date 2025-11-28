

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

export const columnDefaults = {
	name: "",
	resizable: true,	//Столбец можно растягивать/сокращать
	sortable: true,		//Столбец можно сортировать
	formatter: null,	//Кастомный форматтер
	editor: null,		//Редактор столбца. Срабатывает при двойном щелчке. Стандартные редакторы - в модуле tet.slick.grid.editors.js
	showTitleForContent: false  //показывать текстовое содержимое ячейки во всплывающей подсказке 
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


let colIdSplits = {};

/**
 * Извлекает из строки значение по имени столбца.
 * Можно использовать дот-нотацию.
 * Использует буферизацию для ускорения.
 */
export function extractCellValue(row, colId){
	
	let split = colIdSplits[colId];
	if (!split){
		split = colId.split('.');
		colIdSplits[colId] = split;
	}
	
	if (split.length==1){
		return row[colId];
	}
	
	return split.reduce((val, currFieldName) => val[currFieldName], row);
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





function rowFitFilter(row, filter){
	
	
	for (let columnId in filter) {
		
		let filterVal = filter[columnId];
		if (!filterVal){
			continue;
		}
		
//		let val = row[columnId]+'';
		let val = extractCellValue(row, columnId)+'';
		
		if (!val){
			return false;
		}
		
		if (Array.isArray(filterVal) && filterVal.length>0){
			if (filterVal.indexOf(val)<0){
				return false;
			}
		} else if (val.indexOf(filterVal)<0){
			return false;
		}
	}
	return true;
}


//фильтрация строк в соответствии с заданным фильтром.
//используется только в LocalDataLoader
export function filterRows(sourceData, filter){
	
	let filterParams = Object.keys(filter);
	if (filterParams.length==0){
		return sourceData.slice();
	}

	
	let filteredData = [];

	for (let i = 0; i < sourceData.length; i++) {
		let row = sourceData[i];
		
		if (!rowFitFilter(row, filter)){
			continue;
		}
		
//		row = jsonCopy(row);
		filteredData.push(row);
	}
	
	return filteredData;
}

export function sortRows(data, sortColumns){
	if (sortColumns.length==0){
		return;
	}
		
	data.sort((a, b)=> {
		
		for(let i=0;i<sortColumns.length;i++){
			let sc = sortColumns[i];
			
//			let val1 = a[sc.columnId];
//			let val2 = b[sc.columnId];
			let val1 = extractCellValue(a,sc.columnId);
			let val2 = extractCellValue(b,sc.columnId);
			
			let r = _compareValues(val1,val2,sc.sortAsc);
			if (r!=0){
				return r;
			}
		}
		return 0;
	});
	
}


export function _compareValues(val1,val2,sortAsc){
	let r;
	
	let type = typeof val1; 
	if (type === 'number' || type === 'boolean'){
		r = val1-val2;
	} else {
		r = val1.localeCompare(val2);
	}
	if (!sortAsc){
		r = -r;
	}
	return r;
}



let scriptSrc = import.meta.url;
export let tetSlickRelativePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);


/*
let tetSlickRelativePath = null;

//Возвращает путь к библиотеке tetSlick
export function getTetSlickRelativePath() {
	if (tetSlickRelativePath){
		return;
	}
    let links = document.getElementsByTagName('link');
    const cssPath = "css/tet.slick.grid.css";
	for( var i = 0; i < links.length; i++){
		let ref = links[i].getAttribute("href");
		let ind = ref.indexOf(cssPath);
		if (ind>=0){
			tetSlickRelativePath = ref.substring(0,ind);
			return tetSlickRelativePath;
		}
    }    
    return null;
}
*/


//невидимый div, в который складываются различные вспомогательные элементы (диалоги, всплывашки, поля фильтрации)
let $loadedElementsContainer;


//загрузка в dom фрагментов из папки  fragments
export function loadFragment(fragmentFileName, callback){
	
	//загружаем элементы диалога на страницу
	let path = getTetSlickRelativePath();
	
	$loadedElementsContainer.load( path+"fragments/"+fragmentFileName, () => {
		if (callback){
			callback();
		}
	});
	
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

	$loadedElementsContainer = $("#tsgHiddenElements");
	if ($loadedElementsContainer.length==0){
		$loadedElementsContainer = $('<div id="tsgHiddenElements"/>');
		$loadedElementsContainer.appendTo(document.body);
	}


});






