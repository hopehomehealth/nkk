<?php

namespace App\Controller;

use Home\Controller\BaseController;

class IndexController extends BaseController {

    public function __construct() {
        parent::__construct();
        $this->model = D('app');
    }

    //app 列表
    public function index() {
        $sql = 'select * from kw_app as app inner join kw_app_action as aa on app.appid=aa.appid order by `status`';
        $data = $this->model->query($sql);
        $this->assign('data', $data);
        $this->display();
    }

    public function add() {
        $appid = $this->model->add($_POST);
        $actionModel = D('AppAction');
        $actionModel->add($_POST);
        $array = [
            'appid' => I('post.appid'),
            'name' => I('post.name'),
            'keywords' => I('post.keywords'),
            'amount' => I('post.amount'),
            'amountA' => 0,
            'click' => 0,
            'status' => I('post.status') == 1 ? '投放' : '未投放',
            'isshow' => I('post.isshow') == 4 ? '否' : '是',
        ];
        $appid && exit(json_encode(['success' => true, 'data' => $array])) || exit(json_encode(['success' => false, 'data' => $this->model->getDbError()]));
    }

    public function edit() {
        if (I('post.dosubmit')) {
            $this->model->save($_POST);
            $actionModel = D('AppAction');
            $actionModel->save($_POST);
            $array = [
                'id' => I('post.appid'),
                'appid' => I('post.appid'),
                'name' => I('post.name'),
                'keywords' => I('post.keywords'),
                'amount' => I('post.amount'),
                'amountA' => 0,
                'click' => 0,
                'status' => I('post.status') == 1 ? '投放' : '未投放',
                'isshow' => I('post.isshow') == 4 ? '否' : '是',
            ];
            1 && exit(json_encode(['success' => true, 'data' => $array])) || exit(json_encode(['success' => false, 'data' => $this->model->getDbError()]));
        }
        $sql = 'select * from kw_app as app inner join kw_app_action as aa on app.appid=aa.appid where app.appid = ' . I('post.appid');
        $data = $this->model->query($sql);
        exit(json_encode(['success' => true, 'data' => $data[0]]));
    }

    public function conf() {
        if (I('post.type')) {
            $data = $this->model->find(I('post.appid'));
            exit(json_encode(['success' => true, 'data' => $data]));
        }
        if ($this->model->save($_POST)) {
            exit(json_encode(['success' => true]));
        }
        exit(json_encode(['success' => true, 'data' => $this->model->getDbError()]));
    }

    public function ecx() {
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getProperties()->setCreator('Maarten Balliauw')
                ->setLastModifiedBy('Maarten Balliauw')
                ->setTitle('xiaohua title')
                ->setSubject('xiaohua subject')
                ->setDescription('xiaohua desc.')
                ->setKeywords('xiaohua key')
                ->setCategory('shenghuo');
        $sum = 0;
        ini_set('memory_limit', '512M');
        set_time_limit(1800);
        $list = [];
        $str = '';
        $array = [8, 4, 4, 4, 12];
        $times = [
            ['t' => '2016/04/01 15:00', 'n' => '1000'],
            ['t' => '2016/04/02 15:00', 'n' => '2500'],
            ['t' => '2016/04/03 15:00', 'n' => '1500'],
            ['t' => '2016/04/04 15:00', 'n' => '3800'],
            ['t' => '2016/04/05 15:00', 'n' => '1882'],
            ['t' => '2016/04/06 15:00', 'n' => '2125'],
            ['t' => '2016/04/07 15:00', 'n' => '1500'],
            ['t' => '2016/04/08 15:00', 'n' => '1500'],
        ];
        foreach ($times as $key => $v) {
            $sum = $sum + $v['n'];
            while (count($list) < $sum) {
                $str = '';
                foreach ($array as $v1) {
                    for ($i = 0; $i < $v1; $i++) {
                        $str .= dechex(rand(0, 15));
                    }
                    $str .= '-';
                }
                $time = strtotime($v['t']);
                $endtime = $time + 32400;
                $list[trim($str, '-')] = ['t' => rand($time, $endtime), 'le' => $key];
            }
            $lst = [];
            foreach ($list as $a => $b) {
                if ($b['le'] == $key) {
                    $b['key'] = $a;
                    $lst[$a] = $b;
                }
            }
            $day[$key] = $this->arraySort($lst, 't');


            $objPHPExcel->setActiveSheetIndex($key); //设置第一个工作表为活动工作表
            $objPHPExcel->getActiveSheet()->setTitle($v['t']);
            $objPHPExcel->getActiveSheet()->setCellValue('A1', 'IDFA')
                    ->setCellValue('B1', '点击');
            $objPHPExcel->getActiveSheet()->fromArray($day[$key], NULL, 'A2');
            $objPHPExcel->getActiveSheet()->getStyle('A1:C1')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->setAutoFilter($objPHPExcel->getActiveSheet()->calculateWorksheetDimension());
            $objPHPExcel->setActiveSheetIndex($key);
            $msgWorkSheet = new PHPExcel_Worksheet($objPHPExcel, 'card_message'); //创建一个工作表
            $objPHPExcel->addSheet($msgWorkSheet); //插入工作表
        }



        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $name . '.xls"');
        header('Cache-Control: max-age=0');
        header('Cache-Control: max-age=1');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
        header('Cache-Control: cache, must-revalidate'); // HTTP/1.1
        header('Pragma: public'); // HTTP/1.0
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save('php://output');
    }

    /**
     * @desc arraySort php二维数组排序 按照指定的key 对数组进行排序
     * @param array $arr 将要排序的数组
     * @param string $keys 指定排序的key
     * @param string $type 排序类型 asc | desc
     * @return array
     */
    function arraySort($arr, $keys, $type = 'asc') {
        $keysvalue = $new_array = array();
        foreach ($arr as $k => $v) {
            $keysvalue[$k] = $v[$keys];
        }
        $type == 'asc' ? asort($keysvalue) : arsort($keysvalue);
        reset($keysvalue);
        foreach ($keysvalue as $k => $v) {
            $new_array[$k] = $arr[$k];
        }
        return $new_array;
    }

}
