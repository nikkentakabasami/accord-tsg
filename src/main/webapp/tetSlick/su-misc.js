//----------------------------------
//-----разнообразные вспомогательные методы (Используются во многих проектах)
//----------------------------------



var monthNames = ["Январь", "Февраль", "Mарт", "Aпрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

let $copyDiv;
let downloadLink3 = null;
let $waitPanel;
let $waitContent;



$(document).ready(function() {

	$copyDiv = $('<div id="copyDiv" style="height: 0px;"></div>').appendTo(document.body);

});


//сохранение системных настроек в БД
function setUserPreference(key, value, callback) {
	
	$.post({
	      url: "v3/userPreference",
	      data: { 'key': key, 'value':value },
	      success: function(data, status, request){
	    	  if (data=='ok'){
	  	        console.log("preference saved");
	  	        if (callback){
					  callback();
				  }
	    	  }
	      }
	    });  	
}

//получение системных настроек из БД
function getUserPreference(key, callback) {
	
	$.get({
	      url: "v3/userPreference",
	      data: { 'key': key },
	      success: callback
	    });	
	
}

//Функция добавления куки
function setCookie(name, value) {
//  options = options || {};

  //добавляем дату истечения через 2 недели
  var expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 14);
  var expiresString = expiresDate.toUTCString();
  
  value = encodeURIComponent(value);

  var cookieString = name + "=" + value;
  cookieString += "; expires="+expiresString;

  document.cookie = cookieString;
}

//Функция получения куки
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}


function getCookieBoolean(cname, defValue) {
  var s = getCookie(cname);
  if (s==null){
    return defValue;
  }
  return ("true"===s);
}

function getCookieInt(cname, defValue) {
  var s = getCookie(cname);
  if (s==null){
    return defValue;
  }
  return parseInt(s);
}

//Сохраняет в куки объект
function setCookieObject(name, object) {
  if (!object){
    setCookie(name, null);
    return;
  }
  
  setCookie(name, JSON.stringify(object));
}

//получает объект из куки
function getCookieObject(name){
  var s = getCookie(name);
  if (!s){
    return null;
  }
  return JSON.parse(s);
}


function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function deleteAllCookiesAndReload(event) {
  event.preventDefault();
  deleteAllCookies();
  location.href = location.pathname;
}






	
function copyTextToBuffer(textValue){
	window.getSelection().removeAllRanges();
	$copyDiv.text(textValue);
	let range = document.createRange();  
	range.selectNode($copyDiv.get(0));  
	window.getSelection().addRange(range);  
	try {  
		var successful = document.execCommand('copy');  
		var msg = successful ? 'successful' : 'unsuccessful';  
	} catch(err) {  
		console.log('Oops, unable to copy:'+err);  
	}  
	window.getSelection().removeAllRanges();      
	$copyDiv.text('');
}	


//получение параметра запроса
function getRequestParameter(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
     return decodeURIComponent(name[1]);
}


function openInNewTab(url, target) {
  
  if (target){
    var win = window.open(url, target);
    win.focus();
  } else {
    var win = window.open(url, '_blank');
    win.focus();
  }
  
}

//открывает ссылку на загрузку файла (window.open срабатывает не всегда)
function openDownloadUrl(url){

	if (!downloadLink3){
		downloadLink3 = document.createElement('a');
	}
	downloadLink3.href=url;
	downloadLink3.click();
}

//скачать заданный объект в JSON-формате
function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}


//клонирование объекта через конвертацию в json и обратно
function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

function strIsInteger(str){
  return Number.isInteger(parseInt(str));
}

function formatJsonDate(dateJson){
  var d = new Date(dateJson);

  var formatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  return formatter.format(d);      
}


//Переход в полнокранный режим
function openFullscreen() {
  let elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

//выход из полноэкранного режима
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}



//функция для работы с переключаемыми кнопками bootstrap
//позволяет сделать кнопку нажатой или отжатой
//пример: toggleButton($("#btn-add-remove-handle"), false);
//код кнопки: <button id="btn-add-remove-handle" class="btn btn-xs text-primary" data-toggle="button">...
function toggleButton($button, active) {

  if (active) {
   $button.attr("aria-pressed", true);
   $button.addClass("active");
  } else {
   $button.attr("aria-pressed", false);
   $button.removeClass("active");
  }

}

/*

function showWaitPanel(mess){
  

  if (!$waitPanel) {
    $waitPanel = $(
        "<span class='loading-indicator'><label>Загрузка...</label></span>")
        .appendTo(document.body);
    
    $waitContent = $('.loading-indicator label')
    var $g = $(window);
    
    $waitPanel.css("position", "absolute")
    .css("top",$g.height() / 2 - $waitPanel.height() / 2)
    .css("left",$g.width() / 2 - $waitPanel.width() / 2);
  }

	$waitPanel.bind("dblclick", function() {
		hideWaitPanel();
	});

  
  if (!mess){
    $waitContent.text('Подождите');
  } else {
    $waitContent.text(mess);
  }
  
  $waitPanel.show();
  
}

//Скрытие панели ожидания
function hideWaitPanel(){
  if ($waitPanel){
    $waitPanel.fadeOut();
  }
}
*/



/**
 * Делает POST запрос на добавление/изменение/удаление объекта на сервер.
 * В качестве параметров задаётся json-объект.
 * Обрабатывает ошибки доступа.
 * 
 * В callback функцию передаёт true, если операция успешно завершена. 
 * 
 * пример использования:
    makePostRequest(
        'app/moveObject',
        moveObject,
        function(success){
          showMapDataForTile();
    });
 * 
 */
function makePostRequest(url,object,callback){
  
  showWaitPanel();
  
  var conf = {
      type: "POST",
      url: url,
      success: function(result, status, request){
        hideWaitPanel();
        
        callback(true, result);
      },
      error: function(result, status, request){
        if (result.status==403){
          bootbox.alert("Нет прав на эту операцию!");
        } else {
          bootbox.alert("Ошибка!");
        }
        hideWaitPanel();
        
        callback(false);
      }
    }; 
  
  //Вставляем в тело запроса JSON объект, если он задан
  if (object){
    conf.contentType = 'application/json';
    conf.data = JSON.stringify(object);
  }

  if (typeof csrfToken=="string"){
    conf.headers = {
        "X-CSRF-TOKEN": csrfToken
    } 
  }
  $.ajax(conf);      
}


/**
 * Выполнение get-запросов
 * 
 * 
 * пример:
    makeGetRequest("app/consumer/111/222", null,
        function(succ, result){
          console.log("lineId="+result.lineId);
          console.log("objectId="+result.objectId);
    });  
 * 
 */
function makeGetRequest(url,object,callback){
  
  showWaitPanel();
  
  var conf = {
      type: "GET",
      url: url,
      success: function(result, status, request){
        hideWaitPanel();
        
        callback(true, result);
      },
      error: function(result, status, request){
        if (result.status==403){
          bootbox.alert("Нет прав на эту операцию!");
        } else {
          bootbox.alert("Ошибка!");
        }
        hideWaitPanel();
        
        callback(false);
      }
    }; 
  
  //Вставляем в тело запроса JSON объект, если он задан
  if (object){
    conf.contentType = 'application/json';
    conf.data = JSON.stringify(object);
  }
  $.ajax(conf);      
}



//Округление до заданного знака после запятой
function roundNumber(n,d){
  var m = 1;
  if (d){
    m = Math.pow(10,d);
  }
  
  return Math.round(n*m)/m;
}

function makeRandomInt(maxVal){
	return Math.round(Math.random() * maxVal)	
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Аяксово подгружает html-данные из заданной страницы и вставляет их в заданный контейнер
 * 
 */
function loadSubpage(containerSelector, url, onready){
	
	let $target = $(containerSelector) 
	$target.html('');
	
	$.ajax({
		url: url,
		dataType : 'html',
//		data: params,
		success : function(data, textStatus, jqXHR){
			
			$inputs = $(data).closest("form").children();
			
			$target.html($inputs);
			
			onready($target);

		},
		error : function(jqXHR, textStatus, errorThrown){
			console.log("Ошибка при загрузке страницы по ссылке " + url)
		}
	});
}






