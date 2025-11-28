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
				<div class="panel-heading">Button Styles</div>
				<div class="panel-body">

					<h2>Button Styles</h2>
					<button type="button" class="btn">Basic</button>
					<button type="button" class="btn btn-default">Default</button>
					<button type="button" class="btn">Primary</button>
					<button type="button" class="btn btn-success">Success</button>
					<button type="button" class="btn btn-info">Info</button>
					<button type="button" class="btn btn-warning">Warning</button>
					<button type="button" class="btn btn-danger">Danger</button>
					<button type="button" class="btn btn-link">Link</button>

				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">Button sizes</div>
				<div class="panel-body">
					<button type="button" class="btn">Basic</button>
					<button type="button" class="btn btn-lg">btn-lg</button>
					<button type="button" class="btn btn-md">btn-md</button>
					<button type="button" class="btn btn-sm">btn-sm</button>
					<button type="button" class="btn btn-xs">btn-xs</button>
				</div>

			</div>
		</div>




	</div>

	<div class="row">

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">btn class for different elements</div>
				<div class="panel-body">

					<a href="#" class="btn" role="button">Link Button</a>
					<button type="button" class="btn">Button</button>
					<input type="button" class="btn" value="Input Button"> <input type="submit" class="btn" value="Submit Button">


				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">misc button classes</div>
				<div class="panel-body">
					<div class="row">
						<button type="button" class="btn btn-block">btn-block</button>
						<button type="button" class="btn active">active</button>
						<button type="button" class="btn disabled">disabled</button>


					</div>


				</div>
			</div>
		</div>

	</div>





	<div class="row">

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">btn-group</div>
				<div class="panel-body">

					<h3>btn-group btn-group-lg</h3>
					<div class="btn-group btn-group-lg">
						<button type="button" class="btn">Apple</button>
						<button type="button" class="btn">Samsung</button>
						<button type="button" class="btn">Sony</button>
					</div>
					<h3>btn-group</h3>
					<div class="btn-group">
						<button type="button" class="btn">Apple</button>
						<button type="button" class="btn">Samsung</button>
						<button type="button" class="btn">Sony</button>
					</div>
					<h3>btn-group btn-group-sm</h3>
					<div class="btn-group btn-group-sm">
						<button type="button" class="btn">Apple</button>
						<button type="button" class="btn">Samsung</button>
						<button type="button" class="btn">Sony</button>
					</div>
					<h3>btn-group btn-group-xs</h3>
					<div class="btn-group btn-group-xs">
						<button type="button" class="btn">Apple</button>
						<button type="button" class="btn">Samsung</button>
						<button type="button" class="btn">Sony</button>
					</div>

				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">btn-group-vertical</div>
				<div class="panel-body">
					<div class="btn-group-vertical">
						<button type="button" class="btn btn-primary">Apple</button>
						<button type="button" class="btn btn-primary">Samsung</button>
						<button type="button" class="btn btn-primary">Sony</button>
					</div>
				</div>


			</div>
		</div>

	</div>




	<div class="row">

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">btn-group btn-group-justified</div>
				<div class="panel-body">

					<div class="btn-group btn-group-justified">
						<div class="btn-group">
							<button type="button" class="btn">Apple</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn">Samsung</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn">Sony</button>
						</div>
					</div>

					<div class="btn-group btn-group-justified">
						<a href="#" class="btn">Apple</a> <a href="#" class="btn">Samsung</a> <a href="#" class="btn">Sony</a>
					</div>


				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">dropdown-toggle</div>
				<div class="panel-body">


					<div class="btn-group">
						<button type="button" class="btn">Apple</button>
						<button type="button" class="btn">Samsung</button>
						<div class="btn-group">
							<button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
								Sony <span class="caret"></span>
							</button>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">Tablet</a></li>
								<li><a href="#">Smartphone</a></li>
							</ul>
						</div>
					</div>


				</div>
			</div>
		</div>

	</div>


	<div class="row">

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">pull-right</div>
				<div class="panel-body">
					<button type="button" class="btn btn-default">button1</button>
					<button type="button" class="btn btn-default">button2</button>
					<button type="button" class="btn btn-default pull-right">pull-right</button>

				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">header2</div>
				<div class="panel-body"></div>
			</div>
		</div>

	</div>

</div>



<%@ include file="../include/footer.jspf"%>

