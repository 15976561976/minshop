### v2.0.1 ###

# 预约服务功能相关数据表
CREATE TABLE `yoshop_booking_worker` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `worker_name` varchar(60) NOT NULL DEFAULT '' COMMENT '名称',
  `level` varchar(60) NOT NULL DEFAULT '' COMMENT '级别',
  `type_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '服务类型id',
  `avatar_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '头像id',
  `booking_num` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '可被预约数量',
  `describe` text NOT NULL COMMENT '描述',
  `sort` int(10) unsigned NOT NULL COMMENT '排序号',
  `wxapp_id` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='预约服务的技师信息表';

CREATE TABLE `yoshop_booking_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '父id',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '名称',
  `sort` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '排序号',
  `wxapp_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '微信appId',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='预约服务类型表';

CREATE TABLE `yoshop_booking_time` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `worker_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '技师id',
  `work_day` char(10) NOT NULL DEFAULT '' COMMENT '排班日期（年-月-日）',
  `wxapp_id` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='技师每日总班表';

CREATE TABLE `yoshop_booking_schedule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `worker_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '技师id',
  `work_day` varchar(10) NOT NULL DEFAULT '' COMMENT '预约日期',
  `start_time` varchar(16) NOT NULL DEFAULT '' COMMENT '起始时间',
  `end_time` varchar(16) NOT NULL DEFAULT '' COMMENT '结束时间',
  `time_line` varchar(11) NOT NULL DEFAULT '' COMMENT '时间段',
  `booking_num` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '可被预约数',
  `work_time_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '每日排班总表id（对应yoshop_booking_time表id）',
  `wxapp_id` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='技师排班明细表';

CREATE TABLE `yoshop_booking_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '预约客户id（对应yoshop_booking_customer表id）',
  `customer_name` varchar(60) NOT NULL DEFAULT '' COMMENT '客户名称',
  `worker_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '预约技师id',
  `work_day` varchar(10) NOT NULL DEFAULT '' COMMENT '预约日期（格式：Y-m-d）',
  `booking_time` varchar(30) NOT NULL DEFAULT '' COMMENT '预约的时间段',
  `wx_user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '微信用户id（对应yoshop_user表的user_id）',
  `wxapp_id` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='客户预约明细表';

CREATE TABLE `yoshop_booking_customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL DEFAULT '' COMMENT '用户名称',
  `mobile` char(11) NOT NULL DEFAULT '' COMMENT '用户手机号',
  `wx_user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '微信登录用户id（对应yoshop_user表user_id）',
  `wxapp_id` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='预约客户信息表';
