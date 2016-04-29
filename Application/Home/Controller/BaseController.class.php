<?php

namespace Home\Controller;

use Think\Controller;

class BaseController extends Controller {
    
    
    public function __construct() {
        parent::__construct();
        $this->menu = C('MENU');
        $this->setMenu();
    }


    public function index() {
        
    }
    
    private function setMenu(){
        
        $this->assign('_title',  'asd');
        $this->assign('_menu',  $this->menu);
    }
    

}
