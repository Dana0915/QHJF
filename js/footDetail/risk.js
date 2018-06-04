var token = sessionStorage.getItem("token");

//计算
$(".submit").click(function () {
    $(".btnTishi").css("display", "none");

    var $num0 = $('input[name="radio"]:checked').val();
    // console.log($num0);

    var $num1 = $('input[name="radio1"]:checked').val();
    // console.log($num1);     

    var $num2 = $('input[name="radio2"]:checked').val();
    // console.log($num2); 

    var $num3 = $('input[name="radio3"]:checked').val();
    // console.log($num3); 

    var $num4 = $('input[name="radio4"]:checked').val();
    // console.log($num4); 

    var $num5 = $('input[name="radio5"]:checked').val();
    // console.log($num5); 

    var $num6 = $('input[name="radio6"]:checked').val();
    // console.log($num6); 

    var $num7 = $('input[name="radio7"]:checked').val();
    // console.log($num7); 

    var $num8 = $('input[name="radio8"]:checked').val();
    // console.log($num8); 

    var $num9 = $('input[name="radio9"]:checked').val();
    // console.log($num9); 

    //获取到测试的总值
    var sum = parseInt($num0) + parseInt($num1) + parseInt($num2) + parseInt($num3) + parseInt($num4) + parseInt($num5) + parseInt($num6) + parseInt($num7) + parseInt($num8) + parseInt($num9);
    console.log(sum);

    //提示判断
    //  if判断
    if (sum < 28) {
        $(".hidden_box").css("display", "block");
        $(".firstbox").css("display", "block");
    } else if (sum >= 28 && sum <= 39) {
        $(".hidden_box").css("display", "block");
        $(".secondbox").css("display", "block");
    } else if (sum >= 39) {
        $(".hidden_box").css("display", "block");
        $(".thirdbox").css("display", "block");
    }else if (token == null || token == "") {
        $(".btnTishi1").show();
        setTimeout(function (){
            $(".btnTishi1").hide()
        }, 1500);
    } else {
        $(".btnTishi").css("display", "block")
    }

    //调接口
    jsonAjax("/user/saveInvestTestResult", {
        token:token,
        investTestResult: sum
    }, saveInvestTestResult);
    function saveInvestTestResult(data) {
        // console.log(data);
    }


});

//关闭按钮
$("#close1").click(function () {
    window.location.href = "../fangxinlicai.html";
    $(".hidden_box").css("display", "none");
    $(".firstbox").css("display", "none");
    
});
$("#close2").click(function () {
    window.location.href = "../fangxinlicai.html";
    $(".hidden_box").css("display", "none");
    $(".secondbox").css("display", "none");
    
});
$("#close3").click(function () {
   window.location.href = "../fangxinlicai.html";
    $(".hidden_box").css("display", "none");
    $(".thirdbox").css("display", "none");
});