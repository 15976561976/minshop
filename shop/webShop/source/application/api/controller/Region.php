<?php

namespace app\api\controller;
use app\common\model\Region as RegionModel;

/**
 * 省，市，区控制器
 * Class Region
 * @package app\api\controller
 */
class Region extends Controller
{
    /**
     * 全部省，市，区
     * @return array
     */
    public function lists()
    {
        $list = array_values(RegionModel::getCachAeTree());
        return $this->renderSuccess(compact('list'));
    }

    /**
     * 获取省
     * @return array
     */
    public function province()
    {
        $provinces = RegionModel::where('pid', 0)->select();
        return $this->renderSuccess(compact('provinces'));
    }

    /**
     * 获取市
     * @param $province_id
     * @return array
     */
    public function city($province_id)
    {
        $cities = RegionModel::where('pid', $province_id)->select();
        return $this->renderSuccess(compact('cities'));

    }

    /**
     * 获取区
     * @param $city_id
     * @return array
     */
    public function area($city_id)
    {
        $areas = RegionModel::where('pid', $city_id)->select();
        return $this->renderSuccess(compact('areas'));

    }

}