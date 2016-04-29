<?php

namespace App\Controller;

use Home\Controller\BaseController;

class RedeemController extends BaseController {

    public function __construct() {
        parent::__construct();
        $this->model = D('UserRedeem');
    }

    public function index() {
        
    }

    /**
     * 用户申请提现
     */
    public function apply() {

        $applyList = $this->model->where(['status' => 0])->select();
        $this->assign('applyList', $applyList);
        $this->display();
    }

    public function testAddApply() {
        set_time_limit(0);
        for ($i = 1; $i < 10; $i++) {
            $uid = rand(1, 10000);
            $money = rand(10, 100);
            $name = 'name' . rand(1, 10000);
            $account = rand(1300, 18900) . rand(1000000, 9999999);
            $sql = "insert into kw_user_redeem (`uid`,`money`,`name`,`account`)"
                    . "value (6429,'{$money}','{$name}','{$account}');";
            $this->model->execute($sql);
        }
    }

    public function addi() {
        set_time_limit(0);
        for ($i = 1; $i < 100; $i++) {
            $uid = rand(1, 10000);
            $money = rand(10, 100);
            $name = 'name' . rand(1, 10000);
            $account = rand(1300, 18900) . rand(1000000, 9999999);
            $sql = "insert into kw_user_invite (`id`,`pid`)"
                    . "value ({$uid},6429);";
            $this->model->execute($sql);
        }
    }

    public function info() {
        $this->assign('uid', I('uid'));
        $this->display();
    }

    public function task() {
        $this->assign('uid', I('uid'));
        $this->display();
    }

    public function invite() {
        $this->assign('uid', I('uid'));
        $this->display();
    }

    public function ajaxInviteList() {
        $data = [];
        $length = I('length', 10);
        $start = I('start', 0);
        $model = D('UserInvite');
        $c = $model->where(['pid' => I('uid')])->field('count(*) as c')->find();
        if ($c['c'] > 0) {
            $data = $model->where(['pid' => I('uid')])->field('id,time')->limit($start, $length)->select();
        }
        exit(json_encode(['aaData' => $data, 'iTotalRecords' => $c['c'], 'iTotalDisplayRecords' => $c['c']]));
    }

    public function ajaxTaskList() {
        $model = M();
        $data = [];
        $length = I('length', 10);
        $start = I('start', 0);
        $sql = 'select count(*) as c from kw_task_' . (I('uid') % 10) . ' where uid = ' . I('uid') . ' and status = 1 limit 1';
        $c = $this->model->query($sql);
        if ($c[0]['c'] > 0) {
            $sql = 'select money,info,timec,timea,ipc,ipa,typeid from kw_task_' . (I('uid') % 10) . ' where uid = ' . I('uid') . ' and status = 1 limit ' . $start . ',' . $length;
            $data = $this->model->query($sql);
        }

        //整合数据
        foreach ($data as $k => $v) {
            $data[$k]['typeid'] = C('TASK_TYPE.' . $data[$k]['typeid']);
            $data[$k]['timec'] = date('Y-m-d H:i:s');
            $data[$k]['timea'] = date('Y-m-d H:i:s');
        }



        exit(json_encode(['aaData' => $data, 'iTotalRecords' => $c[0]['c'], 'iTotalDisplayRecords' => $c[0]['c']]));
    }

    public function ajaxApplyList() {
        $length = I('length', 10);
        $start = I('start', 0);
        $data = $this->model->where(['uid' => I('uid')])->field('money,status,tid,account,time,rtime')->limit($start, $length)->select();
        $c = $this->model->where(['uid' => I('uid')])->field('count(*) as c')->find();

        exit(json_encode(['aaData' => $data, 'iTotalRecords' => $c['c'], 'iTotalDisplayRecords' => $c['c']]));
    }

    /**
     * 状态操作
     */
    public function audit() {
        $array = ['id' => I('post.id'), 'status' => I('post.status')];
        if (I('post.status') == 1) {
            $array['rtime'] = date('Y-m-d H:i:s');
        }
        $result = $this->model->save($array);
        echo $this->model->getError();
        $result !== false && exit(json_encode(['success' => true])) || exit(json_encode(['success' => false, 'info' => $this->model->getDbError()]));
    }

    /**
     * 审核通过列表
     */
    public function approve() {
        $approveList = $this->model->where(['status' => 3])->select();
        $this->assign('approveList', $approveList);
        $this->display();
    }

    /**
     * 不予结算记录
     */
    public function notExchange() {
        $notExchangeList = $this->model->where(['status' => 3])->order('id desc')->select();
        $this->assign('notExchangeList', $notExchangeList);
        $this->display();
    }

    /**
     * 已结算记录
     */
    public function accomplish() {
        $accomplishList = $this->model->where(['status' => 1])->field($model)->select();
        $this->assign('accomplishList', $accomplishList);
        $this->display();
    }
    public function ajax_accomplish(){
        $length = I('length', 10);
        $start = I('start', 0);
        $c = $this->model->where(['status' => 1])->field('count(*) as c')->find();
        $model = 'name,tid ,account,money,time,rtime';
        $accomplishList = $this->model->where(['status' => 1])->field($model)->limit($start,$length)->order('rtime desc')->select();
        exit(json_encode(['aaData' => $accomplishList, 'iTotalRecords' => $c['c'] ,'iTotalDisplayRecords' =>$c['c']  ]));
    }

}
