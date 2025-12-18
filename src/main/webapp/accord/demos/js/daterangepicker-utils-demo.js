

import {AccDaterangepickerUtils} from '../../js/accord-bundle.js';



$(function() {


	//	this.options = $.extend({}, tableDefaults, options);

	let defaultOptions = {
		locale: AccDaterangepickerUtils.dateRangeLocale,
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




	AccDaterangepickerUtils.initDateEditor($("#tf3"), {
		dontHideOnSelect: true,
		decorInput: true,
		changeCallback: (val,$input)=>{
			console.log('selected date:'+val);
		}
	});
	
	AccDaterangepickerUtils.initDateRangeEditor($("#tf4")	, {
			decorInput: true,
			decorButtonClasses: "acc-btn-eye",
			changeCallback: (val,$input)=>{
				console.log('selected range:'+val);
			}
		});

		AccDaterangepickerUtils.initDateEditor($("#tf5"), {
			decorInput: true,
			autoApply: false,
			changeCallback: (val,$input)=>{
				console.log('selected date:'+val);
			}
		});
	
	



});



