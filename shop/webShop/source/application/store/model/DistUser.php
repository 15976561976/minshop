<?php

namespace app\store\model;
use app\common\model\DistUser as DistUserModel;
use app\common\model\DistUserRelation;
use think\Db;

/**
 * 后台分销会员管理模型
 * Class DistUser
 * @package app\store\model
 */
class DistUser extends DistUserModel
{
    /**
     * 获取分销会员列表
     * @param array $filter
     * @return \think\Paginator
     */
    public function index($filter = [])
    {
        return $this->with(['user', 'distUserCode'])
                    ->where($filter)
                    ->order(['create_time' => 'desc'])
                    ->paginate(10, false);
    }

    /**
     * 添加分销会员
     * @param $data
     * @return false|int
     */
    public function add($data)
    {
        $data['wxapp_id'] = self::$wxapp_id;

        //验证手机号码
        if (!preg_match('/^1[3|5|6|7|8]\d{9}$/', $data['mobile'])) {
            $this->error = '不合法的手机号码';
            return false;
        }

        //判断输入的用户ID是否存在
        $wxUserInfo = (new User())->where('user_id', $data['wx_user_id'])->find();
        if (!$wxUserInfo) {
            $this->error = '用户ID不存在';
            return false;
        }

        //判断该用户ID是否已经成为分销会员
        if ($this->where('wx_user_id', $data['wx_user_id'])->count()) {
            $this->error = '此用户已是分销会员';
            return false;
        }

        $data['wx_nickname'] = $wxUserInfo['nickName'];

        //开启事务
        Db::startTrans();
        try {
            $this->allowField(true)->save($data);
            //更新分销会员id至微信用户表
            $distUserInfo = $this->where('wx_user_id', $data['wx_user_id'])->find();
            (new User())->update(['dist_user_id' => $distUserInfo->id], ['user_id' => $data['wx_user_id']]);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            Db::rollback();
        }
        return false;
    }

    /**
     * 编辑分销会员信息
     * @param $data
     * @return false|int
     */
    public function edit($data)
    {
        //验证手机号码
        if (!preg_match('/^1[3|5|6|7|8]\d{9}$/', $data['mobile'])) {
            $this->error = '不合法的手机号码';
            return false;
        }
        return $this->allowField(true)->save($data);
    }

    /**
     * 删除分销会员
     * @return bool|int
     */
    public function remove($model)
    {
        // 判断是否存在好友
        if ((new DistUserRelation)->where(['dist_user_id' => $model->id])->count()) {
            $this->error = '该分销会员下还存在好友，不允许删除';
            return false;
        }
        //更新分销会员id为0
        (new User)->where('user_id', $model->wx_user_id)->update(['dist_user_id' => 0]);
        return $this->delete();
    }

}