<?php

namespace app\store\controller\distribution;

use app\store\controller\Controller;
use app\store\model\DistWithdraw as DistWithdrawModel;
use app\common\model\DistUser as DistUserModel;

/**
 * 分销会员提现明细控制器
 * Class WithdrawDetail
 * @package app\store\controller\distribution
 */
class DistWithdrawDetail extends Controller
{
    /**
     * 待审核提现列表
     * @return mixed
     */
    public function waitCheck()
    {
        return $this->getList('待审核提现列表', [
            'withdraw_status' => 0,
        ]);
    }

    /**
     * 待打款提现列表
     * @return mixed
     */
    public function waitPay()
    {
        return $this->getList('待打款提现列表', [
            'withdraw_status' => 1,
        ]);
    }

    /**
     * 已打款提现列表
     * @return mixed
     */
    public function payed()
    {
        return $this->getList('已打款提现列表', [
            'withdraw_status' => 2,
        ]);
    }

    /**
     * 无效提现列表
     * @return mixed
     */
    public function invalid()
    {
        return $this->getList('无效提现列表', [
            'withdraw_status' => 3,
        ]);
    }

    /**
     * 提现列表
     * @param $title
     * @param $filter
     * @return mixed
     * @throws \think\exception\DbException
     */
    private function getList($title, $filter = [])
    {
        $model = new DistWithdrawModel;
        $list = $model->getList($filter);
        return $this->fetch('index', compact('title','list'));
    }

    /**
     * 提现审核
     * @return array
     */
    public function check()
    {
        $id = $this->request->post('id');
        $status = $this->request->post('status');
        $model = DistWithdrawModel::get($id);
        if (!$model->check($status)) {
            $error = $model->getError() ?: '操作失败';
            return $this->renderError($error);
        }
        //审核通过
        if ($status == 1) {
            DistUserModel::withdrawCalculation($model['dist_user_id'], $model['withdraw_price'], 'wait');
        //确认打款
        } elseif ($status == 2) {
            DistUserModel::withdrawCalculation($model['dist_user_id'], $model['withdraw_price'], 'withdrawed');
        }
        return $this->renderSuccess('操作成功');
    }

}