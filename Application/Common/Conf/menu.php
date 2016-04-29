<?php

return [
    'MENU' => [
        ['ico' => 'fa-sitemap', 'name' => '广告管理', 'href' => 'App/Index/index'],
        ['ico' => 'fa-bar-chart', 'name' => '数据统计', 'child' => [
                ['href' => 'App/Task/index', 'name' => '任务信息'],
                ['href' => 'App/Index/index', 'name' => '抽奖信息'],
                ['href' => 'App/Index/index', 'name' => '任务信息'],
            ]
        ],
        ['ico' => 'fa-exchange', 'name' => '接口管理', 'child' => [
                ['href' => 'App/Api/index', 'name' => '排重接口'],
                ['href' => 'App/Index/index', 'name' => '回调接口'],
            ]
        ],
        ['ico' => 'fa-exchange', 'name' => '用户管理', 'child' => [
                ['href' => 'App/User/index', 'name' => '用户信息'],
                ['href' => 'App/Index/index', 'name' => ''],
            ]
        ],
        ['ico' => 'fa-exchange', 'name' => '提现管理', 'child' => [
                ['href' => 'App/Redeem/approve', 'name' => '审核通过-未结算'],
                ['href' => 'App/Redeem/accomplish', 'name' => '成功记录-已结算'],
                ['href' => 'App/Redeem/apply', 'name' => '提现申请-待审核'],
                ['href' => 'App/Redeem/notExchange', 'name' => '失败记录-不予结算'],
            ]
        ],
        ['ico' => 'fa-exchange', 'name' => '微信管理', 'child' => [
                ['href' => 'App/U/index', 'name' => '自动回复'],
                ['href' => 'App/Index/index', 'name' => '菜单管理'],
            ]
        ],
    ]
];
