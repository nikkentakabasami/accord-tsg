

let testString = "  Seishun tte a to iu ma to iu koto.";
let testString2;

let n1, n2, n3, n4;

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

			
			//backslash escape character - Экранирование спецсимволов
			a.s10= 'It\'s alright.\\';
			
			a.s11 = "I'm a JavaScript \"programmer\".";
						
			//escape sequences
			a.s12= "\n-New Line,\r-Carriage Return,\t-tab";

			//Переноc строки
			a.s13 = "Hello \n\
				World!";
						
			return a;
		});
		
		
		a= {};
		lf2NL(()=>{

			//Template Strings - обратные кавычки.
			//позволяют встраивать выражения в строку, заключая их в ${…}
			//позволяют выполнять перенос строк (multiline string), использовать любые кавычки
			a.s11 = `Это очень длинная строка,
					которая продолжается на следующей строке.`;
			
			let name = "Иван";
			a.s12 = `Привет, ${name}!`;
			a.s13 = `результат: ${1 + 2}`;
			

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

		
		le2(`
			//String.fromCharCode() - создание строк из кодов UTF-16.
			//Работает только с кодами в диапазоне от 0 до 65535.
			//Не поддерживает эмодзи или исторические символы, у которых кодовые точки выше 0xFFFF.
			String.fromCharCode(189, 43, 190, 61);

			//String.fromCodePoint() - то же что и fromCharCode, но поддерживает значения выше 0xFFFF.
			String.fromCodePoint(189, 43, 190, 61);
			String.fromCodePoint(9731, 9733, 9842, 0x2f804)

			//str.charCodeAt(pos) - Возвращает код символа на позиции pos (0-65535)
			testString.charCodeAt(0);

			//str.codePointAt(pos) - Возвращает полный код символа на позиции.
			//Этот код может стостоять из двух суррогатных пар
			testString.codePointAt(0);			
		`);
		
	},
	
	String2: () => {
		
	le2(`
		testString;
		testString.length;
				
		//str.charAt(ind) - Получение символа по индексу.
		//В JavaScript нет отдельного типа «символ», так что charAt возвращает строку, состоящую из выбранного символа.
		//Символ так же можно получить квадратными скобками, как в массиве.
		testString.charAt(5);
		testString[5];

		//str.at(ind) - Аналог charAt, но поддерживает отрицательный индекс.
		testString.at(-5);
						
		testString.toLowerCase();
		testString.toUpperCase();
				
		//str.indexOf(searchValue, fromIndex)
		testString.indexOf('to');
				
		//str.lastIndexOf(searchValue, fromIndex)
		testString.lastIndexOf('to');
				
		testString.substring(5,10);
				
		//str.slice(start, end) - аналог substring, но удобнее.
		//Отличие: Отрицательные значения отсчитываются от конца строки (-1 - последний символ)
		testString.slice(-5);  //5 последних символов
		testString.slice(1,-1);  //убрать первый и последний символы
				
		testString.replace('to','AA');
		testString.replaceAll('to','AA');
		testString.replace(/to/g,'AA');	//Чтобы заменить все значения - можно использовать регулярные выражения
				
		//str.match(re) - поиск регулярным выражением. Возвращает массив найденных значений
		testString.match(/(?<= )\\w+/g);  //слова, перед которыми пробел
				
		//str.split(separator, limit) - разбиение строки
		testString.split(' ',3);
				
		//str.concat(...o) - склеивание строк
		'ae'.concat(true,'-',66);
				
		testString.trim();
		testString.trimEnd();
		testString.trimStart();
				
		//str.toWellFormed() - устраняет некорректные последовательности символов Unicode
		testString2 = "Hello World \uD800";
		testString2;
		testString2.isWellFormed();
		testString2 = testString2.toWellFormed();
		testString2.isWellFormed();
				
		//padStart(targetLength, padString), padEnd(...) - дополнят строку до нужной длины повтором заданной строки
		testString.padStart(40,'*');
		testString.padEnd(40,'*#');
		'hello_'.repeat(5);
		
	`);
		
				
	},
	
	Number_declaration: () => {
		
		le2(`
			//Все числа имеют один и тот же тип, и занимают 64 бита (double precision)
			n1=34.00;
			n1=34;
			n1=123e5;		//экспоненциальный формат
			n1=123e-5;
			//Можно использовать символ _ в качестве разделителя:
			n1=1_000_000_000;

			n1=0o377;     		//octal
			n1=0xFF;     			//hexadecimal
			n1 = 0b11111111;  //binary
			
		`);
		le2(`
			//new Number() - возвращает объект Number, а не примитив
			n1 = new Number("123");
			n1 === 123;
			n1 == 123;
			n1 instanceof Number;
			typeof n1;

			//функция Number - конвертирует значение в число-примитив
			n2 = Number("123");
			n2 === 123;
			n2 instanceof Number;
			typeof n2

			Number(true);
			Number(false);
			Number(new Date());
			Number("10 20");
			
	`);
	},
	
	Number_parse: () => {

		le2(`
			//--------Парсинг строки в число.---------
			
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
			
			//преобразование строки в число унарным плюсом (лаконичный способ)
			testString2 = "22";
			n1 = +testString2;
			+"3.14";
			+"-100"
			+" "
			+"abc"
		`);
		
	},
		
	
	
	Number_format: () => {

		le2(`
			//Функции на числе можно вызывать тремя способами:
			Number(123).toString();
			(123).toString();
			123..toString();
			
			//--------Форматирование числа в строку.---------
								
			//num.toString(radix) - Преобразование числа в строку в заданной системе исчисления (2-36)
			255..toString();
			255..toString(16);
			255..toString(2);
			255..toString(36);
							
			//num.toFixed(digits) - округляет число до заданного числа чисел после точки
			(3.2489).toFixed(2);

			//num.toPrecision(precision) - округляет число до заданного числа чисел
			(0.004).toPrecision(4);
			(60.1234).toPrecision(4);

			//num.toExponential(digits) - округляет число и записывает его в экпоненциальной нотации
			n1 = 9056.65612;
			n1.toExponential(2);
			n1.toExponential(4);
			n1.toExponential(6);
					
					
			//num.toLocaleString(locales, options) - форматирует строку, используя настройки локализации
			n1.toLocaleString();
			n1.toLocaleString("ru-RU", {style:"percent"})
			n1.toLocaleString("en-US", {style:"currency", currency:"USD"})
		`);
		
		
	},	
	
	
	Number_nan_infinity: () => {
		
		le2(`
			//Специальное числовое значение: NaN (ошибка вычислений).
			Number.parseFloat("нечисло");
			Number.NaN;
			NaN;
			NaN==NaN;
			0/0;
			Number.isNaN(0/0);
			Number.isNaN(Infinity);
			
			//Специальное числовое значение: Infinity (бесконечность)
			1/0;
			-1/0;
			1e500;
			Infinity;
			Infinity+5;
			Infinity > 12345;
			Number.POSITIVE_INFINITY;
			Number.NEGATIVE_INFINITY;
			
			
			Number.isFinite(1/0);
			Number.isFinite(NaN);
			
			//проверка на корректное числовое значение
			n1=12.34;
			!isNaN(parseFloat(n1)) && isFinite(n1);
		`);		
		
	},	
		
	Number_misc: () => {
		
		le2(`
			//Неточные вычисления
			0.1 + 0.2;
			9999999999999999;

			//Причина в том, что число 0.1 в двоичной системе счисления - бесконечная дробь, 
			//Двоичное значение бесконечных дробей хранится только до 15 знака 
			(0.1).toFixed(20);
			//Чтобы отсечь ошибку, достаточно округления до 10-го знака
			+(0.1).toFixed(10);
			
			//difference between the smallest floating point number greater than 1 and 1
			Number.EPSILON;

			//числа за пределами этих пределов - теряют в точности
			Number.MAX_SAFE_INTEGER;
			Number.MIN_SAFE_INTEGER;								
			
							
			//самое большое и малое возможно число в js
			Number.MAX_VALUE;
			Number.MIN_VALUE;
			
			
			
			//Number.isInteger() - returns true if a value is an integer of the datatype Number.
			Number.isInteger(4-2);
			Number.isInteger(4/2);
			Number.isInteger(5-2);
			Number.isInteger(5/2);
		`);
		
	},	
		
	BigInt: () => {
	le2(`
		
		//Способы создания BigInt
		n1 = 9007199254740995n;
		n2 = BigInt("9007199254740995");
		
		typeof n1;
		
		//можно записать в 2, 8, 16-ричных нотациях
		n1 = 256n;
		n2 = 0o400n;
		n3 = 0x100n;
		n4 = 0b100000000n;		
		
		
		//BigInt supports standard JavaScript arithmetic operators.
		n1*n2;
		
		//арифметические операции между BigInt и Number не разрешены
		//n1*5;

		//для них нужно конвертировать BigInt в Number
		Number(n1)*5;
				
		//поддерживают битовые операции
		n1 = 5n; // 0101
		n2 = 3n; // 0011

		(n1 & n2); //0001
		(n1 | n2); //0111
		(n1 ^ n2); //0110
		(~n1);     //1010
		
		n1 = 10n; // binary: 1010
		(n1 << 2n); //101000
		(n1 >> 1n); //0101		
		
		
	`);
	},	
		
	Math: () => {
	le2(`
		n1 = 3.4451;
		
		//константы
		Math.E;
		Math.PI;
		Math.SQRT2;
			
		//округление
		Math.round(4.9);
		Math.round(4.2);
		
		//округление вверх
		Math.ceil(4.9);
		Math.ceil(4.2);
		Math.ceil(-4.2);		
	
		//округление вниз
		Math.floor(4.9);
		Math.floor(4.2);
		Math.floor(-4.2);		
		
		//получение целой части числа
		Math.trunc(4.9);
		Math.trunc(4.2);
		Math.trunc(-4.2);		
		
		//округление до заданного знака
		Math.round(Math.PI*100)/100;
	
		//Math.random() - Возвращает случайное число от 0 до 1 (не включая 1)
		Math.random();
		Math.floor(Math.random()*11);	//число до 11
		
	
		//E^x
		Math.exp(3);
			
	
		Math.sin(0);
		Math.sin(Math.PI/6);
		Math.sin(Math.PI/2);
		Math.sin(Math.PI);	
		
		Math.cos(0);
		Math.cos(Math.PI/6);
		Math.cos(Math.PI/2);
		Math.cos(Math.PI);	
	
		
		//Math.pow(x, y) returns x^y
	  Math.pow(0, 1);
	  Math.pow(3, 2);
	  Math.pow(-3, 3);

		Math.sqrt(64);
		
		//положительное значение
		Math.abs(-4.7);
		
		
		
		Math.min(0, 150, 30, 20, -8, -200);
		Math.max(0, 150, 30, 20, -8, -200);
		
		
		
		//натуральный логарифм
		Math.log(Math.E);
		Math.log(10);
		Math.log(20);
		
		//десятичный логарифм
		Math.log10(2);
		Math.log10(10);
		Math.log10(100);
		
		//логарифм по заданному основанию
		Math.log(8)/Math.log(2);
		Math.log(90)/Math.log(3);
		
		
	`);
	},	
			
			


	
	
}



$(() => {
  initDemoCodeSelect("#selectors2", selectorsData2);
	$("#selectors2").val("Math").trigger("change");

});






