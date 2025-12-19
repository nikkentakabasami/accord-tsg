


$(() => {

  $("#select2").select2();


  var data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];



  $("#select3").select2({
	data: data,
//	width: "300px",
	width: "element",
	
	
	placeholder: "Select a state",
	allowClear: true,
	//		closeOnSelect: false,


  });

  $("#select4").select2({
//	multiple: true,
	maximumSelectionLength: 4,
	width: "300px",
	//	  closeOnSelect: false
  });


    $("#select5").select2({
  	data: data,
	width: "300px",
//  	width: "resolve",
  	
  	placeholder: "Select a state",
  	allowClear: true,
  	//		closeOnSelect: false,


    });



});








