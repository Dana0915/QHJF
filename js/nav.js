
$(".index").click(function(){
	$(".index_img").css("display","inline-block");
	$(".index_txt").css("color","#2395FF");
	
	$(".licai_img").css("display","none");
	$(".licai_txt").css("color","#666666");
	
	$(".zhanghu_img").css("display","none");
	$(".zhanghu_txt").css("color","#666666");
	
	$(".xinxi_img").css("display","none");
	$(".xinxi_txt").css("color","#666666");
	
	window.location.href="index.html";
})
$(".licai").click(function(){
	$(".licai_img").css("display","inline-block");
	$(".licai_txt").css("color","#2395FF");
	
	$(".index_img").css("display","none");
	$(".index_txt").css("color","#666666");
	
	$(".zhanghu_img").css("display","none");
	$(".zhanghu_txt").css("color","#666666");
	
	$(".xinxi_img").css("display","none");
	$(".xinxi_txt").css("color","#666666");
	
	window.location.href="fangxinlicai.html";
	
})
$(".zhanghu").click(function(){
	$(".zhanghu_img").css("display","inline-block");
	$(".zhanghu_txt").css("color","#2395FF");
	
	$(".index_img").css("display","none");
	$(".index_txt").css("color","#666666");
	
	$(".licai_img").css("display","none");
	$(".licai_txt").css("color","#666666");
	
	$(".xinxi_img").css("display","none");
	$(".xinxi_txt").css("color","#666666");
	
	
	var token = sessionStorage.getItem("token");
	if (token == "" || token == null) {
		window.location.href = "login.html";
	}else{
		window.location.href = "myCount.html";
	}


})
$(".xinxi").click(function(){
	$(".xinxi_img").css("display","inline-block");
	$(".xinxi_txt").css("color","#2395FF");
	
	$(".index_img").css("display","none");
	$(".index_txt").css("color","#666666");
	
	$(".licai_img").css("display","none");
	$(".licai_txt").css("color","#666666");
	
	$(".zhanghu_img").css("display","none");
	$(".zhanghu_txt").css("color","#666666");
	
	window.location.href="xinxipilou.html";
})
//登录点击事件
$(".login").click(function(){
	window.location.href="login.html";
})

//注册点击事件
$(".register").click(function(){
	window.location.href="register.html";
});

// 退出时间
$(".goLogin").click(function () {
	window.location.href = "login.html";
});

// 账号事件
$(".goCount").click(function () {
	window.location.href = "myCount.html";
});


$(".left_logo").click(function () {
	window.location.href = "index.html";
});



// 二维码图片
$(".wxDown").empty().append('<img src = "img/index/qhEWM.png" >');
$(".qqDown").empty().append('<img src = "img/index/qqEWM.png" >');

//wx二维码
$(".phone_left .wx").hover(function () {
	$(".wxDown").show();
},function () {
	$(".wxDown").hide();
});

//qq二维码
$(".phone_left .qq").hover(function () {
	$(".qqDown").show();
}, function () {
	$(".qqDown").hide();
});
