//页面逻辑
var url = location.href;
url = url.split("=");

toInfo = url[1];
console.log(toInfo);

if (toInfo == "info4") {
    $(".info4").css("border-left-color", "#2773ff");
    $(".info4").css("background", "#DFEAFF")
    $(".info4Main").show();
} else if (toInfo == "info3") {
    $(".info3").css("border-left-color", "#2773ff");
    $(".info3").css("background", "#DFEAFF")
    $(".info3Main").show();
} else if (toInfo == "info2") {
    $(".info2").css("border-left-color", "#2773ff");
    $(".info2").css("background", "#DFEAFF")
    $(".info2Main").show();
} else {
    $(".info1").css("border-left-color", "#2773ff");
    $(".info1").css("background", "#DFEAFF")
    $(".info1Main").show();
}

//关于平台
$(".info1").click(function () {
    $(".info1").css("border-left-color", "#2773ff");
    $(".info1").css("background", "#DFEAFF")
    $(".info1Main").show();

    $(".addInfo").css("border-left-color", "#fff");
    $(".addInfo").css("background", "#fff");
    $(".info2").css("border-left-color", "#fff");
    $(".info2").css("background", "#fff");
    $(".info3").css("border-left-color", "#fff");
    $(".info3").css("background", "#fff");
    $(".info4").css("border-left-color", "#fff");
    $(".info4").css("background", "#fff");
    $(".info5").css("border-left-color", "#fff");
    $(".info5").css("background", "#fff");
    $(".info6").css("border-left-color", "#fff");
    $(".info6").css("background", "#fff");

    $(".addInfoMain").hide();
    $(".info2Main").hide();
    $(".info3Main").hide();
    $(".info4Main").hide();
    $(".info5Main").hide();
    $(".info6Main").hide();
});

// 总裁寄语
$(".addInfo").click(function () {
    $(".addInfo").css("border-left-color", "#2773ff");
    $(".addInfo").css("background", "#DFEAFF")
    $(".addInfoMain").show();

    $(".info1").css("border-left-color", "#fff");
    $(".info1").css("background", "#fff");
    $(".info2").css("border-left-color", "#fff");
    $(".info2").css("background", "#fff");
    $(".info3").css("border-left-color", "#fff");
    $(".info3").css("background", "#fff");
    $(".info4").css("border-left-color", "#fff");
    $(".info4").css("background", "#fff");
    $(".info5").css("border-left-color", "#fff");
    $(".info5").css("background", "#fff");
    $(".info6").css("border-left-color", "#fff");
    $(".info6").css("background", "#fff");

    $(".info1Main").hide();
    $(".info2Main").hide();
    $(".info3Main").hide();
    $(".info4Main").hide();
    $(".info5Main").hide();
    $(".info6Main").hide();
});

//安全保障
$(".info2").click(function () {
    $(".info2").css("border-left-color", "#2773ff");
    $(".info2").css("background", "#DFEAFF")
    $(".info2Main").show();

    $(".info1").css("border-left-color", "#fff");
    $(".info1").css("background", "#fff");
    $(".addInfo").css("border-left-color", "#fff");
    $(".addInfo").css("background", "#fff");
    $(".info3").css("border-left-color", "#fff");
    $(".info3").css("background", "#fff");
    $(".info4").css("border-left-color", "#fff");
    $(".info4").css("background", "#fff");
    $(".info5").css("border-left-color", "#fff");
    $(".info5").css("background", "#fff");
    $(".info6").css("border-left-color", "#fff");
    $(".info6").css("background", "#fff");

    $(".addInfoMain").hide();
    $(".info1Main").hide();
    $(".info3Main").hide();
    $(".info4Main").hide();
    $(".info5Main").hide();
    $(".info6Main").hide();
});

//法律法规
$(".info3").click(function () {
    $(".info3").css("border-left-color", "#2773ff");
    $(".info3").css("background", "#DFEAFF")
    $(".info3Main").show();

    $(".info1").css("border-left-color", "#fff");
    $(".info1").css("background", "#fff");
    $(".addInfo").css("border-left-color", "#fff");
    $(".addInfo").css("background", "#fff");
    $(".info2").css("border-left-color", "#fff");
    $(".info2").css("background", "#fff");
    $(".info4").css("border-left-color", "#fff");
    $(".info4").css("background", "#fff");
    $(".info5").css("border-left-color", "#fff");
    $(".info5").css("background", "#fff");
    $(".info6").css("border-left-color", "#fff");
    $(".info6").css("background", "#fff");

    $(".addInfoMain").hide();
    $(".info1Main").hide();
    $(".info2Main").hide();
    $(".info4Main").hide();
    $(".info5Main").hide();
    $(".info6Main").hide();
});

//运营报告
$(".info4").click(function () {
    $(".info4").css("border-left-color", "#2773ff");
    $(".info4").css("background", "#DFEAFF")
    $(".info4Main").show();

    $(".info1").css("border-left-color", "#fff");
    $(".info1").css("background", "#fff");
    $(".addInfo").css("border-left-color", "#fff");
    $(".addInfo").css("background", "#fff");
    $(".info2").css("border-left-color", "#fff");
    $(".info2").css("background", "#fff");
    $(".info3").css("border-left-color", "#fff");
    $(".info3").css("background", "#fff");
    $(".info5").css("border-left-color", "#fff");
    $(".info5").css("background", "#fff");
    $(".info6").css("border-left-color", "#fff");
    $(".info6").css("background", "#fff");

    $(".addInfoMain").hide();
    $(".info1Main").hide();
    $(".info2Main").hide();
    $(".info3Main").hide();
    $(".info5Main").hide();
    $(".info6Main").hide();
});

//合作机构
$(".info5").click(function () {
    $(".info5").css("border-left-color", "#2773ff");
    $(".info5").css("background", "#DFEAFF")
    $(".info5Main").show();

    $(".info1").css("border-left-color", "#fff");
    $(".info1").css("background", "#fff");
    $(".addInfo").css("border-left-color", "#fff");
    $(".addInfo").css("background", "#fff");
    $(".info2").css("border-left-color", "#fff");
    $(".info2").css("background", "#fff");
    $(".info3").css("border-left-color", "#fff");
    $(".info3").css("background", "#fff");
    $(".info4").css("border-left-color", "#fff");
    $(".info4").css("background", "#fff");
    $(".info6").css("border-left-color", "#fff");
    $(".info6").css("background", "#fff");

    $(".addInfoMain").hide();
    $(".info1Main").hide();
    $(".info2Main").hide();
    $(".info3Main").hide();
    $(".info4Main").hide();
    $(".info6Main").hide();
});

//联系我们
$(".info6").click(function () {
    $(".info6").css("border-left-color", "#2773ff");
    $(".info6").css("background", "#DFEAFF")
    $(".info6Main").show();

    $(".info1").css("border-left-color", "#fff");
    $(".info1").css("background", "#fff");
    $(".addInfo").css("border-left-color", "#fff");
    $(".addInfo").css("background", "#fff");
    $(".info2").css("border-left-color", "#fff");
    $(".info2").css("background", "#fff");
    $(".info3").css("border-left-color", "#fff");
    $(".info3").css("background", "#fff");
    $(".info4").css("border-left-color", "#fff");
    $(".info4").css("background", "#fff");
    $(".info5").css("border-left-color", "#fff");
    $(".info5").css("background", "#fff");

    $(".addInfoMain").hide();
    $(".info1Main").hide();
    $(".info2Main").hide();
    $(".info3Main").hide();
    $(".info4Main").hide();
    $(".info5Main").hide();
});



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