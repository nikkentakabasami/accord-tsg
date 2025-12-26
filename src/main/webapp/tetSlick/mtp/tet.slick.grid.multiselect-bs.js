
import { AbstractModule, Filter } from '../tet.slick.grid-bundle.js';


/**
 * Инициализирует мультиселекты в полях фильтрации.
 * Для использования требуется подключить библиотеки bootstrap 3 и bootstrap-multiselect
 * селекты должны иметь атрибут multiple!
 * Например:
 * <select id="section" name="section" multiple="multiple"></select>
 * 
 */
export class BSMultiselectModule extends AbstractModule {

  constructor(grid) {
	super(grid);

	this.grid.filtersModel.addFilterFactory(filterFactoryMultiselect);

  }

}

function filterFactoryMultiselect(grid, column, $filter) {

  if ($filter.is('select') && $filter.attr('multiple')) {
	return new BSMultiSelectFilter(grid, column, $filter);
  }
  return null;

}

function multiselectButtonText(options) {
  if (options.length == 0) {
	return '-';
  }
  else if (options.length > 1) {
	return 'выбрано ' + options.length;
  }
  else {
	return options[0].label;
  }
}


export class BSMultiSelectFilter extends Filter {

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



	this.$filter.multiselect({
	  numberDisplayed: 1,
	  buttonText: multiselectButtonText,
	  maxHeight: 500,
	  onDropdownShow: event => {
		this.currFilterVal = this.getFilterVal();
		// JSON.stringify(this.$filter.val());

		//			let rect = this.$element.parent()[0].getBoundingClientRect();

		let pos = accordUtils.calcElementPosition(this.$element);
		this.$options.css("left", pos.x + "px");
		this.$options.css("top", (pos.y + this.topShift) + "px");

		//			$menu.css("left",rect.left);
		//			$menu.css("top",rect.top+40);

	  },
	  onDropdownHide: event => {

		this.$options.css("left", null);
		this.$options.css("top", null);

		let newVal = this.getFilterVal();
		//			let newVal = JSON.stringify(this.$filter.val());
		if (this.currFilterVal != newVal) {
		  for (let l of this.changeListeners) {
			l(newVal);
		  }
		}

	  },

	  optionClass: element => {
		if ($(element).hasClass('cssDeleted')) {
		  return 'cssDeleted';
		}
		return '';
	  }

	});

	this.$element = this.$filter.parent();
	this.$options = this.$element.find("ul.multiselect-container");
	this.$options.css("position", "fixed");

	if (this.data) {
	  this.$filter.multiselect('dataprovider', this.data);
	}

	//выбираем заданное значение
	if (initalVals) {
	  setFilterVal(initalVals);
	}

	window["multiSelect_" + this.columnId] = this;

	this.refreshElements();

  }

  refreshElements() {

	this.$element = this.$filter.parent();
	this.$options = this.$element.find("ul.multiselect-container");
	this.$options.css("position", "fixed");
	this.topShift = this.$element.outerHeight() + 15;
  }



  setFilterVal(val, apply = false) {

	if (!val) {
	  val = [];
	} else if (typeof val === 'number') {
	  val = [String(val)];
	} else if (typeof val === 'string') {
	  val = val.split(',');
	}

	this.$filter.multiselect('deselectAll', false);
	this.$filter.multiselect('select', val);

	if (apply) {
	  this.apply();
	}

  }

  getFilterVal() {
	let val = this.$filter.val();
	//	let val = JSON.stringify(this.$filter.val());
	return val.join(",");
  }


}




