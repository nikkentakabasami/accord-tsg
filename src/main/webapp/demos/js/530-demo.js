
let a = {};

let textSample1;
let result;
let regex;
let textSample;


let textSample2 = "_ОЙ-Ой-ой";
let textSample3 = "  The quick brown fox jumps over the lazy dog. It barked.";
let textSample4 = "see Chapter 1.2.3.4";



function logRegexParams(){
	le2("textSample");
	le2("regex");
}


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {




/*
		lc2("");
		le2("");
		
*/	

  global_and_local_regexp: () => {

		lc2("использование глобальных regexp");
		
		textSample = textSample2;
		regex = /ой/ig;
		logRegexParams();

		le2("textSample.search(regex)");
		
		le2("textSample.match(regex)");
		
		le2("textSample.replace(regex,'A')");
		
		le2("regex.test(textSample)");
		
		lf2NL(() => {
			while (result = regex.exec(textSample)) {
				log2("result[0]=",result[0],", result.index=",result.index,", regexp.lastIndex=",regex.lastIndex);
			}
		});
		
		result = lf2NL(() => {
			const matches = textSample.matchAll(regex);
			for (const match of matches) {
				log2(`match[0]="${match[0]}", match.index=${match.index}`);
			}
		});		
		
		
		lc2NL("использование одинарных regexp");

		regex = /ой/i;

		logRegexParams();

		le2("textSample.search(regex)");
		
		le2("textSample.match(regex)");
		
		le2("textSample.replace(regex,'A')");
		
		le2("regex.test(textSample)");
		
		lf2NL(() => {
			result = regex.exec(textSample)
			if (result){
				log2("result[0]=",result[0],", result.index=",result.index);
			}
		});
		
		
	},


	match_demo: () => {
		
		lc2("str.match(reg)");
		lc2("с флагом g - возвращает обычный массив из всех совпадений.");
		lc2("без флага g - возвращает обычный массив, содержащий первое найденное совпадение и результаты поиска групп (частей в круглых скобках).");
		lc2("При этом результат содержит доп. свойства: index – позиция обнаружения, input - строка по которой вёлся поиск");
//		lc2("Остальные элементы результата содержат результаты поиска групп (частей в круглых скобках)");

		
		let textSample = textSample2;
		logTextSample2(textSample);
		
		lf2NL(() => {
			//поиск повторяющегося паттерна
			return textSample.match( /ой/ig );
		});
		result = lf2NL(() => {
			return textSample.match( /ой/i );
		});
		le2NL("result.index");
		
		textSample = textSample3;
		logTextSample2(textSample);

		lf2NL(() => {
			//ищем все заглавные буквы
			return textSample.match( /[A-Z]/g );
		});

		result = lf2NL(() => {
			//ищем первую заглавную букву
			return textSample.match( /[A-Z]/ );
		});
		le2NL("result.index");
		le2("result.input");

		
		textSample = "определённо javascript - это такой язык";
		logTextSample2(textSample);

		result = lf2NL(() => {
			//результат поиска групп (частей в круглых скобках) - будет выведен в доп элементах результата поиска
			return textSample.match(/JAVA(SCRIPT)/i);
		});
		le2NL("result.index");
		
		textSample = textSample4;
		logTextSample2(textSample);

		result = lf2NL(() => {
			return textSample.match( /see (chapter \d+(\.\d)*)/gi );
		});
		
		result = lf2NL(() => {
			return textSample.match( /see (chapter \d+(\.\d)*)/i );
		});

		le2NL("result.index");
		le2("result.input");
//		le2("result.groups");
		
	},
	
	
		matchall_demo: () => {
			
			lc2("matchAll(regexp) - возвращает iterator по всем совпадениям regexp (включая группы)");
			lc2("более удобная альтернатива exec. Поддерживает только глобальные выражения!")

			textSample = textSample2;
			regex = /ой/ig;
			logRegexParams();
			
			result = lf2NL(() => {
				const matches = textSample.matchAll(regex);
				for (const match of matches) {
					log2(`match[0]="${match[0]}", match.index=${match.index}, match.length=${match.length}`);
				}
			});
			
			le2NL("Array.from(textSample.matchAll(regex), (m) => m[0]);");
			
			
			
			lc2("Поиск с группами")
			textSample = textSample4;
			regex = /(\.\d)(\.\d)/g;
			logRegexParams();
			
			result = lf2NL(() => {
				const matches = textSample.matchAll(regex);
				for (const match of matches) {
					log2("match",match);
					log2(`match.index=${match.index}`);
				}
			});
			
			
			
		},	
	
	

	replace_demo: () => {
		
		
		lc2("str.replace(reg, str/func) – поиск и замена подстроки");
				
		textSample = textSample4;
		logTextSample2(textSample);

		lc2("без регулярных выражений");
		result = lf2NL(() => {
			return textSample.replace("e","L");
		});

		result = lf2NL(() => {
			return textSample.replaceAll("e","L");
		});
		
		
		result = lf2NL(() => {
			//заменить только первый найденный результат
			return textSample.replace(/\.\d/,"A");
		});
		
		result = lf2NL(() => {
			//заменить все вхождения (делает то же что и replaceAll)
			return textSample.replace(/\.\d/g,"A");
		});

		
		
		
		lc2NL("В строке для замены можно использовать специальные символы:");
		lc2("$&	Вставляет всё найденное совпадение.");
				
		result = lf2NL(() => {
			//окружить все вхождения скобками
			return textSample.replace(/\.\d/g,"($&)");
		});

		lc2NL("$1, $2... - вхождение, соответствующее 1-й, 2-й группе внутри выражения");
		lc2("Это позволяет менять найденные вхождения местами!");
		
		result = lf2NL(() => {
			//поменять первые 2 группы местами
			return textSample.replace(/(\.\d)(\.\d)/g,"($2 $1)");
		});
		
				
	},		
	
	
	replace_demo2: () => {
		

		
		lc2("Замена с использованием функции.");
		lc2("функция получает следующие аргументы:");
		lc2("str 	найденное совпадение,");
		lc2("p1, p2, ..., pn 	содержимое скобок (если есть),");
		lc2("offset 	позиция, на которой найдено совпадение,");
		lc2("s 	исходная строка.");
		lc2("Если скобок в регулярном выражении нет, то у функции всегда будет ровно 3 аргумента: replacer(str, offset, s)");
		
		textSample = textSample2;
		logTextSample2(textSample);

		result = lf2NL(() => {
			//замена функцией - удвоение найденных значений
			return textSample.replace(/ой/gi,(str,offset)=>{
				return str+str;
			});
		});
		
		textSample = textSample4;
		logTextSample2(textSample);

		result = lf2NL(() => {
			//замена групп функцией - меняем группы местами, окружаем скобками
			return textSample.replace(/(\.\d)(\.\d)/,(str,g1,g2,offset)=>{
				return "["+g2+g1+"]";
			});
			
		});
	},			
	
	test_demo: () => {
		
		lc2("regexp.test(str) - проверяет, есть ли хоть одно совпадение в строке str.");
		lc2("Возвращает true/false. Работает так же, как и проверка str.search(reg) != -1");
		lc2("");
		lc2("");
		lc2("");
		
		textSample = textSample2;
		logTextSample2(textSample);
		
		result = lf2NL(() => {
			return /ой/i.test(textSample)
		});
		
	},

	
	exec_demo: () => {
		
		lc2("regexp.exec(str) - позволяет искать и все совпадения и группы в них.");
		lc2("Если флага g нет, то regexp.exec(str) ищет и возвращает первое совпадение");
		lc2("Если флаг g есть - возвращает первое совпадение и записывает в regexp.lastIndex позицию, с которой нужно возобновить поиск.");
		lc2("Последующий поиск он начнёт уже с этой позиции. Если совпадений не найдено, то сбрасывает regexp.lastIndex в ноль.");
		lc2("");
		
		
				
		textSample = textSample2;
		logTextSample2(textSample);
		
		lf2NL(() => {
			//поиск всех совпадений. Поиск должен быть глобальным, иначе возникнет бесконечный цикл.
			regex = /ой/gi;
			while (result = regex.exec(textSample)) {
				log2("result[0]=",result[0],", result.index=",result.index,", regexp.lastIndex=",regex.lastIndex);
			}
		});

		lf2NL(() => {
			//поиск первого совпадения			
			regex = /ой/i;
			
			result = regex.exec(textSample)
			if (result){
				log2("result[0]=",result[0],", result.index=",result.index);
			}
		});
		
		textSample = textSample4;
		logTextSample2(textSample);

		result = lf2NL(() => {
			//поиск с группами - результат будет содержать так же найденные группы.
			regex = /(\.\d)(\.\d)/;
			return result = regex.exec(textSample)
		});
		le2NL("result.index");
//		le2NL("result.indices");
		
		
		
		
		
	},	
	
	
	


	
	
	

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


$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();
	
//	textSample1 = accordUtils.loadFileAsString("../js/006-demo.js");
	
	$("#selectors1").val("matchall_demo").trigger("change");	
	

});



	/*
  search_demo2: () => {

		logTextSample(textSample1);
		
		
		lc2("str.search(regexp) - возвращает позицию первого совпадения или -1, если ничего не найдено.");

//		le2("");
		


		let ind = lf2NL(() => {
			//ищем текст "le2"
			return textSample1.search(/le2/);
		});
		let s = textSample1.substring(ind, ind+20);
		logTextFragment(s);

		
		ind = lf2NL(() => {
			//первая функция
			return textSample1.search(/\(\) *=/);
		});
		s = textSample1.substring(ind, ind+20);
		logTextFragment(s);
		
		ind = lf2NL(() => {
			//первый коммент
			return textSample1.search(/ *\/\//);
		});
		s = textSample1.substring(ind, ind+20);
		logTextFragment(s);
		
		
	},
*/
