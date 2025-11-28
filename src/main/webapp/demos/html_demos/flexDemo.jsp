<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/headerBase.jspf"%>

<link rel="stylesheet" type="text/css" href="demos/css/flex-demo.css">



<h3>Разница между flex и inline-flex</h3>

display: flex;
<div style="display: flex; background: lightblue;">
  <div>Элемент 1</div>
  <div>Элемент 2</div>
</div>

display: inline-flex;
<span style="display: inline-flex; background: lightgreen;">
  <div>Элемент A</div>
  <div>Элемент B</div>
</span>


<h3>demo0</h3>
<div class="flexPane fp0">
	<div class="b1">width: 200px</div>
	<div class="b2">width: 200px</div>
	<div class="b3">width: 200px</div>
</div>





<h3>demo1</h3>
<div class="flexPane fp1">
	<div class="b1">width: 200px; flex: 1;</div>
	<div class="b2">width: 200px; flex: 1;</div>
	<div class="b3">width: 200px; flex: 1;</div>
</div>

<h3>demo2</h3>
<div class="flexPane fp2">
	<div class="b1">width: 200px</div>
	<div class="b2">width: 200px</div>
	<div class="b3">width: 200px; flex: 1;</div>
	
</div>


<h3>demo3</h3>
<div class="flexPane fp3">
	<div class="b1">width: 200px</div>
	<div class="b2">width: 200px; flex: 0.5;</div>
	<div class="b3">width: 200px; flex: 1;</div>
</div>

<h3>demo4 - flex-wrap: wrap; align-content: flex-end;</h3>
<div class="flexPane fp4">
	<div class="b1">div1</div>
	<div class="b2">div2</div>
	<div class="b3">div3</div>
	<div class="b4">div4</div>
	<div class="b5">div5</div>
</div>



<%@ include file="../include/footer.jspf"%>

