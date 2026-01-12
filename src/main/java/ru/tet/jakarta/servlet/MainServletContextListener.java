package ru.tet.jakarta.servlet;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import ru.tet.jakarta.servlet.beans.DemoFolder;

@WebListener
public class MainServletContextListener implements ServletContextListener {

	private final static Logger logger = Logger.getLogger(MainServletContextListener.class.getName());

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext ctx = sce.getServletContext();

		LogManager.getLogManager().getLogger(Logger.GLOBAL_LOGGER_NAME).setLevel(Level.FINE);

		logger.info("MainServletContextListener: search demo pages");

		File demosDir = new File(ctx.getRealPath("/demos"));
		
		File[] dirList = demosDir.listFiles(f -> f.isDirectory() && f.getName().startsWith("demos_"));

		List<DemoFolder> demoFolders = Arrays.stream(dirList).map(dir -> {
			List<String> list = findPageFiles(dir);
			DemoFolder f = new DemoFolder(dir.getName(), list);
			ctx.setAttribute(dir.getName(), f);
			return f;
		}).collect(Collectors.toList());

		ctx.setAttribute("demoFolders", demoFolders);

	}

	List<String> findPageFiles(File dir) {

		List<String> pageNames = new ArrayList<>();
		if (dir.exists() && dir.isDirectory()) {
			for (File file : dir.listFiles((d, name) -> name.endsWith(".jsp") || name.endsWith(".html"))) {
				pageNames.add(file.getName());
			}
		}

		String s = Arrays.toString(pageNames.toArray());
		logger.info(dir.getName() + ": found files: " + s);

		return pageNames;

	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	}
}