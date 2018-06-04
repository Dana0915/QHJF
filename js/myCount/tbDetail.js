/*持有中详情 */
var url = location.href;
var id = url.split("?");
var id = id[1];


jsonAjax("/user/getUserAssetsInfo", {
    orderId: id,
    token: sessionStorage.getItem("token")
}, getUserAssetsInfo);

function getUserAssetsInfo(data) {
    console.log(data);
    pro = data.Product;
    // console.log(pro);
    productType = pro.productType;
    if (productType == 19) {
        console.log("转让");

    } else if (productType == 18) {
        console.log("固收");
        //平均历史年化收益率(若是固收产品显示固定的利率+加息利率，即xx%+xx%；若是可转化产品显示产品利率区间即xx%-xx%；)



    } else if (productType == 3) {
        console.log("新手");
    } else {
        console.log("火爆");
    }

    //产品名称
    productName = pro.productName;
    $(".myProDetailTitle").empty().append(productName);

    //投资金额
    investMoney = pro.investMoney;
    $(".investMoney").empty().append(investMoney + "元");

    //红包抵扣
    rpMoney = pro.rpMoney;
    $(".rpMoney").empty().append(rpMoney + "元");

    //实付金额
    relMoney = investMoney - rpMoney;
    $(".relMoney").empty().append(relMoney + "元");

    //产品期限
    productPeriod = pro.productPeriod;
    $(".productPeriod").empty().append(productPeriod + "天");

    //加息券加息利率
    increaseRate = pro.increaseRate
    if (increaseRate == "") {
        $(".increaseRate").empty().append("0.00%");
    } else {
        $(".increaseRate").empty().append(increaseRate + "%");
    }

    //到期日
    dueDate = pro.dueDate;
    $(".dueDate").empty().append(dueDate);

    //投资日
    buyTime = pro.buyTime;
    $(".buyTime").empty().append(buyTime);

    //加息起始日
    interestDate = pro.interestDate;
    $(".interestDate").empty().append(interestDate);

    //收益方式
    yieldDistribType = pro.yieldDistribType;
    // console.log(yieldDistribType);
    if (yieldDistribType == 1) {
        $(".yieldDistribType").empty().append("到期还本付息")
    } else if (yieldDistribType == 2) {
        $(".yieldDistribType").empty().append("先息后本")
    } else if (yieldDistribType == 2) {
        $(".yieldDistribType").empty().append("等额本息")
    }

    //预计到期收益= 本金*利率（利率=平均历史年化收益率+加息券加息利率）*理财天数/365（暂无）
    exceptedYield = Math.floor((pro.exceptedYield) * 100) / 100;
    $(".exceptedYield").empty().append(exceptedYield + "元");

    //投资状态
    status = pro.status;
    console.log(status);
    if (status == 7) {
        $(".span2").show();
        $(".span1").hide();
    } else if (status == 6) {
        $(".span1").show();
    }

    // 平均年化利率
    baseAnnual = pro.baseAnnual;
    backAnnual = pro.backAnnual;
    productType = pro.productType;
    $(".baseAnnual").empty().append(baseAnnual);
    if (backAnnual != "0.00") {
        // console.log(backAnnual);
        if (productType == 19) {
            $(".backAnnual").empty().append(" ~ " + backAnnual + "%");
        } else {
            $(".backAnnual").empty().append(" + " + backAnnual + "%");
        }
    }
    


}
