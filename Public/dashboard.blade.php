<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>@section('title')@show | 天语Fota</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="{{ asset('bootstrap/css/bootstrap.min.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('font-awesome/css/font-awesome.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('dist/css/AdminLTE.min.css') }}">
    <!-- AdminLTE Skins. We have chosen the skin-blue for this starter
          page. However, you can choose any other skin. Make sure you
          apply the skin class to the body tag so the changes take effect.
    -->
    <link rel="stylesheet" href="{{ asset('dist/css/skins/skin-blue-light.min.css') }}">
    <!-- toastr 2.1.2 -->
    <link rel="stylesheet" href="{{ asset('plugins/toastr/toastr.min.css') }}">
    <!-- bootstrap-select 1.7.4 -->
    <link rel="stylesheet" href="{{ asset('plugins/bootstrap-select/bootstrap-select.min.css') }}">
    <!-- DataTables -->
    <link rel="stylesheet" href="{{ asset('plugins/datatables/css/dataTables.bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables/extensions/Responsive/css/responsive.dataTables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables/extensions/Responsive/css/responsive.bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables/extensions/Buttons/css/buttons.dataTables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables/extensions/Buttons/css/buttons.bootstrap.min.css') }}">
    
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <style>
      .bootbox .modal-dialog {
        margin-top: 15%;
      }
      
      #toast-container div {
        opacity: 0.9;
      }
      
      .bootstrap-select.form-control button {
        border-radius: 0px;
        background-color: #FFF;
      }
    </style>
    
    @yield('moreHead')
  </head>
  <body class="hold-transition skin-blue-light sidebar-mini">
    <div class="wrapper">
      @include('partials.header')
      @include('partials.sidebar')
      
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          @yield('content-header')
        </section>

        <!-- Main content -->
        <section class="content">
          @yield('content')
        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->
        
    </div><!-- ./wrapper -->
    

    <!-- REQUIRED JS SCRIPTS -->

    <!-- jQuery 2.1.4 -->
    <!-- <script src="{{ asset('plugins/jQuery/jQuery-2.1.4.min.js') }}"></script>-->
    <!-- jQuery 1.11.3 -->
    <script src="{{ asset('plugins/jQuery/jquery-1.11.3.min.js') }}"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="{{ asset('bootstrap/js/bootstrap.min.js') }}"></script>
    <!-- AdminLTE App -->
    <script src="{{ asset('dist/js/app.min.js') }}"></script>
    <!-- Slimscroll -->
    <script src="{{ asset('plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
    <!-- FastClick -->
    <script src="{{ asset('plugins/fastclick/fastclick.min.js') }}"></script>
    <!-- bootbox 4.4.0 -->
    <script src="{{ asset('plugins/bootbox/bootbox.min.js') }}"></script>
    <!-- toastr 2.1.2 -->
    <script src="{{ asset('plugins/toastr/toastr.min.js') }}"></script>
    <!-- jquery-validation 1.14.0 -->
    <script src="{{ asset('plugins/jquery-validation/jquery.validate.min.js') }}"></script>
    <!-- jquery-validate-bootstrap-popover 1.6.3 -->
    <script src="{{ asset('plugins/jquery-validate-bootstrap-popover/jquery.validate.bootstrap.popover.min.js') }}"></script>
    <!-- bootstrap-select 1.7.4 -->
    <script src="{{ asset('plugins/bootstrap-select/bootstrap-select.min.js') }}"></script>
    <!-- DataTables -->
    <script src="{{ asset('plugins/datatables/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables/js/dataTables.bootstrap.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables/extensions/Buttons/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables/extensions/Buttons/js/buttons.bootstrap.min.js') }}"></script>
    <script src="{{ asset('dist/js/project-common.js') }}"></script>

    @yield('moreBody')
  </body>
</html>