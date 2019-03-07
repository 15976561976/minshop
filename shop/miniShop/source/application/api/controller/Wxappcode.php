<?php

namespace app\api\controller;

class Wxappcode extends Controller
{

    protected $user;

    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub
        $this->user = $this->getUser();
    }

    /**
     * 获取小程序码
     * @return string
     */
    public function code()
    {
        $accessToken = $this->accesstoken();
        $postData = [
            'scene' => $this->user['dist_user_id'],
            'width' => 430
        ];
        $url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' . $accessToken;
        $dataJson = json_encode($postData);
        $data = $this->send_post($url, $dataJson);
        $result = $this->data_uri($data, 'image/png');
        return $this->renderSuccess(compact('result'));
    }

    /**
     * 消息推送http
     * @param $url
     * @param $post_data
     * @return bool|string
     */
    protected function send_post($url, $post_data) {
        $options = array(
            'http' => array(
                'method'  => 'POST',
                'header'  => 'Content-type:application/json',
                'content' => $post_data,
                'timeout' => 60
            )
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        return $result;
    }

    /**
     * 二进制转图片image/png
     * @param $contents
     * @param $mime
     * @return string
     */
    public function data_uri($contents, $mime)
    {
        $base64   = base64_encode($contents);
        return ('data:' . $mime . ';base64,' . $base64);
    }

}