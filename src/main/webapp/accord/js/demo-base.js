

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


/*
<div class="titlePanel">
  <h2>AccModalDialog - получение содержимого по ссылке</h2>
  <button id="hideAuxButton" type="button" class="acc-btn">Скрыть описание</button>
  <a href="#" target="source">Исходники</a>
</div>

*/

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
//		centered: true,
//		width: "450px",
//		height: "300px",
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





function clearLog() {
	$log1.text("");
	$log2.text("");
}

function log(...vals) {
	logMessage(...vals);
}

function log2(...vals) {
	logMessage2(...vals);
}


function logNL() {
	logMessage("");
}


function logVal(key, val, ...vals) {
	//вывод массивов
//	if (Array.isArray(val)){
//		val = JSON.stringify(val);
//	}
	val = stringifyObject(val);
	
	logMessage(key+": "+val, ...vals);
}

function logObject(o, ...attributes) {
	
	if (attributes.length>0){
		o = accordUtils.cloneObject(o, ...attributes);
	}
	
	let s = stringifyObject(o);
	log(s);
	
}




function logMessage(...vals) {
	
	let line = vals.map(v=>stringifyObject(v)).join(" ");

	line = line+"\n";
	
	//чтобы избавиться от спецсимволов
	line = document.createTextNode(line)

	$log1.append(line);

	//scroll to bottom	
	var h = $logPanel.prop('scrollHeight');
	$logPanel.scrollTop(h);	

}

function logMessage2(...vals) {
	
	let line = vals.map(v=>stringifyObject(v)).join(" ");

	line = line+"\n";
	
	//чтобы избавиться от спецсимволов
	line = document.createTextNode(line)

	$log2.append(line);


}


/*

	let $sel = $(selector);
	$sel.change(e=>{
//		let v = $sel.val();
		let v = $sel.children("option:selected").text();
		$selectorText.val(v);
	});
//	accordUtils.fillSelect($sel,data,true,null,true);
	
	accordUtils.fillSelect($sel,{
		data: data,
		withNullOption: true,
		selectedValue: null,
		valueIsIndex: true
	});	*/

function initDemoCodeSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
	clearLog();
	
	let v = $sel.val();
	currentFunc = data[v];
	
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

function execDemoFunc(func) {
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



$(function() {
	
	$workPanel = $(".workPanel");
	$log1 = $('#log1');
	$log2 = $('#log2');
	$logPanel = $('.logPanel');
	$selectorText =$("#selectorText");
	
	
//	logMessage("Запуск");
	
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



