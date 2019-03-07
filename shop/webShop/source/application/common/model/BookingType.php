<?php

namespace app\common\model;

use think\Cache;

/**
 * 预约服务类型模型
 * Class BookingType
 * @package app\common\model
 */
class BookingType extends BaseModel
{

    protected $name = 'booking_type';

    /**
     * 所有服务类型
     * @return mixed
     */
    public static function getALL()
    {
        $model = new static;
//        if (!Cache::get('booking_type_' . $model::$wxapp_id)) {
            $data = $model->order(['sort' => 'asc'])->select();
            $all = !empty($data) ? $data->toArray() : [];
            $tree = [];
            foreach ($all as $first) {
                if ($first['parent_id'] != 0) continue;
                $twoTree = [];
                foreach ($all as $two) {
                    if ($two['parent_id'] != $first['id']) continue;
                    $threeTree = [];
                    foreach ($all as $three)
                        $three['parent_id'] == $two['id']
                        && $threeTree[$three['id']] = $three;
                    !empty($threeTree) && $two['child'] = $threeTree;
                    $twoTree[$two['id']] = $two;
                }
                if (!empty($twoTree)) {
                    array_multisort(array_column($twoTree, 'sort'), SORT_ASC, $twoTree);
                    $first['child'] = $twoTree;
                }
                $tree[$first['id']] = $first;
            }
            Cache::set('booking_type_' . $model::$wxapp_id, compact('all', 'tree'));
//        }
        return Cache::get('booking_type_' . $model::$wxapp_id);
    }

    /**
     * 获取所有服务类型
     * @return mixed
     */
    public static function getCacheAll()
    {
        return self::getALL()['all'];
    }

    /**
     * 获取所有服务类型(树状结构)
     * @return mixed
     */
    public static function getCacheTree()
    {
        return self::getALL()['tree'];
    }

}