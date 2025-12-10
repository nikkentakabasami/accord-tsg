


import { AbstractModule} from './tet.slick.grid.misc.js';
import { TsgTitleView } from './tet.slick.grid.view.title.js';
import {tsgUtils} from './tet.slick.grid.utils.js';



/**
 * Creates a new instance of the grid.
 **/
export class TsgView extends AbstractModule {

	//сама таблица
	$container;

	//заголовки столбцов
	$headerScroller = null;
	$headers = null;

	//строка с фильтрами
	$headerRowScroller = null;
	$headerRow = null;
	$form = null;

	//Область таблицы, содержащая $canvas
	//Содержит полосы прокрутки - для скрулинга строк.
	$viewport = null;

	//div, в котором проприсованы строки.
	//Имеет высоту options.rowHeight*data.length
	$canvas = null;



	$style = null;

	titleHeader = null;


	renderedRowsDiapazon = [0, 0];
	$rows = [];


	//уникальный класс, который будет назначен на текущую таблицу
	//Для первой таблицы это "grid1", для второй "grid2" и т.д.
	gridUniqueClass;

	//на какое число строк рассчитан текущий размер холста 
	canvasRowsCount = null;

	constructor(containerSelector, grid) {
		super(grid);
		this.$container = $(containerSelector);

		//после подгрузки данных
		this.grid.addEventListener(tsgUtils.tableEvents.afterDataLoad, event => {

			//Если изменилось общее число строк - меняем соответственно высоту холста
			let totalRowsCount = this.grid.dataLoader.totalRowsCount;
			if (this.canvasRowsCount != totalRowsCount) {
				this.canvasRowsCount = totalRowsCount;
				//правим размеры холста
				let canvasHeight = totalRowsCount != null ? this.grid.model.options.rowHeight * totalRowsCount : 0;
				this.$canvas.height(canvasHeight);
				
				this.grid.logDebug("resize canvas.","totalRowsCount:",totalRowsCount,"canvasHeight:",canvasHeight);
				
			}

			//показываем новое число записей
			if (this.grid.view.titleHeader) {
				let $rowsCountSpan = this.grid.view.titleHeader.$rowsCountSpan;
				if ($rowsCountSpan) {
					$rowsCountSpan.empty().append(totalRowsCount);
				}
			}
		});


	}

	init() {
		if (this._initiated) {
			return;
		}
		this._initiated = true;

		this.createColumnHeaders();

		this.resizeCanvas();
		this.createCssRules();
		//		this.render();

	}


	/**
	 * Удаляет прорисованные заголовки столбцов, строки и фильтры.
	 * Чтобы вернуть их - нужно вызвать init() и render(). 
	 */
	clear() {
		if (!this._initiated) {
			return;
		}

		this.clearRows();
		this.$headers.empty();
		this.$headerRow.empty();
		if (this.$style) {
			this.$style.remove();
			this.$style = null;
		}
		this.$viewport.scrollTop(0);
		this.$viewport.scrollLeft(0);
		this.renderedRowsDiapazon = [0, 0];

		if (this.titleHeader) {
			this.titleHeader.clear();
		}

		this._initiated = false;
	}



	/**
	 * Создание ключевых элементов таблицы.
	 * Вызывается до инициализации.
	 * 
	 */
	createBaseDomElements() {

		let options = this.grid.model.options;

		if (this.$container.length < 1) {
			throw new Error("TetSlickGrid requires css selector for container.");
		}

		this.gridUniqueClass = "grid" + this.grid.id;

		this.$container
			.empty()
			.addClass(this.gridUniqueClass)
			.addClass("tsc-grid");
		//			.addClass("ui-widget");




		if (options.customTitleView) {
			this.titleHeader = options.customTitleView;
			this.titleHeader.grid = this.grid;
		} else {
			this.titleHeader = new TsgTitleView(this.grid);
		}
		this.titleHeader.createDomElements();




		if (options.showColumnHeaders) {
			this.$headerScroller = $("<div class='slick-header ui-state-default' />").height(options.columnHeadersHeight).appendTo(this.$container);
			this.$headers = $("<div class='slick-header-columns no-select' />").appendTo(this.$headerScroller);
		}


		if (options.showHeaderRow) {

			let formId = "mainFilter";
			if (this.grid.id>1){
				formId+=this.grid.id;
			}

			this.$headerRowScroller = $("<div class='slick-headerrow ui-state-default' />");
			this.$headerRow = $("<div class='slick-headerrow-columns' />");
						
			this.$form = $("#" + formId);
			if (this.$form.length == 0) {
				this.$form = $('<form id="' + formId + '" role="form" class="form-horizontal ng-pristine ng-valid" action="." method="post"/>')
					.appendTo(this.$container);
				this.$headerRowScroller.appendTo(this.$form);
			} else {
				this.$headerRowScroller.appendTo(this.$container);
			}
			this.$headerRow.appendTo(this.$headerRowScroller);
			
//			this.$headerRowScroller = $("<div class='slick-headerrow ui-state-default' />").appendTo(this.$form);
//			this.$headerRow = $("<div class='slick-headerrow-columns' />").appendTo(this.$headerRowScroller);
			
			
		}


		this.$viewport = $("<div class='slick-viewport'>").appendTo(this.$container);

		let cc = options.enableTextSelectionOnCells ? '' : 'no-select';
		this.$canvas = $("<div class='grid-canvas " + cc + "' />").appendTo(this.$viewport);

	}



	/**
	 * Создание заголовков столбцов. 
	 * Вызывается при инициализации.
	 * 
	 */
	createColumnHeaders() {

		this.$headers.empty();

		if (this.$headerRowScroller != null) {
			this.$headerRow.empty();
		}

		let model = this.grid.model;


		for (var i = 0; i < model.columns.length; i++) {
			let m = model.columns[i];

			let $header = $("<div class='slick-header-column' />")
				.html("<span class='slick-column-name'>" + m.name + "</span>")
				.width(m.width)
				.attr("id", "" + model.uid + "_" + m.id)
				.attr("title", m.toolTip || "")
				.data("column", i)
				.addClass(m.headerCssClass || "")
				.appendTo(this.$headers);

			if (m.sortable) {
				$header.addClass("slick-header-sortable");
				$header.append("<span class='slick-sort-indicator' />");
			}


			if (model.options.showHeaderRow) {
				let $headerRowCell = $("<div class='slick-headerrow-column'/>")
					.width(m.width)
					.data("column", m)
					.appendTo(this.$headerRow);
			}

		}//for columns

	}


	/**
	 * Перерисовывает таблицу после изменения дескрипторов столбцов 
	 */
	redrawAfterColumnsChange() {
		this.createColumnHeaders();
		this.createCssRules();
		this.clearRows()
		this.render();

	}

	/**
	 * Динамически создаёт css-классы для ячеек и столбцов.
	 * 
	 */
	createCssRules() {
		if (this.$style) {
			this.$style.remove();
			this.$style = null;
		}

		let model = this.grid.model;

		let cw = model.calcCanvasWidth();

		this.$style = $("<style type='text/css' rel='stylesheet' />").appendTo($("head"));
		var rules = [
			"." + this.gridUniqueClass + " .slick-row { height:" + model.options.rowHeight + "px; width:" + cw + "px }"
		];

		let left = 0;
		for (var i = 0; i < model.columns.length; i++) {
			let c = model.columns[i];
			rules.push("." + this.gridUniqueClass + " .tc" + i + " {" +
				"width: " + c.width + "px; " +
				"left: " + left + "px; " +
				"}");

			left += c.width;
		}

		if (this.$style[0].styleSheet) { // IE
			this.$style[0].styleSheet.cssText = rules.join(" ");
		} else {
			this.$style[0].appendChild(document.createTextNode(rules.join(" ")));
		}
	}


	/**
	 * Удаляет все прорисованные строки
	 */
	clearRows() {
		this.$rows.length = 0;
		this.$canvas.empty()
	}

	clearBeforeReload() {
		this.clearRows();
		this.$viewport.scrollTop(0);
		this.renderedRowsDiapazon = [0, 0];
	}




	/**
	 * Прорисовывает строки.
	 * Удаляет уже ненужные прорисованные строки.
	 * Подгружает новые данные из dataLoader-а, если необходимо
	 */
	render() {
		let model = this.grid.model;
		let dataLoader = this.grid.dataLoader;

		let options = this.grid.model.options;

		//		let dataLoaderMode = (this.grid.dataLoader!=null);

		//Если данных нет - просто очищаем записи
//		if (!dataLoader.totalRowsCount) {
//			this.clearRows();
//			return;
//		}

		let renderedStart = this.renderedRowsDiapazon[0];
		let renderedEnd = this.renderedRowsDiapazon[1];

		let visibleStart = model.visibleRowsStart;
		let visibleEnd = model.visibleRowsEnd;



		//		console.log("rendered: %i:%i; visible: %i:%i",renderedStart,renderedEnd,visibleStart,visibleEnd);


		//нужные строки уже прорисованы		
		if (visibleStart >= renderedStart && visibleEnd <= renderedEnd) {
			return;
		}

		let renderReserve = options.rowRenderReserve;

		let start = Math.max(visibleStart - renderReserve, 0);
		let end = visibleEnd + renderReserve;

//		end = Math.min(end,dataLoader.totalRowsCount-1);
//		if (this.grid.dataLoader.totalRowsCount>0){
//		}
		
		//		console.log("going to render: %i:%i",start,end);

		//удаляем ненужные строки		
		for (let i = renderedStart; i < start; i++) {
			if (this.$rows[i] != null) {
				this.$rows[i].remove();
				this.$rows[i] = null;
			}
		}
		for (let i = end + 1; i <= renderedEnd; i++) {
			if (this.$rows[i] != null) {
				this.$rows[i].remove();
				this.$rows[i] = null;
			}
		}

		this.grid.logDebug("model.scrollTop",this.grid.model.scrollTop);
		
		this.grid.dataLoader.ensureData(start, end, responsePage => {
			//			this.resizeCanvas();

			this.#renderRows(start, end);
		});



	}



	/**
	 * Прорисовывает строки в заданном диапазоне
	 */
	#renderRows(start, end) {

		//прорисовываем новые строки
		let model = this.grid.model;

		let actualStart = null, actualEnd = null;
		for (let i = start; i <= end; i++) {
			let r = this.#renderRow(i);
			if (r){
				actualEnd = i;
				if (actualStart==null){
					actualStart = i;
				}
			}
		}
		
		if (actualStart!=null){
			this.grid.logDebug("rendered rows: ",actualStart,"-",actualEnd);
		}

		
		this.renderedRowsDiapazon = [start, end];

		this.grid.dispatch(tsgUtils.tableEvents.afterRowsRendered, this.renderedRowsDiapazon);


	}

	#renderRow(rowNo) {

		if (this.$rows[rowNo] != null) {
			return false;
		}

		let model = this.grid.model;
		let selectModel = this.grid.selectModel;
		let dataLoader = this.grid.dataLoader;

		//TODO bug
		//		let selectedRow = this.grid.selectModel.getSelectedRowIndex();

		let r = dataLoader.data[rowNo];
		if (r == null) {
			return false;
		}

		let currTop = rowNo * model.options.rowHeight;

		var $row = $('<div class="slick-row" data-rowno="' + rowNo + '" style="top: ' + currTop + 'px">').appendTo(this.$canvas);
		this.$rows[rowNo] = $row;

		let cfc = this.grid.model.options.cssClassForCellCallback;


		for (let c = 0; c < model.columns.length; c++) {
			let col = model.columns[c];

			let formatter = col.formatter != null ? col.formatter : model.options.defaultFormatter;

			let rowVal = this.grid.model.extractRowCellCaption(r, col);

			//			let val = formatter(rowNo, c, r[col.id], r);
			let val = formatter(rowNo, c, rowVal, r);


			let $cell = $('<div class="slick-cell def-cell tc' + c + '"/>').html(val);

			//показываем всплывающую подсказку - если задана соответствующая опция в настройках столбца
			if (col.showTitleForContent && val.length > 5) {
				$cell.attr("title", rowVal);
			}


			//.data('colno',c)

			if (selectModel.isHighlightedCell(rowNo, c)) {
				$cell.addClass(this.grid.model.options.selectedCellCssClass);
			}
			$cell.appendTo($row);

			if (cfc) {
				let cellClass = cfc(r, col, dataLoader.data, rowNo, c);
				if (cellClass) {
					$cell.addClass(cellClass);
				}

			}

			this.grid.dispatch(tsgUtils.tableEvents.afterCellRendered, {
				$row: $row,
				rowNo: rowNo,
				row: r,
				$cell: $cell,
				colNo: c,
				col: col
			});

		}

		let cfr = this.grid.model.options.cssClassForRowCallback;
		if (cfr) {
			let rowClass = cfr(r, rowNo, dataLoader.data);
			if (rowClass) {
				$row.addClass(rowClass);
			}
		}

		this.grid.dispatch(tsgUtils.tableEvents.afterRowRendered, {
			$row: $row,
			row: r
		});

		return true;
	}




	/**
	 * Прокручивает горизонтальный ползунок так, чтобы был виден заданный столбец.
	 * */
	scrollColumnIntoView(colNo) {
		let model = this.grid.model;

		if (colNo < 0 || colNo >= model.columns.length) {
			colNo = 0;
		}

		let newLeft = 0;

		for (var i = 0; i < colNo; i++) {
			let m = model.columns[i];
			newLeft += m.width;
		}//for columns		

		this.$viewport.scrollLeft(newLeft);

	}

	removeRow(rowNo) {

		let $row = this.$rows[rowNo];
		if ($row) {
			$row.remove();
		}
		this.$rows[rowNo] = null;

	}

	//Перерисовка строки (после изменения данных)
	updateRow(rowNo) {
		this.removeRow(rowNo);
		this.#renderRow(rowNo);
	}


	/*	
	calcViewportHeight() {
		let r = this.$container.height();
		
		if (this.$headerScroller!=null){
			r-=this.$headerScroller.outerHeight();
		}
		
		if (this.$headerRowScroller!=null){
			r-=this.$headerRowScroller.outerHeight();
		}
		
		if (this.titleHeader.$titleHeader.length>0){
			r-=this.titleHeader.$titleHeader.outerHeight();
		}
		return r;		
	}
	*/

	calcViewportTop() {
		let r = 0;
		if (this.$headerScroller != null) {
			r += this.$headerScroller.outerHeight();
		}

		if (this.$headerRowScroller != null) {
			r += this.$headerRowScroller.outerHeight();
		}

		if (this.titleHeader.$titleHeader.length>0 && this.grid.model.options.showTitleHeader){
			r += this.titleHeader.$titleHeader.outerHeight();
		}
		return r;
	}


	/**
	 * Обновляет ширину холста и панели заголовков (после изменений в столбцах)
	 */
	resizeCanvas() {
		let canvasWidth = this.grid.model.calcCanvasWidth();

		this.$canvas.width(canvasWidth);
		this.$headers.width(canvasWidth);

		if (this.$headerRowScroller != null) {
			this.$headerRow.width(canvasWidth);
		}
	}


	/**
	 * Обновляет ширину столбцов на основе данных из модели
	 */
	applyColumnHeaderWidths() {

		let headers = this.$headers.children();

		for (var i = 0; i < headers.length; i++) {
			let h = $(headers[i]);
			let c = this.grid.model.columns[i];

			if (h.width() !== c.width) {
				h.width(c.width);
			}
		}

		//      updateColumnCaches();
	}


}





