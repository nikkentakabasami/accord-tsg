package ru.tet.jakarta.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.tet.tw.MiscServices;

/**
 * Простой сервлет, достающий и показывающий значение из JNDI
 * Подключается через web.xml
 * 
 * @author tetsuma
 *
 */
public class HelloServlet extends HttpServlet {
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		System.out.println("tws initiated");
		super.init(config);
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
		
		//test jndi
		String myJndiEntry = (String)MiscServices.getInstance().getJNDIEnvironmentVariable("myJndiEntry");
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<h1>Hello from Servlet!</h1> myJndiEntry="+myJndiEntry);
	}
	

	
	
}