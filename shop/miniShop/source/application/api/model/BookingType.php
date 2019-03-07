<?php

namespace app\api\model;
use app\common\model\BookingType as BookingTypeModel;


class BookingType extends BookingTypeModel
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
     * 服务类型模糊搜索
     * @param $keyword
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getTypeList($keyword)
    {
        return $this->where('name', 'like', '%'. $keyword .'%')
                    ->where('parent_id', '>', 0)
                    ->field(['id', 'name'])
                    ->select();
    }

}