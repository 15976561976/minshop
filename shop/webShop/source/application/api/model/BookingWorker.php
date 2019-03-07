<?php

namespace app\api\model;
use app\common\exception\BaseException;
use app\common\model\BookingWorker as BookingWorkerModel;


class BookingWorker extends BookingWorkerModel
{
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
     * 技师名称或服务类型进行模糊搜索技师
     * @param $keyword
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getWorkerList($keyword)
    {
        $field = ['bw.id', 'bw.worker_name', 'bw.level', 'bw.booking_num', 'bt.id' => 'type_id', 'bt.name', 'uf.file_name'];
        $alias = ['yoshop_booking_worker' => 'bw', 'yoshop_booking_type' => 'bt', 'yoshop_upload_file' => 'uf'];
        return $this->alias($alias)
                    ->join('yoshop_booking_type', 'bw.type_id=bt.id')
                    ->join('yoshop_upload_file', 'bw.avatar_id=uf.file_id')
                    ->where('bw.worker_name', 'like', '%' . $keyword . '%')
                    ->whereOr('bt.name', 'like', '%' . $keyword . '%')
                    ->field($field)
                    ->select();
    }

    /**
     * 获取预约基本信息
     * @param $data
     * @return array|false|\PDOStatement|string|\think\Model
     * @throws BaseException
     */
    public function getBookingInfo($data)
    {
        if (!isset($data['time_line'])) {
            throw new BaseException(['msg' => 'time_line:参数不存在']);
        }

        //判断预约的最晚时间是否已过时；
        $timeLine = explode('-', $data['time_line']);
        $mixTime = $data['work_day'] . ' ' . $timeLine[1];
        if (date('Y-m-d H:i') > $mixTime) {
            throw new BaseException(['msg' => '您预约的最晚时间已过时，请重新选择！']);
        }

        return $this->with('type')->where('id', $data['worker_id'])->field(['worker_name', 'type_id', 'id'])->find();
    }

    /**
     * 获取技师信息
     * @param $data
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getWorkerInfo($data)
    {
        return $this->with('avatar')
                    ->where('id', $data['worker_id'])
                    ->find();
    }
}