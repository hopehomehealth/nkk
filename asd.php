<?php

//include './PHPExcel.php';


 
 
/** PHPExcel_IOFactory */
require_once './PHPExcel/IOFactory.php';
 
 

 $filename =  __DIR__ . '/asd.xlsx';
error_reporting(E_ALL);
 
date_default_timezone_set('Asia/ShangHai');
 
/** PHPExcel_IOFactory */
 

 
$reader = PHPExcel_IOFactory::createReader('Excel5'); //设置以Excel5格式(Excel97-2003工作簿)
$PHPExcel = $reader->load("asd.xlsx"); // 载入excel文件
$sheet = $PHPExcel->getSheet(0); // 读取第一個工作表
$highestRow = $sheet->getHighestRow(); // 取得总行数
$highestColumm = $sheet->getHighestColumn(); // 取得总列数
$highestColumm= PHPExcel_Cell::columnIndexFromString($colsNum); //字母列转换为数字列 如:AA变为27
 
/** 循环读取每个单元格的数据 */
for ($row = 1; $row <= $highestRow; $row++){//行数是以第1行开始
    for ($column = 0; $column < $highestColumm; $column++) {//列数是以第0列开始
        $columnName = PHPExcel_Cell::stringFromColumnIndex($column);
        echo $columnName.$row.":".$sheet->getCellByColumnAndRow($column, $row)->getValue()."<br />";
    }
}
 

























//新建 
$resultPHPExcel = new PHPExcel();
//设置参数 
//设值 

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
            $lst[$a] = $b;
        }
    }
    $day[$key] = arraySort($lst, 't');

//    $resultPHPExcel->setActiveSheetIndex($key);
//
//    $resultPHPExcel->getActiveSheet()->setTitle(date('Y-m-d', strtotime($v['t'])));
//    $resultPHPExcel->getActiveSheet()->setCellValue('A1', 'idfa');
//    
//    $resultPHPExcel->getActiveSheet()->setCellValue('B1', 'time');
//    $i = 2;
//    foreach ($list as $ke => $value) {
//        $resultPHPExcel->getActiveSheet()->setCellValue('A' . $i, strtoupper($ke));
//        $resultPHPExcel->getActiveSheet()->setCellValue('B' . $i, date('Y-m-d H:i', $value['t']));
//        $i++;
//    }
//    
//    $resultPHPExcel->getActiveSheet()->getStyle('A1:C1')->getFont()->setBold(true);
//    $resultPHPExcel->getActiveSheet()->setAutoFilter($resultPHPExcel->getActiveSheet()->calculateWorksheetDimension());
//
//    $msgWorkSheet = new PHPExcel_Worksheet($resultPHPExcel); //创建一个工作表
//    $resultPHPExcel->addSheet($msgWorkSheet); //插入工作表
}


$resultPHPExcel->setActiveSheetIndex(0);

$resultPHPExcel->getActiveSheet()->setTitle('idfa');
$resultPHPExcel->getActiveSheet()->setCellValue('A1', 'idfa');

$resultPHPExcel->getActiveSheet()->setCellValue('B1', 'time');


$i = 2;

foreach ($day as $ke => $value) {
    foreach ($value as $kk => $vv) {
        $resultPHPExcel->getActiveSheet()->setCellValue('A' . $i, strtoupper($kk));
        $resultPHPExcel->getActiveSheet()->setCellValue('B' . $i, date('Y/m/d H:i', $vv['t']));
        $i++;
    }
}

$resultPHPExcel->getActiveSheet()->getStyle('A1:C1')->getFont()->setBold(true);
$resultPHPExcel->getActiveSheet()->setAutoFilter($resultPHPExcel->getActiveSheet()->calculateWorksheetDimension());

$msgWorkSheet = new PHPExcel_Worksheet($resultPHPExcel); //创建一个工作表
$resultPHPExcel->addSheet($msgWorkSheet); //插入工作表




header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="' . 'adfa' . '.xls"');
header('Cache-Control: max-age=0');
header('Cache-Control: max-age=1');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
header('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header('Pragma: public'); // HTTP/1.0
$objWriter = PHPExcel_IOFactory::createWriter($resultPHPExcel, 'Excel5');
$objWriter->save('php://output');

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
