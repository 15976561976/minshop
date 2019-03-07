<?php

namespace app\common\model;

/**
 * 客户预约明细模型
 * Class BookingDetail
 * @package app\common\model
 */
class BookingDetail extends BaseModel
{
    protected $name = 'booking_detail';

    /**
     * 关联技师信息表（yoshop_booking_worker）
     * @return \think\model\relation\BelongsTo
     */
    public function worker()
    {
        return $this->belongsTo(BookingWorker::class, 'worker_id', 'id');
    }

    /**
     * 关联客户信息表（yoshop_booking_customer）
     * @return mixed
     */
    public function customer()
    {
        return $this->belongsTo(BookingCustomer::class, 'customer_id', 'id');
    }

    /**
     * 预约时间拆分
     * @param $value
     * @return array|string
     */
    public function getBookingTimeAttr($value)
    {
        if (!is_null($value)) {
            $bookingTime = explode(' ', $value);
            $bookingTimeArr = [
                'work_day' => $bookingTime[0],
                'time_line' => $bookingTime[1],
            ];
            return $bookingTimeArr;
        }
        return '';
    }

    /**
     * 获取单条预约明细详情
     * @param $booking_detail_id
     * @return null|static
     */
    public static function detail($booking_detail_id)
    {
        return self::get($booking_detail_id);
    }
}