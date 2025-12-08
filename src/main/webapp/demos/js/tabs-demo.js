


let $tabs;
let $tabContents;
let selectedTab;

$(function() {

	$tabs = $(".tab") 
	$tabContents = $(".tab-content") 
	
	$tabs.click(function(e){
		
		
		
		$tabs.removeClass("active");
		selectedTab = $(this).addClass("active").data("tab");
//		let t = $(this).data("tab");
//		alert (t);
		
		

		
		$tabContents.removeClass("active");
		$("#tab-"+selectedTab).addClass("active");
		
		
	});
	

})




/*

$(function() {

	// Получаем все кнопки закладок
	const tabs = document.querySelectorAll('.tab');

	// Обработчик клика по любой закладке
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// Удаляем активный класс у всех закладок
			tabs.forEach(t => t.classList.remove('active'));
			// Добавляем активный класс выбранной закладке
			tab.classList.add('active');

			// Получаем все содержимое вкладок
			const contents = document.querySelectorAll('.tab-content');
			// Скрываем все содержимое
			contents.forEach(content => content.classList.remove('active'));

			// Показываем содержимое выбранной вкладки
			const selectedTab = tab.getAttribute('data-tab');
			document.getElementById('tab-' + selectedTab).classList.add('active');
		});
	});


})

*/


