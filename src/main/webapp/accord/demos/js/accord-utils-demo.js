

import { accordUtils } from '../../js/accord-bundle.js';


$(function(){

	
	$("#b1").click(e=>{
		
		//декорирует input, добавляя к нему кнопку (впереди или позади) с заданной иконкой.
		accordUtils.decorInput($("#tf1"));
		
		accordUtils.decorInput($("#tf2"),{
			addButton: true,
			buttonClasses: "acc-btn-check",
			placeButtonBefore: false,
			buttonHandler: e=>{
				alert("hello");
			}
		});
		
	});
	
	$("#b2").click(e=>{
		accordUtils.loadHtmlFragmentXHR("demos/misc/testFragment.html","#testFragment1",true);
		log("loadHtmlFragmentXHR finished");
	});
	
	$("#b3").click(e=>{
		accordUtils.loadHtmlFragmentFetch("demos/misc/testFragment.html","#testFragment2",true)
		.then(result => {
			log("loadHtmlFragmentFetch finished");
		});
	});
		
	let $myPopup = $("#myPopup"); 
	$("#b4").click(e=>{
		$myPopup.css("display","flex");
	});
	
	$myPopup.click(e=>{
		accordUtils.alignToCenter($myPopup);
	});

	$("#b5").click(e=>{
		
		clearLog();
		let today= new Date();
		
		log("accordUtils.accordPath="+accordUtils.accordPath);
		
		log("accordUtils.random(10)="+accordUtils.random(10));
		log("accordUtils.randomDate()="+accordUtils.randomDate());
		log("accordUtils.formatDate(today)="+accordUtils.formatDate(today));
		log('accordUtils.parseDate("05.05.2025")='+accordUtils.parseDate("05.05.2025"));
		
	});
	
	
	
	
	
	
	
	
});



