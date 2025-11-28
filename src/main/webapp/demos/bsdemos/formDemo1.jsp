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
				<div class="panel-heading">form-horizontal demo 1</div>
				<div class="panel-body">

					<form role="form" class="form-horizontal" id="form1">

						<div class="form-group-sm col-md-6">
							<label for="exampleFormControlInput1">Email address</label>
							<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
						</div>

						<div class="form-group-sm col-md-6">
							<label for="exampleFormControlSelect1">Example select</label>
							<select class="form-control" id="exampleFormControlSelect1">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div>

						<div class="form-group-sm col-md-6">
							<label for="exampleFormControlSelect2">Example multiple select</label>
							<select multiple class="form-control" id="exampleFormControlSelect2">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div>

						<div class="form-group-sm col-md-6">
							<label for="exampleFormControlTextarea1">Example textarea</label>
							<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
						</div>

						<div class="form-group-sm col-md-6">
							<label for="exampleFormControlFile1">Выбрать файл</label>
							<input type="file" class="form-control-file" id="exampleFormControlFile1">
						</div>

						<div class="form-group-sm col-md-6">
							<label for="cbfield1">demo checkbox</label>
							<input type="checkbox" class="form-control" id="cbfield1">
						</div>

						<div class="form-group-sm col-md-6">
							<label class="checkbox-inline">
								<input type="checkbox" id="inlineCheckbox1" value="option1"> 1
							</label>
							<label class="checkbox-inline">
								<input type="checkbox" id="inlineCheckbox2" value="option2"> 2
							</label>
							<label class="checkbox-inline">
								<input type="checkbox" id="inlineCheckbox3" value="option3"> 3
							</label>
						</div>
					</form>
				</div>
			</div>

		</div>



		<div class="col-md-6">

			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">form-horizontal demo 2</div>
				<div class="panel-body">

					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="control-label col-sm-2" for="email">Email:</label>
							<div class="col-sm-10">
								<input type="email" class="form-control" id="email" placeholder="Enter email">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="pwd">Password:</label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="pwd" placeholder="Enter password">
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<div class="checkbox">
									<label>
										<input type="checkbox"> Remember me
									</label>
								</div>
							</div>
						</div>


						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="submit" class="btn btn-default">Submit</button>
							</div>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>

	<div class="row">

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">form-horizontal demo 3</div>
				<div class="panel-body">
					<form class="form-horizontal" role="form">

						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input id="email" type="email" class="form-control" name="email" placeholder="Email">
						</div>
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input id="password" type="password" class="form-control" name="password" placeholder="Password">
						</div>
						<div class="input-group">
							<span class="input-group-addon">Text</span> <input id="msg" type="text" class="form-control" name="msg" placeholder="Additional Info">
						</div>

					</form>
				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="panel panel-primary demo-form-div">
				<div class="panel-heading">form-horizontal demo 4</div>
				<div class="panel-body">

					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label">Focused</label>
							<div class="col-sm-10">
								<input class="form-control" id="focusedInput" type="text" value="Click to focus">
							</div>
						</div>
						<div class="form-group">
							<label for="disabledInput" class="col-sm-2 control-label">Disabled</label>
							<div class="col-sm-10">
								<input class="form-control" id="disabledInput" type="text" disabled>
							</div>
						</div>
						<fieldset disabled>
							<div class="form-group">
								<label for="disabledTextInput" class="col-sm-2 control-label">Fieldset disabled</label>
								<div class="col-sm-10">
									<input type="text" id="disabledTextInput" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label for="disabledSelect" class="col-sm-2 control-label"></label>
								<div class="col-sm-10">
									<select id="disabledSelect" class="form-control">
										<option>Disabled select</option>
									</select>
								</div>
							</div>
						</fieldset>
						<div class="form-group has-success has-feedback">
							<label class="col-sm-2 control-label" for="inputSuccess"> Input with success and icon</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputSuccess"> <span class="glyphicon glyphicon-ok form-control-feedback"></span>
							</div>
						</div>
						<div class="form-group has-warning has-feedback">
							<label class="col-sm-2 control-label" for="inputWarning"> Input with warning and icon</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputWarning"> <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
							</div>
						</div>
						<div class="form-group has-error has-feedback">
							<label class="col-sm-2 control-label" for="inputError"> Input with error and icon</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputError"> <span class="glyphicon glyphicon-remove form-control-feedback"></span>
							</div>
						</div>
					</form>


				</div>
			</div>
		</div>
	</div>

</div>


<%@ include file="../include/footer.jspf"%>

