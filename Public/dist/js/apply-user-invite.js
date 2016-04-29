var UserInvite = (function() {
    var infoUrl;
    var inviteyList = $('#main-table');

    return {
        init: function(initObj) {
            infoUrl = initObj.infoUrl;
            $(inviteyList).dataTable({
                "bFilter": false, //过滤功能
                bPaginage: true,
                processing: true,
                bAutoWidth: true, //自动宽度
                serverSide: true,
                ordering: false, //排序操作在服务端进行，所以可以关了。
                paginationType: "full_numbers",
//                "sScrollY": "100%",
//                "sScrollX": "100%",
                searching: false,
                ajax: infoUrl,
                columns: [
                    {data: "id", width: "50%"},
                    {data: "time", width: "50%"},
                ],
                buttons: []
            });
        }
    };
})();

