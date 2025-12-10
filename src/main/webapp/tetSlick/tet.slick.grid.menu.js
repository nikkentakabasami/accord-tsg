
import {AbstractModule} from './tet.slick.grid.misc.js';
import {tsgUtils} from './tet.slick.grid.utils.js';


/**
 * Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
 */
export class GridMenuModel1  extends AbstractModule {
	
	$contextMenu;
	$tableHeaderContextMenu;
	
	//столбец, для которого было показано меню
	currentColumn = null;
	currentRow = null;
	
	menuShown = false;
	
	constructor(grid){
		super(grid);
	}
	
	init(){
		super.init();
		
		this.#createHeaderContextMenu();
		this.#createContextMenu();
		
		
		$("body").bind("click", e => {
			this.hideMenus();
		});
		
	}
	
	clear(){
	}	
	
	
	hideMenus(){
		if (this.menuShown){
			this.$contextMenu.hide();
			this.$tableHeaderContextMenu.hide();
			this.menuShown = false;
		}
	}
	
	#createHeaderContextMenu(){
		
		this.$tableHeaderContextMenu=$(
			'<ul class="grid-context-menu">'+
			'<li data-id="li-hide-column">Скрыть колонку</li>'+
			'<li data-id="li-no-sort">Убрать сортировку</li>'+
			'<li data-id="li-clear-field-filter">Очистить фильтр</li>'+
			'</ul>').appendTo(document.body);
		
		
		this.grid.addEventListener(tsgUtils.tableEvents.headersContextmenu, e => {
			
			let re = e.detail.rootEvent;
			
			this.currentColumn = e.detail.column;
			
			this.hideMenus();
			
			this.$tableHeaderContextMenu.css("top", re.pageY).css("left", re.pageX).show();
			this.$tableHeaderContextMenu.show();
			this.menuShown = true;
			
		});

		this.$tableHeaderContextMenu.click(e => {
		
			let $li = $(e.target);
			if (!$li.is("li")) {
				return;
			}
		
			var itemId = $li.data("id");
		
			if (itemId=="li-hide-column"){
				this.grid.hideColumn(this.currentColumn.id);
//				saveColsWidth();
		
			//Убрать сортировку
			} else if (itemId=="li-no-sort"){
//				this.grid.setSortColumnsString(null);
				this.grid.clearSort();
				grid1.filtersModel.applyMainFilter()
//				this.grid.refresh(true);
		
			//Очистить фильтр
			} else if (itemId=="li-clear-field-filter"){
				this.grid.filtersModel.setFilterValueForField(this.currentColumn.id, "", true);
			}
		
		});  				
				
				
		
	}
	
	#createContextMenu(){
		
		this.$contextMenu=$(
			'<ul class="grid-context-menu">'+
			'<b>Показывать:</b>'+
			'<li data-id="empty">Пустые значения</li>'+
			'<li data-id="not-empty">Не пустые значения</li>'+
			'<li data-id="all">Все значения</li>'+
			'<li data-id="fbv">Фильтр по выбранному</li>'+
			'<li data-id="cbv">Копировать в буфер обмена</li>'+
			'</ul>').appendTo(document.body);


		//показ меню в таблице
		this.grid.addEventListener(tsgUtils.tableEvents.canvasContextmenu, e => {
			
			let re = e.detail.rootEvent;
			
			if (e.detail.row==null || e.detail.column==null){
				return;
			}

						
			
			
			this.currentRow = e.detail.row;
			this.currentColumn = e.detail.column;

			//выбираем текущую строку
			this.grid.selectModel.selectRow(this.currentRow.index);


			//деактивируем пункты меню, которые должны быть недоступны на этом поле			
			let notEmpty = (this.grid.model.options.notEmptyFields.indexOf(this.currentColumn.id)>=0);
			var cannotFbv = (this.currentRow==null || this.grid.model.options.notFieldByValueFields.indexOf(this.currentColumn.id)>=0);
			this.$contextMenu.children("li").removeClass("disabled");
			if (notEmpty){
				this.$contextMenu.children("li[data-id=not-empty], li[data-id=empty]").addClass("disabled");
			}
			if (cannotFbv){
				this.$contextMenu.children("li[data-id=fbv]").addClass("disabled");
			}

			//показываем меню
			this.hideMenus();
			this.$contextMenu.css("top", re.pageY).css("left",re.pageX).show();
			this.$contextMenu.show();
			this.menuShown = true;
			
		});
		
	
		

		//показ меню в столбце с фильтрами
		this.grid.addEventListener(tsgUtils.tableEvents.headerRowContextmenu, e => {
			
			this.currentRow = null;
			
			if (e.detail.column==null){
				return;
			}
			
			
			this.currentColumn = e.detail.column;

			let re = e.detail.rootEvent;
			//показываем меню
			this.hideMenus();
			this.$contextMenu.css("top", re.pageY).css("left",re.pageX).show();
			this.$contextMenu.show();
			this.menuShown = true;
			
		});
		
				

		//выбор пункта в меню
		this.$contextMenu.click(e  => {
		
			let $li = $(e.target);
			if (!$li.is("li")) {
				return;
			}
			var itemId = $li.data("id");

			let row = this.currentRow;

			let filtersModel = this.grid.filtersModel
		
			//копировать содержимое ячейки в буфер обмена
			if (itemId=="cbv"){
				if (!row){
					return;
				}
				
//				let fieldValue = row[this.currentColumn.id]
				let fieldValue = this.grid.model.extractRowCellValue(row, this.currentColumn);
				
				accordUtils.copyTextToBuffer(fieldValue);
				
			//Фильтр по выбранному
			} else if (itemId=="fbv"){
				if (!row){
					return;
				}
				
//				let fieldValue = row[this.currentColumn.id];
				let fieldValue = this.grid.model.extractRowCellValue(row, this.currentColumn);
				
				fieldValue = filtersModel.fixFilterValue(this.currentColumn.id, fieldValue, true)
				
				 this.grid.filtersModel.setFilterValueForField(this.currentColumn.id, fieldValue, true);
				

			} else if (itemId=="empty"){
				let fieldValue = filtersModel.fixFilterValue(this.currentColumn.id, "-1")
				filtersModel.setFilterValueForField(this.currentColumn.id, fieldValue, true);
			} else if (itemId=="not-empty"){
				let fieldValue = filtersModel.fixFilterValue(this.currentColumn.id, "-2")
				filtersModel.setFilterValueForField(this.currentColumn.id, fieldValue, true);
				
			} else if (itemId=="all"){
				 filtersModel.setFilterValueForField(this.currentColumn.id, "", true);
				
			}
		
		
		});  

				
		
		
		
	}
	

	
	

}