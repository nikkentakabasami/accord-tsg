package ru.tet.tsg.util;

import java.util.List;


/**
 * Страница с записями, полученными из Dao-сервиса. 
 * Класс для поддержки пагинации.
 * 
 * @author tetsuma
 *
 * @param <E>
 */
public class SUPage<E> {

	Integer startRow;

	Integer pageSize;

	Integer totalRowsCount;
	
	List<E> rows;

	
	public SUPage(List<E> rows, SUPage page){
		this.rows = rows;
		this.startRow = page.startRow;
		this.pageSize = page.pageSize;
		this.totalRowsCount = page.totalRowsCount;
		
	}
	
	
	public SUPage(List<E> rows, Integer startRow, Integer pageSize, Integer totalRowsCount) {
		this.startRow = startRow;
		this.pageSize = pageSize;
		this.totalRowsCount = totalRowsCount;
		this.rows = rows;
	}
	
	public SUPage(List<E> rows) {
		this(rows, 0, 1000, rows.size());
	}

	
	public Integer getStartRow() {
		return startRow;
	}

	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getTotalRowsCount() {
		return totalRowsCount;
	}

	public void setTotalRowsCount(Integer totalRowsCount) {
		this.totalRowsCount = totalRowsCount;
	}

	public List<E> getRows() {
		return rows;
	}

	public void setRows(List<E> rows) {
		this.rows = rows;
	}

	
	  /**
	 * Возвращает номер текущей страницы (начиная с 1)
	 * 
	 * @return
	 */
	public Integer getCurrentPage(){
    if (pageSize==0){
      return 0;
    }
    
		if (startRow!=null && pageSize!=null){
			return startRow/pageSize+1;
		}
		return 1;
	}

	public Integer getPagesCount(){
	  if (pageSize==0){
	    return 0;
	  }
	  
		if (totalRowsCount!=null && pageSize!=null){
		  int r = totalRowsCount/pageSize;
		  if ((totalRowsCount%pageSize>0)){
		    r++;
		  }
		  
			return r;
		}
		return 1;
	}
	
	
	@Override
	public String toString() {
		if (rows!=null){
			return rows.toString();
		}
		return super.toString();
	}
	
	
}
