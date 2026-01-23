import { accordUtils } from "./tet.slick.grid-bundle.js";






export class Filter {

  grid;

  columnId;

  //базовый элемент ввода (сгенерированный или заданный на странице)
  $filter;

  //фактический элемент ввода (обычно ===$filter, но может быть заменён на другой, если надо)
  $element;

  initiated = false;
  
  initalValue = null;

  //возможные значения фильтра
  //используются для генерации select.options
  //ключ: id
  //значение: name
  data;
  
  $datalist;
  
  constructor(grid, column, $filter, data = null) {
	
	this.grid = grid;
	this.$filter = $filter;
	this.$element = $filter;
	this.data = data;
	
	if (typeof column === 'string') {
		this.columnId = column;
	} else {
		this.columnId = column.id;
		if (column.initalFilterValue){
			this.initalValue = column.initalFilterValue;
		}
		
		
	}
	
  }

  addChangeListener(l) {
	this.$filter.bind("change", l);
  }

  //инициализация после помещения в строку фильтрации
  init() {
	this.initiated = true;
	
	if (this.grid) {
		
	  let $hiddenInput = this.grid.filtersModel.$filterContainer.find("input[type='hidden'][name='" + this.columnId + "']");
	  if ($hiddenInput.length > 0) {
		this.initalValue = $hiddenInput.val();
		$hiddenInput.remove();
	  }
	}

	
	if (this.$filter.is("input")){

		this.setOptions();
				
		if (this.initalValue){
			this.setFilterVal(this.initalValue);
		}
		
	}
	
  }

  //Задание возможных вариантов выбора (через datalist)
  setOptions(data = null){
	
	if (!data){
		data = this.data;
	}
	if (!data){
		return;
	}
	
	if (data){
		let dlId = this.columnId+"_datalist";
		this.$datalist = accordUtils.generateDatalist(dlId,data);
		this.$datalist.remove().appendTo(grid1.filtersModel.$form);
		this.$filter.attr("list",dlId);
	}
	
  }
  
  clear(apply = false) {
	  this.setFilterVal(null,apply);
  }

  //получение значения фильтра	
  getFilterVal() {
	let r = this.$filter.val();
	if (typeof r === 'string'){
		r = r.trim();
	}
	return r;
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

  constructor(grid, column, $filter, data = null) {
	super(grid, column, $filter, data);
	
	if (this.$filter.is('input')){
		
//		let $select = accordUtils.generateSelect(this.columnId, null, true, false, this.initalValue);
		let $select = accordUtils.generateSelect(this.columnId, {
			data: null, 
			withNullOption: true, 
			multi: false, 
			selectedValue: this.initalValue
		});
		
		this.$filter = $select;
		this.$element = $select;
	}
	
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

  init() {
    super.init();
	
	this.setOptions();
	if (this.initalValue){
		this.setFilterVal(this.initalValue);
	}
	
  }
  
  //Задание options
  setOptions(data = null){

	  if (!data){
	  	data = this.data;
	  }
	  if (!data){
	  	return;
	  }
	
	  if (data){
		this.$filter.empty();
		accordUtils.fillSelect(this.$filter,{
			data: data,
			withNullOption: true
		});
	  }

  }  
  
  
}

