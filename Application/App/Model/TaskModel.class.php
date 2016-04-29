<?php

namespace App\Model;

class TaskModel extends \Think\Model {

//    protected $autoCheckFields = false;

    public function __construct($name = '', $tablePrefix = '', $connection = '') {
//       $this->autoCheckFields = false;  
        parent::__construct($name, $tablePrefix, $connection);
//        $this->db($linkNum, $config);
    }

    public function getDayTaskList() {
        if (!$data = S('dayTaskList')) {
            //默认取当天的前 C('dayTaskList') 条数据
            $time = strtotime(date('Y-m-d'));
            $sql = 'select * from  
                    ( 
                        (select *,0 as tid from kw_task_0 where timec > ' . $time . ') 
                        union (select *,1 as tid from kw_task_1 where timec > ' . $time . ') 
                        union (select *,2 as tid from kw_task_2 where timec > ' . $time . ') 
                        union (select *,3 as tid from kw_task_3 where timec > ' . $time . ') 
                        union (select *,4 as tid from kw_task_4 where timec > ' . $time . ') 
                        union (select *,5 as tid from kw_task_5 where timec > ' . $time . ') 
                        union (select *,6 as tid from kw_task_6  where timec > ' . $time . ') 
                        union (select *,7 as tid from kw_task_7  where timec > ' . $time . ') 
                        union (select *,8 as tid from kw_task_8  where timec > ' . $time . ') 
                        union (select *,9 as tid from kw_task_9  where timec > ' . $time . ') 
                    ) as a order by a.timec desc ';
            $limit = C('dayTaskList') ? 'limit ' . C('dayTaskList') : '';
            $sql .= $limit;
            $data = $this->query($sql);
            S('dayTaskList', $data, C('dayTaskListCache'));
        }

        return ['taskList' => $data];
    }

    /**
     * 整合任务信息
     */
    private function integration($data) {
        $list = [];
        foreach($data as $k=>$v){
            
            switch ($data[$k]['typeid']){
                case 0 : //任务
                    break;
                case 1 : //徒弟任务奖励
                    break;
                case 2:  //收徒
                    break;
                case 2:  //收徒
                    break;
                
                    
            }
            
            
            
            
            $list[$k]['typeid'] = C('TASK_TYPE.' .  $data[$k]['typeid']);
            $list[$k]['timec'] = date('Y-m-d H:i:s');
            $list[$k]['timea'] = date('Y-m-d H:i:s');
            
            
            
        }
        
        
    }

}
