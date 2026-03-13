

let $log1, $log2, $log3;
let $logPanel;

let autoscrollLog1 = false;
let autoscrollLog2 = true;



//преобразовывает объекты в строки, с форматированием, для вывода в лог
function stringifyObject(o, indent = "", withBraces = false) {

	if (!o){
		return "";
	}
		
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
	if (o instanceof Set){
		o = Array.from(o);		
	}
	if (o instanceof Date){
		return formatDateTime(o);
	}
	
	if (o._isAMomentObject){
		return o.format('DD.MM.YYYY, hh:mm:ss');
	}	
	
	
	if (o instanceof RegExp){
		return String(o);		
	}

	if (t == 'bigint') {
		return String(o);		
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
			} else if (val instanceof Date){
				valStr = formatDateTime(val);
			} else if (t == "function"){
				valStr = "func";
			} else if (Array.isArray(val)){
				valStr = JSON.stringify(val);
			} else if (val instanceof Map || val instanceof Set){
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


//выводит в лог заданное выражение, выполняет его через eval(), выводит в лог результат
function _le($log, exp) {
	if (!exp){
		return;
	}

	//многострочное выражение
	if (exp.includes("\n")){
		let lines = exp.split("\n");
		lines.forEach(line=>{
			_le($log, line);
		});
		return;
	};
	
	exp = exp.trim();
	if (exp.startsWith("//")){
		let codeNode = logMessage($log, exp);
		return;
	}
	
	try {
		let showResult = true;
		let resultAsJson = false;
		
		//если выражение заканчивается ! - результат выводить не нужно
		if (exp.endsWith("!")){
			showResult = false;
			exp = exp.slice(0,-1).trim();
		}
		
		if (exp.endsWith("~")){
			resultAsJson = true;
			exp = exp.slice(0,-1).trim();
		}
		
		
		//выводим в лог выражение
		let codeNode = logMessage($log, exp);
		$(codeNode).wrap(greenSpan);
		
		//вычисляем выражение
		let val = eval(exp);
		if (val!=null && showResult){
			
			if (resultAsJson){
				val = JSON.stringify(val);
			} else if (typeof val === "string") {
				val = '"'+val+'"';
			}
			logMessage($log, " ", val, "\n");
			return val;
		}
	} catch (err) {
	  console.error('Произошла ошибка:', err.message);
	  console.error('Стек вызовов:', err.stack);
		log2('Произошла ошибка:', err.message);
		return;
	}
	
}
function le(exp) {
	return _le($log1, exp)
}
function le2(exp) {
	return _le($log2, exp)
}
function le2nl(exp) {
	log2();
	return _le($log2, exp)
}
function le2NL(exp) {
	return le2nl(exp);
}













function clearLog() {
	$log1.text("");
	$log2.text("");
}
function clearLog1() {
	$log1.text("");
}
function clearLog2() {
	$log2.text("");
}

function log(...vals) {
	logMessage($log1, ...vals);
}
function log2(...vals) {
	logMessage($log2, ...vals);
}
function log3(...vals) {
	logMessage($log3, ...vals);
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
//		val = stringifyObject(val);
		logMessage($log, val);
		return val;
	}
//	logMessage($log);
}
function lf(func) {
	return _lf($log1, func);
}
function lf2(func) {
	return _lf($log2, func);
}
function lf2nl(func) {
	log2();
	return _lf($log2, func);
}
function lf2NL(exp) {
	return lf2nl(exp);
}



//вывод комментов
function lc(comment) {
	log("//"+comment);
}
function lc2(comment) {
	log2("//"+comment);
}
function lc2nl(comment) {
	log2();
	log2("//"+comment);
}
function lc2NL(comment) {
	lc2nl(comment);
}

function la2(href, mess) {
	$log2.append(`<a href="${href}" target="logref">${mess}</a> \n`);
}


function log2nl(...vals) {
	log2();
	log2(...vals);
}
function lognl(...vals) {
	log();
	log(...vals);
}
function log2NL(...vals) {
	log2nl(...vals);
}
function logNL(...vals) {
	lognl(...vals);
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


//Показ функции в логе
function logFunc(f){
	clearLog1();
	log(String(f));
	highlightLogComments1();
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
	

	if (autoscrollLog1 && $log==$log1 || autoscrollLog2 && $log==$log2){
		//scroll to bottom	
		var h = $logPanel.prop('scrollHeight');
		$logPanel.scrollTop(h);	
		
	}



	return lineNode;
}





//выводит в лог фрагент найденного текста
function logTextFragment(text, title="found fragment"){
	
	log2("----------"+(title?title:"")+"------------");
	log2(text);
	log2("----------------------");
	
}

function logTextSample(text, title="textSample"){
	log("----------"+(title?title:"")+"------------");
	log(text);
	log("----------------------");
}
function logTextSample2(text, title="textSample"){
	log2("----------"+(title?title:"")+"------------");
	log2(text);
	log2("----------------------");
}



$(function() {
	
	$log1 = $('#log1');
	$log2 = $('#log2');
	$log3 = $('#log3');
	$logPanel = $('.logPanel');
	
	
});
