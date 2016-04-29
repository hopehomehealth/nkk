@extends('layouts.dashboard')

@section('title')
  项目管理 @parent
@stop

@section('moreHead')

  <style type="text/css">
     .table-responsive {
        overflow-x: hidden;
      }
     .dataTables_wrapper .btn-primary span {
        color: #fff;
      }
      .dt-btn-wrapper {
        text-align: center; 
      }
      .tip-alert {
        color: #f56954;
      }
      
  </style>
@stop

@section('content-header')
  <h1>
    项目管理
  </h1>
  <ol class="breadcrumb">
    <li><a href="{{ url('home') }}"><i class="fa fa-dashboard"></i> 后台主页</a></li>
    <li class="active">项目管理</li>
  </ol>
@stop

@section('content')
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-body">
          <div class="table-responsive">
            <table id="main-table" class="table table-bordered table-hover dt-responsive display nowrap" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>公司</th>
                  <th>型号</th>
                  <th>项目</th>
                  <th>产品</th>
                  <th>OEM</th>
                  <th>语言</th>
                  <th>渠道</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                @if (count($projects) > 0)
                @foreach ($projects as $project)
                <tr id="project-{{ $project->id }}">
                  <td>{{ $project->company }}</td>
                  <td>{{ $project->model }}</td>
                  <td>{{ $project->project }}</td>
                  <td>{{ $project->product }}</td>
                  <td>{{ $project->oem }}</td>
                  <td>{{ $project->language }}</td>
                  <td>{{ $project->operator }}</td>
                  <td>
                    <a class="link-edit" data-project-id="{{ $project->id }}"><i class="fa fa-pencil-square-o"></i>&nbsp;修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a class="link-remove" data-project-id="{{ $project->id }}"><i class="fa fa-trash-o"></i>&nbsp;删除</a>
                  </td>
                </tr>
                @endforeach
                @endif
              </tbody>
            </table>
          </div>
        </div><!-- /.box-body -->
      </div><!-- /.box -->
    </div><!-- /.col -->
  </div><!-- /.row -->
  
  <div id="modal-add-proj" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 id="title-add-proj" class="modal-title">添加项目</h4>
        </div>
        <div class="modal-body">
          <!-- form start -->
          <form id="form-add-proj" class="form-horizontal" action="#">
            <div class="box-body">
              <input type="hidden" id="input-project-id" name="id">
              <div class="form-group">
                <label for="input-add-proj-company" class="col-sm-2 control-label">公司</label>
                <div class="col-sm-10">
                  <input type="text" id="input-add-proj-company" class="form-control" name="company" placeholder="公司" required>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">公司不能为空</span>
                </div>
              </div>
              <div class="form-group">
                <label for="input-add-proj-model" class="col-sm-2 control-label">型号</label>
                <div class="col-sm-10">
                  <input type="text" id="input-add-proj-model" class="form-control" name="model" placeholder="型号" required>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">型号不能为空</span>
                </div>
              </div>
              <div class="form-group">
                <label for="input-add-proj-project" class="col-sm-2 control-label">项目</label>
                <div class="col-sm-10">
                  <input type="text" id="input-add-proj-project" class="form-control" name="project" placeholder="项目" required>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">项目不能为空</span>
                </div>
              </div>
              <div class="form-group">
                <label for="input-add-proj-product" class="col-sm-2 control-label">产品</label>
                <div class="col-sm-10">
                  <input type="text" id="input-add-proj-product" class="form-control" name="product" placeholder="产品" required>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">产品不能为空</span>
                </div>
              </div>
              <div class="form-group">
                <label for="input-add-proj-oem" class="col-sm-2 control-label">OEM</label>
                <div class="col-sm-10">
                  <input type="text" id="input-add-proj-oem" class="form-control" name="oem" placeholder="OEM" required>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">OEM不能为空</span>
                </div>
              </div>
              <div class="form-group">
                <label for="select-add-proj-language" class="col-sm-2 control-label">语言</label>
                <div class="col-sm-10">
                  <select id="select-add-proj-language" class="form-control selectpicker" name="language">
                    <option value="" selected>选择语言</option>
                    <option>zh-CN</option>
                    <option>zh-TW</option>
                    <option>en-US</option>
                  </select>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">请选择语言</span>
                </div>
              </div>
              <div class="form-group">
                <label for="select-add-proj-operator" class="col-sm-2 control-label">渠道</label>
                <div class="col-sm-10">
                  <select id="select-add-proj-operator" class="form-control selectpicker" name="operator">
                    <option value="" selected>选择渠道</option>
                    <option>SELF</option>
                    <option>CMCC</option>
                    <option>CU</option>
                    <option>CT</option>
                    <option>OTHER</option>
                  </select>
                </div>
                <div class="col-sm-10 col-sm-offset-2 form-tip" style="display: none;">
                  <span class="tip-alert">请选择渠道</span>
                </div>
              </div>
              <div class="col-md-6">
                <span class="tip-alert">注：所有内容均为必填</span>
              </div>
            </div><!-- /.box-body -->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
          <button type="button" id="btn-add-proj-reset" class="btn btn-default pull-left">重置</button>
          <button type="button" id="btn-add-proj-submit" class="btn btn-primary">确认</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
@stop

@section('moreBody')
  <script src="{{ asset('dist/js/project-manage.js') }}"></script>
  <!-- page script -->
  <script>
    $(function () {
      ProjectManage.init({
        saveUrl: "{{ url('project/save/project') }}",
        removeUrl: "{{ url('project/remove/project') }}",
      });
    });
    
  </script>
@stop