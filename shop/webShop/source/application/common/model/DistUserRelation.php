<?php

namespace app\common\model;

/**
 * 分销会员关系模型
 * Class DistUserRelation
 * @package app\common\model
 */
class DistUserRelation extends BaseModel
{
    protected $name = 'dist_relation';

    protected $updateTime = false;

    /**
     * 关联微信授权用户表（user）
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->hasOne('user', 'user_id', 'wx_user_id');
    }


}