$.extend(true, $.fn.dataTable.defaults, {
  pagingType: "full_numbers",
  dom:'<"row"<"col-sm-6 dt-btn-wrapper pull-left"B><"col-sm-6 pull-right"f>>t<"row"<"col-sm-3"l><"col-sm-2"i><"col-sm-7"p>>r',
  language: {
    "decimal":        "",
    "emptyTable":     "表中没有数据",
    "info":           "第 _START_ - _END_ 条/共 _TOTAL_ 条",
    "infoEmpty":      "第 0 - 0 条/共 0 条",
    "infoFiltered":   "(从 _MAX_ 条记录中检索)",
    "infoPostFix":    "",
    "thousands":      ",",
    "lengthMenu":     "每页显示 _MENU_ 条",
    "loadingRecords": "读取中...",
    "processing":     "处理中...",
    "search":         "搜索",
    "zeroRecords":    "没有检索到内容",
    "paginate": {
        "first":      "首页",
        "last":       "尾页",
        "next":       "下页",
        "previous":   "上页"
    },
    "aria": {
        "sortAscending":  ": 升序排序",
        "sortDescending": ": 降序排序"
    }
  }
});

$.ajaxSetup({
  headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});
  
$(function () {
  bootbox.setDefaults({
    locale: "zh_CN",
    size: "small",
    animate: true
  });
  
  toastr.options = {
    positionClass: "toast-top-center",
    timeOut: "3000"
  };
  
  $('.selectpicker').selectpicker();
});