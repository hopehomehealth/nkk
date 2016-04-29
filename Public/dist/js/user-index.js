(function() {
    var mainTable = $('#main-table');
    $(document).ready(function() {
        $(mainTable).dataTable({
            processing: true,
            serverSide: true,
            bAutoWidth: true,//自动宽度
            ordering: false, //排序操作在服务端进行，所以可以关了。
            paginationType: "full_numbers",
            ajax: "/App/User/ajaxUserList",
            columns: [
                {data: "id", width: "10%"},
                {data: "money", width: "10%"},
                {data: "idfa", width: "10%"},
                {data: "address", width: "20%"},
                {data: "nickname", width: "15%"},
                {data: "ip", width: "10%"},
                {data: "iswx", width: "10%"},
                {data: "status", width: "10%"},
                {data: "reg_time", width: "10%"}
            ],
            "aoColumns": [//服务器返回的数据处理 此时返回的是 {}
                {"mData": "id"},
                {"mData": "money"},
                {"mData": "idfa"},
                {"mData": "address"},
                {"mData": "nickname"},
                {"mData": "ip"},
                {"mData": function(obj) {
                        return obj.openid ? 'y' : 'n';
                    }},
                {"mData": function(obj) {
                        return obj.status == 1 ? '启用' : '禁用';
                    }},
                {"mData": "reg_time"}
            ],
            buttons: []
        });
    });


})();
