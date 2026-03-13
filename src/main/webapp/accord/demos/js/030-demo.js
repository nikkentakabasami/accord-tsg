let bh1 = {
	
	serializeForms(){
		
		
		le2(`
			$("#form1").serialize();
			$("#form2").serialize();
			$("#form3").serialize();
			$("#form4").serialize();
			$("#form5").serialize();
			`);
		
	},
	
}


$(document).ready(function() {

	
	//добавляем демо-кнопки
	addDemoButtons(bh1)
	
	
	demoOptions.beforeExecDemoFunc = ()=>{
		clearLog2();
	};
	
	
});



