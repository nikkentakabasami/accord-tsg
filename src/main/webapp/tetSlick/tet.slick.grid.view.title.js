
import {AbstractModule,tetSlickRelativePath} from './tet.slick.grid.misc.js';


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
		
		let gridHeaderId = "gridHeader"+this.grid.id;
		
		//ищем существующий заголовок таблицы
		this.$titleHeader = $("#"+gridHeaderId);
		
		//если он не найден - создаём его на основе шаблона gridHeader.html
		if (this.$titleHeader.length==0 && this.grid.model.options.showTitleHeader){
			this.$titleHeader = accordUtils.loadHtmlFragmentXHR(tetSlickRelativePath+"fragments/gridHeader.html", this.grid.view.$container, false);
			this.$titleHeader.attr("id",gridHeaderId)
		}

		//ищем встроенные элементы
		this.$titlePanel = this.$titleHeader.find(".panel-title");		
		this.$rowsCountSpan = this.$titleHeader.find(".count-span-filter");
		this.$customGridColumnsButton = this.$titleHeader.find(".tsg-col-dialog-btn");
		this.$clearFiltersButton = this.$titleHeader.find(".tsg-clear-filters-btn");
		

		//удаляем лишние кнопки		
		if (!this.grid.model.options.withColumnDialog){
			this.$customGridColumnsButton.remove();
		}
		if (!this.grid.model.options.enableHeaderRowFilters){
			this.$clearFiltersButton.remove();
		}
		
		this.#addButtonHandlers();
	}

	/*
	#findExistingDomElements(){
		
		$(".grid-header").attr("id","test111")
		this.$titleHeader = $("#gridHeader"+this.grid.id);
		this.$titlePanel = $("#gridPanelTitle"+this.grid.id);
		this.$rowsCountSpan = $("#rowsCountSpan"+this.grid.id);
		this.$clearFiltersButton = $("#clearFilters"+this.grid.id);
	}


	#createStandartDomElements(){
		this.$titleHeader = accordUtils.loadHtmlFragmentXHR(tetSlickRelativePath+"fragments/gridHeader.html", this.grid.view.$container, false);
		this.$titlePanel = this.$titleHeader.find(".panel-title");		
		this.$rowsCountSpan = this.$titleHeader.find(".count-span-filter");
		this.$customGridColumnsButton = this.$titleHeader.find(".tsg-col-dialog-btn");
		this.$clearFiltersButton = this.$titleHeader.find(".tsg-clear-filters-btn");
		
	}
*/
	
	
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
		this.$titlePanel.empty().append(title);
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




