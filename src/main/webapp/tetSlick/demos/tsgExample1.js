

import { TetSlickGrid } from '../tet.slick.grid.js';

let myGrid;

let columns = [
	{
		id: "title", 
		name: "Title",
		width: 150 
	},{
		id: "duration", 
		name: "Duration",
		width: 150 
	},{
		id: "percentComplete", 
		name: "% Complete",
		width: 150 
	},{
		id: "start", 
		name: "Start",
		width: 150 
	},{
		id: "finish", 
		name: "Finish",
		width: 150 
	},{
		id: "effortDriven", 
		name: "Effort Driven",
		width: 150 
	}
];

let options = {
	singleRowSelectionModel: true
};


$(function() {

	let myData = makeTableData1(50);

	myGrid = new TetSlickGrid("#myGrid", myData, columns, options);

	window.myGrid = myGrid;

//	showWaitPanel("test");
	
})

