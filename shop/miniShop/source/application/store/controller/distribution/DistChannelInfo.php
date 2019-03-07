<?php

namespace app\store\controller\distribution;

use app\store\controller\Controller;
use app\store\model\DistChannelInfo as DistChannelInfoModel;


/**
 * 分销商渠道信息
 * Class DistChannel
 * @package app\store\controller\distribution
 */
class DistChannelInfo extends Controller
{
    /**
     * 获取渠道商信息列表
     * @return mixed
     */
    public function index()
    {
        $model = new DistChannelInfoModel;
        $list = $model->getList();
        return $this->fetch('index', compact('list'));
    }

    /**
     * 添加渠道商信息
     * @return array|mixed
     */
    public function add()
    {
        $model = new DistChannelInfoModel;
        if (!$this->request->isAjax()) {
            return $this->fetch('add');
        }
        // 新增记录
        if ($model->add($this->postData('channel_info'))) {
            return $this->renderSuccess('添加成功', url('distribution.distChannelInfo/index'));
        }
        $error = $model->getError() ?: '添加失败';
        return $this->renderError($error);
    }

    /**
     * 修改渠道商信息
     * @param $dist_channel_id
     * @return array|mixed
     */
    public function edit($dist_channel_id)
    {
        $model = DistChannelInfoModel::get($dist_channel_id);
        if (!$this->request->isAjax()) {
            return $this->fetch('edit', compact('model'));
        }
        // 更新记录
        if ($model->edit($this->postData('channel_info'))) {
            return $this->renderSuccess('更新成功', url('distribution.distChannelInfo/index'));
        }
        $error = $model->getError() ?: '更新失败';
        return $this->renderError($error);
    }

    /**
     * 删除渠道商信息
     * @param $dist_channel_id
     * @return array
     */
    public function delete($dist_channel_id)
    {
        $model = DistChannelInfoModel::get($dist_channel_id);
        if (!$model->remove($dist_channel_id)) {
            $error = $model->getError() ?: '删除失败';
            return $this->renderError($error);
        }
        return $this->renderSuccess('删除成功');
    }

}