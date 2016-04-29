/**
 * ReleaseConfig related
 */
var ReleaseConfig = (function() {
  var uploadUrl;
  var uploadSwfUrl;
  var uploadSilverlightUrl;
  var uploadChunkSize;
  var saveConfigUrl;
  var removeConfigUrl;
  var getConfigUrl;
  var getConfigListUrl;
  var setConfigVisibilityUrl;
  var downloadUrl;
  
  var modal = $('#modal-release-config-list');
  var btnCloseModal = $('#config-btn-colse-modal');
  var product = $('#release-config-product');
  var currentVer = $('#upload-current-version');
  var btnAdd = $('#btn-add-release-config');
  var tableWrapper = $('#release-config-table-wrapper');
  var confTable = $('#release-config-table');
  var detailWrapper = $('#release-config-detail');
  var detailForm = $('#form-config-detail');
  var inputReleaseId = $('#config-release-id');
  var inputConfigId = $('#config-release-config-id');
  var inputProjectId = $('#config-project-id');
  var selectDiff = $('#config-diff-release-select');
  var selectDiffTip = $('#config-diff-release-select-tip');
  var pkgName = $('#config-release-package-name');
  var pkgPath = $('#config-release-package-path');
  var pkgSize = $('#config-release-package-size');
  var pkgHash = $('#config-release-package-md5');
  var downloadLink = $('#config-link-download');
  var pkgNameText = $('#config-release-package-name-text');
  var pkgSizeText = $('#config-release-package-size-text');
  var pkgHashText = $('#config-release-package-md5-text');
  var btnUpload = $('#config-upload-file-btn');
  var fileList = $('#config-file-list');
  var uploadProgress = $('#config-upload-progress');
  var uploadProgressWrapper = $('#config-upload-progress-wrapper');
  var ntBN = $('#config-nt-before-notification');
  var ntBNPWrapper = $('#config-notification-persist-wrapper');
  var ntBNP = $('#config-nt-before-notification-persist');
  var ntBNPTimeout = $('#config-nt-before-notification-persist-timeout');
  var ntBL = $('#config-nt-before-launcher');
  var ntBD = $('#config-nt-before-dialog');
  var ntAN = $('#config-nt-after-notification');
  var ntAL = $('#config-nt-after-launcher');
  var ntAD = $('#config-nt-after-dialog');
  var force = $('#config-force-update');
  var forceTimeWrapper = $('#config-force-update-time-wrapper');
  var forceStart = $('#config-force-update-time-start');
  var forceEnd = $('#config-force-update-time-end');
  var netWlan = $('#config-network-type-wlan');
  var netAll = $('#config-network-type-all');
  var autoDown = $('#config-download-auto');
  var locAll = $('#config-locale-all');
  var locSelect = $('#config-locale-select');
  var locListWrapper = $('#config-locale-list-wrapper');
  var locQSAll = $('#config-locale-quick-select-all');
  var locQSNone = $('#config-locale-quick-select-none');
  var imeiAll = $('#config-imei-all');
  var imeiSelect = $('#config-imei-select');
  var btnUploadImeiWrapper = $('#config-imei-upload-wrapper');
  var imeiCount = $('#config-imei-current-count');
  var inputUploadImei = $('#config-input-add-imei-upload');
  var btnUploadImei = $('#config-btn-add-imei-upload');
  var updateLog = $('#config-update-log');
  var intallTip = $('#config-install-tip');
  var footerTable = $('#footer-for-release-config-table');
  var footerConfig = $('#footer-for-config');
  var btnClose = $('#btn-colse-upload-modal');
  var btnCancel = $('#btn-cancel-config');
  var btnReset = $('#btn-reset-config');
  var btnSave = $('#btn-save-config');
  
  var intallTipDefault = '1. 选择安装，手机重启后进入升级模式。\n2. 整个过程需要花费几分钟时间，请确保有足够的电量。';

  var onNtBNToggle = function() {
    $(ntBNP).iCheck($(ntBN).is(':checked') ? 'enable' : 'disable')
  };
  
  var onNtBNPToggle = function() {
    if ($(ntBN).is(':checked') && $(ntBNP).is(':checked')) {
      enable(ntBNPTimeout);
    } else {
      disable(ntBNPTimeout);
    }
  };
  
  var onForceToggle = function() {
    if ($(force).is(':checked')) {
      enable($(forceTimeWrapper).find('select'));
      $(autoDown).iCheck('check');
      $(netAll).iCheck('check');
    } else {
      disable($(forceTimeWrapper).find('select'));
      $(netWlan).iCheck('check');
    }
  };
  
  var onLocaleSelected = function() {
    if ($(locSelect).is(':checked')) {
      $(locListWrapper).show();
    } else if ($(locAll).is(':checked')) {
      $(locListWrapper).hide();
    }
  };
  
  var onIMEISelected = function() {
    if ($(imeiSelect).is(':checked')) {
      $(btnUploadImeiWrapper).show();
    } else if ($(imeiAll).is(':checked')) {
      $(btnUploadImeiWrapper).hide();
    }
  };
  
  var resetForm = function(config) {
    if (config) {
      $(selectDiff).val(config.diff_release_id);
      $(selectDiff).selectpicker('refresh');
      if (config.release_package_path) {
        $(downloadLink).attr('href', downloadUrl + config.release_package_id);
        $(downloadLink).show();
        $(pkgSizeText).html(plupload.formatSize(config.release_package_size).toUpperCase());
      } else {
        $(downloadLink).removeAttr('href');
        $(downloadLink).hide();
        $(pkgSizeText).html('');
      }
      $(pkgName).val(config.release_package_name);
      $(pkgPath).val(config.release_package_path);
      $(pkgSize).val(config.release_package_size);
      $(pkgHash).val(config.release_package_md5);
      $(pkgNameText).html(config.release_package_name);
      $(pkgHashText).html(config.release_package_md5.toUpperCase());
      $(detailForm).find('input[name="notification_before[]"]').iCheck('uncheck');
      var nbc = config.notification_before.split(',');
      for (var i = 0, length = nbc.length; i < length; i++) {
        $(detailForm).find('input[name="notification_before[]"][value="' + nbc[i] + '"]').iCheck('check');
      }
      $(detailForm).find('input[name="notification_after[]"]').iCheck('uncheck');
      var nac = config.notification_after.split(',');
      for (var i = 0, length = nac.length; i < length; i++) {
        $(detailForm).find('input[name="notification_after[]"][value="' + nac[i] + '"]').iCheck('check');
      }
      $(ntBNPTimeout).val(config.notification_timeout);
      $(force).iCheck(1 == config.force_update ? 'check' : 'uncheck');
      $(forceStart).val(config.force_update_start);
      $(forceEnd).val(config.force_update_end);
      1 == config.download_net_type ? $(netAll).iCheck('check') : $(netWlan).iCheck('check');
      $(autoDown).iCheck(1 == config.auto_download ? 'check' : 'uncheck');
      selectLocale(null);
      selectLocale(config.locale_list);
      1 == config.locale ? (locSelect).iCheck('check') : $(locAll).iCheck('check');
      1 == config.imei ? $(imeiSelect).iCheck('check') : $(imeiAll).iCheck('check');
      imeiCount.html(config.imei_count);
      $(updateLog).val(config.update_log);
      $(intallTip).val(config.install_tip);
    } else {
      // 默认选项
      $(selectDiff).val('');
      $(selectDiff).selectpicker('refresh');
      $(downloadLink).removeAttr('href');
      $(downloadLink).hide();
      $(pkgName).val('');
      $(pkgPath).val('');
      $(pkgSize).val('');
      $(pkgHash).val('');
      $(pkgNameText).html('');
      $(pkgSizeText).html('');
      $(pkgHashText).html('');
      $(ntBN).iCheck('check');
      $(ntBNP).iCheck('uncheck');
      $(ntBNPTimeout).val('0');
      $(ntBL).iCheck('check');
      $(ntBD).iCheck('uncheck');
      $(ntAN).iCheck('check');
      $(ntAL).iCheck('uncheck');
      $(ntAD).iCheck('uncheck');
      $(force).iCheck('uncheck');
      $(forceStart).val('0');
      $(forceEnd).val('0');
      $(netWlan).iCheck('check');
      $(autoDown).iCheck('check');
      $(locAll).iCheck('check');
      selectLocale(null);
      $(imeiAll).iCheck('check');
      imeiCount.html('0');
      $(updateLog).val('');
      $(intallTip).val(intallTipDefault);
    }
    onNtBNToggle();
    onForceToggle();
    onLocaleSelected();
    onIMEISelected();
    $(selectDiffTip).hide();
    setUploadState('idle');
    $(inputUploadImei).val('')
    $(btnUploadImei).val('');
  };
  
  var formatRowData = function(data) {
    data.statusText = data.status != 1 ? '未上传' : '已上传';
    data.visibilityHtml = ''
        + '<div class="tv-left">'
        + '  <input id="config-visibility-all-' + data.config_id + '" type="radio" class="minimal config-visibility-radio" name="visibility-' + data.config_id + '" data-config-id="' + data.config_id + '" value="2">'
        + '  <span>所有</span>'
        + '</div>'
        + '<div class="tv-left">'
        + '  <input id="config-visibility-test-' + data.config_id + '" type="radio" class="minimal config-visibility-radio" name="visibility-' + data.config_id + '" data-config-id="' + data.config_id + '" value="1">'
        + '  <span>仅测试</span>'
        + '</div>'
        + '<div class="tv-left">'
        + '  <input id="config-visibility-none-' + data.config_id + '" type="radio" class="minimal config-visibility-radio" name="visibility-' + data.config_id + '" data-config-id="' + data.config_id + '" value="0">'
        + '  <span>无</span>'
        + '</div>';
    data.actionHtml = '<a class="link-edit-config" data-config-id="' + data.config_id + '" data-release-id="' + data.release_id + '" data-project-id="' + data.project_id + '"><i class="fa fa-cog"></i>&nbsp;配置</a>&nbsp;&nbsp;&nbsp;&nbsp'
        + '<a class="link-remove-config" data-config-id="' + data.config_id + '"><i class="fa fa-trash-o"></i>&nbsp;删除</a>';
    data.DT_RowId = 'release-config-' + data.config_id;
    return data;
  };
  
  var editRow = function(id, data) {
    var dataTable= $(confTable).DataTable();
    data = formatRowData(data);
    if (id) {
      dataTable.row($('#' + data.DT_RowId)).data(data).draw(); 
    } else {
      dataTable.row.add(data).draw();
    }
  };
  
  var delRow = function(id) {
    var dataTable = $(confTable).DataTable();
    dataTable.row($('#release-config-' + id)).remove().draw();
  };
  
  var saveConfig = function() {
    if ($(fileList).val()) {
      bootbox.confirm("选择的文件未上传，继续保存将不会更新文件。确认？", function(result) {
        if (result) {
          $(fileList).val('');
          saveConfig();
        }
      });
      return;
    }
    var configId = $(inputConfigId).val();
    if (!$(selectDiff).val()) {
      $(selectDiffTip).show();
      return;
    } else {
      $(selectDiffTip).hide();
    }
    var disableds = $(detailForm).find('input:disabled, select:disabled');
    enable(disableds);
    var hasImeiFile = $(imeiSelect).is(':checked') && $(inputUploadImei).val();
    var pData = !hasImeiFile ? $(detailForm).serialize() : new FormData($(detailForm)[0]);
    disable(disableds);
    //console.log('post data: ' + pData);
    var ajaxSetup = {
      type: "POST",
      cache: false,
      url: saveConfigUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          var data = response.data;
          editRow(configId, data);
          toastr.success((configId ? '修改' : '添加') + '成功');
          configToList();
        } else {
          var error = response.error;
          toastr.error((configId ? '修改' : '添加') + '差分版本失败。' + error.msg);
        }
      },
      error: function(xhr, status, error) {
        toastr.error('操作失败。' + error);
      }
    };
    if (hasImeiFile) {
      ajaxSetup.contentType = false;
      ajaxSetup.processData = false;
    }
    $.ajax(ajaxSetup);
  };
  
  var removeConfig = function(id) {
    if (!id) {
      toastr.error('未指定id');
      return;
    }
    bootbox.confirm("依赖于此差分版本的差分包文件、日志等将一并删除，确认删除？", function(result) {
      if (result) {
        $.ajax({
          type: "POST",
          cache: false,
          url: removeConfigUrl,
          data: { 'id': id }, 
          dataType: 'json',
          success: function(response) {
            if (response.success) {
              delRow(id);
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
  
  var showConfig = function(configId, releaseId, projectId) {
    if (!releaseId || !projectId || 'undefined' == releaseId || 'undefined' == projectId) {
      toastr.error('未指定项目或版本id');
      return;
    }
    if (!configId || 'undefined' == configId) {
      configId = '';
    }
    var pData = {
      'config_id': configId,
      'release_id': releaseId,
      'project_id': projectId,
    };
    //console.log('post data: ' + pData);
    $.ajax({
      type: "POST",
      cache: false,
      url: getConfigUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          configToList(pData);
          var diffReleases = response.data.diffReleases;
          $(selectDiff).find('option:not([role="holder"])').remove();
          for (var i = 0, length = diffReleases.length; i < length; i++) {
            $(selectDiff).append('<option value="' + diffReleases[i].id + '">' + diffReleases[i].version + ', ' + diffReleases[i].release_date + '</option>');
          }
          $(selectDiff).selectpicker('refresh');
          resetForm(configId ? response.data.config : null);
        } else {
          var error = response.error;
          if (200 == error.code) {
            toastr.warning('#' + error.code + ' ' + error.msg);
          } else {
            toastr.error('获取版本信息失败。' + error.msg);
          }
        }
      },
      error: function(xhr, status, error) {
        toastr.error('获取版本信息失败。' + error);
      }
    });
  };
  
  var setConfigVisibility = function(configId, mvisibility) {
    if (!configId || 'undefined' == configId) {
      configId = '';
    }
    var pData = {
      config_id: configId,
      visibility: mvisibility
    };
    $.ajax({
      type: "POST",
      cache: false,
      url: setConfigVisibilityUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          var data = response.data;
          var row =$('#release-config-' + data.config_id);
          var dataTable = $(confTable).DataTable();
          var rowData = dataTable.row(row).data();
          rowData.visibility = data.visibility;
          dataTable.row(row).data(rowData).draw();
          toastr.success('设置可见性成功');
        } else {
          var error = response.error;
          toastr.error('设置可见性失败。' + error.msg);
        }
      },
      error: function(xhr, status, error) {
        toastr.error('设置可见性失败。' + error);
      }
    });
  };
  
  var configToList = function(ids) {
    if (ids) { // show config detail
      $(btnAdd).hide();
      $(tableWrapper).hide();
      $(footerTable).hide();
      $(detailWrapper).show();
      $(footerConfig).show();
      $(inputConfigId).val(ids.config_id);
      $(inputReleaseId).val(ids.release_id);
      $(inputProjectId).val(ids.project_id);
    } else { // show config list
      $(btnAdd).show();
      $(tableWrapper).show();
      $(footerTable).show();
      $(detailWrapper).hide();
      $(footerConfig).hide();
      $(inputConfigId).val('');
      $(inputReleaseId).val('');
      $(inputProjectId).val('');
      recalculateDataTable();
    }
  };
  
  var recalculateDataTable = function() {
    var dataTable= $(confTable).DataTable();
    dataTable.columns.adjust().responsive.recalc();
  };
  
  var disable = function(o) {
    $(o).attr('disabled', 'disabled');
  };
  
  var enable = function(o) {
    $(o).removeAttr('disabled');
  };
  
  var setUploadState = function(state) {
    uploadState = state;
    if ('idle' == state) {
			$(btnUpload).data('action', 'upload');
			$(btnUpload).html('上传');
			disable(btnUpload);
			enable(fileList);
			$(fileList).val('');
			$(uploadProgressWrapper).addClass('hide');
			enable(btnCancel);
			enable(btnReset);
			enable(btnSave);
			enable(btnCloseModal);
    } else if ('ready' == state) {
			enable(btnUpload);
    } else if ('uploading' == state) {
			$(btnUpload).data('action', 'cancel');
			$(btnUpload).html('取消');
		  disable(fileList);
	    $(uploadProgress).css('width', '0%');
			$(uploadProgressWrapper).removeClass('hide');
			disable(btnCancel);
			disable(btnReset);
			disable(btnSave);
			disable(btnCloseModal);
			toastr.info('文件上传中，如需其他操作，请等待上传完成或取消上传。');
    }
  };
  
  var selectLocale = function(locales) {
    if ('all' == locales) {
      $(detailForm).find('input[name="locale_list[]"]').iCheck('check');
    } else if (!locales || null == locales || 'undefined' == locales) {
      $(detailForm).find('input[name="locale_list[]"]').iCheck('uncheck');
    } else {
      var list = locales.split(',');
      for (var i = 0, length = list.length; i < length; i++) {
        $(detailForm).find('input[name="locale_list[]"][value="' + list[i] + '"]').iCheck('check');
      }  
    }
  };
  
  var refreshVisibilityRadio = function() {
    //iCheck visibility radio
    $(confTable).find('.config-visibility-radio').iCheck({
      radioClass: 'iradio_minimal-blue'
    });
    
    var data = $(confTable).DataTable().rows().data();
    for (var i = 0, length = data.length; i < length; i++) {
      if (2 == data[i].visibility) {
        $('#config-visibility-all-' + data[i].config_id).iCheck('check');
      } else if (1 == data[i].visibility) {
        $('#config-visibility-test-' + data[i].config_id).iCheck('check');
      } else {
        $('#config-visibility-none-' + data[i].config_id).iCheck('check');
      }
    }
  };

  return {
    init: function(initObj) {
      uploadUrl = initObj.uploadUrl;
      uploadSwfUrl = initObj.uploadSwfUrl;
      uploadSilverlightUrl = initObj.uploadSilverlightUrl;
      uploadChunkSize = initObj.uploadChunkSize;
      saveConfigUrl = initObj.saveConfigUrl;
      removeConfigUrl = initObj.removeConfigUrl;
      getConfigUrl = initObj.getConfigUrl;
      getConfigListUrl = initObj.getConfigListUrl;
      setConfigVisibilityUrl = initObj.setConfigVisibilityUrl;
      downloadUrl = initObj.downloadUrl;
      
      // datatable
      $(confTable).DataTable({
        dom:'t<"row"<"col-sm-4"i><"col-sm-8"p>>',
        columns: [
          { data: "diff_version", width: "30%" },
          { data: "statusText", width: "10%", orderable: false },
          { data: "visibilityHtml", width: "40%", orderable: false },
          { data: "actionHtml", width: "20%", orderable: false }
        ],
        fnDrawCallback: function() {
          refreshVisibilityRadio();
          // sometimes the radios are not ready, refresh again later
          if ('0' !== $('.config-visibility-radio').css('opacity')) {
            setTimeout(function() {
              //alert('radio not ready');
              refreshVisibilityRadio();
            }, 50);
          }
        }
      });
      $(confTable).on('ifClicked', '.config-visibility-radio', function() {
        //console.log('visibility=' + $(this).val());
        setConfigVisibility($(this).data('config-id'), $(this).val());
      });
      $(modal).on('shown.bs.modal', function() {
        recalculateDataTable();
      });
     //iCheck for checkbox and radio inputs
     $(modal).find('input[type=checkbox].minimal, input[type=radio].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
      });
      $(ntBN).on('ifToggled', function(e){
        onNtBNToggle();
        onNtBNPToggle();
      });
      $(ntBNP).on('ifToggled', function(e){
        onNtBNPToggle();
      });
      $(force).on('ifToggled', function(e){
        onForceToggle();
      });
      $(detailForm).find('[id^="config-locale-"]').on('ifToggled', function() {
        onLocaleSelected();
      });
      $(locQSAll).on('click', function(e) {
        selectLocale('all');
      });
      $(locQSNone).on('click', function(e) {
        selectLocale(null);
      });
      $(detailForm).find('[id^="config-imei-"]').on('ifToggled', function() {
        onIMEISelected();
      });
      $(btnUploadImei).on('change', function(e) {
        //console.log('lihuanlog: file=' + this.value.split(/(\\|\/)/g).pop());
        $(inputUploadImei).val(this.value.split(/(\\|\/)/g).pop());
      });
      $(btnReset).on('click', function(e){
        resetForm();
      });
      // 配置差分版本详情
      $(tableWrapper).on('click', '.link-edit-config', function(e) {
        showConfig($(this).data('config-id'), $(this).data('release-id'), $(this).data('project-id'));
      });
      // 删除差分版本
      $(tableWrapper).on('click', '.link-remove-config', function(e) {
        removeConfig($(this).data('config-id'));
      });
      // 添加差分版本
      $(btnAdd).on('click', function(e) {
        showConfig(null, $(this).data('release-id'), $(this).data('project-id'));
      });
      // 保存配置
      $(btnSave).on('click', function(e) {
        saveConfig();
      });
      // 取消配置，返回配置列表
      $(btnCancel).on('click', function(e) {
        configToList();
      });
      // 关闭上传对话框
      $(btnClose).on('click', function(e) {
        $(modal).modal('hide');
      });
      
      var uploader = new plupload.Uploader({
      	runtimes : 'html5,flash,silverlight,html4',
      	browse_button : 'config-file-list', // you can pass an id...
      	container: 'config-upload-container', // ... or DOM Element itself
      	url : uploadUrl,
      	flash_swf_url :  uploadSwfUrl,
      	silverlight_xap_url :  uploadSilverlightUrl,
        chunk_size:  uploadChunkSize,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
      	filters : {
      		max_file_size : '2048mb',
      		mime_types: [
      			{title : "Zip 压缩包", extensions : "zip"}
      		]
      	},
      	init: {
      		PostInit: function() {
      			$(btnUpload).on('click', function(e) {
      			  if ($(btnUpload).attr('disabled')) return;
      			  if ('upload' == $(btnUpload).data('action')) {
        				uploader.start();
        				setUploadState('uploading');
        			} else {
        			  // stop uploader
        			  plupload.each(uploader.files, function(file) {
          				uploader.removeFile(file);
          			})
          			uploader.stop();
        				setUploadState('idle');
        			}
      			});
      		},
      		FilesAdded: function(up, files) {
            up.files.splice(0, up.files.length-1);
            
      			plupload.each(files, function(file) {
      				$(fileList).val(file.name + ' (' + plupload.formatSize(file.size).toUpperCase() + ')');
      			});
        		setUploadState('ready');
      		},
      		UploadProgress: function(up, file) {
      		  $(uploadProgress).css('width', file.percent + '%');
      		},
      		FileUploaded: function(up, file, resp) {
        	  setUploadState('idle');
    				var fileInfo = JSON.parse(resp.response);
    				if (file.size != fileInfo.size) {
      		    toastr.error('服务器和本地文件大小不一致，请重新上传');
    			  } else {
      				$(pkgName).val(fileInfo.name);
      				$(pkgPath).val(fileInfo.path);
      				$(pkgSize).val(fileInfo.size);
      				$(pkgHash).val(fileInfo.md5);
      				$(pkgNameText).html(fileInfo.name);
      				$(pkgSizeText).html(plupload.formatSize(file.size).toUpperCase());
      				$(pkgHashText).html(fileInfo.md5.toUpperCase());
      		    toastr.success('上传成功');
    			  }
      		},
      		Error: function(up, err) {
      		  toastr.error('上传失败。 #' + err.code + ': ' + err.message);
        	  setUploadState('idle');
      		}
      	}
      });
      uploader.init();
    },
    showConfigList: function(productInfo, releaseId, projectId) {
      if (!releaseId || !projectId || 'undefined' == releaseId || 'undefined' == projectId) {
        toastr.error('未指定项目或版本id');
        return;
      }
      var pData = {
        'release_id': releaseId,
        'project_id': projectId,
      };
      //console.log('post data: ' + pData);
      $.ajax({
        type: "POST",
        cache: false,
        url: getConfigListUrl,
        data: pData, 
        dataType: 'json',
        success: function(response) {
          if (response.success) {
            $(btnSave).data('release-id', releaseId).data('project-id', projectId);
            $(btnAdd).data('release-id', releaseId).data('project-id', projectId);
            var data = response.data;
            $(product).html('产品：' + productInfo);
            $(currentVer).html('当前版本：' + data.version + '，发布时间：' + data.release_date);
            for (var i = 0, length = data.configs.length; i < length; i++) {
              data.configs[i].release_id = releaseId;
              data.configs[i].project_id = projectId;
              data.configs[i] = formatRowData(data.configs[i]);
            }
            var dataTable= $(confTable).DataTable();
            dataTable.clear().rows.add(data.configs).draw();
            configToList();
            $(modal).modal({
              backdrop: 'static',
              keyboard: false
            });
          } else {
            var error = response.error;
            if (200 == error.code) {
              toastr.warning(error.msg);
            } else {
              toastr.error('获取版本信息失败。' + error.msg);
            }
          }
        },
        error: function(xhr, status, error) {
          toastr.error('获取版本信息失败。' + error);
        }
      });
    },
  };
})();

/**
 * Release related
 */
var Release = (function() {
  var dropdownInfoUrl;
  var saveReleaseUrl;
  var removeReleaseUrl;
  
  var mainTable = $('#main-table');
  var modal = $('#modal-add-release');
  var modalTitle = $('#title-add-release');
  var form = $('#form-add-release');
  var inputReleaseId = $('#add-release-id');
  var inputProjectId = $('#add-project-id');
  var selectCompany = $('#add-select-company');
  var selectProject = $('#add-select-project');
  var inputModel = $('#add-input-model');
  var selectProductInfo = $('#add-select-productInfo');
  var inputVersion = $('#add-input-version');
  var inputDate = $('#add-input-date');
  var btnReset = $('#form-add-release-reset');
  var btnSubmit = $('#form-add-release-submit');

  var validateForm = function() {
    var valid = true;
    $(form).find('.form-group').each(function() {
      var input = $(this).find('.form-control')[0];
      var tip = $(this).find('.form-tip')[0];
      if($(input).val()) {
        $(tip).hide(); 
      } else {
        $(tip).show();
        valid = false;
      }
    });
    return valid;
  };
  
  var onCompanySelected = function(rowData) {
    //console.log('company=' + $(selectCompany).val());
    $(selectProject).val('');
    $(inputModel).val('');
    $(selectProductInfo).val('');
    $(selectProject).find('option:not([role="holder"])').remove();
    $(selectProductInfo).find('option:not([role="holder"])').remove();
    $(selectProject).selectpicker('refresh');
    $(selectProductInfo).selectpicker('refresh');
    $(inputVersion).val('');
    if (!$(selectCompany).val()) return;
    var pData = {
      'company': $(selectCompany).val()
    };
    $.ajax({
      type: "POST",
      cache: false,
      url: dropdownInfoUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          var projectNames = response.data;
          for (var i = 0, length = projectNames.length; i < length; i++) {
            $(selectProject).append('<option data-model="' + projectNames[i].model + '" value="' + projectNames[i].project + '">' + projectNames[i].project + ' (' + projectNames[i].model + ')</option>');
          }
          if (rowData) {
            //$(selectProject).val(rowData.project);
            $(selectProject).find('option[data-model="' + rowData.model +'"][value="' + rowData.project +'"]').prop('selected', true);
            onProjectSelected(rowData);
          }
          $(selectProject).selectpicker('refresh');
        }
      },
      error: function(xhr, status, error) {
      }
    });
  };
  
  var onProjectSelected = function(rowData) {
    var model = $(selectProject).find('option:selected').data('model');
    $(inputModel).val(model);
    $(selectProductInfo).val('');
    $(selectProductInfo).find('option:not([role="holder"])').remove();
    $(selectProductInfo).selectpicker('refresh');
    $(inputVersion).val('');
    //console.log('company=' + $(selectCompany).val() + ', project=' + $(selectProject).val() + ', model=' + $(inputModel).val());
    if (!$(selectProject).val()) return;
    var pData = {
      'company': $(selectCompany).val(),
      'project': $(selectProject).val(),
      'model': model,
    };
    $.ajax({
      type: "POST",
      cache: false,
      url: dropdownInfoUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          var productInfos = response.data;
          for (var i = 0, length = productInfos.length; i < length; i++) {
            $(selectProductInfo).append('<option data-project-id="' + productInfos[i].id + '" data-version-hint="' + productInfos[i].version_hint + '">' + productInfos[i].productInfo + '</option>');
          }
          if (rowData) {
            $(selectProductInfo).val(rowData.productInfo);
            onProductInfoSelected();
            $(inputVersion).val(rowData.version);
          }
          $(selectProductInfo).selectpicker('refresh');
        }
      },
      error: function(xhr, status, error) {
      }
    });
  };
  
  var onProductInfoSelected = function() {
    $(inputProjectId).val($(selectProductInfo).find('option:selected').data('project-id'));
    $(inputVersion).val($(selectProductInfo).find('option:selected').data('version-hint'));
  };
  
  var resetForm = function() {
    $('#form-add-release .form-group .form-tip').hide();
    $(form)[0].reset();
    
    $(selectProject).find('option:not([role="holder"])').remove();
    $(selectProductInfo).find('option:not([role="holder"])').remove();

    $('#form-add-release .selectpicker').selectpicker('refresh');
    $(inputDate).datepicker('update');
  };
  
  var formatRowData = function(data) {
    data.actionHtml = '<a class="link-edit-release" data-release-id="' + data.id + '"><i class="fa fa-pencil-square-o"></i>&nbsp;修改</a>&nbsp;&nbsp;&nbsp;&nbsp'
        + '<a class="link-config-release" data-release-id="' + data.id + '" data-project-id="' + data.project_id + '"><i class="fa fa-cogs"></i>&nbsp;配置</a>&nbsp;&nbsp;&nbsp;&nbsp'
        + '<a class="link-remove-release" data-release-id="' + data.id + '"><i class="fa fa-trash-o"></i>&nbsp;删除</a>';
    data.DT_RowId = 'release-' + data.id;
    return data;
  };
  
  var delRow = function(id) {
    var dataTable = $(mainTable).DataTable();
    dataTable.row($('#release-' + id)).remove().draw();
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
  
  var showEdit = function(id) {
    resetForm();
    if (id) {
      $(modalTitle).html('修改版本');
      $(inputReleaseId).val(id);
      var dataTable = $(mainTable).DataTable();
      var data = dataTable.row($('#release-' + id)).data();
      $(selectCompany).val(data.company);
      $(selectCompany).selectpicker('refresh');
      onCompanySelected(data);
      $(inputDate).val(data.release_date);
    } else {
      $(modalTitle).html('添加版本');
      $(inputReleaseId).val('');
    }
    $(inputDate).datepicker('update');
    $(modal).modal({
      backdrop: 'static',
      keyboard: false
    });
  };
  
  var saveRelease = function() {
    var id = $(inputReleaseId).val();
    var actionName = id ? '修改' : '添加';
    var pData = $(form).serialize();
    //console.log('post data: ' + pData);
    $.ajax({
      type: "POST",
      cache: false,
      url: saveReleaseUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          editRow(id, response.data);
          $(modal).modal('hide');
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

  var removeRelease = function(id) {
    if (!id) return;
    bootbox.confirm("依赖于此版本的差分版本、日志等将一并删除，确认删除？", function(result) {
      if (result) {
        $.ajax({
          type: "POST",
          cache: false,
          url: removeReleaseUrl,
          data: { 'id': id }, 
          dataType: 'json',
          success: function(response) {
            if (response.success) {
              delRow(id);
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
  
  return {
    init: function(initObj) {
      dropdownInfoUrl = initObj.dropdownInfoUrl;
      saveReleaseUrl = initObj.saveReleaseUrl;
      removeReleaseUrl = initObj.removeReleaseUrl;
      
      $(mainTable).DataTable({
        columns: [
          { data: "company", width: "10%" },
          { data: "model", width: "10%" },
          { data: "project", width: "10%" },
          { data: "productInfo", width: "25%" },
          { data: "version", width: "20%" },
          { data: "release_date", width: "10%" },
          { data: "actionHtml", width: "15%", orderable: false }
        ],
        buttons: [
          {
            text: "添加版本",
            className: "btn btn-primary",
            action: function ( e, dt, node, config ) {
              showEdit(null);
            }
          }
        ],
        fnPreDrawCallback: function() {
          //$("#details").hide();
          //$("#loading").show();
        },
        fnDrawCallback: function() {
          //$("#details").show();
          //$("#loading").hide();
        },
        fnInitComplete:function(){
        }
      });
      $(inputDate).datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        language: "zh-CN",
        autoclose: true,
        todayHighlight: true,
        startDate: "2015-01-01",
        endDate: "2025-12-31",
      });
      // 公司改变，更新项目名下拉列表
      $(selectCompany).change(function(e) {
        onCompanySelected();
      });
      // 项目改变，更新产品配置下拉列表
      $(selectProject).change(function(e) {
        onProjectSelected();
      });
      // 产品配置改变，确定项目id
      $(selectProductInfo).change(function(e) {
        onProductInfoSelected();
      });
      // 提交
      $(btnSubmit).on('click', function(e) {
        e.preventDefault();
        if (validateForm()) {
          saveRelease();
        }
      });
      // 重置表单
      $(btnReset).on('click', function(e) {
        resetForm();
      });
      // 修改
      $(mainTable).on('click', '.link-edit-release', function(e) {
        showEdit($(this).data('release-id'));
      });
      // 配置
      $(mainTable).on('click', '.link-config-release', function(e) {
        var releaseId = $(this).data('release-id');
        var data = $(mainTable).DataTable().row($('#release-' + releaseId)).data();
        ReleaseConfig.showConfigList(data.productInfo, releaseId, $(this).data('project-id'));
      });
      // 删除
      $(mainTable).on('click', '.link-remove-release', function(e) {
        removeRelease($(this).data('release-id'));
      });
    },  
  };  
})();