
import { tableEvents } from './tet.slick.grid.events.js';
import { AbstractModule } from './tet.slick.grid.misc.js';

/**
 * Добавляет в таблицу поддержку сортировки по столбцам.
 * Содержит модель сортировки: поле sortColumns.
 * Добавляет обработчики кликов по столбцам, прорисовывает значки сортировки.
 * При изменении сортировки - кидает событие sortChanged.
 * Сортировку строк не выполняет! Этим занимается dataLoader.
 * 
 */
export class TsgSortModel extends AbstractModule {

	//массив со столбцами, по которым должна идти сортировка
	//имеет формат [{"columnId":"myCol","sortAsc":false}]
	sortColumns = [];


	constructor(grid) {
		super(grid);

		this.grid.addEventListener(tableEvents.headersClick, e => {

			let column = e.detail.column;

			if (!column.sortable) {
				return;
			}

			//если кликнули по столбцу, по которому уже идёт сортировка - меняем на нём порядок сортировки
			for (let i = 0; i < this.sortColumns.length; i++) {
				let sortOpts = this.sortColumns[i];
				if (sortOpts.columnId == column.id) {
					sortOpts.sortAsc = !sortOpts.sortAsc;
					this.renderColumnSort();
					this.grid.dispatch(tableEvents.sortChanged, this.getSortString());
					return;
				}
			}

			//если кликнули по столбцу без сортировки
			this.setSortColumnsString(column.id);

		});
	}

	init() {
		super.init();
	}


	//Возвращает текущую сортировку в строковом формате.
	//Пример: "myFirstCol+_mySecondCol+"
	//Если в столбце задана опция sortName - использует её в качестве имени столбца сортировки
	getSortString() {
		let sortString = "";

		for (let i = 0; i < this.sortColumns.length; i++) {
			let col = this.sortColumns[i];

			if (i > 0) {
				sortString += "_";
			}

			let modelCol = this.grid.model.columnsById[col.columnId];
			let sortName = modelCol.sortName ? modelCol.sortName : modelCol.id;

			sortString += sortName + (col.sortAsc ? "+" : "-");
		}

		return sortString;
	}


	//Задание столбцов сортировки в виде строки.
	//Строка имеет формат "col1, col2 desc"
	setSortColumnsString(colsString) {

		if (!colsString) {
			this.setSortColumns([]);
			return;
		}

		let cols = colsString.split(",").reduce((sortColumns, colStr) => {

			let cs = colStr.trim().split(" ");

			let col = {
				columnId: cs[0],
				sortAsc: true
			};

			if (cs.length > 1 && cs[1] == "desc") {
				col.sortAsc = false;
			}

			sortColumns.push(col);

			return sortColumns;
		}, []);

		this.setSortColumns(cols);

	}


	//Задание столбцов сортировки в виде массива объектов (см. this.sortColumns).
	setSortColumns(cols) {

		if (cols == null || cols.length == 0) {
			this.sortColumns = [];
		} else {
			this.sortColumns = cols.reduce((sortColumns, col) => {

				let columnIndex = this.grid.model.getColumnIndex(col.columnId);
				if (columnIndex == null) {
					return sortColumns;
				}

				col.index = columnIndex;
				sortColumns.push(col);

				return sortColumns;
			}, []);
		}

		this.renderColumnSort();
		this.grid.dispatch(tableEvents.sortChanged, this.sortColumns);


	}

	clearSort() {
		this.sortColumns.length = 0;
		this.#clearSortStyles();
	}

	/**
	 * Сносит прорисовку сортировки.
	 */
	#clearSortStyles() {
		this.grid.view.$headers.children()
			.removeClass("slick-header-column-sorted")
			.find(".slick-sort-indicator")
			.removeClass("slick-sort-indicator-asc slick-sort-indicator-desc");
	}


	/**
	 * Прорисовывает текущее состояние сортировки
	 */
	renderColumnSort() {
		this.#clearSortStyles();

		$.each(this.sortColumns, (i, col) => {

			this.grid.view.$headers.children().eq(col.index)
				.addClass("slick-header-column-sorted")
				.find(".slick-sort-indicator")
				.addClass(col.sortAsc ? "slick-sort-indicator-asc" : "slick-sort-indicator-desc");
		});

	}









}



