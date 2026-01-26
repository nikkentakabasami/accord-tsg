


let $workPanel;

let $btn1, $btn2, $inp1, $inp2, $inp3, $inp4, $testBtn1, $testBtn2;




function clickHandler(event) {
  logNL();
  log(`type=${event.type}, currentTarget=${event.currentTarget.id}, pageX=${event.pageX}, pageY=${event.pageY}`);
  log(`event (type=${event.type})`);
  logObject(event, 'currentTarget', "pageX", "pageY");

}

function simpleHandler(event) {
//	event.preventDefault();
//	event.stopPropagation();	
	log(`event (type=${event.type})`);
}


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  bind_inp_click: function() {
	//назначает обработчик на все инпуты
	return $(".panel1 input").bind("click", clickHandler);
  },
  
  //unbind - убирает обработчик
  unbind_inp1: function() {
  	return $inp2.unbind("click", clickHandler);
  },
  
  
  //назначение обработчика
  on_inp1_click: function() {
	  return $inp1.on("click", clickHandler);
  },
  
  //назначение обработчика на 2 события
  on_two_events: function() {
	return $inp1.on("mouseenter mouseleave", event => {
	  $inp1.toggleClass("bg-red");
	});
  },

  //назначение сразу нескольких обработчиков
  on_inp1_multi_handlers: function() {
	  //назначение сразу нескольких событий
	  return $inp1.on({
	    mouseenter: simpleHandler,
	    mouseleave: simpleHandler,
	    click: simpleHandler
	  });
  },
  
  //назначение обработчика с передачей data-объекта, который можно получить из event
  on_data_param: function() {
	$inp1.on("click", { msg: "Spoon!" }, event => {
	  log("inp1 click. event.data:",event.data);
	});
	
	$testBtn1.on("click", event => {
		//это сообщение в event.data не попадёт!
		$inp1.trigger( "click", "Trigger message");
	});	

	return $inp1.add($testBtn1);
  },

  //при вызове trigger пожно передать data-объект.
  //Его можно получить через доп. параметр обработчика события.
  //В event.data он не попадёт!
  trigger_data: function() {
	$inp1.on("click", (event, data) => {
	  log("inp1 click. data:",data,"event.data:",event.data);
	});

	$testBtn1.on("click", event => {
		$inp1.trigger( "click", "Trigger message");
	});	
	
	return $inp1.add($testBtn1);
  },


  //назначение обработчика с передачей дополнительного селектора
  on_selector: function() {
	//с передачей дополнительного селектора
	return $(".panel1").on("click", " input:text", clickHandler);
  },


  
  //off() - убирает все обработчики событий, привязанные к этому элементу
  off_inp1: function() {
	return $inp1.off();
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

  $testBtn1 = $("#testBtn1"); 
  $testBtn2 = $("#testBtn2"); 



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



