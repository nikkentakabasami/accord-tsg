package ru.tet.tsg.misc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TsgSection implements Comparable<TsgSection> {

	Integer id;
	
	String name;
	
	@Override
	public int compareTo(TsgSection o) {
		return id.compareTo(o.getId());
	}
	
}
