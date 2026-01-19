



$(()=>{
	
	clearLog();
	
	let a = {
		s1: "some string",
		n1: 123,
		arr1: new Array("Wind","Rain","Fire"),
		
		o1: {1: "ka", 2: "chou"}
		
	};	

	log("JSON.stringify(a):");
	let str = JSON.stringify(a);
	log(str);

	log();
	log("stringifyObject(a):");
	str = stringifyObject(a);
	log(str);
		
	
	
});




