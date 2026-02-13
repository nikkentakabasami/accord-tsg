

let testString = "  Seishun tte a to iu ma to iu koto.";
let testString2;

let n1, n2;

//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData2 = {

	String: () => {
		
		
		a= {};
		lf2(()=>{
			
			//способы объявления строк
			a.s1 = "моя строка 1";
			a.s2 = 'моя строка 2';
			a.s4 = String ("моя строка 3");
			
			//возвращает объект String, а не примитив!
			a.s5 = new String ("моя строка 3");
			
			
			//String(x) - конвертирует аргумент в строку
			a.s5 = String(22);
			a.s6 = String(false);

			return a;
		});
		
		
		a= {};
		lf2NL(()=>{
			//Переноc строки
			a.s10 = "Hello \n\
				World!";
				
			a.s11 = `Это очень длинная строка,
					которая продолжается на следующей строке.`;
			
			//Обратные кавычки позволяют встраивать выражения в строку, заключая их в ${…}	
			let name = "Иван";
			a.s12 = `Привет, ${name}!`;
			a.s13 = `результат: ${1 + 2}`;
			
			//Экранирование спецсимволов
			a.s14 = "I'm a JavaScript \"programmer\".";

			return a;
		});		
		

		a= {};
		lf2NL(()=>{
			
			
			//  \uNNNN - Символ в кодировке Юникод.
			a.s20 = "\u00A9";
			
			//	\xXX	Символ с шестнадцатеричным юникодным кодом.
			a.s21 = "\x7A";
			
			// \u{X…XXXXXX} Нотация для указания всех возможных символов юникода
			a.s21 = "\u{1F60D}";
			

			//Для указания символов с диакретическими знаками - указывается символ а затем сами знаки.
			a.s22 = "S\u0307";	//символ S и знак "точка сверху"
			a.s23 = "S\u0307\u0323";
			
			return a;
		});

		//			
		lc2NL("String.fromCharCode() - создание строк из кодов UTF-16.");
		lc2("Работает только с кодами в диапазоне от 0 до 65535.");
		lc2("Не поддерживает эмодзи или исторические символы, у которых кодовые точки выше 0xFFFF.");
		le2("String.fromCharCode(189, 43, 190, 61);");
		
		lc2("String.fromCodePoint() - то же что и fromCharCode, но поддерживает значения выше 0xFFFF.");
		le2("String.fromCodePoint(189, 43, 190, 61);");
		le2("String.fromCodePoint(9731, 9733, 9842, 0x2f804)");
		
		

		lc2("str.charCodeAt(pos) - Возвращает код символа на позиции pos");
		le2("testString.charCodeAt(0);");
		le2("testString.codePointAt(0);");
		
		
		le2("");
		le2("");
		
		
	},
	
	String2: () => {
		
		le2("testString;");
		le2("testString.length;");
		
		lc2("str.charAt(ind) - Получение символа по индексу.");
		lc2("В JavaScript нет отдельного типа «символ», так что charAt возвращает строку, состоящую из выбранного символа.");
		lc2("Символ так же можно получить квадратными скобками, как в массиве.");
		le2("testString.charAt(5);");
		le2("testString[5];");

		lc2("str.at(ind) - Аналог charAt, но поддерживает отрицательный индекс.");
		le2("testString.at(-5);");
		
		
				
		le2("testString.toLowerCase();");
		le2("testString.toUpperCase();");
		
		lc2("str.indexOf(searchValue, fromIndex)");
		le2("testString.indexOf('to');");
		
		lc2("str.lastIndexOf(searchValue, fromIndex)");
		le2("testString.lastIndexOf('to');");
		
		le2("testString.substring(5,10);");
		
		
		lc2("str.slice(start, end) - аналог substring, но удобнее.");
		lc2("Отличие: Отрицательные значения отсчитываются от конца строки (-1 - последний символ)");
		le2("testString.slice(-5);  //5 последних символов");
		le2("testString.slice(1,-1);  //убрать первый и последний символы");
		
		
		le2("testString.replace('to','AA');");
		le2("testString.replaceAll('to','AA');");
		le2("testString.replace(/to/g,'AA');	//Чтобы заменить все значения - можно использовать регулярные выражения");
		
		lc2("str.match(re) - поиск регулярным выражением. Возвращает массив найденных значений");
		le2("testString.match(/(?<= )\\w+/g);  //слова, перед которыми пробел");
		
		lc2("str.split(separator, limit) - разбиение строки");
		le2("testString.split(' ',3);");
		
		lc2("str.concat(...o) - склеивание строк");
		le2("'ae'.concat(true,'-',66);");
		
		le2("testString.trim();");
		le2("testString.trimEnd();");
		le2("testString.trimStart();");
		
		
		
		lc2("str.toWellFormed() - устраняет некорректные последовательности символов Unicode");
		testString2 = "Hello World \uD800";
		le2("testString2;");
		le2("testString2.isWellFormed();");
		le2("testString2 = testString2.toWellFormed();");
		le2("testString2.isWellFormed();");
				
		
		lc2("padStart(targetLength, padString) - дополнят строку до нужной длины повтором заданной строки");
		le2("testString.padStart(40,'*');");
		le2("testString.padEnd(40,'*#');");
		le2("'hello_'.repeat(5);");

		
				
	},
	
	Number_declaration: () => {
		a= {};
		
		lf2NL(()=>{
			
			//Все числа имеют один и тот же тип, и занимают 64 бита (double precision)
			a.n1=34.00;
			a.n2=34
			a.n3=123e5;    	// 12300000
			a.n4=123e-5;  	// 0.00123

			//Можно использовать символ _ в качестве разделителя:
			a.n5=1_000_000_000;
			
			a.n10=0o377;     		//octal 255
			a.n11=0xFF;     			//hexadecimal 255
			a.n12 = 0b11111111; // бинарная форма 255

			return a;			
		});

		lc2NL('new Number() - возвращает объект Number, а не примитив');
		le2('n1 = new Number("123");');
		le2('n1 === 123;');
		le2('n1 instanceof Number;');
		le2('typeof n1');
		
		lc2('функция Number - конвертирует значение в число-примитив');
		le2('n2 = Number("123");');
		le2('n2 === 123;');
		le2('n2 instanceof Number;');
		le2('typeof n2');
		
		le2('Number(true);');
		le2('Number(false);');
		le2('Number(new Date());');
		le2('Number("10 20");');
		
		
		lc2('Функции на числе можно вызывать тремя способами:');
		le2('Number(123).toString();');
		le2('(123).toString();');
		le2('123..toString();');


	},	
	
	
	Number_format: () => {
		

		lc2('--------Функции преобразования в число.---------');
		
		
		lc2('num.toString(radix) - Преобразование числа в строку в заданной системе исчисления (2-36)');
		le2('255..toString()');
		le2('255..toString(16)');
		le2('255..toString(2)');
		le2('255..toString(36)');
		
				
		lc2('num.toFixed(digits) - округляет число до заданного числа чисел после точки');
		le2('(3.2489).toFixed(2);');

		lc2('num.toPrecision(precision) - округляет число до заданного числа чисел');
		le2('(0.004).toPrecision(4);');
		le2('(60.1234).toPrecision(4);');

		lc2('num.toExponential(digits) - округляет число и записывает его в экпоненциальной нотации');
		le2('n1 = 9056.65612;');
		le2('n1.toExponential(2);');
		le2('n1.toExponential(4);');
		le2('n1.toExponential(6);');
		
		
		lc2('num.toLocaleString(locales, options) - форматирует строку, используя настройки локализации');
		le2('n1.toLocaleString()');
		le2('n1.toLocaleString("ru-RU", {style:"percent"})');
		le2('n1.toLocaleString("en-US", {style:"currency", currency:"USD"})');
				
		


		
		
	},	
	
	
	Number_nan_infinity: () => {
		
		le2(`
			
			//Существуют специальные числовые значения: Infinity (бесконечность) и NaN (ошибка вычислений).
			Number.parseFloat("нечисло");
			NaN;
			NaN==NaN;
			0/0;
			Number.isNaN(0/0);
			Number.isNaN(Infinity);
			
			1/0;
			-1/0;
			1e500;
			Infinity;
			Infinity+5;
			Infinity > 12345;
			Number.isFinite(1/0);
			Number.isFinite(NaN);
			
			//проверка на корректное числовое значение
			n1=12.34;
			!isNaN(parseFloat(n1)) && isFinite(n1);
		`);		
		
	},	
	
	
	Number_parse: () => {
		

		le2(`
			//Number.parseInt(string, radix) - парсит строку и возвращает целое число
			//глобальная функция parseInt(string, radix) - её алиас
			Number.parseInt("10");
			Number.parseInt("10.00");
			Number.parseInt("10.33");
			Number.parseInt("34 45 66");
			Number.parseInt(" 60 ");
			Number.parseInt("40 years");
			Number.parseInt("He was 40");
			
			parseInt("10", 10);
			parseInt("010");
			parseInt("10", 8);
			parseInt("0x10");
			parseInt("10", 16);
			
			parseInt("11000", 2);
		`);
		le2(`
			//Number.parseFloat(string) - парсит число с плавающей точкой
			//глобальная функция parseFloat(string) - её алиас
			Number.parseFloat(10);
			Number.parseFloat("10");
			Number.parseFloat("10.33");
			Number.parseFloat("34 45 66");
			Number.parseFloat("He was 40");
			parseFloat("40.00");
			parseFloat(" 40 ");
			parseFloat("40 years");
			parseFloat("40H")
			parseFloat("H40");
			Number.parseFloat("нечисло");
			
		`);
		
		},	
		
		Number_misc: () => {
			
			le2(`
				//Неточные вычисления
				0.1 + 0.2;
				9999999999999999;

				//Причина в том, что число 0.1 в двоичной системе счисления - бесконечная дробь, 
				//Двоичное значение бесконечных дробей хранится только определённого знака 
				(0.1).toFixed(20);
				//Чтобы отсечь ошибку, достаточно округления до 10-го знака
				+(0.1).toFixed(10);
			`);
			
		},	
		
		
			
			


	
	
}



$(() => {
  initDemoCodeSelect("#selectors2", selectorsData2);
	$("#selectors2").val("Number_parse").trigger("change");

});






