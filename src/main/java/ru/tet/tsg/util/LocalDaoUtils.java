package ru.tet.tsg.util;

import static ru.tet.tsg.util.LocalDaoUtils.parseSortString;
import static ru.tet.tsg.util.LocalDaoUtils.sort;

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
public class LocalDaoUtils {

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

	/*
	public static void sort(List<TSGTaskRow> rows, String fieldName, boolean asc) {

		rows.sort(Comparator.comparing(row -> {
			try {
				Field field = TSGTaskRow.class.getDeclaredField(fieldName);
				field.setAccessible(true);
				Object value = field.get(row);
				return (Comparable) value;
			} catch (NoSuchFieldException | IllegalAccessException e) {
				throw new RuntimeException("Ошибка доступа к полю: " + fieldName, e);
			}
		}));

		if (!asc) {
			Collections.reverse(rows);
		}

		//		.reversed());		

	}
	*/
	
	
	
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

		List<TSGTaskRow> result = rows.stream().filter(row -> {

			return match(row.getId(), filter.getId())
					&& match(row.getProcessed(), filter.getProcessed())
					&& match(row.getTitle(), filter.getTitle())
					&& match(row.getDuration(), filter.getDuration())
					&& match(row.getPercentComplete(), filter.getPercentComplete())
					&& match(row.getStart(), filter.getStart())
					&& match(row.getFinish(), filter.getFinish())
					&& match(row.isEffortDriven(), filter.getEffortDriven())
					&& match(row.isOdd(), filter.getOdd());

			//			return true;
		}).collect(Collectors.toList());

		return result;

	}	
	
	
	
	public static boolean match(Object val, String filterVal) {

		if (StringUtils.isEmpty(filterVal)) {
			return true;
		}
		if (val == null) {
			return false;
		}

		if (val instanceof String) {
			String s = (String) val;
			return s.toLowerCase().contains(filterVal);
		}

		if (val instanceof Integer) {
			int v = (Integer) val;
			int fv = Integer.parseInt(filterVal);
			return v == fv;
		}

		if (val instanceof Boolean) {
			boolean v = (Boolean) val;
			boolean fv = Boolean.parseBoolean(filterVal);
			return v == fv;
		}

		return true;

	}

	public static void main(String[] args) {

		List<Pair<String, Boolean>> v = parseSortString("myFirstCol+_mySecondCol-");
		System.out.println(Arrays.toString(v.toArray()));

	}

}
