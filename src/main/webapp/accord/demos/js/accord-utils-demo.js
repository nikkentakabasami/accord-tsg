



$(function(){
	
	accordUtils.decorInput($("#tf1"),{
		addButton: true,
	});
	
	accordUtils.decorInput($("#tf2"),{
		addButton: true,
		buttonClasses: "acc-btn-check",
		placeButtonBefore: false,
		buttonHandler: e=>{
			alert("hello");
		}
	});
	
	
	
	
});



