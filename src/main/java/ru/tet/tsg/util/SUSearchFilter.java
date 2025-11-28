package ru.tet.tsg.util;


import lombok.Data;

/**
 * Основа для условий фильтрации, которые передаются в сервисы для получения списка записей из БД.
 * 
 * Содержит поля для реализации пагинации.
 * 
 * @author tetsuma
 *
 */
@Data
public class SUSearchFilter {

	Integer startRow;

	Integer pageSize;

	String sortField;

	//Общее число строк (задаётся в условиях фильтрации если изменилась только страница, чтобы не вычислять общее число строк)
	Integer rowCount = 0;
	
	
	public SUSearchFilter() {
	}

	public SUSearchFilter(Integer startRow, Integer pageSize, String sortField) {
		this.startRow = startRow;
		this.pageSize = pageSize;
		this.sortField = sortField;
	}

	
	
}
