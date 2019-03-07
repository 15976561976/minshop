<?php

namespace app\store\model;
use app\common\model\BookingDetail as BookingDetailModel;

/**
 * 后台客户预约明细管理模型
 * Class BookingDetail
 * @package app\store\model
 */
class BookingDetail extends BookingDetailModel
{
    /**
     * 获取客户预约明细列表
     * @return \think\Paginator
     */
    public function getList()
    {
        return $this->with(['worker', 'worker.type', 'customer'])
                    ->order('id', 'desc')
                    ->paginate(15);
    }

    /**
     * 客户预约完成操作
     * @return false|int
     */
    public function complete()
    {
        return $this->allowField(true)->save(['booking_status' => 1]);
    }

}