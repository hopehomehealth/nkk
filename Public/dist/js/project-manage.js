var ProjectManage = (function() {
    var saveUrl;
    var editUrl;
    var confUrl;
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
                url: editUrl,
                data: {appid: appid, type: 'show'},
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        $('#input-add-appid').val(appid);
                        $('#input-add-name').val(response.data.name);
                        $('#input-add-keywords').val(response.data.keywords);
                        $('#input-add-appstoreurl').val(response.data.appstoreurl);
                        $('#input-add-img').val(response.data.img);
                        $('#input-add-location').val(response.data.location);
                        $('#input-add-reward').val(response.data.reward);
                        $('#input-add-amount').val(response.data.amount);
                        $('#input-add-guide').val(response.data.guide);
                        $('#input-add-actiontime').val(response.data.actiontime);
                        $('input[name=pro]').val(response.data.pro);
                        $('#select-add-status').val(response.data.status);
                        validationChange(response.data.validation);
                        $('#select-add-status').selectpicker('refresh');
                        $('#select-validation').selectpicker('refresh');
                    }
                }
            });
        } else {
            $(formAdd)[0].reset();
        }
        $(formAdd).find('.form-group .form-tip').hide();
    }

    var resetConfForm = function(appid) {

        $.ajax({
            type: "POST",
            cache: false,
            url: confUrl,
            data: {appid: appid, type: 'show'},
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#confappid').val(appid);
                    $('#confappidhidden').val(appid);
                    $('#select-validation').val(response.data.validation);
                    $('#validUrl').val(response.data.validurl);
                    $('#select-validType').val(response.data.validtype);
                    $('#validReturn').val(response.data.validreturn);
                    $('#remark').val(response.data.remark);
                    $('#clickUrl').val(response.data.clickurl);
                    $('#callbackUrl').val(response.data.callbackurl);
                    validationChange(response.data.validation);
                    $('#select-validType').selectpicker('refresh');
                    $('#select-validation').selectpicker('refresh');
                }
            }
        });


    }





    var formatRowData = function(data) {
        data.actionHtml = '<a class="link-edit-ad" ad-id="' + data.appid + '"><i class="fa fa-pencil-square-o"></i>&nbsp;修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                + '<a class="link-conf-ad" ad-id="' + data.appid + '"><i class="fa fa-trash-o"></i>&nbsp;配置接口</a>';
        data.DT_RowId = 'ad-' + data.id;
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

    var showEdit = function(appid) {
        if (appid) {
            $(modalAddTitle).html('修改广告');
            resetForm(appid);
        } else {
            $(modalAddTitle).html('添加广告');
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
        var ation = $(modalAddTitle).html() == '修改广告' ? editUrl : saveUrl;

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

    var showConf = function(appid) {
        resetConfForm(appid);
        $(modalConf).modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    var saveConf = function() {
        var cData = $(confForm).serialize();
        $.ajax({
            type: "POST",
            cache: false,
            url: confUrl,
            data: cData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $(modalConf).modal('hide');
                    toastr.success('配置成功');
                } else {
                    toastr.error('配置失败。' + response.data);
                }
            },
            error: function(xhr, status, error) {
                toastr.error('配置失败。' + error);
            }
        });

    }

    var removeProject = function(projectId) {
        if (!projectId)
            return;
        bootbox.confirm("依赖于此广告的版本、日志等将一并删除，确认删除？", function(result) {
            if (result) {
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: removeUrl,
                    data: {'id': projectId},
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            delRow(projectId);
                            toastr.success('删除成功');
                        } else {
                            toastr.error('删除失败。' + response.data);
                        }
                    },
                    error: function(xhr, status, error) {
                        toastr.error('删除失败。' + error);
                    }
                });
            }
        });
    }

    return {
        init: function(initObj) {
            saveUrl = initObj.saveUrl;
            editUrl = initObj.editUrl;
            confUrl = initObj.confUrl;
            $(mainTable).DataTable({
                columns: [
                    {data: "name", width: "10%"},
                    {data: "keywords", width: "10%"},
                    {data: "amount", width: "10%"},
                    {data: "amountA", width: "10%"},
                    {data: "click", width: "20%"},
                    {data: "status", width: "15%"},
                    {data: "isshow", width: "10%"},
                    {data: "actionHtml", width: "15%", orderable: false}
                ],
                buttons: [
                    {
                        text: "添加广告",
                        className: "btn btn-primary",
                        action: function(e, dt, node, config) {
                            showEdit(null);
                        }
                    }
                ]
            });
            $('#input-add-endTime').datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm-dd hh:ii:ss',
            pickerPosition: "bottom-left",
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1



            });
            $(btnSubmit).on('click', function(e) {
                saveProject();
            });
            $(btnReset).on('click', function(e) {
                resetForm();
            });
            $(mainTable).on('click', '.link-edit-ad', function(e) {
                showEdit($(this).attr('ad-id'));
            });
            $(mainTable).on('click', '.link-conf-ad', function(e) {
                showConf($(this).attr('ad-id'));
            });
            $(validation).on('change', function() {
                validationChange($(this).val());
            });
            $(btnConfSubmit).on('click', function() {
                saveConf($(this).val());
            });

        }
    };
})();
