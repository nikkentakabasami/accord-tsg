
//let st = window.getComputedStyle($(".flexPane:eq(0)").get(0))
//st.cssText


let flexCss = ["display",
	
	//Направление главной оси
	"flex-direction",
	
	//как будут выровнены элементы вдоль главной оси.
	"justify-content",
	
	//как будут выровнены элементы вдоль поперечной оси.
	"align-items",
	
	//отвечает за многострочность
	"flex-wrap",
	
	
	//на сколько отдельный flex-блок может быть больше соседних элементов, если это необходимо.
	"flex-grow",

	//сжимаемость блока - насколько он будет уменьшаться в случае недостатка свободного места
	"flex-shrink",

	//Задает изначальный размер по главной оси для flex-блока
	"flex-basis",


	
];



$(()=>{
	
	showCssStylesForElements(".flexPane",{
		showInContent: false,
		showInPrevSibling: true
	});
	showCssStylesForElements(".flexPane>div",	{
			showInContent: true,
			showInPrevSibling: false
		});
	
})
