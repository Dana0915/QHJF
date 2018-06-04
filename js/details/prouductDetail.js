
var token = sessionStorage.getItem("token");
// console.log(token);

var manbiaoUrl = location.href;
var mbPrd = manbiaoUrl.split("?");
var productId = mbPrd[1];
// console.log(productId);
var biaoDiStatus = mbPrd[2];
// console.log(biaoDiStatus);



//调用产品详情接口
var productUserList, productList;
var saftList;
jsonAjax("/product/getProductDetail", {
    productId: productId,
    token: token
}, getProductDetail);

function getProductDetail(data) {
    // console.log(data);
    //登陆超时的提示
    if (data.result == 400) {
        $(".zheZhao").show();
        $("#chaoshiTS").show();
        $("body").css("overflow", "hidden");
        $("#chaoshiTS").click(function () {
            $("#chaoshiTS").hide();
            window.location.href = "../login.html"
        });
    } else {
        $(".zheZhao").hide();
        $("#chaoshiTS").hide();
        $("body").css("overflow", "visible");
    }
    //登陆超时的提示

    // 产品的信息
    productList = data.ProductInfo;
    // console.log(productList);

    var productName = productList.productName;
    $("#prodeuctName").empty().append(productName);
    $(".TZmainTopName").empty().append(productName);

    baseAnnualYield = productList.baseAnnualYield;
    $(".lilv").empty().append(baseAnnualYield);
    $("#TZlilv b:eq(0)").empty().append(baseAnnualYield);
    
    // 活动利率
    actAnnualYield = productList.actAnnualYield; 
    if (actAnnualYield != 0) {    
        $(".fuao").empty().append("+" + actAnnualYield + "%");
        $("#TZlilv b:eq(1)").empty().append(" + " + actAnnualYield + "%");
    }

    var period = productList.period;
    $("#period").empty().append(period);
    $(".TZmainTopDay").empty().append(period);

    var openLimit = parseInt(productList.openLimit);
    $("#openLimit").empty().append(openLimit);


    var productType = productList.productType;
    //固收产品
    if (productType == 18) {
        $("#productType").empty().append("固收产品");
    } else if (productType == 19) { //可转让产品
        $("#productType").empty().append("可转让产品");
        $(".fuao").empty().append("~" + actAnnualYield + "%");
        $("#TZlilv b:eq(1)").empty().append(" ~ " + actAnnualYield + "%");
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
        $(".yieldDistribType").empty().append("到期还本付息");
        $(".yieldDistribType1").empty().append("到期还本付息")
    } else if (yieldDistribType == 2) {
        $(".yieldDistribType").empty().append("先息后本");
        $(".yieldDistribType1").empty().append("先息后本")
    } else if (yieldDistribType == 3) {
        $(".yieldDistribType").empty().append("等额本息");
        $(".yieldDistribType1").empty().append("等额本息");        
    }

    


    // 项目进度
    xmjd = Math.round(productList.xmjd);
    //  console.log(xmjd);
    $(".jinduTxt").empty().append(xmjd + "%");
    $(".progress-bar").css("width", xmjd + '%');

    
    
    /*剩余可投计算模块*/
    //最小投资额度
    amountMin = parseInt(productList.amountMin);
    //最大投资额度 
    amountMax = productList.amountMax;
    //剩余可投 
    residueMoney = parseInt(productList.residueMoney);
    $(".shenyuMoney span").empty().append(residueMoney);

    //步长
    amountIncrease = parseInt(productList.amountIncrease);

    //总利率=活动利率 + 活动利率
    totalAnnualYield = baseAnnualYield + actAnnualYield;
    // console.log(totalAnnualYield);

    //起投金额的值
    $(".qitoutxt span").empty().append(amountMin);

    //输入提示
    $(".SYtishi span:eq(0)").append(amountMin);
    $(".SYtishi span:eq(1)").append(residueMoney);


    /*加减输入框事件*/
    //给输入框赋值
    var Money = $(".shuruMoney");
    Money.val(amountMin);
    var defaultInputVal = Money.val(); //显示输入框的默认值
    // console.log(defaultInputVal);//100

    updateMoney(); //页面加载先执行一次 

    //计算方法
    function updateMoney() {
        var newAddMoney = Money.val();        
        var lilv = totalAnnualYield / 100;  
        // console.log(lilv);

        //求取预期到期收益
        var shouyi = $(".yieldDistribType").text(); //还款方式  
        //console.log(shouyi);
           
        var month = parseInt(period / 30); // 总共整月数 (还款月数)
        var monthYuShu = period % 30; // 多余的天数

        var lilvMouth = Math.floor((lilv / 12) * 1000000) / 1000000; // 月利率
        var lilvDay = Math.floor((lilv / 365) * 1000000) / 1000000; // 日利率

        // 每月应还利息 = 贷款本金 × 月利率  × 〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕 
        // 收益公式 == newAddMoney * lilvMouth * (Math.pow(1 + lilvMouth, month) - Math.pow(1 + lilvMouth, i-1)) / (Math.pow(1 + lilvMouth, month)-1)

        if (shouyi == "先息后本") {    
            var lilvMouth = Math.floor((lilv / 12)*1000000)/1000000; // 月利率
            var lilvDay = Math.floor((lilv / 365) * 1000000) / 1000000;; // 日利率

            // var totalMonth = Math.floor((newAddMoney * lilvMouth * month) * 1000000) / 1000000; // 总月数的收益
            // var daily = Math.floor((newAddMoney * lilvDay * monthYuShu) * 1000000) / 1000000; // 剩余天数的收益


            var totalMonth = Math.floor((newAddMoney * lilvMouth * month) * 1000000) / 1000000; // 总月数的收益
            // var daily = newAddMoney * lilvDay * monthYuShu; // 剩余天数的收益
            // console.log(totalMonth);
            // console.log(daily);

            // 总收益 = 总月数的收益 + 剩余天数的收益;
            // var total = toDecimal2(Math.floor(totalMonth * 100 + daily * 100) / 100);
            var total = toDecimal2(Math.floor(totalMonth * 100) / 100);
            // console.log(total);

        } else if (shouyi == "到期还本付息") {
            if (productType == 19) {
                var zrLilv = actAnnualYield / 100;    
                var total = toDecimal2(Math.floor((newAddMoney * zrLilv / 365 * period) * 100) / 100);
            }else{
                var total = toDecimal2(Math.floor((newAddMoney * lilv / 365 * period) * 100) / 100);
            }
        } else if (shouyi == "等额本息") {
            // 总月数的收益
            var totalMonth = 0;
            for (var i = 1; i <= month; i++) {    
                //收益计算公式 ：  
                var jssy = Math.floor((newAddMoney * lilvMouth * (Math.pow(1 + lilvMouth, month) - Math.pow(1 + lilvMouth, i - 1)) / (Math.pow(1 + lilvMouth, month) - 1)) * 1000000) / 1000000;
                // console.log(jssy);
                
                // 每个月的收益：  
               var monthly = jssy;
                totalMonth = totalMonth + monthly;
            }
            // console.log(totalMonth);
            var daily = Math.floor((newAddMoney * lilvDay * monthYuShu) * 100) / 100; // 剩余天数的收益
            var total = toDecimal2(Math.floor((totalMonth + daily)*100) / 100); // 预计到期收益
            // console.log(total);
            
        }

        if (total == NaN || total == false) {
            $(".xqMoney").text("0.00");
        } else {
            $(".xqMoney").text(total);
        }
    }

    /*加减计算框*/
    $(function () {
        //输入框改变
        $(".shuruMoney").keyup(function () {
            var newJoinMoney = $(this);
            if (/[^\d]/.test(newJoinMoney.val())) { //替换非数字字符
                var amount = Number(newJoinMoney.val().replace(/[^\d]/g, ''));
                $(this).val(amount);
            }

            // 判断输入值的大小
            if (newJoinMoney.val() > residueMoney) {
                // alert("00000");
                var newAddMoney = Money.val(residueMoney);
                $(".SYtishi").show();
                setTimeout(function () {
                    $(".SYtishi").hide()
                }, 2000);
            } else if (newJoinMoney.val() < amountMin) {
                $(".SYtishi").show();
            } else if (newJoinMoney.val() % amountIncrease != 0) {
                $(".SYtishi").empty().append("请输入" + amountIncrease + "的倍数")
                $(".SYtishi").show();
                setTimeout(function () {
                    $(".SYtishi").hide()
                }, 2000);
            }
            
            else {
                $(".SYtishi").hide()
            }

            updateMoney();
        });
        $(".shuruMoney").on("change",function(){
            var numMoney = Number(Money.val());
            if (Money.val() == "") {
                Money.val(numMoney);
            }
        });

         // 加号事件
         $(".add").click(function () {
             $(".touziTishi").hide();
             if (Money.val() >= amountMin) {
                 $(".SYtishi").hide();
             }

             if (Money.val() < residueMoney) {
                 if (Money.val() % amountIncrease != 0) {
                     $(".SYtishi").empty().append("请输入" + amountIncrease + "的倍数")
                     $(".SYtishi").show();
                     setTimeout(function () {
                         $(".SYtishi").hide()
                     }, 2000);
                 }else{
                     Money.val(parseInt(Money.val()) + amountIncrease); //点击加号输入框数值加步长
                     if (Money.val() > residueMoney) {
                         Money.val(residueMoney)
                     }
                 }
                 
             } else if (Money.val() >= residueMoney) {
                 $(".bigKetouTishi").show();
                 setTimeout(function () {
                     $(".bigKetouTishi").hide();
                 }, 2000);
             } else {
                 Money.val(parseInt(residueMoney)); //值为步长
             }
             updateMoney(); //显示总金额
         });

        // 减号事件
        $(".min").click(function () {
            if (Money.val() < amountMin) {
                $(".touziTishi").show();
                 Money.val(amountMin);
            }else if (Money.val() > amountMin) {
                if (Money.val() % amountIncrease != 0) {
                    $(".SYtishi").empty().append("请输入" + amountIncrease + "的倍数")
                    $(".SYtishi").show();
                    setTimeout(function () {
                        $(".SYtishi").hide()
                    }, 2000);
                } else {
                    Money.val(parseInt(Money.val()) - amountIncrease); //点击减号输入框数值减步长
                    if (Money.val() > residueMoney) {
                        Money.val(residueMoney)
                    }
                }
            }
            updateMoney();
        });
    });
    /*剩余可投计算模块*/
}

/*确认投资框 */
sessionStorage.removeItem("redwelfareId");
sessionStorage.removeItem("rataWelfareId");
if (biaoDiStatus == 4) {
        $(".qitouBtn").attr("class","gray");
        $(".endTs").show();
}else{
    /*起投框 */
    $(".qitouBtn").click(function () {
        //投资的值
        var qitouValue = $(".shuruMoney").val();
        // console.log(qitouValue);
        // 投资金额&投标金额
        $(".TZmainTopMoney").empty().append(qitouValue);
        $(".btm1 span").empty().append(qitouValue);
        if (qitouValue >= amountMin) {
            //实付金额（初始）
            $(".btm2 span").empty().append(qitouValue);
            var period = $("#period").text();
            // console.log(period);
            // console.log(qitouValue);

            /*红包列表 */
            var redPackList;
            var redPackMoban = document.getElementById("redPackMoban").innerHTML;
            jsonAjax("/welfare/getMyRedPacketList", {
                token: token,
                status: 3,
                transMoney: qitouValue,
                proPeriod: period
            }, RedPacketList)
            function RedPacketList(data) {
                // console.log(data);

                redPackList = data.RedPacket;

                if (redPackList.length != 0) {
                    $(".fuliTishi").hide();
                } else {
                    $(".fuliTishi").show();
                }

                $(".redPack").children().not("#redPackMoban").remove();
                $.each(redPackList, function (i, item) {
                    var str = redPackMoban.replace(/%(\w+)%/ig, function (word, $1) {
                        return item[$1];
                    });
                    $(str).appendTo(".redPack");

                    investMoney = redPackList[i].investMoney;
                    console.log(investMoney);

                    /*点击勾选红包*/
                    $('#redPack input').eq(i).click(function () {
                        //复选框只选中一个            
                        $('#redPack').find('input[type=checkbox]').not(this).attr("checked", false);
                        $('#rate').find('input[type=checkbox]').not(this).attr("checked", false);

                        // 判断是否选中
                        if ($(this).attr("checked")) {
                            $(this).attr("checked", false);
                        } else {
                            $(this).attr("checked", true);
                        }

                        //红包金额
                        $(this).val(redPackList[i].redPacketMoney);
                        var val = $(this).val();
                        //红包用户福利的Id
                        var redwelfareId = redPackList[i].welfareId;
                        // console.log(redwelfareId);

                        // 实付金额 = 投标金额 - 选中的可用福利（ 红包金额）
                        if ($(this).attr("checked") == "checked") {
                            var realMoney = Number(qitouValue) - Number(val);
                            if (realMoney <= 0) {
                                $(".btm2 span").text(0);
                            }else{
                                $(".btm2 span").text(realMoney);
                            }
                            
                            sessionStorage.setItem("redwelfareId", redwelfareId);
                            sessionStorage.removeItem("rataWelfareId");
                            // console.log(sessionStorage.getItem("redwelfareId"));
                        } else if ($(this).attr("checked") == undefined) {
                            $(".btm2 span").text(Number(qitouValue));
                            sessionStorage.removeItem("redwelfareId");       
                            // console.log(sessionStorage.getItem("redwelfareId"));                    
                        }
                        //实付金额 = 投标金额 - 选中的可用福利（ 红包金额）
                    });
                    /*点击勾选红包*/
                });
            }
            /*红包列表 */

            /*加息券列表 */
            var rateList;
            var rateMoban = document.getElementById("rateMoban").innerHTML;
            jsonAjax("/welfare/getMyIncreaseList", {
                token: token,
                status: 3,
                transMoney: qitouValue,
                proPeriod: period
            }, getMyIncreaseList);
            function getMyIncreaseList(data) {
                // console.log(data);

                rateList = data.Increase;
                if (rateList.totalCount != 0) {
                    $(".fuliTishi").hide();
                } else {
                    $(".fuliTishi").show();
                }
                $(".rate").children().not("#rateMoban").remove();
                $.each(rateList, function (i, item) {
                    var str = rateMoban.replace(/%(\w+)%/ig, function (word, $1) {
                        return item[$1];
                    });
                    $(str).appendTo(".rate");

                    /*点击勾选加息券 */
                    $("#rate input").eq(i).click(function () {
                        //复选框只选中一个            
                        $('#redPack').find('input[type=checkbox]').not(this).attr("checked", false);
                        $('#rate').find('input[type=checkbox]').not(this).attr("checked", false);

                        // 判断是否选中
                        if ($(this).attr("checked")) {
                            $(this).attr("checked", false);
                        } else {
                            $(this).attr("checked", true);
                        }

                        //加息券用户福利的Id
                        rataWelfareId = rateList[i].welfareId;
                        // console.log(rataWelfareId);                      

                        //加息券利率
                        incrMoney = rateList[i].incrMoney;

                        if ($(this).attr("checked") == "checked") {
                            $(".btm2 span").text(Number(qitouValue));
                            sessionStorage.setItem("rataWelfareId", rataWelfareId);
                            sessionStorage.removeItem("redwelfareId");
                        } else if ($(this).attr("checked") == undefined) {
                            $(".btm2 span").text(Number(qitouValue));
                            sessionStorage.removeItem("rataWelfareId");
                                                        
                        }

                    });
                    /*点击勾选加息券 */

                });
            }
            /*加息券列表 */

            $(".zheZhao").show();
            $("body").css("overflow", "hidden");
            $(".confirmationTouZi").show();
            
        }


    });
}
/*确认投资框 */
$(".TZmainBtn").click(function () {
    //订单余额（实付金额）
    var orderMoney = $(".btm1 span").text();
    //调取三方购买接口
    jsonAjax("/trade/buyProductByChinaPnr", {
        token: token,
        clientType: "PC",
        productId: productId,
        orderMoney: orderMoney, //订单金额
        payType: 1, //余额支付
        packetId: sessionStorage.getItem("redwelfareId"), //红包Id
        incrId: sessionStorage.getItem("rataWelfareId"), //加息劵Id
    }, ProductByChinaPnr);
    function ProductByChinaPnr(data) {
        // console.log(data);
        // console.log(typeof data.result);
        // console.log(data.resultMsg);

        if (data.result == 302) {
            $(".weiKaiHuTS").show();
            setTimeout(function () {
                $(".weiKaiHuTS").hide();
            }, 2000);
        } else if (data.result == 307) {
            $(".hbTishi").empty().append(data.resultMsg);
            $(".hbTishi").show();
            setTimeout(function () {
                $(".hbTishi").hide();
            }, 2000);
        } else if (data.result == 329) {
            $(".hbTishi").empty().append(data.resultMsg);
            $(".hbTishi").show();
            setTimeout(function () {
                $(".hbTishi").hide();
            }, 2000);
        } else if (data.result == 309) {
            $(".shouQing").empty().append("请按该产品的起投金额和递增金额进行购买");
            $(".shouQing").show();
            setTimeout(function () {
                $(".shouQing").hide();
            }, 2000)
        } else if (data.result == 311) {
            $(".shouQing").empty().append(data.resultMsg);
            $(".shouQing").show();
            setTimeout(function () {
                $(".shouQing").hide();
            }, 2000)
        } else if (data.result == 304) {
            $(".shouQing").empty().append(data.resultMsg);
            $(".shouQing").show();
            setTimeout(function () {
                $(".shouQing").hide();
            }, 2000)
        } else if (data.result == 317){
            $(".noMoney").show();
            setTimeout(function () {
                $(".noMoney").hide();
            }, 2000);
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
                if (data.buyInfo.result == 314 || data.buyInfo.result == 320) {
                    $(".hbTishi").empty().append(data.buyInfo.resultMsg);
                    $(".hbTishi").show();
                    setTimeout(function () {
                        $(".hbTishi").hide();
                    }, 1500);
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

    location.reload();
})

/*确认投资弹框*/

//调用项目图接口 
jsonAjax("/front/getAssetPicture", {
    token: token,
    productId: productId,
}, getAssetPicture);
function getAssetPicture(data) {
    // console.log(data);
    ImgList = data.Advertise[0];

    vehicleAppearanceBeforePic = ImgList.vehicleAppearanceBeforePic; //前照
    VehicleAppearanceAfterPic = ImgList.VehicleAppearanceAfterPic; //后照
    vehicleOdometerPic = ImgList.vehicleOdometerPic; //里程照

    if (data.result == 200) {
        $("#pic1").empty().append('<img src="' + vehicleAppearanceBeforePic + '"/>');
        $("#pic2").empty().append('<img src="' + VehicleAppearanceAfterPic + '"/>');
        $("#pic3").empty().append('<img src="' + vehicleOdometerPic + '"/>');
    }
    

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
//调用项目图接口



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

    // 安全保障的审核人
    name = user.name;
    // console.log(name);
    if (name == "undefined" || name == "" || name == undefined) {
        $(".shenheTitle1 li:eq(2)").empty().append("");
    } else {
        $(".shenheTitle1 li:eq(2)").empty().append(name);
    }

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


    //安全保障
    saftList = data.asset;
       
    
    //console.log(saftList);
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
        $("#vehicleDrivingLicencePic").empty().append("驾驶证");
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
    }

}

// 协议
$(".tishiyu").click(function () {
    $(".zheZhao").show();
    $(".xyContainer").show();
    $("body").css("overflow","hidden");
});
$(".xyBtn").click(function () {
    $(".zheZhao").hide();
    $(".xyContainer").hide();
    $("body").css("overflow", "visible");
});


/*交易记录---调接口*/
var transactionData;
var transactionMoban = document.getElementById("transactionMoban").innerHTML;

function tranList(index) {
    jsonAjax("/product/getProductBuyRecords", {
        productId: productId,
        curPage: index,
        pageSize:6
    }, getProductBuyRecords);

    function getProductBuyRecords(data) {
        peopleNum = data.totalCount;
        $(".jiaoyijilu span:eq(0) b").empty().append(peopleNum);

        sumAmount = parseInt(data.sumAmount);
        $(".jiaoyijilu span:eq(1) b").empty().append(sumAmount);
        
        if (data.Record.length == 0) {
            $(".touziTS").show();
        } else {
            $(".touziTS").hide();
            $(".touziData").empty();
            transactionData = data.Record;
            $.each(transactionData, function (i, item) {
                var str = transactionMoban.replace(/%(\w+)%/ig, function (word, $1) {
                    return item[$1];
                });
                $(str).appendTo(".touziData");
            });
        };
    }
}
//分页
var $pagination = $("#tranContainer .pagination");
var $touziData = $(".touziData");

jsonAjax("/product/getProductBuyRecords", {
    productId: productId,
    curPage: 1
}, getProductBuyRecords1);

function getProductBuyRecords1(data) {
    totalCount = data.totalCount;
    $pagination.eq(0).pagination({
        total: totalCount,
        row: 6,
        onJump: function (index) {
            $touziData.eq(0).html(tranList(index));
        }
    });
    $touziData.eq(0).html(tranList(1));
}

/*交易记录*/