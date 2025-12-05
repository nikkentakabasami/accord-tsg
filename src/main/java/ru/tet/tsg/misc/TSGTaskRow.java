package ru.tet.tsg.misc;

import lombok.Data;

@Data
public class TSGTaskRow {

	int id;
//	String processed;
	
	TsgSection section;
	
	
	String title;
	String duration;
	int percentComplete;
	String start;
	String finish;
	boolean effortDriven;
	boolean odd;
	
	
	
/*
			id: i,
			processed: "Отдел №"+ Math.round(Math.random() * 10),
			title: "Мой таск " + i,
			duration: "5 дней",
			percentComplete: Math.round(Math.random() * 100),
			start: "01.01.2009",
			finish: "01.05.2009",
			effortDriven: (i % 5 == 0),
			odd: (i % 2 == 1) * 	
 */
	
}
