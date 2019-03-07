<?php

namespace app\store\controller\booking;
use app\store\controller\Controller;
use app\store\model\BookingTime;
use app\store\model\BookingWorker;

/**
 * 后台技师排班表管理控制器
 * Class WorkTime
 * @package app\store\controller\booking
 */
class WorkTime extends Controller
{

    /**
     * 获取技师班表信息列表
     * @return mixed
     */
    public function index()
    {
        $model = new BookingTime;
        $list = $model->getList();
        return $this->fetch('index', compact('list'));
    }

    /**
     * 上传班表
     * @return array|mixed
     */
    public function upload()
    {
        $bookingTime = new BookingTime;
        if (!$this->request->isAjax()) {
            //获取所以技师
            $model = new BookingWorker;
            $workerList = $model->field(['id', 'worker_name'])->select();
            return $this->fetch('upload', compact('workerList'));
        }
        // 新增记录
        if ($bookingTime->add($this->postData('uploadInfo'))) {
            return $this->renderSuccess('添加成功', url('booking.work_time/index'));
        }
        $error = $bookingTime->getError() ?: '添加失败';
        return $this->renderError($error);
    }

    /**
     * 删除班表信息
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        $model = BookingTime::get($id);
        if (!$model->remove($id, $model)) {
            $error = $model->getError() ?: '删除失败';
            return $this->renderError($error);
        }
        return $this->renderSuccess('删除成功');

    }
}