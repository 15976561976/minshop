<?php

namespace app\store\controller\distribution;

use app\store\controller\Controller;
use app\store\model\DistUser as DistUserModel;

class DistUser extends Controller
{
    /**
     * 分销员列表
     * @return mixed
     */
    public function index()
    {
        $model = new DistUserModel;
        $list = $model->index();
        return $this->fetch('index', compact('list'));
    }

    /**
     * 添加分销员
     * @return array|mixed
     */
    public function add()
    {
        $model = new DistUserModel;
        if (!$this->request->isAjax()) {
            return $this->fetch('add');
        }
        // 新增记录
        if ($model->add($this->postData('userInfo'))) {
            return $this->renderSuccess('添加成功', url('distribution.dist_user/index'));
        }
        $error = $model->getError() ?: '添加失败';
        return $this->renderError($error);
    }

    /**
     * 编辑分销会员信息
     * @param $dist_user_id
     * @return array|mixed
     */
    public function edit($dist_user_id)
    {
        $model = DistUserModel::detail($dist_user_id);
        if (!$this->request->isAjax()) {
            return $this->fetch('edit', compact('model'));
        }
        // 更新记录
        if ($model->edit($this->postData('userInfo'))) {
            return $this->renderSuccess('更新成功', url('distribution.dist_user/index'));
        }
        $error = $model->getError() ?: '更新失败';
        return $this->renderError($error);
    }

    /**
     * 删除分销会员
     * @param $dist_user_id
     * @return array
     */
    public function delete($dist_user_id)
    {
        $model = DistUserModel::get($dist_user_id);
        if (!$model->remove($model)) {
            $error = $model->getError() ?: '删除失败';
            return $this->renderError($error);
        }
        return $this->renderSuccess('删除成功');
    }

}