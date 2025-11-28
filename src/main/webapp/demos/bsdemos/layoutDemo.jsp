<%@page import="java.util.Enumeration"%>
<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/header.jspf"%>


<link rel="stylesheet" type="text/css" href="demos/css/demo.css">


<div class="container red-border">
  <h1>container</h1>
  <p>This is some text.</p>
</div>


<div class="container-fluid blue-border">
  <h1>container-fluid</h1>
  <p>This is some text.</p>
</div>

<div class="container-fluid green-border">
  <h3>container-fluid with row </h3>

  <div class="row">
    <div class="col-md-4 bg-info">
      <h3>Column 1</h3>
      <p>col-md-4</p>
    </div>
    <div class="col-md-2 bg-warning">
      <h3>Column 2</h3>
      <p>col-md-2</p>
    </div>
    <div class="col-md-6 bg-info">
      <h3>Column 3</h3>
      <p>col-md-6</p>
    </div>
  </div>
</div>

<div class="container-fluid green-border">
  <h3>col-md-offset demo </h3>

 <div class="row">
  <div class="col-md-4  bg-info">col-md-4</div>
  <div class="col-md-4 col-md-offset-4  bg-info">col-md-4 col-md-offset-4</div>
 </div>

 <h3>col-md-push demo</h3>
 <div class="row">
  <div class="col-md-4 col-md-push-1 bg-info">col-md-push-1</div>
  <div class="col-md-4 col-md-push-4 bg-info">col-md-push-4</div>
 </div>


 <h3>col-md-pull demo</h3>
 <div class="row">
  <div class="col-md-8 bg-info">col-md-8</div>
  <div class="col-md-2 col-md-pull-3 bg-danger">col-md-2 col-md-pull-3</div>
 </div>





 <h3>nesting demo</h3>
 <div class="row">

  <div class="col-sm-8  green-border">
    col-sm-8 left cell
    <div class="row">
      <div class="col-sm-6">cell 1</div>
      <div class="col-sm-6">cell 2</div>
    </div>
    <div class="row">
      <div class="col-sm-6">cell 3</div>
      <div class="col-sm-6">cell 4</div>
    </div>
  </div>

  <div class="col-sm-4 blue-border">
    col-sm-4 right cell<br>with second line
  </div>

</div>



</div>




<!-- 
<div class="row red-border">

<div class="blue-border">test div</div>
 -->



</div>



<%@ include file="../include/footer.jspf"%>

