
let currentSelectorsData;
let $demoFilesSelect;
let currentFile = null;
let currentJS;

let demoFiles = [
	{
		fn: "js/003-td1.js",
		desc: "Тестовый набор демок 1"
	},
	{
		fn: "js/003-td2.js",
		desc: "Тестовый набор демок 2"
	},
	
	
];

function initDemoFilesSelect(selector = "#demoFilesSelect", selectedValue = null) {

	
//  let $sel = $(selector);
  $demoFilesSelect.change(e => {
    let v = $demoFilesSelect.val();
		let ind = Number(v);
		

		if (currentJS){
			accordUtils.removeJSFromPage(currentJS);
			currentJS=null;
		}
		
		//загружаем js-файл на страницу		
		currentFile = demoFiles[ind];
		currentJS = accordUtils.addJSToPage(currentFile.fn);
		
		//чистим селект с демками, сносим все его обработчики
		$sel1.empty();
		$sel1.off();
		
		setTimeout(()=>{
			initDemoCodeSelect($sel1, currentSelectorsData);
		},100);
		
		
		
		
//		log(v);
  });

	
	let data = demoFiles.map(v=>v.desc);
	

  let opts = {
    data: data,
    withNullOption: true,
    selectedValue: selectedValue,
		valueIsIndex: true,
		contentIsValue: false
  };

  accordUtils.fillSelect($demoFilesSelect, opts);

}



$(() => {
	
	$demoFilesSelect = $("#demoFilesSelect");
	
	initDemoFilesSelect();
	
//  initDemoCodeSelect("#selectors1", selectorsData1);
//	$("#demoFilesSelect").val("le_demo2").trigger("change");


});









