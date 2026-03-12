

import {AccDaterangepickerUtils} from '../../js/accord-bundle.js';

let buttonHandlers1 = {
	
	test1_daterangepicker(){
		//тестируем библиотеку daterangepicker
		//Она добавляет к полю ввода пикер для выбора даты (или диапазона дат).
		
		let defaultOptions = {
			
			//задаём русскую локализацию
			locale: AccDaterangepickerUtils.dateRangeLocale,
			
			//В какую сторону показывать picker
			drops: 'up',
		};
		
		//вид по умолчанию
		//выбирает диапазон дат
		$("#tf1").daterangepicker(defaultOptions);



		//Выбор только даты, показывать выпадающие списки для годов и месяцев
		let options = $.extend(
			{},
			defaultOptions,
			{
				singleDatePicker: true,
				showDropdowns: true,
				minYear: 1951,
				maxYear: parseInt(moment().format('YYYY'), 10),
				startDate: "20.04.1982",
			});
		$("#tf2").daterangepicker(options, function(start, end, label) {
			var years = moment().diff(start, 'years');
			log2("You are " + years + " years old!");
		});
		
		
	},
	test2_AccDaterangepickerUtils(){
		//AccDaterangepickerUtils - Вспомогательные функции, опции, локализации для работы с библиотекой daterangepicker.js.
		//Умеет декорировать поле ввода, добавляя к нему кнопки.
		//список доп. опций, которые можно задать: AccDaterangepickerUtils.addOptionsDefault
		
		// С презаданными диапазонами 
		AccDaterangepickerUtils.initDateEditor($("#tf1"), {
			drops: 'up',
			//Не скрывать при выборе
			dontHideOnSelect: true,
			//Добавить вспомогательную кнопку
			decorInput: true,
			changeCallback: (val,$input)=>{
				log2('selected date:'+val);
			}
		});

		//Выбор диапазона
		AccDaterangepickerUtils.initDateRangeEditor($("#tf2")	, {
			drops: 'up',
				decorInput: true,
				decorButtonClasses: "acc-btn-eye",
				changeCallback: (val,$input)=>{
					log2('selected range:'+val);
				}
		});
	},
	test3_AccDaterangepickerUtils(){
		
		//Выбор даты
		AccDaterangepickerUtils.initDateEditor($("#tf1"), {
			drops: 'up',
			decorInput: true,
			autoApply: false,
			changeCallback: (val,$input)=>{
				log2('selected date:'+val);
			}
		});	
	},
	
}



$(function() {

//	reloadSandbox();

	//добавляем демо-кнопки
	addDemoButtons(buttonHandlers1)

	demoOptions.beforeExecDemoFunc = ()=>{
		reloadSandbox();
	};
	
	
	//сразу запускаем первую демку
	demoButtons[0].trigger("click");
	
//	buttonHandlers1.test1_daterangepicker();	
	
	
//	log(String(init));
	



});



