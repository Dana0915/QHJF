//接口的公共路径
// 测试
// var commonUrl = "http://test.qihangjf.com:29083/interface"

// 生产环境
var commonUrl = "https://api.qihangjf.com/interface/";

//封装ajax的调用方法
		var jsonAjax = function(InterfaceName,data,success_handler){
			if(window.navigator.onLine == true){
				$.ajax({
					url:commonUrl + InterfaceName,
					type:"POST",
					dataType: "json",
					cache: false,
					contentType: "application/x-www-form-urlencoded;charset=UTF-8",
					data:data,
					success:function(data){
						success_handler(data);
					},
					error:function(data){
						promptDialogBox("服务器异常,请稍后再试!");
					}
				})
			}else{
				promptDialogBox("世界上最远的距离是没有网");
			}
		}