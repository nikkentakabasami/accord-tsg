

import { AccSplitter } from '../../js/accord-splitter.js';

let splitterPanel1;


$(()=>{
	
	$("#b1").click(e=>{
		
		splitterPanel1 = new AccSplitter(	{
			panelSelector: "#mySplitPanel1",
			startLeftPanelWidth: 300
		});
		
	});	
	
	
	
	
});




