


let $selectors;
let $selectors2;

let $btn;
let boldTag = "<b></b>";
let testHtmlSnippet = "<b>appended text</b>";
let greenBorderDivSnippet = '<div class="green-border"></div>';





let selectorsData = [

	//все кнопки
	".workPanel button",
		
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

	//Соответствует всем элементам input, select, button
	".workPanel :input",

	//
	".workPanel :hidden",


	
	
];

let selectorsData2 = [
	
	//-------------фильтрация-------------
	
	//первый/последний выбранный элемент. Возвращается один элемент!
	".A>*:first, .C *:last",

	//выбранный элемент с индексом 1	
	".A *:eq(1)",

	//выбранный элемент с индексом больше/меньше 1
	".A>*:gt(1), .B>*:lt(1)",

	//выбранный элемент с чётным/нечётным индексом	
	".A>*:even, .B>*:odd",

	//элементы которые являются  первыми/последними дочерними объектами у родителей.
	//Может вернуть несколько элементов
	".A *:first-child, .C *:last-child",

	//элементы с заданными дочерними индексами. Индекс начинается с 1.
	".A *:nth-child(1), .B *:nth-child(2)",
	
	//элементы которые являются  единственными дочками у родителей.
	".workPanel *:only-child",

	//:not - отфильтровывает все элементы с заданным селектором
	".A *:not(.c1):not(.c3)",

	//Соответствует всем заголовкам, например h1, h2, h3 и так далее.
	":header",

	//все элементы которые содержат заданный текст (на любой глубине)
	".workPanel *:contains('butto')",	
	
	//элементы, не содержащие дочерних элементов (текста в том числе)
	".workPanel *:empty",
	
	//элементы, которые являются родителем
	".workPanel *:parent",
	
	//элементы, содержащие потомка с классом c3
	".workPanel *:has('.c3')",

	//элементы, содержащие скрытые элементы
	".workPanel *:has('*:hidden')",
	".A",	
];

let selectorsData3 = [
	
	//Возвращает прямого “родителя” элемента. 
	'$(".workPanel .c3").parent()',
	
	//найти все элементы c1, найти их родителей, выбрать только тех из них, которые имеют класс c3
	'$(".workPanel .c1").parent(".c3")',
	
	//Поиск по селектору среди предков.
	'$(".workPanel .c3").parents(".A")',
	
	//Поиск по селектору среди предков.
	//Похоже на parents, но включает в поиск текущий элемент, и возвращает не больше одного элемента
	//Тут - вернёт только текущий элемент (набор не изменится)
	'$(".C .c3 .c3 .c3").closest(".c3")',
	
	//Возвращает ближайшего позиционированного предка (предка с атрибутом position)
	'$(".workPanel .c3").offsetParent()',
	
	//	Поиск по селектору среди предков до элемента с заданным селектором (не включая его)
	'$(".C .c3").parentsUntil(".workPanel")',
	
	//Ищет элементы-потомки, которые удовлетворяют указанному выражению.
	'$(".A").find(".c2")',
	
	//Ищет дочерние элементы, которые удовлетворяют указанному выражению.
	'$(".A").children(".c2")',
	'$(".A").contents()',
	
	//Поиск всех дочерних элементов (включая текстовые и комменты)
	//в данном случае выделит жирным даже текст с пробелами
	'$(".A").contents().filter(function(){return this.nodeType !== 1;}).wrap(boldTag)',
	
	//элементы до и после	
	'$(".A>.c2").next()',
	'$(".A>.c2").prev()',
	'$(".A>.c2").nextAll()',
	'$(".A>.c2").prevAll()',
	'$(".A>.c2").siblings()',
	
	
		
];

let selectorsData4 = [
	
	'$(".A>*").first()',
	'$(".A>*").last()',
	'$(".A>*").eq(3)',
	'$(".A>*").slice(1,3)',
	
	'$(".A>*").filter(".c2")',
	'$(".A>*").not(".c2")',
	
		
	//элементы, содержащие дочерний элемент с классом c3
	'$(".A>*").has(".c2")',
	
	
	
];

//основные методы и атрибуты
let selectorsData5 = [
	

	
	//число элементов в объекте jQuery.
	'$(".A>*").length',
	
	//возвращает true, если хотя бы один элемент соответствует выражению.
	'$(".A>*").is(".c2")',
	  
	//порядковый номер элемента среди своих сиблингов
	//вернёт 1
	'$(".A>.c2").index()',
	
	//порядковый номер элемента среди заданного набора элементов
	'$("#tc4").index(".A>.c4>*")',
	'$("#tc4").index(".A>.c4>*:odd")',
	
	//порядковый номер заданного объекта среди текущего набора
	'$(".A>.c4>*").index($("#tc4"))',	//3
	'$(".A *").index($("#tc4"))',		//7
	
	//массив элементов DOM.
	'$(".A>*").get()',
	
	//элемент DOM по индексу
	'$(".A>*").get(1)',
	
	//Селектор, определяющий селектор первоначально переданный в jQuery().
//	'$(".A>*").filter(".c2").selector',
//	'$(".A>*").filter(".c2").context',

	//end() - Возврат к оригинальному селектору
	'$(".A>*").filter(".c2").wrap(boldTag).end()',
	
	//each - Выполняет функцию для каждого элемента набора.	
	'$(".A>.c4>*").each((ind,el)=>{log(ind,el.id)})',
	
	//map -	Преобразование элементов. Возвращает jquery-объект, содержащий преобразованные элементы
	//получение списка id элементов в виде строки
	'$(".A>.c4>*").map((ind,el)=>el.id).get().join()',
	
	//объединение элементов
	'$(".A>.c3").add(".B>.c2")',
	'$(".A>.c3").add($(".B>.c2"))',  //то же самое
	
	
];



//attr,prop,text,html,val
let selectorsData6 = [
	'$(".A>.c2").attr("title")',
	'$(".A>.c2").attr("title","my new title")',
	'$(".A>.c2").removeAttr("title")',

	//	Методы prop почти всегда могут заменить attr. Предпочтительнее использовать их.
	'$(".A>.c2").prop("title")',
	
	'$(".A>.c2").prop("title","my new title")',
	'$(".B>button").prop("disabled",true)',
	'$(".B>#vehicle").prop("checked",false)',
	'$(".B>button").prop({disabled: true, title: "new title"})',
		
	//возвращает строку, содержащую HTML (innerHTML) первого элемента в наборе (его содержимое)
	'$(".A>.c4").html()',
	
	//возвращает строку, содержащую HTML элемента
	'$(".A>.c4").prop("outerHTML");',	
	
	//совмещённое текстовое содержание всех элементов в наборе (включая их потомков)
	'$(".A>.c4").text()',

	//задание текстового содержимого
	'$(".A>.c2").text("my new text")',
	'$(".A>.c1").text($(".A>.c4").html())',
	
	//задание html содержимого
	'$(".A>.c2").html("my new text")',
	'$(".A>.c1").html($(".A>.c4").html())',
		
	//возвращает содержимое атрибута value для первого элемента ввода в наборе.
	'$(".B>input:checkbox").val()',
	
	'$(".B>input:checkbox").val("train").val()',
	

	//Позволяет сохранять в элементе любые данные (и позже получать их обратно)
	'$(".A>.c1").data()',
	'$(".A>.c1").data("f1")',
	'$(".A>.c1").data("f1","new data").data()',
	
	//Удаляет данные заданные через data()
	//Не удаляет данные, заданые атрибутами.
	'$(".A>.c1").removeData("f1").data()',
	
	//Удаляет данные заданные через атрибуты
	'$(".A>.c1").removeAttr("data-f1").data()',
	

];

//css, classes
let selectorsData7 = [
	'$("#tc2").css("background-color")',
	'$("#tc2").css("background-color", "red")',

	//получение классов элемента
	'$("#tc2").attr("class")',	
		
	'$("#tc2").addClass("bg-red")',
	'$("#tc2").toggleClass("bg-red")',
	
	//Возвращает true, если хотя бы один из набора совпавших элементов обладает указанным классом.
	'$("#tc2").hasClass("bg-red")',
	'$(".A").removeClass("A")',
];



//положение, размеры
let selectorsData8 = [
	
	//размеры внутренней области элемента (не включают в себя border и padding)
	'[$btn.width(), $btn.height()]',

	//внутренние размеры (исключая border, но включая padding)
	'[$btn.innerWidth(), $btn.innerHeight()]',

	//outerHeight( includeMargin = false)
	//внешние размеры (включая padding, border и опционально margin)
	'[$btn.outerWidth(), $btn.outerHeight()]',

	//позиция первого элемента относительно документа
	'$btn.offset()',

	//позиция первого элемента относительно родителя
	'$btn.position()',
	
	//задание размеров	
	'$btn.width(100).height(100)',
	'$btn.innerWidth(100).innerHeight(100)',
	'$btn.outerWidth(100).outerHeight(100)',

	
	//внешние размеры (без учёта margin) и положение относительно документа
	//те же цифры что и $btn.offset(),  [$btn.outerWidth(), $btn.outerHeight()]
	'$btn.get(0).getBoundingClientRect()',
	
];


//dom manipulation
let selectorsData9 = [
	
	//--------вставка внутрь--------
	
	//вставляет код/кнопку внутрь панели А, возвращает панель А
	'$(".A").append(testHtmlSnippet)',
	'$(".A").append($btn)',

	//вставляет кнопку внутрь панели А (в начало), возвращает панель А
	'$(".A").prepend($btn)',
	
	//вставляет код/кнопку внутрь панели А, возвращает панель А
	'$(testHtmlSnippet).appendTo(".A")',
	'$(".B>.c1").appendTo(".A")',
	
	'$(".B>.c1").prependTo(".A")',
	
	//--------вставка снаружи--------
	
	//вставляет кнопку после панели А, возвращает панель А
	'$(".A").after($btn)',
	
	//вставляет кнопку до панели А, возвращает панель А
	'$(".A").before($btn)',
	
	//вставляет кнопку после панели А, возвращает кнопку
	'$btn.insertAfter(".A")',
	
	//вставляет кнопку до панели А, возвращает кнопку
	'$btn.insertBefore(".A")',

	//--------обёртывание--------
		
	//Заключает каждый элемент в наборе в конструкцию HTML.
	//Если задать контейнер через селектор - контейнер будет клонирован
	'$btn.wrap(greenBorderDivSnippet)',
	'$btn.wrap(".A>.c1")',
	
	'$(".A>*:lt(3)").wrap(greenBorderDivSnippet)',
	
	//Заключает все элементы в наборе в единственную конструкцию HTML.
	'$(".A>*:lt(3)").wrapAll(greenBorderDivSnippet)',
	
	//Заключает содержимое каждого элемента в наборе в конструкцию HTML.
	'$(".workPanel>*").wrapInner(greenBorderDivSnippet)',

	//--------Замена--------
	
	//Производит замену всех элементов элементами HTML или DOM. 
	'$(".workPanel>*").replaceWith(testHtmlSnippet)',

	//то же что и replaceWith, но инвертировано: код слева будет заменять элементы справа
	'$(testHtmlSnippet).replaceAll(".workPanel>*")',
	'$btn.replaceAll(".workPanel>*")',

	//--------Удаление--------
		
	//Удаляет содержимое из каждого элемента в наборе
	'$(".workPanel>*").empty()',
	
	//Удаляет все совпавшие элементы из DOM (и все обработчики событий).
	//НЕ удаляет элементы из объекта jQuery, позволяя Вам воспользоваться ими позже.
	'$btn.remove()',
	'$btn.remove().appendTo(".A")',
		
	//--------Копирование--------
	
	'$btn.clone().appendTo(".A")',
			
];
//
let selectorsData10 = {
	
	
	each: ()=>{
		$(".A").contents().each(function(){
			log("nodeType",this.nodeType);
			log("textContent",this.textContent);
		});
				
	},
	
	filter: ()=>{
		
		//выделяем жирным текстовые узлы с текстом
		$(".A").contents().filter(function(){
			return (this.nodeType==3) && (this.textContent.trim().length);
		}).wrap(boldTag);

		
				
	}
	
	
};




function initSelect(selector, data){
	
	let $sel = $(selector);
	$sel.change(e=>{
		let v = $sel.children("option:selected").text();
		$selectorText.val(v);
		currentFunc = null;
	});
	
	accordUtils.fillSelect($sel,{
		data: data,
		withNullOption: true,
		selectedValue: null,
		valueIsIndex: true
	});	
	
}


$(()=>{
	
	beforeHighlight = ()=>{
		$btn = $(".B>button.c5");
	}
	
	
	$workPanel = $(".workPanel");
	
	initSelect("#selectors", selectorsData);
	initSelect("#selectors2", selectorsData2);
	initSelect("#selectors3", selectorsData3);
	initSelect("#selectors4", selectorsData4);
	initSelect("#selectors5", selectorsData5);
	initSelect("#selectors6", selectorsData6);
	initSelect("#selectors7", selectorsData7);
	initSelect("#selectors8", selectorsData8);
	initSelect("#selectors9", selectorsData9);
//	initSelect("#selectors10", selectorsData10);
	initDemoCodeSelect("#selectors10", selectorsData10);

	reloadSandbox();
	
		
});



