<?php

namespace app\api\model;
use app\common\exception\BaseException;
use app\common\model\BookingDetail as BookingDetailModel;

class BookingDetail extends BookingDetailModel
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
     * 客户预约操作
     * @param $data
     * @param $userInfo
     * @return false|int
     * @throws BaseException
     */
    public function action($data, $userInfo)
    {
        $data['wxapp_id'] = self::$wxapp_id;
        $data['wx_user_id'] = $userInfo['user_id'];

        //对应时间段可被预约数减1
        $workTime = explode(' ', $data['booking_time']);
        $map = [
            'worker_id' => $data['worker_id'],
            'work_day' => $workTime['0'],
            'time_line' => $workTime['1'],
        ];
        $workerScheduleInfo = BookingSchedule::where($map)->find();
        if ($workerScheduleInfo->booking_num == 0) {
            throw new BaseException(['msg' => '对不起，当前时间段预约已满，请另选其他时间段预约']);
        }
        $workerScheduleInfo->booking_num -= 1;
        $workerScheduleInfo->save();

        //总可被预约数减1
        $workerInfo = BookingWorker::where('id', $data['worker_id'])->find();
        $workerInfo->booking_num -= 1;
        $workerInfo->save();

        //同步保存一下客户名称，避免前端移除而找不到名称
        $customerInfo = BookingCustomer::where('id', $data['customer_id'])->find();
        $data['customer_name'] = $customerInfo->username;

        return $this->allowField(true)->save($data);
    }

    /**
     * 取消预约操作
     * @param $data
     * @return false|int
     */
    public function cancel($data)
    {
        //对应时间段可被预约数加1
        $workTime = explode(' ', $data['booking_time']);
        $map = [
            'worker_id' => $data['worker_id'],
            'work_day' => $workTime['0'],
            'time_line' => $workTime['1'],
        ];
        $workerScheduleInfo = BookingSchedule::where($map)->find();
        $workerScheduleInfo->booking_num += 1;
        $workerScheduleInfo->save();

        //总可被预约数加1
        $workerInfo = BookingWorker::where('id', $data['worker_id'])->find();
        $workerInfo->booking_num += 1;
        $workerInfo->save();

        $data['booking_status'] = 2;
        return $this->allowField(true)->save($data);
    }

    /**
     * 获取预约明细
     * @param $userInfo
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getBookingDetail($userInfo)
    {
        return $this->with(['worker.avatar', 'worker.type'])->where('wx_user_id', $userInfo['user_id'])->select();
    }
}