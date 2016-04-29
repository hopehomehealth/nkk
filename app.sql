
-- 应用表
CREATE TABLE `kw_app` (
  appid int unsigned NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL DEFAULT '' COMMENT 'app名称',
  `img` varchar(256) DEFAULT NULL COMMENT '图标',
  `guide` varchar(32) DEFAULT NULL COMMENT '提示语',
  `appstoreUrl` varchar(256) DEFAULT NULL COMMENT '广告链接',
  `keywords` varchar(64) not null DEFAULT '' COMMENT '关键词',
  `version` varchar(16) not null DEFAULT '' COMMENT '版本号',
  `status` tinyint(3) unsigned DEFAULT 0 COMMENT '1 投放 显示,3 停止投放 显示,4 不显示',
  
  `actionTime` int(10) unsigned not null default 0  COMMENT '监控时长',
  `remark` varchar(256) DEFAULT NULL COMMENT '上传激活接口',
  `validAtion` tinyint(3) unsigned DEFAULT '0' comment '是否排重',
  `validUrl` varchar(256) not null DEFAULT '' comment '排重地址',
  `validReturn` varchar(256) not null DEFAULT '' comment '排重返回',
  `validType` tinyint(1) DEFAULT '1' COMMENT '1 GET 2 POST',
  `validParams` char(250) DEFAULT NULL,
  `location` int(10) unsigned DEFAULT '1' COMMENT 'APP搜索位置',
  `padProcessName` varchar(255) DEFAULT NULL,
  `creatTime` TIMESTAMP  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endTime` TIMESTAMP  ,
  `callbackUrl` varchar(255) DEFAULT NULL comment '',
  clickUrl varchar(255) not null default '' comment '点击上报' ,
  `pro` varchar(255) DEFAULT NULL COMMENT '打开应用地址',
  `processName` varchar(255) DEFAULT NULL COMMENT '进程名',
  `remarkParams` varchar(255) DEFAULT '上报激活验证参数',
  PRIMARY KEY (`appid`)
) ENGINE=myisam DEFAULT CHARSET=utf8;

CREATE TABLE `kw_app_action` (
  appid int unsigned NOT NULL,
 `reward` float(4,2) DEFAULT '0.00' COMMENT '奖励',
 `amount` int unsigned DEFAULT 0 COMMENT '总量',
 `amountA` int(10) unsigned DEFAULT '0' COMMENT '执行量',
 `click` int(11) DEFAULT '0' COMMENT '点击数',
  PRIMARY KEY (`appid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 用户表

CREATE TABLE `kw_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idfa` char(45) not null COMMENT '用户手机的IDFA',
  `money` char(2) DEFAULT '0.00' COMMENT '用户的余额',
  `ip` char(30) not null DEFAULT '0.0.0.0' COMMENT '用户的IP地址',
  `status` tinyint(1) DEFAULT '1' COMMENT '0：禁用, 1：启用',
  `address` char(100) DEFAULT NULL COMMENT '用户地址',
  `device` char(20) DEFAULT 'iphone' COMMENT 'Android,Iphone',
  `reg_time` TIMESTAMP  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='用户表';

	--用户 微信 信息表
CREATE TABLE `kw_user_weixin` (
  `id` int(11) DEFAULT NULL,
  `openid` char(36) NOT NULL DEFAULT '' COMMENT '微信唯一标识',
  `sex` tinyint(1) DEFAULT '1' COMMENT '0 保密，1 男，2 女',
  `nickname` varchar(40) not null DEFAULT '' COMMENT '微信昵称',
  `headimgurl` varchar(255) not null DEFAULT '' COMMENT '微信头像地址',
  PRIMARY KEY (`id`)
) ENGINE=myisam DEFAULT CHARSET=utf8 COMMENT='用户微信信息表';
   --用户手机信息表
CREATE TABLE `kw_user_mobile` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(256) not null DEFAULT '',
  `pn` varchar(256)  not null DEFAULT '',
  `w` int(11) not null DEFAULT 0,
  `h` int(11) not null DEFAULT 0,
  `os` varchar(255)  not null DEFAULT '',
  `ver` varchar(255)  not null DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=myisam DEFAULT CHARSET=utf8 COMMENT='用户手机信息表';

-- 师徒表

CREATE TABLE `kw_user_invite` (
  `id` int(11) unsigned NOT NULL,
  `pid` int(11) unsigned NOT NULL COMMENT '师父ID',
  `time` TIMESTAMP  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '建立关系时间',
  key(pid),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户邀请关系表';


-- 用户兑换表

CREATE TABLE `kw_user_redeem` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `money` char(5) NOT NULL COMMENT '用户兑换金额',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '兑换标识(0 申请，1，已完成，2 不予结算 3 已审核，)',
  `tid` tinyint(1) DEFAULT '1' COMMENT '1:支付宝,2微信',
  `name` char(10) not null DEFAULT '' COMMENT '姓名',
  `account` char(50) not null DEFAULT '' COMMENT '账号',
  `time` TIMESTAMP  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户申请时间',
  `rtime` TIMESTAMP COMMENT '兑换时间' ,
  key(uid),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户兑换记录表';



CREATE TABLE `kw_api_valid` (
  `appid` int NOT NULL,
  `appname` char(32) NOT NULL,
  `type` char(10) NOT NULL,
  `params` varchar(100) DEFAULT NULL,
  `result` varchar(100) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=myisam  DEFAULT CHARSET=utf8;








-- 任务状态表

CREATE TABLE `kw_task_1` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';


        


CREATE TABLE `kw_task_2` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_3` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_4` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_5` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_6` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_7` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_8` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_9` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_0` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,`uid` int unsigned NOT NULL ,
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `info` char(200) not null DEFAULT '' COMMENT 'appname|徒弟名称|抽奖5',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` char(2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  key(uid),key(typeid,appid,timec),PRIMARY KEY (`id`)
) ENGINE=myisam  CHARSET=utf8  COMMENT='用户任务状态表';

insert into kw_task_0 ('uid','idfa','appid','money','typeid','timec','timea','status')value ('','',)



select count(*) as c from  ( (select *,0 as tid from kw_task_0 ) 
union (select *,1 as tid from kw_task_1 )
union (select *,2 as tid from kw_task_2 )
union (select *,3 as tid from kw_task_3 )
union (select *,4 as tid from kw_task_4 )
union (select *,5 as tid from kw_task_5 )
union (select *,6 as tid from kw_task_6 )
union (select *,7 as tid from kw_task_7 )
union (select *,8 as tid from kw_task_8 )
union (select *,9 as tid from kw_task_9 ) ) as a
GROUP BY timec
order by c desc
2009  0.121s


select count(*) as c from  ( (select *,0 as tid from kw_task_0 ) 
union (select *,1 as tid from kw_task_1 )
union (select *,2 as tid from kw_task_2 )
union (select *,3 as tid from kw_task_3 )
union (select *,4 as tid from kw_task_4 )
union (select *,5 as tid from kw_task_5 )
union (select *,6 as tid from kw_task_6 )
union (select *,7 as tid from kw_task_7 )
union (select *,8 as tid from kw_task_8 )
union (select *,9 as tid from kw_task_9 ) ) as a
GROUP BY timec
order by c desc

select * from  ( 
(select *,0 as tid from kw_task_0  where kw_task_0.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380 ) 
union all (select *,1 as tid from kw_task_1 where kw_task_1.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380 )
union all (select *,2 as tid from kw_task_2 where kw_task_2.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,3 as tid from kw_task_3 where kw_task_3.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,4 as tid from kw_task_4 where kw_task_4.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,5 as tid from kw_task_5 where kw_task_5.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,6 as tid from kw_task_6 where kw_task_6.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,7 as tid from kw_task_7 where kw_task_7.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,8 as tid from kw_task_8 where kw_task_8.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380)
union all (select *,9 as tid from kw_task_9 where kw_task_9.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380) ) as a

explain select *,0 as tid from kw_task_0  where kw_task_0.typeid=0 and appid=703358067 and timec > 1461893992 and timec < 1461894380







select count(*) as c from  ( 
(select *,0 as tid from kw_task_0   ) 
union (select *,1 as tid from kw_task_1  )
union (select *,2 as tid from kw_task_2  )
union (select *,3 as tid from kw_task_3 )
union (select *,4 as tid from kw_task_4)
union (select *,5 as tid from kw_task_5 )
union (select *,6 as tid from kw_task_6 )
union (select *,7 as tid from kw_task_7 )
union (select *,8 as tid from kw_task_8 )
union (select *,9 as tid from kw_task_9 ) ) as a
GROUP BY timec
order by c desc








draw:1
columns[0][data]:id
columns[0][name]:
columns[0][searchable]:true
columns[0][orderable]:true
columns[0][search][value]:
columns[0][search][regex]:false
columns[1][data]:money
columns[1][name]:
columns[1][searchable]:true
columns[1][orderable]:true
columns[1][search][value]:
columns[1][search][regex]:false
columns[2][data]:openid
columns[2][name]:
columns[2][searchable]:true
columns[2][orderable]:true
columns[2][search][value]:
columns[2][search][regex]:false
columns[3][data]:idfa
columns[3][name]:
columns[3][searchable]:true
columns[3][orderable]:true
columns[3][search][value]:
columns[3][search][regex]:false
columns[4][data]:address
columns[4][name]:
columns[4][searchable]:true
columns[4][orderable]:true
columns[4][search][value]:
columns[4][search][regex]:false
columns[5][data]:nickname
columns[5][name]:
columns[5][searchable]:true
columns[5][orderable]:true
columns[5][search][value]:
columns[5][search][regex]:false
columns[6][data]:ip
columns[6][name]:
columns[6][searchable]:true
columns[6][orderable]:true
columns[6][search][value]:
columns[6][search][regex]:false
columns[7][data]:status
columns[7][name]:
columns[7][searchable]:true
columns[7][orderable]:true
columns[7][search][value]:
columns[7][search][regex]:false
columns[8][data]:reg_time
columns[8][name]:
columns[8][searchable]:true
columns[8][orderable]:true
columns[8][search][value]:
columns[8][search][regex]:false
order[0][column]:0
order[0][dir]:asc
start:0
length:10
search[value]:
search[regex]:false