
import {AbstractModule} from '../tet.slick.grid.misc.js';
import {tsgUtils} from '../tet.slick.grid.utils.js';


/**
 * Инициализирует мультиселекты в полях фильтрации.
 * Для использования требуется подключить библиотеку Multi Select Dropdown JS (multi-select-dropdown-js).
 * См. 602_multi_select_dropdown_js_demo.html
 * 
 * Демо:
 * tsgFilterDecoratorDemo.html
 * 
 * Библиотеку я вручную изменил, добавив события onDropdownShow, onDropdownShow!!!
 * 
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
		
//			this.multiselects[e.detail.column.name] = $filter;
		
			let filterName = $filter.attr('name');
			
			//получение начальных значений из скрытых инпутов (они имеют то же id что и селекты)
			let initalVals = null;
			let $hiddenInput = this.grid.filtersModel.$filterContainer.find("input[name='"+filterName+"']");
			
			if ($hiddenInput.length>0){
				initalVals = $hiddenInput.val();
				initalVals = initalVals.split(',');
				$hiddenInput.remove();
			}
			
			let ms = new SlickGridMultiSelect($filter, null, initalVals, () => {
				this.grid.filtersModel.applyMainFilter();
			});
			
//			e.detail.column.ms = ms;
			this.multiselects[e.detail.column.id] = ms;
			
			
//			initMultiselect($filter, null, initalVals, () => {
//				this.grid.filtersModel.applyMainFilter();
//			});
			return;
			
		});

		this.grid.addEventListener(tsgUtils.tableEvents.onFilterSetValue, e => {
			
			if (e.detail.handled){
				return;
			}
			
			let ms = this.multiselects[e.detail.filterName]
			if (!ms){
				return;
			}
			let val = e.detail.filterValue;

			ms.setValues(val);
			
			e.detail.handled = true;
						
		});	
		
		
		
	}
	
	init(){
		super.init();
	}
	
	
}





class SlickGridMultiSelect {
	
	currFilterVal = null;
	id; 
	multiSelect;
		
	$options = null;
	$element = null;
	//высота преобразованного элемента ввода
	topShift = 0;
		
	
	
	refreshElements(){
		this.$element = $(this.multiSelect.element);
		this.$options = this.$element.find(".multi-select-options");
		this.topShift =   this.$element.outerHeight();
	}
	
	
	setValues(val){
		
		if (!val){
			this.multiSelect.clear();
			this.refreshElements();
			return;
		}
		
		if (typeof val === 'number') {
			val = [String(val)];
		} else if (typeof val === 'string') {
			val = val.split(',');
		}
		this.multiSelect.setValues(val);
		this.refreshElements();
		
	}
	
	constructor($filter, data, valueToSelect, setValueCallback){
	

		this.id = $filter.attr("id"); 
		
		let options = {
			search: false,
			selectAll: true,
			listAll: false,   //показывать выбранные значения в select. default: true
			placeholder: '-',
			onDropdownShow: val => {
				
				
				multiSelect_customer1.element
				
				let pos = accordUtils.calcElementPosition(this.$element);			
				
				this.$options.css("left",pos.x+"px");
				this.$options.css("top",(pos.y+this.topShift)+"px");
				this.currFilterVal = val.join(",")			
			},
			onDropdownHide: val => {
				console.log("onDropdownHide",val);
				
				let newVal = val.join(",")
				this.$element.data("filterValue",newVal);
				
				if (this.currFilterVal!=newVal && setValueCallback){
					setValueCallback(newVal);
				}
			},
			
		}	
		
		if (data){
			
			data.forEach(item=>{
				if (item.id){
					item.value = item.id;
				}
				if (item.name){
					item.text = item.name;
				}
				
				if (valueToSelect){
					
					if (Array.isArray(valueToSelect)){
						if (valueToSelect.indexOf(item.value)>=0){
							item.selected = true;
						}
					} else if (valueToSelect==item.value){
						item.selected = true;
					}
				}
			});
			options.data = data;
		}

		
	  this.multiSelect = new MultiSelect($filter[0], options);
		
	  window["multiSelect_"+this.id] = this; 
	  
	  //второй способ выбора
	//  ms.setValues(valueToSelect)

	this.refreshElements();
	
		  
//	  this.$element = $("div#"+this.id);
//	  this.$options = this.$element.find(".multi-select-options");

	  
		  		
		
		
	}
	
	
	
}




/*
export function initMultiselect($filter, data, valueToSelect, setValueCallback){

	let currFilterVal = null;

	let id = $filter.attr("id"); 
		
	let $options = null;
	let $newFilter = null;
	let topShift = 0;
	
	let options = {
		search: false,	//Enable the search box. default: true
		selectAll: true,  //Add a select all option. default: true
		listAll: false,  //показывать выбранные значения в select. default: true
		placeholder: '-',
		onChange: function(value, text, element) {
			
			
		},
		onDropdownShow: function(val) {
			
			let pos = accordUtils.calcElementPosition($newFilter);			
			
			$newFilter
			
			$options.css("left",pos.x+"px");
			$options.css("top",(pos.y+topShift)+"px");
			
//			console.log("onDropdownShow",val);
//			currFilterVal = val.join(",")			
			
//			currFilterVal = JSON.stringify($filter.val());
			
		},
		onDropdownHide: function(val) {
			console.log("onDropdownHide",val);
			
			
			let newVal = val.join(",")
			$newFilter.data("filterValue",newVal);
			
			if (currFilterVal!=newVal && setValueCallback){
				setValueCallback(newVal);
			}
			
			
		},
		
		
		
		
	}	
	
	if (data){
		
		data.forEach(item=>{
			if (item.id){
				item.value = item.id;
			}
			if (item.name){
				item.text = item.name;
			}
			
			if (valueToSelect){
				
				if (Array.isArray(valueToSelect)){
					if (valueToSelect.indexOf(item.value)>=0){
						item.selected = true;
					}
				} else if (valueToSelect==item.value){
					item.selected = true;
				}
			}
		});
		options.data = data;
	}

	
  const ms = new MultiSelect($filter[0], options);
	
  //второй способ выбора
//  ms.setValues(valueToSelect)
  
  $newFilter = $("#"+id);
  $options = $newFilter.find(".multi-select-options");
  
  topShift =   $newFilter.outerHeight();

  
  
  
  
  
  
  
  
  
    
  return ms;
  
//  $options = $("#"+id+" .multi-select-options");
    
  
}

*/





