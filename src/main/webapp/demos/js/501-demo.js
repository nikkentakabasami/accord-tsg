
let a = {};
let d1, m1, m2;

let result;


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

	Date: () => {
		a = {};
		
		lf2NL(()=>{
			//Создание Date
			
			//текущая дата
			d1 = new Date();
			a.d1 = new Date();
			
			//new Date(year, month, day, hours, minutes, seconds, milliseconds)
			a.d2 = new Date(2014, 11, 31, 12, 30, 0);	//31.12.2014 12:30:00
			a.d3 = new Date(2011, 0, 1, 0, 0, 0, 0); 	//01.01.2011  (январь - нулевой месяц)
			a.d4 = new Date(2011, 0, 1); 							//то же самое
			a.d7 = new Date(2011, 0, 32); 						//Автоисправление - 1 февраля 2011!
			
			//new Date(milliseconds)
			a.d5 = new Date(1241777298123);				//milliseconds since 1970/01/01
			
			//new Date(dateString)
			a.d6 = new Date("May 21, 1958 10:15 AM");
			a.d8 = new Date("2020-05-12T23:50:21.817Z");		//json формат

			//копирование
			a.copyDate1 = new Date(d1);
			a.copyDate2 = new Date(d1.getTime());			
			
			return a;
		});
//		le2("a")

		lc2NL("Получение компонентов даты");
		
		le2("d1.getFullYear();");
		
		le2("d1.getMonth();  //Месяц (0..11)");
		
		le2("d1.getDate();	//Число месяца (1..)");
		
		le2("d1.getDay();	//номер дня в неделе (0- воскресенье, 6 - суббота)");
		
		le2("d1.getTime();	//число миллисекунд, прошедших с 1 января 1970");
		
		le2("d1.getHours();");
		le2("d1.getMinutes();");
		le2("d1.getSeconds();");
		le2("d1.getMilliseconds();");
		
		
		le2("d1.getTimezoneOffset();	//Возвращает разницу между местным и UTC-временем, в минутах.");
		
		le2("a.d1>a.d2;  //сравнение дат");
		
		
		lf2NL(()=>{
			//Установка компонентов даты
			
			d1.setFullYear(2015,0,5);
			d1.setMonth(2);
			d1.setDate(100);
					
			//setHours(hour [, min, sec, ms])
			d1.setHours(1,2,3,4);
					
			d1.setMinutes(0);
			d1.setSeconds(0);
			d1.setMilliseconds(0);
					
			d1.setTime(1433754206311);			
		});



		
	},	
		
	Date_format: () => {
		
		lc2NL("Форматирование вручную");		
		log2(String(formatDate));

		le2("formatDate(new Date());");
		le2("formatTime(new Date());");
		
		lc2NL("Форматирование через moment.js");		
		log2(String(formatDateTimeMoment));
		
//		le2("formatDateTimeMoment(new Date());");

				
		lc2NL("Парсинг вручную");		
		log2NL(String(parseDate));

		le2("parseDate('05.07.2007');");
		
		
		
	},	
	
	moment_create: () => {
	
		lc2("Создание moment");		
	
		le2("m1 = moment();	//получение текущей даты");
		
		lc2("задание даты строкой в формате ISO 8601");		
		le2('moment("2013-02-08");');
		le2('moment("2013-02");');
		le2('moment("2013-039");');
		le2('moment("20130208");');
		le2('moment("2013");');
		le2('moment("2013-02-08 09:30");');
		le2('moment("2013-02-08 09:30:26");');
		le2('moment("2013-02-08 09:30:26.123");');
	
	
		lc2("задание даты строкой в формате RFC 2822");		
		le2('moment("6 Mar 17 21:22 UT");');
		le2('moment("6 Mar 2017 21:22:23 GMT");');
		
		lc2("задание даты строкой в заданном формате");		
		le2('moment("12-25-1995", "MM-DD-YYYY");');
		le2('moment("12/25/1995", "MM-DD-YYYY");');
		le2('moment("24 12 2019 09:15:00", "DD MM YYYY hh:mm:ss", true);');
		le2('moment("19.12.2025, 11:48:52", "DD.MM.YYYY, hh:mm:ss");');
		le2('moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);	//можно задать несколько форматов');
		
		lc2("задание даты объектом");		
		le2('moment({ hour:15, minute:10 });');
		le2('moment({ y    :2010, M     :3, d   :5, h    :15, m      :10, s      :3, ms          :123});');
		le2('moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123});');
		
		lc2("задание даты массивом в формате [year, month, day, hour, minute, second, millisecond]");		
		le2('moment([2010, 1, 14, 15, 25, 50, 125]);');
		
		lc2("клонирование");		
		le2('moment(m1);');
		le2('m1.clone();');
	
		
	},	
	
	moment_misc: () => {
		
		m1 = moment();
		m2 = moment("2013-02-08");
		
		
		lc2('связь с Date');
		le2('moment(new Date());  //задание даты объектом Date');
		le2('m1.toDate();	// Получаем объект Date');
		
		le2('m1.format();	//показ локального времени');
		le2('m1.utc().format();	//переключение в формат UTC (всемирное время)');
		le2('m1.format("DD.MM.YYYY, hh:mm:ss");	//форматирование времени своим форматом');
		le2('m1.calendar();	//форматирует время так, чтобы показывать его относительно заданной даты');
		le2('m1.valueOf();	//вывод миллисекунд прошедших с Unix Epoch');
		
		
		lc2("получение частей даты");		
		le2('m1.year();');
		le2('m1.month();');
		le2('m1.date();');
		le2('m1.hour();');
		le2('m1.minute();');
		le2('m1.second();');
		le2('m1.millisecond();');
		le2('m1.day();   //dayOfWeek');
		le2('m1.dayOfYear();');
		
		
		lc2("задание частей даты");
		le2('m1.year(2025).month(2).date(11).hour(2);');
		
		le2('m1');
		
		lc2("задание частей даты методом set");
		le2('m1.set("year", 2013).set("month", 1);');
		
		lc2("модификация даты");
		le2('m1.subtract(10, "day").add(1, "year");');
		
		
		lc2("сравнение дат");		
		le2('moment.max(m1, m2);');
		le2('moment.min(m1, m2);');
		
		
	},	

	
}




function formatDateTimeMoment(date) {
	var m = moment(date);
	return m.format('DD.MM.YYYY, hh:mm:ss');
}



function parseDate(dateStr) {
  let d=dateStr.substring(0,2);
  let m=dateStr.substring(3,5);
  let y=dateStr.substring(6,10);
  m--;
  let c = new Date(y, m, d); 
  return c;  
}



$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

//	$("#selectors1").val("moment_misc").trigger("change");

});






