var Info = (function() {
    var ApplyLisUrl;
    var applyList = $('#main-table');
    var taskList = $('#task-list');
    var inviteyList = $('#invite-list');

    return {
        init: function(initObj) {
            ApplyLisUrl = initObj.ApplyLisUrl;
            $(applyList).dataTable({
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
                ajax: ApplyLisUrl,
                columns: [
                    {data: "money", width: "15%"},
                    {data: "status", width: "15%"},
                    {data: "tid", width: "15%"},
                    {data: "account", width: "15%"},
                    {data: "time", width: "20%"},
                    {data: "rtime", width: "20%"},
                ],
                buttons: [],
                "aoColumns": [//服务器返回的数据处理 此时返回的是 {}
                    {"mData": "money"},
                    {"mData": function(obj) {
                            return obj.status ? 'y' : 'n';
                        }},
                    {"mData": function(obj) {
                            return obj.tid == 1 ? '启用' : '禁用';
                        }},
                    {"mData": "account"},
                    {"mData": "time"},
                    {"mData": "rtime"},
                ],
            });
        }
    };
})();

