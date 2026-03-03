<%@page import="java.util.List"%>
<%@page import="ru.tet.demos.beans.JSTreeNode"%>
<%@page import="ru.tet.demos.aux.JSTreeDataSamples"%>
<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%

JSTreeDataSamples data = JSTreeDataSamples.getInstance();

data.init();

String nodeId = request.getParameter("id");
List<JSTreeNode> children = data.findChildren(nodeId);

pageContext.setAttribute("children", children);
%>

<ul>

  <c:forEach var="node" items="${children}">
    <c:if test="${node.hasChilds()}">
      <li id="${node.id}" class="jstree-closed">${node.text}</li>
    </c:if>
    <c:if test="${!node.hasChilds()}">
      <li id="${node.id}">${node.text}</li>
    </c:if>

  </c:forEach>

</ul>




