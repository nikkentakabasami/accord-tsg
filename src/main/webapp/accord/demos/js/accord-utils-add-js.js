

import { accordUtils } from '../../js/accord-bundle.js';

let myVar = 10;

let currentJS;

$(function(){

	
	
	log(`myVar=${myVar}`);	
	
	$("#b1").click(e=>{
		currentJS  = accordUtils.addJSToPage("js/dt1.js");
		window.currentJS = currentJS;
	});
	
	$("#b2").click(e=>{
		currentJS = accordUtils.addJSToPage("js/dt2.js");
		window.currentJS = currentJS;
	});
	
	$("#b3").click(e=>{
		accordUtils.removeJSFromPage(currentJS);
		log(`${currentJS.src} removed!`);
		currentJS = null;
		
		/*
		if (currentJS){
			document.body.removeChild(currentJS);
			log(`${currentJS} removed!`);
			currentJS = null;
		}
		*/
		
	});
	
	
	
	
	
});



