

$(() => {


  let select1 = new MultiSelect("#fruits", {
	placeholder: 'Select fruits',

	//сколько записей разрешено выбрать
	min: 2,
	max: 6,

	disabled: false,  //default: false
	search: false,	//default: true
	selectAll: true,  //default: true
	listAll: true,  //default: true
	//	closeListOnItemSelect: false,

	//	search: true,  // Enable the search box
	//	selectAll: true,  // Add a select all option
  });
  let select2 = new MultiSelect("#cars", {

	//размеры select
	width: "300px",
	height: "50px",
	placeholder: 'Select car manufacturers',

  });




  /*
  
  data-width="300px" data-height="50px"  
  
  onChange: function(value, text, element) {
	  console.log('Change:', value, text, element);
  },
  onSelect: function(value, text, element) {
	  console.log('Selected:', value, text, element);
  },
  onUnselect: function(value, text, element) {
	  console.log('Unselected:', value, text, element);
  }  
  
  
  */







  const dynamicSelect = new MultiSelect('#select3', {
	data: [
	  {
		value: 'opt1',
		text: 'Option 1'
	  }, {
		value: 'opt2',
		html: '<strong>Option 2 with HTML!</strong>'
	  }, {
		value: 'opt3',
		text: 'Option 3',
		selected: true
	  }, {
		value: 'opt4',
		text: 'Option 4'
	  }, {
		value: 'opt5',
		text: 'Option 5'
	  }, {
		value: 'opt6',
		text: 'Option 6'
	  }, {
		value: 'opt7',
		text: 'Option 7'
	  }
	],

	disabled: false,  //default: false
	search: false,	//Enable the search box. default: true
	selectAll: true,  //Add a select all option. default: true
	listAll: false,  //показывать выбранные значения в select. default: true
	//	closeListOnItemSelect: false,

	placeholder: 'Select an option',
	//сколько записей разрешено выбрать
//	max: 4,
//	min: 1,
	onChange: function(value, text, element) {
	  console.log('Change:', value);
	  // console.log(dynamicSelect.selectedItems);
	},
	onSelect: function(value, text, element) {
	  console.log('Selected:', value);
	},
	onUnselect: function(value, text, element) {
	  console.log('Unselected:', value);
	}
  });




});

