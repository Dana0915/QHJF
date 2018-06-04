
//  var token = "b4da44132d03ac1ec22499b80ec4e314";
var token = sessionStorage.getItem("token");

if (token == "" || token == null) {
	window.location.href = "login.html"
}
$(".phoneNumber1").empty().append(sessionStorage.getItem("userPhoneTop")); //侧栏电话

// 页面加载，清楚输入框的值

/*账户总览逻辑代码*/
	// 点击红包和加息券的事件
	$("#red").click(function () {
		$(".pingtaifuliCenter input").eq(0).click();
		$(".li5").css("background-color", "#fff");
		$(".li5").css("color", "#2773FF");

		$(".li1").css("background-color", "#F6F6F6");
		$(".li1").css("color", "#333");

		$(".hiddenbox1").css("display", "none");
		$(".hiddenbox5").css("display", "block");
	});
	$("#rate").click(function () {
		$(".pingtaifuliCenter input").eq(1).click();
		$(".li5").css("background-color", "#fff");
		$(".li5").css("color", "#2773FF");

		$(".li1").css("background-color", "#F6F6F6");
		$(".li1").css("color", "#333");

		$(".hiddenbox1").css("display", "none");
		$(".hiddenbox5").css("display", "block");
	});

	//	红包数量
	jsonAjax("/welfare/getMyRedPacketList", {
		token: token,
		status: 3
	}, RedPacket);
	function RedPacket(data) {
		// console.log(data)
		totalCount = data.totalCount;
		$(".redJuan").empty().append(totalCount);
	}

	//  加息券数量
	jsonAjax("/welfare/getMyIncreaseList", {
		token: token,
		status: 3
	}, IncreaseList);
	function IncreaseList(data) {
		//		console.log(data)
		totalCount = data.totalCount;
		$(".jiaxiJuan").empty().append(totalCount);
	}

	// 点击充值提现事件
	$(".chongzhiBtn").click(function () {
		sessionStorage.removeItem('chongzhiMoney');
		var chongzhiMoney = $("#chongzhiInput").val("");

		sessionStorage.removeItem('tixianMoney');
		var tixianMoney = $("#tixianInput").val("");

		$("#Recharge input").eq(0).click();

		$(".li3").css("background-color", "#fff");
		$(".li3").css("color", "#2773FF");

		$(".li1").css("background-color", "#F6F6F6");
		$(".li1").css("color", "#333");

		$(".hiddenbox1").css("display", "none");
		$(".hiddenbox3").css("display", "block");
	});
	$(".tixianBtn").click(function () {
		sessionStorage.removeItem('tixianMoney');
		var tixianMoney = $("#tixianInput").val("");

		sessionStorage.removeItem('chongzhiMoney');
		var chongzhiMoney = $("#chongzhiInput").val("");

		$("#Recharge input").eq(1).click();

		$(".li3").css("background-color", "#fff");
		$(".li3").css("color", "#2773FF");

		$(".li1").css("background-color", "#F6F6F6");
		$(".li1").css("color", "#333");

		$(".hiddenbox1").css("display", "none");
		$(".hiddenbox3").css("display", "block");
	})


	// 账户总览-头部
	jsonAjax("/user/getAccountOverview", {
		token: token
	}, getAccountOverview);
	function getAccountOverview(data) {
		// console.log(data);
		//登陆超时的提示 
		if (data.result == 400) { 
			$("#chaoshiTS").show(); 
			$("#chaoshiTS").click(function () { 
				$("#chaoshiTS").hide();
				window.location.href="login.html?count"
			});
		} else{ 
			$("#chaoshiTS").hide();
		}

		account = data.Account;
		//  可用余额
		avlBalance = account.avlBalance;
		$(".yue").empty().append(avlBalance);
		
		//总资产
		totalMoney = Math.floor((account.totalMoney)*100)/100;
		$(".mspan1").empty().append(totalMoney);

		// 累计收益
		totalProfit = account.totalProfit;		
		$(".mspan2").empty().append(totalProfit);

		// 昨日收益
		totalYesterdayProfit = account.totalYesterdayProfit;
		$(".mspan3").empty().append(totalYesterdayProfit);
		
		// 总回款
		totalReturnedMoney = account.totalReturnedMoney;
		$(".totalHK").empty().append(totalReturnedMoney);
		// 今日回款
		todayReturnedMoney = account.todayReturnedMoney;
		$(".todayHK").empty().append(todayReturnedMoney);

		

	}


		// 动态时间
		showTime();
		var data = new Date();
		function showTime() {
			//获取当前日期
			var date_time = new Date();

			var year = date_time.getFullYear();
			//判断小于10，前面补0
			if (year < 10) {
				year = "0" + year;
			}

			var month = date_time.getMonth() + 1;
			//判断小于10，前面补0
			if (month < 10) {
				month = "0" + month;
			}

			var day = date_time.getDate();
			//判断小于10，前面补0
			if (day < 10) {
				day = "0" + day;
			}
			//拼接年月日

			var date_str = year + "年" + month + "月" + day + "日 ";
			var zrData = year + "-" + month + "-" + day;
			sessionStorage.setItem("zrData", zrData);

			$('.showTime').text(date_str);
		}
		// setInterval(function () {
		// 	var now = (new Date()).toLocaleString();
		// 	$('.showTime').text(now);
		// }, 1000);

/*账户总览逻辑代码*/



/*我的资产逻辑代码*/
// $(".li2").click(function () {
	//  头部数据
	jsonAjax("/user/getAccountOverview", {
		token: token
	}, myMoney);

	function myMoney(data) {
		// console.log(data);
		Account = data.Account;

		// 待收本金
		investMoney = Account.investMoney;
		$(".msgUl1 li:eq(1)").empty().append(investMoney);

		// 冻结金额
		frzBalance = Account.frzBalance;
		$(".msgUl1 li:eq(3)").empty().append(frzBalance);

		// 待收收益
		dssy = toDecimal2(Math.floor((Account.dssy) * 100) / 100);
		$(".msgUl1 li:eq(2)").empty().append(dssy);
		$(".msgUl2 li:eq(1)").empty().append(dssy);

		// 总资产=代收本金+待收收益+冻结金额parseInt()
		totalMoney = Math.floor((Number(investMoney) + Number(frzBalance) + Number(dssy)) * 100) / 100;
		// console.log(totalMoney);
		$(".msgUl1 li:eq(0)").empty().append(totalMoney);


		// 历史收益
		lssy = toDecimal2(Account.lssy);
		// console.log(toDecimal2(Account.lssy));
		
		$(".msgUl2 li:eq(2)").empty().append(lssy);

		// 总收益 = 历史收益（昨日收益）+ 代收收益
		totalProfit = Math.floor((Number(dssy) + Number(lssy)) * 100) / 100;
		$(".msgUl2 li:eq(0)").empty().append(totalProfit);


	};

	// 我要转让
	$(".zhuanrangBtn").click(function () {
		$(".zichanJisuanBox").hide();
		$(".myProductBox").hide();
		$(".holding").show();

	});
	/*可转让产品*/
		var hodeData;
		var hodeMoban = document.getElementById("hodeMoban").innerHTML;
		var hodePageSize = 10; //每页条数

		//分页
		var $HodePagination = $("#holdcontainer .pagination");
		var $hodeCenter = $(".holdingMainContent");
		jsonAjax("/user/getUserAssetsList", {
			curPage: 1,
			pageSize: YDFPageSize,
			token: token,
			status: "1,2", //订单状态
			productFullStatus: "0,1", //满标状态
			czlx: 2, //操作类型
			orderType: 0, //订单类型
			// clientType:"pc"//渠道类型可以不传
		}, getUserAssetsListHode1);

		function getUserAssetsListHode1(data) {
			// console.log(data);
			totalCount = data.totalCount;

			try {
				$HodePagination.eq(0).pagination({
					total: totalCount,
					row: hodePageSize,
					onJump: function (index) {
						$hodeCenter.eq(0).html(HODE(index));
					}
				});
			} catch (error) {
				location.reload();
				// console.log(error);
			}

			$hodeCenter.eq(0).html(HODE(1));
		};
		// 数据
		function HODE(index) {
			jsonAjax("/user/getUserAssetsList", {
				curPage: index,
				pageSize: hodePageSize,
				token: token,
				status: "1,2", //订单状态
				productFullStatus: "0,1", //满标状态
				czlx: 2, //操作类型
				orderType: 0, //订单类型
				// clientType:"pc"//渠道类型可以不传
			}, getUserAssetsListHode);

			function getUserAssetsListHode(data) {
				// console.log(data);
				if (data.Product.length == 0) {
					$(".hodeNoData").show();
				} else {
					$(".hodeNoData").hide();
				}
				hodeData = data.Product;

				$(".holdingMainContent").children().not("#hodeMoban").empty();
				$.each(hodeData, function (i, item) {
					var str = hodeMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".holdingMainContent");
					// 预期收益
					exceptedYield = toDecimal2(Math.floor((hodeData[i].exceptedYield*100))/100);					
					$(".exceptedYield").eq(i).text(exceptedYield + "元")

					//可否操作
					zrbz = hodeData[i].zrbz;
					// console.log(zrbz);
					if (zrbz == "是") {
						$(".isZr").eq(i).empty().append("是");			
						// 点击转让产品事件
						$(".holdingMainContent .operation").eq(i).click(function () {
							var zrPid = hodeData[i].orderId;
							sessionStorage.setItem("zrPid", zrPid);
							// 调取转让产品详情接口
							jsonAjax("/user/getUserAssetsInfo", {
								orderId: zrPid,
								token: token
							}, zrProductInfo);

							function zrProductInfo(data) {

								sessionStorage.setItem("zrPro",i);
								// console.log(data);
								zrProduct = data.Product;

								// 产品名称
								productName = zrProduct.productName;
								$(".zrName").empty().append(productName);

								// 投资金额
								investMoney = zrProduct.investMoney;
								$(".zrInvestMoney").empty().append(investMoney + "元");

								// 产品期限
								productPeriod = zrProduct.productPeriod;
								$(".zrProductPeriod").empty().append(productPeriod + "天");


								//收益率 = 到期日利率 + 加息券加息利率
								// 到期日利率(活动)
								backAnnual = zrProduct.backAnnual;
								//加息券加息利率
								increaseRate = zrProduct.increaseRate;
								if (increaseRate === "") {
									$(".zrIncreaseRate").empty().append("0.00%");
									// 收益率
									$(".zrData").empty().append(backAnnual + "%");
								} else {
									$(".zrIncreaseRate").empty().append(increaseRate + "%");
									$(".zrData").empty().append(backAnnual + "+" + increaseRate + "%");
								}


								//预计到期收益
								exceptedYield = toDecimal2(Math.floor((zrProduct.exceptedYield)*100)/100);
								$(".zrRealSy").empty().append(exceptedYield + "元 ");


								//产品年化利率（基础~活动）
								baseAnnual = zrProduct.baseAnnual;
								$(".zrAnnualYield").empty().append(baseAnnual + "~" + backAnnual + "%");



								//红包抵扣金额
								rpMoney = zrProduct.rpMoney;
								$(".zrRpMoney").empty().append(rpMoney + "元");

								//实付金额 = 
								relMoney = zrProduct.investMoney - zrProduct.rpMoney;
								$(".zrRelMoney").empty().append(relMoney + "元")

								//收益方式：
								yieldDistribType = zrProduct.yieldDistribType;
								if (yieldDistribType === 1) {
									$(".zrYieldDistribType").empty().append("到期还本付息");
								} else if (yieldDistribType === 2) {
									$(".zrYieldDistribType").empty().append("先息后本");
								} else if (yieldDistribType === 3) {
									$(".zrYieldDistribType").empty().append("等额本息");
								}

								//到期日
								dueDate = zrProduct.dueDate;
								$(".zrDueDate").empty().append(dueDate);

								//投资日
								buyTime = zrProduct.buyTime;
								$(".zrBuyTime").empty().append(buyTime);

								//计息起始日
								interestDate = zrProduct.interestDate;
								$(".zrInterestDate").empty().append(interestDate);

								//已持有天数
								diff = zrProduct.diff;
								$(".zrDiff").empty().append(diff + "天");
								sessionStorage.setItem("zrDiff", diff);

								// 剩余天数
								syts = zrProduct.syts;
								$(".zrSyts").empty().append(syts + "天");

								// 转让日期
								$(".zrZrDate").empty().append(sessionStorage.getItem("zrData"));

								// 当日转让结算利率
								drzrjs = Math.floor((zrProduct.drzrjs)*100)/100;
								$(".zrDrzrjs").empty().append(drzrjs + "%");

								// 当日转让计算收益
								zrsy = Math.floor((zrProduct.zrsy)*100)/100;
								$(".zrZrsy").empty().append(zrsy + "元");

								// 转让成功后本息合计
								zrbx = Math.floor((zrProduct.zrbx) * 100) / 100;
								$(".zrZrbx").empty().append(zrbx + "元");

								// 转让手续费
								zrsxf = zrProduct.zrsxf;
								$(".zrZrsxf").empty().append(zrsxf + "元");

							}
							// 显示弹框
							$(".holdZheZhao").show();
							$("body").css("overflow", "hidden");
							$(".transferMsg").show();
						});
					} else if (zrbz == "否") {
						$(".isZr").eq(i).empty().append("否");
						$(".operation").eq(i).css("color", "#999");
					}

				});
			}
		}
		
	/*可转让产品*/

	/*已转让产品*/
		var YZRData;
		var YZRMoban = document.getElementById("YZRMoban").innerHTML;
		var YZRPageSize = 1; //每页条数
		function YZR(index) {
			jsonAjax("/user/getUserAssetsList", {
				curPage: 1,
				pageSize: hodePageSize,
				token: token,
				status: "4,5", //订单状态
				productFullStatus: "0,1", //满标状态
				czlx: 1, //操作类型
				orderType: 1, //订单类型
				// clientType:"pc"//渠道类型可以不传
			}, getUserAssetsListYZR);

			function getUserAssetsListYZR(data) {
				// console.log(data);

				if (data.Product.length == 0) {
					$(".YZRNoData").show();
				} else {
					$(".YZRNoData").hide();
				}
				YZRData = data.Product;

				$(".YZRcenter").children().not("#YZRMoban").empty();
				$.each(YZRData, function (i, item) {
					var str = YZRMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".YZRcenter");

					//转让状态
					status = YZRData[i].status;
					// console.log(status);
					if (status == 4) {
						$(".YZRoperation").eq(i).empty().append("转让中");
					} else if (status == 5) {
						$(".YZRoperation").eq(i).empty().append("转让成功");
						$(".YZRoperation").eq(i).css("color", "#999")
					}

					// 预期收益
					YZRexceptedYield = Math.floor((YZRData[i].exceptedYield) * 100) / 100;
					$(".YZRexceptedYield").eq(i).empty().append(YZRexceptedYield + "元")

				});
			}
		}
		//分页
		var $YZRPagination = $("#YZRcontainer .pagination");
		var $YZRCenter = $(".YZRcenter");
		jsonAjax("/user/getUserAssetsList", {
			curPage: 1,
			pageSize: YDFPageSize,
			token: token,
			status: "4,5", //订单状态
			productFullStatus: "0,1", //满标状态
			czlx: 1, //操作类型
			orderType: 1, //订单类型
			// clientType:"pc"//渠道类型可以不传
		}, getUserAssetsListYZR1);

		function getUserAssetsListYZR1(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$YZRPagination.eq(0).pagination({
				total: totalCount,
				row: hodePageSize,
				onJump: function (index) {
					$YZRCenter.eq(0).html(YZR(index));
				}
			});
			$YZRCenter.eq(0).html(YZR(1));
		}
	/*已转让产品*/

	// 转让产品(返回按钮)
	$(".goBack").click(function () {
		$(".zichanJisuanBox").show();
		$(".myProductBox").show();
		$(".holding").hide();
	});

	//转让Tab
	$("#hodingBoxTab input:first").addClass("hodingActive");
	$(".hodingBoxList").eq(0).show();
	$("#hodingBoxTab input").click(function () {
		$(this).addClass("hodingActive").siblings().removeClass("hodingActive");
		var i = $("#hodingBoxTab input").index(this);
		$(".hodingBoxList").eq(i).show().siblings(".hodingBoxList").hide();
	});

	// 点击“X”按钮
	$(".closeTrans").click(function () {
		$(".holdZheZhao").hide();
		$("body").css("overflow", "visible");
		$(".transferMsg").hide();
	});
	$(".closeTrans1").click(function () {
		$(".agreement").hide();
	});
	// 点击查看协议
	$(".select_box span").click(function () {
		$(".agreement").show();
	});
	// 同意
	$(".agreementBtn").click(function () {
		$(".agreement").hide();
	});
	// 确认转让
	$(".transferMsgSureBtn").click(function () {
		var flag = $("#checkboxInput").prop("checked")
		if (flag == true) {
			$(".transTishi").hide();
			jsonAjax("/user/getUserTransferProduct", {
				orderId: sessionStorage.getItem("zrPid"),
				token: token,
				diff: sessionStorage.getItem("zrDiff")
			}, sureZR);

			function sureZR(data) {
				// console.log(data)
				// if (data.result == 200) {
					$(".transferMsg").hide();
					$(".transferSuccess").show();
					setTimeout(function () {
						$(".transferSuccess").hide();
						$(".holdZheZhao").hide();
						$("body").css("overflow", "visible");

						sessionStorage.getItem("zrPro")
						$(".isZr").eq(sessionStorage.getItem("zrPro")).text("否");
						$(".isZr").eq(sessionStorage.getItem("zrPro")).css("color", "#333");

						var isZrText = $(".isZr").eq(sessionStorage.getItem("zrPro")).text();
						if (isZrText == "否") {
							$(".operation").eq(sessionStorage.getItem("zrPro")).unbind("click");
							$(".operation").eq(sessionStorage.getItem("zrPro")).css("color", "#999");
						}
						
					}, 1000);
				// }

				
			}
		} else {
			$(".transTishi").show();
		}
	});

	/*我的资产-底部产品Tabs切换*/
	$("#myProductBoxTab input:first").addClass("myProductActive");
	$(".myProductBoxList").eq(0).show();
	$("#myProductBoxTab input").click(function () {
		$(this).addClass("myProductActive").siblings().removeClass("myProductActive");
		var i = $("#myProductBoxTab input").index(this);
		$(".myProductBoxList").eq(i).show().siblings(".myProductBoxList").hide();
	});

	/*持有中逻辑*/
		var CYZdata;
		var CYZMoban = document.getElementById("CYZMoban").innerHTML;
		var CYZPageSize = 9; //每页条数

		// 持有中分页
		var $CYZ = $("#CYZ");
		var $CYZpagination = $("#CYZcontainer .pagination");
		jsonAjax("/user/getUserAssetsList", {
			curPage: 1,
			pageSize: CYZPageSize,
			token: token,
			status: "1,2", //订单状态
			productFullStatus: "0,1,2", //满标状态
			czlx: 1, //操作类型
			orderType: 0, //订单类型
			// clientType:"pc"//渠道类型可以不传
		}, getUserAssetsList1_1);
		function getUserAssetsList1_1(data) {
			totalCount = data.totalCount;
			$CYZpagination.eq(0).pagination({
				total: totalCount,
				row: CYZPageSize,
				onJump: function (index) {
					$CYZ.eq(0).html(CYZ(index));
				}
			});
			$CYZ.eq(0).html(CYZ(1));

		}

		function CYZ(index) {
			jsonAjax("/user/getUserAssetsList", {
				curPage: index,
				pageSize: CYZPageSize,
				token: token,
				status: "1,2", //订单状态
				productFullStatus: "0,1,2", //满标状态
				czlx: 1, //操作类型
				orderType: 0, //订单类型
			}, getUserAssetsList1);

			function getUserAssetsList1(data) {
				// console.log(data);
				if (data.Product.length == 0) {
					$(".CYZnodata").show();
				} else {
					$(".CYZnodata").hide();
				}
				CYZdata = data.Product;

				$("#CYZ").children().not("#CYZMoban").remove();

				$.each(CYZdata, function (i, item) {
					var str = CYZMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo("#CYZ");

					// 详情查看
					$(" #CYZ .xiangqing").eq(i).click(function () {
						var prd = CYZdata[i].orderId;
						// console.log(prd);
						$(".xiangqing a").attr("href", 'myCountDetail/chanPinDetail.html?' + prd)
					});

					//合同下载
					$("#CYZ .down").eq(i).click(function () {
						var oId = CYZdata[i].orderId;
						var downloadUrl = CYZdata[i].downloadUrl;
						console.log(downloadUrl);
						window.location = downloadUrl;

					});

					// 收益方式
					yieldDistribType = CYZdata[i].yieldDistribType;
					if (yieldDistribType == 1) {
						$(".yieldDistribType").eq(i).empty().append("到期还本付息")
					} else if (yieldDistribType == 2) {
						$(".yieldDistribType").eq(i).empty().append("先息后本")
					} else if (yieldDistribType == 3) {
						$(".yieldDistribType").eq(i).empty().append("等额本息")
					}

					// 预期收益
					exceptedYield = CYZdata[i].exceptedYield;
					$(".CYZexceptedYield").eq(i).empty().append(Math.floor(exceptedYield * 100) / 100 + "元");
				});
			}
		}
		
	/*持有中逻辑*/

	/*投标中逻辑 */
		var TBZdata;
		var TBZMoban = document.getElementById("TBZMoban").innerHTML;
		var TBZPageSize = 9; //每页条数
		function TBZ(index) {
			jsonAjax("/user/getUserAssetsList", {
				curPage: index,
				pageSize: TBZPageSize,
				token: token,
				status: "6", //订单状态
				productFullStatus: "0,2", //满标状态
				czlx: 1, //操作类型
				orderType: 0, //订单类型
			}, getUserAssetsList2);

			function getUserAssetsList2(data) {
				// console.log(data);
				if (data.Product.length == 0) {
					$(".TBZnodata").show();
				} else {
					$(".TBZnodata").hide();
				}
				TBZdata = data.Product;

				$("#TBZ").children().not("#TBZMoban").remove();

				$.each(TBZdata, function (i, item) {
					var str = TBZMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo("#TBZ");

					$(" #TBZ .xiangqing1").eq(i).click(function () {
						var prd = TBZdata[i].orderId;
						// console.log(prd);
						$(".xiangqing1 a").attr("href", 'myCountDetail/chanPinDetailEnd.html?' + prd)
					});

					// 收益方式
					yieldDistribType = TBZdata[i].yieldDistribType;
					if (yieldDistribType == 1) {
						$(".yieldDistribType").eq(i).empty().append("到期还本付息")
					} else if (yieldDistribType == 2) {
						$(".yieldDistribType").eq(i).empty().append("先息后本")
					} else if (yieldDistribType == 3) {
						$(".yieldDistribType").eq(i).empty().append("等额本息")
					}

					// 预期收益
					exceptedYield = TBZdata[i].exceptedYield;
					$(".TBZexceptedYield").eq(i).empty().append(Math.floor(exceptedYield * 100) / 100 + "元");

				});
			}
		}
		//分页
		var $TBZpagination = $("#TBZcontainer .pagination");
		var $TBZ = $("#TBZ");
		jsonAjax("/user/getUserAssetsList", {
			curPage: 1,
			pageSize: TBZPageSize,
			token: token,
			status: "6", //订单状态
			productFullStatus: "0,2", //满标状态
			czlx: 1, //操作类型
			orderType: 0, //订单类型
		}, getUserAssetsList2_1);

		function getUserAssetsList2_1(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$TBZpagination.eq(0).pagination({
				total: totalCount,
				row: TBZPageSize,
				onJump: function (index) {
					$TBZ.eq(0).html(TBZ(index));
				}
			});
			$TBZ.eq(0).html(TBZ(1));
		}
	/*投标中逻辑*/

	/*已兑付逻辑*/
		var YDFdata;
		var YDFMoban = document.getElementById("YDFMoban").innerHTML;
		var YDFPageSize = 9; //每页条数
		function YDF(index) {
			jsonAjax("/user/getUserAssetsList", {
				curPage: index,
				pageSize: YDFPageSize,
				token: token,
				status: "3", //订单状态
				productFullStatus: "0,1,2", //满标状态
				czlx: 1, //操作类型
				orderType: 0, //订单类型
				// clientType:"pc"//渠道类型可以不传
			}, getUserAssetsList3);

			function getUserAssetsList3(data) {
				// console.log(data);
				if (data.Product.length == 0) {
					$(".YDFnodata").show();
				} else {
					$(".YDFnodata").hide();
				}
				YDFdata = data.Product;

				$("#YDF").children().not("#YDFMoban").remove();
				$.each(YDFdata, function (i, item) {
					var str = YDFMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo("#YDF");

					// 收益方式
					yieldDistribType = YDFdata[i].yieldDistribType;
					if (yieldDistribType == 1) {
						$(".yieldDistribType").eq(i).empty().append("到期还本付息")
					} else if (yieldDistribType == 2) {
						$(".yieldDistribType").eq(i).empty().append("先息后本")
					} else if (yieldDistribType == 3) {
						$(".yieldDistribType").eq(i).empty().append("等额本息")
					}

					// 实际收益 &兑付收益
					exceptedYield = YDFdata[i].exceptedYield;
					$(".YDFexceptedYield").eq(i).empty().append(Math.floor(exceptedYield * 100) / 100 + "元");
					$(".YDFexceptedYield1").eq(i).empty().append(Math.floor(exceptedYield * 100) / 100 + "元");

				});
			}
		}
		//分页
		var $YDFpagination = $("#YDFcontainer .pagination");
		var $YDF = $("#YDF");
		jsonAjax("/user/getUserAssetsList", {
			curPage: 1,
			pageSize: YDFPageSize,
			token: token,
			status: "3", //订单状态
			productFullStatus: "0,1,2", //满标状态
			czlx: 1, //操作类型
			orderType: 0, //订单类型
		}, getUserAssetsList3_1);

		function getUserAssetsList3_1(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$YDFpagination.eq(0).pagination({
				total: totalCount,
				row: YDFPageSize,
				onJump: function (index) {
					$YDF.eq(0).html(YDF(index));
				}
			});
			$YDF.eq(0).html(YDF(1));
		}
	/*已兑付逻辑 */

// });
/*我的资产逻辑代码*/


/*交易明细逻辑代码 */
// $(".li4").click(function (){
	// 交易明细（全部）
		var jyjlData;
		var jyjlMoban = document.getElementById("jyjlMoban").innerHTML;
		var jyjlPageSize = 9; //每页条数
		// 页面加载调取交易记录
		function jiaoyi(index) {
			jsonAjax("/user/getMyTradeRecords", {
				token: token,
				curPage: index,
				pageSize: jyjlPageSize,
			}, getMyTradeRecords);

			function getMyTradeRecords(data) {
				// console.log(data);

				if (data.Trade.length > 0) {
					$(".jyNodata").hide()
				} else {
					$(".jyNodata").show()
				}
				jyjlData = data.Trade;
				$(".ulList").children().not("#jyjlMoban").remove();
				$.each(jyjlData, function (i, item) {
					var str = jyjlMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".ulList");


					tradeType = jyjlData[i].tradeType;

					if (tradeType == 1) {
						$(".tradeType").eq(i).empty().append("购买")
					} else if (tradeType == 2) {
						$(".tradeType").eq(i).empty().append("充值")
					} else if (tradeType == 3) {
						$(".tradeType").eq(i).empty().append("提现")
					} else if (tradeType == 4) {
						$(".tradeType").eq(i).empty().append("兑付")
					} else if (tradeType == 5) {
						$(".tradeType").eq(i).empty().append("加息兑付")
					} else if (tradeType == 6) {
						$(".tradeType").eq(i).empty().append("转让兑付")
					} else if (tradeType == 7) {
						$(".tradeType").eq(i).empty().append("手续费")
					}


					tradeStatus = jyjlData[i].tradeStatus;
					if (tradeStatus == 1) {
						$(".tradeStatus").eq(i).empty().append("成功")
					} else if (tradeStatus == 0) {
						$(".tradeStatus").eq(i).empty().append("失败")
					} else if (tradeStatus == -1) {
						$(".tradeStatus").eq(i).empty().append("待支付")
					} else if (tradeStatus == 2) {
						$(".tradeStatus").eq(i).empty().append("放款失败")
					}

					redpacketMoney = jyjlData[i].redpacketMoney;
					if (redpacketMoney == 0) {
						$(".benJin span").eq(i).empty()
					} else {
						$(".benJin span").eq(i).empty().append("红包：+" +
							redpacketMoney)
					}


					// 生成序号
					var len = jyjlData.length;
					for (var i = 0; i < len; i++) {
						var sq = len[i];
						$(".sequence:eq(" + i + ")").text((i + 1) + jyjlPageSize * (index - 1));
					};


				});
			}
		}
		var $JYpagination = $("#JYContainer .pagination");
		var $ulList = $(".ulList");
		jsonAjax("/user/getMyTradeRecords", {
			token: token,
			curPage: 1,
			pageSize: jyjlPageSize,
		}, getMyTradeRecordsFY);

		function getMyTradeRecordsFY(data) {
			// console.log(data);
			totalCount = data.totalCount;
			$JYpagination.eq(0).pagination({
				total: totalCount,
				row: jyjlPageSize,
				onJump: function (index) {
					$ulList.eq(0).html(jiaoyi(index));
				}
			});
			$ulList.eq(0).html(jiaoyi(1));
		}
	// 交易明细（全部）

	//获取时间
	$("#starDateId").change(function () {
		$("#starDateId").attr("value", $(this).val()); //赋值
		var starDateId = $("#starDateId").val(); //开始时间
	});
	$("#endDateId").change(function () {
		$("#endDateId").attr("value", $(this).val()); //赋值
		var endDateId = $("#endDateId").val(); //结束时间
	});

	
$(".query").bind("click",function () {
	var starttime = $('#starDateId').val();
	var endtime = $('#endDateId').val();
	if (endtime < starttime) {
		alert("请完整选择正确的时间段")
	} else {
		starttime = starttime.replace(/-/g, ".");
		endtime = endtime.replace(/-/g, ".");
		// console.log($("#select2").val());

		var jyjlData;
		var jyjlMoban = document.getElementById("jyjlMoban").innerHTML;
		var jyjlPageSize = 9; //每页条数
		// 页面加载调取交易记录
		function jiaoyi(index) {
			jsonAjax("/user/getMyTradeRecords", {
				token: token,
				curPage: index,
				pageSize: jyjlPageSize,
				tranBeginDate: starttime,
				tranEndDate: endtime,
				tranType: $("#select2").val()
			}, getMyTradeRecords);

			function getMyTradeRecords(data) {
				// console.log(data);

				if (data.Trade.length > 0) {
					$(".jyNodata").hide()
				} else {
					$(".jyNodata").show()
				}
				jyjlData = data.Trade;
				$(".ulList").children().not("#jyjlMoban").remove();

				$.each(jyjlData, function (i, item) {
					var str = jyjlMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".ulList");


					tradeType = jyjlData[i].tradeType;

					if (tradeType == 1) {
						$(".tradeType").eq(i).empty().append("购买")
					} else if (tradeType == 2) {
						$(".tradeType").eq(i).empty().append("充值")
					} else if (tradeType == 3) {
						$(".tradeType").eq(i).empty().append("提现")
					} else if (tradeType == 4) {
						$(".tradeType").eq(i).empty().append("兑付")
					} else if (tradeType == 5) {
						$(".tradeType").eq(i).empty().append("加息兑付")
					} else if (tradeType == 6) {
						$(".tradeType").eq(i).empty().append("转让兑付")
					} else if (tradeType == 7) {
						$(".tradeType").eq(i).empty().append("手续费")
					}


					tradeStatus = jyjlData[i].tradeStatus;
					if (tradeStatus == 1) {
						$(".tradeStatus").eq(i).empty().append("成功")
					} else if (tradeStatus == 0) {
						$(".tradeStatus").eq(i).empty().append("失败")
					} else if (tradeStatus == -1) {
						$(".tradeStatus").eq(i).empty().append("待支付")
					} else if (tradeStatus == 2) {
						$(".tradeStatus").eq(i).empty().append("放款失败")
					}

					redpacketMoney = jyjlData[i].redpacketMoney;
					if (redpacketMoney == 0) {
						$(".benJin span").eq(i).empty()
					} else {
						$(".benJin span").eq(i).empty().append("红包：+" +
							redpacketMoney)
					}


					// 生成序号
					var len = jyjlData.length;
					for (var i = 0; i < len; i++) {
						var sq = len[i];
						$(".sequence:eq(" + i + ")").text((i + 1) + jyjlPageSize * (index - 1));
					};


				});
			}
		}
		// var $JYpagination = $("#JYContainer .pagination");
		var $ulList = $(".ulList");
		jsonAjax("/user/getMyTradeRecords", {
			token: token,
			curPage: 1,
			pageSize: jyjlPageSize,
			tranBeginDate: starttime,
			tranEndDate: endtime,
			tranType: $("#select2").val()
		}, getMyTradeRecordsFY);

		function getMyTradeRecordsFY(data) {
			console.log(data);
			totalCount = data.totalCount;

			$JYpagination.eq(0).pagination({
				total: totalCount,
				row: jyjlPageSize,
				onJump: function (index) {
					$ulList.eq(0).html(jiaoyi(index));
				}
			});
			$ulList.eq(0).html(jiaoyi(1));
		}

	}
});

// });
/*交易明细逻辑代码 */


/*平台福利逻辑代码*/
// $(".li5").click(function () {
	$(".pingtaifuliCenter input:first").addClass("ptfl_active");
	$(".PTFLMainList").eq(0).show();
	$(".pingtaifuliCenter input").click(function () {
		$(this).addClass("ptfl_active").siblings().removeClass("ptfl_active");
		var i = $(".pingtaifuliCenter input").index(this);
		$(".PTFLMainList").eq(i).show().siblings(".PTFLMainList").hide();
	});

	//点击去产品中心
	function toShop() {
		window.location.href = "./fangxinlicai.html"
	};

	//红包列表
		var redPackeData;
		var redPacketMoban = document.getElementById("redPacketMoban").innerHTML;
		var redPacketPageSize = 3; //每页条数
		function redPacket(index) {
			jsonAjax("/welfare/getMyRedPacketList", {
				token: token,
				status: 3, //未使用 
				curPage: index, //当前页码 
				pageSize: redPacketPageSize, //当前页面显示4条数据 
			}, RedPacketList);

			function RedPacketList(data) {
				// console.log(data); 
				if (data.RedPacket.length == 0) {
					$(".noData").show();
					$(".saveData").hide();
				} else {
					$(".saveData").show();
					$(".noData").hide();
					$("#RPcontainer").show();
				}
				// $(".saveData").children().not("#redPacketMoban").empty();
				$(".saveData").empty();				
				redPackeData = data.RedPacket;
				//console.log(redPackeData); 
				$.each(redPackeData, function (i, item) {
					var str = redPacketMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".saveData");
				});
			}
		}
		var $RPpagination = $("#RPcontainer .pagination");
		var $saveData = $(".saveData");
		jsonAjax("/welfare/getMyRedPacketList", {
			token: token,
			status: 3,
			curPage: 1, //当前页码 
			pageSize: redPacketPageSize, //当前页面显示4条数据
		}, RedPacketListr);

		function RedPacketListr(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$RPpagination.eq(0).pagination({
				total: totalCount,
				row: redPacketPageSize,
				onJump: function (index) {
					$saveData.eq(0).html(redPacket(index));
				}
			});
			$saveData.eq(0).html(redPacket(1));
		};
	// 红包列表
	
	// 加息券列表
		var rateData;
		var rateMoban = document.getElementById("rateMoban").innerHTML;
		var ratePageSize = 3; //每页条数
		function rateIncrease(index) {
			jsonAjax("/welfare/getMyIncreaseList", {
				token: token,
				status: 3,
				curPage: index,
				pageSize: ratePageSize,
			}, getMyIncreaseList);

			function getMyIncreaseList(data) {
				//console.log(data);
				if (data.Increase.length == 0) {
					$(".norateData").show();
					$(".saveRateData").hide();
				} else {
					$(".saveRateData").show();
					$(".norateData").hide();
					$("#rateContainer").show();
				}
				// $(".saveRateData").children().not("#rateMoban").empty();
				$(".saveRateData").empty();				
				rateData = data.Increase;
				//console.log(rateData);
				$.each(rateData, function (i, item) {
					var str = rateMoban.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".saveRateData");
				});
			}
		}
		$(".rightRate").click(function () {
			window.location.href = "./details/productDetails.html"
		});
		var $Rtpagination = $("#rateContainer .pagination");
		var $saveRateData = $(".saveRateData");
		jsonAjax("/welfare/getMyIncreaseList", {
			token: token,
			status: 3,
			curPage: 1,
			pageSize: ratePageSize,
		}, getMyIncreaseListr);

		function getMyIncreaseListr(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$Rtpagination.eq(0).pagination({
				total: totalCount,
				row: ratePageSize,
				onJump: function (index) {
					$saveRateData.eq(0).html(rateIncrease(index));
				}
			});
			$saveRateData.eq(0).html(rateIncrease(1));
		};
	// 加息券列表

	// 历史红包
		var redPackeDataOld;
		var redPacketMobanOld = document.getElementById("redPacketMobanOld").innerHTML;
		var redPacketPageSizeOld = 3; //每页条数
		function redPacketOld(index) {
			jsonAjax("/welfare/getMyRedPacketList", {
				token: token,
				status: "1,2,4,5", //未使用 
				curPage: index, //当前页码 
				pageSize: redPacketPageSizeOld, //当前页面显示4条数据
			}, RedPacketListOld);

			function RedPacketListOld(data) {
				// console.log(data); 
				if (data.RedPacket.length == 0) {
					$(".noData2").show();
					$(".saveData2").hide();
				} else {
					$(".saveData2").show();
					$(".noData2").hide();
					$("#RPcontainer2").show();
				}
				// $(".saveData2").children().not("#redPacketMobanOld").empty();
				$(".saveData2").empty();
				redPackeDataOld = data.RedPacket;
				//console.log(redPackeDataOld);
				$.each(redPackeDataOld, function (i, item) {
					var str = redPacketMobanOld.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".saveData2");
				});
			}
		}
		var $RPpagination2 = $("#RPcontainer2 .pagination");
		var $saveData2 = $(".saveData2");
		jsonAjax("/welfare/getMyRedPacketList", {
			token: token,
			status: "1,2,4,5",
			curPage: 1, //当前页码 
			pageSize: redPacketPageSizeOld, //当前页面显示4条数据
		}, RedPacketList2);

		function RedPacketList2(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$RPpagination2.eq(0).pagination({
				total: totalCount,
				row: redPacketPageSizeOld,
				onJump: function (index) {
					$saveData.eq(0).html(redPacketOld(index));
				}
			});
			$saveData2.eq(0).html(redPacketOld(1));
		};
	// 历史红包

	// 历史加息券
		var rateDataOld;
		var rateMobanOld = document.getElementById("rateMobanOld").innerHTML;
		var ratePageSize2 = 3; //每页条数
		function rateIncreaseOld(index) {
			jsonAjax("/welfare/getMyIncreaseList", {
				token: token,
				status: "1,2,4,5",
				curPage: index,
				pageSize: ratePageSize2,
			}, getMyIncreaseListOld);

			function getMyIncreaseListOld(data) {
				//console.log(data);
				if (data.Increase.length == 0) {
					$(".norateData2").show();
					$(".saveRateData2").hide();
				} else {
					$(".saveRateData2").show();
					$(".norateData2").hide();
					$("#rateContainer2").show();
				}
				// $(".saveRateData2").children().not("#rateMobanOld").empty();
				$(".saveRateData2").empty();				
				rateDataOld = data.Increase;
				//console.log(rateData);
				$.each(rateDataOld, function (i, item) {
					var str = rateMobanOld.replace(/%(\w+)%/ig, function (word, $1) {
						return item[$1];
					});
					$(str).appendTo(".saveRateData2");
				});
			}
		}
		var $Rtpagination2 = $("#rateContainer2 .pagination");
		var $saveRateData2 = $(".saveRateData2");
		jsonAjax("/welfare/getMyIncreaseList", {
			token: token,
			status: "1,2,4,5",
			curPage: 1,
			pageSize: ratePageSize2,
		}, getMyIncreaseList2);

		function getMyIncreaseList2(data) {
			//console.log(data);
			totalCount = data.totalCount;
			$Rtpagination2.eq(0).pagination({
				total: totalCount,
				row: ratePageSize2,
				onJump: function (index) {
					$saveRateData2.eq(0).html(rateIncreaseOld(index));
				}
			});
			$saveRateData2.eq(0).html(rateIncreaseOld(1));
		};
	// 历史加息券
// });
/*平台福利逻辑代码*/


/*基本信息逻辑代码*/
// $(".li6").click(function () {
	/*判断基本信息是否设置的状态*/
		jsonAjax("/user/getUserInfo", {
			token: token
		}, getUserInfo);

		function getUserInfo(data) {
			// console.log(data);

			userInfo = data.User;
			// console.log(userInfo);
			// 明文手机号
			var userPhonem = data.User.userPhonem;
			$(".oldPhone").empty().append(userPhonem);
			sessionStorage.setItem("userPhonem", userPhonem);

			// 账户等级
			securityLevel = userInfo.securityLevel;
			// console.log(securityLevel);
			
			if (securityLevel == "" || securityLevel == 1) {
				$(".riskLevel").empty().append("低");
			} else if (securityLevel == 2) {
				$(".riskLevel").empty().append("中");
			} else if (securityLevel == 3) {
				$(".riskLevel").empty().append("高");
			}



			//存管账户
			chinaPnrAcc = userInfo.chinaPnrAcc;
			if (chinaPnrAcc == "") {
				$(".bassMsgAcountRight").hide();
				$(".bassMsgAcountRight1").show();
				$(".bassMsgRealNameRight1").show();
				$(".bassMsgRealNameRight").hide();
			} else {
				$(".bassMsgAcountRight1").hide();
				$(".bassMsgAcountRight").show();
				$(".bassMsgRealNameRight1").hide();
				$(".bassMsgRealNameRight").show();
			}

			// 用户实名
			realNameStatus = userInfo.realNameStatus;
			if (realNameStatus == 2) {
				$(".bassMsgRealNameRight").show();
				$(".bassMsgRealNameRight1").hide();
			} else {
				$(".bassMsgRealNameRight").hide();
				$(".bassMsgRealNameRight1").show();
			};
			userRealname = userInfo.userRealname;
			$(".bassMsgRealNameMain").empty().append(userRealname);

			// 用户手机号
			phoneStatus = userInfo.phoneStatus;
			if (phoneStatus == 2) {
				$(".bassMsgphoneRight").show();
				$(".bassMsgphoneRight1").hide();
			} else {
				$(".bassMsgphoneRight").hide();
				$(".bassMsgphoneRight1").show();
			};
			userPhone = userInfo.userPhone;
			$(".bassMsgphoneMain").empty().append(userPhone);
			$(".phoneNumber1").empty().append(userPhone);
			sessionStorage.setItem("userPhone", userPhone)

			// 用户邮箱
			emailStatus = userInfo.emailStatus;
			if (emailStatus == -2) {
				$(".bassMsgEmailRight").hide();
				$(".bassMsgEmailRight1").show();
			} else {
				$(".bassMsgEmailRight").show();
				$(".bassMsgEmailRight1").hide();
			};
			userEmail = userInfo.userEmail;
			$(".bassMsgEmailMain").empty().append(userEmail);

			// 登录密码
			isSetPwd = userInfo.isSetPwd;
			if (isSetPwd == 1) {
				$(".bassMsgPasswordRight").show();
				$(".bassMsgPasswordRight1").hide();
			} else {
				$(".bassMsgPasswordRight").hide();
				$(".bassMsgPasswordRight1").show();
			}

			//绑定地址
			address = userInfo.address;
			$(".bassMsgAdressMain").empty().append(address);
			if (address == "") {
				$(".bassMsgAdressRight1").show();
				$(".bassMsgAdressRight").hide();
			} else {
				$(".bassMsgAdressRight1").hide();
				$(".bassMsgAdressRight").show();
			}

			//绑定银行卡
			        
			hasBankCard = userInfo.hasBankCard;        
			if (hasBankCard == 2) {            
				$(".bassMsgBankCardMain").show();            
				$(".bassMsgBankCardRight").show();
				$(".noBankCar").hide();        
			} else {            
				$(".bassMsgBankCardMain").hide();            
				$(".bassMsgBankCardRight").hide();            
				$(".noBankCar").show();        
			}

		};
	/*判断基本信息是否设置的状态*/

	/*点击获取短信验证码（倒计时）&获取原手机号验证码--手机和密码公用*/	
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
	//点击获取原来手机号码验证码----修改手机号&修改密码均可用
		$(".PBM1_getYZM").click(function () {
			//调用三方短息接口
			jsonAjax("/three/getSmsCode", {
				phone: sessionStorage.getItem("userPhonem"),
				msgType: 2
			}, getSmsCode);

			function getSmsCode(data) {
				console.log(data);
				if (data.result != 200) {
					if (data.resultMsg == "短信验证码发送过于频繁，请稍后再试") {

						$(".messageYZMTishi2").show();
						// $(".")
					} else {
						$(".messageYZMTishi2").hide()
					}
				};
			};
			settime(this);
		});
	/*点击获取短信验证码（倒计时）&获取原手机号验证码*/

	/*手机号操作流程*/
		//手机号点击事件
		$(".bassMsgphoneRight span:eq(1)").click(function () {
			$(".baseMassageMain").hide();
			$(".BM_PhoneBox").show();
			$(".BM_PhoneBoxMain1").show();
			$(".BMP1").show();
		});
		//手机号点击事件

	//手机框1：	
		//验证输入的短信验证码
		$(".PBM1_shuruYZM").blur(function () {
			var messageYZM = $(".PBM1_shuruYZM").val();
			//console.log(messageYZM);
			var regCode = /^\d{6}$/;
			// console.log(regCode.test(messageYZM));
			if (regCode.test(messageYZM) == false) {
				$(".messageYZMTishi").css("display", "block");
				setTimeout(function () {
					$(".messageYZMTishi").css("display", "none");
				}, 1500);
				return true;
			} else {
				$(".messageYZMTishi").css("display", "none");
				console.log(messageYZM);
				sessionStorage.setItem("messageYZM", messageYZM);
				return false;
			};
		});

		//验证按钮的颜色变化
		$(".PBM1_shuruYZM").keyup(function () {
			var YZMLen = $(".PBM1_shuruYZM").val().length;
			// console.log(YZMLen);
			if (YZMLen == 6) {
				$(".PhoneBoxMain1_btn").css("background", "#2773FF");
			} else {
				$(".PhoneBoxMain1_btn").css("background", "#ddd");
			}
		});

		// 手机框1的验证按钮判断
		$(".PhoneBoxMain1_btn").click(function () {
			jsonAjax("/three/checkSmsCode", {
				phone: sessionStorage.getItem("userPhonem"),
				smsCode: $(".PBM1_shuruYZM").val()
			}, checkSmsCode);

			function checkSmsCode(data) {
				// console.log(data);
				if (data.result == 200) {
					$(".BM_PhoneBoxMain1").hide();
					$(".BM_PhoneBoxMain2").show();
					$(".BM_PhoneBoxMain3").hide();
					$(".BMP2").show();
					$(".BMP1").hide();
				} else {
					var messageYZM = $(".PBM1_shuruYZM").val();
					if (messageYZM == "") {
						$(".messageYZMTishi1").show();
						setTimeout(function () {
							$(".messageYZMTishi1").hide();
						}, 3000);
					} else {
						$(".messageYZMTishi").show();
						setTimeout(function () {
							$(".messageYZMTishi").hide();
						}, 3000);
					}
				}
			}
		}); //手机框1的按钮判断

	//手机框1。

	// 手机框2：
		//验证输入新手机号码
		$(".newPhone").blur(function () {
			var newPhone = $(".newPhone").val();
			// console.log(newPhone);
			//验证新手机号码
			var reMobile = /^1[34578]\d{9}$/;
			if (reMobile.test(newPhone) == false || newPhone == null) {
				$(".yzmPhoneTishi").css("display", "block");
				return true;
			} else {
				$(".yzmPhoneTishi").css("display", "none");
				sessionStorage.setItem("newPhone", newPhone);
				return false;
			}
		})
		//点击获取短信验证码
		$(".PBM2_getYZM").click(function () {
			var newPhone = $(".newPhone").val();
			var reMobile = /^1[34578]\d{9}$/;
			if (reMobile.test(newPhone) != false && newPhone != null) {
				clearTimeout(time);
				countdown = 90;
				settime(this);
			} else {
				$(".yzmPhoneTishi").show();
				setTimeout(function () {
					$(".yzmPhoneTishi").hide();
				}, 3000);
			};
			//调用三方短息接口
			jsonAjax("/three/getSmsCode", {
				phone: sessionStorage.getItem("newPhone"),
				msgType: 2
			}, getSmsCode);

			function getSmsCode(data) {
				// console.log(data);
			}
		})

		//验证输入的短信验证码
		$(".PBM2_shuruYZM").blur(function () {
			var messageNewYZM = $(".PBM2_shuruYZM").val();
			// console.log(messageNewYZM);
			var regCode = /^\d{6}$/;
			if (regCode.test(messageNewYZM) == false) {
				$(".yzmTishi").css("display", "block");
				setTimeout(function () {
					$(".yzmTishi").hide();
				}, 1500);

				return true;
			} else {
				$(".yzmTishi").css("display", "none");
				// console.log(messageNewYZM);
				sessionStorage.setItem("messageNewYZM", messageNewYZM);
				return false;
			}
		});

		//手机框2-确认修改的按钮判断
		$(".PhoneBoxMain2_btn").click(function () {
			//校正修改手机号是否成功
			jsonAjax("/user/updateUserPhone", {
				token: sessionStorage.getItem("token"),
				phone: $(".newPhone").val(),
				smsCode: $(".PBM2_shuruYZM").val()
			}, updateUserPhone);

			function updateUserPhone(data) {
				// console.log(data);
				if (data.result == 200) {
					$(".successPhone").empty().append(sessionStorage.getItem("newPhone"));
					sessionStorage.removeItem("userPhoneTop");

					// 头部的手机号码
					var newPhoneTop = sessionStorage.getItem("newPhone");
					var newUserPhoneTop = newPhoneTop.substr(0, 3) + "****" + newPhoneTop.substr(7);
					sessionStorage.setItem("newUserPhoneTop", newUserPhoneTop);

					$(".BM_PhoneBoxMain3").show();
					$(".BM_PhoneBoxMain1").hide();
					$(".BM_PhoneBoxMain2").hide();
					$(".BMP3").show();
					$(".BMP2").hide();
					$(".BMP1").hide();

				} else {
					if (data.resultMsg == "短信验证码错误或已超时") {
						$(".yzmTishi").show();
					} else if (data.resultMsg == "手机号已绑定") {
						var ybdTS = data.resultMsg;
						$(".ybdTS").empty().append(ybdTS)
						$(".ybdTS").show();
						setTimeout(function () {
							$(".ybdTS").hide();
						}, 1500);
					}
				}
			}

		});
		//手机框2-确认修改的按钮判断

		//手机框2。

		//手机框3：
		$(".PhoneBoxMain3_btn").click(function () {
			$(".BM_PhoneBoxMain3").hide();
			$(".baseMassageMain").show();
			$(".BMP3").hide();

			$(".login").empty().append(sessionStorage.getItem("newUserPhoneTop") + "　退出"); //头部电话
			$(".phoneNumber1").empty().append(sessionStorage.getItem("newUserPhoneTop")); //侧栏电话
			$(".bassMsgphoneMain").empty().append(sessionStorage.getItem("newUserPhoneTop")); //基本信息电话
		});
	//手机框3。
	/*手机操作流程*/


	/*修改密码的操作流程*/
		/*点击修改密码*/
			$(".bassMsgPasswordRight span:eq(1)").click(function () {
				$(".baseMassageMain").hide();
				$(".BM_PasswordBox").show();
				$(".BM_PasswordBoxMain1").show();
			});
		/*点击修改密码*/
		//修改密码框1：（获取验证码倒计时的按钮同上）
		//pwd-验证按钮的颜色变化
		$("#inputphoneYZM").keyup(function () {
			var YZMLen = $("#inputphoneYZM").val().length;
			// console.log(YZMLen);
			if (YZMLen == 6) {
				$(".PasswordBoxMain1_btn").css("background", "#2773FF");
			} else {
				$(".PasswordBoxMain1_btn").css("background", "#ddd");
			}
		});

		//pwd-获取短信验证码
		$("#inputphoneYZM").blur(function () {
			var inputphoneYZM = $("#inputphoneYZM").val();
			//	console.log(inputphoneYZM);
			//校正输入的验证码
			var regCode = /^\d{6}$/;
			if (regCode.test(inputphoneYZM) == false) {
				$(".inputYZMTishi").css("display", "block");
				return true;
			} else {
				$(".inputYZMTishi").css("display", "none");
				sessionStorage.setItem("inputphoneYZM", inputphoneYZM);
				return false;
			}
		});

		// 修改密码的"验证"按钮判断
		$(".PasswordBoxMain1_btn").click(function () {
			jsonAjax("/three/checkSmsCode", {
				phone: sessionStorage.getItem("userPhonem"),
				smsCode: sessionStorage.getItem("inputphoneYZM")
			}, checkSmsCodePWD);

			function checkSmsCodePWD(data) {
				console.log(data);
				if (data.result == 200) {
					$(".BM_PasswordBoxMain1").hide();
					$(".BM_PasswordBoxMain2").show();
					$(".BM_PasswordBoxMain3").hide();
				} else {
					var inputphoneYZM = $("#inputphoneYZM").val();
					if (inputphoneYZM == "") {
						$(".inputYZMTishi").show();
						setTimeout(function () {
							$(".inputYZMTishi").hide();
						}, 3000);
					} else {
						$(".inputYZMTishi1").show();
						setTimeout(function () {
							$(".inputYZMTishi1").hide();
						}, 3000);
					}
				}
			}
		}); //修改密码的"验证"按钮判断

		//修改密码框1。

		// 修改密码框2：
		// 输入框1
		var changePwd1;
		$("#changePwd1").blur(function () {
			changePwd1 = $("#changePwd1").val();
			var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (rePwd.test(changePwd1) == true) {
				$(".pwdtishi").css("display", "none");
				return true;
			} else {
				$(".pwdtishi").css("display", "block");
				return false;
			}
		});
		//输入框2：
		$("#changePwd2").blur(function () {
			var changePwd2 = $("#changePwd2").val();
			var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (rePwd.test(changePwd2) == true && changePwd1 == changePwd2) {
				var updataBasePwd1 = $.base64.btoa(changePwd2);
				//本地存储base64个人注册设置的密码
				sessionStorage.setItem("updataBasePwd1", updataBasePwd1);
				$(".pwdtishi").empty().append("两次输入的密码不一致").css("display", "none");
				return true;
			} else {
				$(".pwdtishi").empty().append("两次输入的密码不一致").css("display", "block");
				return false;
			}

		})
		// 确认修改
		$("#sureChange").click(function () {
			changePwd1 = $("#changePwd1").val();
			var changePwd2 = $("#changePwd2").val();
			var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (rePwd.test(changePwd1) == true && rePwd.test(changePwd2) == true && changePwd1 == changePwd2) {
				jsonAjax("/pwd/updateUserLoginPwd", {
					newPwd: $("#changePwd2").val(),
					token: token
				}, updateUserLoginPwd);

				function updateUserLoginPwd(data) {
					console.log(data);

					if (data.result == 200) {
						$(".BM_PasswordBoxMain2").hide();
						$(".BM_PasswordBoxMain3").show();
						$(".BM_PasswordBoxMain1").hide();
					}
				}
			} else if (rePwd.test(changePwd1) != true || rePwd.test(changePwd2) != true) {
				$(".pwdtishi").empty().append("密码长度为6~20位，数字、字母组合").css("display", "block");
			}
		});
		//修改密码框2。

		//修改密码框3：
		$(".PasswordBoxMain3_btn").click(function () {
			$(".BM_PasswordBoxMain3").hide();
			$(".baseMassageMain").show();

		});

		//修改密码框3。

	/*修改密码的操作流程 */

	/*设置密码操作流程 */
		$(".bassMsgPasswordRight1 span:eq(1)").click(function () {
			$(".baseMassageMain").hide();
			$(".BM_setPwd").show();
			$(".BM_setPwdMain1").show();
		});
		// 设置密码框1：
		var inputPwd;
		$("#inputPwd").blur(function () {
			inputPwd = $("#inputPwd").val();
			var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (rePwd.test(inputPwd) == false) {
				$(".inputPwdTishi").css("display", "block");
				return true;
			} else {
				$(".inputPwdTishi").css("display", "none");
				return false;
			}
		})
		//确认密码
		$("#surePwd").blur(function () {
			var surePwd = $("#surePwd").val();
			//console.log(surePwd);
			var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (rePwd.test(surePwd) == true && inputPwd == surePwd) {
				$(".surePwdTishi").css("display", "none");
				var updataBasePwd = $.base64.btoa(surePwd);
				//本地存储base64个人注册设置的密码
				sessionStorage.setItem("updataBasePwd", updataBasePwd);
				return true;
			} else {
				$(".surePwdTishi").css("display", "block");
				setTimeout(function () {
					$(".surePwdTishi").css("display", "none");
				}, 2000);
				return false;
			}
		})
		//确认设置
		$(".setPwdBoxMain1_btn").click(function () {
			inputPwd = $("#inputPwd").val();
			var surePwd = $("#surePwd").val();
			var rePwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (rePwd.test(inputPwd) == true && rePwd.test(surePwd) == true && inputPwd == surePwd) {
				jsonAjax("/pwd/updateUserLoginPwd", {
					newPwd: $("#surePwd").val(),
					token: token
				}, updateUserLoginPwd);

				function updateUserLoginPwd(data) {
					console.log(data);
					if (data.result == 200) {
						$(".BM_setPwdMain1").hide();
						$(".BM_setPwdMain2").show();
					} else if (rePwd.test(inputPwd) != true || rePwd.test(surePwd) != true) {
						$(".surePwdTishi1").show();
					}
				}
			} else if (inputPwd == "" || surePwd == "") {
				$(".surePwdTishi2").show();
				setTimeout(function () {
					$(".surePwdTishi2").hide();
				}, 3000);
			}
		});
		//设置密码框1。

		//设置密码框2：
		$(".setPwdBoxMain2_btn").click(function () {
			$(".baseMassageMain").show();
			$(".BM_setPwd").hide();
			$(".BM_setPwdMain2").hide();

		});
		//设置密码框2。

	/*设置密码操作流程 */

	/*地址操作流程 */
		//地址输入框字数改变
		$(".shuruAddress").keyup(function () { //鼠标抬起事件
			var num = $(this).val().length; //获取输入的字数，注意textarea是通过val()来获取的。不是html啊啊啊
			if (num <= 100) {
				num = num;
			} //当字数小于50，数字不变
			else {
				$(num).substr(0, 100)
			} //当字数大于50，截取前面50个字
			$(".addressLimitNum_word").html(num) //把最后获取到的字数，显示出来
		});
		//设置地址点击事件
		$(".setAddress").click(function () {
			$(".zheZhao").show();
			$('body').css('overflow', 'hidden'); //浮层出现时窗口不能滚动设置
			$(".BM_setAddress").show();
		});
		//设置地址点击事件

		//修改地址点击事件
		$(".bassMsgAdressRight span:eq(1)").click(function () {
			$(".zheZhao").show();
			$('body').css('overflow', 'hidden'); //浮层出现时窗口不能滚动设置
			$(".BM_setAddress").show();
		});
		//修改地址点击事件
		$(".shuruAddress").blur(function () {
			var address = $(".shuruAddress").val();
			//	console.log(address);
			sessionStorage.setItem("address", address);
		});
		//点击确认
		$("#sureAddressBtn").click(function () {
			var address = $(".shuruAddress").val();
			console.log(typeof address);

			if ($.trim(address) != "") {
				jsonAjax("/user/saveAddress", {
					token: sessionStorage.getItem("token"),
					address: sessionStorage.getItem("address"),
					// type:2
				}, saveAddress);

				function saveAddress(data) {
					console.log(data);
					if (data.result == 200) {
						$(".zheZhao").hide();
						$('body').css('overflow', 'auto'); // 浮层关闭时滚动设置
						$(".BM_setAddress").hide();

						$(".bassMsgAdressMain").empty().append(sessionStorage.getItem("address"));
						$(".bassMsgAdressRight1").hide();
						$(".bassMsgAdressRight").show();

					}
				}
			} else {
				$(".addressTS").show();
				setTimeout(function () {
					$(".addressTS").hide();
				}, 1500);
			}
		});

		//点击"X"号
		$(".closeAddress").click(function () {
			$(".zheZhao").hide();
			$('body').css('overflow', 'auto'); // 浮层关闭时滚动设置
			$(".BM_setAddress").hide();
		});
	/*地址操作流程 */

	//返回按钮事件
		$(".phoneBack1").click(function () {
			$(".BM_PhoneBox").hide();
			$(".BM_PhoneBoxMain1").hide();
			$(".baseMassageMain").show();

		});

		$(".phoneBack2").click(function () {
			$(".BM_PhoneBox").hide();
			$(".BM_PhoneBoxMain1").hide();
			$(".BM_PhoneBoxMain2").hide();
			$(".baseMassageMain").show();
		});

		$(".pwdBack1").click(function () {
			$(".BM_PasswordBox").hide();
			$(".BM_PasswordBoxMain1").hide();
			$(".baseMassageMain").show();
		});

		$(".pwdBack2").click(function () {
			$(".BM_PasswordBox").hide();
			$(".BM_PasswordBoxMain1").hide();
			$(".BM_PasswordBoxMain2").hide();
			$(".baseMassageMain").show();
		});

		$(".setpwdBack1").click(function () {
			$(".BM_setPwd").hide();
			$(".BM_setPwdMain1").hide();
			$(".baseMassageMain").show();
		});
	// 返回按钮事件

// });
/*基本信息逻辑代码*/


/*邀请管理逻辑代码*/
// $(".li7").click(function () {
	// 复制邀请码的信息
	$(".invitationCodeBtn").click(function () {
		var text = document.getElementById("text").innerText;
		var input = document.getElementById("text");
		//			input.value = sessionStorage.getItem("invitationMyCode");  // 修改文本框的内容
		input.select(); // 选中文本
		document.execCommand("copy"); // 执行浏览器复制命令
		alert("复制成功");
	});

	// 复制邀请网址的信息
	$(".invitationLinkBtn").click(function () {
		var text1 = document.getElementById("text1").innerText;
		var input1 = document.getElementById("text1");
		//            input1.value = sessionStorage.getItem("QueryDetail");  // 修改文本框的内容
		input1.select(); // 选中文本
		document.execCommand("copy"); // 执行浏览器复制命令
		alert("复制成功");
	});

	// 邀请页面banner
		jsonAjax("/front/getAdvList", {
			adType: 1,
			adPosition: 11,
			adPort: "PC"
		}, getAdvList);
		function getAdvList(data) {
			console.log(data);
			Advertise = data.Advertise[0];
			adImg = Advertise.adImg;
			// console.log(adImg);
			if (Advertise.length != 0) {
				$(".invitationsManagementBanner").attr("src", adImg);
			};
			adLink = Advertise.adLink;
			// if (adLink != "") {
			// 	$(".invitationsManagementBanner").click(function () {

			// 	});
			// }
			
			
		};
	// 邀请页面banner

	/*邀请管理调用接口请求数据--我的好友&邀请码*/
		var myFriendData;
		var myFriendMoban = document.getElementById("myFriendMoban").innerHTML;
		var myFriendPageSize = 4; //每页条数
		function getMFList(index) {
			jsonAjax("/invite/getMyInviteList", {
				//token:,
				token: token,
				curPage: index,
				pageSize: myFriendPageSize
			}, getMyInviteList);

			function getMyInviteList(data) {
				// console.log(data);

				invitationCode = data.invitationMyCode;
				$(".invitationCode #text").empty().append(invitationCode);
				$(".invitationLink #text1").empty().append("http://test.qihangjf.com:29084/register.html?invitationMyCode=" + invitationCode)

				if (data.User.length == 0) {
					$(".friendMain p").show();
				} else {
					$(".friendMain p").hide();

					$(".friendMain").children().not("#myFriendMoban").empty();
					myFriendData = data.User;
					$.each(myFriendData, function (i, item) {
						var str = myFriendMoban.replace(/%(\w+)%/ig, function (word, $1) {
							return item[$1];
						});
						$(str).appendTo(".friendMain");
						
						//姓名
						userRealname = myFriendData[i].userRealname;
						if (userRealname == "") {
							$(".userRealname").eq(i).text("未认证")
						}else{
							$(".userRealname").eq(i).text(userRealname);
						}

						// 注册时间
						inviteTime = myFriendData[i].inviteTime;
						if (inviteTime == "") {
							$(".inviteTime").eq(i).empty().append("");
						} else {
							$(".inviteTime").eq(i).empty().append(inviteTime);
						}

						// 是否实名
						realNameStatus = myFriendData[i].realNameStatus;
						if (realNameStatus == 2) {
							$(".isRealName").eq(i).empty().append("是");
						} else {
							$(".isRealName").eq(i).empty().append("否");
						};
						// 是否投资
						isInvest = myFriendData[i].isInvest;
						if (isInvest == 0) {
							$(".isTouzi").eq(i).empty().append("未投资");
						} else {
							$(".isTouzi").eq(i).empty().append("已投资");
						}

					});
				}
			}
		};
		//邀请管理--分页
		var $MFpagination = $("#FGcontainer .pagination");
		var $friendMain = $(".friendMain");
		jsonAjax("/invite/getMyInviteList", {
			token: token,
			curPage: 1,
			pageSize: myFriendPageSize
		}, getMyInviteList2);

		function getMyInviteList2(data) {
			totalCount = data.totalCount;
			$MFpagination.eq(0).pagination({
				total: totalCount,
				row: myFriendPageSize,
				onJump: function (index) {
					$friendMain.eq(0).html(getMFList(index));
				}
			});
			$friendMain.eq(0).html(getMFList(1));
		};
	/*邀请管理调用接口请求数据--我的好友*/

// });
/*邀请管理逻辑代码*/


/*消息中心逻辑代码*/
// $(".li8").click(function () {
	$(".messageCenter input:first").addClass("msgCenterActive");
	$(".msgMainlist").eq(0).show();
	$(".messageCenter input").click(function () {
		$(this).addClass("msgCenterActive").siblings().removeClass("msgCenterActive");
		var i = $(".messageCenter input").index(this);
		$(".msgMainlist").eq(i).show().siblings(".msgMainlist").hide();
	});

	/*消息中心调用接口请求数据--平台公告*/
		var platformBulletinData;
		var platformMoban = document.getElementById("platformMoban").innerHTML;
		var platformBulletinPageSize = 9; //每页条数
		function getPBList(index) {
			jsonAjax("/index/getInfoManageList", {
				imType: 2, //
				pageSize: platformBulletinPageSize,
				curPage: index, //当前页码
			}, getNoticeList);

			function getNoticeList(data) {
				// console.log(data);	
				// totalCount = data.totalCount;
				if (data.InfoManage.length == 0) {
					$(".platformBulletinMain p").show();
				} else {
					$(".platformBulletinMain p").hide();

					$(".platformBulletinMain").children().not("#platformMoban").empty();
					platformBulletinData = data.InfoManage;
					$.each(platformBulletinData, function (i, item) {
						var str = platformMoban.replace(/%(\w+)%/ig, function (word, $1) {
							return item[$1];
						});
						$(str).appendTo(".platformBulletinMain");

						// 生成序号 
						var len = platformBulletinData.length;
						for (var i = 0; i < len; i++) {
							var sq = len[i];
							$(".platformBulletinSequence:eq(" + i + ")").text((i + 1) + platformBulletinPageSize * (index - 1));
						}
					});
				}
			};
		};
		//分页
		var $PBpagination = $("#PB_container .pagination");
		var $platformMain = $(".platformBulletinMain");
		jsonAjax("/index/getInfoManageList", {
			imType: 2, //
			pageSize: platformBulletinPageSize, //每页条数
			curPage: 1, //当前页码
		}, getNoticeList2);

		function getNoticeList2(data) {
			totalCount = data.totalCount;
			// console.log(totalCount);
			
			$PBpagination.eq(0).pagination({
				total: totalCount,
				row: platformBulletinPageSize,
				onJump: function (index) {
					$platformMain.eq(0).html(getPBList(index));
				}
			});
			$platformMain.eq(0).html(getPBList(1));
		};
	/*消息中心调用接口请求数据--平台公告*/

	/*消息中心调用接口请求数据--我的通知*/
		var myNoticeData;
		var myNoticeMoban = document.getElementById("myNoticeMoban").innerHTML;
		var myNoticePageSize = 9; //每页条数

		function getMNList(index) {
			jsonAjax("/msg/getMessageList", {
				token: token,
				pageSize: myNoticePageSize, //每页条数
				curPage: index,
			}, getMessageList);

			function getMessageList(data) {
				//console.log(data);
				if (data.message.length == 0) {
					$(".myNoticeMain p").show();
				} else {
					$(".myNoticeMain p").hide();
					$(".myNoticeMain").children().not("#myNoticeMoban").empty();
					myNoticeData = data.message;
					$.each(myNoticeData, function (i, item) {
						var str = myNoticeMoban.replace(/%(\w+)%/ig, function (word, $1) {
							return item[$1];
						});
						$(str).appendTo(".myNoticeMain");
						// 生成序号
						var len = myNoticeData.length;
						for (var i = 0; i < len; i++) {
							var sq = len[i];
							$(".myNoticeSequence:eq(" + i + ")").text((i + 1) + myNoticePageSize * (index - 1));
						}
					});
				}

			};
		}
		// 我的通告--分页
		var $MNpagination = $('#MN_container .pagination');
		var $myNoticeMain = $('.myNoticeMain');
		jsonAjax("/msg/getMessageList", {
			token: token,
			pageSize: myNoticePageSize, //每页条数
			curPage: 1
		}, getMessageList2);

		function getMessageList2(data) {
			totalCount = data.totalCount;
			$MNpagination.eq(0).pagination({
				total: totalCount,
				row: myNoticePageSize,
				onJump: function (index) {
					$myNoticeMain.eq(0).html(getMNList(index));
				}
			});
			$myNoticeMain.eq(0).html(getMNList(1));
		};
	/*消息中心调用接口请求数据--我的通知*/

// });
/*消息中心逻辑代码*/


//调用三方的注册接口
var chinaPnrServer;
var Version;
var CmdId;
var MerCustId;
var RetUrl;
var BgRetUrl;
var MerPriv;
var UsrId;
var UsrMp;
var PageType;
var ChkValue;
var GateBusiId;
var OrdDate;
var OrdId;
var TransAmt;
var UsrCustId;
var ServFee;
var ServFeeAcctId;
var OpenAcctId;
var Remark;
var CharSet;
var ReqExt;

// 开通
jsonAjax("/chinaPnr/userRegister", {
	token: sessionStorage.getItem("token"),
	clientType: "PC",
	// RetUrl : "http://pc.shwerui.com/"
}, userRegister);
function userRegister(data) {
	// console.log(data)
	chinaPnrServer = data.chinaPnrServer;
	Version = data.Version;
	CmdId = data.CmdId;
	MerCustId = data.MerCustId;
	RetUrl = data.RetUrl;
	// RetUrl = "http://pc.shwerui.com/";
	BgRetUrl = data.BgRetUrl;
	MerPriv = data.MerPriv;
	UsrId = data.UsrId;
	UsrMp = data.UsrMp;
	PageType = data.PageType;
	ChkValue = data.ChkValue;

	var action = $("#regAction").attr("action", chinaPnrServer);
	$("#regAction input[name=Version]").val(Version);
	$("#regAction input[name=CmdId]").val(CmdId);
	$("#regAction input[name=MerCustId]").val(MerCustId);
	$("#regAction input[name=RetUrl]").val(RetUrl);
	$("#regAction input[name=BgRetUrl]").val(BgRetUrl);
	$("#regAction input[name=MerPriv]").val(MerPriv);
	$("#regAction input[name=UsrId]").val(UsrId);
	$("#regAction input[name=UsrMp]").val(UsrMp);
	$("#regAction input[name=PageType]").val(PageType);
	$("#regAction input[name=ChkValue]").val(ChkValue);

	$("#openAccount").click(function () {
		document.regSubmit.submit();
	})
}

// 进入托管
jsonAjax("/chinaPnr/userLogin", {
	token: sessionStorage.getItem("token"),
	clientType: "PC"
}, userLogin);
function userLogin(data) {
	// console.log(data);	
	chinaPnrServer = data.chinaPnrServer;
	Version = data.Version;
	CmdId = data.CmdId;
	MerCustId = data.MerCustId;
	UsrCustId = data.UsrCustId;
	PageType = data.PageType;

	var action = $("#Action").attr("action", chinaPnrServer);
	$("#Action input[name=Version]").val(Version);
	$("#Action input[name=CmdId]").val(CmdId);
	$("#Action input[name=MerCustId]").val(MerCustId);
	$("#Action input[name=UsrCustId]").val(UsrCustId);
	$("#Action input[name=PageType]").val(PageType);

	$("#enterAcction").click(function () {
		document.loginSubmit.submit();
	})
}

/*充值提现逻辑代码 */
	/*充值提现tab*/
	$("#Recharge input:first").addClass("RechargeActive");
	$(".RechargeList").eq(0).show();
	$("#Recharge input").click(function () {
		$(this).addClass("RechargeActive").siblings().removeClass("RechargeActive");
		var i = $("#Recharge input").index(this);
		$(".RechargeList").eq(i).show().siblings(".RechargeList").hide();

		sessionStorage.removeItem('chongzhiMoney');
		var chongzhiMoney = $("#chongzhiInput").val("");

		sessionStorage.removeItem('tixianMoney');
		var tixianMoney = $("#tixianInput").val("");
	});



// 充值
if (token == null || token == "") {
	$(".czlogTishi").show();
	$(".txlogTishi").show();
}

var chongzhiMoney;
$("#chongzhiInput").blur(function () {
	var chongzhiMoney = $("#chongzhiInput").val();
	if (chongzhiMoney < 100) {
		$(".czTishi").css("display", "block");
		setTimeout(function () {
			$(".czTishi").css("display", "none");
		}, 2000);
	} else if (chongzhiMoney.length >= 3) {
		$(".czTishi").css("display", "none");
		sessionStorage.setItem("chongzhiMoney", chongzhiMoney);
	}
});

// 点击充值按钮
$("#chongzhiBtn").click(function () {
	// 调取三方接口
	jsonAjax("/chinaPnr/userNetSave", {
		token: sessionStorage.getItem("token"),
		clientType: "PC",
		transMoney: sessionStorage.getItem('chongzhiMoney')
	}, userNetSave);
	function userNetSave(data) {
		// console.log(data);

		if (data.resultMsg == "请求参数[transMoney]不完整") {
			$(".czTishi").css("display", "block");
			setTimeout(function () {
				$(".czTishi").css("display", "none");
			}, 2000);
		} else if (data.resultMsg == "获取充值参数异常") {
			$(".czTishi2").css("display", "block");
			setTimeout(function () {
				$(".czTishi2").css("display", "none");
			}, 2000);
		} else if (data.resultMsg == "尚未开通汇付账户，请先开通汇付托管账户！") {
			$(".czKaiTongTishi").show();
			setTimeout(function () {
				$(".czKaiTongTishi").hide();
			}, 2000);
		}

		chinaPnrServer = data.chinaPnrServer;
		Version = data.Version;
		CmdId = data.CmdId;
		UsrCustId = data.UsrCustId;
		MerCustId = data.MerCustId;
		OrdId = data.OrdId;
		OrdDate = data.OrdDate;
		TransAmt = data.TransAmt;
		BgRetUrl = data.BgRetUrl;
		PageType = data.PageType;
		ChkValue = data.ChkValue;
		// console.log(ChkValue);
		GateBusiId = data.GateBusiId;

		var action = $("#chongzhiAccount").attr("action", chinaPnrServer);
		$("#chongzhiAccount input[name=Version]").val(Version);
		$("#chongzhiAccount input[name=CmdId]").val(CmdId);
		$("#chongzhiAccount input[name=UsrCustId]").val(UsrCustId);
		$("#chongzhiAccount input[name=MerCustId]").val(MerCustId);
		$("#chongzhiAccount input[name=OrdId]").val(OrdId);
		$("#chongzhiAccount input[name=OrdDate]").val(OrdDate);
		$("#chongzhiAccount input[name=TransAmt]").val(TransAmt);
		$("#chongzhiAccount input[name=BgRetUrl]").val(BgRetUrl);
		$("#chongzhiAccount input[name=PageType]").val(PageType);
		$("#chongzhiAccount input[name=ChkValue]").val(ChkValue);
		$("#chongzhiAccount input[name=GateBusiId]").val(GateBusiId);
		if (data.result == 200) {
			document.chongzhiSubmit.submit();
		}
	}

})
//充值


// 提现
// 余额查询
jsonAjax("/chinaPnr/getAccBalaceFromChinaPnr", {
	token: sessionStorage.getItem("token"),
}, getAccBalaceFromChinaPnr);

function getAccBalaceFromChinaPnr(data) {
	// console.log(data);
	acctBalance = data.acctBalance; //账户余额
	avlBalance = data.avlBalance; //可用余额
	frzBalance = data.frzBalance; //冻结余额
	sessionStorage.setItem("avlBalance", avlBalance);
}

var tixianMoney;
$("#tixianInput").blur(function () {
	var tixianMoney = $("#tixianInput").val();
	var perAvlBalance = Number(sessionStorage.getItem("avlBalance"));
	
	if (tixianMoney < 100) {
		$(".txTishi").css("display", "block");
		setTimeout(function () {
			$(".txTishi").css("display", "none");
		}, 2000);
	} else if (tixianMoney.length >= 3) {
		$(".txTishi").css("display", "none");
		sessionStorage.setItem("tixianMoney", tixianMoney);
	}
});
$("#tixianBtn").click(function () {
	// 与可用余额比较
	var tixianMoney = $("#tixianInput").val();
	var perAvlBalance = Number(sessionStorage.getItem("avlBalance"));
	if (tixianMoney > perAvlBalance) {
	 	$(".txTishi3").show();
	 	setTimeout(function () {
	 		$(".txTishi3").hide()
	 	}, 2000);
	}
	console.log(tixianMoney);

	if ($("#tixianInput").val() != "") {
		// 调取三方接口
		jsonAjax("/chinaPnr/userCash", {
			token: sessionStorage.getItem("token"),
			clientType: "PC",
			transMoney: sessionStorage.getItem('tixianMoney')
		}, userCash);

		function userCash(data) {
			console.log(data);

			if (data.resultMsg == "请求参数[transMoney]不完整") {
				$(".txTishi").css("display", "block");
				setTimeout(function () {
					$(".txTishi").css("display", "none");
				}, 2000);
			} else if (data.resultMsg == "获取充值参数异常") {
				$(".txTishi2").css("display", "block");
				setTimeout(function () {
					$(".txTishi2").css("display", "none");
				}, 2000);
			}


			chinaPnrServer = data.chinaPnrServer;
			BgRetUrl = data.BgRetUrl;
			CharSet = data.CharSet;
			ChkValue = data.ChkValue;
			CmdId = data.CmdId;
			MerCustId = data.MerCustId;
			OpenAcctId = data.OpenAcctId;
			OrdId = data.OrdId;
			Remark = data.Remark;
			ServFee = data.ServFee;
			ServFeeAcctId = data.ServFeeAcctId;
			TransAmt = data.TransAmt;
			UsrCustId = data.UsrCustId;
			Version = data.Version;
			MerCustId = data.MerCustId;
			// Remark = data.Remark;
			ReqExt = JSON.stringify(data.ReqExt);
			if (ReqExt == "{}") {
				ReqExt = "";
			} else {
				ReqExt = JSON.stringify(data.ReqExt);
			}


			var action = $("#tixianAccount").attr("action", chinaPnrServer);
			$("#tixianAccount input[name=Version]").val(Version);
			$("#tixianAccount input[name=CmdId]").val(CmdId);
			$("#tixianAccount input[name=MerCustId]").val(MerCustId);
			$("#tixianAccount input[name=OrdId]").val(OrdId);
			$("#tixianAccount input[name=UsrCustId]").val(UsrCustId);
			$("#tixianAccount input[name=TransAmt]").val(TransAmt);
			$("#tixianAccount input[name=ServFee]").val(ServFee);
			$("#tixianAccount input[name=ServFeeAcctId]").val(ServFeeAcctId);
			$("#tixianAccount input[name=OpenAcctId]").val(OpenAcctId);
			$("#tixianAccount input[name=BgRetUrl]").val(BgRetUrl);
			$("#tixianAccount input[name=Remark]").val(Remark);
			$("#tixianAccount input[name=CharSet]").val(CharSet);
			$("#tixianAccount input[name=ChkValue]").val(ChkValue);
			$("#tixianAccount input[name=ReqExt]").val(ReqExt);
			$("#tixianAccount input[name=ChkValue]").val(ChkValue);
			$("#tixianAccount input[name=PageType]").val(PageType);
			if (data.result == 200) {
				document.tixianSubmit.submit();
			}
		}
	}else{
			$(".txTishi").css("display", "block");
			setTimeout(function () {
				$(".txTishi").css("display", "none");
			}, 2000);
		}
	
})
/*充值提现逻辑代码 */


// 绑卡
jsonAjax("/chinaPnr/userBindCard", {
	token: sessionStorage.getItem("token"),
	clientType: "PC"
}, userBindCard);
function userBindCard(data) {
	// console.log(data);
	chinaPnrServer = data.chinaPnrServer;
	Version = data.Version;
	CmdId = data.CmdId;
	MerCustId = data.MerCustId;
	UsrCustId = data.UsrCustId;
	BgRetUrl = data.BgRetUrl;
	MerPriv = data.MerPriv;
	PageType = data.PageType;
	ChkValue = data.ChkValue;

	var action = $("#bangkaAccount").attr("action", chinaPnrServer);
	$("#bangkaAccount input[name=Version]").val(Version);
	$("#bangkaAccount input[name=CmdId]").val(CmdId);
	$("#bangkaAccount input[name=MerCustId]").val(MerCustId);
	$("#bangkaAccount input[name=UsrCustId]").val(UsrCustId);
	$("#bangkaAccount input[name=BgRetUrl]").val(BgRetUrl);
	$("#bangkaAccount input[name=MerPriv]").val(MerPriv);
	$("#bangkaAccount input[name=PageType]").val(PageType);
	$("#bangkaAccount input[name=ChkValue]").val(ChkValue);

	$("#goBangka").click(function () {
		if (data.result == 300) {
			alert(data.resultMsg)
		} else {
			document.bangkaSubmit.submit();
		}
	})
}

// 换绑卡
$(".changeCard").click(function(){
	window.open("https://user.chinapnr.com/p2puser/");
});


// 显示银行卡数据
jsonAjax("/bankCard/getUserBankCardList", {
	token: sessionStorage.getItem("token"),
}, getUserBankCardList);
function getUserBankCardList(data) {
	// console.log(data);
	if (data.result == 200 && data.BankCard.length > 0) {
		bankData = data.BankCard;
		bankCode = bankData[0].bankCode;
		cardAccount = bankData[0].cardAccount;
		expressFlag = bankData[0].expressFlag;

		$("#bankImg").attr("src", "img/bank/" + bankCode + ".png");
		if (expressFlag == "Y") {
			$(".bankType").empty().append("借记卡");
		}else{
			$(".bankType").empty().append("取现卡");
		}

		$(".bankCode").empty().append(cardAccount);
		
	}
}
