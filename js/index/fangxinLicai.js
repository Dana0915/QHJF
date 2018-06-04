//产品tabs切换
$("#div1 input:first").addClass("active");
$(".div").eq(0).show(); //.slideDown()滑出的效果
$("#div1 input").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    var i = $("#div1 input").index(this);
    $(".div").eq(i).show().siblings(".div").hide();
});


//调用平台优选产品接口
var yxProductList;
var yxProductMoban = document.getElementById("yxProductMoban").innerHTML;
jsonAjax("/product/getPickProduct", {
    pageSize: 4
}, getPickProduct);
function getPickProduct(data) {
    // console.log(data);
    
    yxProductList = data.Product;

    $.each(yxProductList, function (i, item) {
        var str = yxProductMoban.replace(/%(\w+)%/ig, function (word, $1) {
            return item[$1];
        });
        $(str).appendTo("#yxProductTable");
        amountMin = parseInt(yxProductList[i].amountMin);
        // console.log(amountMin);
        $("#yxProductTable .money").eq(i).empty().append(amountMin);
       
        // isHot 是否热销
        isHot = yxProductList[i].isHot;
        // console.log(isHot);

        if (isHot == 0) {
            $(".isHot").eq(i).hide();
        } else {
            $(".isHot").eq(i).show();
        }


        $(".firstLi").eq(i).click(function () {
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

        productType = yxProductList[i].productType;
        baseAnnualYield = yxProductList[i].baseAnnualYield;
        actAnnualYield = yxProductList[i].actAnnualYield;
        if (actAnnualYield != 0) {
            if (productType == 19) {
                $(".sp01").eq(i).empty().append(baseAnnualYield);
                $(".sp02").eq(i).empty().append("~ " + actAnnualYield);
            } else {
                $(".sp02").eq(i).empty().append("+ " + actAnnualYield);
            }
        } else {
            $(".sp02").eq(i).empty();
        }

        
    });

}

//产品推荐
var tuijianProductList;
var allProductMoban = document.getElementById("allProductMoban").innerHTML;
var allPrdpageSize = 6;
function tuijianList(index) {
    jsonAjax("/product/getProductList", {
        productType: 14,
        productProperty: 1,
        clientType: "PC",
        token: sessionStorage.getItem("token"),
        pageSize: allPrdpageSize,
        curPage: index
    }, getTuijianProductList);
    function getTuijianProductList(data) {
        // console.log(data);

        tuijianProductList = data.Product;
        $("#allPingtaiProduct").empty(); //清理缓存

        $.each(tuijianProductList, function (i, item) {
            var str = allProductMoban.replace(/%(\w+)%/ig, function (word, $1) {
                return item[$1];
            })
            $(str).appendTo("#allPingtaiProduct");

            var status = tuijianProductList[i].status;
            if (status == 4) {
                $(".productUl  #manbiao").eq(i).show();
                $(".productUl  #buyBtn").eq(i).hide();
            }
            // 点击满标进入详情
            $(".productUl  #manbiao").eq(i).click(function () {
                productId = tuijianProductList[i].productId
                status = tuijianProductList[i].status;
                var token = sessionStorage.getItem("token");
                if (token != "" && token != null) {
                    window.location.href = "details/productDetails.html?" + productId + "?" + status;
                } else {
                    window.location.href = "login.html";
                }
            });

            // 点击立即购买进入详情
            $(".productUl  #buyBtn").eq(i).click(function () {
                productId = tuijianProductList[i].productId
                // alert(productId);
                var token = sessionStorage.getItem("token");
                if (token != "" && token != null) {
                    window.location.href = "details/productDetails.html?" + productId + "?" + status;
                } else {
                    window.location.href = "login.html";
                }
            });

            // 根据产品状态显示lilv
            productType = tuijianProductList[i].productType;
            baseAnnualYield = tuijianProductList[i].baseAnnualYield;
            $(".lilv_s1").eq(i).empty().append(baseAnnualYield);

            actAnnualYield = tuijianProductList[i].actAnnualYield;
            if (actAnnualYield != 0) {
                if (productType == 19) {
                    $(".lilv_s1").eq(i).empty().append(baseAnnualYield);
                    $(".lilv_s2").eq(i).empty().append("~ " + actAnnualYield + "%");
                }else {
                    $(".lilv_s2").eq(i).empty().append("+ " + actAnnualYield + "%");
                }
            }
            
            yieldDistribType = tuijianProductList[i].yieldDistribType;
            // console.log(yieldDistribType);
            if (yieldDistribType == 1) {
                $(".yieldDistribType").eq(i).empty().append("到期还本付息")
            }else if (yieldDistribType == 2) {
                $(".yieldDistribType").eq(i).empty().append("先息后本")
            }else if (yieldDistribType == 3) {
                $(".yieldDistribType").eq(i).empty().append("等额本息")
            }
   
        })
    }
}
//产品推荐分页
var $pagination = $("#tranContainer .pagination");
var $touziData = $(".touziData");
jsonAjax("/product/getProductList", {
    productType: 14,
    productProperty: 1,
    clientType: "PC",
    token: sessionStorage.getItem("token"),
    pageSize: allPrdpageSize,
    curPage: 1
}, getTuijianProductList1);
function getTuijianProductList1(data) {
    // console.log(data);
    totalCount = data.totalCount;
    $pagination.eq(0).pagination({
        total: totalCount,
        row: allPrdpageSize,
        onJump: function (index) {
            $touziData.eq(0).html(tuijianList(index));
        }
    });
    $touziData.eq(0).html(tuijianList(1));
}



//调用转让标的
var zhuanRangProductList;
var zhuangRangMoban = document.getElementById("zhuangRangMoban").innerHTML;
var zrPageSize = 6;
function zhuanRangList(index) {
    jsonAjax("/product/getProductList", {
        productType: 14,
        productSubType: 19,
        productProperty: 2,
        clientType: "PC",
        token: sessionStorage.getItem("token"),
        pageSize: zrPageSize,
        curPage: index
    }, getZhuanRangProductList);

    function getZhuanRangProductList(data) {
        // console.log(data);
        zhuanRangProductList = data.Product;
        $("#zhuanRangProduct").empty(); //清理缓存
        $.each(zhuanRangProductList, function (i, item) {

            var str = zhuangRangMoban.replace(/%(\w+)%/ig, function (word, $1) {
                return item[$1];
            })
            $(str).appendTo("#zhuanRangProduct");
            
            $(".productUl .zhuanRangBtn").eq(i).click(function () {
                productId = zhuanRangProductList[i].productId;
                status = tuijianProductList[i].status;
                // console.log(zrProductId);
                var token = sessionStorage.getItem("token");
                if (token != "" && token != null) {
                    window.location.href = "details/zhuanrangDetails.html?" + productId + "?" + status;
                } else {
                    window.location.href = "login.html";
                }
            });

            yieldDistribType = zhuanRangProductList[i].yieldDistribType;

            if (yieldDistribType == 1) {
                $(".zrYieldDistribType").eq(i).empty().append("到期还本付息")
            }else if (yieldDistribType == 2) {
                $(".zrYieldDistribType").eq(i).empty().append("先息后本")
            }else if (yieldDistribType == 3) {
                $(".zrYieldDistribType").eq(i).empty().append("等额本息")
            }
        })
    }
}
//转让标的分页
var $pagination1 = $("#tranContainer1 .pagination");
var $touziData1 = $(".touziData");
jsonAjax("/product/getProductList", {
    productType: 14,
    productSubType: 19,
    productProperty: 2,
    clientType: "PC",
    token: sessionStorage.getItem("token"),
    pageSize: zrPageSize,
    curPage: 1
}, getZhuanRangProductList1);
function getZhuanRangProductList1(data) {
    totalCount = data.totalCount;
    $pagination1.eq(0).pagination({
        total: totalCount,
        row: zrPageSize,
        onJump: function (index) {
            $touziData1.eq(0).html(zhuanRangList(index));
        }
    });
    $touziData1.eq(0).html(zhuanRangList(1));
};
