
import { AbstractModule, Filter } from '../tet.slick.grid-bundle.js';


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
export class MultiselectModule extends AbstractModule {

  constructor(grid) {
	super(grid);

	this.grid.filtersModel.addFilterFactory(filterFactoryMultiselect);

  }

}

function filterFactoryMultiselect(grid, column, $filter) {

  if ($filter.is('select') && $filter.attr('multiple')) {
	return new MultiSelectFilter(grid, column, $filter);
  }
  return null;

}





export class MultiSelectFilter extends Filter {

  currFilterVal = null;
  multiSelect;

  $options = null;

  //высота преобразованного элемента ввода
  topShift = 0;

  changeListeners = [];

  data;

  constructor(grid, column, $filter, data) {
	super(grid, column, $filter);
	this.data = data;

  }


  addChangeListener(l) {
	this.changeListeners.push(l);
  }


  init() {
	super.init();


	//получение начальных значений из скрытых инпутов
	let initalVals = null;

	if (this.grid) {
	  let $hiddenInput = this.grid.filtersModel.$filterContainer.find("input[name='" + this.columnId + "']");
	  if ($hiddenInput.length > 0) {
		initalVals = $hiddenInput.val();
		initalVals = initalVals.split(',');
		$hiddenInput.remove();
	  }
	}

	let options = {
	  search: false,
	  selectAll: true,
	  listAll: false,   //показывать выбранные значения в select. default: true
	  placeholder: '-',
	  onDropdownShow: val => {
		let pos = accordUtils.calcElementPosition(this.$element);

		this.$options.css("left", pos.x + "px");
		this.$options.css("top", (pos.y + this.topShift) + "px");
		this.currFilterVal = val.join(",")
	  },
	  onDropdownHide: val => {
		let newVal = val.join(",")
		this.$element.data("filterValue", newVal);

		if (this.currFilterVal != newVal) {
		  for (let l of this.changeListeners) {
			l(newVal);
		  }
		}
	  },

	}

	if (this.data) {

	  this.data.forEach(item => {
		if (item.id) {
		  item.value = item.id;
		}
		if (item.name) {
		  item.text = item.name;
		}

		if (initalVals) {
		  if (initalVals.includes(item.value)) {
			item.selected = true;
		  }

		}
	  });
	  options.data = this.data;
	}


	this.multiSelect = new MultiSelect(this.$filter[0], options);

	window["multiSelect_" + this.columnId] = this;

	//второй способ выбора
	//  ms.setValues(valueToSelect)

	this.refreshElements();

  }

  refreshElements() {
	this.$element = $(this.multiSelect.element);
	this.$options = this.$element.find(".multi-select-options");
	this.topShift = this.$element.outerHeight();
  }



  setFilterVal(val, apply = false) {

	if (!val) {
		val = [];
	} else if (typeof val === 'number') {
	  val = [String(val)];
	} else if (typeof val === 'string') {
	  val = val.split(',');
	}

	this.multiSelect.setValues(val);
	this.refreshElements();

	if (apply) {
	  this.apply();
	}
	


  }


  getFilterVal() {
	let r = this.multiSelect.selectedValues;
	return r.join(",");
	//  return this.$filter.val().trim();
  }


}



