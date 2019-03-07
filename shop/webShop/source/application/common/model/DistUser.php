<?php

namespace app\common\model;

/**
 * 分销会员模型类
 * Class DistUser
 * @package app\common\model
 */
class DistUser extends BaseModel
{
    protected $name = 'dist_user';

    /**
     * 关联微信用户信息表（yoshop_user）
     * @return \think\model\relation\HasOne
     */
    public function user()
    {
        return $this->hasOne('user', 'dist_user_id', 'id');
    }

    /**
     * 关联分销会员小程序码表（yoshop_dist_user_code）
     * @return \think\model\relation\HasOne
     */
    public function distUserCode()
    {
        return $this->hasOne('distUserCode', 'dist_user_id', 'id');
    }

    /**
     * 获取分销员信息
     * @param $dist_user_id
     * @return null|static
     */
    public static function detail($dist_user_id)
    {
        return self::get($dist_user_id);
    }

    /**
     * 分销会员未结算佣金，以及可提现佣金对应字段值更新
     * @param $wx_user_id       分销会员下的好友微信用户id
     * @param $order_id         订单id
     * @param $type             订单类型(payed:已付款，complete:已完成)
     * @return bool
     */
    public static function amountCalculation($wx_user_id, $order_id, $type)
    {
        //判断是否存在于分销订单下（有可能是非好友关系下所成的订单）
        $map = [
            'wx_user_id' => $wx_user_id,
            'order_id' => $order_id,
        ];
        $distOrderInfo = (new DistOrder)->where($map)->find();
        if ($distOrderInfo) {
            $distUserInfo = self::detail($distOrderInfo['dist_user_id']);
            $orderPayPrice = (new Order)->where('order_id', $order_id)->value('pay_price');
            //更新分销会员未结算金额——来源：分销好友订单付款但未确认收货，应结算的佣金之和.
            if ($type === 'paying') {
                $distUserInfo['unsettled_amount'] += $orderPayPrice * $distUserInfo['discount'];//round(($orderPayPrice * $distUserInfo['discount']) / 100);
                $distUserInfo->save();
            //更新分销会员可提现金额——来源：分销好友订单付款并确认收货后，所结算的佣金之和.
            } elseif ($type === 'complete') {
                $distUserInfo['withdrawing_amount'] += ($orderPayPrice * $distUserInfo['discount']);//round(($orderPayPrice * $distUserInfo['discount']) / 100);
                $distUserInfo['unsettled_amount'] -= ($orderPayPrice * $distUserInfo['discount']);//round(($orderPayPrice * $distUserInfo['discount']) / 100);
                $distUserInfo->save();
            }
        }
        return true;
    }

    /**
     * 分销会员待打款佣金，以及已提现佣金对应字段值更新
     * @param $dist_user_id         分销会员id
     * @param $withdraw_price       提现金额
     * @param $type                 提现状态（wait：待打款；withdrawed：已打款）
     * @return bool
     */
    public static function withdrawCalculation($dist_user_id, $withdraw_price, $type)
    {
        $distUserInfo = self::detail($dist_user_id);
        //待打款佣金——来源：分销会员提现申请审核通过后，进入待打款状态，其状态下的佣金之和，即为该分销会员待打款佣金；
        if ($type === 'wait') {
            $distUserInfo->wait_pay_amount += $withdraw_price;
            $distUserInfo->save();
        //已提现佣金——来源：分销会员提现，后台确认打款后，即为该分销会员已打款佣金
        } elseif ($type === 'withdrawed') {
            $distUserInfo->withdrawed_amount += $withdraw_price;
            $distUserInfo->wait_pay_amount -= $withdraw_price;
            $distUserInfo->save();
        }
        return true;
    }
}