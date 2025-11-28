package ru.tet.tsg.servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.tet.tsg.misc.TSGTaskFilter;
import ru.tet.tsg.misc.TSGTaskRow;
import ru.tet.tsg.misc.TSGTasksDao;
import ru.tet.tsg.util.SUPage;

/**
 * Предоставляет данные для демо для tet.slick.grid.
 * 
 */
@WebServlet("/tsg/*")
public class TSGDemoServlet1 extends HttpServlet {

	public static final String FILTER = "TSGTaskFilter";
	
	
	public static final String PAGE_URL = "/getTasksJson";
	public static final String UPDATE_FILTER_URL = "/updateTasksFilter";
	public static final String CLEAR_FILTER_URL = "/clearTasksFilter";
	
	
	TSGTasksDao dao;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		
		dao = new TSGTasksDao(200);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String pathInfo = req.getPathInfo();
		if (pathInfo.startsWith(UPDATE_FILTER_URL)) {
			
			TSGTaskFilter filter;
			if ("application/json".equals(req.getContentType())) {
				ObjectMapper mapper = new ObjectMapper();
				filter = mapper.readValue(req.getInputStream(), TSGTaskFilter.class);
			} else {
				String rb = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
				//processed=&id=&title=&duration=&percentComplete=36&start=&finish=&effortDriven=&sortField=
				System.out.println(rb);
				filter = new TSGTaskFilter();
			}
			
			req.getSession().setAttribute(FILTER, filter);
			
		} else if (pathInfo.startsWith(CLEAR_FILTER_URL)) {
			req.getSession().removeAttribute(FILTER);
		} else {
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			resp.getWriter().write("Invalid URL format: "+pathInfo);
		}
		
		
	}
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// "/getCustomerRequestJson/10/20"
		String pathInfo = req.getPathInfo();
		
		String[] parts = pathInfo.split("/");
		if (!pathInfo.startsWith(PAGE_URL) || parts.length != 4) {
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			resp.getWriter().write("Invalid URL format: "+pathInfo);
			return;
		}

		try {
			Integer startRow = Integer.parseInt(parts[2]);
			Integer pageSize = Integer.parseInt(parts[3]);

			TSGTaskFilter filter = (TSGTaskFilter)req.getSession().getAttribute(FILTER);
			if (filter==null) {
				filter = new TSGTaskFilter();
			}
			
			filter.setStartRow(startRow);
			filter.setPageSize(pageSize);

			SUPage<TSGTaskRow> page = dao.findRows(filter);
			
			// Установка типа ответа
			resp.setContentType("application/json");
			
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(resp.getOutputStream(), page);
//			resp.getOutputStream().close();
			
			Thread.sleep(1000);
			
		} catch (Exception e) {
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			resp.getWriter().write("error:" + e.getMessage());
			e.printStackTrace();
		}
	}

}