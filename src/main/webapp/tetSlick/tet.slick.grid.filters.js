





export class Filter {

  grid;

  columnId;

  //базовый элемент ввода (сгенерированный или заданный на странице)
  $filter;

  //фактический элемент ввода (обычно ===$filter, но может быть заменён на другой, если надо)
  $element;

  initiated = false;

  constructor(grid, column, $filter) {
	
	if (typeof column === 'string') {
		this.columnId = column;
	} else {
		this.columnId = column.id;
	}
	
	
	this.grid = grid;
	this.$filter = $filter;
	this.$element = $filter;
  }

  addChangeListener(l) {
	this.$filter.bind("change", l);
  }

  //инициализация после помещения в строку фильтрации
  init() {
	this.initiated = true;

  }

  clear(apply = false) {
	  this.setFilterVal(null,apply);
  }

  //получение значения фильтра	
  getFilterVal() {
	return this.$filter.val().trim();
  }


  //задание значения. Возвращает значение в строковом, откорректированном виде	
  setFilterVal(val, apply = false) {
	if (!val) {
	  val = "";
	}

	if (typeof val != 'string') {
	  val = String(val);
	}

	//типа так красивее
	if (val == "-1") {
	  val = "(пустые)";
	} else if (val == "-2") {
	  val = "(не пустые)";
	}

	this.$filter.val(val);

	if (apply) {
	  this.apply();
	}

	return val;

  }

  apply() {
	if (this.grid){
		this.grid.filtersModel.applyMainFilter();
	}
  }


}




export class SelectFilter extends Filter {

  constructor(grid, column, $filter) {
	super(grid, column, $filter);

  }


  setFilterVal(val, apply = false) {
	if (!val) {
	  val = "";
	}

	if (typeof val != 'string') {
	  val = String(val);
	}


	let $option = this.$filter.find("option[val='" + val + "']");
	if ($option.length == 0) {

	  let $option = this.$filter.find("option:contains('" + val + "')");
	  if ($option.length > 0) {
		val = $option.first().attr("value");
	  }
	}

	this.$filter.val(val);
	if (apply) {
	  this.apply();
	}
  }

}

