

//判断是否为登录或退出
var token = sessionStorage.getItem("token"); 
var userPhoneTop = sessionStorage.getItem("userPhoneTop");
if (token != "" && token != null) {
    jsonAjax("/user/getUserInfo",{token:token},getUserInfo);
    function getUserInfo(data) {
        // console.log(data);
        $("#goUrl").show();
        $("#noLogin").hide();
        userRealname = data.User.userRealname;
        if (userRealname == "") {
            if (userPhoneTop != null && userPhoneTop != "") {
                $(".goCount").empty().append(sessionStorage.getItem("userPhoneTop"));
            } else {
                $(".goCount").empty().append(sessionStorage.getItem("newUserPhoneTop"));
            }
        }else{
            $(".goCount").empty().append(userRealname);
        }
    };
    $(".goLogin").click(function () {
        //调用退出接口
        jsonAjax("/logout", {
            userId: sessionStorage.getItem("userId")
        }, logout);
        function logout(data) {
            // console.log(data);
        }
    })
}else{
    $("#goUrl").hide();
    $("#noLogin").show();
}