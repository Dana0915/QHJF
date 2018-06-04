$(".loginCenter input:first").addClass("login_active");
$(".loginMainList").eq(0).show(); //.slideDown()滑出的效果
$(".loginCenter input").click(function () {
    $(this).addClass("login_active").siblings().removeClass("login_active");
    var i = $(".loginCenter input").index(this);
    $(".loginMainList").eq(i).show().siblings(".loginMainList").hide();
});

//  点击logo跳转至首页
$(".navLeft").click(function () {
    window.location.href = "index.html"
});

// 点击新手指南跳转
$(".a3").click(function () {
    window.location.href = "footDetail/newbie.html"
});


// 切换标签
$(".loginList>div>input").focus(function () {
    var i = $(".loginList>div>input").index(this);
    $(".loginList>div").eq(i).addClass("div_active");
    $(".loginList>div").eq(2).removeClass("div_active");
}).blur(function () {
    var i = $(".loginList>div>input").index(this);
    $(".loginList>div").eq(i).removeClass("div_active");
    $(".loginList>div").eq(2).removeClass("div_active");
});

//验证密码登录的手机号码
// sessionStorage.removeItem("personLoginPhone");
$(".personLoginPhone").blur(function () {
    var mobile = $(".personLoginPhone").val();
    var reMobile = /^1[34578]\d{9}$/;
    if (reMobile.test(mobile) == false) {
        $(".pwdRegPhoneTishi").css("display", "block");
        return true;
    } else {
        $(".pwdRegPhoneTishi").css("display", "none");
        var personLoginPhone = mobile;
        //本地存储个人注册的手机号码
        sessionStorage.setItem("personLoginPhone", personLoginPhone);
        return false;
    }
});

//验证密码登录的输入的密码
sessionStorage.removeItem("personLoginBasePwd");
$(".personLoginPwd").blur(function () {
    var pwd = $(".personLoginPwd").val();
    var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (rePwd.test(pwd) == false) {
        return true;
    } else {
        var personLoginBasePwd = $.base64.btoa(pwd);
        //本地存储base64个人注册设置的密码
        sessionStorage.setItem("personLoginBasePwd", personLoginBasePwd);
        return false;
    }
});

//调用密码登录按钮
var token = "";
var date = new Date();
var expiresDate = date.setTime(date.getTime() + (30 * 60 * 1000));
var userId = "";
sessionStorage.removeItem("userId");
sessionStorage.removeItem("token");
$("#personLoginBtn").click(function () {
    //调用登录的按钮
    jsonAjax("/login", {
        phone: $(".personLoginPhone").val(),
        password: $.base64.btoa($(".personLoginPwd").val()),
        clientType: "PC",
        loginType: 1,
        smsCode: ""
    }, login);

    function login(data) {
        console.log(data);
        // console.log($.base64.btoa($(".personLoginPwd").val()));
        
        var mobile = $(".personLoginPhone").val();
        var reMobile = /^1[34578]\d{9}$/;
        

        if ($(".personLoginPhone").val() == "" && $(".personLoginPwd").val() == "") {
            $(".pwdLoginTishi1").empty().append("请输入完整正确的用户信息");
            $(".pwdLoginTishi1").show();
            setTimeout(function () {
                $(".pwdLoginTishi1").hide();
            }, 1500)
        }else {
            if (data.result == 300) {
                if (data.resultMsg == "请求参数[phone]不完整") {
                    $(".pwdLoginTishi1").show();
                    setTimeout(function () {
                        $(".pwdLoginTishi1").hide();
                    }, 1500)
                } else if (data.resultMsg == "请求参数[pwd]不完整") {
                    $(".pwdLoginTishi2").show();
                    setTimeout(function () {
                        $(".pwdLoginTishi2").hide();
                    }, 1500)
                } else if (data.resultMsg == "登录密码错误") {
                    $(".pwdLoginTishi").css("display", "block");
                    setTimeout(function () {
                        $(".pwdLoginTishi").hide();
                    }, 1500);
                } else if (data.resultMsg == "该账号不存在") {
                    $(".pwdLoginTishi3").css("display", "block");
                    setTimeout(function () {
                        $(".pwdLoginTishi3").hide();
                    }, 1500);
                } else if (data.resultMsg == "该账号已锁定，请联系客服") {
                    $(".pwdLoginTishi3").empty().append("该账号已锁定，请联系客服：400-821-6328");
                    $(".pwdLoginTishi3").show();
                    setTimeout(function () {
                        $(".pwdLoginTishi3").hide();
                    }, 2500);
                } else if (data.resultMsg == "账号或密码错误") {
                    $(".pwdLoginTishi3").text("账号或密码错误");
                    $(".pwdLoginTishi3").show();
                    setTimeout(function () {
                        $(".pwdLoginTishi3").hide();
                    }, 1500);
                }
            }
        }


        
        token = data.token;
        //本地存储userId
        userId = data.User.id;
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("token", token);

        if (data.result == 200) {
            userPhoneTop = data.User.userPhone1;
            sessionStorage.setItem("userPhoneTop", userPhoneTop);
            $(".pwdLoginTishi").css("display", "none");

            window.location.href = 'index.html';

            // 判断是否回退
            // var prevLink = document.referrer;
            // if ($.trim(prevLink) == '') {
            //     location.href = 'index.html';
            // } else {
            //     if (prevLink.indexOf('index.html') != -1) { //来自首页页面
            //         location.href = 'index.html';
            //     }
            //     location.href = prevLink;
            // }
        }
    }
})


/*回车登陆事件*/
//验证密码登录的输入的密码 
sessionStorage.removeItem("personLoginBasePwd1");
function changePwd() {
    var pwd = $(".personLoginPwd").val();
    var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (rePwd.test(pwd) == false) {
        return true;
    } else {
        $(".pwdRegPasswordTishi").css("display", "none");
        var personLoginBasePwd = $.base64.btoa(pwd);
        //本地存储base64个人注册设置的密码
        sessionStorage.setItem("personLoginBasePwd1", personLoginBasePwd);
        return false;
    }
}
$("#enterLogin").keyup(function (event) {
    var key = event.which || event.keyCode;
    if (key == "13") { //判断如果按下的是回车键则执行下面的代码
        //调用密码登录按钮
        var token = "";
        var date = new Date();
        var expiresDate = date.setTime(date.getTime() + (30 * 60 * 1000));
        var userId = "";
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        var password = $("#enterLogin").val()
        //调用登录的按钮
        jsonAjax("/login", {
            phone: $(".personLoginPhone").val(),
            password: $.base64.btoa($(".personLoginPwd").val()),
            clientType: "PC",
            loginType: 1,
            smsCode: ""
        }, login);

        function login(data) {
            // console.log(data);
            if ($(".personLoginPhone").val() == "" && $(".personLoginPwd").val() == "") {
                $(".pwdLoginTishi1").empty().append("请输入完整正确的用户信息");
                $(".pwdLoginTishi1").show();
                setTimeout(function () {
                    $(".pwdLoginTishi1").hide();
                }, 1500)
            } else {
                if (data.result == 300) {
                    if (data.resultMsg == "请求参数[phone]不完整") {
                        $(".pwdLoginTishi1").show();
                        setTimeout(function () {
                            $(".pwdLoginTishi1").hide();
                        }, 1500)
                    } else if (data.resultMsg == "请求参数[pwd]不完整") {
                        $(".pwdLoginTishi2").show();
                        setTimeout(function () {
                            $(".pwdLoginTishi2").hide();
                        }, 1500)
                    } else if (data.resultMsg == "登录密码错误") {
                        $(".pwdLoginTishi").css("display", "block");
                        setTimeout(function () {
                            $(".pwdLoginTishi").hide();
                        }, 1500);
                    } else if (data.resultMsg == "该账号不存在") {
                        $(".pwdLoginTishi3").css("display", "block");
                        setTimeout(function () {
                            $(".pwdLoginTishi3").hide();
                        }, 1500);
                    } else if (data.resultMsg == "该账号已锁定，请联系客服") {
                        $(".pwdLoginTishi3").empty().append("该账号已锁定，请联系客服：400-821-6328");
                        $(".pwdLoginTishi3").show();
                        setTimeout(function () {
                            $(".pwdLoginTishi3").hide();
                        }, 2500);
                    } else if (data.resultMsg == "账号或密码错误") {
                        $(".pwdLoginTishi3").text("账号或密码错误");
                        $(".pwdLoginTishi3").show();
                        setTimeout(function () {
                            $(".pwdLoginTishi3").hide();
                        }, 1500);
                    }
                }
            }
            token = data.token;
            //本地存储userId
            userId = data.User.id;
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("token", token);

            if (data.result == 200) {
                userPhoneTop = data.User.userPhone1;
                sessionStorage.setItem("userPhoneTop", userPhoneTop);
                $(".pwdLoginTishi").css("display", "none");

                window.location.href = "index.html";

                // 判断是否回退
                // var prevLink = document.referrer;
                // if ($.trim(prevLink) == '') {
                //     location.href = 'index.html';
                // } else {
                //     if (prevLink.indexOf('index.html') != -1) { //来自首页页面
                //         location.href = 'index.html';
                //     }
                //     location.href = prevLink;
                // }
            }
        }
    }
});
/*回车登陆事件*/






//验证验证码登录的手机号码
// sessionStorage.removeItem("yzmLoginPhone");
$(".yzmLoginPhone").blur(function () {
    var mobile = $(".yzmLoginPhone").val();
    var reMobile = /^1[34578]\d{9}$/;
    if (reMobile.test(mobile) == false || mobile == null) {
        $(".yzmLoginPhoneNumTishi").css("display", "block");
        return true;
    } else {
        $(".yzmLoginPhoneNumTishi").css("display", "none");
        var yzmLoginPhone = mobile;
        //本地存储个人注册的手机号码
        sessionStorage.setItem("yzmLoginPhone", yzmLoginPhone);
        return false;
    }
})

//点击获取短信验证码
var countdown = 90;
function settime(obj) {
    if (countdown == 0) {
        $(obj).attr("disabled", false);
        obj.value = "点击获取验证码";
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
$(".yzmLoginClickMessage").click(function () {
    var mobile = $(".yzmLoginPhone").val();
    var reMobile = /^1[34578]\d{9}$/;
    if (reMobile.test(mobile) != false && mobile != null) {
        settime(this);
    }
    //调用三方短信接口
    jsonAjax("/three/getSmsCode", {
        phone: $(".yzmLoginPhone").val(),
        msgType: 1
    }, getSmsCode);

    function getSmsCode(data) {
        // console.log(data);
        if (data.result == 300) {
            $(".yzmLoginTishi2").show();
            setTimeout(function () {
                $(".yzmLoginTishi2").css("display", "none");
            }, 1500);
        }
    }
});
//验证短信验证码
sessionStorage.removeItem("yzmLoginNumber");
$(".yzmLoginNumber").blur(function () {
    var yzmLoginNumber = $(".yzmLoginNumber").val();
    var regCode = /^\d{6}$/;
    if (regCode.test(yzmLoginNumber) == false) {
        return true;
    } else {
        sessionStorage.setItem("yzmLoginNumber", yzmLoginNumber);
        return false;
    }
})

//点击验证码登录按钮
sessionStorage.removeItem("userId");
sessionStorage.removeItem("token");
$("#yzmLoginBtn").click(function () {
    //调用验证码登录按钮
    jsonAjax("/login", {
        phone: $(".yzmLoginPhone").val(),
        password: "",
        clientType: "PC",
        loginType: 2,
        smsCode: $(".yzmLoginNumber").val()
    }, yzmLogin);

    function yzmLogin(data) {
        console.log(data);
        if (data.result == 300) {
            var mobile = $(".yzmLoginPhone").val();
            var reMobile = /^1[34578]\d{9}$/;
            if (reMobile.test(mobile) == false || mobile == null) {
                $(".yzmLoginTishi2").css("display", "block");
                setTimeout(function () {
                    $(".yzmLoginTishi2").css("display", "none");
                }, 1500);
            } else if (data.resultMsg == "该账号已锁定，请联系客服") {
                $(".yzmLoginTishi1").empty().append("该账号已锁定，请联系客服：400-821-6328");
                $(".yzmLoginTishi1").show();
                setTimeout(function () {
                    $(".yzmLoginTishi1").hide();
                }, 2500);
            } else if (data.resultMsg == "短信验证码错误或已超时") {
                $(".yzmLoginTishi1").show();
                setTimeout(function () {
                    $(".yzmLoginTishi1").hide();
                }, 1500);
            }
            
        } else if (data.result == 100) {
            $(".yzmLoginTishi1").css("display", "block");
            setTimeout(function () {
                $(".yzmLoginTishi1").css("display", "none");
            }, 1500);
        }
        token = data.token;
        //本地存储userId
        userId = data.User.id;
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("token", token);

        if (data.result == 200) {
            userPhone = data.User.userPhone;
            var userPhoneTop = userPhone.substr(0, 3) + "****" + userPhone.substr(7);
            sessionStorage.setItem("userPhoneTop", userPhoneTop);
            $(".yzmLoginTishi1").css("display", "none");
            window.location.href = "index.html";

            // 判断是否回退
            // var prevLink = document.referrer;
            // if ($.trim(prevLink) == '') {
            //     location.href = 'index.html';
            // } else {
            //     if (prevLink.indexOf('index.html') != -1) { //来自首页页面
            //         location.href = 'index.html';
            //     }
            //     location.href = prevLink;
            // }
        } else {
            $(".yzmLoginTishi1").css("display", "block");
            setTimeout(function(){
                $(".yzmLoginTishi1").css("display", "none");
            }, 1500);
        }
    }
});


/*验证码回车登陆事件*/
    //验证短信验证码
sessionStorage.removeItem("yzmLoginNumber1");
function changeYZM() {
    var yzmLoginNumber = $(".yzmLoginNumber").val();
    var regCode = /^\d{6}$/;
    if (regCode.test(yzmLoginNumber) == false) {
        return true;
    } else {
        $(".yzmLoginTishi").css("display", "none");
        sessionStorage.setItem("yzmLoginNumber1", yzmLoginNumber);
        return false;
    }
}
$("#enterLogin1").keyup(function (event) {
    var key = event.which || event.keyCode;
    if (key == "13") { //判断如果按下的是回车键则执行下面的代码
        // console.log('按下了回车键'); //弹出提示信息

        //点击验证码登录按钮
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        //调用验证码登录按钮
        jsonAjax("/login", {
            phone: $(".yzmLoginPhone").val(),
            password: "",
            clientType: "PC",
            loginType: 2,
            smsCode: $(".yzmLoginNumber").val()
        }, yzmLogin);

        function yzmLogin(data) {
            console.log(data);
            if (data.result == 300) {
                if (reMobile.test(mobile) == false || mobile == null) {
                    $(".yzmLoginTishi2").css("display", "block");
                    setTimeout(function () {
                        $(".yzmLoginTishi2").css("display", "none");
                    }, 1500);
                } else if (data.resultMsg == "该账号已锁定，请联系客服") {
                    $(".yzmLoginTishi1").empty().append("该账号已锁定，请联系客服：400-821-6328");
                    $(".yzmLoginTishi1").show();
                    setTimeout(function () {
                        $(".yzmLoginTishi1").hide();
                    }, 2500);
                } else if (data.resultMsg == "短信验证码错误或已超时") {
                    $(".yzmLoginTishi1").show();
                    setTimeout(function () {
                        $(".yzmLoginTishi1").hide();
                    }, 1500);
                }
            } else if (data.result == 100) {
                $(".yzmLoginTishi1").css("display", "block");
                setTimeout(function () {
                    $(".yzmLoginTishi1").css("display", "none");
                }, 1500);
            }
            token = data.token;
            //本地存储userId
            userId = data.User.id;

            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("token", token);

            if (data.result == 200) {
                userPhone = data.User.userPhone;
                var userPhoneTop = userPhone.substr(0, 3) + "****" + userPhone.substr(7);
                sessionStorage.setItem("userPhoneTop", userPhoneTop);
                $(".yzmLoginTishi1").css("display", "none");
                // window.location.href = "index.html";
                // 判断是否回退
                // var prevLink = document.referrer;
                // if ($.trim(prevLink) == '') {
                //     location.href = 'index.html';
                // } else {
                //     if (prevLink.indexOf('index.html') != -1) { //来自首页页面
                //         location.href = 'index.html';
                //     }
                //     location.href = prevLink;
                // }
            } else {
                $(".yzmLoginTishi1").css("display", "block");
                setTimeout(function () {
                    $(".yzmLoginTishi1").css("display", "none");
                }, 1500);
            }
        };

    }
});
/*验证码回车登陆事件*/
