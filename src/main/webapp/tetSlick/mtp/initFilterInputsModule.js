

import {MultiselectModule,initMultiselect} from '../tet.slick.grid.multiselect.js';
import {DateRangeModule, initTableDateRange} from './tet.slick.grid.dateRange.js';
import {NumberRangeModule, initNumberFilter,loadNumberFilterDialog} from './tet.slick.grid.numberRange.js';



/**
 * Этот модуль предназначен для страниц с формами поиска (вроде customerContractsSearch).
 * Он инициализирует инпуты с классами .date-input, .number-input привязывая к ним диалоги выбора чисел и дат.
 * Так же инициализирует мультиселекты.
 */
$(document).ready(function(){
  
	loadNumberFilterDialog();

	$('input.date-input').each(function( index ) {
		initTableDateRange($(this));
	});

	$('input.number-input').each(function( index ) {
		initNumberFilter($(this));
	});


  $("select[multiple]").each(function( index ) {
    let $filter = $(this);
    
	initMultiselect($filter, null, null);
    
  });
  
});
