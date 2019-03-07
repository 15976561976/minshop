<?php

namespace app\api\model;
use app\common\model\DistUserCode as DistUserCodeModel;

/**
 * 分销会员二维码模型
 * Class DistUserCode
 * @package app\api\model
 */
class DistUserCode extends DistUserCodeModel
{

    /**
     * 添加分销会员推广小程序码信息
     * @param $dist_user_id
     * @param $wx_code
     * @return false|int
     */
    public function add($dist_user_id, $wx_code)
    {

        $image=$wx_code;

        $imageName = "25220_".date("His",time())."_".rand(1111,9999).'.png';

        if (strstr($image,",")){
            $image = explode(',',$image);
            $image = $image[1];
        }

        $path = "./".date("Ymd",time());

        if (!is_dir($path)){ //判断目录是否存在 不存在就创建
            mkdir($path,0777,true);
        }

        $imageSrc= $path."/". $imageName; //图片名字
        $r = file_put_contents($imageSrc, base64_decode($image));//返回的是字节数

        if (!$r) {

            $tmparr1=array('data'=>null,"code"=>1,"msg"=>"图片生成失败");
            echo json_encode($tmparr);

        }else{
            $tmparr2=array('data'=>1,"code"=>0,"msg"=>"图片生成成功");
            echo json_encode($tmparr2);
        }


        $post['wxapp_id'] = 10001;//self::$wxapp_id;
        $post['dist_user_id'] = $dist_user_id;
        $post['wx_code'] = $wx_code;
        return $this->allowField(true)->save($post);
    }

}