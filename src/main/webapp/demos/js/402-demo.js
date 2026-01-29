



//тестовый обработчик для всех типов событий - выводит данные из event в лог
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


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  bind_inp_click: function() {
	//назначает обработчик на все инпуты
	return $("#formDiv1 input").bind("click", universalDemoHandler);
  },

  unbind_inp1: function() {
	//unbind - убирает обработчик
	return $inp2.unbind("click", universalDemoHandler);
  },


  on_inp1_click: function() {
	//on - назначение обработчика
	return $inp1.on("click", universalDemoHandler);
  },

  on_two_events: function() {
	//on - назначение обработчика на 2 события
	return $inp1.on("mouseenter mouseleave", event => {
	  $inp1.toggleClass("bg-red");
	});
  },

  on_inp1_multi_handlers: function() {
	//назначение сразу нескольких обработчиков на разные события
	return $inp1.on({
	  mouseenter: universalDemoHandler,
	  mouseleave: universalDemoHandler,
	  click: universalDemoHandler
	});
  },

  on_data_param: function() {
	//назначение обработчика с передачей data-объекта, который можно получить из event
	$inp1.on("click", { msg: "Spoon!" }, event => {
	  log("inp1 click. event.data:", event.data);
	});

	$testBtn1.on("click", event => {
	  $inp1.trigger("click");
	});

	return $().add($inp1).add($testBtn1);
  },

  trigger_data: function() {
	//при вызове trigger можно передать data-объект.
	//Его можно получить через доп. параметр обработчика события.
	//В event.data он не попадёт!
	$testBtn1.on("click", event => {
	  $inp1.trigger("click", "Trigger message");
	});
	
	$inp1.on("click", (event, data) => {
	  log("inp1 click. data:", data, "event.data:", event.data);
	});

	return $().add($inp1).add($testBtn1);
  },


  on_selector: function() {
	//назначение обработчика с передачей дополнительного селектора-фильтра
	//фактически будет 1 обработчик на $panel1
	return $panel1.on("click", " input:text", universalDemoHandler);
  },

  off_inp1: function() {
	//off() - убирает все обработчики событий, привязанные к этому элементу
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



  events_preventDefault: function() {

	//запрет на копирование-вставку
	$inp1.on("cut copy paste", event => { return false });

	//event.preventDefault()- предотвратить поведение элемента по умолчанию
	//запрет на submit формы 
	$form1.submit(event => {
	  event.preventDefault();
	  log("form1 submit");
	});

	//запрет на клавиатурные события в $inp2 
	$inp2.keydown(event => {
	  event.preventDefault();
	  log("inp2 keydown");
	});


	return $().add($inp1).add($inp2);
  },


  events_stopPropagation: function() {
	//stopPropagation() - предотвращает всплытие события вверх по дереву.
	//$panel1 это событие уже не получит
	$inp1.click(event => {
		event.stopPropagation();
		log("inp1 click");
	});
	$inp2.click(event => {
		log("inp2 click");
	});

	$panel1.click(event => {
	  log("panel1 click");
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





$(() => {
  initDemoCodeSelect("#selectors", selectorsData1);

  reloadSandbox();

});



