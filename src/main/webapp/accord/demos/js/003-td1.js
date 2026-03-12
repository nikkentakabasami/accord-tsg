

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


currentSelectorsData = {

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


		
}














