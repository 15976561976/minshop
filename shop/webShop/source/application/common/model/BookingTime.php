<?php

namespace app\common\model;

/**
 * 技师排班总表模型
 * Class BookingTime
 * @package app\common\model
 */
class BookingTime extends BaseModel
{

    protected $name = 'booking_time';

    /**
     * 关联技师信息表
     * @return \think\model\relation\BelongsTo
     */
    public function worker()
    {
        return $this->belongsTo(BookingWorker::class, 'worker_id', 'id');
    }

    /**
     * 关联上班明细表（yoshop_booking_schedule）
     * @return \think\model\relation\HasMany
     */
    public function schedule()
    {
        return $this->hasMany(BookingSchedule::class, 'work_time_id', 'id')->where('end_time', '>', date('Y-m-d H:i'));
    }

}