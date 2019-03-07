<?php

namespace app\store\model;
use app\common\model\BookingSchedule as BookingScheduleModel;

/**
 * 技师班表时间段明细模型
 * Class BookingSchedule
 * @package app\store\model
 */
class BookingSchedule extends BookingScheduleModel
{
    /**
     * 添加技师上班时间段明细信息
     * @param $data
     * @param $work_time_id
     * @return false|int
     */
    public function add($data, $work_time_id)
    {
        $timeLine = explode(' - ', $data['time_line']);
        $dataArr = [
            'worker_id' => $data['worker_id'],
            'work_day' => $data['work_day'],
            'start_time' => $data['work_day'] . ' ' . $timeLine[0],
            'end_time' => $data['work_day'] . ' ' . $timeLine[1],
            'time_line' => $timeLine[0] . '-' . $timeLine[1],
            'booking_num' => $data['booking_num'],
            'work_time_id' => $work_time_id,
            'wxapp_id' => self::$wxapp_id,
        ];

        //累加每个时间段可预约数至技师信息表booking_num字段
        $workerInfo = BookingWorker::where('id', $data['worker_id'])->find();
        $workerInfo->booking_num += $data['booking_num'];
        $workerInfo->save();

        return $this->allowField(true)->save($dataArr);
    }

}