
import {AbstractModule} from '../tet.slick.grid.misc.js';
import {tsgUtils} from '../tet.slick.grid.utils.js';


/**
 * Инициализирует мультиселекты в полях фильтрации.
 * Для использования требуется подключить библиотеки bootstrap 3 и bootstrap-multiselect
 * селекты должны иметь атрибут multiple!
 * Например:
 * <select id="section" name="section" multiple="multiple"></select>
 * 
 */
export class MultiselectModule  extends AbstractModule {
	
	//map с инициализированными мультиселектами
	multiselects = {};
	
	
	constructor(grid){
		super(grid);
		
		this.grid.addEventListener(tsgUtils.tableEvents.beforeInitFilter, e => {
			
			let $filter = e.detail.$afe;
			
			//Инициализация мультиселектов
			if (!$filter.is('select') || !$filter.attr('multiple')){
				return;
			} 
		
			this.multiselects[e.detail.column.name] = $filter;
		
			let filterName = $filter.attr('name');
			
			//получение начальных значений из скрытых инпутов (они имеют то же id что и селекты)
			let initalVals = null;
//			let $hiddenInput = this.grid.filtersModel.$filterContainer.find("input#"+filterName);
			let $hiddenInput = this.grid.filtersModel.$filterContainer.find("input[name='"+filterName+"']");
			
			if ($hiddenInput.length>0){
				initalVals = $hiddenInput.val();
				initalVals = initalVals.split(',');
				$hiddenInput.remove();
			}
			
			initMultiselect($filter, null, initalVals, val => {
				this.grid.filtersModel.applyMainFilter();
			});
			return;
			
		});
		
		this.grid.addEventListener(tsgUtils.tableEvents.onFilterSetValue, e => {
			
			if (e.detail.handled){
				return;
			}
			
			let $filter = e.detail.$filter;
			let val = e.detail.filterValue;
		
			//Если пэс очищается, но при этом стоит опция enplantAlwaysSelected - выбираем все значения
			if ($filter.attr('multiple')!='multiple'){
				return;
			}
				
			$filter.multiselect('deselectAll', false);
			$filter.multiselect('select', [e.detail.filterValue]);
//			if (val){
//			}
			
			e.detail.handled = true;
			
			/*
			if (this.enplantAlwaysSelected && filterName=="enplantName" && filterValue=="") {
				$filterInput.multiselect('selectAll', false);
				$filterInput.multiselect('updateButtonText');
			}
			*/
		});	
		
		
		
	}
	
	init(){
		super.init();
	}
	
	
}



export function initMultiselect($filter, data, valueToSelect, setValueCallback){

	let currFilterVal = null;

	//сносим лишний обработчик
	$filter.unbind("change");

	$filter.multiselect({
		numberDisplayed: 1,
		buttonText: multiselectButtonText,
		maxHeight: 500,
		onDropdownShow: event => {
			currFilterVal = JSON.stringify($filter.val());
			
			let $menu = $filter.parent().find("ul.multiselect-container");
			let rect = $filter.parent().parent()[0].getBoundingClientRect();
			
			$menu.css("position","fixed");
			$menu.css("left",rect.left);
			$menu.css("top",rect.top+40);

		},
		onDropdownHide: event => {
		
			let $menu = $filter.parent().find("ul.multiselect-container");
			$menu.css("position","absolute");
			$menu.css("left",null);
			$menu.css("top",null);
			
			if (JSON.stringify($filter.val())!=currFilterVal){
				
				if (setValueCallback){
					setValueCallback();
				}
			}
		},                

		optionClass: element => {
		
			if ($(element).hasClass('cssDeleted')){
				return 'cssDeleted';
			}
			return '';
		}
	});
	
	
	if (data){
		$filter.multiselect('dataprovider', data);
	}

	//выбираем заданное значение
	if (valueToSelect){
		let vals;		
		if (typeof valueToSelect == 'string'){
			vals = valsString.split(',');
		} else {
			vals = valueToSelect;
		}
		$filter.multiselect('select', vals);
	}
	
}


export function multiselectButtonText(options) {
	if (options.length == 0) {
		return '-';
	}
	else if (options.length > 1) {
		return 'выбрано '+options.length;
	}
	else {
		return options[0].label;
	}
}





