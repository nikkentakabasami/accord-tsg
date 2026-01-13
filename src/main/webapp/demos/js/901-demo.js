


let startX;
let startWidth;
let isResizing = false;

let $resizer;
let $leftPanel;


function mousemove(e) {
	if (isResizing) {
		
		let diff = e.clientX-startX;
		
	    let newWidth = Math.max(100, startWidth+diff);
	    $leftPanel.width(newWidth);
	}
	
}

function mouseup() {
    isResizing = false;
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
}

$(function(){
	
	$resizer = $(".sp-resizer");
	$leftPanel = $(".sp-left");
	
	
	$resizer.mousedown(e=>{
		isResizing = true;
		startX = e.clientX;
		startWidth = $leftPanel.width();
		
		document.addEventListener("mousemove", mousemove);
	    document.addEventListener("mouseup", mouseup);
	});
		
});


