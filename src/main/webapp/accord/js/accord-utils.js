/**
 * Разнообразные вспомогательные функции
 * 
 */

export { accordUtils };


let $copyDiv;
let downloadLink3 = null;
let scriptSrc = import.meta.url;
let accordUtils = {
  accordPath: scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/') + 1),
  alignToCenter: alignToCenter,
  jsonCopy: jsonCopy,
  getHiddenContainer: getHiddenContainer,
  addCssFile: addCssFile,
  loadHtmlFragmentXHR: loadHtmlFragmentXHR,
  loadHtmlFragmentFetch: loadHtmlFragmentFetch,
  deleteAllCookies: deleteAllCookies,
  deleteAllCookiesAndReload: deleteAllCookiesAndReload,
  copyTextToBuffer: copyTextToBuffer,
  openDownloadUrl: openDownloadUrl,
  formToJSON: formToJSON,
  decorInput: decorInput,
  calcElementPosition: calcElementPosition,
  
  generateSelect: generateSelect,
  generateBooleanSelect: generateBooleanSelect,
  fillSelect: fillSelect,
  generateSelectOptions: generateSelectOptions,
  
  random: random,
  randomDate: randomDate,
  formatDate: formatDate,
  parseDate: parseDate,

};
window.accordUtils = accordUtils;


//возвращает случайное целое число в заданном диапазоне
// пример: random(5)
function random(max, min = 0) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomDate(minYear = 2020, maxYear=2025){
	let yearDiapazon = maxYear - minYear;
	return new Date(minYear+random(yearDiapazon), random(13), random(30));
}



function formatDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
}

function parseDate(dateStr) {
	
	var d=dateStr.substring(0,2);
	var m=dateStr.substring(3,5);
	var y=dateStr.substring(6,10);
	m--;
	var c = new Date(y, m, d, 1, 1); 
	return c;	
}






/**
 * Генерация элемента select с заданными опциями.
 * data - массив с объектами типа {id: 1, name: 'my name'}. 
 * Или массив строк, чисел...
 * withNullOption - включать ли строку с пустым значением.
 * Возвращает jquery объект $select.
 */
function generateSelect(name, data, withNullOption = true) {
	
	let $select = $(`select[name='${name}']`);
	if ($select.length==0){
		$select = $(`<select name="${name}"></select>`);
	}
	
	fillSelect($select, data, withNullOption);
	
	return $select;	
}

function fillSelect($select, data, withNullOption = false) {
	let optionsCode = generateSelectOptions(data, withNullOption); 
	$select.append(optionsCode);
	return $select;	
}

function generateSelectOptions(data, withNullOption = false) {
	let optionsCode = withNullOption?'<option value="">-</option>':'';
	
	data.forEach(item=>{
		
		if (typeof item=="object"){
			optionsCode+=`<option value="${item.id}">${item.name}</option>`;
		} else {
		optionsCode+=`<option value="${item}">${item}</option>`;
		}
		
	});
	
	return optionsCode;
}


function generateBooleanSelect(name, withNullOption = true) {
	let data = [
		{id: "true",name: "Да"},
		{id: "false",name: "Нет"},
	];
	return generateSelect(name,data,withNullOption);
}










/**
 * Располагает панель с абсолютным позиционированием по центру браузера
 */

function alignToCenter($panel) {
  let $g = $(window);
  $panel
    .css("top", $g.height() / 2 - $panel.height() / 2)
    .css("left", $g.width() / 2 - $panel.width() / 2);
}

function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}


let $hiddenContainer = null;
//невидимое хранилище для разных скрытых элементов
function getHiddenContainer() {

  $hiddenContainer = $("#accHiddenContainer");
  if ($hiddenContainer.length == 0) {
    $hiddenContainer = $('<div id="accHiddenContainer" style="display:none;"/>');
  }

  $hiddenContainer.remove().appendTo("body");
  return $hiddenContainer;

}


// addCssFile('styles.css');
function addCssFile(filename) {
  let link = document.createElement('link');

  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}


//загружает html-фрагмент через XMLHttpRequest. Синхронно
//считается устаревшим способом
function loadHtmlFragmentXHR(fragmentUrl, $target, relativeToAccord = false) {
  let xhr = new XMLHttpRequest();

  let url = fragmentUrl;
  if (relativeToAccord && !fragmentUrl.startsWith("http:")) {
    url = this.accordPath + url;
  }

  //	let url = relativeToAccord?(this.accordPath+fragmentUrl):fragmentUrl;

  xhr.open("GET", url, false); // false для синхронного вызова
  xhr.send();

  if (xhr.status === 200) {

    if (!$target) {
      $target = document.body;
    }
    let r = $(xhr.responseText).appendTo($target);
    //		console.log(url+" loaded.");
    return r;

  } else {
    console.error("Ошибка загрузки");
    return null;
  }


}

//загружает html-фрагмент через fetch. Возвращает promise
async function loadHtmlFragmentFetch(fragmentUrl, $target, relativeToAccord = false) {

  let url = fragmentUrl;
  if (relativeToAccord && !fragmentUrl.startsWith("http:")) {
    url = this.accordPath + url;
  }

  //	let url = relativeToAccord?(this.accordPath+fragmentUrl):fragmentUrl;

  try {
    //fetch() возвращает промис, который можно ожидать с помощью await.
    const response = await fetch(url);
    const htmlContent = await response.text();

    if (!$target) {
      $target = document.body;
    }

    let r = $(htmlContent).appendTo($target);
    //		console.log(url+" loaded.");
    return r;

  } catch (err) {
    console.error("Ошибка загрузки:" + err);
  }

}




function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0;i < cookies.length;i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function deleteAllCookiesAndReload(event) {
  if (event) {
    event.preventDefault();
  }
  this.deleteAllCookies();
  location.href = location.pathname;
}

function copyTextToBuffer(textValue) {
  window.getSelection().removeAllRanges();
  $copyDiv.text(textValue);
  let range = document.createRange();
  range.selectNode($copyDiv.get(0));
  window.getSelection().addRange(range);
  try {
    let successful = document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy:' + err);
  }
  window.getSelection().removeAllRanges();
  $copyDiv.text('');
}


function openDownloadUrl(url) {
  if (!downloadLink3) {
    downloadLink3 = document.createElement('a');
  }
  downloadLink3.href = url;
  downloadLink3.click();

}



function formToJSON($form) {
  var array = $form.serializeArray();
  var json = {};

  array.forEach(field => {

    let val = json[field.name];
    if (val) {
      //multiselect
      val += "," + field.value;
    } else {
      val = field.value;
    }
    json[field.name] = val;
  });

  return json;
}



let decorInputOptionsDefault = {
  addButton: true,
  decorButtonClasses: "acc-btn-calendar",
  placeButtonBefore: true,
  buttonHandler: null
}

//декорирует input, добавляя к нему кнопку (впереди или позади) с заданной иконкой.
function decorInput($input, options) {

  options = $.extend({}, decorInputOptionsDefault, options);

  if (options.addButton) {

    let buttonClasses = options.decorButtonClasses;
    let $calButton = $(`<button type="button" class="acc-btn acc-btn-icon ${buttonClasses}"></button>`);
    if (options.buttonHandler) {
      $calButton.click(options.buttonHandler);
    }


    $input.wrap('<div class="acc-button-panel-tight"></div>');
    if (options.placeButtonBefore) {
      $input.before($calButton)
    } else {
      $input.after($calButton)
    }

  }


}

//вычисляет положение заданного тега в окне
function calcElementPosition(e){
	var left = 0
	var top  = 0

	if (e.jquery){
		e = e.get(0);
	}
	
	while (e.offsetParent){
		left += e.offsetLeft
		top  += e.offsetTop
		e	 = e.offsetParent
	}

	left += e.offsetLeft
	top  += e.offsetTop

	return {x:left, y:top}
}


/*
function formToJSON ($form) {
    var array = $form.serializeArray();
    var json = {};
	
    $.each(array, function() {
//		let val = this.value;
        let fv = json[this.name];
    	
        if (fv) {
        	
            fv+=","+this.value;
        	
//			if (!Array.isArray(fv)) {
//				json[this.name] = [fv];
//			}
//			json[this.name].push(this.value);
        	
        } else {
            json[this.name] = this.value;
        }
    });
    return json;
}
*/

$(document).ready(function() {

  $copyDiv = $('<div id="copyDiv" style="height: 0px;"></div>').appendTo(document.body);

});





console.log('accord initiated. accordPath=' + accordUtils.accordPath);

