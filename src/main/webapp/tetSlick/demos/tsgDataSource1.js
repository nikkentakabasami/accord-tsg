
import {accordUtils } from '../tet.slick.grid-bundle.js';

export { TsgDataSource1 };


class TsgDataSource1 {

	fruitsList=["Apple","Banana","Blackberry","Blueberry","Cherry","Cranberry","Grapes","Kiwi","Mango","Orange","Peach","Pear","Pineapple","Raspberry","Strawberry","Watermelon"];
	
	fruits = [];
	
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

		
		this.fruitsList.forEach((f,ind)=>{
			this.fruits.push({ id: ind+1, name: f });
		})
		
		
		for (let i = 0; i < 14; i++) {

//			let r = accordUtils.random(100);

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
		
			let dur = accordUtils.random(30);
			
			let r = {
				id: i,
				section: this.sections[accordUtils.random(this.sections.length)],
				customer: this.customers[accordUtils.random(this.customers.length)],
				title: "Мой таск " + i*3,
				durationInt: dur,
				duration: dur+" дней",
				percentComplete: accordUtils.random(100,5),
				effortDriven: (accordUtils.random(10)<3),
				fruit: this.fruits[accordUtils.random(this.fruits.length)],
				odd: (i % 2 == 1)
			};
			this.rows[i] = r;
			
			let d1 = accordUtils.randomDate();
			r.start = d1.getTime();
			r.startStr = accordUtils.formatDate(d1);
			
			d1.setDate(d1.getDate() + accordUtils.random(100));
			r.finish = d1.getTime();
			r.finishStr = accordUtils.formatDate(d1);
		}


	}




}








