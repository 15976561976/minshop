<?php

namespace app\api\controller;

use app\api\model\User as UserModel;

/**
 * 用户管理
 * Class User
 * @package app\api
 */
class User extends Controller
{
    /**
     * 用户注册——微商城网站注册接口
     * @return array
     */
    public function register()
    {
        $model = new UserModel;
        $model->webRegister($this->request->post());
        return $this->renderSuccess([], '用户注册成功');
    }

    /**
     * 用户登录——微商城网站登录接口
     * @return array
     */
    public function webLogin()
    {
        $model = new UserModel;
        $userInfo = $model->webLogin($this->request->post());
        return $this->renderSuccess(compact('userInfo'), '登录成功');
    }

    /**
     * 获取登录用户信息
     * @return array
     */
    public function getUserInfo()
    {
        $model = new UserModel;
        $userInfo = $model->where('user_id', $this->request->post('user_id'))->find();
        return $this->renderSuccess(compact('userInfo'));
    }

    /**
     * 用户自动登录
     * @return array
     * @throws \app\common\exception\BaseException
     * @throws \think\Exception
     * @throws \think\exception\DbException
     */
    public function login()
    {
        $model = new UserModel;
        $user_id = $model->login($this->request->post());
        $token = $model->getToken();
        return $this->renderSuccess(compact('user_id', 'token'));
    }

}
