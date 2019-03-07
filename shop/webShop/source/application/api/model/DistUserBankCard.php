<?php

namespace app\api\model;
use app\common\exception\BaseException;
use app\common\model\DistUserBankCard as DistUserBankCardModel;

/**
 * 分销会员银行卡模型
 * Class DistUserBankCard
 * @package app\api\model
 */
class DistUserBankCard extends DistUserBankCardModel
{

    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'create_time',
        'update_time'
    ];

    /**
     * 添加分销会员银行卡信息
     * @param $post
     * @param $userInfo
     * @return false|int
     */
    public function addBankCard($post, $userInfo)
    {
        $post['wxapp_id'] = self::$wxapp_id;
        $post['dist_user_id'] = $userInfo['dist_user_id'];
        return $this->allowField(true)->save($post);
    }

    /**
     * 删除分销会员银行卡信息
     * @param $post
     * @return int
     */
    public function delBankCard($post)
    {
        return $this->where('id', $post['bank_card_id'])->delete();
    }

    /**
     * 获取分销会员银行信息
     * @param $dist_user_id
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getBankCardList($dist_user_id)
    {
        return $this->where('dist_user_id', $dist_user_id)
                    ->field(['id', 'bank_card_name', 'bank_card_num'])
                    ->select();
    }


}