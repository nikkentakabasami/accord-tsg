


let textSample1;








//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = [

	"/ой/gi",
	"/ОЙ/g",
		
]



function testExpression(text, re){
	textSample = text;
	regex = re;
//	logRegexParams();

	le2("regex");
	
	const matches = textSample.matchAll(regex);
	for (const match of matches) {
		log2("match=",match,", match.index=",match.index);
	}
	
	result = lf2(() => {
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
	textSample1 = accordUtils.loadFileAsString("../js/006-demo.js");
	logTextSample(textSample1);
	
  initRegexSelect("#selectors1", selectorsData1);

	$("#selectors1").val("1").trigger("change");	
	
	
	$("#bTestRegex").click(e => {
		let v = $selectorText.val();
		$log2.text("");

		let re = v.split("/");
		
		let regExp = new RegExp(re[1],re[2]);
		
		testExpression(textSample1, /ой/gi);
		
		});	
	
		accordUtils.highlightText($log1, {
			startIndex: 5,
			length: 40,
		});
	

		
	
  reloadSandbox();

});



