
let a = {};



class PropertyError extends Error {
  constructor(property = "none", ...params) {
    super(...params);

    // Поддерживаем соответствующую трассировку стека с указанием места возникновения ошибки
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PropertyError);
    }

    this.name = "PropertyError";
		this.property = property;
		this.message = "Ошибка в свойстве " + property;
    this.date = new Date();
  }
}



function readUser(data) {

  var user = JSON.parse(data);

  if (!user.age) {
    throw new PropertyError("age", "not defined age");
  }

	if (user.age<10) {
	  throw new PropertyError("age", "age is too small");
	}
	
  if (!user.name) {
    throw new PropertyError("name", "not defined name");
  }

  return user;
}











//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {




  try_demo: () => {
		//Пример использования try..catch
		
				
		try {
		  notExist.readUser();
//			a.notExist();
		} catch (err) {
			
			if (err instanceof ReferenceError) {
			  console.error(`${err.name}: ${err.message}`);			
			}

		  log2('Произошла ошибка:', err.message);
		  log2('Стек вызовов:', err.stack);
			console.error(err.stack);
			
			//перебросить ошибку заново
			throw new Error("New error message", { cause: err });
		} finally {
			log2('finally');
		}
		
		
  },

	
	new_error_demo: () => {
		
			try {
				throw new Error("My error.");
			} catch (err) {
			  log2('тестовая ошибка:', err.message);
				console.error(err.stack);
			}			

			//Ошибкой может быть String, Number, Boolea, Object
			try {
				throw "Too big";
			} catch (err) {
			  log2('тестовая ошибка:', err);
				console.error(err.stack);
			}			
			
			try {
				throw 500;			
			} catch (err) {
			  log2('тестовая ошибка:', err);
				console.error(err.stack);
			}			
			

			
			
			
					
	},	
	

	
	custom_error: () => {
		
		try {
		  let user = readUser('{ "age": 25 }');
		} catch (err) {
			if (err instanceof PropertyError) {
				log2('PropertyError:', err.message);
				log2(err.stack);
			} else {
			  throw err;
			}
		}		
		
	},
	
	custom_error2: () => {
		
		try {
		  let user = readUser('{ "age": 5 }');
		} catch (err) {
		  if (err instanceof PropertyError) {
				log2('PropertyError:', err.message);
				log2(err.stack);
		  } else {
		    throw err;
		  }
		}		
		
	},	
	
	
	err_props: () => {
		
		let err = new Error("My error.");

		le2("err");
				
	},		
	
	
	
	
	

}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

});



