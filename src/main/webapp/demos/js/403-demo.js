


let $workPanel;



//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {

  bind_inp_click: function() {
	//назначает обработчик на все инпуты
	return $(".panel1 input").bind("click", clickHandler);
  },
  


}


function execDemoFunc(func) {
  if (!func) {
	return;
  }


  clearLog();
  log(String(func));
  let result = func();

  let logMess = 'executed. ';
  if (result && result.jquery) {
	result.addClass("red-border");
	logMess += "elements found: " + result.length;

  }
  log(logMess);

}

let currentFunc = null;

function initSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
	clearLog();
	let v = $sel.val();
	currentFunc = selectorsData1[v];
	let funcCode = String(currentFunc);
	log(funcCode);

  });
  accordUtils.fillSelect($sel, {
	data: data,
	withNullOption: true,
	selectedValue: null,
	contentIsValue: true,
  });

}


$(() => {

  $workPanel = $(".workPanel");

  initSelect("#selectors", selectorsData1);

  $("#b1").click(e => {
	if (!currentFunc) {
	  return;
	}
	execDemoFunc(currentFunc);
  });





});



