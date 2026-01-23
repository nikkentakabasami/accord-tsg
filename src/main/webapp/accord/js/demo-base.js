

let mainJsHref = null;

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




let $log1;
let $logPanel;

function clearLog() {
	$log1.text("");
}

function log(...vals) {
	logMessage(...vals);
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

let showAux = true;
let $hideAuxButton;

$(function() {
	
	$log1 = $('#log1');
	$logPanel = $('.logPanel');
	
//	logMessage("Запуск");
	
	addTitlePanelButtons();
	fixSrcRef();
	
	$hideAuxButton = $("#hideAuxButton"); 
	
	
	if ($log1.parents(".auxPanel:first div").length>=2){
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
	
	
	
	
});



