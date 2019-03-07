<?php

namespace app\store\model;
use app\common\model\DistChannelInfo as DistChannelInfoModel;

/**
 * 渠道商信息
 * Class DistChannelInfo
 * @package app\store\model
 */
class DistChannelInfo extends DistChannelInfoModel
{

    /**
     * 获取渠道商信息列表
     * @return \think\Paginator
     */
    public function getList()
    {
        $list = $this->field('*')->paginate(15, false);

        return $list;
    }

    /**
     * 添加渠道商信息
     * @param $data
     * @return false|int
     */
    public function add($data)
    {
        return $this->allowField(true)->save($data);
    }

    /**
     * 修改渠道商信息
     * @param $data
     * @return false|int
     */
    public function edit($data)
    {
        return $this->allowField(true)->save($data);
    }

    /**
     * 删除渠道商信息
     * @return bool|int
     */
    public function remove()
    {
        // 判断是否存在好友关系（待定）
//        if () {
//            $this->error = '该渠道下尚存在好友关系，不允许删除';
//            return false;
//        }

        return $this->delete();
    }

}