

import {AbstractModule} from './tet.slick.grid.misc.js';
import {tsgUtils} from './tet.slick.grid.utils.js';


/**
 * Модуль по работе с системой фильрации.
 * 
 */
export class FiltersModel  extends AbstractModule {
	
	//скрытый контейнер для хранения фильтров
	$filterContainer;
	
	//форма для отправки запросов на сервер. Содержит в себе grid и $filterContainer
	$form;

	//map с элементами-фильтрами, которые будут помещены в заголовочную строку. 
	//Не включает в себя скрытые инпуты	
	$filters;
	
	//map с фактическими элементами фильтрации (после того как фильтры были обработаны разными библиотеками вроде multiselect)
	$actualFilterElements = null;
	
	//поле, содержащее условия сортировки
	$sortField;

	//фильтры, которые прошли инициализацию (в случае скрытых столбцов - часть полей может и не пройти её)
	initiatedFilters = {};

	constructor(grid){
		super(grid);
		
		this.grid.addEventListener(tsgUtils.tableEvents.sortChanged, e => {
			
			this.grid.dataLoader.updateFilter(resp => {
				this.applyMainFilter();
//				this.grid.refresh(true);
			})
			
			
		});
		
		if (this.grid.model.options.enableHeaderRowFilters) {
			let id = this.grid.id;
			
			//элементы первой таблицы - без суффиксов
			if (id==1){
				id="";
			}
	
			this.$form = this.grid.view.$form;
			
			/*
			//форма отправки условий фильтрации на сервер		
			this.$form = $("#mainFilter"+id)
			if (this.$form.length==0){
				this.grid.view.$container.wrap( '<form id="mainFilter'+id+'" role="form" class="form-horizontal ng-pristine ng-valid" action="." method="post"/>' );
				this.$form = this.grid.view.$container.parent(); 
			}
	*/
		
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
	
			this.$filters = {};
			this.$actualFilterElements = {};			
		}		
		
		
	}
	
	init(){
		if (this._initiated){
			return;
		}
		this._initiated = true;
		
		if (this.grid.model.options.enableHeaderRowFilters) {
			
			let columns = this.grid.model.columns;
			
			//инициализируем инпуты для видимых столбцов (не для всех!)
			for (var i = 0; i < columns.length; i++) {
				this._initFilter(columns[i]);
			}		
			
			this.moveFiltersToHeaderRow();
			
			this.grid.dispatch(tsgUtils.tableEvents.afterFiltersSetInGrid, this.$filters);
			
			this._fillActualFilterElements();
			
			this.$sortField = this._createInput("sortField");			
		}
		
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

	
	/**
	 * Заполняет поле $actualFilterElements
	 */
	_fillActualFilterElements(){
		let columns = this.grid.model.columns;
	    let $headerRowCells = this.grid.view.$headerRow.children('div');
		for (var i = 0; i < columns.length; i++) {
			let m = columns[i];
			
			let $afe = $headerRowCells.eq(i).children();
			this.$actualFilterElements[m.id] = $afe;
		}//for columns			
	}
	
	/**
	 * Первоначальная инициализация поля фильтрации для заданного столбца
	 */
	_initFilter(m){

		let $filter;
		if (m.filterInput){
			
			if (typeof m.filterInput =="function"){
				$filter = m.filterInput(m.id);
			} else {
				$filter = m.filterInput;
			}
			
			$filter.remove().appendTo(this.$filterContainer);
		} else {
			$filter = this.$filterContainer.find("select[name='"+m.id+"'], input[name='"+m.id+"'][type!=hidden]");
		}
		
		
		
		if ($filter.length==0){
			$filter = this._createInput(m.id);
		}
		if ($filter.length>1){
			console.error('found two filters for column '+m.id+'!');
			$filter = $filter.first();
		}
		
		//правим id чтобы не было дублей
		$filter.attr("id",m.id+this.grid.id);
		
		
		this.$filters[m.id] = $filter;
		this.$actualFilterElements[m.id] = $filter;
		
		$filter.addClass("grid-filter-input").attr('autocomplete', 'off');
		
		$filter.bind("change", event => {
			this.applyMainFilter();
        });
	
		return $filter;
	}
	
	
	//закидывает инпуты в заголовочную строку (и выполняет их инициализацию, если она задана)
	moveFiltersToHeaderRow(){
		let columns = this.grid.model.columns;
		
	    let $headerRowCells = this.grid.view.$headerRow.children('div');
	    
		for (var i = 0; i < columns.length; i++) {
			let m = columns[i];
			let $afe = this.$actualFilterElements[m.id];
			if (!$afe){
				$afe = this._initFilter(m);
			}
			
		    $afe.appendTo($headerRowCells[i]);
//			let fpc = this.grid.model.options.filtersProcessingCallback;
			if (!this.initiatedFilters[m.id]){
				
				let detail = {
					$afe: $afe,
					column: m
				};
				this.grid.dispatch(tsgUtils.tableEvents.beforeInitFilter, detail);
				
//				fpc($afe, m);
			}
		    this.initiatedFilters[m.id] = $afe;
			
		}
		this._fillActualFilterElements();
	}
	
	moveFiltersToFilterContainer(){
		
		this.grid.model.columns.forEach(m =>{
			let $afe = this.$actualFilterElements[m.id];
			if ($afe){
			    $afe.appendTo(this.$filterContainer);
			}
		});
	}
	
	_createInput(fieldName){
		let $input = $('<input name="'+fieldName+'" type="text" value="">');
		$input.appendTo(this.$filterContainer);
		return $input; 
	}
	
	

	


	
	
	makeFilterObject(){
		
		let result = {};
		
		for (let columnId in this.$actualFilterElements) {
			
			let $afe = this.$actualFilterElements[columnId];
			let $f = this.$filters[columnId];
			
			let filterVal = $afe.data("filterValue");
			if (!filterVal){
				filterVal = $f.val();
			}
			
			if (Array.isArray(filterVal)){
				filterVal = filterVal.join(',');
			}
			
			if (!filterVal){
				continue;
			}
			if (filterVal.trim){
				filterVal = filterVal.trim();
			}
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
		
//		this.grid.dataLoader.updateFilter();
		this.grid.dataLoader.updateFilter(resp => {
			this.grid.refresh(true);
		})
	  
	}	

	clearFilters() {
		
		this.grid.dataLoader.clearFilters(resp => {
			this._updateFilterInputs(resp);
			this.grid.refresh(true);
		})
			
		
	}




	/**
	 * Задаёт значения полей фильтрации такие же как в заданном объекте-фильтре filter.
	 * Если filter не задан - очищает все поля.
	 * 
	 */
	_updateFilterInputs(filter) {
//		let noClearInputs = this.grid.model.options.noClearInputs;
//		let fsv = this.grid.model.options.filtersSetValueVallback;
		
		
		this.grid.model.columns.forEach(m =>{
			let $f = this.$filters[m.id];
			
			// || noClearInputs.indexOf(m.id)>=0
			if ($f==null){
				return;
			}

			let newVal = "";
			if (filter){
				newVal = filter[m.id];
			}
		
			this.setFilterValueForField(m.id, newVal, false);
			
		});
		
//		this.grid.dispatch(tableEvents.afterClearInputs);
	}
	



	/**
	 * Правит, если это необходимо, значение, по которому может фильтроваться это поле
	 */
	fixFilterValue(columnId, fieldValue){
		
		let $filterInput = this.$filters[columnId];
		if ($filterInput.is("select")){
			let $option = $filterInput.find("option:contains('"+fieldValue+"')");
			if ($option.length>0){
				fieldValue = $option.eq(0).attr("value");
			} else {
				let $option = $filterInput.find("option[val='"+fieldValue+"']");
				if ($option.length==0){
					fieldValue = "";
				}
			}
		} else {
			//типа так красивее
			if (fieldValue=="-1"){
				fieldValue="(пустые)";
			} else if (fieldValue=="-2"){
				fieldValue="(не пустые)";
			} 
		}
		return fieldValue;
	}
	
	
	/**
	 * Задание значения в поле фильтрации. 
	 * При задании apply=true - обновит текущий фильтр и перезагрузит данные в таблице.
	 * 
	 */
	setFilterValueForField(filterName, filterValue, apply){

		let $filterInput = this.$filters[filterName];

		if (!filterValue){
			filterValue = "";
		}


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

		if (apply){
			this.applyMainFilter();  
		}		
	
	}	
	
	_defaultSetFilterValueFunction = ($filterInput,filterValue, filterName) => {
		
		if (typeof(filterValue)=="boolean"){
			filterValue = ""+filterValue;
		}
		
		$filterInput.val(filterValue);
	}
	
		
	
}