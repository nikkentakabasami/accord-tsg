package ru.tet.jakarta.servlet;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.tet.tsg.misc.TSGDictionaries;
import ru.tet.tsg.misc.TSGTaskFilter;
import ru.tet.tsg.misc.TSGTaskRow;
import ru.tet.tsg.misc.TSGTasksDao;
import ru.tet.tsg.misc.TsgSection;
import ru.tet.tsg.util.SUPage;

@WebServlet("/testAjax/*")
public class JqueryAjaxDemoServlet extends HttpServlet {

	private final static Logger logger = Logger.getLogger(MainServletContextListener.class.getName());

	public static final String SECTIONS_URL = "/getSectionsJson";
	public static final String UPDATE_FILTER_URL = "/updateTasksFilter";
	public static final String TEST_POST_REQUEST_URL = "/TestPostRequest";

	TSGTasksDao dao;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);

		dao = new TSGTasksDao(200);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String pathInfo = req.getPathInfo();

		logger.info("post query: " + pathInfo);

		logRequestParams(req);

		//получение json через post-запрос
		if (pathInfo.startsWith(UPDATE_FILTER_URL)) {

			if (!"application/json".equals(req.getContentType())) {
				resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				resp.getWriter().write("bad content type: " + req.getContentType());
				return;
			}

			try {
				ObjectMapper mapper = new ObjectMapper();
				TSGTaskFilter filter = mapper.readValue(req.getInputStream(), TSGTaskFilter.class);

				logger.info("aquired TSGTaskFilter object: " + filter);

				resp.getWriter().write("filter object aquired!");

			} catch (Exception e) {
				resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				resp.getWriter().write("error:" + e.getMessage());
				e.printStackTrace();
			}

		} else if (pathInfo.startsWith(TEST_POST_REQUEST_URL)) {

		} else {
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			resp.getWriter().write("Invalid URL format: " + pathInfo);
		}

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String pathInfo = req.getPathInfo();

		logger.info("get query: " + pathInfo);

		logRequestParams(req);

		//возврат json-объекта
		if (pathInfo.startsWith(SECTIONS_URL)) {
			List<TsgSection> sections = TSGDictionaries.getInstance().getSections();

			ObjectMapper mapper = new ObjectMapper();
			resp.setContentType("application/json");
			mapper.writeValue(resp.getOutputStream(), sections);
			return;
		}

	}

	private void logRequestParams(HttpServletRequest req) {
		logger.info("params:");
		for (Iterator<String> iterator = req.getParameterNames().asIterator(); iterator.hasNext();) {
			String paramName = iterator.next();
			String paramValue = req.getParameter(paramName);
			logger.info(paramName + ":" + paramValue);
		}
	}

}