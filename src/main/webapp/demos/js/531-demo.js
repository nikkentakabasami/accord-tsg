


let textSample1;
let regex;



let textSampleData = {
	
	sample1: `ЛюдовикXV, ЛюдовикXVI, ЛюдовикXVIII,
	ЛюдовикV, ЛюдовикVI, ЛюдовикVIII, ЛюдовикLXVII, ЛюдовикXXL
	aaa aaa
	Сергей Иванов, Игорь Иванов
	text_before satori text_after
	1 индейка стоит 30€
	1 индейка стоит $50
	----`,
	
	sample2_demojs: ""
	
	
}





//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = [

	//слова из русских символов
	"/[а-яё]+/gi",
	
	//слова из символов и чисел
	"/[а-яё\\w]+/gi",
	
	//Просмотр вперёд и назад
	"/(?<=text_before).+(?=text_after)/g",
	
	//Просмотр вперёд
	"/Людовик(?=X)/g",
	"/Людовик(?!X)/g",
	
	//Просмотр вперёд и назад (lookahead, lookbehind)
	"/(?<=Людовик).+?(?=,)/g",
	
	//Просмотр назад
	"/(?<=Сергей )[а-яё]+/gi",
	
	//Просмотр вперёд - имена у Ивановых
	"/[а-яё]+(?= Иванов)/gi",

	//перечисление
	"/Иго|Ива/g",

	//пробелы в начале строки			
	"/^\\s+/gm",
	
	//жадная квантификация: +
	"/сергей.+иванов/gi",
	
	//ленивая квантификация: +?
	"/сергей.+?иванов/gi",
	
	//строки, которые не содержат заданное слово
	//Последовательность двух частей: 
	//1)подстрока нулевой длины, которая находится в начале строки, после которой идёт ".*индейка".
	//2)подстрока равная всей строке: ".*"
	"/^(?!.*индейка).*$/gim",
	
	//цена в евро
	"/\\d+(?=€)/g",

	//цена в евро, использование группы, чтобы заодно искать знаки евро
	"/\\d+(?=(€))/g",
	
	//числа, после которых не стоит €
	"/\\d+(?!€|\\d)/g",
	
	//ищет число, при условии, что за ним идёт пробел, и где-то впереди есть 30
	"/\\d+(?=\\s)(?=.*30)/g",
	
	//цена в долларах
	"/(?<=\\$)\\d+/g",
	
	//числа, перед которыми не стоит $
	"/(?<!\\$|\\d)\\d+/g",
	
	
	//Поиск на границе слова
	"/\\ba/gi",
	"/a\\b/gi",
		
	//Поиск не на границе слова
	"/\\Ba\\B/gi",
	
			
];

let selectorsData2 = [
	//выделить комменты
	"/^.*\\/\\/.*/gm",

	//Просмотр назад
	//содержимое комметов
	"/(?<=\\/\\/).*/gm",

		
	//квантификатор
	//пробелы когда их 5 и более
	"/\\s{5,}/gm",

	//строки начинаются с let
	"/^let.*/gm",	

	//строки, которые кончаются на ;
	"/.*;$/gm",

	//группы
	//обращения к полям объекта a
	"/(a)\\.(\\w+)/gm",	

	//Просмотр вперёд и назад
	//ищем содержимое функций le2
	"/(?<=le2\\(\").+(?=\"\\))/gm",	

	//Просмотр вперёд - переменные после трёх точек
	"/(?<=\\.\\.\\.)\\w+/gm",
	
	//Поиск на границе слова
	"/\\bre/g",
	
	//Поиск не на границе слова
	"/\\Bre/g",
	
			
];



function testExpression(re){
	$log1.text(currentFunc);
	
	regex = accordUtils.stringToRegex(re);
	
//	logRegexParams();

	//копируем текст в буфер обмена
//	accordUtils.copyTextToBuffer(currentFunc);		

	le2("regex");
	
	let opts = accordUtils.highlightText({
		$div: $log1,
		regex: re,
		class: "bg-green",
		matchHandler: match=>{
			log2("match=",match,", match.index=",match.index);
		}
	});
	
	
}




function initRegexSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
		let v = $sel.children("option:selected").text();
		$("#regexText").val(v);
  });
  
  let opts =   {
  	data: data,
  	withNullOption: true,
  	selectedValue: null,
  	contentIsValue: false,
		valueIsIndex: true
  };
  
  accordUtils.fillSelect($sel, opts);

}




$(() => {
	textSampleData.sample2_demojs = accordUtils.loadFileAsString("../js/006-demo.js");
	
//	textSample1 = accordUtils.loadFileAsString("../js/006-demo.js");
//	logTextSample(textSample1);
	
	initDemoCodeSelect("#selectors1", textSampleData);
	
  initRegexSelect("#regexps", selectorsData1);
	initRegexSelect("#regexps2", selectorsData2);

	$("#selectors1").val("sample1").trigger("change");
	$("#regexps").val("0").trigger("change");
	
	
	$("#bTestRegex").click(e => {
		$log2.text("");
		let v = $("#regexText").val();
		
		testExpression(v);
		
		});	
	
	

		
	
  reloadSandbox();

});



