//import { TetSlickGrid, tsgUtils } from '../tet.slick.grid.js';

import {NumberRangeModule} from '../mtp/tet.slick.grid.numberRange.js';

import {MultiSelectFilter} from '../mtp/tet.slick.grid.multiselect.js';

import {TsgDataSource1} from './tsgDataSource1.js'


let dataSource;
let ms;

$(()=>{
	
	dataSource = new TsgDataSource1(100);
	
	
	let m = new NumberRangeModule();
	m.initNumberFilter($("#fname2"));
	
	
	m = new MultiSelectFilter(null, "select1", $("#select1"), dataSource.fruits);
	m.init();
	
	m.addChangeListener(val=>{
		alert("selected: "+val)
	})
	
	
	
	window.ms = ms;
	
//	initNumberFilter($("#fname2"), null);
	/*
	, (val)=>{
				alert("selected: "+val)
			}	*/
	
	
	
	
	
});


