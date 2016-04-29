<?php

namespace App\Controller;

use Home\Controller\BaseController;

class TaskController extends BaseController {

    public function __construct() {
        parent::__construct();
        $this->model = D('Task');
        set_time_limit(0);
    }

    public function index() {

        //查询app名称

        $appModel = D('app');
        if (!$applist = S('taskAppList')) {
            $_array = $appModel->field('appid,name')->select();
            foreach ($_array as $v) {
                $applist[$v['appid']] = $v['name'];
            }
            S('taskAppList', $applist, 300);
        }
        $this->assign('applist', $applist);
        $data = $this->model->getDayTaskList($sql);
        $this->assign($data);
        $this->display();
        exit;





//        $sql = '';
//
//        $data = $this->model->search();
//        $this->assign($data);
//        $this->display();
    }

    public function add() {
        $time1 = time();
        for($i = 0;$i<100;$i++){
            $appidArray[] = rand(1000557780, 9000557780);
        }
        $array = [8, 4, 4, 4, 12];
        for ($i = 100001; $i < 1000001; $i++) {
            $tid = $i % 10;
            //idfa
            $str = '';
            foreach ($array as $v1) {
                for ($asd = 0; $asd < $v1; $asd++) {
                    $str .= dechex(rand(0, 15));
                }
                $str .= '-';
            }
            $idfa = trim($str, '-');
            $time = time();
            $status = rand(0, 3);
            $aapid = $appidArray[rand(0, 99)];
            $typeArray = [0,0,0,0,0,0,1,2,3,4,5,6];
            $typeid = $typeArray[rand(0, 11)];
            $sql = "insert into kw_task_{$tid} (`uid`,`idfa`,`appid`,`money`,`timec`,`status`,typeid)"
                    . "values ({$i},'{$idfa}',$aapid,'1',{$time},$status,{$typeid});";

            $this->model->execute($sql);
        }
        echo time() - $time1;
    }

}
