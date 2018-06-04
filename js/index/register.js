	//选项卡
	$(".registerCenter input:first").addClass("reg_active");
	$(".registerMainList").eq(0).show();
	$(".registerCenter input").click(function () {
	    $(this).addClass("reg_active").siblings().removeClass("reg_active");
	    var i = $(".registerCenter input").index(this);
	    $(".registerMainList").eq(i).show().siblings(".registerMainList").hide();
	});

	// 点击logo跳转至首页 
	$(".navLeft").click(function () {
	    window.location.href = "index.html"
	})

// 点击新手指南
	$(".a3").click(function () {
		window.location.href = "footDetail/newbie.html"
	});

// 个人注册
$(".reglist>div>input[type=text]").focus(function () {
	var i = $(".reglist>div>input").index(this);
	$(".reglist>div").eq(i).addClass("div_active");
}).blur(function () {
	var i = $(".reglist>div>input").index(this);
	$(".reglist>div").eq(i).removeClass("div_active");
});

// 企业注册
$(".reglist1>div>input[type=text]").focus(function () {
	var i = $(".reglist1>div>input").index(this);
	$(".reglist1>div").eq(i).addClass("div_active");
}).blur(function () {
	var i = $(".reglist1>div>input").index(this);
	$(".reglist1>div").eq(i).removeClass("div_active");
});

// 页面加载，清楚输入框的值
clear();
function clear() {
    $('.registerMainList').find("input[type=text]").val("");
}

//点击获取短信验证码
var countdown = 90;
var time;
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
	time = setTimeout(function () {
		settime(obj);
	}, 1000)
};

	//个人注册手机号码验证
	sessionStorage.removeItem("personRegPhone");
	$(".personRegPhone").blur(function () {
	    var mobile = $(".personRegPhone").val();
	    var reMobile = /^1[34578]\d{9}$/;
	    if (reMobile.test(mobile) == false || mobile == null) {
	        $(".personRegPhoneTishi").css("display", "block");
	        return true;
	    } else {
	        $(".personRegPhoneTishi").css("display", "none");
	        var personRegPhone = mobile;
	        //本地存储个人注册的手机号码
	        sessionStorage.setItem("personRegPhone", personRegPhone);

	        //验证手机号码是否存在
	        //	           	jsonAjax("/check/checkPhone",
	        //				{phone : sessionStorage.getItem("personRegPhone")}, checkPhone);
	        //				function checkPhone(data){
	        //					console.log(data);
	        //				}

	        return false;
	    }
	})

	//个人注册设置密码验证
	$(".personRegSetPwd").blur(function () {
	    var pwd = $(".personRegSetPwd").val();
	    var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	    if (reqPwd.test(pwd) != false && pwd != null) {
	        $(".personRegSetPwdTishi").css("display", "none");
	        return true;
	    } else {
	        $(".personRegSetPwdTishi").css("display", "block");
	        return false;
	    }
	})

	//个人注册确认密码验证
	sessionStorage.removeItem("personRegSureBasePwd");
	$(".personRegSurePwd").blur(function () {
	    var pwd = $(".personRegSetPwd").val();
	    var surePassword = $(".personRegSurePwd").val();
	    var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	    if (pwd == surePassword && pwd != null && surePassword != null && reqPwd.test(surePassword) != false) {
	        $(".personRegSurePwdTishi").css("display", "none");
	        var personRegSureBasePwd = $.base64.btoa(surePassword);
	        //本地存储base64个人注册设置的密码
	        sessionStorage.setItem("personRegSureBasePwd", personRegSureBasePwd);
	        return true;
	    } else {
			$(".personRegSurePwdTishi").css("display", "block");
			// setTimeout(function(){
			// 	$(".personRegSurePwdTishi").hide();
			// }, 1500);
	        return false;
	    }
	})

	//个人注册验证图片验证码
	var verifyCode = new GVerify({        
	    id: "v_container",
	            type: "number"
	});
	$("#code_input").blur(function () {
	    var res = verifyCode.validate(document.getElementById("code_input").value);
	    if (res) {
	        console.log(res);
	        $(".personRegImgYzmTishi").css("display", "none");
	    } else {
			$(".personRegImgYzmTishi").css("display", "block");
			setTimeout(function () {
				$(".personRegImgYzmTishi").hide();
			}, 1500);
	    }
	})

	//个人注册点击获取验证码
	$(".personRegClickMessage").click(function () {
		if ($(".personRegPhone").val() != "") {
			settime(this);
		}
		//调用三方短信接口
		jsonAjax("/three/getSmsCode", {
			phone: $(".personRegPhone").val(),
			msgType: 1
		}, getSmsCode);

		function getSmsCode(data) {
			// console.log(data);
			if (data.resultMsg == "请求参数[phone]不完整") {
				$(".personTishi").empty().append("请输入正确的手机号");
				$(".personTishi").show();
				setTimeout(function () {
					$(".personTishi").hide();
				}, 1500)
			} else if (data.resultMsg == "短信验证码发送过于频繁，请稍后再试") {
				$(".personTishi").empty().append(data.resultMsg);
				$(".personTishi").show();
				setTimeout(function () {
					$(".personTishi").hide();
				}, 1500)
			}
		}
	    
	});
	//个人注册短信验证码验证
	sessionStorage.removeItem("personRegSmsCode");
		$(".personRegMessage").blur(function () {
			var personRegMessage = $(".personRegMessage").val();
			var regCode = /^\d{6}$/;
			if (regCode.test(personRegMessage) == false) {
				return true;
			} else {
				sessionStorage.setItem("personRegSmsCode", personRegMessage);
				return false;
			}
		});

	

	//个人注册验证邀请码
	$(".personRegInviteNum").blur(function () {
	    var personRegInviteNum = $(".personRegInviteNum").val();
		// console.log(personRegInviteNum.length);
		var regInvi = /^[0-9a-zA-Z]*$/g;

	    if (personRegInviteNum.length <= 11 && regInvi.test(personRegInviteNum) != false) {
	        $(".personRegIntentTishi").css("display", "none");
	        return true;
	    } else {
			$(".personRegIntentTishi").css("display", "block");
			setTimeout(function () {
				$(".personRegIntentTishi").hide();
			}, 1500);
	        return false;
	    }
	})

	//个人注册的协议勾选判断
	var flag = true;
	function personRegCheckboxOnclick(checkbox) {
	    if (checkbox.checked == true) {
	        flag = true;
	        $(".personRegChangeXieyi").css("display", "none");
	    } else {
	        flag = false;
	        $(".personRegChangeXieyi").css("display", "block");
	    }
	}

	//点击个人注册调用注册接口
	var date = new Date();
	var expiresDate = date.setTime(date.getTime() + (30 * 60 * 1000));

	var userId = "";
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("token");

	$(".regBtn").click(function () {
		var mobile = $(".personRegPhone").val();
		var reMobile = /^1[34578]\d{9}$/;//手机号
		var pwd = $(".personRegSetPwd").val();
		var surePassword = $(".personRegSurePwd").val();
		var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//密码
		var res = verifyCode.validate(document.getElementById("code_input").value);//图片验证码


	    if (flag == true && reMobile.test(mobile) != false && pwd == surePassword && pwd != null && surePassword != null && reqPwd.test(surePassword) != false && res == true) {
	        jsonAjax("/reg/register", {
	            phone: $(".personRegPhone").val(),
	            smsCode: $(".personRegMessage").val(),
	            clientType: "PC",
	            regChannel: "PC",
	            reqPwd: sessionStorage.getItem("personRegSureBasePwd"),
	            invitationCode: $(".personRegInviteNum").val()
	        }, personRegister);

	        function personRegister(data) {
				console.log(data);


				if (data.result == 200) {
					userId = data.User.id;
					token = data.token;
					// console.log(userId);
					sessionStorage.setItem("userId", userId);
					sessionStorage.setItem("token", token);
					var userPhone = sessionStorage.getItem("personRegPhone");
					var userPhoneTop = userPhone.substr(0, 3) + "****" + userPhone.substr(7);
					sessionStorage.setItem("userPhoneTop", userPhoneTop);

					window.location.href = "index.html";
				}else{
					if (data.result == 300) {
						if (data.resultMsg == "该用户已经存在,请直接登陆！！！") {
							$(".personTishi").empty().append("该用户已经存在,请直接登录");
							$(".personTishi").show();
							setTimeout(function () {
								$(".personTishi").hide();
								window.location.href = "login.html";
							}, 3000)
						} else if (data.resultMsg == "短信验证码错误或已超时") {
							$(".personTishi").empty().append(data.resultMsg);
							$(".personTishi").show();
							setTimeout(function () {
								$(".personTishi").hide();
							}, 1500)
						} else if (data.resultMsg == "邀请码不存在") {
							$(".personTishi").empty().append(data.resultMsg);
							$(".personTishi").show();
							setTimeout(function () {
								$(".personTishi").hide();
							}, 1500)
						}else{
							$(".personTishi").empty().append("请输入完整正确的信息");
							$(".personTishi").show();
							setTimeout(function () {
								$(".personTishi").hide();
							}, 1500)
						}
						
					}else if (data.result == 100) {
						$(".personTishi2").show();
						setTimeout(function () {
							$(".personTishi2").hide();
						}, 1500)
					}
				}
	        }
		}else{
			var inputVal = $('.registerMainList').find("input[type=text]").val();

			if (inputVal == "") {
				$(".personTishi").empty().append("请输入正确完整的信息");
				$(".personTishi").show();
				setTimeout(function () {
					$(".personTishi").hide();
				}, 1500)
			} else{
				// if (reqPwd.test(pwd) == false) {
				// 	$(".personTishi").empty().append("密码6-20位，字母、数字组合");
				// 	$(".personTishi").show();
				// 	setTimeout(function () {
				// 		$(".personTishi").hide();
				// 	}, 1500)
				// } else if (reMobile.test(mobile) == false) {
				// 	$(".personTishi").empty().append("请输入正确的手机号");
				// 	$(".personTishi").show();
				// 	setTimeout(function () {
				// 		$(".personTishi").hide();
				// 	}, 1500)
				// } else {
				// 	$(".personTishi").empty().append("请确认输入的信息是否正确");
				// 	$(".personTishi").show();
				// 	setTimeout(function () {
				// 		$(".personTishi").hide();
				// 	}, 1500)
				// }
				$(".personTishi").empty().append("请确认输入的信息是否正确");
				$(".personTishi").show();
				setTimeout(function () {
					$(".personTishi").hide();
				}, 1500)
			}
			
		}
		



	});













	//企业注册手机号码验证
	sessionStorage.removeItem("commpanyRegPhone");
	$(".commpanyRegPhone").blur(function () {
	    var mobile = $(".commpanyRegPhone").val();
	    var reMobile = /^1[34578]\d{9}$/;
	    if (reMobile.test(mobile) == false || mobile == null) {
	        $(".commpanyRegPhoneTishi").css("display", "block");
	        return true;
	    } else {
	        $(".commpanyRegPhoneTishi").css("display", "none");
	        var commpanyRegPhone = mobile;
	        //本地存储个人注册的手机号码
	        sessionStorage.setItem("commpanyRegPhone", commpanyRegPhone);
	        return false;
	    }
	})

	//企业注册设置密码验证
	$(".commpanyRegSetPwd").blur(function () {
	    var pwd = $(".commpanyRegSetPwd").val();
	    var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	    if (reqPwd.test(pwd) != false && pwd != null) {
	        $(".commpanyRegSetPwdTishi").css("display", "none");
	        return true;
	    } else {
	        $(".commpanyRegSetPwdTishi").css("display", "block");
	        return false;
	    }
	})

	//企业注册确认密码验证
	sessionStorage.removeItem("commpanyRegSurePwd");
	$(".commpanyRegSurePwd").blur(function () {
	    var pwd = $(".commpanyRegSetPwd").val();
	    var surePassword = $(".commpanyRegSurePwd").val();
	    var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	    if (pwd == surePassword && pwd != null && surePassword != null && reqPwd.test(surePassword) != false) {
	        $(".commpanyRegSurePwdTishi").css("display", "none");
	        var commpanyRegSurePwd = $.base64.btoa(surePassword);
	        //本地存储base64个人注册设置的密码
	        sessionStorage.setItem("commpanyRegSurePwd", commpanyRegSurePwd);
	        return true;
	    } else {
			$(".commpanyRegSurePwdTishi").css("display", "block");
			// setTimeout(function () {
			// 	$(".commpanyRegSurePwdTishi").hide();
			// }, 1500);
	        return false;
	    }
	})
	//企业注册验证图片验证码
	var verifyCode1 = new GVerify({        
	    id: "v_container1",
	    canvasId: "verifyCanvas1",
	    type: "number"
	});
	$("#code_input1").blur(function () {
	    var res1 = verifyCode1.validate(document.getElementById("code_input1").value);
	    if (res1) {
	        $(".commpanyRegImgYzmTishi").css("display", "none");
	    } else {
			$(".commpanyRegImgYzmTishi").css("display", "block");
			setTimeout(function () {
				$(".commpanyRegImgYzmTishi").hide();
			}, 1500);
			
	    }
	})

	//点击短信验证码获取三方短信验证码
	$(".commpanyRegClickMessage").click(function () {
	    if ($(".commpanyRegPhone").val() != "") {
			settime(this);
		}
		//调用三方短信接口
		jsonAjax("/three/getSmsCode", {
			phone: $(".commpanyRegPhone").val(),
			msgType: 1
		}, getSmsCode);

		function getSmsCode(data) {
			// console.log(data);
			if (data.resultMsg == "请求参数[phone]不完整") {
				$(".componyTishi").empty().append("请输入正确的手机号");
				$(".componyTishi").show();
				setTimeout(function () {
					$(".componyTishi").hide();
				}, 1500)
			} else if (data.resultMsg == "短信验证码发送过于频繁，请稍后再试") {
				$(".componyTishi").empty().append(data.resultMsg);
				$(".componyTishi").show();
				setTimeout(function () {
					$(".componyTishi").hide();
				}, 1500)
			}

		}
	    
	});
	//企业注册短信验证码验证
	sessionStorage.removeItem("commpanyRegSmsCode");
	$(".commpanyRegMessage").blur(function () {
	    var commpanyRegMessage = $(".commpanyRegMessage").val();
	    console.log(commpanyRegMessage);
	    var regCode = /^\d{6}$/;
	    if (regCode.test(commpanyRegMessage) == false) {
	        return true;
	    } else {
	        sessionStorage.setItem("commpanyRegSmsCode", commpanyRegMessage);
	        return false;
	    }
	})
	//验证企业注册公司的名称
	$(".commpanyRegName").blur(function () {
	    var commpanyRegName = $(".commpanyRegName").val();
	    if (commpanyRegName != "" && commpanyRegName.length > 8) {
	        $(".commpanyRegNameTishi").css("display", "none");
	    } else {
	        $(".commpanyRegNameTishi").css("display", "block");
	    }
	})

	//企业注册的协议勾选判断
	var flag = true;

	function commpanyRegCheckboxOnclick(checkbox) {
	    if (checkbox.checked == true) {
	        flag = true;
	        $(".commpanyRegChangeXieyi").css("display", "none");
	    } else {
	        flag = false;
	        $(".commpanyRegChangeXieyi").css("display", "block");
	    }
	}
	//点击企业注册按钮:
	var commpanyRegTishi = "";
	sessionStorage.removeItem("userId");
	$(".commpanyRegBtn").click(function () {
		var mobile = $(".commpanyRegPhone").val();
		var reMobile = /^1[34578]\d{9}$/;//手机号
		var pwd = $(".commpanyRegSetPwd").val();
		var surePassword = $(".commpanyRegSurePwd").val();
		var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//密码
		var res1 = verifyCode1.validate(document.getElementById("code_input1").value);//图片验证
		var commpanyRegName = $(".commpanyRegName").val();//公司名称

	    if (flag == true && reMobile.test(mobile) != false && pwd == surePassword && pwd != null && surePassword != null && reqPwd.test(surePassword) != false && res1 == true && commpanyRegName != "" && commpanyRegName.length > 8) {
	        jsonAjax("/reg/register", {
	            phone: $(".commpanyRegPhone").val(),
	            smsCode: $(".commpanyRegMessage").val(),
	            clientType: "PC",
	            regChannel: "PC",
	            reqPwd: sessionStorage.getItem("commpanyRegSurePwd"),
	            invitationCode: ""
	        }, commpanyRegister);

	        function commpanyRegister(data) {
				// console.log(data);

				if (data.result == 200) {
					userId = data.User.id;
					sessionStorage.setItem("userId", userId);
					sessionStorage.setItem("token", token);

					var userPhone = sessionStorage.getItem("commpanyRegPhone");
					var userPhoneTop = userPhone.substr(0, 3) + "****" + userPhone.substr(7);
					sessionStorage.setItem("userPhoneTop", userPhoneTop);
					
					window.location.href = "index.html";
				}else {
					if (data.result == 300) {
						if (data.resultMsg == "该用户已经存在,请直接登陆！！！") {
							$(".componyTishi").empty().append("该用户已经存在,请直接登录")
							$(".componyTishi").show();
							setTimeout(() => {
								$(".componyTishi").hide();
								window.location.href = "login.html";
							}, 1500);
						} else if (data.resultMsg == "短信验证码错误或已超时") {
							$(".componyTishi").empty().append(data.resultMsg)
							$(".componyTishi").show();
							setTimeout(() => {
								$(".componyTishi").hide();
							}, 1500);
						} else {
							$(".personTishi").empty().append("请输入完整正确的信息");
							$(".personTishi").show();
							setTimeout(function () {
								$(".personTishi").hide();
							}, 1500)
						}

					} else if (data.result == 100) {
						$(".componyTishi").empty().append(data.resultMsg)
						$(".componyTishi").show();
						setTimeout(() => {
							$(".componyTishi").hide();
						}, 1500);
					}
				}
	        }
	    }else {
			var inputVal = $('.registerMainList').find("input[type=text]").val();

			if (inputVal == "") {
				$(".componyTishi").empty().append("请输入正确完整的信息");
				$(".componyTishi").show();
				setTimeout(function () {
					$(".componyTishi").hide();
				}, 1500)
			} else {
				$(".componyTishi").empty().append("请确认输入的信息是否正确")
				$(".componyTishi").show();
				setTimeout(function () {
					$(".componyTishi").hide();
				}, 1500);
			}
			
		}
	});



// 协议
$(".agreeA").click(function () {
	$(".mengban").css("display", "block");
	$(".hidden_box").css("display", "block");
});
$(".close").click(function () {
	$(".mengban").css("display", "none");
	$(".hidden_box").css("display", "none");
})
$(".close1").click(function () {
	$(".mengban").css("display", "none");
	$(".hidden_box").css("display", "none");
})