
import {AbstractModule} from './tet.slick.grid.misc.js';


/**
 * Класс панели с заголовком.
 * Либо находит существующую панель, либо создаёт собственную.
 */
export class TsgTitleView  extends AbstractModule {
	
	//заголовок таблицы
	$titleHeader = null;
	
	//панель, содержащая заголовок таблицы
	$titlePanel = null;
	
	
	$rowsCountSpan = null;
	
	$customGridColumnsButton = null;
	
	$clearFiltersButton = null;


	constructor(grid) {
		super(grid);
	}	


	createDomElements(){
		
		if (this.grid.model.options.showTitleHeader){
			this.#createStandartDomElements();
		} else {
			this.#findExistingDomElements();
		}
		
		this.#addButtonHandlers();
	}

	/**
	 * Ищет кнопки, панели и элементы управления таблицей, которые могут быть определены в другом месте
	 */
	#findExistingDomElements(){
		this.$titleHeader = $("#gridHeader"+this.grid.id);
		this.$titlePanel = $("#gridPanelTitle"+this.grid.id);
		this.$rowsCountSpan = $("#rowsCountSpan"+this.grid.id);
		this.$clearFiltersButton = $("#clearFilters"+this.grid.id);
	}


	/**
	 * создаёт стандартную панель с заголовком и прочими кнопками. Вставляет её в контейнер таблицы. 
	 */	
	#createStandartDomElements(){
		
		this.$titleHeader = $('<div class="grid-header"/>').appendTo(this.grid.view.$container);
		this.$titlePanel = $('<span class="panel-title"/>').appendTo(this.$titleHeader);

		this.$rowsCountSpan = $("#rowsCountSpan"+this.grid.id);
		if (this.$rowsCountSpan.length==0){
			this.$rowsCountSpan = $('<span id="rowsCountSpan'+this.grid.id+'" class="count-span-filter"/>').appendTo(this.$titleHeader);
		}
		
		
		if (this.grid.model.options.withColumnDialog){
			this.$customGridColumnsButton = $('<a href="#" class="pull-right" style="margin-right: 10px;margin-top: 3px;"> <span class="list-png"/></a>')
				.appendTo(this.$titleHeader);
		}
	
		if (this.grid.model.options.enableHeaderRowFilters){
			this.$clearFiltersButton = $("#clearFilters"+this.grid.id);
			if (this.$clearFiltersButton.length==0){
				this.$clearFiltersButton = $('<a href="#" class="pull-right" style="margin-right: 10px;margin-top: 3px;" title="Очистить фильтры"><span class="rotate-left-png"/></a>')
					.appendTo(this.$titleHeader);
			}
		}
		
		
		
	}

	#addButtonHandlers(){
		
		if (this.$customGridColumnsButton){
			this.$customGridColumnsButton.click(event => {
				event.preventDefault();
				this.grid.columnOrderDialogModel.showDialog();
			});	
		}

		if (this.$clearFiltersButton){
			this.$clearFiltersButton.click(event => {
				event.preventDefault();
				this.grid.clearSort();
				this.grid.filtersModel.clearFilters();
			});
		}		
		
	}
	
	setTitle(title){
		this.$titlePanel.append(title);
	}

	clear() {
		this.$titlePanel.empty();
	}

	setRowCount(rc){
		if (this.$rowsCountSpan.length>0){
			this.$rowsCountSpan.empty().append(""+rc);
		}
	}



}




