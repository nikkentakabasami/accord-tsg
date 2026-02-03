
let a = {};


let testArray1, testArray2;
let testString1, testMap1;

function initArrays(){
	testArray1 = ["Яблоко", "Апельсин", "Слива", "Груша","Финик","Вишня"];
	testArray2 = new Array(11, 3, 5, 2, 7, 9, 13, 3, 33 );
	testString1 = "Привет мир!";
	
	testMap1 = new Map([
	  [1, "a"],
	  [2, "b"],
	  [3, "c"],
	]);
	
	
}


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  //способы объявления массивов
  createArrays1: () => {
		a = {};
		
		//пустые массивы
		a.arr0 = [];
		a.arr1 = new Array();
		a.arr2 = Array();
		a.arr3 = new Array(6);		//с заданием размера
		
		
		//размер массива увеличится автоматом при записи значений (хотя такой подход не желателен - мешает оптимизации)
		a.arr1[0] = "Saab";
		a.arr1[1] = "Volvo";
		a.arr1[2] = "BMW";
		a.arr1[7] = "Toyota";  //length=8, ["Saab","Volvo","BMW",null,null,null,null,"Toyota"]
		

		//с заданием значений
		a.arr4 = new Array(5, 2, 7, 77 );
		a.arr5 = new Array("Wind","Rain","Fire")
		a.arr6 = ["Яблоко", "Апельсин", "Слива", "Груша","Финик","Вишня"];

		//объединение массивов в один (через оператор расширения)
		a.arr7 = [0, ...a.arr4, 2, ...a.arr5];
		a.arr8 = a.arr4.concat(2,3);	//concat - создаёт новый массив
		a.arr9 = a.arr4.concat(a.arr5);

		log2(a);
	},
  
	//
	createArrays2: () => {
		a = {};
		//Создание многомерных массивов
		a.arr0 = [ [1,2,3], [4,5,6], [7,8,9] ]
		a.arr2 = [];
		  for (let y = 0; y < 3; y++) {
		      a.arr2.push(new Array());
		      for (let x = 0; x < 7; x++) {
		          a.arr2[y].push(0);
		      }
		}

		//Array.from(items, mapFn) - создаёт массив на основе массиво-подобных объектов 

		//копирование массива через Array.from
		a.arr10 = Array.from(testArray1);

		//копирование с модификацией элементов
		a.arr11 = Array.from(testArray2, (x, index) => x + x);

		//создание на основе строки
		a.arr12 = Array.from(testString1);

		//генерация массива
		a.arr13 = Array.from({ length: 5 }, (el, index) => index);	// [0, 1, 2, 3, 4]
		
		//копирование массива через оператор расширения
		a.arr14 = [...testString1]; 

		//создание на основе Map
		a.arr20 = Array.from(testMap1); 		//[[1,"a"],[2,"b"]]
		a.arr21 = Array.from(testMap1.values());// ["a","b"]
		a.arr22 = Array.from(testMap1.keys());	// [1,2]

		//копирование массива через slice(start, end)
		a.arr30 = testArray1.slice();
		a.arr31 = testArray1.slice(0,3);  //первые 3 записи
		
		//-----------прочие методы---------------

		//получение массива разбиением сроки через string.split(separator, maxArraySize)
		let names = 'Маша, Петя, Марина, Василий';
		a.arr50 = names.split(', ');

		//Если не задать разделитель - будет разбиение по буквам
		a.arr51 = names.split("",3);

		//Получение свойств объекта в виде массива
		a.arr52 = Object.keys(accordUtils);

		//создание массива на основе dom-элементов
		a.arr53 = Array.from($("button"),el=>el.id)

		a.arr54 = Array.from(document.querySelectorAll("button"),el=>el.id)
		
		log2(a);
	},
	
	
	//способы итерации по массивам
	iterateDemo: () => {
		a = {};


		//итерация через for	
		log2("for (let i = 0; i < testArray1.length; i++)");	
		for (let i = 0; i < testArray1.length; i++) {
			let val = testArray1[i];
			if (i==1){
				continue;
			}
			if (i>4){
				break;
			}
			
			log2(`testArray1[${i}] = ${val}`);
		}

		//итерация по индексам (и добавленным полям объекта)	
		testArray1.testField = "testValue";	
		log2NL("for (let f in testArray1)");	
		for (let f in testArray1) {
			log2(f);
		}		
		
		//итерация по значениям	
		log2NL("for (let f of testArray1)");	
		for (let f of testArray1) {
			log2(f);
		}

		log2NL("testArray1.forEach((item, index, array) => {});");	
		testArray1.forEach((item, index, array) => {
			log2(`testArray1[${index}] = ${item}`);
		});
		
		
		
	},
	//модификация массива
	modify: () => {
		
		let a1 = [7,8];
		logVal2("a1",a1);

		//push - добавляет элементы в конец массива и возвращает его новую длину
		let newLength = a1.push(5,6);
		log2NL("a1.push(5,6);", a1);

		//pop- Удаляет последний элемент из массива и возвращает его
		let v = a1.pop();
		log2NL("let v = a1.pop();", a1);
		logVal2("v", v);
		
		//unshift - Добавляет элементы в начало массива
		newLength = a1.unshift(1,1);
		log2NL("a1.unshift(1,1);", a1);
		
		//shift - Удаляет из массива первый элемент и возвращает его:
		a1.shift();
		log2NL("a1.shift();",a1);

		//укоротить до 2 элементов
		a1.length = 2;	//[1,7]
		log2NL("a1.length = 2;",a1);

		//вернуть length обратно, как было
		a1.length = 4;	//[1,7,null,null]
		log2NL("a1.length = 4;",a1);

		//Очистка массива
		a1.length = 0;
		log2NL("a1.length = 0;",a1);
		
		//генерируем новый массив
		let a3 = Array.from({ length: 9 }, (el, index) => index+1);
		log2NL("a3: ", a3)

		a3.reverse();
		log2NL("a3.reverse()", a3)


		a3.sort();
		log2NL("a3.sort()", a3)
		
		//числа больше 5 - в начало списка	
		a3.sort((a, b) => a>5?-1:1 );
		log2NL("a3.sort((a, b) => a>5?-1:1 )", a3)

		//удаление значения (вставляет в ячейку null)
		delete a3[3];
		log2NL("delete a3[3]", a3)
								
		//arr.splice(index[, deleteCount, elem1, ..., elemN])
		//Удаляет deleteCount элементов, начиная с номера index, а затем вставляет elem1, ..., elemN на их место. 
		//Возвращает массив из удалённых элементов.

		//удаляем 4 элемента, начиная со второго
		a3.splice(2, 4);
		log2NL("a3.splice(2, 4)", a3)

		a3.splice(0, 2, 21, 22, 23);
		log2NL("a3.splice(0, 2, 21, 22, 23)", a3)		
	},
	
	

	
	
	//преобразование массива (в другой массив/объект)
	transform: () => {
		
		let a2 = Array.from({ length: 9 }, (el, index) => index+1);
		logVal2("a2", a2)
		
		//arr.join([separator]) - связывает все элементы массива в строку (через запятую по умолчанию);
		let str = a2.join(';');
		logVal2NL("a2.join(';')",str);
		
		//arr.concat(value1, value2, … valueN)
		//создаёт новый массив, в который копируются элементы из arr, а также value1, value2, ... valueN.
		//Если аргумент массив - добавятся элементы из него.
		let a3 = a2.concat(2,3);
		logVal2NL("a2.concat(2,3)",a3);
	
		//arr.slice(start, end) - копирует участок массива от begin до end, не включая end
	
		//копирование массива
		let a4 = a2.slice();
		logVal2NL("a2.slice()",a4);
	
		//подмножество массива
		let a5 = a2.slice(1,5);
		logVal2NL("a2.slice(1,5)",a5);
		
		//фильтрация
		let a6 = a2.filter(item=>item>5);
		logVal2NL("a2.filter(item=>item>5)",a6);
	
		//преобразование элементов
		let a7 = a2.map((item,i)=>item*2);
		logVal2NL("a2.map(item=>item*2)",a7);
		
		//arr.reduce(callback[, initialValue])
		//используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
		
		//получение суммы всех чисел
		let a8 = a2.reduce((sum, current)=>sum+current);
		logVal2NL("a2.reduce((sum, current)=>sum+current)",a8);
			
		//получение суммы всех чисел + initialValue
		let a9 = a2.reduce((sum, current)=>sum+current, 100);
		logVal2NL("a2.reduce((sum, current)=>sum+current, 100)",a9);		
		
	},
	//
	check: () => {

//		let a2 = Array.from({ length: 9 }, (el, index) => accordUtils.random(5));
		logVal2NL("testArray2", testArray2)

		let ind = testArray2.indexOf(3);
		logVal2NL("testArray2.indexOf(3)", ind);

		ind = testArray2.lastIndexOf(3);
		logVal2NL("testArray2.lastIndexOf(3)", ind);

		let b = testArray2.includes(3);
		logVal2NL("testArray2.includes(3)", b);
			
		b = testArray2.every(item=>item>3);
		logVal2NL("testArray2.every(item=>item>3)", b);

		b = testArray2.some(item=>item>3);
		logVal2NL("testArray2.some(item=>item>3)", b);

		//arr.find(callback) - возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию
		//В противном случае возвращается undefined.
			
		let val = testArray2.find(item=>item>=3);
		logVal2NL("testArray2.find(item=>item>=3)", val);

		//сравнение массивов можно делать так
		b = JSON.stringify(testArray1) === JSON.stringify(testArray2)
		logVal2NL("testArray1==testArray2",b);

		//проверка на массив
		b = Array.isArray(testArray2);	
		logVal2NL("Array.isArray(testArray2)", b);		
		
	},
	
	
	
}







$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  initArrays();
  
//  reloadSandbox();

  $workPanel.text(String(initArrays));
  
});


/*
	transform: () => {
		a = {};
	
		a.testArray2 = testArray2;
		
//		a.a2 = Array.from({ length: 9 }, (el, index) => index+1);
		
		//arr.join([separator]) - связывает все элементы массива в строку (через запятую по умолчанию);
		a.joinString = testArray2.join(';');
		
		//arr.concat(value1, value2, … valueN)
		//создаёт новый массив, в который копируются элементы из arr, а также value1, value2, ... valueN.
		//Если аргумент массив - добавятся элементы из него.
		a.a3 = testArray2.concat(2,3);

		//arr.slice(start, end) - копирует участок массива от begin до end, не включая end

		//копирование массива
		a.a4 = testArray2.slice();

		a.a5 = testArray2.slice(1,5);
		
		a.a6 = testArray2.filter(item=>item>5);

		a.a7 = testArray2.map((item,i)=>item*2);
		
		//arr.reduce(callback[, initialValue])
		//используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
		
		//получение суммы всех чисел
		a.a8 = testArray2.reduce((sum, current)=>sum+current);
			
		//получение суммы всех чисел + initialValue
		a.a9 = testArray2.reduce((sum, current)=>sum+current, 100);
		
		log2(a);
	},	*/
