
let a = {};


let testArray1, testArray2, testArray3;
let testString1, testMap1;
let testObject1;
let testSet1;

let testArray, testMap;
let removed;

function initArrays(){
	testArray1 = ["Яблоко", "Апельсин", "Слива", "Груша","Финик","Вишня"];
	testArray2 = new Array(11, 3, 5, 2, 7, 9, 13, 3, 33 );
	testString1 = "Привет мир!";
	
	testArray3 = Array.from({ length: 9 }, (el, index) => index);	// [0, 1, 2, 3...]
	
	
	testObject1 = {
	  name: "John",
	  age: 30
	};	
	
	testMap1 = new Map([
	  [1, "a"],
	  [2, "b"],
	  [3, "c"],
	]);
	
	
}


function logTAF(func){
	let r = lf2(func);
	log2(testArray,"\n")
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

		a.arr10 = Array.of(5, 2, 7, 77 );
		
		
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
		
		//создание на основе строки через оператор расширения
		a.arr14 = [...testString1]; 

		//копирование массива через оператор расширения
		a.arr16 = [...testArray1]; 
		
				
		
		//Создание массива на основе итератора
		a.arr15 = [...testMap1.values()]; 
		
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
	iterate: () => {
		a = {};

		le2("testArray1");
		
		lf2(()=>{
			//итерация через for	
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
		});

		lf2NL(()=>{
			//итерация по индексам (и добавленным полям объекта)	
			testArray1.testField = "testValue";	
			for (let f in testArray1) {
				log2(f);
			}
		});
		
		lf2NL(()=>{
			//итерация по значениям	
			for (let v of testArray1) {
				log2(v);
			}
		});
		
		lf2NL(()=>{
			//arr.forEach
			testArray1.forEach((item, index, array) => {
				log2(`testArray1[${index}] = ${item}`);
			});
		});
		
		lf2NL(()=>{
			//Получение объекта Iterator из массива
			let vi = testArray1.values();
			let ki = testArray1.keys();
			let ei = testArray1.entries();
			
			//по итераторам обычно проходят так
			for(entry of ei){
				log2(`key=${entry[0]}, val=${entry[1]}`);
			}
		});
		
		
			
	},
	

	
	//модификация массива
	Mutating_methods: () => {

		lc2("Mutating methods - меняют массив");
		
		le2("testArray = [7,8];");
		
		logTAF(()=>{
			//push - добавляет элементы в конец массива и возвращает его новую длину
			let newLength = testArray.push(5,6);
		});
		logTAF(()=>{
			//pop- Удаляет последний элемент из массива и возвращает его
			let v = testArray.pop();
		});

		logTAF(()=>{
			//unshift - Добавляет элементы в начало массива
			let newLength = testArray.unshift(1,1);
		});
		logTAF(()=>{
			//shift - Удаляет из массива первый элемент и возвращает его:
			let v = testArray.shift();
		});
		logTAF(()=>{
			//укоротить до 2 элементов
			testArray.length = 2;
		});
		logTAF(()=>{
			//вернуть length обратно, как было
			testArray.length = 4;
		});
		logTAF(()=>{
			//Очистка массива
			testArray.length = 0;
			//генерируем новый массив
			testArray = Array.from({ length: 9 }, (el, index) => index+1);
		});
		
		
		logTAF(()=>{
			testArray.reverse();
		});
		logTAF(()=>{
			testArray.sort();
		});
		
		logTAF(()=>{
			//числа больше 5 - в начало списка	
			testArray.sort((a, b) => a>5?-1:1 );
		});
		logTAF(()=>{
			//удаление значения (вставляет в ячейку null)
			delete testArray[3];
		});
		logTAF(()=>{
			//arr.splice(index[, deleteCount, elem1, ..., elemN])
			//Удаляет deleteCount элементов, начиная с номера index, а затем вставляет elem1, ..., elemN на их место. 
			//Возвращает массив из удалённых элементов.
	
			//удаляем 4 элемента, начиная со второго
			let removedArr = testArray.splice(2, 4);
			log2("removed:",removedArr);
		});
		logTAF(()=>{
			let removedArr = testArray.splice(0, 2, 11, 12, 13);
			log2("removed:",removedArr);
		});

		
		testArray = Array.from({ length: 9 }, (el, index) => index+1);
		le2NL("testArray");
		
		lc2NL("fill(value, start, end) - заполняет массив заданным значением");
		le2NL("testArray.fill(6)");

		le2NL("testArray.fill(1,2)");
		le2NL("testArray.fill(0,5)");

		testArray = Array.from({ length: 9 }, (el, index) => index+1);
		testArray.fill(0,0,5);
		le2NL("testArray");
				
		lc2NL("copyWithin(target, start, end) - копирует часть массива от start до end в позицию target");
		le2NL("testArray.copyWithin(0,7)");
		le2NL("testArray.copyWithin(2,5,8)");

		/*		
The copyWithin() method of Array instances shallow copies part of this array to another location in the same array and returns this array without modifying its length.

		lc2NL("");
		lc2NL("");
		lc2NL("");
				
		copyWithin(target, start)
		
		*/
				
	},	
	
	
	
	//преобразование массива (в другой массив/объект)
	Copying_methods: () => {
		testArray = Array.from({ length: 9 }, (el, index) => index+1);
		
		lc2NL("Copying methods - методы, которые возвращают модифицированную копию массива, не затрагивая оригинал");
		le2NL("testArray");
		
		lf2NL(()=>{
			//arr.concat(value1, value2, … valueN)
			//создаёт новый массив, в который копируются элементы из arr, а также value1, value2, ... valueN.
			//Если аргумент массив - добавятся элементы из него.
			return testArray.concat(2,3);
		});
		lf2NL(()=>{
		//arr.slice(start, end) - копирует участок массива от begin до end, не включая end
		//без аргументов - копирует массив
		return testArray.slice();
		});
		lf2NL(()=>{
			//подмножество массива
			return testArray.slice(1,5);
		});
		lf2NL(()=>{
			//фильтрация
			return testArray.filter(item=>item>5);
		});
		lf2NL(()=>{
			//преобразование элементов
			return testArray.map((item,i)=>item*2);
		});
		lf2NL(()=>{
			//arr.reduce(callback, initialValue = 0)
			//используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
			
			//получение суммы всех чисел
			return testArray.reduce((sum, current)=>sum+current);
		});
		lf2NL(()=>{
			//получение суммы всех чисел + initialValue
			return testArray.reduce((sum, current)=>sum+current, 100);
		});
		
		le2NL("testArray.toReversed()");
		le2NL("testArray.toSorted()");
		le2NL("testArray.toSpliced(0,2)");
		
		
		lc2NL("arr.with(index, value) - возвращает копию массива, с изменённой ячейкой");
		le2("testArray.with(0, 111)");
		
		
//		le2NL("testArray");
		
		lc2NL("flat(depth=1) - создаёт одноуровневый массив из многоуровневых");
		le2("[0, 1, 2, [3, 4]].flat()");
		le2NL("[0, 1, [2, [3, [4, 5]]]].flat()");
		le2NL("[0, 1, [2, [3, [4, 5]]]].flat(3)");

		
		lc2NL("flatMap(callbackFn) - аналог вызова map().flat()");
		le2("[1, 2, 3, 4].flatMap((x) => [x, x * 2]);");
		
		
		lf2(()=>{
			//arr.join([separator]) - связывает все элементы массива в строку (через запятую по умолчанию);
			return testArray.join(';');
		});
		
	},
	
		check: () => {
			le2("testArray = testArray2.slice();");
			le2("testArray.indexOf(3);");
			le2("testArray.lastIndexOf(3);");
			le2("testArray.includes(3);");
			le2("testArray.some(item=>item>3);");
			le2("testArray.every(item=>item>3);");
			lf2NL(()=>{
				//arr.find(callback) - возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию
				//В противном случае возвращается undefined.
				return testArray.find(item=>item>11);
			});
			lf2NL(()=>{
				//сравнение массивов можно делать так
				return JSON.stringify(testArray) === JSON.stringify(testArray2)
			});
			lf2NL(()=>{
				//проверка на массив
				return Array.isArray(testArray);	
			});
		},	
	
		splice: () => {
			
			le2("testArray3");
			
			lf2NL(()=>{
				testArray = testArray3.slice();
				
				//удаляем все элементы начиная со 2-го
				removed = testArray.splice(2);
			});
			le2("removed");
			le2("testArray");

			lf2NL(()=>{
				testArray = testArray3.slice();
				
				//удаляем 3 элемента начиная со 2-го
				removed = testArray.splice(2,3);
			});
			le2("removed");
			le2("testArray");
			
			lf2NL(()=>{
				testArray = testArray3.slice();
				
				//удаляем 3 элемента начиная со 2-го, вставляем 3 других
				removed = testArray.splice(2,3,111,222,333);
			});
			le2("removed");
			le2("testArray");
			
			
		},	
		
		
	
	
	
}

let selectorsData2 = {
	
	map_create: () => {
		
		lc2("Map - коллекция ключ/значение");
		lc2("отличие от Object в том, что Map позволяет использовать ключи любого типа, даже объекты");

		lc2NL("Проверка на тип");
		le2("testMap1 instanceof Map;");

//		le2NL("testMap1;");
				
		
		lf2NL(()=>{
			//Способы создания
			a = {};
			
			a.map1 = new Map();
			
			//мап из массива
			a.map2 = new Map([
			  ["огурец", 500],
			  ["помидор", 350],
			  ["лук",    50]
			]);
			
			//мап из объекта
			a.map3 = new Map(Object.entries(testObject1));

			//копирование Map
			a.map4 = new Map(testMap1);		
			a.map5 = new Map(Array.from(testMap1));			
			
			return a;
		});

		
		
		
		
	},
	
	map_modify: () => {
		

		lf2(()=>{
			//map.set(key, value) - задание. Возвращает map.
			//map.get(key) - получение значения
			testMap = new Map();		
			testMap.set("1", "str1");
			return testMap.set(1, "num1").set(2, "num2").set(true, "bool1");
		});
		
		le2NL("testMap.get(1)");
		le2NL('testMap.get("1")');

		lc2("map.delete(key) - удаление. Возвращает true, если элемент был успешно удалён, false - если был не найден");
		le2NL("testMap.delete(2);");
		le2NL("testMap;");
		
		lc2("map.has(key) - проверка на наличие");
		lc2("map.size - размер");
		lc2("map.clear() - очистка");
		
		le2NL("testMap.has(1)");
		le2NL("testMap.size");
		
		le2NL("testMap.clear();testMap;");
		

		/*
		getOrInsert поддерживается только новыми браузерами!
		
		testMap = new Map(testMap1);
		le2NL("testMap;");
		
		lc2NL("getOrInsert(key, defaultValue) - если ключ найден - возвращает значение, иначе вставляет defaultValue и возвращает его");
		le2NL('testMap.getOrInsert(10, "juu");');
				
		le2NL('testMap.getOrInsert(10, "ten");');
		*/		
		
	},	
	
	map_transform: () => {
		lc2("Создание объекта из мапа");
		le2("Object.fromEntries(testMap1.entries());");
		
		
		lc2NL("Создание массива из мапа");
		le2("Array.from(testMap1);");
		le2("Array.from(testMap1.keys());");
		le2("Array.from(testMap1.values());");
		
		lc2NL("Map в строковом виде");
		le2("JSON.stringify(Array.from(testMap1));");
	},	
	
	
	map_iterate: () => {
		
		lc2("map.keys(), map.values(), map.entries() - Возвращают Iterator");		

		lc2NL("Создание массива на основе итератора");		
		le2("[...testMap1.values()]");
		
		
		lc2NL("Итерация по итератору map.keys()");		
		lf2(()=>{
			for (let key of testMap1.keys()) {
				let value = testMap1.get(key);
				log2(`${key}: ${value}`);
			}
		});		

		lc2NL("Итерация по итератору map.entries()");		
		lf2(()=>{
			for (let e of testMap1.entries()) {
				log2(`${e[0]}: ${e[1]}`);
			}
		});		
		
				
		lc2NL("Итерация через метод forEach");		
		lf2(()=>{
			testMap1.forEach((value, key, map) => {
				log2(`${key}: ${value}`);
			});
		});		

		
		
		
	},		
	
	
	
	set_create: () => {
		
		lc2NL("множество уникальных значений");
		
		lf2NL(()=>{
			//Способы создания
			a = {};
			
			a.set1 = new Set();
			a.set2 = new Set(["апельсин", "яблоко", "банан"]);
			
			
			return a;
		});		
		
	},		
	
	set_mod: () => {
		
		let john = { name: "John" };
		let pete = { name: "Pete" };
		let mary = { name: "Mary" };

		
		lf2(()=>{
						
			testSet1 = new Set();
			
			// считаем гостей, некоторые приходят несколько раз
			testSet1.add(john);
			testSet1.add(pete);
			testSet1.add(mary);
			testSet1.add(john);
			testSet1.add(mary);

			return testSet1;
		});	
		
		lf2NL(()=>{
			
			testSet1.delete(john);
			
			testSet1.forEach((value, valueAgain, set) => {
				log2(value);
			});
		});	

		lf2NL(()=>{
			for (let v of testSet1) {
				log2(v.name);
			}
		});
		
		
		
	},		
	
	
	weak_set: () => {
		
		
		lf2NL(()=>{
			let john = { name: "John" };
			let pete = { name: "Pete" };
	
			testSet1 = new WeakSet();
			testSet1.add(john);
			testSet1.add(pete);
	
			john = null; // перезаписываем ссылку на объект
			
		});	

		
		testSet1.forEach((value, valueAgain, set) => {
			log2(value);
		});
				
		
		
		
	},		
	
			
			
			/*
			lc2NL("");
			lc2NL("");
			le2NL("testArray");
			le2NL("");
			le2NL("");
			le2NL("");
	*/		
				
	
	
}




$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);
	initDemoCodeSelect("#selectors2", selectorsData2);

  initArrays();
//	$workPanel.text(String(initArrays));
  
//  reloadSandbox();
  
});

