
let a = {};


let testArray1, testArray2;
let testString1, testMap1;

let testArray;


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
		
	},
	

	
	//модификация массива
	modify: () => {

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

				
	},	
	
	
	
	//преобразование массива (в другой массив/объект)
	transform: () => {
		testArray = Array.from({ length: 9 }, (el, index) => index+1);
		
		lf2(()=>{
			//arr.join([separator]) - связывает все элементы массива в строку (через запятую по умолчанию);
			return testArray.join(';');
		});
		lf2NL(()=>{
			//arr.concat(value1, value2, … valueN)
			//создаёт новый массив, в который копируются элементы из arr, а также value1, value2, ... valueN.
			//Если аргумент массив - добавятся элементы из него.
			return testArray.concat(2,3);
		});
		lf2NL(()=>{
		//arr.slice(start, end) - копирует участок массива от begin до end, не включая end
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
	
	
	
	
}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  initArrays();
//	$workPanel.text(String(initArrays));
  
//  reloadSandbox();
  
});

