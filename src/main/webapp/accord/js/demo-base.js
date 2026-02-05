

let mainJsHref = null;

let $workPanel;

let showAux = true;
let $hideAuxButton;
let $selectorText;

let currentFunc = null;

//элементы песочницы
let $btn1, $btn2, $inp1, $inp2, $inp3, $inp4, $testBtn1, $testBtn2;
let formDiv1, formDiv2;
let form1, form2;

let $panel1, $panel2;


let $log1;
let $log2;
let $logPanel;

let greenSpan = '<span class="green"></span>';


function findMainJs(){
	
	const scripts = document.querySelectorAll('script[src]');

	
	const jsFiles = Array.from(scripts).forEach(script => {
		let src = script.src;
		if (!src.endsWith("-demo.js")){
			return;
		}
		mainJsHref = src;
//		let ind = src.lastIndexOf("/");	
//		result = src.substring(ind+1);
	});

	console.log("mainJs="+mainJsHref);	
	return mainJsHref;
}

function fixSrcRef(){

	let src = findMainJs();
	if (!src){
		console.log("mainJs not found!");
		return;
	}
	
	$(".titlePanel a").attr("href",src);

}

function addTitlePanelButtons(){
	
	let $tp = $(".titlePanel");
	
	if (!$tp.children("#hideAuxButton").length){
		$tp.append('<button id="hideAuxButton" type="button" class="acc-btn">Скрыть описание</button>');
	}

	if (!$tp.children("a").length){
		$tp.append('<a href="#" target="source">Исходники</a>');
	}		
	
	
	
}


function showMainJs(){
	let  options = {
		draggable: false,
		contentTextUrl: mainJsHref,
		hideOnDblclick: true,
		fullScreen: true,
		cssClass: "help-panel",
		panelExtraClasses: "acc-popup"
	}	
	let p1 = new AccPopup(options);
	p1.show();
}


//преобразовывает объекты в строки, с форматированием, для вывода в лог
function stringifyObject(o, indent = "", withBraces = false) {
	
	let t = (typeof o);
	if (t=="string" || t=="number" || t=="boolean"){
		return o;
	}
	
	//dom-объект
	if (o instanceof Element){
		return o.outerHTML;
	}
	
	let result = "";
	
	if (o instanceof Map){
		o = Array.from(o);		
	}
	
	if ( (t == 'object') && (!Array.isArray(o)) ) {
		
		if (withBraces){
			result = indent+"{";
		}
		
		let first = true;
		for (let key in o) {
			let val = o[key];
			
			let valStr;
			
			let t = (typeof val);
			
			if (val instanceof Element){
				valStr = val.tagName+"#"+val.id;
			} else if (t == "function"){
				valStr = "func";
			} else if (Array.isArray(val)){
				valStr = JSON.stringify(val);
			} else if (val instanceof Map){
				valStr = stringifyObject(val);
			} else if (t == "object"){
				valStr = String(val);
			} else {
				valStr = stringifyObject(val, "  ", withBraces);
			}
			
			if (!first){
				result+="\n";
			}
			
			result+= indent+key + ": " + valStr;
			first=false;
		}
		if (withBraces){
			result = result+"\n"+ indent+"}";
		}
		
	} else {
		result = JSON.stringify(o);
	}
	return result;	
}



//убирает лишние отступы в коде
function removeOddIndent(code){
	
	let lines = code.split("\n")
	if (lines.length==1){
		return code.trim();
	}
	
	lines = lines.map(line=>line.replaceAll("\t","  "));

	//убираем пустые строки в начале	
	while(lines.length>0 && lines[0].trim().length==0){
		lines.shift();
	}

	//убираем пустые строки в конце	
	while(lines.length>0 && lines[lines.length-1].trim().length==0){
		lines.pop();
	}
	
		
	let minIndent = 0;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		
//		line = line.replaceAll("\t","  ");
//		lines[i] = line;
		
		if (line.trim().length==0){
			continue;
		}
		
		let r = line.match( /^ +/i );
		if (r){
			
			let indent = r[0].length;
			if (!minIndent){
				minIndent = indent;
				continue;
			}
			if (indent<minIndent){
				minIndent = indent;
			}
		}
	}  

	if (minIndent){
		lines = lines.map(line=>line.substring(minIndent));
	}

	return lines.join("\n");
	
}

//возвращает код заданной функции.
//убирает её объявление, убирает лишние отступы
function trimFuncCode(func){
	let code = String(func);

	let ind1 = code.indexOf("{");
	let ind2 = code.lastIndexOf("}");
	code = code.substring(ind1+1, ind2);
	code = removeOddIndent(code);
	return  code;
}


function clearLog() {
	$log1.text("");
	$log2.text("");
}

function log(...vals) {
	logMessage($log1, ...vals);
}
function log2(...vals) {
	logMessage($log2, ...vals);
}

//выводит в лог заданное выражение, выполняет его через eval(), выводит в лог результат
function _le($log, exp) {
	if (!exp){
		return;
	}

	try {
		let val = eval(exp);
	} catch (err) {
	  console.error('Произошла ошибка:', err.message);
	  console.error('Стек вызовов:', err.stack);
		log2('Произошла ошибка:', err.message);
		return;
	}
	
	let codeNode = logMessage($log, exp);
	$(codeNode).wrap(greenSpan);
	if (val!=null){
		logMessage($log, " ", val, "\n");
	}
}
function le(exp) {
	return _le($log1, exp)
}
function le2(exp) {
	return _le($log2, exp)
}
function le2NL(exp) {
	log2();
	return _le($log2, exp)
}


//выводит в лог код заданной функции, выполняет её, выводит в лог результат функции
function _lf($log, func) {
	let code = trimFuncCode(func);
//	let codeNode = logMessage($log, code+"\n");
	let codeNode = logMessage($log, code);
	//выделяем код зелёным
	$(codeNode).wrap(greenSpan);
	
	let val = func();
	if (val!=null){
		val = stringifyObject(val);
		logMessage($log, val);  //+"\n"
	}
//	logMessage($log);
}
function lf(func) {
	return _lf($log1, func);
}
function lf2(func) {
	return _lf($log2, func);
}
function lf2NL(func) {
	log2();
	return _lf($log2, func);
}


//вывод комментов
function lc(comment) {
	log("//"+comment);
}
function lc2(comment) {
	log2("//"+comment);
}
function lc2NL(comment) {
	log2();
	log2("//"+comment);
}



function log2NL(...vals) {
	log2();
	log2(...vals);
}
function logNL(...vals) {
	log();
	log(...vals);
}


function logVal(key, val, ...vals) {
	val = stringifyObject(val);
	log(key+": "+val, ...vals);
}
function logVal2(key, val, ...vals) {
	val = stringifyObject(val);
	log2(key+": "+val, ...vals);
}
function logVal2NL(key, val, ...vals) {
	log2();
	logVal2(key, val, ...vals);
}

//выводит в лог только указанные атрибуты объекта
function logObject(o, ...attributes) {
	if (attributes.length>0){
		o = accordUtils.cloneObject(o, ...attributes);
	}
	let s = stringifyObject(o);
	log(s);
}



function logMessage($log, ...vals) {
	
	let line = vals.map(v=>stringifyObject(v)).join(" ");
	
//	$(line).wrap(greenSpan);
	
	line = line+"\n";
	
	//чтобы избавиться от спецсимволов
	let lineNode = document.createTextNode(line)

	
	$log.append(lineNode);

//	$log.append('<div class="green">'+line+'</div>');
//	$(lineNode).wrap(greenSpan);
	
	//scroll to bottom	
	var h = $logPanel.prop('scrollHeight');
	$logPanel.scrollTop(h);	

	return lineNode;
}

function highlightLogComments1(){
	highlightLogComments($log1);
}
function highlightLogComments2(){
	highlightLogComments($log2);
}
	function highlightLogComments($log){
	
	const text = $log.html();
	const lines = text.split('\n');

	const processedLines = lines.map(line => {
		let ind = line.indexOf('//');
		if (ind>=0) {
			return line.substring(0, ind) + '<span class="gray">' + line.substring(ind) + '</span>';
		} else {
		  return line;
		}
	});

	let newText = processedLines.join('\n');
	
	$log.html(newText);
}


function initDemoCodeSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
	clearLog();
	
	let v = $sel.val();

	if (Array.isArray(data)){
//		reloadSandbox();
		let v = $sel.children("option:selected").text();
		$selectorText.val(v);
		currentFunc = null;
		log(v);
	} else {
		$selectorText.val(v);
		currentFunc = data[v];
//		let funcCode = String(currentFunc);
		let code = trimFuncCode(currentFunc);
		
		log(code);
	}	
	
  });
  
  
  let opts =   {
  	data: data,
  	withNullOption: true,
  	selectedValue: null,
  	contentIsValue: true,
	valueIsIndex: false
    };

	if (Array.isArray(data)){
		opts.valueIsIndex = true;
		opts.contentIsValue = false;
	}
  
  accordUtils.fillSelect($sel, opts);

}

function execDemoFunc(func) {
  if (!func) {
	return;
  }

  $(".workPanel *").removeClass("red-border");


  clearLog();
  let code = trimFuncCode(func);
  log(code);
	
	let result = null;
	try {
		result = func();
		
		let logMess = '\nexecuted. ';
		if (result && result.jquery) {
			result.addClass("red-border");
			logMess += "elements found: " + result.length;
		}
		log(logMess);
		
	} catch (error) {
	  log("Error:", error.message);
		console.error(error.stack);
	}	

	highlightLogComments1();
	highlightLogComments2();
	
}


let reloadSandboxVars = function(){
	
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

  $panel1 = $("#formDiv1");
  $panel2 = $("#formDiv2");
  
  
  if (reloadSandboxVars){
	reloadSandboxVars();
  }
  

}


//let emptyDiv = $("<div></div>");
//let defaultStyles = window.getComputedStyle(emptyDiv.get(0));

let showCssStylesDefaultOptions = {
	showInContent: false,
	showInPrevSibling: false
}

function showCssStylesForElements(selector, opt){
	
	let options = $.extend({}, showCssStylesDefaultOptions, opt);
	
	
	$(selector).each((index, el) => {
		let $el = $(el);
		let styleText = $(el).attr("style"); 
		if (!styleText){
			return;
		}
		let infoPanelSelector = $el.data("show-style-in");
		if (infoPanelSelector){
			$("#"+infoPanelSelector).text(styleText);
		}
		if (options.showInContent){
			$el.text(styleText);
		}
		if (options.showInPrevSibling){
			$el.prevAll(":header:first").text(styleText);
		}
	});
	
}

function showStyleTagText(){
	
	
	$(":header[data-style-element]").each((index, el) => {
		let $el = $(el);
		let styleElement = $(el).data("style-element");

		let styleText = $("#"+styleElement).text();
				
		$el.text(styleText)
	});

	
	//	$("#style1").text()
	
}






/*
function getStylesString(el, styleNames, defaultEl){
	
	const styles = window.getComputedStyle(el);
	const defaultStyles = window.getComputedStyle(defaultEl);
	
	
	let result = styleNames.map(sn=>{
		let style = styles[sn];

		if (defaultStyles){
			let defStyle = defaultStyles[sn];
			if (style==defStyle){
				return null;
			}
		}		
		return sn+": "+styles[sn]
		
	}).filter(el=>el!=null).join(", ");
	return result;
}


function showStyleAttrForElements(selector, styleNames, defaultElSelector){
	
	let elements = $(selector);
	let defaultEl = defaultElSelector?$(defaultElSelector).get(0):null;
	
	$(selector).each((index, el) => {
		let s = getStylesString(el, styleNames, defaultEl);
		if (s){
			$(el).attr("title",s);
		}
	});
	
}
*/

let beforeHighlight = null;


//выделяет объекты с заданным селектором красной рамкой
//выводит в лог значение выражения (или число найденных элементов)
function highlight(val){
	reloadSandbox();
	if (!val){
		return;
	}

	if (beforeHighlight){
		beforeHighlight();
	}
	
		
	clearLog();
	log(val);
	if (val.indexOf("$")>=0 && val.indexOf("$=")<0){
		
		val = eval(val); 
		if (!val.jquery){
			log(val);
			return;
//			throw new Error('Выражение должно возвращать jquery-объект!');
		}
		
	} else {
		val = $(val); 
	}
	
	val.addClass("red-border");
	
	logVal("elements found",val.length);
	
}



$(function() {
	
	$workPanel = $(".workPanel");
	$log1 = $('#log1');
	$log2 = $('#log2');
	$logPanel = $('.logPanel');
	$selectorText =$("#selectorText");
	
	
//	log("Запуск");
	
	addTitlePanelButtons();
	fixSrcRef();
	
	$hideAuxButton = $("#hideAuxButton"); 
	
	
	if ($log1.parents(".auxPanel").children().length>=2){
		new AccSplitter({
			panelSelector: ".auxPanel",
			startLeftPanelWidth: 600
		});
	}	
	
	
	
	//показывать исходники при нажатии на ссылку
	$(".titlePanel a").click(e=>{
		e.preventDefault();
		showMainJs();
	});
	
	$hideAuxButton.click(e => {
		
		showAux = !showAux;
		if (showAux){
			$("div.auxPanel").css("display","flex");
			$hideAuxButton.text("скрыть описание");
		} else {
			$("div.auxPanel").css("display","none");
			$hideAuxButton.text("показать описание");
		}
		
		
	});
	
	
	let tp = new TabbedPanel("#tabbedPanel1");
	
	
	
	$("#bExecute").click(e => {
		if (!currentFunc) {
			let v = $selectorText.val();
			highlight(v);
		  return;
		}
		execDemoFunc(currentFunc);
	});

	$("#bClearLog").click(e => {
	clearLog();
	});	
	
	$("#bReload").click(e => {
		reloadSandbox();
	});
	
	
	
});



