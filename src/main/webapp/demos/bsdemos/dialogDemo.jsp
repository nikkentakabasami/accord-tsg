<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/header.jspf"%>

<link rel="stylesheet" type="text/css" href="demos/css/demo.css">

<script type="module" src="demos/js/bs-dialog-demo.js"></script>





<div class="container">
 <h2>modal dialog demos</h2>

 <div class="row">
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal1">dialog 1</button>
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">dialog 2 - custom size</button>

  <button id="b3" type="button" class="btn btn-info btn-lg">dialog 2 - show programmatically</button>


 </div>

 <div id="result"></div>





 <div class="modal fade" id="myModal1" role="dialog">
  <div class="modal-dialog modal-lg">
   <!-- 
modal-dialog
  задаёт размер и отступы диалога

modal-lg
modal-sm
  меняют размеры диалога

 -->

   <div class="modal-content">
    <div class="modal-header" style="padding: 35px 50px;">
     <button type="button" class="close" data-dismiss="modal">&times;</button>
     <h4>
      <span class="glyphicon glyphicon-lock"></span> Login
     </h4>
    </div>
    <div class="modal-body" style="padding: 40px 50px;">
     <form role="form">
      <div class="form-group">
       <label for="usrname">
        <span class="glyphicon glyphicon-user"></span> Username
       </label>
       <input type="text" class="form-control" id="usrname" placeholder="Enter email">
      </div>
      <div class="form-group">
       <label for="psw">
        <span class="glyphicon glyphicon-eye-open"></span> Password
       </label>
       <input type="text" class="form-control" id="psw" placeholder="Enter password">
      </div>
      <div class="checkbox">
       <label>
        <input type="checkbox" value="" checked>
        Remember me
       </label>
      </div>
      <button type="submit" class="btn btn-success btn-block">
       <span class="glyphicon glyphicon-off"></span> Login
      </button>
     </form>
    </div>
    <div class="modal-footer">
     <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal">
      <span class="glyphicon glyphicon-remove"></span> Cancel
     </button>
     <p>
      Not a member? <a href="#">Sign Up</a>
     </p>
     <p>
      Forgot <a href="#">Password?</a>
     </p>
    </div>
   </div>

  </div>
 </div>
















 <div class="modal fade" id="myModal2" role="dialog">


  <div class="my-custom-size-dialog">

   <div class="modal-content">
    <div class="modal-header">
     <button type="button" class="close" data-dismiss="modal">&times;</button>
     <h4 class="modal-title">Modal Header</h4>
    </div>
    <div class="modal-body">
     <p>Some text in the modal.</p>

     <button id="b4" type="button" class="btn btn-info btn-lg">show loading panel</button>


     <div class="row">
      <div class="col-md-4 bg-info">
       <h3>Column 1</h3>
      </div>
      <div class="col-md-2 bg-warning">
       <h3>Column 2</h3>
      </div>
      <div class="col-md-6 bg-info">
       <h3>Column 3</h3>
      </div>
     </div>


    </div>
    <div class="modal-footer">
     <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    </div>
   </div>

  </div>
 </div>











</div>









<%@ include file="../include/footer.jspf"%>

