
/** 
 * Вспомогательные функции, опции, локализации для работы с библиотекой daterangepicker.js.
 * 
 * В самой библиотеке я вручную закомментил обработчик 'focus.daterangepicker', чтобы не всплывал при фокусе
 * 
 **/

import { accordUtils } from './accord-utils.js';


let dateRangeFormat = "DD.MM.YYYY";


export let tsgDaterangepickerUtils = {
	dateRangeFormat: dateRangeFormat,
	dateRangeLocale: {
		"format": dateRangeFormat,
		"separator": " - ",
		"applyLabel": "Применить",
		"cancelLabel": "Отмена",
		"fromLabel": "From",
		"toLabel": "To",
		"customRangeLabel": "Кастомный период",
		"weekLabel": "W",
		"daysOfWeek": [
			"Вс",
			"Пн",
			"Вт",
			"Ср",
			"Чт",
			"Пт",
			"Сб"
		],
		"monthNames": [
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь"
		],
		"firstDay": 1
	},
	initDateEditor: initDateEditor,
	initDateRangeEditor: initDateRangeEditor,

	//пример доп. опций, которые можно задавать в функции initDateEditor, initDateRangeEditor
	addOptionsDefault: {
		//не прятать popup даже после выбора даты
		dontHideOnSelect: false,
		//добавить в input decor-кнопку (в качестве оформления)
		decorInput: false,

		//обработчик выбора
		changeCallback: (val, $input) => {
			console.log('selected date:' + val);
		},

		//классы на decor-кнопку
		decorButtonClasses: "acc-btn-calendar",

		//поместить decor-кнопку перед инпутом (иначе - после)
		placeButtonBefore: true,

		//обработчик decor-кнопки
		buttonHandler: e => {
			$input.trigger("click");
		}
	}



}

window.tsgDaterangepickerUtils = tsgDaterangepickerUtils;




/** 
 * Задаёт функционал выбора даты в input.
 * Можно задать собственные опции для daterangepicker, которые перезапишут опции по умолчанию.
 * см. addOptionsDefault
 * 
 */
function initDateEditor($input, addOptions) {

	let drops = "down";
	/*
	let inputTop = $input.get(0).getBoundingClientRect().top;
	if (inputTop >= 450) {
		drops = "up";
	}
	*/


	let currMonth = parseInt(moment().format('MM'), 10);
	let oddQuartalMonth = (currMonth - 1) % 3;
	let startOfQuartal = moment().startOf('month').subtract(oddQuartalMonth, 'month');

	function asRange(d) { return [d, d]; }

	let ranges = {
		'Текущая дата': asRange(moment()),
		'Текущий месяц': asRange(moment().startOf('month')),
		'Предыдущий месяц': asRange(moment().subtract(1, 'month').startOf('month')),
		'Последний квартал': asRange(startOfQuartal),
//		'Начало года': asRange(moment().startOf('year')),
//		'Предыдущий год': asRange(moment().subtract(1, 'year').startOf('year'))
	}

	let options = {
		singleDatePicker: true,
		showDropdowns: true,
		opens: 'right',
		autoUpdateInput: true,
		autoApply: true,
		autoUpdateInput: false,
		locale: tsgDaterangepickerUtils.dateRangeLocale,
		ranges: ranges,
		alwaysShowCalendars: true
//		drops: "up"
//		drops: drops
	};

	if (addOptions) {
		options = $.extend(options, addOptions);
	}

	if (options.decorInput) {

		let decorOptions = {
			addButton: true,
			decorButtonClasses: "acc-btn-calendar",
			placeButtonBefore: true,
			buttonHandler: e => {
				$input.trigger("click");
			}
		};

		decorOptions = $.extend(decorOptions, addOptions);
		accordUtils.decorInput($input, decorOptions);
	}


	$input.daterangepicker(options);

	$input.on('apply.daterangepicker', function(ev, picker) {
		let val = picker.startDate.format('DD.MM.YYYY');
		if (picker.clear) {
			val = "";
		}
		$input.val(val);
		
		if (options.dontHideOnSelect) {
			//не прятать при выборе даты
			$input.click();
		}

		if (options.changeCallback) {
			options.changeCallback(val, $input);
		}
		setTimeout(()=>{$input.focus();},200);

	});


}


function initDateRangeEditor($input, addOptions) {

	var currMonth = parseInt(moment().format('MM'), 10);
	var oddQuartalMonth = (currMonth - 1) % 3;
	var startOfQuartal = moment().startOf('month').subtract(oddQuartalMonth,
		'month');
	var q1 = startOfQuartal.clone().subtract(3, 'month');
	var q2 = startOfQuartal.subtract(1, 'day');


	var ranges = {
		'Период': [q1, q2],
		'До даты': [q1, q2],
		'После даты': [q1, q2],
//		'Равно дате': [q1, q2],
		'Текущий год': [q1, q2],
//		'Год по календарю': [q1, q2],
		'Текущий квартал': [q1, q2],
		'I квартал': [q1, q2],
		'II квартал': [q1, q2],
		'III квартал': [q1, q2],
		'IV квартал': [q1, q2],
//		'Текущий месяц': [q1, q2],
//		'Месяц по календарю': [q1, q2]
	}

	var minDate = moment().startOf('year').set('year', 2005);
	var maxDate = moment().startOf('year').add(2, 'year');

	var options = {
		opens: 'left',
		autoUpdateInput: false,
		autoApply: false,
		showDropdowns: true,
		//    startDate : moment().startOf('year').subtract(4, 'year'),
		//    endDate : moment().startOf('year'),
		linkedCalendars: false,
		alwaysShowCalendars: true,
		// minYear: 2005,
		// maxYear: currYear,
		locale: tsgDaterangepickerUtils.dateRangeLocale,
		ranges: ranges,
		minDate: minDate,
		maxDate: maxDate,
		showCustomRangeLabel: false
	};

	if (addOptions) {
		options = $.extend(options, addOptions);
	}

	if (options.decorInput) {

		let decorOptions = {
			addButton: true,
			decorButtonClasses: "acc-btn-calendar",
			placeButtonBefore: true,
			buttonHandler: e => {
				$input.trigger("click");
			}
		};

		decorOptions = $.extend(decorOptions, addOptions);
		accordUtils.decorInput($input, decorOptions);
	}




	$input.daterangepicker(options);

	$input.on('apply.daterangepicker', function(ev, picker) {

		setTimeout(()=>{$input.focus();},200);
		if (options.dontHideOnSelect) {
			//не прятать при выборе даты
			$input.click();
		}

		if (picker.clear) {
			$input.val('');

			if (options.changeCallback) {
				options.changeCallback('', $input);
			}
			return;
		}

		let val1 = picker.startDate.format(dateRangeFormat);
		let val2 = picker.endDate.format(dateRangeFormat);

		let val = null;

		//добавил вручную атрибут relativity прямо в daterangepicker чтобы поддерживать опции вроде 'После даты'
		if (picker.relativity != null) {
			val = picker.relativity + val1;
		} else if (val1 == val2) {
			val = val1;
		} else {
			val = val1 + '-' + val2;
		}
		$input.val(val);

		if (options.changeCallback) {
			options.changeCallback(val, $input);
		}

	});


}








