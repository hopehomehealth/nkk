<?php


namespace App\Controller;

use Home\Controller\BaseController;

class ApiController extends BaseController {

    public function __construct() {
        parent::__construct();
        $this->model = D('ApiValid');
    }
    
    public function index(){
        $data = $this->model->order('status desc')->select();
        $this->assign('data',$data);
        
        $this->display();
    }
    public function saveValid(){
        $result = $this->model->add($_POST);
        unset($_POST['dosubmit']);
        $data = $_POST;
        $result && exit(json_encode(['success' => true, 'data' => $data])) || exit(json_encode(['success' => false, 'data' => $this->model->getDbError()]));
    }
    public function editValid(){
        if(I('post.dosubmit')){
            unset($_POST['dosubmit']);
            $result = $this->model->save($_POST);
            $data = $_POST;
            $data['id'] = I('post.appid');
            $result !== false && exit(json_encode(['success' => true, 'data' => $data])) || exit(json_encode(['success' => false, 'data' => $this->model->getError()]));
        }
        $data = $this->model->find(I('post.appid'));
        $data && exit(json_encode(['success' => true, 'data' => $data])) || exit(json_encode(['success' => false, 'data' => $this->model->getDbError()]));
        
    }
}
