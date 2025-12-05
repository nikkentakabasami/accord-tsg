

function makeRandomInt(maxVal){
	return Math.round(Math.random() * maxVal)	
}

function makeRandomDate(){
	return formatDate(new Date(2024, makeRandomInt(12), makeRandomInt(30)));
}


function formatDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
}


function makeTableData1(rowCount){
	if (!rowCount){
		rowCount = 50;
	}
	
	let data = new Array(rowCount);
	for (var i = 0; i < rowCount; i++) {
		
		
		
		data[i] = {
			title: "Мой таск " + i,
			duration: "5 дней",
			percentComplete: makeRandomInt(100),
			start: makeRandomDate(),
			finish: makeRandomDate(),
			effortDriven: (i % 5 == 0),
			odd: (i % 2 == 1)
			
			
			
			

			
		};
	}
	return data;
	
}





function makeTableData2(rowCount){
	if (!rowCount){
		rowCount = 50;
	}
	
	let data = new Array(rowCount);
	for (var i = 0; i < rowCount; i++) {
		data[i] = {
			id: i,
			processed: "Отдел №"+ Math.round(Math.random() * 10),
			section: {
				
				
			},
			title: "Мой таск " + i,
			duration: "5 дней",
			percentComplete: Math.round(Math.random() * 100),
			start: "01.01.2009",
			finish: "01.05.2009",
			effortDriven: (i % 5 == 0),
			odd: (i % 2 == 1)
		};
	}
	return data;
}


function makeTableData3(rowCount){
	if (!rowCount){
		rowCount = 50;
	}
	
	
	let customers = [
		{
			id: 1568,
			name: "Yamada Taro "
		}, {
			id: 2599,
			name: "Ivanov Ivan"
		}
	];
	
	let data = new Array(rowCount);
	for (var i = 0; i < rowCount; i++) {
		data[i] = {
			id: i,
			processed: "Отдел №"+ Math.round(Math.random() * 10),
			title: "Мой таск " + i,
			duration: "5 дней",
			percentComplete: Math.round(Math.random() * 100),
			start: "01.01.2009",
			finish: "01.05.2009",
			effortDriven: (i % 5 == 0),
			odd: (i % 2 == 1),
			request: {
				id: Math.floor((i/2)*3+5),
				requestDate: "05.17.2024",
				customer: customers[i%2]
			}
			
		};
	}
	return data;
}



$(function() {

//	grid.setSelectionModel(new Slick.RowSelectionModel());

})
