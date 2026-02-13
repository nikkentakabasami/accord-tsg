
let a = {};
let o1,o2,o3,o4, currentObject;

let result;

const testObject1 = {
  name: "some string",
  age: 42,
	fresh: true
	
};


const testMap1 = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);



//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

	assign: () => {
		
		lf2NL(()=>{
			//Object.assign(target, source1)
			//Object.assign(target, ...sources)
			//Копирует все properties из одного и более source объектов в target.
			//Возвращает target
			
			o1 = { a: 1, b: 2 };
			o2 = { b: 4, c: 5 };
		});

		
		lo2(`
			Object.assign(o1, o2);
						
			//клонирование объекта
			Object.assign({}, o2);
		`);		
		
		lf2NL(()=>{
			o1 = { a: 1 };
			o2 = { b: 2 };
			o3 = { c: 3 };
		});
		
		log2();
		lo2(`
			Object.assign(o1, o2, o3);			
		`);				
	},
		
	structuredClone: () => {
		
		lf2NL(()=>{

			//structuredClone(value, options) - глубокое клонирование объекта
						
			o1 = { a: 0, b: { c: 0 } };
			o2 = structuredClone(o1);
			o1.a = 4;
			o1.b.c = 4;
		});
		
		log2();
		lo2(`
			o1;
			o2;
		`);				
		
	},
	
	
	create: () => {
		
		lf2NL(()=>{
			//Object.create(proto) - создаёт новый объект, используя существующий как прототип 
			
			const person = {
			  isHuman: false,
			  printIntroduction() {
			    log2(`My name is ${this.name}. Am I human? ${this.isHuman}`);
			  },
			};
			
			currentObject = Object.create(person);

			currentObject.name = "Matthew";
			currentObject.isHuman = true;

			currentObject.printIntroduction();			
		});
		
		le2NL(`
		`);				
		
	},	
	
	
	entries: () => {
		
		lf2NL(()=>{

			//Object.entries(obj) - возвращает property объекта в виде двумерного массива.
			//каждый элемент массива - массив вида [property, value]
			
			for (const [key, value] of Object.entries(testObject1)) {
			  log2(`${key}: ${value}`);
			}
			
		});
		
		le2NL(`
			
			Object.entries(testObject1);

			
			//Object.fromEntries(iterable) - создание объекта на основе двумерного массива (или похожего итерируемого объекта)
			Object.fromEntries(testMap1);			
						
		`);				
		
	},	
	
}




$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

	$("#selectors1").val("entries").trigger("change");

});






