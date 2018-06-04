

//判断是否为登录或退出
var token = sessionStorage.getItem("token"); 
var userPhoneTop = sessionStorage.getItem("userPhoneTop");
if (token != "" && token != null) {
    if (userPhoneTop != null && userPhoneTop != "") {
        $(".login").empty().append(sessionStorage.getItem("userPhoneTop") + "　退出");
    } else {
        $(".login").empty().append(sessionStorage.getItem("newUserPhoneTop") + "　退出");
    }
    $(".register").remove();
    $(".login").click(function () {
        //调用退出接口
        jsonAjax("/logout", {
            userId: sessionStorage.getItem("userId")
        }, logout);
        function logout(data) {
            console.log(data);
        }
    })
}
// else{
//     $(".login").empty().append(sessionStorage.getItem("newUserPhoneTop") + "/ 退出");
//     $(".register").remove();
// }