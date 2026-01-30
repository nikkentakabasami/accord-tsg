

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

let badTestJson = {
  "title": "Иван",
  "badField": 30
}


const sectionsUrl = "../../testAjax/getSectionsJson";
const testJsonUrl = "../misc/test.json";

//post запрос с параметрами (из формы)
const testPostUrl = "../../testAjax/TestPostRequest";

//post запрос с отправкой json
const updateFilterUrl = "../../testAjax/updateTasksFilter";



//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  ajax_get_json_file: function() {

	//получаем json из файла
	$.ajax({
	  url: testJsonUrl,
	  type: "GET",
	  dataType: "json",		//Тип данных, который Вы ожидаете от сервера (text, html, xml, json, jsonp, script).
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});

  },
  ajax_get_json_from_server: function() {

	//получаем json из сервлета
	//отправляем на сервер параметры запроса (в testJson)
	$.ajax({
	  url: sectionsUrl,
	  type: "GET",
	  dataType: "json",		//Тип данных, который Вы ожидаете от сервера
	  data: testJson,		//get-запросы не имеют тела. Так что в data передаются параметры запроса.
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});

  },
  ajax_post_json: function() {

	//	let formData = accordUtils.formToJSON(this.grid.filtersModel.$form);

	//отправляем json на сервер
	$.ajax({
	  url: "../../testAjax/updateTasksFilter",
	  type: 'POST',
	  contentType: 'application/json',		//Формат, в котором данные отправляются на сервер. По умолчанию это параметры запроса.
	  data: JSON.stringify(testJson),		//тело запроса
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});


  },
  ajax_post_request_params: function() {

	//отправляем параметры запроса на сервер
	$.ajax({
	  url: testPostUrl,
	  type: 'POST',
	  data: testJson,		//параметры запроса (будут отправлены в теле запроса)
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',	//можно не указывать - он такой по умолчанию
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});


  },
  ajax_handlers_alternative: function() {

	//альтернативный способ задания обработчиков через объект jqXHR (возвращается $.ajax())
	$.ajax({
	  url: testJsonUrl,
	  type: "GET"
	})
	  .done(debugSuccessHandler)
	  .fail(debugErrorHandler)
	  .always(debugCompleteHandler);


  },
  ajax_post_form: function() {

	//отправляем данные формы на сервер
	var serializedForm = $("#form2").serialize();
	$.ajax({
	  url: testPostUrl,
	  type: 'POST',
	  data: serializedForm,
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',	//можно не указывать - он такой по умолчанию
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});




  },
  xhr_get_sync: function() {
	//XMLHttpRequest - встроенный в браузер класс, который даёт возможность делать ajax-запросы

	//GET-запрос с использованием XMLHttpRequest. 
	//Синхронный запрос
	let xhr = new XMLHttpRequest();
	xhr.open("GET", sectionsUrl, false); // false для синхронного вызова
	xhr.send();

	log(`status: ${xhr.status}, statusText: ${xhr.statusText}`);
	if (xhr.status === 200) {
	  log(`responseType: ${xhr.responseType}`);
	  log("data: ", xhr.responseText);
	} else {
	  log("Ошибка загрузки");
	}

  },


  xhr_get_async: function() {

	//GET-запрос с использованием XMLHttpRequest. 
	//Асинхронный запрос
	let xhr = new XMLHttpRequest();
	xhr.open("GET", sectionsUrl); //вызов асинхронный по умолчанию
	//  xhr.open("GET", "../../badUrl"); //проверяем ошибку

	xhr.send();
	
	//load - загрузка завершена
	xhr.onload = (event) => {
	  log(`status: ${xhr.status}, statusText: ${xhr.statusText}`);

	  if (xhr.status != 200) {
		log("Ошибка");
		return;
	  }
	  log(`Готово, получили ${xhr.response.length} байт`);
	  log("data: ", xhr.responseText);
	};

	//error - ошибка
	xhr.onerror = (event) => {
	  log(`status: ${xhr.status}, statusText: ${xhr.statusText}`);
	  log("Запрос не удался");
	};

	//progress - запускается периодически, по мере загрузки данных
	xhr.onprogress = (event) => {
	  if (event.lengthComputable) {
		log(`Получено ${event.loaded} из ${event.total} байт`);
	  } else {
		log(`Получено ${event.loaded} байт`);
	  }
	};

	//так же обработчики можно добавлять в стиле:
	//addEventListener("load", (event) => { })
  },

  fetch_get_sync: async function() {

	//fetch - Современная замена XMLHttpRequest. Доступен как глобальная функция. 
	//Не использует коллбэки, основан на promise.
	//get-запрос в синхронном стиле
	try {
	  const response = await fetch(sectionsUrl);
	  log(`status: ${response.status}, statusText: ${response.statusText}`);
	  if (!response.ok) {
		throw new Error(`Bad response status: ${response.status}`);
	  }

	  const result = await response.text();
	  //получение ответа в прочих форматах
	  //const result = await response.json();
	  //const result = await response.arrayBuffer();
	  //const blob = await response.blob();
	  //image.src = URL.createObjectURL(blob);	  

	  //в виде потока
	  //const stream = response.body.pipeThrough(new TextDecoderStream());
	  //for await (const value of stream) {console.log(value);}	  
	  	  
	  

	  log(result);
	} catch (error) {
	  log(error.message);
	}

  },

  fetch_get_async: async function() {

	  //get-запрос в асинхронном стиле (fetch возвращает Promise)
	  fetch(sectionsUrl)
	  	.then(response => {
	  		log(`status: ${response.status}, statusText: ${response.statusText}`);
	  		if (!response.ok) {
	  			log("Error!");
	  		}
	  		response.text().then(result=>{
	  			log(result);
	  		});
	  });
  },    
  
  
  fetch_post_params_sync: async function() {

	//отправка POST запроса с использованием fetch.
	//при этом на сервер отправляются параметры запроса
	try {
	  const response = await fetch(testPostUrl, {
		method: "POST",

		//отправка формы
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: new URLSearchParams(testJson),

	  });
	  log(`status: ${response.status}, statusText: ${response.statusText}`);
	  if (!response.ok) {
	  throw new Error(`Bad response status: ${response.status}`);
	  }
	  const result = await response.text();

	  log(result);
	} catch (error) {
	  log(error.message);
	}

  },

  fetch_post_json_sync: async function() {

	//отправка POST запроса с использованием fetch.
	//при этом на сервер отправляются json-данные (класс TSGTaskFilter)
	try {
	  const response = await fetch(updateFilterUrl, {
		method: "POST",

		//отправка json
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(testJson),
//		body: JSON.stringify(badTestJson),
		
	  });
	  log(`status: ${response.status}, statusText: ${response.statusText}`);
	  if (!response.ok) {
	  throw new Error(`Bad response status: ${response.status}`);
	  }
	  const result = await response.text();

	  log(result);
	} catch (error) {
	  log(error.message);
	}

  },

  
  

}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();


  //перехватываем submit формы
  $("№form2").submit(function(event) {
	event.preventDefault();

	var serializedForm = $("#form2").serialize();
	//отправляем данные формы на сервер
	$.ajax({
	  url: testPostUrl,
	  type: 'POST',
	  data: serializedForm,
	  success: debugSuccessHandler,
	  error: debugErrorHandler,
	  complete: debugCompleteHandler
	});

  });



});
