(function() {
    var mainTable = $('#main-table');
    $(mainTable).DataTable({
        columns: [
            {data: "uid", width: "10%"},
            {data: "appid", width: "10%"},
            {data: "name", width: "10%"},
            {data: "type", width: "10%"},
            {data: "timec", width: "20%"},
            {data: "ipc", width: "15%"},
            {data: "status", width: "10%"}
        ],
        buttons: []
    });
})();
