
let a = {};

//способы объявления массивов
function createArrays1(){
	
	a = {};
	
	//пустые массивы
	a.arr0 = [];
	a.arr1 = new Array();
	a.arrEmpty2 = Array();

	//размер массива увеличится автоматом при записи значений (хотя такой подход не желателен - мешает оптимизации)
	a.arr1[0] = "Saab";
	a.arr1[1] = "Volvo";
	a.arr1[2] = "BMW";
	a.arr1[7] = "Toyota";  //length=8, ["Saab","Volvo","BMW",null,null,null,null,"Toyota"]

	log2(a);
//	return a;	
}



//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  test_func1: function() {
	//назначает обработчик на все инпуты
	return $("#formDiv1 input").bind("click", event => {
		  log("inp click.");
		});
  },

  createArrays1: createArrays1,
  
  
}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();

});



