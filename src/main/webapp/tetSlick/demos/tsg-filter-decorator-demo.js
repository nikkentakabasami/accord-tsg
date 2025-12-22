//import { TetSlickGrid, tsgUtils } from '../tet.slick.grid.js';

import {NumberRangeModule} from '../mtp/tet.slick.grid.numberRange.js';

import {MultiselectModule,initMultiselect} from '../mtp/tet.slick.grid.multiselect2.js';

import {TsgDataSource1} from './tsgDataSource1.js'


let dataSource;
let ms;

$(()=>{
	
	dataSource = new TsgDataSource1(100);
	
	
	let m = new NumberRangeModule();
	m.initNumberFilter($("#fname2"));
	
	
	ms = initMultiselect($("#select1"), dataSource.fruits, null, (val)=>{
		alert("selected: "+val)
//		console.log("selected:",val);
	});
	
	window.ms = ms;
	
//	initNumberFilter($("#fname2"), null);
	
	
	
	
	
	
});


