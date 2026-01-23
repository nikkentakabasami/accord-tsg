


let $workPanel;

let $btn1, $btn2, $inp1, $inp2, $inp3, $inp4, $btnTests;




function clickHandler(event) {
  logNL();
  log(`event (type=${event.type})`);
  logObject(event, 'currentTarget', "pageX", "pageY");

}

function simpleHandler(event) {
//	event.preventDefault();
//	event.stopPropagation();	
	
	log(`event (type=${event.type})`);
}


let selectorsData1 = {

  bind_inp_click: function() {
	//назначает обработчик
	return $(".panel1 input").bind("click", clickHandler);
  },
  
  on_inp1_click: function() {
  //назначает обработчик
  return $inp1.on("click", clickHandler);
  },
  
  on_two_events: function() {
	//назначает обработчик на 2 события
	return $inp1.on("mouseenter mouseleave", event => {
	  $inp1.toggleClass("green-border");
	});
  },

  on_data_param: function() {
	//с передачей data-объекта, который можно получить из event
	$inp3.on("click", { msg: "Spoon!" }, event => {
	  log(`event (type=${event.type})`);
	  log(event.data.msg);
	});
	
	$inp2.on("click", event => {
		//с передачей data-объекта в trigger
		$inp3.trigger( "click", { msg: "Trigger message!" } );
	});
	
	
  },

  trigger_data: function() {
	
	$btnTests.text("trigger click on inp3").on("click", event => {
		//вызов события с передачей data-объекта
		$inp3.trigger( "click", { msg: "Trigger message!" } );
	});	
	
	
	//Получение data-объекта, переданного в trigger
	$inp3.on("click", (event, data) => {
	  log("inp3 click");
	  if (data) {
		log(data.msg);
	  }
	});

	
	
//	$inp3.trigger( "click", { msg: "Spoon!" } );
  },


  on_selector: function() {
	//с передачей дополнительного селектора
	return $(".panel1").on("click", " input:text", clickHandler);
  },

  on_inp1_multi_handlers: function() {
	//назначение сразу нескольких событий
	return $inp1.on({
	  mouseenter: simpleHandler,
	  mouseleave: simpleHandler,
	  click: simpleHandler
	});

  },

  
  off_inp1: function() {
	//убирает все обработчики событий, привязанные к этому элементу
	return $inp1.off();
  },
  unbind_inp1: function() {
	//убирает обработчик
	return $inp2.unbind("click", clickHandler);
  },
  




  /*
  $( "div" ).on( "click", function( event, person ) {
    alert( "Hello, " + person.name );
  });
  $( "div" ).trigger( "click", { name: "Jim" } );
*/







}

//	'$inp1\n.bind("click", clickHandler);',



function reloadSandbox() {

  $workPanel.empty();

  let $sandboxPanels = accordUtils.cloneTemplate("#template1");
  $sandboxPanels.appendTo($workPanel);


  $btn1 = $("#btn1");
  $btn2 = $("#btn2");
  $inp1 = $("#inp1");
  $inp2 = $("#inp2");
  $inp3 = $("#inp3");
  $inp4 = $("#inp4");

  $btnTests = $("#btnTests"); 



}



function execDemoFunc(func) {
  //	reloadSandbox();
  if (!func) {
	return;
  }

  $(".workPanel *").removeClass("red-border");


  clearLog();
  log(String(func));
  let result = func();

  let logMess = 'executed. ';
  if (result && result.jquery) {
	result.addClass("red-border");
	logMess += "elements found: " + result.length;

  }
  log(logMess);

}

let currentFunc = null;

function initSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
	clearLog();
	let v = $sel.val();
	//		let v = $sel.children("option:selected").text();
	currentFunc = selectorsData1[v];

	let funcCode = String(currentFunc);

	log(funcCode);

  });
  accordUtils.fillSelect($sel, {
	data: data,
	withNullOption: true,
	selectedValue: null,
	contentIsValue: true,
	//		valueIsIndex: true
  });

}


$(() => {

  $workPanel = $(".workPanel");

  initSelect("#selectors", selectorsData1);

  $("#b1").click(e => {
	if (!currentFunc) {
	  return;
	}
	execDemoFunc(currentFunc);
  });

  $("#b2").click(e => {
	reloadSandbox();
  });

  reloadSandbox();




});



