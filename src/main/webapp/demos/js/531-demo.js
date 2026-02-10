


let textSample1;
let regex;








//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = [

	//Просмотр вперёд и назад
	"/(?<=text_before).+(?=text_after)/g",
	
	//Просмотр вперёд
	"/Людовик(?=XVI)/g",
	"/Людовик(?!XVI)/g",
	
	//Просмотр вперёд и назад
	"/(?<=Людовик).+?(?=,)/g",
	
	//Просмотр назад
	"/(?<=Сергей )Иванов/g",
	"/(?<!Сергей )Иванов/g",
	
	//Просмотр вперёд - имена у Ивановых
	"/[а-яА-Я]+(?= Иванов)/g",


	//перечисление
	"/Иго|Ива/g",

	//пробелы в начале строки			
	"/^\\s+/gm",
	
	//жадная квантификация
	"/Людо.+(?=V)/g",
	
	//ленивая квантификация
	"/Людо.+?(?=V)/g",
	
	
	
	
	

			
];

let selectorsData2 = [
	//выделить комменты
	"/^.*\\/\\/.*/gm",

	//Просмотр назад
	//содержимое комметов
	"/(?<=\\/\\/).*/gm",

		
	//квантификатор
	//выделить пробелы когда их 5 и более
	"/\\s{5,}/gm",

	//строки начинаются с let
	"/^let.*/gm",	

	//строки кончаются на });
	"/.*\\}\\)\\;$/gm",

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

let textSampleData = {
	
	sample1: `ЛюдовикXV, ЛюдовикXVI, ЛюдовикXVIII, ЛюдовикLXVII, ЛюдовикXXL
	ЛюдовикXV, ЛюдовикXVI, ЛюдовикXVIII, ЛюдовикLXVII, ЛюдовикXXL
	Сергей Иванов, Игорь Иванов
	text_before текст, окружённый двумя токенами. text_after
		
	`,
	
	sample2_demojs: ""
	
	
}


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



