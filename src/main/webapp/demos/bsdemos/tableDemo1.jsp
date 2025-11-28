<%@page import="java.util.Enumeration"%>
<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ include file="../include/header.jspf"%>

<link rel="stylesheet" type="text/css" href="demos/css/demo.css">


<div class="container">

	<div class="row">

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">header1</div>
				<div class="panel-body">

					<h2>Bordered Table</h2>
					<p>The .table-bordered class adds borders to a table:</p>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>John</td>
								<td>Doe</td>
								<td>john@example.com</td>
							</tr>
							<tr>
								<td>Mary</td>
								<td>Moe</td>
								<td>mary@example.com</td>
							</tr>
							<tr>
								<td>July</td>
								<td>Dooley</td>
								<td>july@example.com</td>
							</tr>
						</tbody>
					</table>


				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">header2</div>
				<div class="panel-body">


					<h2>Contextual Classes</h2>
					<p>Contextual classes can be used to color table rows or table cells. The classes that can be used are: .active, .success, .info, .warning, and .danger.</p>
					<table class="table">
						<thead>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Default</td>
								<td>Defaultson</td>
								<td>def@somemail.com</td>
							</tr>
							<tr class="success">
								<td>Success</td>
								<td>Doe</td>
								<td>john@example.com</td>
							</tr>
							<tr class="danger">
								<td>Danger</td>
								<td>Moe</td>
								<td>mary@example.com</td>
							</tr>
							<tr class="info">
								<td>Info</td>
								<td>Dooley</td>
								<td>july@example.com</td>
							</tr>
							<tr class="warning">
								<td>Warning</td>
								<td>Refs</td>
								<td>bo@example.com</td>
							</tr>
							<tr class="active">
								<td>Active</td>
								<td>Activeson</td>
								<td>act@example.com</td>
							</tr>
						</tbody>
					</table>

				</div>
			</div>
		</div>


	</div>

</div>

<%@ include file="../include/footer.jspf"%>

