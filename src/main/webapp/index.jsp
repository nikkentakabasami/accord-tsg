<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="demos/include/header.jspf"%>


<div class="acc-2cols">

	<h1 class="acc-row">Демо веб-компонентов, классов и библиотек</h1>



	<div class="acc-anchor-list">
			<h4>libs</h4>
		<a href="./accord/demos/index.html	" target="accIndex"> accord libs</a>
		<a href="./tetSlick/demos/index.html" target="tc"> Демки для tet.slick.grid</a>
	</div>

	<div class="acc-anchor-list">
			<h4>сервлеты</h4>
	
		<a href="./hello" target="tc">Вызвать HelloServlet</a>
		<a href="./forward-demo" target="tc">Вызвать ForwardDemoServlet - перенаправляет на jsp</a>

	</div>
	
	

<%-- переменную demoFolders заполняет MainServletContextListener  --%>
	<c:forEach var="folder" items="${demoFolders}" varStatus="loop">

    	<div class="acc-anchor-list">
			<h4>${loop.index}- ${folder.name}</h4>

			<c:forEach var="page" items="${folder.pages}">
				<a href="demos/${folder.name}/${page}" target="${folder.name}">${page}</a>
			</c:forEach>

		</div>


	</c:forEach>
<%--
 --%>



</div>




<%@ include file="demos/include/footer.jspf"%>



