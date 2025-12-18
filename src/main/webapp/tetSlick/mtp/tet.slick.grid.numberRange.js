
import { AbstractModule } from '../tet.slick.grid.misc.js';
import { tsgUtils } from '../tet.slick.grid.utils.js';


import { AccPopup, accordUtils } from '../../accord/js/accord-bundle.js';





/**
 * Инициализирует поля фильтрации для ввода чисел.
 * На них должен быть назначен класс .number-input.
 *  
 * Для использования требуется подключить библиотеки moment.js и daterangepicker.js
 * 
 */
export class NumberRangeModule extends AbstractModule {

  filterPopup;


  constructor(grid) {
	super(grid);

	this.filterPopup = new FilterPopup();

	if (this.grid) {
	  this.grid.addEventListener(tsgUtils.tableEvents.beforeInitFilter, e => {

		let $filter = e.detail.$afe;

		//прикручиваем к инпутам с датой диалог для выбора даты
		if ($filter.is('input.number-input')) {
		  this.initNumberFilter($filter);
		}
	  });
	}

  }

  init() {
	super.init();
  }


  initNumberFilter($filter) {

	accordUtils.decorInput($filter, {
	  buttonClasses: "acc-btn-calendar",
	  placeButtonBefore: true,
	  buttonHandler: e => {
		$filter.trigger("dblclick");
	  }
	});

	$filter.dblclick(e => {
	  this.filterPopup.showForFilterInput($filter, AccPopup.Layouts.BOTTOM, val => {
		if (this.grid) {
		  this.grid.filtersModel.applyMainFilter();
		}
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






