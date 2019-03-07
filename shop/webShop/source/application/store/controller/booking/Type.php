<?php

namespace app\store\controller\booking;

use app\store\controller\Controller;
use app\store\model\BookingType as BookingTypeModel;

/**
 * 预约服务类型控制器
 * Class BookingType
 * @package app\store\controller\booking
 */
class Type extends Controller
{

    /**
     * 预约服务类型列表
     * @return mixed
     */
    public function index()
    {
        $model = new BookingTypeModel;
        $list = $model->getCacheTree();
        return $this->fetch('index', compact('list'));
    }

    /**
     * 添加预约服务类型
     * @return array|mixed
     */
    public function add()
    {
        $model = new BookingTypeModel;
        if (!$this->request->isAjax()) {
            // 获取所有地区
            $list = $model->getCacheTree();
            return $this->fetch('add', compact('list'));
        }
        // 新增记录
        if ($model->add($this->postData('bookingType'))) {
            return $this->renderSuccess('添加成功', url('booking.type/index'));
        }
        $error = $model->getError() ?: '添加失败';
        return $this->renderError($error);
    }

    /**
     * 编辑预约服务类型
     * @param $id
     * @return array|mixed
     * @throws \think\exception\DbException
     */
    public function edit($id)
    {
        // 模板详情
        $model = BookingTypeModel::get($id);
        if (!$this->request->isAjax()) {
            // 获取所有地区
            $list = $model->getCacheTree();
            return $this->fetch('edit', compact('model', 'list'));
        }
        // 更新记录
        if ($model->edit($this->postData('bookingType'))) {
            return $this->renderSuccess('更新成功', url('booking.type/index'));
        }
        $error = $model->getError() ?: '更新失败';
        return $this->renderError($error);
    }

    /**
     * 删除预约服务类型
     * @param $id
     * @return array
     * @throws \think\exception\DbException
     */
    public function delete($id)
    {
        $model = BookingTypeModel::get($id);
        if (!$model->remove($id)) {
            $error = $model->getError() ?: '删除失败';
            return $this->renderError($error);
        }
        return $this->renderSuccess('删除成功');
    }

}