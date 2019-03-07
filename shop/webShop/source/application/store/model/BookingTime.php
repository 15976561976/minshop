<?php

namespace app\store\model;
use app\common\exception\BaseException;
use app\common\model\BookingTime as BookingTimeModel;
use think\Db;

/**
 * 后台技师班表管理模型
 * Class BookingTime
 * @package app\store\model
 */
class BookingTime extends BookingTimeModel
{
    /**
     * 获取技师班表信息列表
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getList()
    {
        return $this->with(['worker', 'worker.type', 'schedule'])
                    ->where('work_day', '>=', date('Y-m-d'))
                    ->paginate(15);
    }

    /**
     * 上传技师班表操作
     * @param $data
     * @return bool
     * @throws BaseException
     */
    public function add($data)
    {
        //参数判断
        if (empty($data['worker_id'])) {
            throw new BaseException(['msg' => '请选择技师']);
        }
        if (empty($data['work_day'])) {
            throw new BaseException(['msg' => '请选择服务日期']);
        }
        if (empty($data['time_line'])) {
            throw new BaseException(['msg' => '请选择服务时间段']);
        }
        if (empty($data['booking_num'])) {
            throw new BaseException(['msg' => '请选择可预约数']);
        }
        $timeLine = explode(' - ', $data['time_line']);
        if ($timeLine[0] > $timeLine[1]) {
            throw new BaseException(['msg' => '服务时间段的起始时间不能小于结束时间']);
        }

        $map = [
            'work_day' => $data['work_day'],
            'worker_id' => $data['worker_id'],
        ];

        //判断上传时间段是否存在交叉
        $scheduleModel = new BookingSchedule;
        $scheduleDay = $scheduleModel->where($map)->select();
        $startTime = $data['work_day'] . ' ' . $timeLine[0];
        $endTime = $data['work_day'] . ' ' . $timeLine[1];
        foreach ($scheduleDay as $val) {
            if ($startTime > $val['start_time'] && $startTime < $val['end_time']) {
                throw new BaseException(['msg' => '服务时间段存在交叉，请核查']);
            }
            if ($endTime > $val['start_time'] && $endTime < $val['end_time']) {
                throw new BaseException(['msg' => '服务时间段存在交叉，请核查']);
            }
        }

        Db::startTrans();
        try {
            //判断当天班表是否已上传，若上传，则不在新增数据
            $workDay = $this->where($map)->find();
            if (empty($workDay)) {
                //添加一天总数据
                $dataTime = [
                    'worker_id' => $data['worker_id'],
                    'work_day' => $data['work_day'],
                    'wxapp_id' => self::$wxapp_id,
                ];
                $this->allowField(true)->save($dataTime);
                $work_time_id = $this->id;
            } else {
                $work_time_id = $workDay->id;
            }
            //添加时间段明细
            $scheduleModel->add($data, $work_time_id);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            $this->error = '添加失败：' . $e->getMessage();
            return false;
        }
    }

    /**
     * 删除班表信息
     * @param $id
     * @param $model
     * @return int
     * @throws BaseException
     */
    public function remove($id, $model)
    {
        //判断当天是否有时间段被预约
        $map = [
            'worker_id' => $model['worker_id'],
            'work_day' => $model['work_day'],
        ];
        $bookingDetail = BookingDetail::where($map)->find();
        if ($bookingDetail) {
            throw new BaseException(['msg' => '当天已有预约，无法进行删除操作']);
        }

        //同时清空对应日期所有时间段
        $scheduleModel = new BookingSchedule;
        $scheduleModel->where('work_time_id', $id)->delete();

        //可被预约总数清0
        $workerInfo = BookingWorker::where('id', $model['worker_id'])->find();
        $workerInfo->booking_num = 0;
        $workerInfo->save();

        return $this->delete();
    }
}