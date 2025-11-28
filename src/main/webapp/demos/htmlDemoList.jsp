<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<%@ include file="include/header.jspf"%>


<div class="container">
	<h2>Демо html</h2>



		
	<div class="well">
		<c:forEach var="page" items="${html_demos}">
			<a href="demos/html_demos/${page}" target="bsd">${page}</a>
			<br>
		</c:forEach>
	</div>		
		





</div>




<%@ include file="include/footer.jspf"%>

