<?php

return [
    /* 数据库配置 */
    'DB_ADSYSTEM_addb' => [                    //系统信息配置
        'db_type' => 'PDO', // 数据库类型
        'db_user' => 'adSystem', // 用户名
        'db_pwd' => '6KH4U69EZaP6sbym', // 密码
        'db_host' => '192.168.0.1', // 服务器地址
        'db_port' => '3306', // 端口
        'db_name' => 'adSystem', // 数据库名
        // 'DB_PREFIX' => '', // 数据库表前缀 
        'DB_DSN' => 'mysql:host=192.168.0.1;dbname=adSystem;',
        'DB_PARAMS' => array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL)
    ],
    'LOAD_EXT_CONFIG' => 'task,redeem',
];
