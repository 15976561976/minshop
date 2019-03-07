<?php

namespace app\api\model;

use app\common\model\User as UserModel;
//use app\api\model\Wxapp;
use app\common\library\wechat\WxUser;
use app\common\exception\BaseException;
use think\Cache;
use think\Request;

/**
 * 用户模型类
 * Class User
 * @package app\api\model
 */
class User extends UserModel
{
    private $token;

    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'wxapp_id',
        'create_time',
        'update_time'
    ];

    /**
     * 获取用户信息
     * @param $token
     * @return null|static
     * @throws \think\exception\DbException
     */
//    public static function getUser($token)
//    {
//        return self::detail(['open_id' => Cache::get($token)['openid']]);
//    }

    /**
     * 获取用户信息——微商城网站
     * @param $user_id
     * @return null|static
     * @throws \think\exception\DbException
     */
    public static function getUser($user_id)
    {
        return self::detail(['user_id' => $user_id]);
    }

    /**
     * 用户注册——微商城网站注册接口
     * @param $data
     * @return bool
     * @throws BaseException
     */
    public function webRegister($data)
    {
        $phone = trim($data['phone']);
        $password = trim($data['password']);
        if (empty($phone)) {
            throw new BaseException(['msg' => '请输入手机号码']);
        }

        if (empty($password)) {
            throw new BaseException(['msg' => '请输入密码']);
        }

        if ($this->get(['phone' => $phone])) {
            throw new BaseException(['msg' => '该手机号码已注册']);
        }

        if (!preg_match('/^1[34578]\d{9}$/', $phone)) {
            throw new BaseException(['msg' => '该手机号码不合法']);
        }

        if ($this->save([
                'phone' => $data['phone'],
                'password' => yoshop_hash($data['password']),
                'wxapp_id' => 10001
            ]) === false) {
            throw new BaseException(['msg' => '用户注册失败']);
        }
        return true;
    }

    /**
     * 用户登录——微商城网站登录接口
     * @param $data
     * @return null|static
     * @throws BaseException
     */
    public function webLogin($data)
    {
        $phone = trim($data['phone']);
        $password = trim($data['password']);
        if (empty($phone)) {
            throw new BaseException(['msg' => '请输入手机号码']);
        }

        if (empty($password)) {
            throw new BaseException(['msg' => '请输入密码']);
        }

        $map = [
            'phone' => $data['phone'],
            'password' => yoshop_hash($data['password']),
        ];
        $userInfo = $this->get($map);
        if (!$userInfo) {
            throw new BaseException(['msg' => '用户账号或密码不正确']);
        }
        return $userInfo;
    }

    /**
     * 用户登录
     * @param array $post
     * @return string
     * @throws BaseException
     * @throws \think\Exception
     * @throws \think\exception\DbException
     */
    public function login($post)
    {
        // 微信登录 获取session_key
        $session = $this->wxlogin($post['code']);
        // 自动注册用户
        $userInfo = json_decode(htmlspecialchars_decode($post['user_info']), true);
        $user_id = $this->register($session['openid'], $userInfo);
        // 生成token (session3rd)
        $this->token = $this->token($session['openid']);
        // 记录缓存, 7天
        Cache::set($this->token, $session, 86400 * 7);
        return $user_id;
    }

    /**
     * 获取token
     * @return mixed
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * 微信登录
     * @param $code
     * @return array|mixed
     * @throws BaseException
     * @throws \think\exception\DbException
     */
    private function wxlogin($code)
    {
        // 获取当前小程序信息
        $wxapp = Wxapp::detail();
        // 微信登录 (获取session_key)
        $WxUser = new WxUser($wxapp['app_id'], $wxapp['app_secret']);
        if (!$session = $WxUser->sessionKey($code))
            throw new BaseException(['msg' => 'session_key 获取失败']);
        return $session;
    }

    /**
     * 生成用户认证的token
     * @param $openid
     * @return string
     */
    private function token($openid)
    {
        return md5($openid . self::$wxapp_id . 'token_salt');
    }

    /**
     * 自动注册用户
     * @param $open_id
     * @param $userInfo
     * @return mixed
     * @throws BaseException
     * @throws \think\exception\DbException
     */
    private function register($open_id, $userInfo)
    {
        if (!$user = self::get(['open_id' => $open_id])) {
            $user = $this;
            $userInfo['open_id'] = $open_id;
            $userInfo['wxapp_id'] = self::$wxapp_id;
        }
        $userInfo['nickName'] = preg_replace('/[\xf0-\xf7].{3}/', '', $userInfo['nickName']);
        if (!$user->allowField(true)->save($userInfo)) {
            throw new BaseException(['msg' => '用户注册失败']);
        }
        return $user['user_id'];
    }

}
