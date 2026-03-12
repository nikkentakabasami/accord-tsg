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
	loadFileAsString: loadFileAsString,
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
  generateDatalist: generateDatalist,
  
  random: random,
  randomDate: randomDate,
  formatDate: formatDate,
  parseDate: parseDate,
  cloneTemplate: cloneTemplate,
  cloneObject: cloneObject,
	highlightText: highlightText,
	stringToRegex: stringToRegex,
	escapeHTML: escapeHTML,
	addJSToPage: addJSToPage,
	removeJSFromPage: removeJSFromPage,
  

};
window.accordUtils = accordUtils;


//добавляет в документ js-файл (и выполняет его)
function addJSToPage(jsHref, onload) {
	
	const script = document.createElement('script');
  script.src = jsHref;
  script.type = 'text/javascript';

  script.onload = () => {
		if (onload){
			onload();
		}
		
    console.log(jsHref+' added and executed');
  };

  // Добавляем элемент в DOM, обычно в head или body
  document.body.appendChild(script);	
	
	return script;
}

//удаляет js-файл из документа
function removeJSFromPage(script) {
	
	if (script){
		document.body.removeChild(script);
		console.log(`${script.src} removed!`);
	}
	
}


//экранирует спецсимволы в тексте перед вставкой в html 
function escapeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

//преобразовывает строку с регулярным выражением (например "/a{3}/g") в объект RegExp
function stringToRegex(str){
	if (str instanceof RegExp){
		return str;
	}
	
	const match = str.match(/^\/(.*)\/([a-z]*)$/);
	if (match) {
	  const pattern = match[1];
	  const flags = match[2];
		
	  const regex = new RegExp(pattern, flags);
		return regex;
	} else {
		throw new Error("Строка не в правильном формате");
	}	
}


const defaultHighlightOptions = {
	regex: null,
	class: "green",
	startIndex: -1,
	length: -1,
	sections: null,
	text: null,
	$div: null,
	matchHandler: null
	
}

//подсвечивает текст в заданном div, заданным цветовым классом.
//области подсветки можно задавать регулярным выражением или массивом sections.
//возвращает результат поиска и модифицированный текст (в формате options)
function highlightText(options){
	
	options = $.extend({}, defaultHighlightOptions, options);
	let sections = options.sections;
	if (!sections){
		sections = [];
	}
	
	let $div = options.$div;
	
	let text = options.text?options.text:$div.text();

	if (options.startIndex>0 && options.length>0){
		sections.push([options.startIndex, options.length]);
	}
	
	if (options.regex){
		
		let regex = options.regex; 
		regex = stringToRegex(regex);
			
		if (regex.global){
			const matches = text.matchAll(regex);
			for (const match of matches) {
				sections.push([match.index,match[0].length]);
				if (options.matchHandler){
					options.matchHandler(match);
				}
			}
		} else {
			const match = text.match(regex);
			if (match){
				sections.push([match.index,match[0].length]);
				if (options.matchHandler){
					options.matchHandler(match);
				}
			}
		}
	}
		
	sections.sort((a, b) => a[0]>b[0]).reverse();
	
	sections.forEach(section=>{
		let startIndex = section[0];
		let endIndex = startIndex+section[1];
		text = text.substring(0, startIndex) 
			+ '<span class="'+options.class+'">'+ text.substring(startIndex,endIndex) + '</span>'
			+ text.substring(endIndex);
	});
	
	if ($div){
		$div.html(text);
	}
	
	options.text = text;
	delete options.startIndex;
	delete options.length;
	
	return options;
	
}

//поверхностное клонирование объекта
//Обычно проще использовать Object.assign({}, o2); или structuredClone(o2);
function cloneObject(source, ...attributes){
	
	let clone = {};
	for (let key in source) {
		if (attributes.length>0){
			if (!attributes.includes(key)){
				continue;
			}
		}
	  clone[key] = source[key];
	}
	return clone;
}





//Находит <template> и клонирует его содержимое
function cloneTemplate(selector){
	
	let $template = $(selector);
	let cont = $template.prop('content');
	if (cont){
		return $(cont).clone();
	}
	return null;
	
}

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
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
}

function parseDate(dateStr) {
  let d=dateStr.substring(0,2);
  let m=dateStr.substring(3,5);
  let y=dateStr.substring(6,10);
  m--;
  let c = new Date(y, m, d, 1, 1); 
  return c;  
}



const defaultGsoOptions = {
	data: null, 
	withNullOption: false, 
	selectedValue: null,
	
	
	valueField: "id",
	contentField: "name",

	//текстом будет значение
	contentIsValue: false,
	
	valueIsIndex: false,
		
	//множественное выделение
	multi: false
}

/**
 * Генерация элемента select с заданными опциями.
 * data - массив с объектами типа {id: 1, name: 'my name'}. 
 * Или массив строк, чисел...
 * withNullOption - включать ли строку с пустым значением.
 * Возвращает jquery объект $select.
 */
//function generateSelect(name, data, withNullOption = true, multi = false, selectedValue = null) {
function generateSelect(name, options) {
	
	//упрощённое объявление
	if (Array.isArray(options)){
		options = {
			data: options
		};
	}
	
	let $select = $(`select[name='${name}']`);
	if ($select.length==0){
		$select = $(`<select name="${name}"></select>`);
	}

	if (options.multi){
		$select.attr("multiple","multiple");
	}
		
	fillSelect($select, options);
	
	return $select;	
}

function fillSelect($select, options) {
	let optionsCode = generateSelectOptions(options); 
	$select.append(optionsCode);
	return $select;	
}

	
	
function generateSelectOptions(options) {

	options = $.extend({}, defaultGsoOptions, options);
	
	
	let optionsCode = options.withNullOption?'<option value="">-</option>':'';
	if (!options.data){
		return optionsCode;
	}
	
	
	
	if (Array.isArray(options.data)){
		options.data.forEach((item, ind)=>{
			
			let name = escapeHTML(item);
			let id = name;
			
			if (options.contentIsValue){
				name = id;
			}
			
			if (options.valueIsIndex){
				id = String(ind);
			}
			
			if (typeof item=="object"){
				id = item[options.valueField];
				name = item[options.contentField];
			}
			
			
			let selectedAttr = '';
			if (options.selectedValue && id==options.selectedValue){
				selectedAttr = ' selected="selected"';
			}
			optionsCode+=`<option value="${id}"${selectedAttr}>${name}</option>`;
		});		
	} else {
		
		//данные заданы объектом. Ключи будут его полями.
		let ind = 0;
		for (let id in options.data) {
		  let name = String(options.data[id]);
		  
		  if (options.contentIsValue){
				name = id;
		  }
		  
		  if (options.valueIsIndex){
		  	id = String(ind++);
		  }
		  
		  let selectedAttr = '';
		  if (options.selectedValue && id==options.selectedValue){
		  	selectedAttr = ' selected="selected"';
		  }
		  optionsCode+=`<option value="${id}"${selectedAttr}>${name}</option>`;
		  
		}//for
		
	}
	
	return optionsCode;
}


function generateBooleanSelect(name, withNullOption = true) {
	let data = [
		{id: "true",name: "Да"},
		{id: "false",name: "Нет"},
	];
	return generateSelect(name,{
		data: data,
		withNullOption: withNullOption
	});
}


function generateDatalist(id, data) {
	
	let $select = $(`datalist[id='${id}']`);
	if ($select.length==0){
		$select = $(`<datalist id="${id}"></select>`);
	}
	fillSelect($select, {
		data: data,
	});
	return $select;	
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

function loadFileAsString(fileUrl){
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", fileUrl, false); // false для синхронного вызова
	xhr.send();

	console.log(`status: ${xhr.status}, statusText: ${xhr.statusText}`);
	if (xhr.status === 200) {
		return xhr.responseText;
	} else {
	  console.log("Ошибка загрузки");
	}
	
};


//загружает html-фрагмент в заданный контейнер ($target) или body (если контейнер не задан)
//использует для этого объект XMLHttpRequest (считается устаревшим способом).
//Загружает синхронно.
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

//загружает html-фрагмент в заданный контейнер ($target) или body (если контейнер не задан)
//использует для этого метод fetch(url).
//Возвращает promise, так что загружать можно синхронно или асинхронно.
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
	if (!$copyDiv){
		$copyDiv = $('<div id="copyDiv" style="height: 0px;"></div>').appendTo(document.body);
	}	
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
	  //вставляем кнопку перед $input
      $input.before($calButton)
    } else {
      $input.after($calButton)
    }

	return $input.parent();
	
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


});





console.log('accord initiated. accordPath=' + accordUtils.accordPath);

