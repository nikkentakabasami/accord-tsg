package ru.tet.tsg.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import ru.tet.tsg.misc.TSGTaskFilter;
import ru.tet.tsg.misc.TSGTaskRow;

/**
 * Функции для фильтрации и сортировки локальных данных.
 * 
 */
public class TsgLocalDaoUtils {

	/**
	 * Парсит условия сортировки  формате: "myFirstCol+_mySecondCol-"
	 * @param s
	 * @return
	 */
	public static List<Pair<String, Boolean>> parseSortString(String s) {
		String[] fields = s.split("_");
		List<Pair<String, Boolean>> result = new ArrayList<>(fields.length);

		for (int i = 0; i < fields.length; i++) {
			String f = fields[i];

			Pair<String, Boolean> fp;
			if (f.endsWith("+")) {
				fp = new ImmutablePair<>(f.substring(0, f.length() - 1), true);
			} else if (f.endsWith("-")) {
				fp = new ImmutablePair<>(f.substring(0, f.length() - 1), false);
			} else {
				fp = new ImmutablePair<>(f, true);
			}
			result.add(fp);

		}
		return result;
	}


	
	public static void sort(String sortFields, List<TSGTaskRow> rows) {
		List<Pair<String, Boolean>> sf = parseSortString(sortFields);
		sort(sf, rows);
	}

	public static void sort(List<Pair<String, Boolean>> sortFields, List<TSGTaskRow> rows) {

		rows.sort(new Comparator<TSGTaskRow>() {
			@Override
			public int compare(TSGTaskRow o1, TSGTaskRow o2) {

				for (Pair<String, Boolean> sf : sortFields) {
					try {
						Field field = TSGTaskRow.class.getDeclaredField(sf.getKey());
						field.setAccessible(true);
						Comparable val1 = (Comparable) field.get(o1);
						Comparable val2 = (Comparable) field.get(o2);
						int r = val1.compareTo(val2);
						if (r != 0) {
							if (!sf.getValue()) {
								r = -r;
							}
							return r;
						}
					} catch (NoSuchFieldException | IllegalAccessException e) {
						System.out.println("error:"+e.getMessage());
						return 0;
					}
				}
				return 0;
			}
		});

	}

	
	
	public static List<TSGTaskRow> filter(List<TSGTaskRow> rows, TSGTaskFilter filter) {

		if (filter.isEmpty()) {
			return rows;
		}
		
		List<TSGTaskRow> result = rows.stream().filter(row -> {

			return matchInteger(row.getId(), filter.getId())
					&& matchInteger(row.getSection().getId(), filter.getSection())
//					&& ( match(row.getSection().getId(), filter.getSection()) || match(row.getSection().getName(), filter.getSection()) )
					&& matchStringLike(row.getTitle(), filter.getTitle())
					&& matchStringLike(row.getDuration(), filter.getDuration())
					&& matchInteger(row.getPercentComplete(), filter.getPercentComplete())
					&& matchStringLike(row.getStart(), filter.getStart())
					&& matchStringLike(row.getFinish(), filter.getFinish())
					&& matchBoolean(row.isEffortDriven(), filter.getEffortDriven())
					&& matchBoolean(row.isOdd(), filter.getOdd());

			//			return true;
		}).collect(Collectors.toList());

		return result;

	}	
	
	public static boolean matchStringLike(String val, String filterVal) {
    if (StringUtils.isBlank(filterVal)) {
      return true;
    }
		return StringUtils.containsIgnoreCase(val, filterVal);
	}

	public static boolean matchString(String val, String filterVal) {
    if (StringUtils.isBlank(filterVal)) {
      return true;
    }
		return StringUtils.equals(val, filterVal);
	}
	
	public static boolean matchStringMulti(String val, String filterVal) {
    if (StringUtils.isBlank(filterVal)) {
      return true;
    }
    return Arrays.asList(filterVal.split(",")).stream().anyMatch(val::equals);
	}
	
	
	public static boolean matchBoolean(Boolean val, String filterVal) {
    if (StringUtils.isBlank(filterVal)) {
      return true;
    }
    if (val==null) {
    	return false;
    }
		boolean fvb = Boolean.parseBoolean(filterVal);
		return val.booleanValue()==fvb;
		
	}
	
	public static boolean matchInteger(Integer val, String filterVal) {
    if (StringUtils.isBlank(filterVal)) {
      return true;
    }
    if (val==null) {
    	return false;
    }
    
    for (int i = 0; i < FilterTokens.values().length; i++) {
    	FilterTokens ft = FilterTokens.values()[i];
			
    	Boolean r = ft.match(val, filterVal);
    	if (r!=null) {
    		return r;
    	}
		}
    
		int fvi = Integer.parseInt(filterVal);
		return val == fvi;
	}
	

	
//	public static boolean matchIntegerMulti(Integer val, String filterVal) {
//		String[] filterVals = filterVal.split(",");
//		return Arrays.stream(filterVals).map(String::trim).filter(cv->cv.length()>0).map(cv->Integer.parseInt(cv)).anyMatch(val::equals);
//	}
	



	public static void main(String[] args) {

		List<Pair<String, Boolean>> v = parseSortString("myFirstCol+_mySecondCol-");
		System.out.println(Arrays.toString(v.toArray()));

	}

}
