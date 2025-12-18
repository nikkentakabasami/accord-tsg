/**  
 * Содержит различные вспомогательные функции и константы.
 * Объект tsgUtils - центральный хаб для доступа к ним. 
 *   
 **/

import {tableEvents} from './tet.slick.grid.events.js';
import {matchTypes} from './tet.slick.grid.misc.js';


let scriptSrc = import.meta.url;


export let tsgUtils = {
	tableEvents: tableEvents,
	tetSlickRelativePath: scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1),
	matchTypes: matchTypes,
	mkColDesc: mkColDesc,
	mkSortColDesc: mkSortColDesc,
	mkExpSortColDesc: mkExpSortColDesc,
	nameFormatter: nameFormatter,
	checkmarkFormatter: checkmarkFormatter,
//	getPosition: getPosition,
	loadFragment: loadFragment,
	
}


//загрузка в dom фрагментов из папки  fragments
function loadFragment(fragmentFileName, $target){
	return accordUtils.loadHtmlFragmentXHR(tsgUtils.tetSlickRelativePath+"fragments/"+fragmentFileName, $target, false);	
}


//вспомогательная функция для создания объекта с описанием столбца таблицы
function mkColDesc(id,name,width,sort,formatter,editor) {
	
	let col = {
			id : id,
			name : name
		};

	if (width){
		col.width = width;
	}
	if (sort){
		col.sort = sort;
	}
	if (formatter){
		col.formatter = formatter;
	}
	if (editor){
		col.editor = editor;
	}
	return col;
	
}

//с заданием имени столбца, который используется для сортировки
function mkSortColDesc(id,name,sortName,width,sort,formatter,editor) {
	
	let col = {
			id : id,
			name : name,
			sortName : sortName,
		};

	if (width){
		col.width = width;
	}
	if (sort!=null){
		col.sortable = sort;
	}
	if (formatter){
		col.formatter = formatter;
	}
	if (editor){
		col.editor = editor;
	}
	return col;
	
}

function mkExpSortColDesc(id,name,sortName,width,sort,formatter) {
	let col = mkSortColDesc(id,name,sortName,width,sort,formatter);
	col.exp = true;
	return col;
}




export function nameFormatter(rowNo, column, value, row) {
	if (value){
		return value.name;
	}
	return "";
}


function checkmarkFormatter(rowNo, column, value, row) {
  return value ? '<div class="tick-png"></div>' : '';
}



window.tsgUtils = tsgUtils;

/*
export function fixSelectTextToVal(selector){
	
	$(selector+" option").each(function() {
	  let $opt = $(this);
	  let val = $opt.val();
	  if (!val){
	    return;
	  }
	  let text = $opt.text();
	  $opt.val(text);
	});		
	
}
*/



$(document).ready(function() {



});






