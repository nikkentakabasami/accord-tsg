
import {tsgUtils} from './tet.slick.grid.utils.js';


/**
 * Выполняет локальную фильтрацию.
 * Вспомогательный объект для LocalDataLoader.
 * 
 */
export class LocalFilter {

//	dataLoader;
	grid;
	columns;

	matchers;

	
	

	constructor(grid) {
		this.grid = grid;



	}

	init() {
		
		

//		this.dataLoader = grid.dataLoader;
		this.columns = this.grid.model.columns;

		
		//matchFunction

	}

	//вычисляем функции фильтрации для текущих условий фильтрации
	calcMatchers(filter){
		this.matchers = {};
		
		
		let firstRow = null;
		let data = this.grid.dataLoader.sourceData;
		if (data.length>0){
			firstRow = data[0];
		}
		
		
		
		
		this.columns.forEach(col=>{
			
			let matchFunction = col.matchFunction;
			if (!matchFunction){
			
				let filterVal = filter[col.id];
				if (!filterVal){
					return;
				}
				
				if (col.matchType==tsgUtils.matchTypes.AUTO_CALC){
					
					if (firstRow){

						let val = this.grid.model.extractRowCellValue(firstRow, col);
						let valType = typeof val;
						
						if (valType == "number"){
							matchFunction = calcMatchNumberFunction(filterVal)
						} else if (valType == "boolean"){
							matchFunction = matchBooleanFunction;
						} else {
//							matchFunction = matchEqualFunction;
							matchFunction = matchLikeFunction;
						}
					}	
				
				
				} else if (col.matchType==tsgUtils.matchTypes.NUMBER){
					matchFunction = calcMatchNumberFunction(filterVal)
					
				} else if (col.matchType==tsgUtils.matchTypes.STRING_LIKE){
					matchFunction = matchLikeFunction;
				} else {
					matchFunction = matchEqualFunction;
				}
			}
			this.matchers[col.id] = matchFunction;	
		});
		
		
	}
	

	filterRows(sourceData) {

		
		let filter = this.grid.filtersModel.makeFilterObject();
		
		this.calcMatchers(filter);
				
		let filterParams = Object.keys(filter);
		if (filterParams.length == 0) {
			return sourceData.slice();
		}
		
		let filteredData = [];

		for (let i = 0; i < sourceData.length; i++) {
			let row = sourceData[i];

			if (!this.rowFitFilter(row, filter)) {
				continue;
			}

			//		row = jsonCopy(row);
			filteredData.push(row);
		}

		return filteredData;
	}


	
	
	
	rowFitFilter(row, filter){
		
		for (let columnId in filter) {
			
			let matcher = this.matchers[columnId];
			if (!matcher){
				continue;
			}
			
			let val = this.grid.model.extractRowCellValue(row, columnId)+'';
			if (!val){
				return false;
			}
			let filterVal = filter[columnId];
			let r = matcher(filterVal, val);
			if (!r){
				return false;
			}
			
		}//for
		return true;
	}	
	
	

	
	
	
	
	
	
	
	
	
	
	
	

	

	sortRows(data, sortColumns){
		if (sortColumns.length==0){
			return;
		}
			
		data.sort((a, b)=> {
			
			for(let i=0;i<sortColumns.length;i++){
				let sc = sortColumns[i];
				
	//			let val1 = a[sc.columnId];
	//			let val2 = b[sc.columnId];
	
				let column = this.grid.model.columnsById[sc.columnId];
	
				let val1 = this.grid.model.extractRowCell(a,column.sortField);
				let val2 = this.grid.model.extractRowCell(b,column.sortField);
				
				let r = compareValues(val1,val2,sc.sortAsc);
				if (r!=0){
					return r;
				}
			}
			return 0;
		});
		
	}






}


function compareValues(val1,val2,sortAsc){
	let r;
	
	let type = typeof val1; 
	if (type === 'number' || type === 'boolean'){
		r = val1-val2;
	} else {
		r = val1.localeCompare(val2);
	}
	if (!sortAsc){
		r = -r;
	}
	return r;
}	



function matchLikeFunction(filterVal, val){
	return String(val).toLowerCase().indexOf(filterVal.toLowerCase())>=0; 			
}

function matchEqualFunction(filterVal, val){
	return String(val) == filterVal; 			
}

function matchNumberFunction(filterVal, val){
	return val == parseInt(filterVal);
}

function matchBooleanFunction(filterVal, val){
	return String(val) == filterVal;
}

	
function calcMatchNumberFunction(filterVal){
	
	let result;
	
	if (filterVal.startsWith(">=")){
		let fvi = filterVal.substring(2);
		result = (filterVal, val) => {
			return val>=fvi;
		}
	} else if (filterVal.startsWith("<=")){
		let fvi = filterVal.substring(2);
		result = (filterVal, val) => {
			return val<=fvi;
		}
	} else if (filterVal.startsWith(">")){
		let fvi = filterVal.substring(1);
		result = (filterVal, val) => {
			return val>fvi;
		}
	} else if (filterVal.startsWith("<")){
		let fvi = filterVal.substring(1);
		result = (filterVal, val) => {
			return val<fvi;
		}
	} else {
		result = matchNumberFunction;
	}
	
	return result; 			
}




