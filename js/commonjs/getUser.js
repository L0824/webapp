
	$(document).ready(function(){
		//var loginName = "${sessionScope['user'].loginName}";
		var loginName = "${sessionScope['user'].userName}";
		sessionStorage.setItem("loginName",loginName)
		console.log(loginName)
		// alert(loginName);
	});