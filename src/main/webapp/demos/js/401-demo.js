


let $workPanel;
let $selectors;
let $selectors2;
let $selectorText;


let selectorsData = [
	
	//одновременно имеет классы acc-btn и c5
	".workPanel button.acc-btn.c5",
	
	//имеет класс c1, находится внутри div.А
	".A .c1",

	//имеет класс c1, находится непосредственно внутри div.А
	".A>.c1",
	
	//все элементы внутри div.А
	".A *",
	
	//все дочерние элементы div.А
	".A>*",
		
	//объединение двух селекторов
	".A .c1, .B>.c1",
	
	//элемент стоящий после div.c1
	".A>.c1 + *",
	
	//все элементы стоящие после div.c2 (но имеющие того же родителя)
	".A>.c2 ~ *",

	//-----------------по атрибутам--------------------------
	
	//поиск по наличию атрибута
	".A *[title]",
		
	//поиск по значению атрибута. Значение можно задавать и без скобок.
	".A>div[title='c1_title'], .B *[title=c3_title]",

	//значение атрибута начинается со значения
	".workPanel *[title^='c1']",

	//значение атрибута заканчивается значением
	".workPanel *[title$='le']",
	
	//значение атрибута содержит значение
	".workPanel *[title*='2']",
	
	//с заданием двух условий по атрибутам
	".A>*[title*=1][id=ac1]",


	
];

let selectorsData2 = [
	
	//-------------фильтрация-------------
	
	//первый/последний выбранный элемент. Возвращается один элемент!
	".A>*:first, .B *:last",

	//выбранный элемент с индексом 1	
	".A *:eq(1)",

	//выбранный элемент с индексом больше/меньше 1
	".A>*:gt(1), .B>*:lt(1)",

	//выбранный элемент с чётным/нечётным индексом	
	".A>*:even, .B>*:odd",

	//элементы которые являются  первыми/последними дочерними объектами у родителей.
	//Может вернуть несколько элементов
	".A>*:first-child, .B *:last-child",

	//элементы с заданными дочерними индексами. Индекс начинается с 1.
	".A>*:nth-child(1), .B *:nth-child(2)",
	
	//элементы которые являются  единственными дочками у родителей.
	".workPanel *:only-child",

	//:not - отфильтровывает все элементы с заданным селектором
	".A>*:not(.c1):not(.c3)",

	//Соответствует всем заголовкам, например h1, h2, h3 и так далее.
	":header",

	".workPanel *:contains('c1')",	
	
	//элементы, не содержащие дочерних элементов (текста в том числе)
	".workPanel *:empty",
	
	//элементы, которые являются родителем
	".workPanel *:parent",
	
	//элементы, содержащие дочерний элемент с классом c3
	".workPanel *:has('.c3')",

	//элементы, содержащие скрытые элементы
	".workPanel *:has('*:hidden')",
	".A",	
];

let boldTag = "<b></b>";
let selectorsData3 = [
	
	//Возвращает прямого “родителя” элемента. 
	'$(".workPanel .c3").parent()',
	
	//найти все элементы c1, найти их родителей, выбрать только тех из них, которые имеют класс c3
	'$(".workPanel .c1").parent(".c3")',
	
	//Поиск по селектору среди предков.
	'$(".workPanel .c3").parents(".A")',
	
	//Возвращает ближайшего позиционированного предка (предка с атрибутом position)
	'$(".workPanel .c3").offsetParent()',
	
	//	Поиск по селектору среди предков до элемента с заданным селектором (не включая его)
	'$(".C .c3").parentsUntil(".workPanel")',
	
	//объединение объектов
	'$(".A>.c3").add(".B>.c2")',
	'$(".A>.c3").add($(".B>.c2"))',  //то же самое
	
	//Ищет элементы-потомки, которые удовлетворяют указанному выражению.
	'$(".A").find(".c2")',
	
	//Ищет дочерние элементы, которые удовлетворяют указанному выражению.
	'$(".A").children(".c2")',
	'$(".A").contents()',
	
	//Поиск всех дочерних элементов (включая текстовые и комменты)
	'$(".A").contents().filter(function(){return this.nodeType !== 1;}).wrap(boldTag)',
	
	//элементы до и после	
	'$(".A>.c2").next()',
	'$(".A>.c2").prev()',
	'$(".A>.c2").nextAll()',
	'$(".A>.c2").prevAll()',
	'$(".A>.c2").siblings()',
	
	
	
	//порядковый номер первого элемента в наборе
	'$(".A>.c2").index()',

		
	
		
];


function reloadSandbox(){
	
	$workPanel.empty();
	
	let $sandboxPanels = accordUtils.cloneTemplate("#template1");
	
	//добавляем атрибут title
	for(let i=0;i<5;i++){
		$sandboxPanels.find(`.c${i}`).attr("title",`c${i}_title`);
		$sandboxPanels.find(`.A .c${i}`).attr("id",`ac${i}`);
		$sandboxPanels.find(`.B .c${i}`).attr("id",`bc${i}`);
	}

	/*	
	$sandboxPanels.find(".c1").attr("title","c1_title");
	$sandboxPanels.find(".c2").attr("title","c2_title");
	$sandboxPanels.find(".c3").attr("title","c3_title");
	$sandboxPanels.find(".c3").attr("title","c3_title");
	*/
	
	
	$sandboxPanels.appendTo($workPanel);
	
	
	
	
//	accordUtils.cloneTemplate("");
	
	
}

//выделяет объекты с заданным селектором красной рамкой
function highlight(val){
	reloadSandbox();
	if (!val){
		return;
	}
	
	clearLog();
	if (val.indexOf("$")>=0){
		
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


/*
function hlExpression(expr){
	reloadSandbox();
	if (!expr){
		return;
	}
	
	$val = eval(expr); 
	if (!val.jquery){
		throw new Error('Выражение должно возвращать jquery-объект!');
	}
	
	val.addClass("red-border");
}
*/


//eval('$(".c1")').addClass("red-border");;


function initSelect(selector, data){
	
	let $sel = $(selector);
	$sel.change(e=>{
//		let v = $sel.val();
		let v = $sel.children("option:selected").text();
		$selectorText.val(v);
	});
	accordUtils.fillSelect($sel,data,true,null,true);
	
}


$(()=>{
	
	$workPanel = $(".workPanel");
	$selectorText =$("#selectorText");
	
	initSelect("#selectors", selectorsData);
	initSelect("#selectors2", selectorsData2);
	
	initSelect("#selectors3", selectorsData3);
	
	/*
	let $sel = $("#traverseSelect");
	$sel.change(e=>{
		let v = $sel.val();
		$selectorText.val(v);
	});
	accordUtils.fillSelect($sel,data,true);
	*/
	
	
	
	/*
	$selectors = $("#selectors");
	$selectors2 = $("#selectors2");
	
	$selectors.change(e=>{
		let v = $selectors.val();
		$selectorText.val(v);
	});
	$selectors2.change(e=>{
		let v = $selectors2.val();
		$selectorText.val(v);
	});
	
	accordUtils.fillSelect($selectors,selectorsData,true);
	accordUtils.fillSelect($selectors2,selectorsData2,true);
	*/
	
	$("#b1").click(e=>{
		let v = $selectorText.val();
		
		highlight(v);
	});
	

	reloadSandbox();
	
		
});



