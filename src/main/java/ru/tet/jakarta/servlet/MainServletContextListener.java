package ru.tet.jakarta.servlet;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import ru.tet.jakarta.servlet.beans.DemoFolder;

@WebListener
public class MainServletContextListener implements ServletContextListener {

	private final static Logger logger = Logger.getLogger(MainServletContextListener.class.getName());
	
	//,"demoFolders"
	final static String[] demoFoldersNames = {"bsdemos","html_demos","html_basics", "libs_demos"};
	
	List<DemoFolder> demoFolders;
	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext ctx = sce.getServletContext();

		LogManager.getLogManager().getLogger(Logger.GLOBAL_LOGGER_NAME).setLevel(Level.FINE); 
		
		logger.info("MainServletContextListener: search demo jsps");
		
		
		/*
		List<String> list = findJsps(ctx, "/demos/bsdemos");
		ctx.setAttribute("bsdemos", list);

		list = findJsps(ctx, "/demos/html_demos");
		ctx.setAttribute("html_demos", list);
		
		list = findJsps(ctx, "/demos/accordDemos");
		ctx.setAttribute("accordDemos", list);
		
		scanDemosFolder(ctx, "bsdemos");
		scanDemosFolder(ctx, "accordDemos");
		scanDemosFolder(ctx, "html_demos");
		scanDemosFolder(ctx, "html_basics");
		*/
		
		List<DemoFolder> demoFolders = new ArrayList<>();
		
		Arrays.stream(demoFoldersNames).forEach(folderName->{
			List<String> list = scanDemosFolder(ctx, folderName);
			DemoFolder f = new DemoFolder(folderName, list);
			demoFolders.add(f);
		});
		ctx.setAttribute("demoFolders", demoFolders);
		
		
		
		
		
	}

	
	List<String> scanDemosFolder(ServletContext ctx, String folderName) {
		List<String> list = findJsps(ctx, "/demos/"+folderName);
		ctx.setAttribute(folderName, list);
		return list;
	}
	
	List<String> findJsps(ServletContext ctx, String path) {

		String folderPath = ctx.getRealPath(path);
		File dir = new File(folderPath);

		List<String> pageNames = new ArrayList<>();
		if (dir.exists() && dir.isDirectory()) {
//			for (File file : dir.listFiles((d, name) -> name.endsWith(".jsp"))) {
			for (File file : dir.listFiles()) {
				pageNames.add(file.getName());
			}
		}
		
		String s = Arrays.toString(pageNames.toArray());
		logger.info(path+": found files: "+ s);
		
		return pageNames;

	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	}
}