<?php

namespace app\api\model;
use app\common\model\DistUser as DistUserModel;
use app\common\exception\BaseException;

/**
 * 分销会员模型类
 * Class DistUser
 * @package app\api\model
 */
class DistUser extends DistUserModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'create_time',
        'update_time'
    ];

    /**
     * 分销会员注册
     * @param $post
     * @return false|int
     * @throws BaseException
     */
    public function register($post)
    {
        if (!$disUser = $this->allowField(true)->save($post)) {
            throw new BaseException(['msg' => '注册失败']);
        }
        return $disUser;
    }

    /**
     * 分销中心——获取佣金相关基本数据
     * @param $dist_user_id
     * @return array|false|\PDOStatement|string|\think\Model
     */
    public function getBaseAmount($dist_user_id)
    {
        return $this->where('id', '=',$dist_user_id)
                    ->field(['withdrawing_amount', 'withdrawed_amount', 'unsettled_amount'])
                    ->find();
    }

    /**
     * 分销佣金——获取分销佣金相关信息
     * @param $dist_user_id
     * @return array|false|\PDOStatement|string|\think\Model
     */
    public function getDistAmount($dist_user_id)
    {
        return $this->where('id', $dist_user_id)
                    ->field(['withdrawing_amount', 'withdrawed_amount',
                        '(withdrawing_amount + unsettled_amount) as dist_all_amount', 'wait_pay_amount'])
                    ->find();
    }

}