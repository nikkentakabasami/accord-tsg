

let mainJsHref = null;

function findMainJs(){
	
	const scripts = document.querySelectorAll('script[src]');

	
	const jsFiles = Array.from(scripts).forEach(script => {
		let src = script.src;
		if (!src.endsWith("-demo.js")){
			return;
		}
		mainJsHref = src;
//		let ind = src.lastIndexOf("/");	
//		result = src.substring(ind+1);
	});

	console.log("mainJs="+mainJsHref);	
	return mainJsHref;
}

function fixSrcRef(){

	let src = findMainJs();
	if (!src){
		console.log("mainJs not found!");
		return;
	}
	
	$(".titlePanel a").attr("href",src);

}


function showMainJs(){
	
	let  options = {
		draggable: false,
//		centered: true,
//		width: "450px",
//		height: "300px",
		contentTextUrl: mainJsHref,
		hideOnClick: true,
		fullScreen: true,
		cssClass: "help-panel"
		
		
	}	
	let p1 = new AccPopup(options);
	p1.show();
	
}


let $log1;
let $logPanel;
function logMessage(mess) {
	
	$log1.append(mess+"<br>");

	//scroll to bottom	
	var h = $logPanel.prop('scrollHeight');
	$logPanel.scrollTop(h);	
	
	/*
	$('#log1').val(function(i, oldVal) {
		if (oldVal){
			return oldVal + "\n" + mess;
		} else {
			return mess;
		}
		
	});
	*/

}

let showAux = true;
let $hideAuxButton;

$(function() {
	
	$hideAuxButton = $("#hideAuxButton"); 
	$log1 = $('#log1');
	$logPanel = $('.logPanel');
	
	logMessage("Запуск");
	
	fixSrcRef();
	
	
	new AccSplitter({
		panelSelector: ".auxPanel",
		startLeftPanelWidth: 600
	});
	
	
	//показывать исходники при нажатии на ссылку
	$(".titlePanel a").click(e=>{
		e.preventDefault();
		showMainJs();
	});
	
	$hideAuxButton.click(e => {
		
		showAux = !showAux;
		if (showAux){
			$("div.auxPanel").css("display","flex");
			$hideAuxButton.text("скрыть описание");
		} else {
			$("div.auxPanel").css("display","none");
			$hideAuxButton.text("показать описание");
		}
		
		
	});
	
	
	let tp = new TabbedPanel("#tabbedPanel1");
	
	
	
	
});



