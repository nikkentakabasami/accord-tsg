


let textSample1;
let regex;








//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = [

	"/ой/gi",
	"/reloa/g",
	
	//выделить комменты
	"/^.*\\/\\/.*/gm",
		
]

let textSampleData = {
	
	sample1: "hellow",
	sample2: "momiji",
	demojs: ""
	
	
}


function testExpression(re){
	
	regex = accordUtils.stringToRegex(re);
	
//	logRegexParams();

	//копируем текст в буфер обмена
//	accordUtils.copyTextToBuffer(currentFunc);		

	le2("regex");
	
	accordUtils.highlightText({
		$div: $log1,
		regex: re
	});
	
	
	
	
}




function initRegexSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
		let v = $sel.children("option:selected").text();
		$selectorText.val(v);
  });
  
  let opts =   {
  	data: data,
  	withNullOption: true,
  	selectedValue: null,
  	contentIsValue: false,
		valueIsIndex: true
  };
  
  accordUtils.fillSelect($sel, opts);

}




$(() => {
	textSampleData.demojs = accordUtils.loadFileAsString("../js/006-demo.js");
	
//	textSample1 = accordUtils.loadFileAsString("../js/006-demo.js");
//	logTextSample(textSample1);
	
	initDemoCodeSelect("#selectors1", textSampleData);
	
  initRegexSelect("#regexps", selectorsData1);

	$("#selectors1").val("demojs").trigger("change");
	$("#regexps").val("2").trigger("change");
	
	
	$("#bTestRegex").click(e => {
		$log2.text("");
		let v = $selectorText.val();
		
		testExpression(v);
		
		});	
	
	

		
	
  reloadSandbox();

});



