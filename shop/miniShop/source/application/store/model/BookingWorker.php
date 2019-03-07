<?php

namespace app\store\model;
use app\common\exception\BaseException;
use app\common\model\BookingWorker as BookingWorkerModel;

/**
 * 预约技师信息模型(后台)
 * Class BookingWorker
 * @package app\common\model
 */
class BookingWorker extends BookingWorkerModel
{
    /**
     * 预约技师信息列表
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function index()
    {
        return $this->with(['avatar', 'type'])->order(['sort' => 'asc'])->paginate(15);
    }

    /**
     * 添加技师信息
     * @param $data
     * @return false|int
     * @throws BaseException
     */
    public function add($data)
    {
        if (empty($data['avatar_id'])) {
            throw new BaseException(['msg' => '请上传头像']);
        }
        $data['wxapp_id'] = self::$wxapp_id;
        return $this->allowField(true)->save($data);
    }

    /**
     * 编辑技师信息
     * @param $data
     * @return false|int
     * @throws BaseException
     */
    public function edit($data)
    {
        if (empty($data['avatar_id'])) {
            throw new BaseException(['msg' => '请上传头像']);
        }
        $data['wxapp_id'] = self::$wxapp_id;
        return $this->allowField(true)->save($data);
    }

    /**
     * 删除服务类型
     * @param $id
     * @return bool|int
     */
    public function remove($id)
    {
        // 判断是否还有班表
//        if ($goodsCount = (new Goods)->where(compact('category_id'))->count()) {
//            $this->error = '该分类下存在' . $goodsCount . '个商品，不允许删除';
//            return false;
//        }

        // 判断是否存在预约
//        if ((new self)->where(['parent_id' => $id])->count()) {
//            $this->error = '该服务类型下存在子服务类型，请先删除';
//            return false;
//        }

        return $this->delete();
    }
}