
let a = {};

let result;
let regex;
let textSample;


let textSample2 = "_ОЙ-Ой-ой";
let textSample3 = "  The quick brown fox jumps over the lazy dog. It barked.";
let textSample4 = "then see Chapter 1.2.3.4.5";



function testExpression(text, re){
	textSample = text;
	regex = re;
//	logRegexParams();

	le2("regex");
	
	const matches = textSample.matchAll(regex);
	for (const match of matches) {
		log2("match=",match,", match.index=",match.index);
	}
	
	result = lf2(() => {
	});
	
}



function logRegexParams(){
	le2("textSample");
	le2("regex");
}


//выполняет все основные функции над заданными выражениями
function global_and_local_regexp(text, re){
	textSample = text;
	regex = re;
	
	if (regex.global){
		lc2("использование глобальных regexp");

		logRegexParams();
		
		lc2NL("matchAll(regexp) - возвращает iterator по всем совпадениям regexp (включая группы)");
		lc2("Самый универсальный способ поиска!")
		result = lf2(() => {
			const matches = textSample.matchAll(regex);
			for (const match of matches) {
				log2("match=",match,", match.index=",match.index);
			}
		});


		lc2NL("str.search(regexp) - возвращает позицию первого совпадения или -1, если ничего не найдено.");
		le2("textSample.search(regex)");

		lc2NL("str.match(reg) - возвращает обычный массив из всех совпадений.");
		le2("textSample.match(regex)");

		lc2NL("regexp.test(str) - проверяет, есть ли хоть одно совпадение в строке str.");
		lc2NL("В глобальных выражениях его можно вызвать несколько  раз, при этом он меняет поле lastIndex!");
		le2("regex.test(textSample)");
		le2("regex.lastIndex");
		le2("regex.test(textSample)");
		le2("regex.lastIndex");
		le2("regex.test(textSample)");
		le2("regex.lastIndex");


		lc2NL("regexp.exec(str) - устаревшая версия matchAll.");
		lf2(() => {
			regex.lastIndex = 0;
			while (result = regex.exec(textSample)) {
				log2("result=",result,", result.index=",result.index,", regexp.lastIndex=",regex.lastIndex);
			}
		});

		le2NL("textSample.replace(regex,'A')");				
		
		
	} else {
		lc2NL("использование одинарных regexp");

		logRegexParams();

		le2("textSample.search(regex)");
		
		result = le2("textSample.match(regex)");
		le2NL("result.index");
		
		le2("textSample.replace(regex,'A')");
		
		le2("regex.test(textSample)");
		
		lf2NL(() => {
			result = regex.exec(textSample)
			if (result){
				log2("result=",result,", result.index=",result.index,", regexp.lastIndex=",regex.lastIndex);
			}
		});				
	}

	
}






//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {




/*
		lc2("");
		le2("");
		
*/	

  global_and_local_regexp1: () => {
//		textSample = textSample4;
//		regex = ;
		global_and_local_regexp(textSample4, /(\.\d)(\.\d)/g);
		global_and_local_regexp(textSample4, /(\.\d)(\.\d)/);
	},

	global_and_local_regexp2: () => {
		global_and_local_regexp(textSample2, /ой/gi);
		global_and_local_regexp(textSample2, /ой/i);
	},
	
	
	
	regexp: () => {
		
		
		lc2("поля RegExp:");
		
		textSample = textSample4;
		regex = /(\.\d)(\.\d)/g;
		logRegexParams();
				
				
		le2("regex.flags");
		le2("regex.global");
		le2("regex.ignoreCase");
		le2("regex.multiline");
		le2("regex.source");
		
		lc2("Индекс, с которого надо начать поиск (в методах exec, test)");
		lc2("Это поле меняют методы test, exec!");
		le2("regex.lastIndex");
		le2("regex.test(textSample)");
		le2("regex.lastIndex");

//		le2("regex.lastIndex=20;");
//		le2("textSample.search(regex);");

		
		lc2("RegExp.escape(string) - помогает эскейпить спецсимволы в строке, чтобы использовать её в паттерне");
		lc2("Поддерживается только в новых браузерах!");
		
		lf2NL(() => {
			let ss = RegExp.escape("1.2.");
			regex = new RegExp(ss+"\\d+", "g");
			return textSample.match(regex);
		});
		le2("regex");
		
	},
	

	match_demo: () => {
		
		lc2("str.match(reg)");
		lc2("с флагом g - возвращает обычный массив из всех совпадений.");
		lc2("без флага g - возвращает обычный массив, содержащий первое найденное совпадение и результаты поиска групп (частей в круглых скобках).");
		lc2("При этом результат содержит доп. свойства: index – позиция обнаружения, input - строка по которой вёлся поиск");
//		lc2("Остальные элементы результата содержат результаты поиска групп (частей в круглых скобках)");

		
		let textSample = textSample2;
		logTextSample2(textSample);

//		regex = /(\.\d)(\.\d)/g;
//		logRegexParams();
		
				
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
					log2("match=",match,", match.index=",match.index);
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
					log2("match=",match,", match.index=",match.index);
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
			return textSample.replace(/(\.\d)(\.\d)/g,(str,g1,g2,offset)=>{
				return "["+g2+g1+"]";
			});
			
		});
	},			
	
	test_demo: () => {
		
		lc2("regexp.test(str) - проверяет, есть ли хоть одно совпадение в строке str.");
		lc2("Возвращает true/false. Работает так же, как и проверка str.search(reg) != -1");
		lc2("В глобальных выражениях его можно вызвать несколько  раз, при этом он меняет поле lastIndex!");
		lc2("Довольно бесполезная функция...");

		textSample = textSample4;
		regex = /(\.\d)(\.\d)/g;
		logRegexParams();

		le2("regex.test(textSample)");
		le2("regex.lastIndex");
		le2("regex.test(textSample)");
		le2("regex.lastIndex");
		le2("regex.test(textSample)");
		le2("regex.lastIndex");
		
	},

	
	exec_demo: () => {
		
		lc2("regexp.exec(str) - позволяет искать и все совпадения и группы в них.");
		lc2("Если флага g нет, то regexp.exec(str) ищет и возвращает первое совпадение");
		lc2("Если флаг g есть - возвращает первое совпадение и записывает в regexp.lastIndex позицию, с которой нужно возобновить поиск.");
		lc2("Последующий поиск он начнёт уже с этой позиции. Если совпадений не найдено, то сбрасывает regexp.lastIndex в ноль.");
				
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
			//поиск только первого совпадения			
			regex = /ой/i;
			
			result = regex.exec(textSample)
			if (result){
				log2("result[0]=",result[0],", result.index=",result.index);
			}
		});

		log2NL();		
		lc2("поиск с группами - результат будет содержать так же найденные группы.");
		textSample = textSample4;
		regex = /(\.\d)(\.\d)/;
		logRegexParams();

		le2NL("result = regex.exec(textSample);");
		
		
		le2NL("result.index");
//		le2NL("result.indices");
		
		
		
		
		
	},	
	
	expressions1: () => {
		logTextSample(textSample2);
		testExpression(textSample2, /ой/gi);
	},	
	
	expressions2: () => {
		logTextSample(textSample1);
		lc2("Поиск по файлу 006-demo.js")
		
		testExpression(textSample1, /^.*le2.*$/g);
		testExpression(textSample1, /\(\) *=/g);
		testExpression(textSample1, / *\/\//g);
		
		
		
	},	
	

	
	
	

}




$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();
	
	
	$("#selectors1").val("expressions2").trigger("change");	
	

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
