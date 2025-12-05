package ru.tet.tsg.misc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TSGDictionaries {

	Map<Integer, TsgSection> sectionsMap;
	List<TsgSection> sections;

	
	private static final TSGDictionaries instance = new TSGDictionaries();
	public static TSGDictionaries getInstance() {
		return instance;
	}
	private TSGDictionaries() {

		sectionsMap = new HashMap<>();
		sections = new ArrayList<>();
		for (int i = 0; i <= 10; i++) {
			
			int rand = (int)Math.round(Math.random() * 100);
			TsgSection s = new TsgSection(i, "Отдел №" + rand);
			
			sectionsMap.put(s.getId(), s);
			sections.add(s);
		}

	}

	public List<TsgSection> getSections() {
		return sections;
	}
	
	public Map<Integer, TsgSection> getSectionsMap() {
		return sectionsMap;
	}

}
