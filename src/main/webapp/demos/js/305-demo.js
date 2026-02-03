



$(()=>{
	
	showCssStylesForElements(".wrapper",{
		showInContent: false,
		showInPrevSibling: true
	});
	showCssStylesForElements(".wrapper>div",	{
			showInContent: true,
			showInPrevSibling: false
		});
		
	showStyleTagText();
		
	
//	makeFlexStylesTooltip();
})
