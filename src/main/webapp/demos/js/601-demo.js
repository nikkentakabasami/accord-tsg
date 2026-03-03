
let data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];


$(() => {

  $("#select2").select2();


	$("#select3").select2({
	  data: data,
	  width: "300px",
	  //  	width: "resolve",

	  placeholder: "Select a state",
	  allowClear: true,
	  //		closeOnSelect: false,

	});
	
	

  $("#select10").select2({
    data: data,
    width: "element",
    placeholder: "Select a state",
    //	allowClear: true,
    //		closeOnSelect: false,
  });

  $("#select11").select2({
    //	multiple: true,
    maximumSelectionLength: 4,
    width: "300px",
    //	  closeOnSelect: false
  });





});








