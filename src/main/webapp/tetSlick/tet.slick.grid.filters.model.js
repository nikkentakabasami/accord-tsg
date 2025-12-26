

import {AbstractModule} from './tet.slick.grid.misc.js';
import {tsgUtils} from './tet.slick.grid.utils.js';

import {Filter,SelectFilter} from './tet.slick.grid.filters.js';



function filterFactory1(grid, column,$filter){
	
	let filterObject;
	if ($filter.is('select')){
		filterObject = new SelectFilter(grid, column,$filter);
	} else {
		filterObject = new Filter(grid, column,$filter);
	}
	
	return filterObject;
}


/**
 * Модуль по работе с системой фильрации.
 * 
 */
export class FiltersModel  extends AbstractModule {
	
	//скрытый контейнер для хранения фильтров
	$filterContainer;
	
	//форма для отправки запросов на сервер. Содержит в себе grid и $filterContainer
	$form;

	//поле, содержащее условия сортировки
	$sortField;

	filters = {};
	
	//функции, которые создают объекты-фильтры.
	//располагаютсяв порядке приоритетности. Плагины могут добавлять новые.
	filterFactories = [filterFactory1];
	
	addFilterFactory(f){
		//добавляем новую фабрику в начало очереди
		this.filterFactories.unshift(f);
	}
	
	constructor(grid){
		super(grid);
		
		this.grid.addEventListener(tsgUtils.tableEvents.sortChanged, e => {
			this.grid.dataLoader.updateFilter(resp => {
				this.applyMainFilter();
			})
		});
		
		
		if (this.grid.model.options.enableHeaderRowFilters) {
	
			this.$form = this.grid.view.$form;
			
			let fcId = "filterContainer";
			if (this.grid.id>1){
				fcId+=this.grid.id;
			}
		
			//скрытый контейнер для временного хранения фильтров		
			this.$filterContainer = $("#"+fcId);
			if (this.$filterContainer.length==0){
				this.$filterContainer = $('<div id="'+fcId+'" style="display:none;"/>');
			}
			
			//чтобы все инпуты из скрытого дива учавствовали в фильтрации
			this.$filterContainer.remove().appendTo(this.$form);
		}		
		
		
	}
	


	createFilterObject(column){

		let $filter;
		if (column.filterInput){
			
			if (typeof column.filterInput =="function"){
				$filter = column.filterInput(column.id);
			} else {
				$filter = column.filterInput;
			}
			
			$filter.remove().appendTo(this.$filterContainer);
		} else {
			$filter = this.$filterContainer.find("select[name='"+column.id+"'], input[name='"+column.id+"'][type!=hidden]");
		}
		
		if ($filter.length==0){
			$filter = this._createInput(column.id);
		}
		if ($filter.length>1){
			console.error('found two filters for column '+column.id+'!');
			$filter = $filter.first();
		}
		
		//правим id чтобы не было дублей
		$filter.attr("id",column.id+this.grid.id);
		$filter.addClass("grid-filter-input").attr('autocomplete', 'off');
		
		/*
		this.filterFactories.some(factory=>{
			filterObject = factory(this.grid, column,$filter);
			return filterObject!=null;
		});
		*/

		//по порядку пытяется создать фильтры разными фабриками		
		let filterObject;
		for (let factory of this.filterFactories) {
		  filterObject = factory(this.grid, column, $filter);
		  if (filterObject != null) {
		    break;
		  }
		}		
		
		filterObject.addChangeListener(	event => {
			this.applyMainFilter();
	    });
		
		
		this.filters[column.id] = filterObject;
		
		return filterObject;
	}	
	
	_createInput(fieldName){
		let $input = $('<input name="'+fieldName+'" type="text" value="">');
		$input.appendTo(this.$filterContainer);
		return $input; 
	}

	
	
	init(){
		if (this._initiated){
			return;
		}
		this._initiated = true;
		
		if (this.grid.model.options.enableHeaderRowFilters) {
			
			let columns = this.grid.model.columns;
			
			for (var i = 0; i < columns.length; i++) {
				this.createFilterObject(columns[i]);
			}
			
			this.moveFiltersToHeaderRow();
			
			this.grid.dispatch(tsgUtils.tableEvents.afterFiltersSetInGrid, this.$filters);
			
			
			this.$sortField = this._createInput("sortField");			
		}
		
	}


	

	//закидывает инпуты в заголовочную строку (и выполняет их инициализацию, если она не выполнена)
	//может вызываться после перестройки таблицы (скрытие, показ столбцов)
	moveFiltersToHeaderRow(){
		let columns = this.grid.model.columns;
		
	    let $headerRowCells = this.grid.view.$headerRow.children('div');
	    
		for (var i = 0; i < columns.length; i++) {
			let m = columns[i];
			
			let filter = this.filters[m.id]
			
		    filter.$element.appendTo($headerRowCells[i]);
			
			if (!filter.initiated){
				filter.init();
//				this.grid.dispatch(tsgUtils.tableEvents.beforeInitFilter, detail);
			}
		}
	}	

	//закидывает инпуты в скрытый контейнер
	//может вызываться перед перестройкой таблицы (скрытие, показ столбцов)
	moveFiltersToFilterContainer(){
		this.grid.model.columns.forEach(m =>{
			let filter = this.filters[m.id]
			if (filter){
			    filter.$element.appendTo(this.$filterContainer);
			}
		});
	}

	
	
	
	clear(){
		if (!this._initiated){
			return;
		}
		this._initiated = false;
		
		if (this.model.options.enableHeaderRowFilters) {
			this.moveFiltersToFilterContainer();
		}
	}

	



	//Создаёт объект, содержащий условия фильтрации
	makeFilterObject(){
		let result = {};
		for (let columnId in this.filters) {
			
			let filter = this.filters[columnId];
			
			let filterVal = filter.getFilterVal();
			if (!filterVal){
				continue;
			}
			result[columnId] = filterVal;
		}
		
		return result;
	}



		
	/**
	 * Обновляет фильтр и перегружает таблицу новыми данными 
	 * */	
	applyMainFilter() {
		
		let sortString;
		if (this.grid.groupModule){
			//Если используется группировка - используем для получения сортировки 		
			sortString = this.grid.groupModule.getSortString();
		} else {
			sortString = this.grid.sortModel.getSortString();
		}
		if (this.$sortField){
			this.$sortField.val(sortString);
		}
		
		this.grid.dispatch(tsgUtils.tableEvents.beforeApplyFilter);
		
		this.grid.dataLoader.updateFilter(resp => {
			this.grid.refresh(true);
		})
	  
	}	

	clearFilters() {
		
		this.grid.dataLoader.clearFilters(filter => {
			this._updateFilterInputs(filter);
			this.grid.refresh(true);
		})
			
		
	}


	/**
	 * Задаёт значения полей фильтрации такие же как в заданном объекте-фильтре filter.
	 * Если filter не задан - очищает все поля.
	 * 
	 */
	_updateFilterInputs(filter) {
		for (let columnId in this.filters) {
			
			let fo = this.filters[columnId];
			if (!fo){
				continue;
			}

			if (filter){
				let newVal = filter[columnId];
				fo.setFilterVal(newVal);
			} else {
				fo.clear();
			}
			
						
		}
		
	}
	
	
	setFilterValueForField(filterName, filterValue, apply){

		let fo = this.filters[filterName];
		fo.setFilterVal(newVal);

		/*
		let detail = {
			$filter: $filterInput,
			filterValue: filterValue,
			filterName: filterName,
			handled: false
		};
		this.grid.dispatch(tsgUtils.tableEvents.onFilterSetValue, detail);

		if (!detail.handled){
			this._defaultSetFilterValueFunction($filterInput,filterValue, filterName);
		}
*/
		if (apply){
			this.applyMainFilter();  
		}		

	}		


		
	
}