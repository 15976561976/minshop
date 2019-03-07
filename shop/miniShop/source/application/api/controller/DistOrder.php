<?php

namespace app\api\controller;
use app\api\model\DistOrder as DistOrderModel;

/**
 * 分销订单控制器
 * Class DistOrder
 * @package app\api\controller
 */
class DistOrder extends Controller
{
    /* @var \app\api\model\User $user */
    private $user;

    /**
     * 构造方法
     * @throws \app\common\exception\BaseException
     * @throws \think\exception\DbException
     */
    public function _initialize()
    {
        parent::_initialize();
        $this->user = $this->getUser();   // 用户信息
    }

    /**
     * 获取分销订单
     * @param $type
     * @return array
     */
    public function getDistOrder($type)
    {
        $model = new DistOrderModel;
        $distOrder = $model->getDistOrder($this->user['dist_user_id'], $type);
        return $this->renderSuccess(compact('distOrder'));
    }


}