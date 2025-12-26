
import { AbstractModule } from '../tet.slick.grid.misc.js';
import { tsgUtils } from '../tet.slick.grid.utils.js';
import { AccPopup, accordUtils } from '../../accord/js/accord-bundle.js';
import { Filter } from '../tet.slick.grid.filters.js';


/**
 * Инициализирует поля фильтрации для ввода чисел.
 * На них должен быть назначен класс .number-input.
 *  
 * Для использования требуется подключить библиотеки moment.js и daterangepicker.js
 * 
 */
export class NumberRangeModule extends AbstractModule {

  constructor(grid) {
	super(grid);

	if (this.grid) {
	  this.grid.filtersModel.addFilterFactory(filterFactoryNumberRange);
	}
  }
}


function filterFactoryNumberRange(grid, column, $filter) {
  if ($filter.is('input.number-input')) {
	return new NumberRangeFilter(grid, column, $filter);
  }
  return null;
}


export class NumberRangeFilter extends Filter {

  static filterPopup;

  constructor(grid, column, $filter) {
	super(grid, column, $filter);
	NumberRangeFilter.filterPopup = new FilterPopup();
  }

  init() {
	super.init();

	this.$element = accordUtils.decorInput(this.$filter, {
	  buttonClasses: "acc-btn-calendar",
	  placeButtonBefore: true,
	  buttonHandler: e => {
		this.$filter.trigger("dblclick");
	  }
	});

	this.$filter.dblclick(e => {
	  NumberRangeFilter.filterPopup.showForFilterInput(this.$filter, AccPopup.Layouts.BOTTOM, val => {
		this.apply();
	  });
	});
  }

}


export class FilterPopup extends AccPopup {

  $buttonOk;
  $input1;
  $input2;
  $filterType;

  setValueCallback;
  $filter;

  constructor() {
	super({
	  //	panelSelector: "#tsgNumberFilterPopup",
	  panelUrl: tsgUtils.tetSlickRelativePath + "fragments/selectNumberFilterDialog.html",
	  draggable: false,
	  hideOnOutsideClick: true
	});

	let $d = this.$dialog;

	this.$buttonOk = $d.find("button.btn-ok");
	this.$input1 = $d.find("input.val1");
	this.$input2 = $d.find("input.val2");
	this.$filterType = $d.find("select.filter-type");


	this.$filterType.change(e => {
	  this.$input1.select();
	});

	this.$dialog.on("keydown", event => {
	  if (event.which == 13) {
		this.$buttonOk.trigger("click");
	  }
	});

	this.$buttonOk.click(e => {

	  let ft = this.$filterType.val();
	  let val1 = this.$input1.val();
	  //	  console.log(ft);

	  let val;
	  if (ft == "range") {
		let val2 = this.$input2.val();
		val = val1 + ":" + val2;
	  } else {
		val = ft + val1;
	  }
	  this.$filter.val(val);
	  this.hide();
	  if (this.setValueCallback) {
		this.setValueCallback(val);
	  }

	});

  }

  showForFilterInput($target, layout = Layouts.BOTTOM, setValueCallback = null) {
	this.setValueCallback = setValueCallback;
	this.$filter = $target;

	super.showForElement($target, layout);
	this.$input1.select();

  }
}

