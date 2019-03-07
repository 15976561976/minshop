<?php

namespace app\api\model;
use app\common\exception\BaseException;
use app\common\model\DistWithdraw as DistWithdrawModel;
use think\Db;

/**
 * 分析会员提现模型
 * Class DistWithdraw
 * @package app\api\model
 */
class DistWithdraw extends DistWithdrawModel
{
    /**
     * 分销会员提现
     * @param $post
     * @param $userInfo
     * @return false|int
     * @throws BaseException
     */
    public function withdraw($post, $userInfo)
    {
        $post['wxapp_id'] = self::$wxapp_id;
        $post['dist_user_id'] = $userInfo['dist_user_id'];
        $post['wx_user_id'] = $userInfo['user_id'];

        if (empty($post['withdraw_price'])) {
            throw new BaseException(['msg' => '提现金额不能为空']);
        }

        if (empty($post['bank_card_id'])) {
            throw new BaseException(['msg' => '银行卡信息不能为空']);
        }

        $distUserInfo = (new DistUser)->where('id', $userInfo['dist_user_id'])->find();
        if ($post['withdraw_price'] > $distUserInfo['withdrawing_amount']) {
            throw new BaseException(['msg' => '提现金额不能大于可提现佣金']);
        }

        //开启事务
        Db::startTrans();

        try {
            //提现申请提交
            $this->allowField(true)->save($post);

            //可提现佣金 - 提现金额
            $distUserInfo->withdrawing_amount -= $post['withdraw_price'];
            $distUserInfo->save();

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
        }
        return false;
    }

    /**
     * 提现明细列表
     * @param $dist_user_id
     * @param $type
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function withdrawDetail($dist_user_id, $type)
    {
        // 筛选条件
        $filter = [];

        // 订单数据类型
        switch ($type) {
            case 'all':
                break;
            case 'check';
                $filter['withdraw_status'] = 0;
                break;
            case 'paying';
                $filter['withdraw_status'] = 1;
                break;
            case 'payed';
                $filter['withdraw_status'] = 2;
                break;
            case 'invalid';
                $filter['withdraw_status'] = 3;
                break;
        }

        $withdrawDetail = $this->with('bankCard')
                            ->where('dist_user_id', '=', $dist_user_id)
                            ->where($filter)
                            ->order(['create_time' => 'desc'])
                            ->select();

        return $withdrawDetail;
    }

}