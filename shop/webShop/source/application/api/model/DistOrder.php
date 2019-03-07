<?php

namespace app\api\model;
use app\common\model\DistOrder as DistOrderModel;

class DistOrder extends DistOrderModel
{
    /**
     * 获取分销订单
     * @param $dist_user_id
     * @param $type
     * @return array
     */
    public function getDistOrder($dist_user_id, $type)
    {

        // 筛选条件
        $map = [];

        // 订单数据类型
        switch ($type) {
            case 'all':
                break;
            case 'paying';//待付款
                $map = [
                    'yoshop_order.pay_status' => 10,
                    'yoshop_order.order_status' => 10
                ];
                break;
            case 'payed';//已付款
                $map = [
                    'yoshop_order.pay_status' => 20,
                    'yoshop_order.delivery_status' => 10
                ];
                break;
            case 'finished';
                $map = [
                    'yoshop_order.order_status' => 30
                ];
                break;
        }

        $distOrderInfo = $this->join('yoshop_order', 'yoshop_dist_order.order_id=yoshop_order.order_id')
                        ->join('yoshop_order_goods', 'yoshop_order_goods.order_id=yoshop_dist_order.order_id')
                        ->join('yoshop_dist_user', 'yoshop_dist_user.id=yoshop_dist_order.dist_user_id')
                        ->join('yoshop_upload_file','yoshop_order_goods.image_id=yoshop_upload_file.file_id')
                        ->where($map)
                        ->where('yoshop_dist_order.dist_user_id', '=', $dist_user_id)
                        ->order(['yoshop_dist_order.create_time' => 'desc'])
                        ->select()
                        ->toArray();

        return $distOrderInfo;
    }

    /**
     * 分销好友下单——新增订单数据至分销订单表记录
     * @param $wx_user_id
     * @param $order_id
     * @return false|int
     */
    public function addDistOrderData($wx_user_id, $order_id)
    {
        $distUserId = (new DistUserRelation)->where('wx_user_id', $wx_user_id)->value('dist_user_id');
        if ($distUserId) {
            $post['wxapp_id'] = self::$wxapp_id;
            $post['order_id'] = $order_id;
            $post['wx_user_id'] = $wx_user_id;
            $post['dist_user_id'] = $distUserId;
            $this->allowField(true)->save($post);
        }
        return true;
    }

    /**
     * 分销好友取消订单——同步删除分销订单数据
     * @param $wx_user_id
     * @param $order_id
     * @return int
     */
    public function removeDistOrder($wx_user_id, $order_id)
    {
        $map = [
            'wx_user_id' => $wx_user_id,
            'order_id' => $order_id,
        ];
        $distOrderInfo = $this->where($map)->find();
        if (!empty($distOrderInfo)) {
            $distOrderInfo->delete();
        }
        return true;
    }
}