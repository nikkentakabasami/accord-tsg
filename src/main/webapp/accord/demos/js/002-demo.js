
let a = {};

let testMap1 = new Map([
  [1, "a"],
  [2, "b"],
  [3, "c"],
]);

const testObject1 = {
  name: "some string",
  age: 42,
	fresh: true
};


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {



	le_demo2:`

		//весь код демки можно задать мульти-строкой.

		//! - не выводить результат выражения
		result = 111;  !
								
		Object.entries(testObject1);
		
		//~ - вывести результат как json
		Object.fromEntries(testMap1);			  ~
	`,	
	
	
	le_demo(){

		le2NL(`
			
			Object.entries(testObject1);
			
			//создание объекта на основе двумерного массива
			Object.fromEntries(testMap1);			
		`);			
		
	},


		
	lf_demo(){
	  //lf(func), lf2(func)
		//1) выводит в лог код заданной функции 
		//2) выполняет её 
		//3) выводит в лог результат функции

	  let testArray1 = Array.from("testString");
	  lf2(() => {
	    for (let f in testArray1) {
	      log2(f);
	    }
	    return testArray1;
	  });

	},	
		
	
	test1(){

		lc2("test_comment");
		
		result = lf2NL(() => {
			return "test_func_result";
		});
		le2NL("result.length");
		
	},	
	
	test2(){
		
		lf2NL(()=>{
		});
		
		le2NL(`
		`);				
		
	},

	
  test_func1(){
    //функция для работы с dom.
    //возвращает jquery объект. Эти элементы будут выделены рамкой.
    return $("#formDiv1 input").bind("click", event => {
      log("inp click.");
    });
  },

	le_err_demo(){
		le2("d1.dosome();");
	},			
		
}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);
	
	//выбрать опцию после загрузки страницы 
	$("#selectors1").val("le_demo2").trigger("change");

  reloadSandbox();

});



