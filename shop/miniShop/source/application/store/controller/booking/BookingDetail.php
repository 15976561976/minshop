<?php

namespace app\store\controller\booking;
use app\store\controller\Controller;
use app\store\model\BookingDetail as BookingDetailModel;

/**
 * 后台客户预约明细管理控制器
 * Class BookingDetail
 * @package app\store\controller\booking
 */
class BookingDetail extends Controller
{
    /**
     * 获取客户预约明细列表
     * @return mixed
     */
    public function index()
    {
        $model = new BookingDetailModel;
        $list = $model->getList();
        return $this->fetch('index', compact('list'));
    }

    /**
     * 后台点击预约完成操作
     * @param $id
     * @return array
     */
    public function complete($id)
    {
        $model = BookingDetailModel::detail($id);
        if ($model->complete()) {
            return $this->renderSuccess('操作成功', url('booking.booking_detail/index'));
        }
        $error = $model->getError() ?: '操作失败';
        return $this->renderError($error);
    }

}