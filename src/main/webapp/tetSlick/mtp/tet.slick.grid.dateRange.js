
import { AbstractModule } from '../tet.slick.grid.misc.js';
import { tsgUtils } from '../tet.slick.grid.utils.js';
import { Filter } from '../tet.slick.grid.filters.js';


/**
 * Инициализирует поля фильтрации для ввода даты.
 * На них должен быть назначен класс .date-input.
 *  
 * Для использования требуется подключить библиотеки moment.js и daterangepicker.js
 * daterangepicker-utils.js
 * 
 * 
 */
export class DateRangeModule extends AbstractModule {

  constructor(grid) {
	super(grid);
	this.grid.filtersModel.addFilterFactory(filterFactoryDataRange);
  }

}


function filterFactoryDataRange(grid, column, $filter) {
  if ($filter.is('input.date-input')) {
	return new DateRangeFilter(grid, column, $filter, true);
  } else if ($filter.is('input.date-single-input')) {
	return new DateRangeFilter(grid, column, $filter, false);
  }
  return null;
}



export class DateRangeFilter extends Filter {

  range = true;

  //true - выбирать период времени (или дату)
  //false - выбирать только дату
  constructor(grid, column, $filter, range = true) {
	super(grid, column, $filter);
	this.range = range;
  }

  init() {
	super.init();

	if (this.range) {
	  AccDaterangepickerUtils.initDateRangeEditor(this.$filter, {
		decorInput: true,
		decorButtonClasses: "acc-btn-calendar",
		drops: "up",
		changeCallback: (val, $input) => {
		  this.apply();
		}
	  });
	} else {

	  AccDaterangepickerUtils.initDateEditor(this.$filter, {
		decorInput: true,
		decorButtonClasses: "acc-btn-calendar",
		autoApply: false,
		changeCallback: (val, $input) => {
		  this.apply();
		}
	  });
	}
  }


  setFilterVal(val, apply = false) {

	//значение можно задать и датой	
	if (val instanceof Date) {
	  let m = moment(val);
	  val = m.format('DD.MM.YYYY');
	}

	return super.setFilterVal(val, apply)
  }

}

