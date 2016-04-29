<?php

namespace App\Controller;

use Home\Controller\BaseController;

class UserController extends BaseController {

    public function __construct() {
        parent::__construct();
        $this->model = M('User');
    }

    public function index() {

        $this->display();
    }

    public function ajaxUserList() {
        $length = I('length', 10);
        $start = I('start', 0);
        $where = I('search');
        $where = trim($where['value']);
        $where = $where ? (is_numeric($where) ? ' where u.id = '. $where : ' where idfa = "' . $where . '"' ) : '';
        
        $sql = 'select u.id,money,openid,idfa,address,nickname,ip,status,reg_time
                 from kw_user as u left join kw_user_weixin as uw on u.id = uw.id ' . $where  . ' order by u.id desc limit ' . $start . ',' . $length;
        $data = $this->model->query($sql);
        $sql = 'select count(*) as c from kw_user as u ' . $where  . ' limit 1';
        $c = $this->model->query($sql);
        exit(json_encode(['aaData' => $data, 'iTotalRecords' => $c[0]['c'] ,'iTotalDisplayRecords' =>$c[0]['c']  ]));
    }

    public function testAddUser() {
        $array = [8, 4, 4, 4, 12];
        for ($i = 10001; $i < 100001; $i++) {
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
            $status = rand(0, 1);
            $money = rand(0, 999);
            $ip = rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255);
            $sql = "insert into kw_user (`idfa`,`money`,`ip`,`status`)"
                    . "values ('{$idfa}','{$money}','{$ip}',$status);";
            $this->model->execute($sql);
            $uid = $this->model->getLastInsID();
            $openid = dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15)) . dechex(rand(0, 15));
            $sex = rand(0, 3);
            $sql = "insert into kw_user_weixin (`id`,`openid`,`sex`)"
                    . "values ({$uid},'{$openid}','{$sex}');";
            $this->model->execute($sql);
        }
    }

}
