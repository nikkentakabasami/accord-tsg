

function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
}

function formatDateTime(date) {
	var m = moment(date);
	return m.format('DD.MM.YYYY, hh:mm:ss');
}





function parseDate(dateStr) {
  let d=dateStr.substring(0,2);
  let m=dateStr.substring(3,5);
  let y=dateStr.substring(6,10);
  m--;
  let c = new Date(y, m, d, 1, 1); 
  return c;  
}


let $desc1;


function log1(...vals){
	
	let line = vals.join(" ")+"\n";
	$desc1.append(line);
	console.log(...vals);
}


$(()=>{
	$desc1 = $("#desc1");

	//создание
	let d1= new Date();
	let d2 = new Date(2014, 11, 31, 12, 30, 0);
	let d3 = new Date(2011, 0, 1, 0, 0, 0, 0); 	// 1 января 2011, 00:00:00  (январь - нулевой месяц)
	let d4 = new Date(2011, 0, 1); 		// то же самое
	let d5 = new Date(1241777298123);	//milliseconds since 1970/01/01
	let d6 = new Date("May 21, 1958 10:15 AM");
	let d7 = new Date(2013, 0, 32); 	// 1 февраля 2013!
	let d8 = new Date("2020-05-12T23:50:21.817Z");		//json формат
	
	//копирование
	let copyDate1 = new Date(d1);
	let copyDate2 = new Date(d1.getTime());
	
	log1("d1 =",formatDateTime(d1));
	log1("d1.toString() =",d1);
	log1("d1.toJSON() =",d1.toJSON());
	
	
	log1("");
	log1("getFullYear =",d1.getFullYear());
	log1("getMonth =",d1.getMonth());		//Месяц (0..11)
	log1("getDate =",d1.getDate());			//Число месяца (1..)
	log1("getDay =",d1.getDay());			//номер дня в неделе (0- воскресенье, 6 - суббота)
	log1("getTime =",d1.getTime());			//число миллисекунд, прошедших с 1 января 1970
	log1("getTimezoneOffset =",d1.getTimezoneOffset());	//Возвращает разницу между местным и UTC-временем, в минутах.
	log1("");
	log1("d2 =",formatDateTime(d2));
	log1("d3 =",formatDateTime(d3));
	log1("d4 =",formatDateTime(d4));
	log1("d5 =",formatDateTime(d5));
	log1("d6 =",formatDateTime(d6));
	log1("d7 =",formatDateTime(d7));
	log1("d8 =",d8);
	
	log1("");
	log1("d1>d2 = ",d1>d2);
	log1("copyDate1 =",formatDateTime(copyDate1));
	log1("copyDate2 =",formatDateTime(copyDate2));	
	
	
	/*
	setFullYear(year [, month, date])
	setMonth(month [, date])
	setDate(date)
	setHours(hour [, min, sec, ms])
	setMinutes(min [, sec, ms])
	setSeconds(sec [, ms])
	setMilliseconds(ms)
	*/
	
	log1("");
	d1.setFullYear(2015,0,5);
	log1("setFullYear(2015,0,5)",formatDateTime(d1));
	
	d1.setMonth(2);
	log1("setMonth(2)",formatDateTime(d1));

	d1.setDate(100);
	log1("setDate(100)",formatDateTime(d1));
	

	

	
});



