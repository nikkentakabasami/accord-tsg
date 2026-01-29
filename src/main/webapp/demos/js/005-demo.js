


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  test_func1: function() {
	//назначает обработчик на все инпуты
	return $("#formDiv1 input").bind("click", event => {
		  log("inp click.");
		});
  },

  
}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);

  reloadSandbox();

});



