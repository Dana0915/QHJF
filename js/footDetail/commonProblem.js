var moban = $("#moBan").html();
var pageSize = 6;
function question(index) {
    jsonAjax("/question/getQuestionList", {
        pageSize: pageSize,
        curPage: index
    }, getQuestionList);

    function getQuestionList(data) {
        // console.log(data);

        $(".li1Main").children().not("#moban").empty();
        $.each(data.DisQuestion, function (i, item) {
            var str = moban.replace(/%(\w+)%/ig, function (word, $1) {
                var str1 = item[$1];
                str1 = str1.replace(/</g, "&lt;"); //替换里面所有的转义
                str1 = str1.replace(/>/g, "&gt;");
                return str1;
            });
            $(str).appendTo(".li1Main");

        });
    };
}

var $pagination = $(".pagination");
var $li1Main = $(".li1Main");
jsonAjax("/question/getQuestionList", {
    pageSize: pageSize,
    curPage: 1
}, getQuestionList1);
function getQuestionList1(data) {
    totalCount = data.totalCount;
    $pagination.eq(0).pagination({
        total: totalCount,
        row: pageSize,
        onJump:function (index) {
            $li1Main.eq(0).html(question(index));
        }
    });
    $li1Main.eq(0).html(question(1));

};





