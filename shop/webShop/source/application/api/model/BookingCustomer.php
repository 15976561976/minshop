<?php

namespace app\api\model;
use app\common\model\BookingCustomer as BookingCustomerModel;

/**
 * 预约客户模型
 * Class BookingCustomer
 * @package app\api\model
 */
class BookingCustomer extends BookingCustomerModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'wxapp_id',
        'create_time',
        'update_time'
    ];

    /**
     * 添加预约客户信息
     * @param $data
     * @param $userInfo
     * @return false|int
     */
    public function addCustomerInfo($data, $userInfo)
    {
        $data['wxapp_id'] = self::$wxapp_id;
        $data['wx_user_id'] = $userInfo['user_id'];
        return $this->allowField(true)->save($data);
    }

    /**
     * 获取预约客户信息
     * @param $userInfo
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getCustomerInfo($userInfo)
    {
        return $this->where('wx_user_id', $userInfo['user_id'])->select();
    }

    /**
     * 删除预约客户信息
     * @param $data
     * @return int
     */
    public function delCustomerInfo($data)
    {
        return $this->where('id', $data['customer_id'])->delete();
    }
}