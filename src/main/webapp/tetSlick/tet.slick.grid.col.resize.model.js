

import {AbstractModule} from './tet.slick.grid.misc.js';
import {tsgUtils} from './tet.slick.grid.utils.js';


export class ColumnResizeModel  extends AbstractModule {
	
	//столбец, размер которого, в данный момент, можно изменить перетаскиванием	
	resizableColumnNo = null;
	
	//положение границ между столбцами на странице (используются для проверки возможности изменения размеров столбцов)
	splitterPositions = [];
	
	$headers = null;
	
	//положение элмента $headers на странице
	headersPos = 0;

	//столбец, размеры которого в данный момент перетаскиваются
	dragCol = null;
	dragColNo = null;
	startDragPosition = null;
	$dragColHeader = null;
	$headerRowHeader = null;
	
	dragColPrevWidth = null;
	
	
	//выполняется перетаскивание (флаг, предотарвщающий события с кликами)
	resizingInProcess = false;
	
	
	constructor(grid){
		super(grid);
	}
	
	
	init(){
		if (this._initiated){
			return;
		}
		this.$headers = this.grid.view.$headers;
		this.headersPos = tsgUtils.getPosition(this.grid.view.$headerScroller[0]).x;
		
		this.#recalcSplitterPositions();
		
		this.$headers.bind("mousemove", this.handleHeadersMouseMove);
		this.$headers.bind("mousedown", this.handleMouseDown);
		$(window).bind("mousemove", this.handleWindowMouseMove);
		$(window).bind("mouseup", this.handleMouseUp);
		this._initiated = true;
	}

	clear(){
		if (!this._initiated){
			return;
		}
		
		this.$headers.unbind("mousemove", this.handleHeadersMouseMove);
		this.$headers.unbind("mousedown", this.handleMouseDown);
		$(window).unbind("mousemove", this.handleWindowMouseMove);
		$(window).unbind("mouseup", this.handleMouseUp);
		this._initiated = false;
	}


	//меняем вид курсора если он над границей между столбцами (и нет режима перетаскивания)		
	handleHeadersMouseMove = e => {
	
		//идёт перетаскивание
		if (this.dragColNo!=null){
			return;
		}
		
		if (!this.#updateResizableColumnNo(e.pageX)){
			return;
		}
		
		if (this.resizableColumnNo==null){
			this.$headers.css("cursor","default");
		} else {
			this.$headers.css("cursor","col-resize");
		} 
	}

	//при нажатии на мышь - начинаем перетаскивание
	handleMouseDown = e => {
		if (this.resizableColumnNo==null){
			return;
		}
		
		e.preventDefault();
		this.resizingInProcess = true;
		
		this.dragColNo = this.resizableColumnNo;
		this.dragCol = this.grid.model.columns[this.dragColNo];
		this.startDragPosition = e.pageX;
		this.dragColPrevWidth = this.dragCol.width;
		
		this.$dragColHeader = $(this.$headers.children()[this.dragColNo]);
		
		if (this.grid.view.$headerRow){
			this.$headerRowHeader = $(this.grid.view.$headerRow.children()[this.dragColNo]);
		}
		
	}

	//при движении мыши - меняем размер столбца, если активен режим перетаскивания
	handleWindowMouseMove = e => {
		if (this.dragColNo==null){
			return;
		}
		
		let options = this.grid.model.options;
		
		let d = e.pageX-this.startDragPosition;
		
		let newWidth = this.dragColPrevWidth+d;
		
		if (d<0){
			newWidth = Math.max(newWidth,options.minColumnWidth);
		} else {
			newWidth = Math.min(newWidth,options.maxColumnWidth);
		}
		
		this.dragCol.width = newWidth;
		this.$dragColHeader.outerWidth(newWidth);
		if (this.$headerRowHeader){
			this.$headerRowHeader.outerWidth(newWidth);
		}
		
		
	}
	
	//мышь поднята - заканчиваем перетаскивание, перерисовываем таблицу
	handleMouseUp = e => {
		if (this.dragColNo==null){
			return;
		}
		e.preventDefault();
		
		this.handleWindowMouseMove(e);
		
		this.dragColNo = null;
		this.startDragPosition = null;
		
		this.$dragColHeader = null;
		this.$headerRowHeader = null;
		this.dragCol = null;
		this.dragColPrevWidth = null;

		this.#recalcSplitterPositions();
		
		//меняем размер канвы
		this.grid.view.resizeCanvas()
		
		//меняем ширину прорисованных ячеек таблицы
		this.grid.view.createCssRules();
		
		this.grid.dispatch(tsgUtils.tableEvents.afterColumnsChanged);
		
		setTimeout(()=>{
			this.resizingInProcess = false;
		},200);
		
	}

	#isColumnSplitterArea(columnIndex, pageX){
		pageX+=this.grid.model.scrollLeft;
		let splitterPosition = this.splitterPositions[columnIndex];
		let options = this.grid.model.options;
		
		return splitterPosition<(pageX+options.splitterArea) && splitterPosition>(pageX-options.splitterArea);
	}
	
	#updateResizableColumnNo(pageX){
		
		if (this.resizableColumnNo!=null){
			if (this.#isColumnSplitterArea(this.resizableColumnNo, pageX)){
				return false;
			} else {
				this.resizableColumnNo = null;
				return true;
			}
		}
		
		for(let i = 0; i<this.splitterPositions.length; i++){
			if (this.#isColumnSplitterArea(i, pageX)){
				this.resizableColumnNo = i;
				return true;
			}
		}		
		return false;
	}
		
	/**
	 * Рассчёт положений разделителей столбцов
	 */
	#recalcSplitterPositions(){
		let pos = 0;
		let columns = this.grid.model.columns;
		
		this.splitterPositions.length = columns.length;
		for(let i = 0; i<columns.length; i++){
			let c = columns[i];
			pos+=c.width;
			
			this.splitterPositions[i] = pos + this.headersPos;
		}		
	}
	
	
	
	
}














