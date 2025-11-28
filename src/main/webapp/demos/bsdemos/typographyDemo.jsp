<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/header.jspf"%>

<link rel="stylesheet" type="text/css" href="demos/css/demo.css">


<div class="container-fluid green-border">
   
  <h1>&lt;small&gt; - is used to create secondary text</h1>
  <h1>h1 heading <small>secondary text</small></h1>
  <h2>h2 heading <small>secondary text</small></h2>
  <h3>h3 heading <small>secondary text</small></h3>
  <h4>h4 heading <small>secondary text</small></h4>
  <h5>h5 heading <small>secondary text</small></h5>
  <h6>h6 heading <small>secondary text</small></h6>


 <p class="text-lowercase">text-lowercase - Lowercased text.</p>
 <p class="text-uppercase">text-uppercase - Uppercased text.</p>


  <div class="row red-border">
  <div class="col-md-4">
   <h2>font colors</h2>
   <p class="text-muted">text-muted</p>
   <p class="text-primary">text-primary</p>
   <p class="text-success">text-success</p>
   <p class="text-info">text-info</p>
   <p class="text-warning">text-warning</p>
   <p class="text-danger">text-danger</p>
  </div>
  <div class="col-md-4">
   <h2>bg colors</h2>
   <p class="bg-primary">bg-primary</p>
   <p class="bg-success">bg-success</p>
   <p class="bg-info">bg-info</p>
   <p class="bg-warning">bg-warning</p>
   <p class="bg-danger">bg-danger</p>
  </div>

  <div class="col-md-3">
   <h2>p text align</h2>
   <p class="text-left">text-left</p>
   <p class="text-right">text-right</p>
   <p class="text-center">text-center</p>
   <p class="text-justify">Justified text. Justified text. Justified text. Justified text. Justified text. Justified text.</p>
   <p class="text-nowrap">No wrap text. No wrap text. No wrap text. No wrap text. No wrap text. No wrap text.</p>


  </div>
 </div>



</div>






<!-- 
<div class="row red-border">

<div class="blue-border">test div</div>
 -->



</div>



<%@ include file="../include/footer.jspf"%>

