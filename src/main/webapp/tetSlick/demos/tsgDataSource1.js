

export { TsgDataSource1 };

//let dataSource1 = new TsgDataSource();





function rand(max, min = 0) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function makeRandomDate(){
	return new Date(2020+rand(5), rand(13), rand(30));
}



function formatDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
}


class TsgDataSource1 {

	customers = [
		{ id: 1568, name: "Yamada Taro" },
		{ id: 2599, name: "Ivanov Ivan" },
		{ id: 7, name: "Petrov Petr" },
		{ id: 12, name: "Sidorov Sidor" },
		{ id: 54, name: "Kuznetsov Ivan" },
		{ id: 76, name: "Smirnov Sergei" },
		{ id: 343, name: "Ivanova Olga" },
		{ id: 755, name: "Fedorov Fedor" },
		{ id: 345, name: "Alexeev Anna" },
		{ id: 72, name: "Petrova Maria" },
		{ id: 77, name: "Semenov Alex" },
		{ id: 88, name: "Vasilev Andrey" }
	];

	sections = [];

	rows = null;

	constructor(rowCount) {

		for (let i = 0; i < 14; i++) {

//			let r = rand(100);

			let section = {
				id: i,
				name: "Отдел №" + i
			};
			this.sections.push(section);
		}

		if (!rowCount){
			rowCount = 50;
		}
		
		this.rows = new Array(rowCount);
		for (let i = 0; i < rowCount; i++) {
		
			let dur = rand(30);
			
			let r = {
				id: i,
				section: this.sections[rand(this.sections.length)],
				customer: this.customers[rand(this.customers.length)],
				title: "Мой таск " + i*3,
				durationInt: dur,
				duration: dur+" дней",
				percentComplete: rand(100,5),
				effortDriven: (rand(10)<3),
				odd: (i % 2 == 1)
			};
			this.rows[i] = r;
			
			let d1 = makeRandomDate();
			r.start = d1.getTime();
			r.startStr = formatDate(d1);
			
			d1.setDate(d1.getDate() + rand(100));
			r.finish = d1.getTime();
			r.finishStr = formatDate(d1);
		}


	}




}








