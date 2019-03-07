<?php

namespace app\common\model;

/**
 * 预约技师信息模型
 * Class BookingWorker
 * @package app\common\model
 */
class BookingWorker extends BaseModel
{
    protected $name = 'booking_worker';

    /**
     * 技师头像
     * @return \think\model\relation\HasOne
     */
    public function avatar()
    {
        return $this->hasOne(UploadFile::class, 'file_id', 'avatar_id');
    }

    /**
     * 技师服务类型（关联yoshop_booking_type）
     * @return \think\model\relation\HasOne
     */
    public function type()
    {
        return $this->hasOne(BookingType::class, 'id', 'type_id')->field(['id', 'name']);
    }
}