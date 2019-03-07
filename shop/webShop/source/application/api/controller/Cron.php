<?php

namespace app\api\controller;
use app\api\model\BookingDetail;

/**
 * 定时任务控制器
 * Class Cron
 * @package app\api\controller
 */
class Cron
{
    /**
     * 核查客户的预约师傅过期
     * @return bool
     */
    public function checkBookingExpire()
    {
        $map = [
            'booking_status' => 0,
            'work_day' => ['<', date('Y-m-d', strtotime("+1 day"))]
        ];
        $bookingDetails = BookingDetail::where($map)->select();
        foreach ($bookingDetails as $key => $val) {
            $endTime = $val['work_day'] . ' ' . explode('-', $val['booking_time']['time_line'])[1];
            if ($endTime < date('Y-m-d H:i')) {
                $val->save(['booking_status' => 3]);
            }
        }
        return true;
    }
}