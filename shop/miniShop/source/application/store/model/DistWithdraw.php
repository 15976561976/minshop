<?php

namespace app\store\model;
use app\common\model\DistWithdraw as DistWithdrawModel;
use think\Request;

class DistWithdraw extends DistWithdrawModel
{
    /**
     * 提现列表
     * @param $filter
     * @return \think\Paginator
     * @throws \think\exception\DbException
     */
    public function getList($filter)
    {
        return $this->with(['user', 'distUser'])
            ->where($filter)
            ->order(['create_time' => 'desc'])->paginate(15, false, [
                'query' => Request::instance()->request()
            ]);
    }

    /**
     * 提现状态修改
     * @param $status
     * @return false|int
     */
    public function check($status)
    {
        return $this->allowField(true)->save(['withdraw_status' => $status]);
    }


}