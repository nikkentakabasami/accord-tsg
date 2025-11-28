<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="include/header.jspf"%>


<div class="container">
	<h2>Демо</h2>


	<div class="well">
		<c:forEach var="page" items="${accordDemos}">
			<a href="demos/accordDemos/${page}" target="bsd">${page}</a>
			<br>
		</c:forEach>
	</div>		




</div>









<%@ include file="include/footer.jspf"%>

