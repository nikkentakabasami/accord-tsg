
let $myPopup;

//демо-функции.
//при вызове addDemoButtons - для каждой такой функции будет создана и добавлена демо-кнопка (на acc-button-panel)
let buttonHandlers1 = {
	
	test1_decorInput(){
		
		
		//decorInput - декорирует input, добавляя к нему кнопку (впереди или позади) с заданной иконкой.
		accordUtils.decorInput($("#tf1"));
	
		accordUtils.decorInput($("#tf2"),{
			addButton: true,
			buttonClasses: "acc-btn-check",
			placeButtonBefore: false,
			buttonHandler: e=>{
				log2("hello");
			}
		});
	},
	test2_loadHtmlFragmentXHR(){
		
		//loadHtmlFragmentXHR(fragmentUrl, $target, relativeToAccord = false)
		//загружает html-фрагмент в заданный контейнер ($target) или body (если контейнер не задан)
		//использует для этого объект XMLHttpRequest (считается устаревшим способом).
		//Загружает синхронно.
		
		accordUtils.loadHtmlFragmentXHR("demos/misc/testFragment.html","#testFragment1",true);
		log("loadHtmlFragmentXHR finished");
		
		
	},
	test3_loadHtmlFragmentFetch(){
		
		//loadHtmlFragmentFetch(fragmentUrl, $target, relativeToAccord = false) 
		//загружает html-фрагмент в заданный контейнер ($target) или body (если контейнер не задан)
		//использует для этого метод fetch(url).
		//Возвращает promise, так что загружать можно синхронно или асинхронно.
		accordUtils.loadHtmlFragmentFetch("demos/misc/testFragment.html","#testFragment2",true)
		.then(result => {
			log("loadHtmlFragmentFetch finished");
		});
	},
	test4_alignToCenter(){
		//alignToCenter($panel) - Располагает панель с абсолютным позиционированием по центру браузера	
		
		$myPopup.css("display","flex");
	},	


	
}

function popupInit(){
	$myPopup = $("#myPopup"); 
	
	$myPopup.click(e=>{
		accordUtils.alignToCenter($myPopup);
	});

	$myPopup.dblclick(e=>{
		$myPopup.css("display","none");
	});
		
	
}


$(document).ready(function() {

	//для демо-функции можно задать связанную функцию, которая будет выводится в лог при её выполнении.
	buttonHandlers1.test4_alignToCenter.init = popupInit;
	
	//добавляем демо-кнопки
	addDemoButtons(buttonHandlers1)
	
	popupInit();
	
	demoOptions.beforeExecDemoFunc = ()=>{
		reloadSandbox();
	};

	//сразу запускаем первую демку
	demoButtons[0].trigger("click");
		
	
});





