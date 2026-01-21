


let a = {};

//способы объявления массивов
function createArrays(){
	
	//пустые массивы
	a.arr0 = [];
	a.arr1 = new Array();
	a.arrEmpty2 = Array();

	//размер массива увеличится автоматом при записи значений (хотя такой подход не желателен - мешает оптимизации)
	a.arr1[0] = "Saab";
	a.arr1[1] = "Volvo";
	a.arr1[2] = "BMW";
	a.arr1[7] = "Toyota";  //length=8, ["Saab","Volvo","BMW",null,null,null,null,"Toyota"]

	
	//с заданием размера
	a.arr2 = new Array(6);					//создан пустой массив с длинной 6

	//с заданием значений
	a.arr3 = new Array(5, 2, 7, 77 );
	a.arr4 = new Array("Wind","Rain","Fire")
	a.arr5 = ["Яблоко", "Апельсин", "Слива", "Груша","Финик","Вишня"];

	//объединение массивов в один (через оператор расширения)
	a.arr6 = [0, ...a.arr3, 2, ...a.arr4];
	a.arr7 = a.arr3.concat(2,3);	////concat - создаёт новый массив
	a.arr8 = a.arr3.concat(a.arr4);

	


	//Создание многомерных массивов
	a.arr20 = [ [1,2,3], [4,5,6], [7,8,9] ]
	a.arr21 = [];
	  for (var y = 0; y < 3; y++) {
	      a.arr21.push(new Array());
	      for (var x = 0; x < 7; x++) {
	          a.arr21[y].push(0);
	      }
	}

	//Array.from(items, mapFn) - creates a new, shallow-copied Array instance from an iterable or array-like object.

	//копирование массива через Array.from
	a.arr50 = Array.from(a.arr5);

	//копирование с модификацией элементов
	a.arr51 = Array.from(a.arr3, (x) => x + x);

	//создание на основе строки
	a.arr52 = Array.from("foo");		//["f", "o", "o"]

	//копирование массива через оператор расширения
	let str = "Привет";
	a.arr53 = [...str]; 
	
	//создание на основе map
	let map = new Map([
	  [1, "a"],
	  [2, "b"],
	]);
	a.arr54 = Array.from(map);  //[[1,"a"],[2,"b"]]
	a.arr55 = Array.from(map.values());	// ["a","b"]
	a.arr56 = Array.from(map.keys());	// [1,2]


	//генерация массива
	a.arr57 = Array.from({ length: 5 }, (el, index) => index);	// [0, 1, 2, 3, 4]

	//копирование массива через slice
	a.arr60 = a.arr56.slice();	
	
	
	
	//-----------прочие методы---------------
	
	//получение массива разбиением сроки через string.split
	//string.split([separator] [maxArraySize])
	let names = 'Маша, Петя, Марина, Василий';
	a.arr100 = names.split(', ');

	//Если не задать разделитель - будет разбиение по буквам
	a.arr101 = names.split("",4);
	
	//Получение свойств объекта в виде массива
	a.arr102 = Object.keys(accordUtils);
	
	//создание массива на основе dom-элементов
	a.arr103 = Array.from($("button"),el=>el.id)

	a.arr104 = Array.from(document.querySelectorAll("button"),el=>el.id)

	
	
	
}



function showArrays(){
	clearLog();
	log("созданные массивы:");
	logObject(a);
}


//способы итерации по массивам
function iterateDemo(){
	
	clearLog();
	
	a.arr5.testField = "testValue";	
	logVal("arr5",a.arr5);

	log("<br>for (let i = 0; i < arr5.length; i++)");	
	for (let i = 0; i < a.arr5.length; i++) {
		let val = a.arr5[i];
		if (i==1){
			continue;
		}
		if (i>4){
			break;
		}
		
		log(`arr5[${i}] = ${val}`);
	}

	log("<br>for (let f of arr5)");	
	for (let f of a.arr5) {
		log(f);
	}

	log("<br>arr5.forEach((item, index, array) => {});");	
	a.arr5.forEach((item, index, array) => {
		log(`arr5[${index}] = ${item}`);
	});
	
	let sum = 0;
	let r = a.arr5.forEach(function(item, index, array) {
		sum+= this+item.length;
	},10);
	logVal("sum",sum);


	//итерация по индексам (и добавленным полям объекта)	
	log("<br>for (let f in arr5)");	
	for (let f in a.arr5) {
		log(f);
	}
	
	
}



//модификация массива
function modify(){
	clearLog();
	
	let a2 = [7,8];

	//массив это объект – можно присваивать в него любые свойства (хоть это не рекомендуется).
	a2.age = 25;
	
	//push - добавляет элементы в конец массива и возвращает его новую длину
	let newLength = a2.push(5,6);		//[7,8,5,6]
	logVal("a2.push(5,6)",a2,", newLength=",newLength);

	//pop- Удаляет последний элемент из массива и возвращает его
	let v = a2.pop();
	logVal("a2.pop()", a2);
		
	//unshift - Добавляет элементы в начало массива
	newLength = a2.unshift(1,1);	//[1,1,7,8,5]
	logVal("a2.unshift(1,1)",a2, "newLength=",newLength);
	
	//shift - Удаляет из массива первый элемент и возвращает его:
	a2.shift();			//[1,7,8,5]
	logVal("a2.shift()",a2);
	
	//укоротить до 2 элементов
	a2.length = 2;		//[1,7]
	logVal("a2.length = 2",a2);

	//вернуть length обратно, как было
	a2.length = 4;	//[1,7,null,null]
	
	
	logVal("a2.length = 4",a2);

	//Очистка массива
	a2.length = 0;	//[]
	logVal("a2.length = 0",a2);
	
	
	
	//генерируем новый массив
	let a3 = Array.from({ length: 9 }, (el, index) => index+1);
	logVal("a3", a3)
	
	a3.reverse();
	logVal("a3.reverse()", a3)

	
	a3.sort();
	logVal("a3.sort()", a3)

	//числа больше 5 - в начало списка	
	a3.sort((a, b) => a>5?-1:1 );
	logVal("a3.sort((a, b) => a>5?-1:1 )", a3)
	
	//удаление значения (вставляет в ячейку null)
	delete a3[3];
	logVal("delete a3[3]", a3)

	
	
	

	//arr.splice(index[, deleteCount, elem1, ..., elemN])
    //Удаляет deleteCount элементов, начиная с номера index, а затем вставляет elem1, ..., elemN на их место. 
	//Возвращает массив из удалённых элементов.

	//удаляем 4 элемента, начиная со второго
	a3.splice(2, 4);
	logVal("a3.splice(2, 4)", a3)

	a3.splice(0, 2, 21, 22, 23);
	logVal("a3.splice(0, 2, 21, 22, 23)", a3)
	
	/*	
	arr.splice(0, 3, "Мы", "изучаем")	//["Мы", "изучаем", "JavaScript"]

	//удаление нескольких элементов по значению
	    for( var i = 0; i < arr.length; i++){ 
	                                   
	        if ( arr[i] === 5 || arr[i] === 9) { 
	            arr.splice(i, 1); 
	            i--; 
	        }
	    }

	//Вставка элементов
	var arr = ["Я", "изучаю", "JavaScript"];
	arr.splice(2, 0, "сложный", "язык");	//["Я", "изучаю", "сложный", "язык", "JavaScript"]

*/

	
	
	
	
	
	
	
}

function transform(){
	clearLog();
	
	let a2 = Array.from({ length: 9 }, (el, index) => index+1);
	logVal("a2", a2)
	
//	let a2 = [7,8];
	
	//arr.join([separator]) - связывает все элементы массива в строку (через запятую по умолчанию);
	let str = a2.join(';');
	logVal("a2.join(';')",str);
	
	
	let a3 = a2.concat(2,3);
	logVal("a2.concat(2,3)",a3);

	//arr.slice(start, end) - копирует участок массива от begin до end, не включая end

	//копирование массива
	let a4 = a2.slice();
	logVal("a2.slice()",a4);

	let a5 = a2.slice(1,5);
	logVal("a2.slice(1,5)",a5);
	
	
	
	let a6 = a2.filter(item=>item>5);
	logVal("a2.filter(item=>item>5)",a6);


	let a7 = a2.map((item,i)=>item*2);
	logVal("a2.map(item=>item*2)",a7);
	
	
	//arr.reduce(callback[, initialValue])

	//получение суммы всех чисел
	let a8 = a2.reduce((sum, current)=>sum+current);
	logVal("a8",a8);
	
		
	//получение суммы всех чисел + initialValue
	let a9 = a2.reduce((sum, current)=>sum+current, 100);
	logVal("a9",a9);
	
	
	
		
}


function check(){
	clearLog();
	
	let a2 = Array.from({ length: 9 }, (el, index) => accordUtils.random(5));
	logVal("a2", a2)

	let ind = a2.indexOf(3);
	logVal("a2.indexOf(3)", ind);
	
	ind = a2.lastIndexOf(3);
	logVal("a2.lastIndexOf(3)", ind);

	let b = a2.includes(3);
	logVal("a2.includes(3)", b);
		
	b = a2.every(item=>item>3);
	logVal("a2.every(item=>item>3)", b);
	
	b = a2.some(item=>item>3);
	logVal("a2.some(item=>item>3)", b);
	
	//arr.find(callback) - возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию
	//В противном случае возвращается undefined.
		
	let val = a2.find(item=>item>=3);
	logVal("a2.find(item=>item>=3)", val);
	
	
	//сравнение массивов можно делать так
	b = JSON.stringify(a.arr5) === JSON.stringify(a.arr50)
	logVal("arr5==arr50",b);
	
	b = Array.isArray(a.arr5);	
	logVal("Array.isArray(a.arr5)", b);
		
	/*

	 = Array.from(a.arr5);

	Сравнить массивы можно так
	JSON.stringify(a) === JSON.stringify(b)



	*/
	
}



$(function() {
	
	createArrays();
	
	showArrays();
		
	$("#b1").click(e => {
		showArrays();
	});
	
	$("#b2").click(e => {
		iterateDemo();
	});
	
	$("#b3").click(e => {
		transform();
	});
	
	$("#b4").click(e => {
		modify();
	});
	
	$("#b5").click(e => {
		check();
	});
	
	
});
