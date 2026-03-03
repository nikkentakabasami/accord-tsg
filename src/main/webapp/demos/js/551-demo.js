
let a = {};
let o1,o2,o3,o4, currentObject;




//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

	class_basics(){

		log2(String(User));
		
				
		le2(`
			
			user = new User("Иван"); ~
			
			//using getter
			user.age;
			user.fullName;
			
			//using setter
			user.age = 33; !
			user.password = "orbital"; !
			
			user.age = 2;   //Ошибочное значение !

			
			
						
			user.name = "Коля"; !
			user.sayHi();
			
			user.printpw();
			
			user; ~

			//bad constructor			
			user = new User("Иван","ss"); ~
			
			
			
			//статические методы
			User.staticMethod1();
			User.staticMethod2();
			User.createBob(); ~
			
			//Статические свойства
			User.desc;
			
		`);		
		
	},
		
	
	class_inheritance(){

		log2(String(Animal));
		log2(String(Rabbit));
		
				
		le2(`
			rabbit = new Rabbit("Белый кролик", 10); !
			rabbit.run(5); !
			rabbit.stop(); !
		`);		
		
	},	
	
	
	
	
		
	
}




$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

	$sel1.val("class_basics").trigger("change");

});






