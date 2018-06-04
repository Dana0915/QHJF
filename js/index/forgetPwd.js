// 清空input的值
clear();
function clear() {
    $('.forgetContent').find("input[type=text]").val("");
}

//图片验证码
var verifyCode = new GVerify({        
    id: "v_container",
            type: "number"
});

//验证手机号码
sessionStorage.removeItem("forgetPhoneNumber");
$(".phoneNumber").blur(function () {
    var mobile = $(".phoneNumber").val();
    var reMobile = /^1[34578]\d{9}$/;
    if (reMobile.test(mobile) == false || mobile == null) {
        $(".phoneTishi").css("display", "block");
        return true;
    } else {
        $(".phoneTishi").css("display", "none");
        var forgetPhoneNumber = mobile;
        //本地存储个人注册的手机号码
        sessionStorage.setItem("forgetPhoneNumber", forgetPhoneNumber);
        return false;
    }
})

//验证图片验证码
$(".imgYzm").blur(function () {
    // 图片验证码
    var res = verifyCode.validate(document.getElementById("code_input").value);    
    // console.log(res);
    if (res) {
        $(".imgYzmTishi").css("display", "none"); 
    } else {
        $(".imgYzmTishi").css("display", "block");
    }
});
function picYZM() {
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if (res) {
        $(".imgYzmTishi").css("display", "none");
    } else if ($(".imgYzm").val().length >= 4 && res == false) {
        $(".imgYzmTishi").css("display", "block");
    } else{
        $(".imgYzmTishi").css("display", "none");
    }
}

//验证短信验证码
var countdown = 90;
function settime(obj) {
    if (countdown == 0) {
        $(obj).attr("disabled", false);
        obj.value = "获取验证码";
        countdown = 90;
        return;
    } else {
        $(obj).attr("disabled", true);
        obj.value = "重新发送(" + countdown + ")";
        countdown--;
    }
    setTimeout(function () {
        settime(obj);
    }, 1000)
};

$(".clickMessage").click(function () {
    var mobile = $(".phoneNumber").val();
    var reMobile = /^1[34578]\d{9}$/;
    if (reMobile.test(mobile) != false && mobile != null) {
        settime(this);
    }
    //调用三方短信接口
    jsonAjax("/three/getSmsCode", {
        phone: sessionStorage.getItem("forgetPhoneNumber"),
        msgType: 1
    }, getSmsCode);

    function getSmsCode(data) {
        console.log(data);
        if (data.result == 300) {
            $(".tishi").show();
            setTimeout(function () {
                $(".tishi").hide();
            }, 1500);
        }
    }
})

sessionStorage.removeItem("forgetMessageNumber");
$(".messageNumber").blur(function () {
    var messageNumber = $(".messageNumber").val();
    var regCode = /^\d{6}$/;
    if (regCode.test(messageNumber) == false) {
        $(".messageYzmTishi").css("display", "block");
        setTimeout(function(){
            $(".messageYzmTishi").css("display", "none");
        }, 1000);
        return true;
    } else {
        $(".messageYzmTishi").css("display", "none");
        console.log(messageNumber);
        sessionStorage.setItem("forgetMessageNumber", messageNumber);
        return false;
    }
})

//验证密码
sessionStorage.removeItem("newPwd");
$(".newPwd").blur(function () {
    var pwd = $(".newPwd").val();
    var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (reqPwd.test(pwd) != false && pwd != null) {
        $(".newPwdTishi").css("display", "none");
        var newBasePwd = $.base64.btoa(pwd);
        sessionStorage.setItem("newPwd", newBasePwd);
        return true;
    } else {
        $(".newPwdTishi").css("display", "block");
        return false;
    }
});

//点击忘记密码按钮
$(".tijiaoBox").click(function () {
    var resNumber = verifyCode.validate(document.getElementById("code_input").value);
    console.log(resNumber);

    if (resNumber == true) {
        //调找回密码接口
        jsonAjax("/pwd/findPwd", {
            phone: $(".phoneNumber").val(),
            password: sessionStorage.getItem("newPwd"),
            smsCode: sessionStorage.getItem("forgetMessageNumber")
        }, getSmsCode);

        function getSmsCode(data) {
            console.log(data);
            console.log($(".phoneNumber").val());

            if (data.resultMsg == "修改成功") {
                $(".forgetContent").css("display", "none");
                $(".successFindBox").css("display", "block");
            } else if (data.result == 300) {
                if ($(".phoneNumber").val() == "" || data.resultMsg == "请求参数[phone]不完整") {
                    $(".tishi").show();
                    setTimeout(function () {
                        $(".tishi").hide();
                    }, 1500);
                    // $(".forgetContent").css("display", "none");
                    // $(".loseFindBox").css("display", "block");
                } else if (data.resultMsg == "请求参数[password]不完整" || $(".newPwd").val() == "") {
                    $(".tishi3").show();
                    setTimeout(function () {
                        $(".tishi3").hide();
                    }, 1500);
                } else if (data.resultMsg == "待验证短信验证码没有输入" || $(".messageNumber").val() == "") {
                    $(".tishi2").show();
                    setTimeout(function () {
                        $(".tishi2").hide();
                    }, 1500);
                }

            } else if (data.resultMsg == "短信验证码错误或已超时") {
                     $(".msgTS").show();
                     setTimeout(function () {
                         $(".msgTS").hide();
                     }, 1500);
            }
        };
    } else if ($(".newPwd").val() == "" || $(".messageNumber").val() == "" || $(".phoneNumber").val() == "" || $(".imgYzm").val()) {
        $(".tishi4").show();
        setTimeout(function () {
            $(".tishi4").hide();
        }, 1500);
    }
    

    
})
$(".findLogin").click(function () {
    window.location.href = "login.html";
})
$(".findLose").click(function () {
    window.location.href = "forgetPwd.html";
});

