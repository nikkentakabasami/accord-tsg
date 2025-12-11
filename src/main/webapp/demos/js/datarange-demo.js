

var dateRangeFormat = "DD.MM.YYYY";

var dateRangeLocale = {
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
};


function asRange(d) {
	return [d, d];
}



function initDateEditor($input, changeCallback) {

	var drops = "down";
	var inputTop = $input.get(0).getBoundingClientRect().top;
	if (inputTop >= 450) {
		drops = "up";
	}


	var currMonth = parseInt(moment().format('MM'), 10);
	var oddQuartalMonth = (currMonth - 1) % 3;
	var startOfQuartal = moment().startOf('month').subtract(oddQuartalMonth, 'month');

	var ranges = {
		'Текущая дата': asRange(moment()),
		'Текущий месяц': asRange(moment().startOf('month')),
		'Предыдущий месяц': asRange(moment().subtract(1, 'month').startOf('month')),
		'Последний квартал': asRange(startOfQuartal),
		'Начало года': asRange(moment().startOf('year')),
		'Предыдущий год': asRange(moment().subtract(1, 'year').startOf('year'))
	}

	var options = {
		singleDatePicker: true,
		showDropdowns: true,
		opens: 'right',
		autoUpdateInput: true,
		autoApply: true,
		locale: dateRangeLocale,
		ranges: ranges,
		drops: drops
	};

	$input.daterangepicker(options);

	$input.on('apply.daterangepicker', function(ev, picker) {

		let val = picker.startDate.format('DD.MM.YYYY');
		
		//не прятать при выборе даты
		$input.focus();

		if (changeCallback) {
			changeCallback($input, val);
		}

	});


}



function initTableDateRange($input, changeCallback) {

	let $calIcon = $('<span class="input-group-addon glyphicon glyphicon-calendar" style="color: #31708f;top:0px;"></span>');
	$calIcon.click(e => {
		$input.trigger( "click" );
	});
    $input.wrap( '<div class="input-group"></div>' ).before($calIcon)



  var currMonth = parseInt(moment().format('MM'), 10);
  var oddQuartalMonth = (currMonth - 1) % 3;
  var startOfQuartal = moment().startOf('month').subtract(oddQuartalMonth,
      'month');
  var q1 = startOfQuartal.clone().subtract(3, 'month');
  var q2 = startOfQuartal.subtract(1, 'day');

  
  var ranges = {
      'Период' : [ q1, q2 ],
      'До даты' : [ q1, q2 ],
      'После даты' : [ q1, q2 ],
      'Равно дате' : [ q1, q2 ],
      'Текущий год' : [ q1, q2 ],
      'Год по календарю' : [ q1, q2 ],
      'Текущий квартал' : [ q1, q2 ],
      'I квартал' : [ q1, q2 ],
      'II квартал' : [ q1, q2 ],
      'III квартал' : [ q1, q2 ],
      'IV квартал' : [ q1, q2 ],
      'Текущий месяц' : [ q1, q2 ],
      'Месяц по календарю' : [ q1, q2 ]
  }

  var minDate = moment().startOf('year').set('year', 2005);
  var maxDate = moment().startOf('year').add(2, 'year');
  
  var options = {
    opens : 'left',
    autoUpdateInput : false,
    autoApply : false,
    showDropdowns : true,
//    startDate : moment().startOf('year').subtract(4, 'year'),
//    endDate : moment().startOf('year'),
    linkedCalendars : false,
    alwaysShowCalendars : true,
    // minYear: 2005,
    // maxYear: currYear,
    locale : dateRangeLocale,
    ranges : ranges,
    minDate : minDate,
    maxDate : maxDate,
    showCustomRangeLabel : false
  };

  $input.daterangepicker(options);
  
  $input.on('apply.daterangepicker', function(ev, picker) {

    if (picker.clear){
      $input.val('');
      
      if (changeCallback){
		  changeCallback($input,'');
	  }
      return;
    }
    
    
    var val1 = picker.startDate.format(dateRangeFormat);
    var val2 = picker.endDate.format(dateRangeFormat);
    
    if (picker.relativity!=null){
      $input.val(picker.relativity+val1);
    } else if (val1==val2) {
      $input.val(val1);
    } else {
      $input.val(val1+'-'+val2);
    }
    
    if (changeCallback){
		changeCallback($input,'');
	}
	
  });


}







$(function() {


	//	this.options = $.extend({}, tableDefaults, options);

	let defaultOptions = {
		locale: dateRangeLocale,
	};


	$("#tf1").daterangepicker(defaultOptions);



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
		alert("You are " + years + " years old!");
	});




	initDateEditor($("#tf3"));

	initTableDateRange($("#tf4"));

	
	



});






