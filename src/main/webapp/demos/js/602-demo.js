
let select1;
let select2;
let select3;


let select3Data = [
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
];




let select3Data2 = [
  {
	value: 'opt11',
	text: 'Option 11'
  }, {
	value: 'opt15',
	text: 'Option 15'
  }, {
	value: 'opt16',
	text: 'Option 16'
  }, {
	value: 'opt17',
	text: 'Option 17'
  }
];


function logMessage(mess) {
	$('#log1').val(function(i, oldVal) {
		return oldVal + "\n" + mess;
	});

}

function destroyMultiSelects(){
	select1.destroy();
	select2.destroy();
	select3.destroy();
	
}


function createMultiSelects(){
	
	  select1 = new MultiSelect("#fruits", {
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
	  select2 = new MultiSelect("#cars", {

		//размеры select
		width: "300px",
		height: "50px",
		placeholder: 'Select car manufacturers',

	  });

	  select3 = new MultiSelect('#select3', {
		data: select3Data,
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
	
}



$(() => {





  
  $("#b1").click(e=>{
	select1.setValues(["Apple","Blueberry"]);
	select2.setValues(["1","3"]);
	select3.setValues(["opt3","opt4"]);
  });

  $("#b2").click(e=>{
	createMultiSelects();
  });
  
  $("#b3").click(e=>{
	destroyMultiSelects();
  });

  $("#b4").click(e=>{
	select1.clear();
	select2.clear();
	select3.clear();
  });
  $("#b5").click(e=>{
	//задаём совершенно другие данные
	select3.options.data = select3Data2;
	select3.refresh();
  });
  
  
  $("#b6").click(e=>{
	
	let vals = select1.selectedValues;
	logMessage(vals);
	
  });
  
  $("#b7").click(e=>{
	
  });
  
  $("#b8").click(e=>{
  });
  
  

});

