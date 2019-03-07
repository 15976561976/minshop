<?php

namespace app\api\controller;
use app\api\model\DistUserBankCard as DistUserBankCardModel;
use app\api\model\DistWithdraw as DistWithdrawModel;
use app\api\model\DistUser as DistUserModel;

/**
 * 分销佣金相关控制器
 * Class DistAmount
 * @package app\api\controller
 */
class DistAmount extends Controller
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
     * 分销中心——获取佣金相关基本数据
     * @return array
     */
    public function getBaseAmount()
    {
        $model = new DistUserModel;
        $baseAmount = $model->getBaseAmount($this->user['dist_user_id']);
        return $this->renderSuccess(compact('baseAmount'));
    }

    /**
     * 分销佣金——获取分销佣金相关信息
     * @return array
     */
    public function getDistAmount()
    {
        $model = new DistUserModel;
        $distAmount = $model->getDistAmount($this->user['dist_user_id']);
        return $this->renderSuccess(compact('distAmount'));
    }

    /**
     * 分销会员提现
     * @return array
     */
    public function withdraw()
    {
        $model = new DistWithdrawModel;
        if (!$withdraw = $model->withdraw($this->request->post(), $this->user)) {
            return $this->renderError('提现失败');
        }
        return $this->renderSuccess([], '提现成功');
    }

    /**
     * 分销会员提现明细
     * @param $type
     * @return array
     */
    public function withdrawDetail($type)
    {
        $model = new DistWithdrawModel;
        $withdrawDetail = $model->withdrawDetail($this->user['dist_user_id'], $type);
        return $this->renderSuccess(compact('withdrawDetail'));
    }

    /**
     * 添加分销会员银行卡信息
     * @return array
     */
    public function addBankCard()
    {
        $model = new DistUserBankCardModel;
        if (!$model->addBankCard($this->request->post(), $this->user)) {
            return $this->renderError('添加失败');
        }
        return $this->renderSuccess([], '添加成功');
    }

    /**
     * 删除分销会员银行卡
     * @return array
     */
    public function delBankCard()
    {
        $model = new DistUserBankCardModel;
        if (!$model->delBankCard($this->request->post())) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess([], '删除成功');
    }

    /**
     * 获取银行信息列表
     * @return array
     */
    public function getBankCardList()
    {
        $model = new DistUserBankCardModel;
        $bankCardList = $model->getBankCardList($this->user['dist_user_id']);
        $withAmount = (new DistUserModel)->where('id', $this->user['dist_user_id'])->value('withdrawing_amount');
        return $this->renderSuccess(compact('bankCardList', 'withAmount'));
    }
}