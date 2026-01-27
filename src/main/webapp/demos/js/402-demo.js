


let $workPanel;

let $btn1, $btn2, $inp1, $inp2, $inp3, $inp4, $testBtn1, $testBtn2;

let formDiv1, formDiv2;
let form1, form2;


function universalDemoHandler(event) {
  logNL();


  log(
	//event.type - тип события: click, mouseover...
	`type=${event.type}, ` +

	//event.currentTarget - Элемент, на который назначен обработчик события в данный момент.
	`currentTarget=${event.currentTarget?.id}, ` +
	
	//event.target - самый глубокий элемент, на котором произошло событие.
	//То есть, это элемент, на котором фактически сработало событие
	`target=${event.target?.id}`

  );

  let type = event.type;


  if (type == 'mouseover' || type == 'mouseout' || type == 'mouseenter' || type == 'mouseleave') {

	log(
	  //event.relatedTarget - mouseover(элемент, с которого пришел курсор мыши), mouseout(на который перешел)
	  `relatedTarget=${event.relatedTarget?.id}`
	);
  }



  if (type == 'mousedown' || type == 'mouseup' || type == 'click') {

	log(
	  //event.button - Какая кнопка мыши была нажата (0-левая, 1-средняя, 2-правая)
	  `button=${event.button}, ` +

	  //event.pageX - координаты относительно документа, учитывая прокрутку
	  `pageX=${event.pageX}, pageY=${event.pageY},` +

	  //event.clientX - координаты кликнутой точки относительно окна
	  `clientX=${event.clientX}, clientY=${event.clientY},` +

	  //event.which - jquery атрибут. Для нажатия клавиши = event.keyCode. Для нажатия кнопки мыши = event.button
	  `which=${event.which}, ` +

	  //нажаты ли клавиши-модификаторы
	  `shiftKey=${event.shiftKey}, altKey=${event.altKey}, ctrlKey=${event.ctrlKey}, metaKey=${event.metaKey}`
	);

  }


  if (type == 'keydown' || type == 'keyup') {

	log(
	  //code - название клавиши. Примеры: KeyD, Digit5, F2
	  `code=${event.originalEvent.code}, ` +

	  //key - символьное значение клавиши: F3, Q, q, Alt...
	  `key=${event.key}, ` +

	  //keyCode - Устаревший. Возвращает числовой код клавиши.
	  `keyCode=${event.keyCode}, ` +

	  //which ==event.keyCode
	  `which=${event.which}, ` +

	  //При долгом нажатии клавиши возникает автоповтор: keydown срабатывает снова и снова
	  //Для таких событий event.repeat=true.
	  `repeat=${event.originalEvent.repeat}, ` +

	  //нажаты ли клавиши-модификаторы
	  `shiftKey=${event.shiftKey}, altKey=${event.altKey}, ctrlKey=${event.ctrlKey}, metaKey=${event.metaKey}`
	);

  }

}


function clickHandler(event) {
  logNL();
  log(`type=${event.type}, currentTarget=${event.currentTarget.id}, pageX=${event.pageX}, pageY=${event.pageY}`);
  log(`event (type=${event.type})`);
  logObject(event, 'currentTarget', "pageX", "pageY");

}

function simpleHandler(event) {
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
	  log("inp1 click. event.data:", event.data);
	});

	$testBtn1.on("click", event => {
	  //это сообщение в event.data не попадёт!
	  $inp1.trigger("click", "Trigger message");
	});

	return $().add($inp1).add($testBtn1);
  },

  //при вызове trigger пожно передать data-объект.
  //Его можно получить через доп. параметр обработчика события.
  //В event.data он не попадёт!
  trigger_data: function() {
	$inp1.on("click", (event, data) => {
	  log("inp1 click. data:", data, "event.data:", event.data);
	});

	$testBtn1.on("click", event => {
	  $inp1.trigger("click", "Trigger message");
	});

	return $().add($inp1).add($testBtn1);
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







  events_mouse1: function() {

	$inp1.on("click", universalDemoHandler);

	$inp2.on("mousedown", universalDemoHandler);
	$inp2.on("mouseup", universalDemoHandler);

	$inp3.on("mouseover", universalDemoHandler);
	$inp3.on("mouseout", universalDemoHandler);

	//	Похожи на mouseover/mouseout, но есть отличия:
	//  1)Переходы внутри элемента, на его потомки и с них, не считаются.
	//  2)Эти события не всплывают.
	$formDiv2.on("mouseenter", universalDemoHandler);
	$formDiv2.on("mouseleave", universalDemoHandler);

	return $().add($inp1).add($inp2).add($inp3).add($formDiv2);
  },

  events_keyboard: function() {

	$inp1.on("keydown", universalDemoHandler);

	$inp2.on("keyup", universalDemoHandler);

	//получение и потеря фокуса ввода
	$inp3.on("focus", universalDemoHandler);
	$inp3.on("blur", universalDemoHandler);


	return $().add($inp1).add($inp2);
  },


  events_misc: function() {

	//получение и потеря фокуса ввода
	$inp1.on("focus", universalDemoHandler);
	$inp1.on("blur", universalDemoHandler);

	$inp2.on("cut", universalDemoHandler);
	$inp2.on("copy", universalDemoHandler);
	$inp2.on("paste", universalDemoHandler);


	//срабатывает по окончании изменения элемента.
	//Для input-ов срабатывает при потере ими фокуса, для остальных - сразу же
	$inp3.on("change", universalDemoHandler);
	$inp4.on("change", universalDemoHandler);


	return $().add($inp1).add($inp2);
  },



  events_methods: function() {

	//запрет на копирование-вставку
	$inp1.on("cut", event => { return false });
	$inp1.on("copy", event => { return false });
	$inp1.on("paste", event => { return false });



	//event.preventDefault()- предотвратить поведение элемента по умолчанию

	//запрет на submit формы 
	$form1.submit(event => {
	  event.preventDefault();
	  log("form1 submit");
	});

	//запрет на печать в $inp2 
	$inp2.keydown(event => {
	  event.preventDefault();
	  log("inp2 keydown");
	});


	return $().add($inp1).add($inp2);
  },


  events_stopPropagation: function() {

	$inp1.click(event => {
		event.stopPropagation();
	  log("inp1 click");
	});

	$form1.submit(event => {
	  event.preventDefault();
	  log("form1 submit");
	});
	
	return $().add($inp1).add($inp2);
  },

  
  one: function() {

	  $inp1.one("click", event => {
	    log("inp1 click once");
	  });
	
	  return $().add($inp1);
  },
  

  //шаблоны
  templates: function() {

	$inp1.keydown(event => {
	  event.preventDefault();
	  log(`keydown, key=${event.key}, keyCode=${event.keyCode}`);
	});
	
	$inp1.mousedown(event => {
	  log("mousedown, button="+event.button);
	});

	$form1.submit(event => {
	  event.preventDefault();
	  log("form1 submit");
	});
	
	$inp3.on("click", { msg: "Spoon!" }, event => {
	  log("inp1 click. event.data:", event.data);
	});	
	

    return $().add($inp1).add($inp2);
  },  
  
  
  
  
  
  


}




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

  $formDiv1 = $("#formDiv1");
  $formDiv2 = $("#formDiv2");

  $form1 = $("#form1");
  $form2 = $("#form2");




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
	clearLog();
  });

  $("#bReload").click(e => {
	reloadSandbox();
  });



  reloadSandbox();




});



