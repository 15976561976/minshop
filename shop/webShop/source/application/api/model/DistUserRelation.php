<?php

namespace app\api\model;
use app\common\exception\BaseException;
use app\common\model\DistUserRelation as DistUserRelationModel;

/**
 * 分销会员关系模型
 * Class DistUserRelation
 * @package app\api\model
 */
class DistUserRelation extends DistUserRelationModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'update_time'
    ];

    /**
     * 分销好友关系绑定
     * @param $post
     * @param $user
     * @return false|int
     * @throws BaseException
     */
    public function bindFriRelation($post, $user)
    {
        $post['wxapp_id'] = self::$wxapp_id;
        $post['wx_user_id'] = $user['user_id'];

        if (!isset($post['dist_user_id'])) {
            throw new BaseException(['msg' => '绑定关系失败']);
        }

        if ($this->where(['wx_user_id' => $user['user_id']])->count()) {
            throw new BaseException(['msg' => '好友关系已存在', 'code' => 101]);
        }

        $user = new User;
        $map = [
            'user_id' => $user['user_id'],
            'dist_user_id' => $post['dist_user_id']
        ];
        if ($user->where($map)->count()) {
            throw new BaseException(['msg' => '分销会员不可与自己绑定为好友关系', 'code' => 102]);
        }

        if (!$bindUserRe = $this->allowField(true)->save($post)) {
            throw new BaseException(['msg' => '绑定好友关系失败']);
        }
        return $bindUserRe;
    }

    /**
     * 我的好友列表
     * @param $dist_user_id
     * @return false|static[]
     */
    public function getFriList($dist_user_id)
    {
        return $this->with('user')->where('dist_user_id', $dist_user_id)->select();
    }


}