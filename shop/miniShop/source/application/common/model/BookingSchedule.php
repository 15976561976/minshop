<?php

namespace app\common\model;

/**
 * 技师排班表时间段明细模型
 * Class BookingSchedule
 * @package app\common\model
 */
class BookingSchedule extends BaseModel
{

    protected $name = 'booking_schedule';

    /**
     * 关联技师信息表
     * @return \think\model\relation\BelongsTo
     */
    public function worker()
    {
        return $this->belongsTo(BookingWorker::class, 'worker_id', 'id');
    }

}