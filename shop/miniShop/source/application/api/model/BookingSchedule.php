<?php

namespace app\api\model;
use app\common\model\BookingSchedule as BookingScheduleModel;

/**
 * 技师排班表时间段明细模型
 * Class BookingSchedule
 * @package app\api\model
 */
class BookingSchedule extends BookingScheduleModel
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
     * 获取技师某一天排班时间段明细
     * @param $data
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getTimeLine($data)
    {
        return $this->where('worker_id', $data['worker_id'])
                    ->where('work_day', $data['work_day'])
                    ->where('end_time', '>', date('Y-m-d H:i'))
                    ->field(['worker_id', 'work_day', 'time_line', 'booking_num'])
                    ->select();
    }
}