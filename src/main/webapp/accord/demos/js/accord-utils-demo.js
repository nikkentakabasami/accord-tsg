

import { accordUtils } from '../../js/accord-bundle.js';


$(function(){
	
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
	
	
	let $accpop1 = $("#accpop1"); 
	
	$accpop1.click(e=>{
		accordUtils.alignToCenter($accpop1);
	});
	
	$("#accordPath").text(accordUtils.accordPath);
	
	
	accordUtils.loadHtmlFragmentXHR("demos/misc/testFragment.html","#testFragment1",true);
	
	accordUtils.loadHtmlFragmentFetch("demos/misc/testFragment.html","#testFragment2",true)
	.then(result => {
		console.log("loaded:",result);
	});
	
	
	
});



