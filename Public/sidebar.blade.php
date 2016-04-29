  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="搜索项目...">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
          </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">项目管理</li>
        <li class="treeview {{ Request::is('project/*') ? 'active' : '' }}">
          <a>
            <i class="fa fa-sitemap"></i> <span>版本控制</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="{{ Request::is('project/manage') ? 'active' : '' }}"><a href="{{ url('project/manage') }}">项目管理</a></li>
            <li class="{{ Request::is('project/release') ? 'active' : '' }}"><a href="{{ url('project/release') }}">发布升级</a></li>
            <li class="{{ Request::is('project/imei') ? 'active' : '' }}"><a href="{{ url('project/imei') }}">配置测试IMEI</a></li>
          </ul>
        </li>
        <li class="treeview {{ Request::is('stats/*') ? 'active' : '' }}">
          <a>
            <i class="fa fa-bar-chart"></i> <span>数据统计</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="{{ Request::is('stats/overview') ? 'active' : '' }}"><a href="{{ url('stats/overview') }}">统计概况</a></li>
            <li class="{{ Request::is('stats/user') ? 'active' : '' }}"><a href="{{ url('stats/user') }}">用户统计</a></li>
            <li class="{{ Request::is('stats/upgrade') ? 'active' : '' }}"><a href="{{ url('stats/upgrade') }}">升级统计</a></li>
          </ul>
        </li>
        
        <li class="header">用户管理</li>
        <li class="{{ Request::is('user/manage') ? 'active' : '' }}"><a href="{{ url('user/manage') }}"><i class="fa fa-users"></i> <span>用户管理</span></a></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>