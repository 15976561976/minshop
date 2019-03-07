<?php

namespace app\store\model;
use app\common\model\BookingType as BookingTypeModel;
use think\Cache;

class BookingType extends BookingTypeModel
{

    /**
     * 添加新记录
     * @param $data
     * @return false|int
     */
    public function add($data)
    {
        $data['wxapp_id'] = self::$wxapp_id;
        $this->deleteCache();
        return $this->allowField(true)->save($data);
    }

    /**
     * 编辑记录
     * @param $data
     * @return bool|int
     */
    public function edit($data)
    {
        $this->deleteCache();
        return $this->allowField(true)->save($data);
    }

    /**
     * 删除服务类型
     * @param $id
     * @return bool|int
     */
    public function remove($id)
    {
        // 判断是否存在技师
//        if ($goodsCount = (new Goods)->where(compact('category_id'))->count()) {
//            $this->error = '该分类下存在' . $goodsCount . '个商品，不允许删除';
//            return false;
//        }

        // 判断是否存在子分类
        if ((new self)->where(['parent_id' => $id])->count()) {
            $this->error = '该服务类型下存在子服务类型，请先删除';
            return false;
        }
        $this->deleteCache();
        return $this->delete();
    }

    /**
     * 删除缓存
     * @return bool
     */
    private function deleteCache()
    {
        return Cache::rm('booking_type_' . self::$wxapp_id);
    }

}