// 取模板
var infoListData;
var moban = document.getElementById("moban").innerHTML;
var pageSize = 4;//每页条数

function getList(index) {
    jsonAjax("/index/getInfoManageList", {
        imType: 1,//平台新闻
        pageSize: pageSize,//每页条数
        curPage: index,
    }, getInfoManageList);
    function getInfoManageList(data) {
        // console.log(data);	

        $(".list").empty();
        infoListData = data.InfoManage;
        console.log(infoListData);
        
        $.each(infoListData, function (i, item) {
            var str = moban.replace(/%(\w+)%/ig, function (word, $1) {
                return item[$1];
            });
            $(str).appendTo(".list");

            var imId = infoListData[i].imId;
            $(".listMainRight").eq(i).click(function () {
                $(".listMainRight a").attr("href", "details/newsDetail.html?newsList&" + imId);
            });

            // 生成序号
            var len = infoListData.length;
            for (var i = 0; i < len; i++) {
                var sq = len[i];
                $(".sequence:eq(" + i + ")").text((i + 1) + pageSize * (index - 1));
            }
        });
    }
}

// 分页
var $pagination = $('.pagination');
var $list = $('.list');
jsonAjax("/index/getInfoManageList", {
    imType: 1,//平台新闻
    pageSize: pageSize,//每页条数
    curPage: 1,
}, getInfoManageList2);
function getInfoManageList2(data) {
    totalCount = data.totalCount;
    //console.log(totalCount);//10
    $pagination.eq(0).pagination({
        total: totalCount,
        row: pageSize,
        onJump: function (index) {
            $list.eq(0).html(getList(index));
        }
    });
    $list.eq(0).html(getList(1));
}
