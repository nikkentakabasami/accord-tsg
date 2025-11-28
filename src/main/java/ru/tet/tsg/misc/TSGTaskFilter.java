package ru.tet.tsg.misc;

import lombok.Data;
import ru.tet.tsg.util.SUSearchFilter;

@Data
public class TSGTaskFilter extends SUSearchFilter {

	String id;
	String processed;
	
	String title;
	String duration;
	String percentComplete;
	String start;
	String finish;
	String effortDriven;
	String odd;
	
	
}
