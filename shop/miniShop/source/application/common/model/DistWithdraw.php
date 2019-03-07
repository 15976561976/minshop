<?php

namespace app\common\model;

/**
 * 分销会员提现佣金模型
 * Class DistWithdraw
 * @package app\common\model
 */
class DistWithdraw extends BaseModel
{
    protected $name = 'dist_withdraw_detail';

    protected $updateTime = false;

    /**
     * 关联微信用户表（yoshop_user）
     * @return \think\model\relation\HasOne
     */
    public function user()
    {
        return $this->hasOne('user', 'user_id', 'wx_user_id');
    }

    /**
     * 关联分销会员表(yoshop_dist_user)
     * @return \think\model\relation\HasOne
     */
    public function distUser()
    {
        return $this->hasOne('dist_user', 'id', 'dist_user_id');
    }

    /**
     * 管理银行卡表（yoshop_dist_bank_card）
     * @return \think\model\relation\HasOne
     */
    public function bankCard()
    {
        return $this->hasOne('dist_user_bank_card', 'id', 'bank_card_id');
    }

    public function getWithdrawStatusAttr($value)
    {
        $status = [0 => '待审核', 1 => '待打款', 2 => '已打款', 3 => '无效'];
        return ['status_name' => $status[$value], 'value' => $value];
    }
}