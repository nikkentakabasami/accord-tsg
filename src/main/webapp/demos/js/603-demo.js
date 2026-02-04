


let $ms1, $ms2, $ms3;

let mss = [];


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


$(() => {




  $ms1 = $('#ms1').multiselect({
	onChange: function(option, checked) {
	  clearLog();
	  log('Changed option: ' + $(option).val());
	  log('$ms.val(): ' + $ms1.val());
	}
  });
  
  
  $ms2 = $('#ms2').multiselect();

  
  var options = [
	{ label: 'Option 1', title: 'Option 1', value: '1', selected: true },
	{ label: 'Option 2', title: 'Option 2', value: '2' },
	{ label: 'Option 3', title: 'Option 3', value: '3', selected: true },
	{ label: 'Option 4', title: 'Option 4', value: '4' },
	{ label: 'Option 5', title: 'Option 5', value: '5' },
	{ label: 'Option 6', title: 'Option 6', value: '6', disabled: true }
  ];
  $ms3 = $('#ms3').multiselect({
	numberDisplayed: 1,
	buttonText: multiselectButtonText,
	maxHeight: 500,
	onDropdownShow: event => {
		log("onDropdownShow");
  },
  onDropdownHide: event => {
	log("onDropdownHide. val:"+ $ms3.val());
  }

  },  
  
  );
  $ms3.multiselect('dataprovider', options);

  mss = [$ms1, $ms2, $ms3];


  $("#b1").click(e => {
	clearLog();
	mss.forEach(($ms, index)=>{
		log(`$ms${index+1}.val(): ${$ms.val()}`);
	});
  });

  $("#b2").click(e => {
	$ms1.multiselect('select', ['pepperoni', 'onions']);
	$ms2.multiselect('select', ['mozzarella']);
	$ms3.multiselect('select', ['3']);
  });

  $("#b3").click(e => {
	
	mss.forEach(($ms, index)=>{
		$ms.multiselect('selectAll', false);
		$ms.multiselect('refresh');
	});
  });

  $("#b4").click(e => {
	mss.forEach(($ms, index)=>{
		$ms.multiselect('deselectAll', false);
		$ms.multiselect('refresh');
	});
  });




  /*


  
	$filter.multiselect({
		  numberDisplayed: 1,
		  buttonText: multiselectButtonText,

		  onDropdownHide: function(event) {
			  applyMainFilter(true);
		  }                
  });
*/


});





