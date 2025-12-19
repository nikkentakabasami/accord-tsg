

let $desc1;


function log(...vals){
	
	let line = vals.join(" ")+"\n";
	$desc1.append(line);
	console.log(...vals);
}


function logMoment(s, m){
	
	let line = s+" = "+m.format('DD.MM.YYYY, hh:mm:ss')+"\n";
	$desc1.append(line);
	console.log(line);
}


$(()=>{
	$desc1 = $("#desc1");
	
	//получение текущей даты
	let m = moment();				//текущее время
//	let m = moment(new Date());		//то же самое
	
	//показ локального времени
	log("m.format()",m.format());
	
	//m.utc() - переключение в формат UTC time (время по координированному всемирному времени)
	//UTC time — это стандарт времени, основанный на атомных часах и определяющий мировой эталон времени. 
	log("m.utc().format()",m.utc().format());
	
	//форматирование времени своим форматом
	log("m.format('DD.MM.YYYY, hh:mm:ss')",m.format('DD.MM.YYYY, hh:mm:ss'));
	
	//m.calendar() - форматирует время так, чтобы показывать его относительно заданной даты
	// сегодня, завтра ...
	log("m.calendar()",m.calendar());
	
	
	
	//вывод миллисекунд прошедших с Unix Epoch
	log("m.valueOf()",m.valueOf());
	
	log("");

	//получение частей даты	
	let year = m.year();
	let month = m.month();
	let date = m.date();
	let hour = m.hour();
	let minute = m.minute();
	let second = m.second();
	let ms = m.millisecond();
	let dayOfWeek = m.day();
	let dayOfYear = m.dayOfYear();
		
	log(`date parts: ${year} ${month} ${date} ${hour}:${minute}:${second}:${ms} dayOfYear:${dayOfYear}, dayOfWeek:${dayOfWeek}`);


	//задание частей даты
	m.year(2026).month(2).date(11).hour(2);
	logMoment("m.year(2026).month(2).date(11).hour(2)",m);
	
	//задание частей даты методом set
	m.set('year', 2013).set('month', 1);
	logMoment("m.set('year', 2013).set('month', 1)",m);
	log("");
	
	
	//модификация даты	

	m.subtract(10, 'day').add(1, 'year')
	logMoment("m.subtract(10, 'day').add(1, 'year')",m);
	

	log("");
	
	
	//задание даты строкой в формате ISO 8601
	let m1 = moment("2013-02-08");
	let m2 = moment("2013-02");
	let m3 = moment("2013-039");
	let m4 = moment("20130208");	//full date
	let m5 = moment("201303");		//year+month   не работает!
	let m6 = moment("2013");
	let m7 = moment("2013-02-08 09:30");
	let m8 = moment("2013-02-08 09:30:26");
	let m9 = moment("2013-02-08 09:30:26.123");
	
	//задание даты строкой в формате RFC 2822
	let m10 = moment("6 Mar 17 21:22 UT");
	let m11 = moment("6 Mar 2017 21:22:23 GMT");

	//задание даты строкой в заданном формате
	let m12 = moment("12-25-1995", "MM-DD-YYYY");
	let m13 = moment("12/25/1995", "MM-DD-YYYY");
//	let m14 = moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);
	let m14 = moment('19.12.2025, 11:48:52', "DD.MM.YYYY, hh:mm:ss");
	
	
	let m15 = moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);	//можно задать несколько форматов
	
	
	//задание даты объектом
	let m16 = moment({ hour:15, minute:10 });
	let m17 = moment({ y    :2010, M     :3, d   :5, h    :15, m      :10, s      :3, ms          :123});
	let m18 = moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123});
	
	//задание даты массивом в формате [year, month, day, hour, minute, second, millisecond]
	let m19 = moment([2010, 1, 14, 15, 25, 50, 125]); // February 14th, 3:25:50.125 PM
	
	
	//клонирование
	let m20 = moment(m19);
	m20.year(2000);
	let m21 = m19.clone();
	
	//сравнение дат
	let maxDate = moment.max(m18, m19);
	let minDate = moment.min(m18, m19);
	
//	let m22 = moment.utc().format(); // 2013-02-04T18:35:24+00:00	
	

	
		
	logMoment("m1",m1);
	logMoment("m2",m2);
	logMoment("m3",m3);
	logMoment("m4",m4);
	logMoment("m5",m5);
	logMoment("m6",m6);
	
	logMoment("m7",m7);
	logMoment("m8",m8);
	logMoment("m9",m9);
	
	logMoment("m10",m10);
	logMoment("m11",m11);

	logMoment("m12",m12);
	logMoment("m13",m13);
	logMoment("m14" ,m14);
	log("m14.isValid()="+ m14.isValid());
	logMoment("m15",m15);
	
	logMoment("m16",m16);
	logMoment("m17",m17);
	logMoment("m18",m18);
	logMoment("m19",m19);
	logMoment("m20",m20);
	logMoment("m21",m21);
		
	logMoment("maxDate",maxDate);
	logMoment("minDate",minDate);
	

	
	

	
});



