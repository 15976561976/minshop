<?php

namespace app\api\model;
use app\common\model\BookingTime as BookingTimeModel;


class BookingTime extends BookingTimeModel
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
     * 获取某一天，以及对应某个服务类型的技师信息
     * @param $data
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getWorker($data)
    {
        return self::hasWhere('worker', function ($q) use ($data) {
                        $q->where('type_id', $data['type_id']);
                    })
                    ->with(['worker', 'worker.avatar'])
                    ->where('work_day', $data['work_day'])
                    ->select();
    }
}