<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/headerBase.jspf"%>

<script>

</script>

<link rel="stylesheet" type="text/css" href="demos/css/demo10.css">

<h3>Способы размещения иконки на кнопке</h3>


<div class="button-panel">

<button type="button" class="btn1 icon-button"><span>span c background-image и надписью</span></button>

<button type="button" class="btn2 icon-button">background-image на кнопке</button>	

<button type="button" class="btn3 icon-button"><img src="demos/icons/check.png"/><span>img внутри кнопки</span></button>	

<button type="button" class="btn4 icon-button"><img src="demos/icons/check.png"/></button>	
</div>

<h3>btn-add::before { content: url(../../accord/icons/add.png); ...</h3>

<div class="button-panel">

		<button type="button" class="icon-button btn-add">acc-btn-add</button>
		<button type="button" class="icon-button btn-cross">acc-btn-cross</button>
		<button type="button" class="icon-button btn-check"></button>

</div>


<%@ include file="../include/footer.jspf"%>

