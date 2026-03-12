
let myVar = 10;

let currentJS;


//тестовые функции
//возвращают query-объекты, задействованные в тесте: они будут выделены красной рамкой
let selectorsData1 = {



	accordUtils_demo1:`
	accordUtils.accordPath;
	
	accordUtils.random(10);
	
	accordUtils.randomDate();
	
	accordUtils.formatDate(new Date());
	
	accordUtils.parseDate("05.05.2025");

	`,	
		
	addJSToPage1(){
		//addJSToPage(jsHref, onload) - добавляет в документ js-файл (и выполняет его)
		
		
		selectorsData1.removeJSFromPage();	
		currentJS  = accordUtils.addJSToPage("js/dt1.js");
		window.currentJS = currentJS;
		
		let code = accordUtils.loadFileAsString(currentJS.src);
//		log2("added file",currentJS.src);
//		log2(code);
		
		
	},
	addJSToPage2(){
		selectorsData1.removeJSFromPage();	
		currentJS = accordUtils.addJSToPage("js/dt2.js");
		window.currentJS = currentJS;
		
	},
	removeJSFromPage(){
		if (currentJS){
			accordUtils.removeJSFromPage(currentJS);
			log2(`${currentJS.src} removed!`);
			currentJS = null;
		}
	},

	
	


}





$(() => {
  initDemoCodeSelect("#selectors1", selectorsData1);
	
	//выбрать опцию после загрузки страницы 
	$("#selectors1").val("accordUtils_demo1").trigger("change");


});



