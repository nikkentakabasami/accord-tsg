<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/headerBase.jspf"%>

<link rel="stylesheet" type="text/css" href="demos/css/flex-demo.css">


<div class="f2-bg">
	<div class="f2-left bg-warning">
		<p>left panel</p>
	</div>

	<div class="f2-right">
		<h3>right panel</h3>
		<p>some text</p>
	</div>
</div>



<div class="f2-dialog">
	<div class="f2-dtop green-border ">
		<h3>test dialog</h3>
	</div>

	<div class="f2-dbody blue-border">body</div>

	<div class="f2-dbottom green-border">bottom</div>

</div>




<%@ include file="../include/footer.jspf"%>

