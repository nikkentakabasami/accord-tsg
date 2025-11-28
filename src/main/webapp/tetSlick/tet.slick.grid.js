import { TsgModel } from './tet.slick.grid.model.js';
import { TsgView } from './tet.slick.grid.view.js';
import { SingleRowSelectModel, NoSelectModel, MultiRowSelectModel, GroupExcelSelectModel} from './tet.slick.grid.select.model.js';
import { ColumnResizeModel } from './tet.slick.grid.col.resize.model.js';
import { TsgSortModel } from './tet.slick.grid.sort.model.js';
import { FiltersModel } from './tet.slick.grid.filters.model.js';
import { GridEvents,tableEvents } from './tet.slick.grid.events.js';
import { GroupExcelModule } from './tet.slick.grid.group.excel.js';
import { EditorsModule } from './tet.slick.grid.editors.js';

import {ColumnOrderDialogModel} from './tet.slick.grid.column.dialog.js';
import {GridMenuModel1} from './tet.slick.grid.menu.js';


//import { AuxModule } from './tet.slick.grid.aux.js';

import { GetRequestPageDataLoader, LocalDataLoader } from './tet.slick.grid.loader.js';

//счётчик гридов, созданных на текущей странице.
let gridCounter = 0;



/**
 * Создаёт экземпляр таблицы.
 **/
export class TetSlickGrid extends EventTarget {

	//строковый идентификатор, порядковое число в строковом виде (1,2,3...), 
	//генерируется с использованием переменной gridCounter.
	//таблицы из текущей страницы можно получить по глобальным переменным grid1,grid2,grid3...
	id;
	
	
	initialized = false;

	//---------модули----------
	model;
	view;
	selectModel;
	colResizeModel;
	sortModel;
	filtersModel;
	events;
	groupModule;
	editorsModule;

	columnOrderDialogModel;
	menuModel;
	
	//загрузчик данных - объект, предоставляющий таблице данные.
	//Выполняет фильтрацию и сортировку данных. Наследует от AbstractDataLoader.
	dataLoader;

	//общий список модулей. Прописаны в порядке их создания (и порядка инициализации)
	modulesList = [];

	/**
	 * Конструктор.
	 * 
	 * containerSelector - css-селектор div-а, который будет использован для создания таблицы
	 * data - Либо массив строк, либо dataLoader - объект динамически подгружающий записи с функцией ensureData (обычно это GetRequestPageDataLoader)
	 *   Если не задан - будет создан GetRequestPageDataLoader - данные будут подгружаться с сервера (используя опции pageUrl,updateFilterUrl,clearFilterUrl)
	 * columns - массив с дескрипторами столбцов таблицы (опции столбцов можно глянуть в columnDefaults)
	 * options - опции таблицы. Описание опций, их полный список и значения по умолчанию можно глянуть в объекте tableDefaults 
	 * 
	 */
	constructor(containerSelector, data, columns, options) {
		super();
		
		gridCounter++;
		this.id=""+gridCounter;
		window["grid"+this.id] = this;

		//заглушки, если нет библиотеки accord с панелью ожидания. 
		if (typeof showWaitPanel != 'function') {
			console.log("not found function showWaitPanel! using stubs;");
			window.showWaitPanel = ()=>{};
			window.hideWaitPanel = ()=>{};
		}

		//Создаём текущий загрузчик данных		
		if (data==null){
			//данные не заданы - создаём загрузчик для получения данных с сервера
			this.dataLoader = new GetRequestPageDataLoader();
		} else if (data.ensureData){
			//задан кастомный загрузчик
			this.dataLoader = data;
		} else {
			//задан массив - создаём локальный загрузчик данных
			this.dataLoader = new LocalDataLoader(data);
		}
		this.dataLoader.grid = this;
		
		this.model = new TsgModel(this, columns, options);
		this.view = new TsgView(containerSelector, this);

		this.view.createBaseDomElements();
		
		this.editorsModule = new EditorsModule(this);
		
		if (this.model.options.groupExcelStyle){
			this.selectModel = new GroupExcelSelectModel(this);
		} else if (this.model.options.multiRowSelectionModel){
			this.selectModel = new MultiRowSelectModel(this);
		} else if (this.model.options.singleRowSelectionModel){
			this.selectModel = new SingleRowSelectModel(this);
		} else {
			this.selectModel = new NoSelectModel(this);
		}
		
		this.colResizeModel = new ColumnResizeModel(this);
		this.sortModel = new TsgSortModel(this);
		
//		if (this.model.options.enableHeaderRowFilters) {
//		}
		this.filtersModel = new FiltersModel(this);
		
		

		if (this.model.options.groupExcelStyle) {
			this.groupModule = new GroupExcelModule(this);
		}

		
		if (this.model.options.withColumnDialog) {
			this.columnOrderDialogModel = new ColumnOrderDialogModel(this);
		}
		if (this.model.options.withGridMenu) {
			this.menuModel = new GridMenuModel1(this);
		}
		
		this.events = new GridEvents(this);

//		this.auxModule = new AuxModule(this);

		//Сразу инициализируем, если не задана опция явной инициализации (default false)
		if (!this.model.options.explicitInitialization) {
			this.init();
		}
	}


	init() {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		let top = this.view.calcViewportTop();
		this.view.$viewport.css("top",top);

		this.model.recalcAfterResize();
//		this.model.recalcAfterColumnsChange();

		this.dataLoader.init();

		this.modulesList.forEach(function(item) {
			item.init();
		});
	
		//если данные заданы явно - инициализируем их и кидаем событие afterDataLoad
		if (!this.dataLoader){
			this.model.sortData();
			this.model.writeRowIndex();
			this.dispatch(tableEvents.afterDataLoad);
		}
		
		this.view.render();
		
		this.dispatch(tableEvents.afterGridInit);
	}
	

	/**
	 * Полная очистка таблицы, освобождание всех ресурсов.
	 * Противоположность init()
	 */
	clearAll(){
		for(let i=this.modulesList.length-1; i>=0; i--){
			let module = this.modulesList[i];
			module.clear();
		}
		this.initialized = false;
	}	
	

	/**
	 * Полная перегрузка данных и перерисовка (после изменения структуры столбцов, размеров таблицы...)
	 */
	reload(){
		
		if (this.filtersModel){
			this.filtersModel.moveFiltersToFilterContainer();
		} 
		
//		this.events.clear();
		
		this.view.clear();
		this.selectModel.clear();
//		this.model.recalcAfterScroll();
		
		this.dataLoader.clearData();
		
		this.view.init();
		this.selectModel.init();
//		this.colResizeModel.init();
//		this.sortModel.init();
		
		if (this.filtersModel){
			this.filtersModel.moveFiltersToHeaderRow();
		} 
		this.view.render();
		
	}
	
	/**
	 * Перерисовка таблицы после изменения данных или условий фильтрации/сортировки
	 */
	refresh(reloadData = false){
		
		if (reloadData){
			this.dataLoader.clearData();
		}
		
		this.view.clearBeforeReload();

		this.model.recalcAfterScroll();
		this.selectModel.deselectAll();

		this.view.render();
		
	}	
	
	

	_addModule(model){
		this.modulesList.push(model);
	}


	_handleResize = event => {
		
		let top = this.view.calcViewportTop();
		this.view.$viewport.css("top",top);
		
		this.model.recalcAfterResize();
		this.model.recalcAfterScroll();
		
		this.reload();
		
	}	


	/**
	 * Запускается при прокрутке таблицы
	 */
	_handleScroll = event => {
//		console.log(this.view.$viewport[0].scrollLeft);
		
		let scrollLeft =  this.view.$viewport[0].scrollLeft;
		
		//сдвигаем и заголовки столбцов		
		if (this.model.scrollLeft!=scrollLeft){
			this.view.$headers.css("left",-scrollLeft+"px");
			this.view.$headerRow.css("left",-scrollLeft+"px");
			this.model.scrollLeft = scrollLeft;
			return;
		}
		
		//перерисовываем таблицу		
		this.model.scrollTop = this.view.$viewport[0].scrollTop;
		this.model.recalcAfterScroll();
		this.view.render();

//		this.auxModule.saveScrollPos();
		

	}





	/*
	---------------------вспомогательные методы--------------------------------
	*/

    setSortColumns(cols) {
		this.sortModel.setSortColumns(cols);
    }

    setSortColumnsString(colsString) {
		this.sortModel.setSortColumnsString(colsString);
	}

	getSortColumns(){
		
		let sortColumns;
		if (this.groupModule){
			sortColumns = this.groupModule.getSortColumns();
		} else {
			sortColumns = this.sortModel.sortColumns;
		}
		return sortColumns;
	}


    clearSort() {
		this.sortModel.clearSort();
	}

	setTitle(title){
		this.view.titleHeader.setTitle("Моя тестовая таблица");
	}

	getSelectedRowIndex(){
		return this.selectModel.getSelectedRowIndex();
		return null;
	}
	getSelectedRow(){
		return this.selectModel.getSelectedRow();
	}

	/**
	 * Перерисовывает заданную строку.
	 * Может вызываться после изменения данных этой строки.
	 */
	updateRow(row){
		let rowNo = row;
		if (rowNo.index>=0){
			rowNo = rowNo.index;
		}
		
		this.view.updateRow(rowNo);
	}



	hideColumn(colId){
		this.model.hideColumn(colId);
		
		
		if (this.filtersModel){
			this.filtersModel.moveFiltersToFilterContainer();
		} 
		
		
		this.view.redrawAfterColumnsChange();
		if (this.filtersModel){
			this.filtersModel.moveFiltersToHeaderRow();
		} 
		this.refresh();
	}

	setColumns(columns){
		this.model.setColumns(columns);		
		this.view.redrawAfterColumnsChange();
	}


	/**
	 * Вспомогательный метод для отправки событий
	 * События используются в формате:
	 * this.grid.dispatch(tableEvents.myEvent, myDetails);
	 * this.grid.addEventListener(tableEvents.myEvent, e => {});
	 * this.grid.removeEventListener(tableEvents.myEvent, handler);
	 */
	dispatch(eventName, detail){
		this.dispatchEvent(new CustomEvent(eventName, { detail:detail }));
	}

}
