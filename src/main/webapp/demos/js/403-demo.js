

//Функция, которая будет вызвана в случае удачного завершения запроса к серверу. 
//data	:данные, присланные сервером и уже прошедшие предварительную обработку (которая отлична для разных dataType)
//textStatus	: Статус выполнения ("success", "notmodified", "nocontent", "error", "timeout", "abort", "parsererror")
function debugSuccessHandler(data, textStatus) {
  let type = typeof data;
  log("request successfull");
  log("textStatus: ", textStatus);
  log("data type:", type);
  log("data: ", data);
}



//Функция, которая будет вызвана в случае неудачного завершения запроса к серверу.
function debugErrorHandler(jqXHR, textStatus, errorThrown) {
  log("textStatus:", textStatus);
  log("errorThrown:", errorThrown);
}


//Функция, которая будет вызвана после завершения ajax-запроса.
//Вызывается позднее success и error.
function debugCompleteHandler(jqXHR, textStatus) {
  log("all complete. textStatus:", textStatus);
}

let testJson = {
  "title": "Иван",
  "id": 30
}





//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  ajax1_get_json_file: function() {

	//получаем json из файла
	$.ajax({
	  url: "../misc/test.json",
	  type: "GET",
	  dataType: "json",		//Тип данных, который Вы ожидаете от сервера (text, html, xml, json, jsonp, script).
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});

  },
  ajax2_get_json_from_server: function() {

	//получаем json из сервлета
	//отправляем на сервер параметры запроса (в testJson)
	$.ajax({
	  url: "../../testAjax/getSectionsJson",
	  type: "GET",
	  data: testJson,
	  dataType: "json",
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});

  },
  ajax3_post_json: function() {

	//	let formData = accordUtils.formToJSON(this.grid.filtersModel.$form);

	//отправляем json на сервер
	$.ajax({
	  url: "../../testAjax/updateTasksFilter",
	  type: 'POST',
	  contentType: 'application/json',		//Формат, в котором данные отправляются на сервер. По умолчанию это параметры запроса.
	  data: JSON.stringify(testJson),
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});


  },
  ajax4_post_request_params: function() {

	//отправляем параметры запроса на сервер
	$.ajax({
	  url: "../../testAjax/TestPostRequest",
	  type: 'POST',
	  data: testJson,
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',	//можно не указывать - он такой по умолчанию
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});


  },
  ajax5_handlers_alternative: function() {
	
	//альтернативный способ задания обработчиков через объект jqXHR (возвращается $.ajax())
	$.ajax({
	  url: "../misc/test.json",
	  type: "GET"
	})
	  .done(debugSuccessHandler)
	  .fail(debugErrorHandler)
	  .always(debugCompleteHandler);


  },
  ajax5_post_form: function() {

	var serializedForm = $("#form2").serialize();
	//отправляем данные формы на сервер
	$.ajax({
	  url: "../../testAjax/TestPostRequest",
	  type: 'POST',
	  data: serializedForm,
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',	//можно не указывать - он такой по умолчанию
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});
	
	
	
	
  },
  ajax5: function() {

  },


}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();

  
  //перехватываем submit формы
  $("№form2").submit(function( event ) {
    event.preventDefault();
	
	var serializedForm = $("#form2").serialize();
	//отправляем данные формы на сервер
	$.ajax({
	  url: "../../testAjax/TestPostRequest",
	  type: 'POST',
	  data: serializedForm,
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});
	
  });  
  
  
  
});
