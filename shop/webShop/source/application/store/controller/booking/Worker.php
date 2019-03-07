<?php

namespace app\store\controller\booking;

use app\store\controller\Controller;
use app\store\model\BookingWorker as BookingWorkerModel;
use app\store\model\BookingType;

/**
 * 后台预约技师管理控制器
 * Class Worker
 * @package app\store\controller\booking
 */
class Worker extends Controller
{
    /**
     * 预约技师列表
     * @return mixed
     */
    public function index()
    {
        $model = new BookingWorkerModel;
        $list = $model->index();
        return $this->fetch('index', compact('list'));
    }

    /**
     * 添加预约技师
     * @return array|mixed
     */
    public function add()
    {
        $model = new BookingWorkerModel;
        if (!$this->request->isAjax()) {
            // 获取所有服务类型
            $type = BookingType::getCacheTree();
            return $this->fetch('add', compact('type'));
        }
        // 新增记录
        if ($model->add($this->postData('bookingWorker'))) {
            return $this->renderSuccess('添加成功', url('booking.worker/index'));
        }
        $error = $model->getError() ?: '添加失败';
        return $this->renderError($error);
    }

    /**
     * 编辑预约技师
     * @param $id
     * @return array|mixed
     * @throws \think\exception\DbException
     */
    public function edit($id)
    {
        // 模板详情
        $model = BookingWorkerModel::get($id, ['avatar']);
        if (!$this->request->isAjax()) {
            // 获取所有服务类型
            $type = BookingType::getCacheTree();
            return $this->fetch('edit', compact('model', 'type'));
        }
        // 更新记录
        if ($model->edit($this->postData('bookingWorker'))) {
            return $this->renderSuccess('更新成功', url('booking.worker/index'));
        }
        $error = $model->getError() ?: '更新失败';
        return $this->renderError($error);
    }

    /**
     * 删除预约技师
     * @param $id
     * @return array
     * @throws \think\exception\DbException
     */
    public function delete($id)
    {
        $model = BookingWorkerModel::get($id);
        if (!$model->remove($id)) {
            $error = $model->getError() ?: '删除失败';
            return $this->renderError($error);
        }
        return $this->renderSuccess('删除成功');
    }

}