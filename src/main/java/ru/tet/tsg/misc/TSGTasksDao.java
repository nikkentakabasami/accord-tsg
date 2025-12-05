package ru.tet.tsg.misc;

import static ru.tet.tsg.util.TsgLocalDaoUtils.filter;
import static ru.tet.tsg.util.TsgLocalDaoUtils.sort;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import ru.tet.tsg.util.SUPage;

/**
 * Тестовый dao-сервис.
 * Генерирует список строк заданного размера при создании.
 * Возвращает нужную страницу по заданным условиям фильтрации и сортировки.
 * 
 */
public class TSGTasksDao {

	List<TSGTaskRow> allRows;

	
	public TSGTasksDao(int rowCount) {
		
		
		allRows = new ArrayList<>(rowCount);

		Map<Integer, TsgSection> sectionsMap = TSGDictionaries.getInstance().getSectionsMap();
		
		
		//генерируем строки
		for (int i = 0; i < rowCount; i++) {
			TSGTaskRow row = new TSGTaskRow();
			row.setId(i);
			
			int sectionId = (int)Math.round(Math.random() * 10);
			TsgSection section = sectionsMap.get(sectionId);
			row.setSection(section);
			
			row.setTitle("Мой таск " + i);
			row.setDuration(Math.round(Math.random() * 20) + " дней");
			row.setPercentComplete((int) Math.round(Math.random() * 100));
			row.setEffortDriven((i % 5 == 0));
			row.setOdd((i % 2 == 1));

			LocalDate ld = LocalDate.now();
			ld = ld.minusDays(Math.round(Math.random() * 100));
			row.setStart(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT).format(ld));

			ld = ld.plusDays(Math.round(Math.random() * 200));
			row.setFinish(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT).format(ld));

			allRows.add(row);
		}

	}

	public SUPage<TSGTaskRow> findRows(TSGTaskFilter filter) {

		//фильтруем
		List<TSGTaskRow> rows = filter(allRows, filter);
		
		//Условия сортировки  формате: "myFirstCol+_mySecondCol+"
		String sortFields = filter.getSortField();
		
		//сортируем
		if (StringUtils.isNotEmpty(sortFields)) {
			sort(sortFields, rows);
		}

		//пагинация
		Integer startRow = filter.getStartRow();
		Integer pageSize = filter.getPageSize();

		List<TSGTaskRow> pageRows = rows;
		if (startRow != null
				&& pageSize != null) {

			int end = Math.min(startRow + pageSize,rows.size());
			
//			rows.size() > (startRow + pageSize)			
			
			pageRows = rows.subList(startRow, end);

		}

		SUPage<TSGTaskRow> page = new SUPage<>(pageRows, startRow, pageSize, rows.size());
		
		
		return page;
	}




	public static void main(String[] args) {
		TSGTasksDao dao = new TSGTasksDao(20);

		TSGTaskFilter filter = new TSGTaskFilter();
		//	filter.setId("10");

		filter.setTitle("1");
		filter.setStartRow(10);
		filter.setPageSize(20);

		SUPage<TSGTaskRow> rows = dao.findRows(filter);

		rows.getRows().forEach(row->{
			System.out.println(row);
		});
		
		
		/*
		List<TSGTaskRow> rows = dao.allRows;
		
		TSGTaskFilter filter = new TSGTaskFilter();
		//		filter.setId("10");
		
		filter.setStartRow(10);
		filter.setPageSize(20);
		
		rows = dao.filter(rows, filter);
		
				
				
		//		dao.sort(rows, "duration");
		//		dao.sort(rows, "processed",false);
		dao.sort(rows, "percentComplete",false);
		
		rows.reversed();
		
		
		*/

	}

	
	
}
