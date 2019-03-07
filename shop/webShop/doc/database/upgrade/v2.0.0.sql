### v2.0.0 ###

# 二级分销功能相关数据表
CREATE TABLE `yoshop_dist_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分销商会员id',
  `full_name` varchar(60) NOT NULL DEFAULT '' COMMENT '姓名',
  `mobile` char(11) NOT NULL DEFAULT '' COMMENT '手机号',
  `email` varchar(60) NOT NULL DEFAULT '' COMMENT '邮箱',
  `wx_user_id` int(10) unsigned NOT NULL COMMENT '微信授权登录用户id（对应yoshop_user表的user_id）',
  `wx_nickname` varchar(255) NOT NULL COMMENT '微信昵称',
  `wxapp_id` int(10) unsigned NOT NULL COMMENT '微信appId',
  `withdrawing_amount` decimal(10,0) unsigned NOT NULL COMMENT '可提现佣金',
  `withdrawed_amount` decimal(10,0) unsigned NOT NULL COMMENT '已提现佣金',
  `unsettled_amount` decimal(10,0) unsigned NOT NULL COMMENT '未结算佣金',
  `wait_pay_amount` decimal(10,0) unsigned NOT NULL COMMENT '待打款佣金',
  `discount` tinyint(255) unsigned NOT NULL COMMENT '佣金百分比',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='分销会员表';

alter table yoshop_user add column `dist_user_id` int(10) unsigned NOT NULL COMMENT '分销会员id（对应yoshop_dist_user表id）';

CREATE TABLE `yoshop_dist_relation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '好友关系表id',
  `dist_user_id` int(10) unsigned NOT NULL COMMENT '分销会员id(对应yoshop_dist_user表的user_id)',
  `wx_user_id` int(10) unsigned NOT NULL COMMENT '好友微信登录用户id(对应yoshop_user表的user_id)',
  `wxapp_id` int(10) unsigned NOT NULL,
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_wx_dist_user` (`dist_user_id`,`wx_user_id`) USING BTREE COMMENT '分销会员id与微信用户id组合唯一'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='分销会员好友关系表';

CREATE TABLE `yoshop_dist_withdraw_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '分销会员提现明细表id',
  `dist_user_id` int(11) unsigned NOT NULL COMMENT '分销会员id（对应yoshop_dist_user表的id）',
  `withdraw_price` decimal(10,0) unsigned NOT NULL DEFAULT '0' COMMENT '提现的金额',
  `withdraw_status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '提现的状态（0：待审核；1：待打款；2：已打款；3：无效）',
  `bank_card_id` int(11) unsigned NOT NULL COMMENT '银行卡id（对应yoshop_dist_bank_card表的id）',
  `wx_user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '微信授权登录用户id（对应yoshop_user表的user_id）',
  `wxapp_id` int(10) unsigned NOT NULL COMMENT '微信appId',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='分销会员提现明细表';

CREATE TABLE `yoshop_dist_bank_card` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '分销会员银行卡绑定表id',
  `dist_user_id` int(11) unsigned NOT NULL COMMENT '分销会员id',
  `bank_card_name` varchar(60) NOT NULL COMMENT '银行卡名称',
  `bank_card_num` varchar(30) NOT NULL COMMENT '银行卡号',
  `wxapp_id` int(10) unsigned NOT NULL COMMENT '微信appId',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='分销会员对应银行卡信息表';

CREATE TABLE `yoshop_dist_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dist_user_id` int(10) unsigned NOT NULL COMMENT '分销会员id（对应yoshop_dist_user表id）',
  `wx_user_id` int(10) unsigned NOT NULL COMMENT '分销好友微信用户id（对应yoshop_user表user_id）',
  `order_id` int(10) unsigned NOT NULL COMMENT '订单id（对应yoshop_order表order_id）',
  `wxapp_id` int(10) unsigned NOT NULL COMMENT '微信appId',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='分销订单表';

