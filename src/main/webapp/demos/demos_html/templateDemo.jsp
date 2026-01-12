<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/headerBase.jspf"%>


<style>

table {
  background: #000;
}
table td {
  background: #fff;
}
</style>

<script src="demos/js/template-demo.js"></script>


<h3>Работа с тэгом &lt;template&gt;</h3>

<p>
The &lt;template&gt; HTML element provides a mechanism to hold client-side content that is not rendered when the page is loaded but can be instantiated and used later at runtime.
</p>




<div style = "display: flex; flex-direction: column;width: 400px;gap: 10px;">
<button type="button" class="btn1">Добавить записи на основе шаблона из template1 (js)</button>	
<button type="button" class="btn2">Переместить запись из template2 (jquery)</button>	
<button type="button" class="btn3">Добавить записи на основе шаблона из template1 (jquery)</button>	

</div>


<table id="producttable">
  <thead>
    <tr>
      <td>UPC_Code</td>
      <td>Product_Name</td>
    </tr>
  </thead>
  <tbody>
    <!-- данные будут вставлены сюда -->
  </tbody>
</table>

<template id="template1">
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template>


<template id="template2">
  <tr>
    <td class="record">hello</td>
    <td>world</td>
  </tr>
</template>


<%@ include file="../include/footer.jspf"%>

