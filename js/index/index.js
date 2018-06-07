//默认首页导航的状态	
$(".indexImg1").show();
$(".indexImg").hide();

$(".indexImg1").css("display", "inline-block");
$(".index_txt").css("color", "#fff");

$(".licai_img").css("display", "none");
$(".licai_txt").css("color", "#fff");

$(".zhanghu_img").css("display", "none");
$(".zhanghu_txt").css("color", "#fff");

$(".xinxi_img").css("display", "none");
$(".xinxi_txt").css("color", "#fff");

//首页导航鼠标悬停状态
$(".navBox").mouseover(function () {

    $(".indexImg1").hide();
    $(".indexImg").show();
    $(".indexImg").css("display", "inline-block");

    $(".phone_left").css("color", "#333"); //热线
    $(".login_right").css("color", "#666"); //请登陆
    $(".xinxi_txt").css("color", "#666"); //信息
    $(".zhanghu_txt").css("color", "#666"); //账户
    $(".licai_txt").css("color", "#666"); //理财
    $(".index_txt").css("color", "#2395FF"); //首页
    /*logo切换*/
    $("#logo").css("display", "block");
    $("#logoWhite").css("display", "none");   
    $(".phone_left span").css("color", "#999");

    $(".default").show();
    $(".bai").hide();    

}).mouseout(function () {
    $(".indexImg1").show();
    $(".indexImg").hide();
    $(".indexImg1").css("display", "inline-block");

    $(".phone_left").css("color", "#fff");
    $(".login_right").css("color", "#fff");
    $(".xinxi_txt").css("color", "#fff");
    $(".zhanghu_txt").css("color", "#fff");
    $(".licai_txt").css("color", "#fff");
    $(".index_txt").css("color", "#fff");
    /*logo切换*/
    $("#logo").css("display", "none");
    $("#logoWhite").css("display", "block");
    $(".phone_left span").css("color", "#fff");

    $(".default").hide();
    $(".bai").show();
    
})
//登录点击事件
$(".login").click(function () {
    //				console.log(111);
});

// 返回头部按钮
$("#goTop").hover(function () {
    $(".goTopImg1").hide();
    $(".goTopImg2").show();
}, function () {
    $(".goTopImg1").show();
    $(".goTopImg2").hide();
})

$("#goTop").click(function () {
    $('html , body').animate({
        scrollTop: 0
    }, 'slow');
});
// 返回头部按钮


var token = sessionStorage.getItem("token");

//调用轮播图接口 
var bannerImgList;
var bannerMoban = document.getElementById("bannerMoban").innerHTML;
jsonAjax("/front/getAdvList", {
    adType: 1,
    adPosition: 1,
    adPort: "PC",
    adCanal: 0
}, getBannerImg);

function getBannerImg(data) {
    // console.log(data);
    bannerImgList = data.Advertise;
    $.each(bannerImgList, function (i, item) {
        var str = bannerMoban.replace(/%(\w+)%/ig, function (word, $1) {
            return item[$1];
        });
        $(str).appendTo(".swiper-wrapper");

        adImg = bannerImgList[i].adImg;
        $(".swiper-slide a").eq(i).css("backgroundImage", "url(" + adImg +")");



        adLink = bannerImgList[i].adLink;
        // console.log(adLink);
        if (adLink == "") {
             $(".swiper-slide a").eq(i).removeAttr("target");
             $(".swiper-slide a").eq(i).attr("href", "javascript:;");
        }else{
            $(".swiper-slide a").eq(i).attr("href", adLink + "?token=" + token);
        };

        
    });
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        autoplayDisableOnInteraction: false //自动播放
    });
    $('.swiper-button-prev').click(function () {
        mySwiper.swipePrev();
    });
    $('.swiper-button-next').click(function () {
        mySwiper.swipeNext();
    });
}
//调用轮播图接口



//调用运营报告的接口
jsonAjax("/index/getOperationReport", {}, getOperationReport);
function getOperationReport(data) {
    // console.log(data);
    
    runList = data.ReportInfo;
    //console.log(runList);

    regTotal = runList.regTotal; //注册人数
    $(".runTable li:eq(0) span").empty().append(regTotal);

    buyCount = runList.buyCount; //成交笔数
    $(".runTable li:eq(1) span").empty().append(buyCount);

    totalMoney = runList.totalMoney; //累计金额
    $(".runTable li:eq(2) span").empty().append(totalMoney);

    totalProfit = runList.totalProfit; //累计收益
    $(".runTable li:eq(3) span").empty().append(totalProfit);


    //      })
}

//调用公告的接口
sessionStorage.removeItem("dataTitle");
sessionStorage.removeItem("dataContent");
sessionStorage.removeItem("dataDate");

var announceList;
var announceMoban = document.getElementById("announceMoban").innerHTML;
jsonAjax("/index/getInfoManageList", {
    imType: 2
}, getInfoManageList);
function getInfoManageList(data) {
    // console.log(data);

    announceList = data.InfoManage;
    // console.log(announceList);
    $.each(announceList, function (i, item) {
        var str = announceMoban.replace(/%(\w+)%/ig, function (word, $1) {
            //console.log(item[$1]);
            return item[$1];
        })
        $(str).appendTo(".announce_box");

        $(".notice_active_ch .see").eq(i).click(function () {
            $(this).attr("href", "details/newsDetail.html?announce&" + announceList[i].id);
            dataTitle = announceList[i].title;
            dataContent = announceList[i].content;
            dataDate = announceList[i].date;
            
            // console.log(data);
            sessionStorage.setItem("dataTitle", dataTitle);
            sessionStorage.setItem("dataContent", dataContent);
            sessionStorage.setItem("dataDate", dataDate);
            
        });
        
    });

    //	 通告的逻辑代码
    $(function () {
        var $this = $("#announceMubanBox");
        var scrollTimer;
        $this.hover(function () {
            clearInterval(scrollTimer);
        }, function () {
            scrollTimer = setInterval(function () {
                scrollNews($this);
            }, 2500);
        }).trigger("mouseleave");

        function scrollNews(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -lineHeight + "px"
            }, 800, function () {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    })
}


//调用首页产品推荐接口
var productId;
sessionStorage.getItem("indexNewerProductId");
jsonAjax("/index/getIndexPickProduct", {
    clientType: "PC",
    token: token
}, getNewrProject);

function getNewrProject(data) {
    // console.log(data);
    // console.log(data.isUseOjgNum);//0
     //登陆超时的提示 
     if (data.result == 400) {
         $(".zheZhao").show();         
         $("#chaoshiTS").show();
         $("body").css("overflow","hidden");
         $("#chaoshiTS").click(function () {
             $("#chaoshiTS").hide();
             window.location.href = "login.html"
         });
     } else {
         $("#chaoshiTS").hide();
         $(".zheZhao").hide();     
         $("body").css("overflow", "visible");             
     }
    
    //非新手
    if (data.isUseOjgNum != 0) {
        //显示火爆产品
        if (data.HotInfo != "") {
            var hotProductName = data.HotInfo[0].productName;
            $("#newerProductName").empty().append("- " + hotProductName);
            $(".newerProjectName .s1").empty().append("火爆产品");

            var hotBaseAnnualYield = data.HotInfo[0].baseAnnualYield;
            $("#newerBaseProfied").empty().append(hotBaseAnnualYield);

            var hotActAnnualYield = data.HotInfo[0].actAnnualYield;
            if (hotActAnnualYield == 0) {
                $("#newerActProfied").empty();
            } else {
                $("#newerActProfied").empty().append("+ " + hotActAnnualYield);
            }

            var hotActPeriod = data.HotInfo[0].period;
            $("#hotActPeriod").empty().append(hotActPeriod);

            //保存产品的id
            productId = data.HotInfo[0].productId;
        } else {
            //显示固收产品
            var gushouProductName = data.GsInfo[0].productName;
            $("#newerProductName").empty().append("- " + gushouProductName);
            $(".newerProjectName .s1").empty().append("火爆产品");

            var gushouBaseAnnualYield = data.GsInfo[0].baseAnnualYield;
            $("#newerBaseProfied").empty().append(gushouBaseAnnualYield);

            var gushouActAnnualYield = data.GsInfo[0].actAnnualYield;
            if (gushouActAnnualYield == 0) {
                $("#newerActProfied").empty();
            } else {
                $("#newerActProfied").empty().append("+ " + gushouActAnnualYield);
            }

            var gushouActPeriod = data.GsInfo[0].period;
            $("#hotActPeriod").empty().append(gushouActPeriod);

            productId = data.GsInfo[0].productId;
        }
    } else {
        //显示新手产品
        var newerProductName = data.XsInfo[0].productName;
        $("#newerProductName").empty().append("- " + newerProductName);

        var newerBaseAnnualYield = data.XsInfo[0].baseAnnualYield;
        $("#newerBaseProfied").empty().append(newerBaseAnnualYield);

        var newerActAnnualYield = data.XsInfo[0].actAnnualYield;
        if (newerActAnnualYield == 0) {
            $("#newerActProfied").empty();
        } else {
            $("#newerActProfied").empty().append("+ " + newerActAnnualYield);
        }

        var newerActPeriod = data.XsInfo[0].period;
        $("#hotActPeriod").empty().append(newerActPeriod);

        productId = data.XsInfo[0].productId;

    }

}
// 点击注册送好礼
$(".lingqu").click(function () {
    window.location.href = "register.html";
})

//点击立即加入跳转到产品详情页面
$(".nowJoin").click(function () {
    var token = sessionStorage.getItem("token");
    if (token != "" && token != null) {
        window.location.href = "details/productDetails.html?" + productId;
    } else {
        window.location.href = "login.html";
    }

});

//点击新手指南
$(".sharebox3").click(function () {
    window.location.href = "footDetail/newbie.html";
})



//调用平台优选产品接口
var yxProductList;
var yxProductMoban = document.getElementById("yxProductMoban").innerHTML;
jsonAjax("/product/getPickProduct", {
    pageSize: 4
}, getPickProduct);

function getPickProduct(data) {
    // console.log(data);
    yxProductList = data.Product;
    // console.log(yxProductList);

    $.each(yxProductList, function (i, item) {
        var str = yxProductMoban.replace(/%(\w+)%/ig, function (word, $1) {
            return item[$1];
        })
        $(str).appendTo("#yxProductTable");

        productType = yxProductList[i].productType;
        
        
        baseAnnualYield = yxProductList[i].baseAnnualYield;
        actAnnualYield = yxProductList[i].actAnnualYield;

        // console.log(actAnnualYield);
        if (actAnnualYield != 0) {
            if (productType == "19" || productType == 19) {
                $(".sp01").eq(i).empty().append(baseAnnualYield);
                $(".sp02").eq(i).empty().append("~ " + actAnnualYield);
            } else {
                    $(".sp02").eq(i).empty().append("+ " + actAnnualYield);
            }
        } else {
            $(".sp02").eq(i).empty();
        }
            // 点击事件
        $(".btn").eq(i).click(function () {
            var id = yxProductList[i].productId;
            productType = yxProductList[i].productType;
            // console.log(id);
            var token = sessionStorage.getItem("token");
            if (token != "" && token != null) {
                window.location.href = "details/productDetails.html?" + id;
            } else {
                window.location.href = "login.html";
            }
        });

        // isHot 是否热销
        isHot = yxProductList[i].isHot;
        if (isHot == 0) {
            $(".isHot").eq(i).hide();
        } else {
            $(".isHot").eq(i).show();
        }

        

    });

}



//调用新闻列表接口
var newsList;
var newsDetailMoban = document.getElementById("newsDetailMoban").innerHTML;
jsonAjax("/index/getInfoManageList", {
    imType: 1,
    pageSize: 5
}, getPickProductNews);

function getPickProductNews(data) {
    // console.log(data);
    
    newsList = data.InfoManage;
    // console.log(newsList);
    

    $.each(newsList, function (i, item) {
        var str = newsDetailMoban.replace(/%(\w+)%/ig, function (word, $1) {
            return item[$1];
        })
        $(str).appendTo(".newsdetaiBox");
       
        // console.log(newsId);
        $(".newstext_title a").eq(i).click(function () {
            $(".newstext_title a").eq(i).attr("href", "details/newsDetail.html?newsList&" + newsList[i].imId);
        });
    })
}

//调用行业热点列表接口
var hotList;
var hotDetailMoban = document.getElementById("hotDetailMoban").innerHTML;
jsonAjax("/index/getInfoManageList", {
    imType: 4,
    pageSize: 5
}, getPickProductHot);

function getPickProductHot(data) {

    hotList = data.InfoManage;
    // console.log(hotList);
    $.each(hotList, function (i, item) {
        var str = hotDetailMoban.replace(/%(\w+)%/ig, function (word, $1) {
            return item[$1];
        })
        $(str).appendTo("#hotContentBox1");


        $(".hottxt").eq(i).click(function () {
            window.location.href = "details/newsDetail.html?industryList&" + hotList[i].imId;
        });
    });
}
