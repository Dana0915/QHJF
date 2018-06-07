var zrUrl = location.href;
    zrUrl = zrUrl.split("?")
var productId = zrUrl[1];
var biaoDiStatus = zrUrl[2];
var token = sessionStorage.getItem("token");
// console.log(productId);
if (token == "" || token == null) {
    window.location.href = "../../login.html"
}


//调用产品详情接口
var productUserList, productList;
var saftList;
jsonAjax("/product/getProductDetail", {
    productId: productId,
    token: token,
}, getProductDetail);

function getProductDetail(data) {
    // console.log(data);

    //登陆超时的提示
    if (data.result == 400) {
        $(".zheZhao").show();
        $("#chaoshiTS").show();
        $("body").css("overflow","hidden");
        $("#chaoshiTS").click(function () {
            $("#chaoshiTS").hide();
            window.location.href="../login.html"
        });
    } else {
        $("body").css("overflow", "visible");        
        $(".zheZhao").hide();
        $("#chaoshiTS").hide()
    }
    //登陆超时的提示

    // 产品的信息
    productList = data.ProductInfo;
    // console.log(productList);

    var productName = productList.productName;
    $("#prodeuctName").empty().append(productName);
    $(".TZmainTopName").empty().append(productName);


    
    annualYield = productList.annualYield;
    $(".lilv b").empty().append(annualYield);
    $("#TZlilv b:eq(0)").empty().append(annualYield);

    

    var period = productList.period;
    $(".month").empty().append(period);
    $(".TZmainTopDay").empty().append(period)
    

    var openLimit = parseInt(productList.openLimit);
    $(".money").empty().append(openLimit);



    var productType = productList.productType;
    //固收产品
    if (productType == 18) {
        $("#productType").empty().append("固收产品");
    } else if (productType == 19) { //可转让产品
        $("#productType").empty().append("可转让产品");
    } else if (productType == 22) { //火爆产品
        $("#productType").empty().append("火爆产品");
    } else if (productType == 3) { //新手产品
        $("#productType").empty().append("新手产品");
    }

    // 起息方式
    interestType = productList.interestType;
    if (interestType == 1) {
        $(".interestType").empty().append("T+0");
        $("#raisePeriod").remove()
    } else if (interestType == 2) {
        $(".interestType").empty().append("T+1");
        $("#raisePeriod").remove()
    } else if (interestType == 3) {
        $(".interestType").empty().append("满标计息");
        // 募集期
        raisePeriod = productList.raisePeriod;
        $(".raisePeriod").empty().append(raisePeriod + "天");
    }



    // 还款方式（收益方式）
    yieldDistribType = productList.yieldDistribType;
    // console.log(yieldDistribType);
    if (yieldDistribType == 1) {
        $(".yieldDistribType").empty().append("到期还本付息")
    } else if (yieldDistribType == 2) {
        $(".yieldDistribType").empty().append("先息后本")
    } else if (yieldDistribType == 2) {
        $(".yieldDistribType").empty().append("等额本息")
    }

    
    // 项目进度
    xmjd = Math.round(productList.xmjd);
    //  console.log(xmjd);
    $(".jinduTxt").empty().append(xmjd + "%");
    $(".progress-bar").css("width", xmjd + '%');


    /*剩余可投计算模块*/
    //基础利率
    baseAnnualYield = productList.baseAnnualYield;
    //活动利率
    actAnnualYield = productList.actAnnualYield;
    //最小投资额度
    amountMin = parseInt(productList.amountMin);
    //最大投资额度 
    amountMax = productList.amountMax;
    //剩余可投 
    residueMoney = parseInt(productList.residueMoney);
    $(".shenyuMoney span").empty().append(residueMoney);
    $(".TZmainTopMoney").empty().append(residueMoney);
    $(".btm1 span").empty().append(residueMoney);
    $(".btm2 span").empty().append(residueMoney);

    //步长
    amountIncrease = parseInt(productList.amountIncrease);

    //预计到期收益
    var zrLilv = actAnnualYield / 100;
    var total = toDecimal2(Math.floor((residueMoney * zrLilv / 365 * period) * 100) / 100);

    // progress = toDecimal2(Math.floor(productList.progress * 100) / 100);
    $(".xqMoney").text(total);
    $(".yuJiDaoQiMoney").text(total + "元");

    // 转让详情
    //到期日
    dqr = productList.dqr;
    $(".dqr").empty().append(dqr);

    //剩余理财天数
    daysLimit = productList.daysLimit;
    $(".daysLimit").empty().append(daysLimit + "天");

    //转让人
    alienator = productList.alienator;
    // console.log(alienator);
    $(".alienator").empty().append(alienator);
    
    
    

    //转让日期
    orderZrDate = productList.orderZrDate;
    $(".orderZrDate").empty().append(orderZrDate);

}

/*确认购买*/
jsonAjax("/chinaPnr/getAccBalaceFromChinaPnr", {
    token: sessionStorage.getItem("token"),
}, getAccBalaceFromChinaPnr);

function getAccBalaceFromChinaPnr(data) {
    // console.log(data);
    acctBalance = data.acctBalance; //账户余额
    avlBalance = Number(data.avlBalance); //可用余额
    frzBalance = data.frzBalance; //冻结余额
    // sessionStorage.setItem("avlBalance", avlBalance);

    var residueMoney = Number($(".shenyuMoney span").text());
    // console.log(residueMoney);
    // console.log(avlBalance);
    if (residueMoney == 0) {
        $(".xqMoney").text("0.00");
        $(".qitouBtn").css("backgroundColor", "#ccc");
        $(".qitoutxt").css("color", "#fafafa");
        $(".chongzhiTS").show();
    }else{
        if (avlBalance < residueMoney) {
            $(".chongzhiTS1").show();
            $(".qitouBtn").css("backgroundColor", "#ccc");
            $(".qitoutxt").css("color", "#fafafa");
        } else {
            $(".chongzhiTS").hide();
            $(".chongzhiTS1").hide();

            $(".qitouBtn").click(function () {
                $(".zheZhao").show();
                $(".confirmationTouZi").show();
                $("body").css("overflow", "hidden");
            });
        }
    }


    
}

$(".TZmainBtn").click(function () {
    //实付金额（初始）
    var orderMoney = $(".shenyuMoney span").text();
    //调取三方购买接口
    jsonAjax("/trade/buyProductByChinaPnr", {
        token: token,
        clientType: "PC",
        productId: productId,
        orderMoney: orderMoney, //订单金额
        payType: 1, //余额支付
    }, ProductByChinaPnr);

    function ProductByChinaPnr(data) {
        console.log(data);
        // console.log(typeof data.result);
        console.log(data.resultMsg);


        if (data.result == 302) {
            $(".weiKaiHuTS").show();
        } else if (data.result == 307) {
            $(".gaojieTishi").show();
        } else if (data.result == 329) {
            $(".endTishi").show();
        }

        if (data.result == 200) {
            PayInfo = data.buyInfo.PayInfo;
            if (PayInfo != undefined) {
                // 表单数据
                ChinaPnrServer = PayInfo.ChinaPnrServer;
                var action = $("#buyAccount").attr("action", ChinaPnrServer)

                Version = PayInfo.Version;
                $("#buyAccount input[name=Version]").val(Version);

                CmdId = PayInfo.CmdId;
                $("#buyAccount input[name=CmdId]").val(CmdId);

                MerCustId = PayInfo.MerCustId;
                $("#buyAccount input[name=MerCustId]").val(MerCustId);

                OrdId = PayInfo.OrdId;
                $("#buyAccount input[name=OrdId]").val(OrdId);

                OrdDate = PayInfo.OrdDate;
                $("#buyAccount input[name=OrdDate]").val(OrdDate);

                TransAmt = PayInfo.TransAmt;
                $("#buyAccount input[name=TransAmt]").val(TransAmt);

                UsrCustId = PayInfo.UsrCustId;
                $("#buyAccount input[name=UsrCustId]").val(UsrCustId);

                MaxTenderRate = PayInfo.MaxTenderRate;
                $("#buyAccount input[name=MaxTenderRate]").val(MaxTenderRate);


                BorrowerDetailsInit = PayInfo.BorrowerDetails;
                BorrowerDetailsStr = "[";
                for (var item in BorrowerDetailsInit) {
                    var BorrowerDetails = BorrowerDetailsInit[item];
                    BorrowerDetailsStr += "{";
                    BorrowerDetailsStr += "\"BorrowerCustId\":\"" + BorrowerDetails.BorrowerCustId + "\",";
                    BorrowerDetailsStr += "\"BorrowerAmt\":\"" + BorrowerDetails.BorrowerAmt + "\",";
                    BorrowerDetailsStr += "\"BorrowerRate\":\"" + BorrowerDetails.BorrowerRate + "\",";
                    BorrowerDetailsStr += "\"ProId\":\"" + BorrowerDetails.ProId + "\"";
                    BorrowerDetailsStr += "},";
                }
                BorrowerDetailsStr = BorrowerDetailsStr.substring(0, BorrowerDetailsStr.length - 1);
                BorrowerDetailsStr += "]";
                // console.log(BorrowerDetailsStr);


                $("#buyAccount input[name=BorrowerDetails]").val(BorrowerDetailsStr);

                IsFreeze = PayInfo.IsFreeze;
                $("#buyAccount input[name=IsFreeze]").val(IsFreeze);

                FreezeOrdId = PayInfo.FreezeOrdId;
                $("#buyAccount input[name=FreezeOrdId]").val(FreezeOrdId);

                BgRetUrl = PayInfo.BgRetUrl;
                $("#buyAccount input[name=BgRetUrl]").val(BgRetUrl);

                ReqExt = JSON.stringify(PayInfo.ReqExt);
                if (ReqExt == "{}") {
                    ReqExt = "";
                } else {
                    ReqExt = JSON.stringify(PayInfo.ReqExt);
                }
                $("#buyAccount input[name=ReqExt]").val(ReqExt);

                PageType = PayInfo.PageType;
                $("#buyAccount input[name=PageType]").val(PageType);

                ChkValue = PayInfo.ChkValue;
                $("#buyAccount input[name=ChkValue]").val(ChkValue);


                // 提交表单数据
                document.buySubmit.submit();

                $(".zheZhao").hide();
                $(".confirmationTouZi").hide();
                $("body").css("overflow", "visible");


            } else if (PayInfo == undefined) {
                if (data.buyInfo.result == 314) {
                    $(".hbTishi").show();
                    setTimeout(function () {
                        $(".hbTishi").hide();
                    }, 2000);
                } else if (data.buyInfo.result == 317) {
                    $(".noMoney").show();
                }
            }
        }

    }
});

//  点击关闭
$(".touZiClose").click(function () {
    sessionStorage.removeItem("rataWelfareId");
    sessionStorage.removeItem("redwelfareId");

    $(".zheZhao").hide();
    $(".confirmationTouZi").hide();
    $("body").css("overflow", "visible");

    $(".weiKaiHuTS").hide();
    $(".noMoney").hide();
    $(".gaojieTishi").hide();

    location.reload();
})


//产品介绍
jsonAjax("/product/getProjectIntroduction", {
    productId: productId,
    token: token
}, getProjectIntroduction);

function getProjectIntroduction(data) {
    // console.log(data);
    
    //产品详情的数据缺少
    //项目介绍
    productDetail = data.productDetail;
    $(".xiangmuxiangqing").empty().append(productDetail)

    //console.log(data.User); 
    user = data.User; //审核人 
    //姓名 
    creditorName = user.creditorName;
    $(".name1").empty().append(creditorName);

    name = user.name;
    // console.log(name);
    if (name == "undefined" || name == "" || name == undefined) {
        $(".assetName").empty().append("");
    } else {
        $(".assetName").empty().append(name);
    };

    //性别 
    creditorSex = user.creditorSex;
    if (creditorSex == 0) {
        $(".sex1").empty().append("男");
    } else if (creditorSex == 1) {
        $(".sex1").empty().append("女");
    }
    //年龄 
    creditorAge = user.creditorAge;
    $(".age1").empty().append(creditorAge);

    //婚姻状况 
    creditorMaritalStatus = user.creditorMaritalStatus;
    if (creditorMaritalStatus == 0) {
        $(".marray1").empty().append("未婚");
    } else if (creditorMaritalStatus == 1) {
        $(".marray1").empty().append("已婚");
    } else {
        $(".marray1").empty().append("离异");
    }

    // 身份证号 
    creditorIdCard = user.creditorIdCard;
    $(".cardNumber").empty().append(creditorIdCard);

    //籍贯
    creditorNativePlace = user.creditorNativePlace;
    $(".jiGuan").empty().append(creditorNativePlace);

    //借款用途 
    assetFundsUse = user.assetFundsUse;
    $(".jieKuanUse").empty().append(assetFundsUse);

    //车辆型号 
    vehicleType = user.vehicleType;
    $(".carSize").empty().append(vehicleType);

    //新车价格 
    vehiclePrice = user.vehiclePrice;
    // console.log(vehiclePrice); 
    $(".newCarPrice").empty().append(vehiclePrice);

    //估价 
    vehicleMortgageValuation = user.vehicleMortgageValuation;
    $(".aboutPrice").empty().append(vehicleMortgageValuation);

    //车牌号 
    vehicleNumberPlate = user.vehicleNumberPlate;
    $(".carName").empty().append(vehicleNumberPlate);

    //行驶里程 
    vehicleRoalHaul = user.vehicleRoalHaul;
    $(".Mileage").empty().append(vehicleRoalHaul);
    /*用户信息 */

    /*安全保障*/
    saftList = data.asset;
    //					console.log(saftList);

    var assetStatus = saftList.assetStatus;
    //					console.log(assetStatus);
    if (assetStatus == 2) {
        $("#assetStatus").empty().append("通过");
    } else {
        $("#assetStatus").empty().append("未通过");
    }

    var creditorIdCard = saftList.creditorIdCard;
    if (creditorIdCard != "") {
        $("#creditorIdCard").empty().append("二代身份证");
    } else {
        $("#creditorIdCard").remove();
    }

    var vehicleDrivingLicencePic = saftList.vehicleDrivingLicencePic;
    if (vehicleDrivingLicencePic != undefined) {
        $("#creditorIdCard").empty().append("驾驶证");
    } else {
        $("#shenheTitle2").remove();
    }

    // var vehicleIdCardPic = saftList.vehicleIdCardPic;
    // if (vehicleIdCardPic != undefined) {
    //     $("#vehicleIdCardPic").empty().append("身份证验证图");
    // } else {
    //     $("#shenheTitle3").remove();
    // }

    var vehicleApplyPic = saftList.vehicleApplyPic;
    if (vehicleApplyPic != undefined) {
        $("#vehicleApplyPic").empty().append("申请表");
    } else {
        $("#shenheTitle4").remove();
    }


    var vehicleReceiptPic = saftList.vehicleReceiptPic;
    if (vehicleReceiptPic != undefined) {
        $("#vehicleReceiptPic").empty().append("通讯录");
    } else {
        $("#shenheTitle5").remove();
    }

    var vehicleTravelLicensePic = saftList.vehicleTravelLicensePic;
    if (vehicleTravelLicensePic != undefined) {
        $("#vehicleTravelLicensePic").empty().append("行驶证验证图");
    } else {
        $("#shenheTitle6").remove();
    }

    var vehicleWarrantyPic = saftList.vehicleWarrantyPic;
    if (vehicleWarrantyPic != undefined) {
        $("#vehicleWarrantyPic").empty().append("保单");
    } else {
        $("#shenheTitle7").remove();
    }

    var vehiclePeccancyPic = saftList.vehiclePeccancyPic;
    if (vehiclePeccancyPic != undefined) {
        $("#vehiclePeccancyPic").empty().append("违章信息");
    } else {
        $("#shenheTitle8").remove();
    }

    var vehiclePersonPic = saftList.vehiclePersonPic;
    if (vehiclePersonPic != undefined) {
        $("#vehiclePersonPic").empty().append("人车合照");
    } else {
        $("#shenheTitle9").remove();
    }

    var vehicleAppearanceBeforePic = saftList.vehicleAppearanceBeforePic;
    if (vehicleAppearanceBeforePic != undefined) {
        $("#vehicleAppearanceBeforePic").empty().append("车辆外观前照");
    } else {
        $("#shenheTitle10").remove();
    }

    var vehicleAppearanceAfterPic = saftList.vehicleAppearanceAfterPic;
    if (vehicleAppearanceAfterPic != undefined) {
        $("#vehicleAppearanceAfterPic").empty().append("车辆外观后照");
    } else {
        $("#shenheTitle11").remove();
    }

    var vehicleOdometerPic = saftList.vehicleOdometerPic;
    if (vehicleOdometerPic != undefined) {
        $("#vehicleOdometerPic").empty().append("里程表照片");
    } else {
        $("#shenheTitle12").remove();
    }

    var vehicleTrunkPic = saftList.vehicleTrunkPic;
    if (vehicleTrunkPic != undefined) {
        $("#vehicleTrunkPic").empty().append("车辆后备箱照片");
    } else {
        $("#shenheTitle13").remove();
    }

    var vehicleNameplatePic = saftList.vehicleNameplatePic;
    if (vehicleNameplatePic != undefined) {
        $("#vehicleNameplatePic").empty().append("铭牌照片");
    } else {
        $("#shenheTitle14").remove();
    };



    // 项目图片

    vehicleAppearanceBeforePic = saftList.vehicleAppearanceBeforePic; //前照
    vehicleAppearanceAfterPic = saftList.vehicleAppearanceAfterPic; //后照
    vehicleOdometerPic = saftList.vehicleOdometerPic; //里程照

    $("#pic1").empty().append('<img src="' + vehicleAppearanceBeforePic + '"/>');
    $("#pic2").empty().append('<img src="' + vehicleAppearanceAfterPic + '"/>');
    $("#pic3").empty().append('<img src="' + vehicleOdometerPic + '"/>');

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 500,
        // slidesPerView: 4,
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 1,
        // offsetPxBefore: 220,
        offsetPxBefore: 350
    });
    $('.swiper-button-prev').click(function () {
        mySwiper.swipePrev();
    })
    $('.swiper-button-next').click(function () {
        mySwiper.swipeNext();
    });


}

// 协议
$(".tishiyu").click(function () {
    $(".zheZhao").show();
    $(".xyContainer").show();
    $("body").css("overflow", "hidden");
});
$(".xyBtn").click(function () {
    $(".zheZhao").hide();
    $(".xyContainer").hide();
    $("body").css("overflow", "visible");
});
