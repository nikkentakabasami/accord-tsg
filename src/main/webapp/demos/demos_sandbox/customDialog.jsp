<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/header.jspf"%>

<script>
  $(document).ready(function() {

    $("#b1").click(function() {
      $(".custom-dialog").show();
    });

    $("#b2").click(function() {
      $(".custom-dialog").fadeOut();
    });

  });
</script>

<div class="bg-info">



	<div class="row">
		<button id="b1" type="button" class="btn btn-info">show dialog</button>
		<button id="b2" type="button" class="btn btn-info">hide dialog</button>
	</div>



	<div class="custom-dialog bg-info">
		<div class="main-pane bg-success"></div>
		<div class="right-pane bg-warning"></div>
	</div>

</div>


<%@ include file="../include/footer.jspf"%>

