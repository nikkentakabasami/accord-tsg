/**    **/

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
//	defaultFormatter: defaultFormatter,
	checkmarkFormatter: checkmarkFormatter,
	getPosition: getPosition,
	generateSelectFilter: generateSelectFilter,
	loadFragment: loadFragment
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


//вычисляет положение заданного тега в окне
function getPosition(e){
	var left = 0
	var top  = 0

	while (e.offsetParent){
		left += e.offsetLeft
		top  += e.offsetTop
		e	 = e.offsetParent
	}

	left += e.offsetLeft
	top  += e.offsetTop

	return {x:left, y:top}
}


function generateSelectFilter(name, data, withNullOption) {
	
	let optionsCode = withNullOption?'<option value="">-</option>':'';
	
	data.forEach(item=>{
		optionsCode+=`<option value="${item.id}">${item.name}</option>`;
	});
	
	$select = $("select[name='section']");
	if ($select.length==0){
		$select = $(`<select name="${name}"></select>`);
	}
	
	$select.append(options);
	return $select;	
	
}


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






