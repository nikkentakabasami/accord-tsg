import { AbstractModule, checkmarkFormatter, tetSlickRelativePath } from './tet.slick.grid.misc.js';
import { TetSlickGrid } from './tet.slick.grid.js';

import { tableEvents } from './tet.slick.grid.events.js';

//import { AccModalDialog } from '../accord/modal-dialog.js';


/**
 * Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
 * 
 */
export class ColumnOrderDialogModel extends AbstractModule {


	static colsColumns = [{
		id: "visible",
		name: "",
		field: "visible",
		formatter: checkmarkFormatter,
		width: 50
	}, {
		id: "name",
		name: "Наименование",
		field: "name",
		width: 350
	}, {
		id: "field",
		name: 'Перейти',
		field: "field",
		formatter: function(rowNo, column, value) {
			return '<span class="glyphicon glyphicon-share-alt to-col text-success"/>';
		},
		width: 80
	}
	];

	static colsOptions = {
		showTitleHeader: false,
		explicitInitialization: false,
		singleRowSelectionModel: true
	};






	colsGrid;

	columnsOrderingDialog;

	colsData = [];


	$dialogContainer = null;


	constructor(grid) {
		super(grid);
		this.grid.columnOrderDialogModel = this;
	}


	init() {
		if (this._initiated) {
			return;
		}



		this.columnsOrderingDialog = new AccModalDialog({
			id: "columnsOrderingDialog",
			//			dialogSelector: "#columnsOrderingDialog",
			title: "Параметры столбцов",
			contentUrl: tetSlickRelativePath + "fragments/columnsDialogContent.html",
			dialogWidth: 700,
			dialogHeight: 500,

			onOk: () => {
				this.#doSetColumns();
			},


		});

		//кнопки изменения порядка строк
		$('#rowUp').click(e => {
			let sr = this.colsGrid.selectModel.getSelectedRow();
			if (sr == null) {
				return;
			}
			this.#moveRow(sr.index, true);
		});
		$('#rowDown').click(e => {
			let sr = this.colsGrid.selectModel.getSelectedRow();
			if (sr == null) {
				return;
			}
			this.#moveRow(sr.index, false);
		});

		$("#hideAll").click(e => {
			for (var i = 0; i < this.colsData.length; i++) {
				this.colsData[i].visible = false;
			}
			this.colsGrid.refresh();
		});
		$("#showAll").click(e => {
			for (var i = 0; i < this.colsData.length; i++) {
				this.colsData[i].visible = true;
			}
			this.colsGrid.refresh();
		});


		//Кнопка очистки всех куки
		$("#clearCookies").click(e => {

			accordUtils.deleteAllCookies();
			//					deleteAllCookies();

			if (this.grid.model.options.clearUserPreferencesUrl) {

				$.ajax({
					type: "POST",
					url: this.grid.model.options.clearUserPreferencesUrl,
					data: { 'keys': this.grid.model.options.colCookieName },
					complete: (data, status, request) => {
						this.hideDialog();
						this.grid.model.resetColumns();
						this.grid.reload();
					},
					error: (jqXHR, textStatus, errorThrown) => {
						console.log(textStatus);
					}
				});

			} else {
				this.hideDialog();
				this.grid.model.resetColumns();
				this.grid.reload();
			}


		});



		this._initiated = true;
	}

	clear() {
		//		this.$dialogContainer.remove();
		//		this.$dialogContainer = null;

		this._initiated = false;
	}






	#switchRows(row1, row2) {
		let r1 = this.colsData[row1];
		let r2 = this.colsData[row2];

		this.colsData[row1] = r2;
		this.colsData[row2] = r1;

		r1.index = row2;
		r2.index = row1;

		this.colsGrid.view.updateRow(row1);
		this.colsGrid.view.updateRow(row2);
	}


	#moveRow(rowIndex, moveUp) {

		if (moveUp) {

			if (rowIndex <= 0) {
				return;
			}
			this.#switchRows(rowIndex - 1, rowIndex);
			this.colsGrid.selectModel.selectRow(rowIndex - 1);

		} else {

			if ((rowIndex + 1) >= this.colsData.length) {
				return;
			}
			this.#switchRows(rowIndex + 1, rowIndex);
			this.colsGrid.selectModel.selectRow(rowIndex + 1);
		}
	}

	#doShowGridColumn(colNo) {

		let cr = this.colsData[colNo];
		if (!cr.visible) {
			this.grid.alert('Этот столбец не показывается в таблице!');
			return;
		}

		this.#doSetColumns();
		let actualCol = this.grid.model.getColumnIndex(this.colsData[colNo].id);
		this.grid.view.scrollColumnIntoView(actualCol);

	}


	/**
	 * При нажатии на Ок.
	 * Задаёт новый порядок столбцов в таблицу.
	 */
	#doSetColumns() {

		let visibleColumns = [];
		for (var i = 0; i < this.colsData.length; i++) {
			let c = this.colsData[i];
			if (c.visible) {
				let gc = this.grid.model.columnsById[c.id];
				c = $.extend({}, c, gc);
				visibleColumns.push(c);
			}
		}

		this.grid.model.setColumns(visibleColumns);
		//		this.grid.model.recalcAfterColumnsChange();
		this.hideDialog();
		this.grid.reload();
		this.grid.view.render();

	}


	#createAndInitColsGrid() {

		if (!this.colsGrid) {

			let colsOptions = ColumnOrderDialogModel.colsOptions;
			if (this.grid.model.options.columnDialogTableOptions) {
				colsOptions = $.extend({}, colsOptions, this.grid.model.options.columnDialogTableOptions);
			}

			this.colsGrid = new TetSlickGrid("#columnsOrderingGrid", this.colsData, ColumnOrderDialogModel.colsColumns, colsOptions);

			this.colsGrid.addEventListener(tableEvents.gridClick, e => {
				if (e.detail.row == null) {
					return;
				}
				let row = e.detail.row;

				if (e.detail.column.index == 0) {
					row.visible = !row.visible;
					this.colsGrid.view.updateRow(row.index);
					return;
				} else if (e.detail.colNo == 2) {
					this.#doShowGridColumn(row.index);

				}



			});
		}
	}



	/**
	 * Обновляем this.colsData актуальными данными по столбцам
	 */
	refreshData() {

		let visibleCols = this.grid.model.columns;
		let baseColumns = this.grid.model.baseColumns;
		this.colsData = accordUtils.jsonCopy(visibleCols);

		let visibleColsIds = [];
		for (let i = 0; i < visibleCols.length; i++) {
			this.colsData[i].visible = true;
			visibleColsIds.push(visibleCols[i].id);
		}

		for (var i = 0; i < baseColumns.length; i++) {
			let col = baseColumns[i];
			let ind = visibleColsIds.indexOf(col.id);
			if (ind < 0) {
				col.visible = false;
				this.colsData.splice(i, 0, col);

			}
		}

	}





	hideDialog() {
		this.columnsOrderingDialog.hide();



		//		this.$columnsOrderingDialog.modal("hide");
	}

	showDialog() {
		this.columnsOrderingDialog.show();
		//		this.$columnsOrderingDialog.modal();

		//создаём таблицу, если она не создана
		this.#createAndInitColsGrid();

		//обновляем и прорисовываем в ней данные
		this.refreshData();
		this.colsGrid.dataLoader.setSourceData(this.colsData);
		this.colsData = this.colsGrid.dataLoader.data;
		this.colsGrid.refresh();

	}


}
