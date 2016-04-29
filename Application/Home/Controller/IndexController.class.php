<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    
        for($i=1;$i<101;$i++){
            echo $i % 10 ;
            echo '<br />';
        }
    }
}


-- 任务状态表

CREATE TABLE `kw_task_1` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_2` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_3` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_4` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_5` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_6` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_7` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_8` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_9` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';

CREATE TABLE `kw_task_0` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `idfa` char(36) DEFAULT NULL COMMENT '用户手机的IDFA',
  `appid` int unsigned DEFAULT '0' COMMENT '应用的ID-其他保存其他id',
  `money` float(6,2) DEFAULT NULL COMMENT '奖励金额',
  `typeid` tinyint(1) DEFAULT '0' COMMENT '类型ID(任务0，徒弟任务奖励1，收徒2，徒孙3 , 徒孙任务奖励4，抽奖5，注册6)',
  `timec` int unsigned NOT NULL DEFAULT 0 comment '点击时间',
  `timea` int unsigned not null default 0 COMMENT '激活时间',
  `ipc` char(15) not null DEFAULT '' COMMENT '点击IP',
  `ipa` char(15) not null DEFAULT '' COMMENT '激活IP',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '试玩状态(0：领任务，1：完成任务, 2：任务超时,3：排重)',
  PRIMARY KEY (`id`),
  key(uid),
  key(appid)
) ENGINE=InnoDB  CHARSET=utf8  COMMENT='用户任务状态表';