var api = (function() {
    var saveUrl;
    var editValid;
    var mainTable = $('#main-table');
    var modalAdd = $('#modal-add-proj');
    var modalConf = $('#modal-conf');
    var modalAddTitle = $('#title-add-proj');
    var formAdd = $('#form-add-proj');
    var confForm = $('#form-conf');

    var inputProjectId = $('#input-project-id');
    var inputCompany = $('#input-add-proj-company');
    var inputModel = $('#input-add-proj-model');
    var inputProject = $('#input-add-proj-project');
    var inputProduct = $('#input-add-proj-product');
    var inputOem = $('#input-add-proj-oem');
    var selectLanguage = $('#select-add-proj-language');
    var selectOperator = $('#select-add-proj-operator');
    var btnReset = $('#btn-add-proj-reset');
    var btnSubmit = $('#btn-add-proj-submit');
    var validation = $('#select-validation');
    var validationList = $('.validation');
    var confad = $('.link-conf-ad');
    var btnConfSubmit = $('#conf-submit');
    var resetForm = function(appid) {

        if (appid) {
            $.ajax({
                type: "POST",
                cache: false,
                url: editValid,
                data: {appid: appid},
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        $('#input-add-appid').val(appid);
                        $('#input-add-name').val(response.data.appname);
                        $('#select-add-type').val(response.data.type);
                        $('#input-add-params').val(response.data.params);
                        $('#input-add-result').val(response.data.result);
                        $('#input-add-url').val(response.data.url);
                        $('#input-add-status').val(response.data.status);
                        $('#select-add-status').selectpicker('refresh');
                        $('#select-add-type').selectpicker('refresh');
                        $('#input-add-appid').attr('readonly',"readonly");
                    }
                }
            });
        } else {
            $(formAdd)[0].reset();
            $('#input-add-appid').removeAttr('readonly');
        }
        $(formAdd).find('.form-group .form-tip').hide();
    }
    var formatRowData = function(data) {
        data.actionHtml = '<a class="link-edit-ad" valid="' + data.appid + '"><i class="fa fa-pencil-square-o"></i>&nbsp;修改</a>';
        data.DT_RowId = 'valid-' + data.appid;
        data.status = data.status == 1 ? '启用' : '禁用';
        return data;
    };

    var editRow = function(id, data) {
        var dataTable = $(mainTable).DataTable();
        data = formatRowData(data);
        if (id) {
            dataTable.row($('#' + data.DT_RowId)).data(data).draw();
        } else {
            dataTable.row.add(data).draw();
        }
    };

    var delRow = function(id) {
        var dataTable = $(mainTable).DataTable();
        dataTable.row($('#project-' + id)).remove().draw();
    };

    var showEdit = function(valid) {
        if (valid) {
            $(modalAddTitle).html('修改接口');
            resetForm(valid);
        } else {
            $(modalAddTitle).html('添加接口');
            resetForm();
        }
        $(modalAdd).modal({
            backdrop: 'static',
            keyboard: false
        });
    };

    var validationChange = function(status) {
        if (status == 1) {
            validationList.show();
        } else {
            validationList.hide();
        }
    }

    var saveProject = function() {
        
        var error = false;
        $(formAdd).find('.form-group').each(function() {
            var input = $(this).find('.form-control')[0];
            var tip = $(this).find('.form-tip')[0];
            if ($(input).val()) {
                $(tip).hide();
            } else {
                $(tip).show();
                error = true;
            }
        });
        if (error)
            return;
        var ation = $(modalAddTitle).html() == '修改接口' ? editValid : saveUrl;
       
        var actionName = '操作';
        var pData = $(formAdd).serialize();
        //console.log('post data: ' + pData);
        $.ajax({
            type: "POST",
            cache: false,
            url: ation,
            data: pData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    editRow(response.data.id, response.data);
                    $(modalAdd).modal('hide');
                    toastr.success(actionName + '成功');
                } else {
                    toastr.error(actionName + '失败。' + response.data);
                }
            },
            error: function(xhr, status, error) {
                toastr.error(actionName + '失败。' + error);
            }
        });
    };
    return {
        init: function(initObj) {
            saveUrl = initObj.saveUrl;
            editValid = initObj.editValid;
            $(mainTable).DataTable({
                columns: [
                    {data: "appid", width: "10%"},
                    {data: "appname", width: "10%"},
                    {data: "url", width: "10%"},
                    {data: "type", width: "10%"},
                    {data: "params", width: "20%"},
                    {data: "result", width: "15%"},
                    {data: "status", width: "15%"},
                    {data: "actionHtml", width: "15%", orderable: false}
                ],
                buttons: [
                    {
                        text: "添加接口",
                        className: "btn btn-primary",
                        action: function(e, dt, node, config) {
                            showEdit(null);
                        }
                    }
                ]
            });
            $(btnSubmit).on('click', function(e) {
                saveProject();
            });
            $(btnReset).on('click', function(e) {
                resetForm();
            });
            $(mainTable).on('click', '.link-edit-ad', function(e) {
                showEdit($(this).attr('valid'));
            });

        }
    };
})();
