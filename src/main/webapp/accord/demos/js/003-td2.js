


currentSelectorsData = {
		
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

	le_err_demo(){
		le2("d1.dosome();");
	},			
		
}














