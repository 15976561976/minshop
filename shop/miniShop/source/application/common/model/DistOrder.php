<?php

namespace app\common\model;

/**
 * 分销订单模型
 * Class DistOrder
 * @package app\common\model
 */
class DistOrder extends BaseModel
{

    protected $name = 'dist_order';

    protected $updateTime = false;

    /**
     * 关联分销会员表（yoshop_dist_user）
     * @return \think\model\relation\HasOne
     */
    public function distUser()
    {
        return $this->hasOne('distUser', 'id', 'dist_user_id');
    }

    /**
     * @return \think\model\relation\HasOne
     */
    public function order()
    {
        return $this->hasOne('');
    }


}