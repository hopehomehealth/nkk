<?php

return [

    'TASK_TYPE' => [
        0 => '官方任务',
        1 => '徒弟任务奖励',
        2 => '收徒任务',
        3 => '徒孙',
        4 => '徒孙任务奖励',
        5 => '抽奖',
        6 => '注册',
    ],
    'TASK_STATUS' => [
        0 => '领任务',
        1 => '完成任务',
        2 => '任务超时',
        3 => '排重'
    ],
    'dayTaskList' => 2000, //dayTaskList 取当天多少条信息，0为全部 
    'dayTaskListCache' => 30, //dayTaskList 缓存时间 秒
];
