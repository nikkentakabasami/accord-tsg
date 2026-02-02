
let a = {};

//способы объявления массивов
function createArrays1(){
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
}



//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  createArrays1: createArrays1,
  
}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();

});



