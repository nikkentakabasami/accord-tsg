//--код для обслуживания компонента TetSlickGrid----------------------------
//--создаёт таблицу с пагинацией на основе моего стандартного паттерна------

import { TetSlickGrid } from './tet.slick.grid.js';
import { GetRequestPageDataLoader } from './tet.slick.grid.loader.js';
import {GridMenuModel1} from './tet.slick.grid.menu.js';

import {ColumnOrderDialogModel} from './tet.slick.grid.column.dialog.js';
import {v2Mode} from './mtp/tet.slick.mtp.js';

import {MultiselectModule,initMultiselect} from './mtp/tet.slick.grid.multiselect-bs.js';
import {DateRangeModule} from './mtp/tet.slick.grid.dateRange.js';
import {NumberRangeModule} from './mtp/tet.slick.grid.numberRange.js';
import {tsgUtils} from './tet.slick.grid.utils.js';



export class TetSlickGridBasePagedView {
	
	loader;
	grid;
	containerSelector;
	
	menu1;
	columnDialog;
	
	multiselectModule;
	
	enplantAlwaysSelected = false;	
	
	
	$regionFilter;// = $('#regionName');
	$enplantFilter;// = $('#enplantName');
	
	$expandedMode = $("#expandedMode");
	
	$expMode = $("#expMode");
	
	lastSelectedEnplants = null;
	
	expandedMode = false;
	
	expandedColsShown(){
		return this.grid.model.columns.some(c => { return c.exp; });
	}
	
	showExpWarning(){
		if (this.expandedMode){
			this.$expMode.show();
		} else {
			this.$expMode.hide();
		}
	}
	
	
	constructor(containerSelector, columns, options){
		this.containerSelector = containerSelector;
		
		
		
		let regionFilterName = "regionName";
		if (options.regionFilterName){
			regionFilterName = options.regionFilterName;
		}
		this.$regionFilter = $("select[name='"+regionFilterName+"']");
		
		let enplantFilterName = "enplantName";
		if (options.enplantFilterName){
			enplantFilterName = options.enplantFilterName;
		}
		this.$enplantFilter = $("select[name='"+enplantFilterName+"']");

		
		
		
		
		if (options.enplantAlwaysSelected){
			this.enplantAlwaysSelected = true;
		}
		
		
		options.explicitInitialization = true;
		
		options.columnDialogTableOptions = {
			
			//подкрашиваем оранжевым столбцы, вызывающие повышенную нагрузку на приложение		
			cssClassForRowCallback: (row, rowNo, data) => {
				return row.exp? "cssOrangeRow": null;
			}			
		}		
		
		
		let hiddenFields = [];
		columns.forEach(c => {
			if (c.exp){
				hiddenFields.push(c.id);
			}
		});
		options.hiddenFields = hiddenFields;
		
		options.clearUserPreferencesUrl = "v3/clearUserPreferences";
		if (v2Mode){
			url = "../"+url
		}
		

		//Фиксим положение таблицы - на случай, если разрешение небольшое
		let pos = accordUtils.calcElementPosition($("div.grid-header").get(0));
		$(containerSelector).css("top",pos.y+40);
		
		
		
		this.loader = new GetRequestPageDataLoader();
		this.grid = new TetSlickGrid(this.containerSelector, this.loader, columns, options);
		
		//savedColSizes объявляется в jsp-странице. Это строка, содержащая сохранённую ранее конфигурацию столбцов
		try {
			if (typeof savedColSizes=='undefined'){
				this.grid.model.resetColumns();
			} else {
				let viewColumns = this.restoreColsWidth(columns, options, savedColSizes);
				this.grid.model.setColumns(viewColumns);
			}
		} catch(e) {
			console.error(e.message);			
		}
		
		
		
		
		
		this.expandedMode = this.expandedColsShown();
		let em = this.$expandedMode.val()==="true";
		if (this.expandedMode!=em){
			this.$expandedMode.val(this.expandedMode)
			this.grid.dataLoader.updateFilter(resp => {
				location.reload();
			})
			
			return;
		}
		this.showExpWarning();
//		$("#expandedMode").val(this.expandedMode+"");
		
		this.grid.addEventListener(tsgUtils.tableEvents.afterColumnsChanged, e => {
			this.saveColsWidth(() =>{
				
				let expandedColsShown = this.expandedColsShown();
				if (this.expandedMode!=expandedColsShown){
					this.expandedMode=expandedColsShown;
					this.$expandedMode.val(expandedColsShown+"")
					this.grid.filtersModel.applyMainFilter();
					this.showExpWarning();
				}
				
			});
		});
		
		
		
		this.menu1 = new GridMenuModel1(this.grid);
		this.columnDialog = new ColumnOrderDialogModel(this.grid);
		this.multiselectModule = new MultiselectModule(this.grid);
		
		let dm = new DateRangeModule(this.grid);
		let nm = new NumberRangeModule(this.grid);
		
		
		
		if (this.enplantAlwaysSelected){
			this.grid.addEventListener(tsgUtils.tableEvents.onFilterSetValue, e => {
				let $filter = e.detail.$filter;
				let val = e.detail.filterValue;
				
				if (e.detail.filterName.endsWith("enplantName") && val=="") {
					$filter.multiselect('selectAll', false);
					$filter.multiselect('updateButtonText');
					e.detail.handled = true;
				}
			});	
		}
		
		
		this.grid.init();

		//фикс для старых страниц
		if (v2Mode){
			let src = $("#clearCookies img").attr("src");
			$("#clearCookies img").attr("src","../"+src)
		}
		
		this.grid.addEventListener(tsgUtils.tableEvents.afterDataLoad, e => {
			if (e.detail.param1){
				$("#secondRequestCountSpan").empty().append(e.detail.param1);
			}
			
		});			
		

		//Если задана опция - меняем список ресов при изменении выбранных пэсов
		if (options.resReload){
			this.reinitResFilter();
			this.grid.addEventListener(tsgUtils.tableEvents.beforeApplyFilter, e => {
				this.reinitResFilter();
			});
		}
		
	}
	
	reinitResFilter(){
		
		let selectedEnplants = JSON.stringify(this.$enplantFilter.val());
		if (this.lastSelectedEnplants==selectedEnplants){
			return;
		}
		
		this.lastSelectedEnplants = selectedEnplants;
		
		let regionsToShow = [];
		if (selectedEnplants){
			regionsToShow = regionsJson.filter(regionOption => {
		    	return selectedEnplants.indexOf(regionOption.parentId)>=0;
			});
//			regionsToShow = regionsToShow.map(r => {return r.value;})
			
		}
		
		this.$regionFilter.multiselect('destroy');
//		this.initMultiselect(this.$regionFilter,regionsToShow);
		initMultiselect(this.$regionFilter,regionsToShow,null,() => {
			this.grid.filtersModel.applyMainFilter();
		});
	}	
	



	/**
	 * Сохранение текущей ширины столбцов
	 */
	saveColsWidth(callback) {
		
		let cols = this.grid.model.columns;
		let colSizes = [];
		for (let i = 0; i < cols.length; i++) {
			colSizes.push(cols[i].id);
			colSizes.push(cols[i].width);
		}

		let colSizesStr = colSizes.join(",");
		console.log("saving "+colSizesStr);
		
		setUserPreference(this.grid.model.options.colCookieName, colSizesStr, callback);
	}

	/**
	 * Задание сохранённой ширины столбцов
	 */
	restoreColsWidth(columns, options, savedSizesString) {
		
		if (!savedSizesString){
			
			/*
			if (options.hiddenFields){
				let viewColumns = [];
			
				for (let i = 0; i < columns.length; i++) {
					let col = columns[i];
					let ind = options.hiddenFields.indexOf(col.id);
					if (ind<0){
						viewColumns.push(col);
					}
				}
				return viewColumns;			
			}
			*/
			
			return columns;
		}
		
		
		try {
	
			let viewColumns = [];
			
			var scw = savedSizesString.split(",");
			for (var i = 0; i<scw.length; i+=2) {
				var colId = scw[i]; 
				var colWidth = scw[i+1]; 
			
				if (!colId){
					throw new Error('Incorrect saved col string');
				}
				
				var col = columns.filter(function(val){
					return (val.id==colId);
				});
			
				if (col.length==1){
					col[0].width = parseInt(colWidth);
					viewColumns.push(col[0]);
				} else {
					throw new Error('Incorrect saved col string');
				}
			}
			return viewColumns;			
		
		} catch (e) {
			return columns;
		}
		
		
	}


}

