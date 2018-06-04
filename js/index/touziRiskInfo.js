	//判断是否登陆 
	var token = sessionStorage.getItem("token");
	if (token != "" && token != null) {
	    $(".login").empty().append(sessionStorage.getItem("userPhoneTop") + "/ 退出");
	    $(".register").remove();
	    $(".login").click(function () {
	        jsonAjax("/logout", {
	            userId: sessionStorage.getItem("userId")
	        }, logout);

	        function logout(data) {
	            console.log(data);
	        }
	    })
	}