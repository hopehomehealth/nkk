<header class="main-header">
  <!-- Logo -->
  <a href="{{ url('home') }}" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><b>F</b>ota</span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg"><b>天语</b>Fota</span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top" role="navigation">
    <!-- Sidebar toggle button-->
    <a class="sidebar-toggle" data-toggle="offcanvas" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <!-- User Account: style can be found in dropdown.less -->
        <li class="dropdown user user-menu">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-user"></i>
            <span class="hidden-xs">你好, {{ Auth::user()->name }}</span>
          </a>
          <ul class="dropdown-menu">
            <!-- Menu Footer-->
            <li class="user-footer">
              <div class="pull-left">
                <a class="btn btn-default btn-flat">个人资料</a>
              </div>
              <div class="pull-right">
                <a href="{{ url('auth/logout') }}" class="btn btn-default btn-flat">退出登录</a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</header>