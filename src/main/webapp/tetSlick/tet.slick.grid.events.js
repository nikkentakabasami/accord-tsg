
import {AbstractModule} from './tet.slick.grid.misc.js';


export const tableEvents = {
	
	//изменение в выделении строк
	selectionChanged: "selectionChanged",
	
	//изменение в сортировке
	sortChanged: "sortChanged",

	//строка была отредактирована (изменена)
	rowEdited: "rowEdited",

	//перед отправкой условий запроса на сервер
	beforeApplyFilter: "beforeApplyFilter",
	
	//вызывается однократно, после добавления полей фильтрации в заголовочную строку
	//служит для инициализации полей фильтрации 
	afterFiltersSetInGrid: "afterFiltersSetInGrid",
	
	//вертикальная прокрутка таблицы
	gridScroll: "gridScroll",
	
	//перед загрузкой очередной страницы 
	beforeDataLoad: "beforeDataLoad",
	
	//данные для прорисовки в таблице были обновлены
	//вызывается после подгрузки новых данных с сервера, при задании данных, после фильтрации, сортировки...
	//если данные пришли с сервера - передаёт в e.detail подгруженную страницу.
	afterDataLoad: "afterDataLoad",

	//изменена видимость или ширина столбцов
	afterColumnsChanged: "afterColumnsChanged",

	//вызывается после прорисовки строк и ячеек. Позволяет задавать на них свои стили и классы, меняя цвет и шрифты
	//Передаёт {$row, row}
	afterRowRendered: "afterRowRendered",
	afterCellRendered: "afterCellRendered",
	
	//вызывается после прорисовки очередной группы строк
	afterRowsRendered: "afterRowsRendered",

	//клик по рабочей части таблицы	
	//Передаёт {rootEvent,altKey,shiftKey,ctrlKey,column,row}
	gridClick: "gridClick",
	gridClickSelectedRow: "gridClickSelectedRow",

	gridDblClick: "gridDblClick",

	
	//щелчок правой кнопкой мыши по рабочей части таблицы	
	//Передаёт {rootEvent,altKey,shiftKey,ctrlKey,column,row}
	canvasContextmenu: "canvasContextmenu",
	
	//целчок по заголовкам столбцов
	//Передаёт {rootEvent,$col,column}
	headersClick: "headersClick",
	
	//щелчок правой кнопкой мыши по заголовкам столбцов
	//Передаёт {rootEvent,$col,column}
	headersContextmenu: "headersContextmenu",

	headerRowContextmenu: "headerRowContextmenu",

	
	beforeInitFilter: "beforeInitFilter",
	onFilterSetValue: "onFilterSetValue",

	//вызывается после инициализации таблицы
	afterGridInit: "afterGridInit",

	
	
//	afterClearInputs: "afterClearInputs",
	
}
/**
 * События используются в формате:
 * this.grid.dispatch(tableEvents.myEvent, myDetails);
 * this.grid.addEventListener(tableEvents.myEvent, e => {});
 */


/**
 * Добавляет в таблицу базовые обработчики, кидает основные события таблицы  
 */
export class GridEvents extends AbstractModule {
	
	constructor(grid){
		super(grid);
	}
	
	init(){
		if (this._initiated){
			return;
		}
		this._addBaseEvents();
		this._initiated = true;
	}


	/**
	 * Добавляет в таблицу основные события, вроде gridScroll,gridClick,headersClick...
	 */
	_addBaseEvents(){

		let view = this.grid.view;
		
		view.$viewport.bind("scroll", e => {
			this.grid._handleScroll(e);
			this.grid.dispatch(tableEvents.gridScroll, e)
		});
		
		view.$viewport.bind("click", e => {

			let detail = this.#makeContextClickDetail(e)

			let clickSelectedRow = detail.row!=null && this.grid.getSelectedRowIndex()==detail.row.index;

			this.grid.dispatch(tableEvents.gridClick, detail)
			
			if (clickSelectedRow)	{
				this.grid.dispatch(tableEvents.gridClickSelectedRow, detail);
			}
			
		
		});
		
		
		view.$viewport.bind("dblclick", e => {
			
			let detail = this.#makeContextClickDetail(e)
			this.grid.dispatch(tableEvents.gridDblClick, detail)
		
		});		
		
		view.$headers.click(e => {
			if (this.grid.colResizeModel.resizingInProcess){
				return;
			}
		
			var $col = $(e.target).closest(".slick-header-column");
			if (!$col.length) {
				return;
			}
		
			var columnIndex = $col.data("column");
			let column = this.grid.model.columns[columnIndex];
		
			let detail = {
				rootEvent: e,
				$col: $col,
				column: column,
			};
		
			this.grid.dispatch(tableEvents.headersClick, detail);
		});			
		
		view.$headers.bind("contextmenu",e => {
			e.preventDefault();

			var $col = $(e.target).closest(".slick-header-column");
			if (!$col.length) {
				return;
			}
			var columnIndex = $col.data("column");
			let column = this.grid.model.columns[columnIndex];

			let detail = {
				rootEvent: e
			};
			detail.$col = $col;
			detail.column = column;

			this.grid.dispatch(tableEvents.headersContextmenu, detail);
		});		
		
		
		this.grid.view.$canvas.bind("contextmenu",e => {
			e.preventDefault();
			let detail = this.#makeContextClickDetail(e)
			this.grid.dispatch(tableEvents.canvasContextmenu, detail);
		});		
		
		if (this.grid.view.$headerRow){
			this.grid.view.$headerRow.bind("contextmenu",e => {
				e.preventDefault();
				
				let detail = {
					rootEvent: e,
					column: null
				};
				
				let $hrc = $(e.target).closest('div.slick-headerrow-column');
				if ($hrc.length==0){
					return;
				}
				detail.column = $hrc.data("column");
	    	  
				this.grid.dispatch(tableEvents.headerRowContextmenu, detail);
			});		
		}
		
		$(window).on("resize", e => {
			this.grid._handleResize();
			
			/*
			let top = this.grid.view.calcViewportTop();
			this.grid.view.$viewport.css("top",top);
			
			this.grid.model.recalcAfterResize();
			this.grid.model.recalcAfterScroll();
			
			this.grid.reload();
			console.log("resize");
			*/
			
		});		
		
	}

	/**
	 * Создаёт detail для события клика по таблице
	 */
	#makeContextClickDetail(e){
		
		let detail = {
			rootEvent: e,
			altKey: event.altKey,
			shiftKey: event.shiftKey,
			ctrlKey: event.ctrlKey,
			column: null,
			row: null
		};
		
		let $target = $(e.target);
		
		//получение текущей ячейки и столбца
		let $row = $target.closest('div.slick-row');
		if ($row.length==0){
			return detail;
		}
		let rowIndex = $row.data("rowno");
		detail.row = this.grid.dataLoader.data[rowIndex];
		
		let columnIndex = this.grid.model.calcColumnByPageX(e.pageX);
		
		if (columnIndex!=null){
			detail.column = this.grid.model.columns[columnIndex];
			if (this.grid.groupModule){
				detail.row = this.grid.groupModule.calcActualRow(detail.row, columnIndex);
			}
		}
		return detail;
		
	}
	

	clear(){
		if (!this._initiated){
			return;
		}
		let view = this.grid.view;
		
		view.$viewport.unbind("scroll");
		view.$viewport.unbind("click");
		view.$headers.unbind("click");
		view.$headers.unbind("contextmenu");
		this.grid.view.$canvas.unbind("contextmenu");
		this._initiated = false;
	}	
	
}
