

import {columnDefaults,tableDefaults,getPosition,AbstractModule} from './tet.slick.grid.misc.js';
import {tableEvents} from './tet.slick.grid.events.js';




/**
 * Модель таблицы.
 * Содержит опции (options), дескрипторы столбцов (baseColumns), их текущее состояние (columns),
 * прокрутку и размеры области прорисовки
 * 
 * 
 * 
 */
export class TsgModel extends AbstractModule {

	//массив столбцов, заданный при создании таблицы
	baseColumns;
	
	//текущие столбцы (в них может быть изменён порядок, ширина, видимость)
	columns;

	//мап для доступа к текущим столбцам по их id	
	columnsById = {};
	
	
	options;
	
	//строковый уникальный id таблицы.
	//может использоваться для генерации других уникальных id
	uid = null;
	
	//текущая прокрутка в view.$viewport.
	//определяет насколько должны быть прокручены строки и столбцы таблицы.
	scrollTop = 0;
	scrollLeft = 0;

	//сколько строк помещается в viewport
	numVisibleRows = 0;
	
	
	//строки, которые видимы в данный момент
	visibleRowsStart;
	visibleRowsEnd;
	
	
	canvasWidth;

	//смещение контейнера относительно страницы (по оси x)
	//используется чтобы определять столбец, по которому произошёл клик
	containerPosition = null;


	constructor(grid, columns, options) {
		super(grid);
		
		this.options = $.extend({}, tableDefaults, options);

		if (this.options.enableHeaderRowFilters){
			this.options.showHeaderRow = true;
		}
		
		
		this.uid = "tsg_" + Math.round(1000000 * Math.random());

		columnDefaults.width = this.options.defaultColumnWidth;

		this.baseColumns = columns;
		this.setColumns(columns);

	}



	resetColumns(){
		
		if (this.options.hiddenFields){
			let viewColumns = [];
		
			for (let i = 0; i < this.baseColumns.length; i++) {
				let col = this.baseColumns[i];
				let ind = this.options.hiddenFields.indexOf(col.id);
				if (ind<0){
					viewColumns.push(col);
				}
			}
			this.setColumns(viewColumns);
		} else {
			this.setColumns(this.baseColumns);
		}
		
	}


	setColumns(columns){
		
		//копируем массив columns
		this.columns = columns.slice();

		this.columnsById = {};
		for (let i = 0; i < this.columns.length; i++) {
			
			let m = this.columns[i] = $.extend({}, columnDefaults, this.columns[i]);
			
			if (this.columnsById[m.id]){
				console.error('Сolumn duplication! Сolumn '+m.id+' already exists.');
			}
			
			this.columnsById[m.id] = m;
			m.index = i;
			
			if (!m.captionField){
				m.captionField = m.id;
			}
			if (!m.valueField){
				m.valueField = m.id;
			}

			
			if (!m.sortField){
				m.sortField = m.captionField;
			}
			
			m.width = Math.max(m.width,this.options.minColumnWidth);
			m.width = Math.min(m.width,this.options.maxColumnWidth);
		}
		this.grid.dispatch(tableEvents.afterColumnsChanged);
	}

	hideColumn(colId){
		let col = this.columnsById[colId];
		if (!col){
			return;
		}
		
		this.columns.splice(col.index, 1);
		this.setColumns(this.columns);
		
	}


	getColumnIndex(id) {
		return this.columnsById[id].index;
	}

	recalcAfterResize(){
		let viewportH = grid1.view.$viewport.height()
		this.numVisibleRows = Math.ceil(viewportH / this.options.rowHeight);
		
		this.containerPosition = getPosition(this.grid.view.$container[0]).x;
		
		this.recalcAfterScroll();
	}


	recalcAfterScroll(){
		
		let start = Math.floor(this.scrollTop / this.options.rowHeight);
		
		this.visibleRowsStart = start;
		this.visibleRowsEnd = start+this.numVisibleRows;
		
	}




	calcCanvasWidth() {
		let r = 0;		
		for (let i = 0; i < this.columns.length; i++) {
			r+=this.columns[i].width;
		}
		return r;
	}

	//Возвращает столбец, находящийся в заданной координате, относительно окна
	calcColumnByPageX(pageX){
		let canvasX = pageX+this.scrollLeft-this.containerPosition;
		
		let pos = 0;
		for(let i = 0; i<this.columns.length; i++){
			let c = this.columns[i];
			pos+=c.width;
			if (canvasX<pos){
				return i;
			}
		}				
		return null;
	}

	
	

	/**
	 * Извлекает из строки значение по id столбца.
	 * Либо можно использовать дот-нотацию. Например "request.customer.name"
	 * Использует буферизацию для ускорения.
	 */
	extractRowCellValue(row, colId){

		let column;
		if (colId.valueField){
			column = colId;
		} else {
			column = this.columnsById[colId];
		}
		if (column){
			colId = column.valueField;
		}
		return this.extractRowCell(row,colId);
	}

	extractRowCellCaption(row, colId){
		let column;
		if (colId.valueField){
			column = colId;
		} else {
			column = this.columnsById[colId];
		}
		if (column){
			colId = column.captionField;
		}
		return this.extractRowCell(row,colId);
	}
	
	
	colIdSplits = {};
	extractRowCell(row, path){

		let split = this.colIdSplits[path];
		if (!split){
			split = path.split('.');
			this.colIdSplits[path] = split;
		}

		if (split.length==1){
			return row[path];
		}

		return split.reduce((val, currFieldName) => val[currFieldName], row);		
	}
		

}



