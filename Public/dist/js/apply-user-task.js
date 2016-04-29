var UserTask = (function() {
    var TaskLisUrl;
    var mainTable = $('#main-table');

    return {
        init: function(initObj) {
            TaskLisUrl = initObj.infoUrl;
            $(mainTable).dataTable({
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
                ajax: TaskLisUrl,
                columns: [
                    {data: "money", width: "15%"},
                    {data: "typeid", width: "15%"},
                    {data: "info", width: "15%"},
                    {data: "timec", width: "15%"},
                    {data: "timea", width: "20%"},
                    {data: "ipc", width: "20%"},
                    {data: "ipa", width: "20%"},
                ],
                buttons: [],
            });
        }
    };
})();

