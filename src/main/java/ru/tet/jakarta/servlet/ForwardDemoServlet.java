package ru.tet.jakarta.servlet;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/**
 * Вычисляет данные, записывает их в "request.setAttribute", перенаправляет в jsp для их показа.
 * 
 */
@WebServlet("/forward-demo")
public class ForwardDemoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String folderPath = getServletContext().getRealPath("accord/icons");
        File dir = new File(folderPath);
        
        List<String> icons = new ArrayList<>();
        if (dir.exists() && dir.isDirectory()) {
            File[] files = dir.listFiles();
            if (files != null) {
                for (File file : files) {
                	icons.add(file.getName());
                }
            }
        }
        
        request.setAttribute("icons", icons);
        
        request.getRequestDispatcher("/demos/misc/forwardDemo.jsp").forward(request, response);
    }
}