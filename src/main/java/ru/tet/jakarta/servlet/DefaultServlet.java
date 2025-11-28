package ru.tet.jakarta.servlet;

import java.io.IOException;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/**
 * Простой тестовый сервлет
 * Подключается через аннотацию @WebServlet. Она позволяет замаппить сервлет автоматом.
 * 
 * @author tetsuma
 *
 */
@WebServlet("/app/index")
public class DefaultServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.sendRedirect(req.getContextPath()+"/index.jsp");
    }
}