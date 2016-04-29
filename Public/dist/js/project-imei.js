var TestIMEI = (function() {
  var saveAddUrl;
  var saveEditUrl;
  var removeUrl;
  var uploadUrl;
  
  var mainTable = $('#main-table');
  var modalAdd = $('#modal-add-imei');
  var modalAddTitle = $('#title-add-proj');
  var formAddImei = $('#form-add-imei');
  var selectCompany = $('#select-add-imei-company');
  var textImei = $('#textareaadd-imei--imei');
  var inputUpload = $('#input-add-imei-upload');
  var btnUpload = $('#btn-add-imei-upload');
  var btnResetAdd = $('#btn-add-imei-reset');
  var btnSubmitAdd = $('#btn-add-imei-submit');
  
  var showAdd = function() {
    if ($('#select-add-imei-company').find('option:not([role="holder"])').length > 0) {
      resetAdd();
      $(modalAdd).modal({
        backdrop: 'static',
        keyboard: false
      });
    } else {
      toastr.warning('无项目。请先建立项目');
    }
  };
    
  var formatRowData = function(data) {
    data.actionHtml = '<!--a class="link-edit-imei" data-imei-id="' + data.id + '"><i class="fa fa-pencil-square-o"></i>&nbsp;修改</a-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        + '<a class="link-remove-imei" data-imei-id="' + data.id + '"><i class="fa fa-trash-o"></i>&nbsp;删除</a>';
    data.DT_RowId = 'imei-' + data.id;
    return data;
  };

  var editRow = function(id, data) {
    var dataTable= $(mainTable).DataTable();
    data = formatRowData(data);
    if (id) {
      dataTable.row($('#' + data.DT_RowId)).data(data).draw(); 
    } else {
      dataTable.row.add(data).draw();
    }
  };
  
  var delRow = function(id) {
    var dataTable = $(mainTable).DataTable();
    dataTable.row($('#imei-' + id)).remove().draw();
  };
  
  var saveAdd = function() {
    //var pData = $(formAddImei).serialize();
    var pData = new FormData($(formAddImei)[0]);
    $.ajax({
      type: "POST",
      cache: false,
      contentType: false,
      processData: false,
      url: saveAddUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          var imeis = response.data.imeis;
          var warning = response.data.warning;
            
          for (var i = 0, length = imeis.length; i < length; i++) {
            imeis[i] = formatRowData(imeis[i]);
          }
          var dataTable= $(mainTable).DataTable();
          dataTable.rows.add(imeis).draw();
          
          if (warning) {
            toastr.success('添加完成。未保存无效或已存在IMEI：' + warning);
          } else {
            toastr.success('添加成功');
          }
          $(modalAdd).modal('hide');
        } else {
          var error = response.error;
          if (101 == error.code) {
            var msg = '';
            for (var property in error.msg) {
              if (error.msg.hasOwnProperty(property)) {
                msg += error.msg[property] + ' ';
              }
            }
            toastr.error('添加失败。' + msg);
          } else {
            toastr.error('添加失败。' + error.msg);
          }
        }
      },
      error: function(xhr, status, error) {
        toastr.error('操作失败。' + error);
      }
    });
  };
  
  var remove = function(imeiId) {
    if (!imeiId) {
      toastr.error('未指定id');
      return;
    }
    bootbox.confirm("确认删除？", function(result) {
      if (result) {
        $.ajax({
          type: "POST",
          cache: false,
          url: removeUrl,
          data: { 'id': imeiId }, 
          dataType: 'json',
          success: function(response) {
            if (response.success) {
              delRow(imeiId);
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
  };
  
  var resetAdd = function() {
    $(formAddImei)[0].reset();
    $(selectCompany).val('');
    $(selectCompany).selectpicker('refresh');
  };
  
  return {
    init: function(initObj) {
      saveAddUrl = initObj.saveAddUrl;
      saveEditUrl = initObj.saveEditUrl;
      removeUrl = initObj.removeUrl;
      uploadUrl = initObj.uploadUrl;
      
      $(mainTable).DataTable({
        columns: [
          { data: "company", width: "20%" },
          { data: "imei", width: "40%" },
          { data: "created_at", width: "20%" },
          { data: "actionHtml", width: "20%", orderable: false }
        ],
        buttons: [
            {
                text: "添加IMEI",
                className: "btn btn-primary",
                action: function ( e, dt, node, config ) {
                  showAdd();
                }
            }
        ]
      });
      
      $(btnUpload).on('change', function(e) {
        //console.log('lihuanlog: file=' + this.value.split(/(\\|\/)/g).pop());
        $(inputUpload).val(this.value.split(/(\\|\/)/g).pop());
      });
      $(btnSubmitAdd).on('click', function(e) {
        saveAdd();
      });
      $(btnResetAdd).on('click', function(e) {
        resetAdd();
      });
      $(mainTable).on('click', '.link-edit-imei', function(e) {
        //showConfig($(this).data('imei-id'));
      });
      $(mainTable).on('click', '.link-remove-imei', function(e) {
        remove($(this).data('imei-id'));
      });
    },
  };
})();