


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


let selectorsData2 = [
	"#inp1",
	".workPanel *:input",
];


$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);
  initDemoCodeSelect("#selectors2", selectorsData2);

  reloadSandbox();

});



