/**
 * Разнообразные вспомогательные функции
 * 
 */

export { accordUtils };


let $copyDiv;
let downloadLink3 = null;
let scriptSrc = import.meta.url;
let accordUtils = {
	accordPath: scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/') + 1)
};
window.accordUtils = accordUtils;

/*
let scriptSrc = import.meta.url;
accordUtils.accordPath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/') + 1);
*/



/**
 * Располагает панель с абсолютным позиционированием по центру браузера
 */

accordUtils.alignToCenter = function($panel) {
	let $g = $(window);
	$panel
		.css("top", $g.height() / 2 - $panel.height() / 2)
		.css("left", $g.width() / 2 - $panel.width() / 2);
}

accordUtils.jsonCopy = function(src) {
	return JSON.parse(JSON.stringify(src));
}


let $hiddenContainer = null;
//невидимое хранилище для разных скрытых элементов
accordUtils.getHiddenContainer = function() {

	$hiddenContainer = $("#accHiddenContainer");
	if ($hiddenContainer.length == 0) {
		$hiddenContainer = $('<div id="accHiddenContainer" style="display:none;"/>');
	}

	$hiddenContainer.remove().appendTo("body");
	return $hiddenContainer;

}


// addCssFile('styles.css');
accordUtils.addCssFile = function(filename) {
	let link = document.createElement('link');

	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = filename;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}


//загружает html-фрагмент через XMLHttpRequest. Синхронно
//считается устаревшим способом
accordUtils.loadHtmlFragmentXHR = function(fragmentUrl, $target, relativeToAccord = false) {
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
	}


}

//загружает html-фрагмент через fetch. Возвращает promise
accordUtils.loadHtmlFragmentFetch = async function(fragmentUrl, $target, relativeToAccord = false) {

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




accordUtils.deleteAllCookies = function() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

accordUtils.deleteAllCookiesAndReload = function(event) {
	if (event) {
		event.preventDefault();
	}
	this.deleteAllCookies();
	location.href = location.pathname;
}

accordUtils.copyTextToBuffer = function(textValue) {
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


accordUtils.openDownloadUrl = function(url) {
	if (!downloadLink3) {
		downloadLink3 = document.createElement('a');
	}
	downloadLink3.href = url;
	downloadLink3.click();

}



accordUtils.formToJSON = function($form) {
	var array = $form.serializeArray();
	var json = {};

	array.forEach(field=>{
		
		let val = json[field.name];
		if (val){
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
	addButton: false,
	decorButtonClasses: "acc-btn-calendar",
	placeButtonBefore: true,
	buttonHandler: null
}


accordUtils.decorInput = function($input, options) {

	options = $.extend({},decorInputOptionsDefault,options);	
	
	if (options.addButton){
		
		let buttonClasses = options.decorButtonClasses;
		let $calButton = $(`<button type="button" class="acc-btn acc-btn-icon ${buttonClasses}"></button>`);
		if (options.buttonHandler){
			$calButton.click(options.buttonHandler);
		}
		
		
		$input.wrap( '<div class="acc-button-panel-tight"></div>' );
		if (options.placeButtonBefore){
			$input.before($calButton)
		} else {
			$input.after($calButton)
		}
		
	}

		
}




/*
accordUtils.formToJSON = function($form) {
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

