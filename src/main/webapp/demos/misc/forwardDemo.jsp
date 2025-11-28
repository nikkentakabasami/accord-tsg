<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<%@ include file="../include/header.jspf"%>


<div class="container">
	<h4>Сервлет ForwardDemoServlet нашёл список иконок в папке "accord/icons", записал их request.attribues и перенаправил вызов на forwardDemo.jsp для их показа</h4>

	<h2>Список найденных иконок:</h2>
	<c:forEach var="icon" items="${icons}">
	  <img src="accord/icons/${icon}"/> - ${icon}
	  <br>
		
	</c:forEach>


</div>




<%@ include file="../include/footer.jspf"%>

