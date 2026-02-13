
let a = {};

let testMap1 = new Map([
  [1, "a"],
  [2, "b"],
  [3, "c"],
]);

let result;


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {


	test1: () => {

		lc2("test_comment");
		
		result = lf2NL(() => {
			return "test_func_result";
		});
		le2NL("result.length");
		
	},	
	
	test2: () => {
		
		lf2NL(()=>{
		});
		
		le2NL(`
		`);				
		
	},	

  test_func1: () => {
    //функция для работы с dom.
    //возвращает jquery объект. Эти элементы будут выделены рамкой.
    return $("#formDiv1 input").bind("click", event => {
      log("inp click.");
    });
  },


  createArrays1: () => {
		//log(...vals), log2(...vals) - выводит в лог заданные сообщения (через пробел) 
		//корректно форматирует их

    a = {};
    a.arr0 = [];
    a.arr1 = new Array();
    a.arrEmpty2 = Array();
    log2(a);
  },

  lf_demo: () => {
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

  le_demo: () => {
		//le(exp), le2(exp)
		//1) выводит в лог заданное выражение 
		//2) выполняет его 
		//3) выводит в лог результат

		//lc2(exp) - вывод логов
		
		
		le2("a.d1 = new Date();");
		le2("a.d2 = new Date(2014, 11, 31, 12, 30, 0);");
		
		le2("a.d1.toString()");
		le2("a.d1.toJSON()");
		le2("a.d2.getFullYear()");
		le2("a.d2.getMonth()");
		

		lf2NL(()=>{
			return testMap1.set(22, "aku");
		});
		
		lc2NL("my comment");
		le2("testMap1.get(22)");
		
		lc2NL("Проверка на тип");
		le2("testMap1 instanceof Map;");
		
		
  },	


	le_err_demo: () => {
		le2("d1.dosome();");
	},			
		
}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();

});



