
var Apply = (function() {
    var inviteUrl;
    var taskUrl;
    var infoUrl;
    var auditUrl;
    var accomplishListUrl;
    var mainTable = $('#main-table');
    var audit = $('#link-audit');
    var tconf = new Array();
    
    var audit_action = function(applyid, sid) {
        ;
        bootbox.confirm('确认撤销？', function(result) {
            if (result) {
                $.post(auditUrl, {id: applyid, status: sid}, function(data) {
                    if (!data.success) {
                        toastr.warning('操作失败，原因：' + data.info);
                        return false;
                    }
                    var dataTable = $(mainTable).DataTable();
                    dataTable.row($('#apply-' + applyid)).remove().draw();
                    toastr.success('操作成功');
                }, 'json');
            }

        });
    }
    var showInfo = function(uid, name) {
        var url = infoUrl + '/uid/' + uid;
        name = name + ' - 提现信息';
        window.top.art.dialog({id: 'info'}).close();
        window.top.art.dialog({yesText: 'OK', title: name, id: 'info', iframe: url, width: '750', height: '500'});
    }

    var showTask = function(uid, name) {
        var url = taskUrl + '/uid/' + uid;
        name = name + ' - 任务信息';
        window.top.art.dialog({id: 'task'}).close();
        window.top.art.dialog({yesText: 'OK', title: name, id: 'task', iframe: url, width: '750', height: '500'});
    }
    var showInvite = function(uid, name) {
        var url = inviteUrl + '/uid/' + uid;
        name = name + ' - 收徒信息';
        window.top.art.dialog({id: 'invite'}).close();
        window.top.art.dialog({yesText: 'OK', title: name, id: 'invite', iframe: url, width: '750', height: '500'});
    }
    return {
        init: function(initObj) {
            taskUrl = initObj.taskUrl;
            inviteUrl = initObj.inviteUrl;
            infoUrl = initObj.infoUrl;
            auditUrl = initObj.auditUrl;
            tconf[1] = '支付宝';
            tconf[2] = '微信';
            accomplishListUrl = initObj.accomplishListUrl;
            $(mainTable).DataTable({
                  "bFilter": false, //过滤功能
                bPaginage: true,
                processing: true,
                bAutoWidth: true, //自动宽度
                serverSide: true,
                ordering: false, //排序操作在服务端进行，所以可以关了。
                paginationType: "full_numbers",
                searching: false,
                columns: [
                    {data: "name", width: "10%"},
                    {data: "tid", width: "10%"},
                    {data: "account", width: "10%"},
                    {data: "money", width: "10%"},
                    {data: "time", width: "20%"},
                    {data: "rtime", width: "20%"},
                    {data: "actionHtml", width: "15%", orderable: false}
                ],
                searching: false,
                ajax: accomplishListUrl,
                "aoColumns": [//服务器返回的数据处理 此时返回的是 {}
                    {"mData": "name"},
                    {"mData": function(obj) {
                            return tconf[obj.tid];
                        }},
                    {"mData": "account"},
                    {"mData": "money"},
                    {"mData": "time"},
                    {"mData": "rtime"},
                    {"mData": function(obj) {
                            return '<a class="link-info" uid="' + obj.uid + '" apply="' + obj.id + '"><i class="fa fa-pencil-square-o"></i>历史提现&nbsp;&nbsp;&nbsp;&nbsp;</a><a class="link-task" uid="' + obj.uid + '" apply="' + obj.id + '"><i class="fa fa-pencil-square-o"></i>任务信息&nbsp;&nbsp;&nbsp;&nbsp;</a><a class="link-invite" uid="' + obj.uid + '" apply="' + obj.id + '"><i class="fa fa-pencil-square-o"></i>收徒信息&nbsp;&nbsp;&nbsp;&nbsp;</a>';

                        }},
                ],
                buttons: []
            });
            $(mainTable).on('click', '.link-revocation', function(e) {
                audit_action($(this).attr('apply'), 0);
            });
            $(mainTable).on('click', '.link-info', function(e) {
                showInfo($(this).attr('uid'), $(this).parent().parent().find('td').eq(0).text());
            });
            $(mainTable).on('click', '.link-task', function(e) {
                showTask($(this).attr('uid'), $(this).parent().parent().find('td').eq(0).text());
            });
            $(mainTable).on('click', '.link-invite', function(e) {
                showInvite($(this).attr('uid'), $(this).parent().parent().find('td').eq(0).text());
            });
        }
    };
})();
