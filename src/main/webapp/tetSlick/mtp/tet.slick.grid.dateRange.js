
import {AbstractModule} from '../tet.slick.grid.misc.js';
import {tsgUtils} from '../tet.slick.grid.utils.js';


/**
 * Инициализирует поля фильтрации для ввода даты.
 * На них должен быть назначен класс .date-input.
 *  
 * Для использования требуется подключить библиотеки moment.js и daterangepicker.js
 * daterangepicker-utils.js
 * 
 * 
 */
export class DateRangeModule  extends AbstractModule {

	constructor(grid){
		super(grid);
		
		this.grid.addEventListener(tsgUtils.tableEvents.beforeInitFilter, e => {
			
			let $filter = e.detail.$afe;

			//прикручиваем к инпутам с датой диалог для выбора даты
			if ($filter.is('input.date-input')){
				
				tsgDaterangepickerUtils.initDateRangeEditor($filter	, {
						decorInput: true,
						decorButtonClasses: "acc-btn-calendar",
						drops: "up",
						changeCallback: (val,$input)=>{
							this.grid.filtersModel.applyMainFilter();
						}
					});
				

					/*				
					*/
				
				return;
			} else if ($filter.is('input.date-single-input')){
				
				tsgDaterangepickerUtils.initDateEditor($filter	, {
						decorInput: true,
						decorButtonClasses: "acc-btn-calendar",
						autoApply: false,
						changeCallback: (val,$input)=>{
							this.grid.filtersModel.applyMainFilter();
						}
					});
				
				return;
			}				
			
			
			
		
		});

		
	}
	
	init(){
		super.init();
	}
	
}

