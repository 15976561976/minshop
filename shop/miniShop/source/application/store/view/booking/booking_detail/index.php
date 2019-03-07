<div class="row-content am-cf">
    <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="widget am-cf">
                <div class="widget-head am-cf">
                    <div class="widget-title am-cf">客户预约明细</div>
                </div>
                <div class="widget-body am-fr">
                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
                        <div class="am-form-group">
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs">
<!--                                    <a class="am-btn am-btn-default am-btn-success am-radius"-->
<!--                                       href="#">-->
<!--                                        <span class="am-icon-plus"></span> 上传班表-->
<!--                                    </a>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="am-scrollable-horizontal am-u-sm-12">
                        <table width="100%" class="am-table am-table-compact am-table-striped
                         tpl-table-black am-text-nowrap">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>客户姓名</th>
                                <th>技师姓名</th>
                                <th>服务类型</th>
                                <th>预约日期</th>
                                <th>预约时间段</th>
                                <th>添加时间段</th>
                                <th>服务状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php if (!$list->isEmpty()): foreach ($list as $item): ?>
                                <tr>
                                    <td class="am-text-middle"><?= $item['id'] ?></td>
                                    <td class="am-text-middle"><?= $item['customer_name'] ?></td>
                                    <td class="am-text-middle">
                                        <p class="item-title"><?= $item['worker']['worker_name'] ?></p>
                                    </td>
                                    <td class="am-text-middle"><?= $item['worker']['type']['name'] ?></td>
                                    <td class="am-text-middle"><?= $item['booking_time']['work_day'] ?></td>
                                    <td class="am-text-middle"><?= $item['booking_time']['time_line'] ?></td>
                                    <td class="am-text-middle"><?= $item['create_time'] ?></td>
                                    <td class="am-text-middle"><?= ['预约中', '已完成', '已取消', '已过期'][$item['booking_status']] ?></td>
                                    <td class="am-text-middle">
                                        <div class="tpl-table-black-operation">
                                            <?php if($item['booking_status'] == 0) : ?>
                                                <a href="javascript:;" class="complete" data-id="<?= $item['id'] ?>">完成服务</a>
<!--                                            <a href="javascript:;" class="item-delete tpl-table-black-operation-del"-->
<!--                                               data-id="--><?//= $item['id'] ?><!--">-->
<!--                                                <i class="am-icon-trash"></i> 删除-->
<!--                                            </a>-->
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; else: ?>
                                <tr>
                                    <td colspan="10" class="am-text-center">暂无记录</td>
                                </tr>
                            <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                    <div class="am-u-lg-12 am-cf">
                        <div class="am-fr"><?= $list->render() ?> </div>
                        <div class="am-fr pagination-total am-margin-right">
                            <div class="am-vertical-align-middle">总记录：<?= $list->total() ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {

        // 点击完成预约
        $(".complete").click(function () {
            var id = $(this).attr('data-id');
            var url = "<?= url('/store/booking.booking_detail/complete') ?>";
            layer.confirm('确定已完成服务吗？', function (index) {
                $.post(url, {id:id, status:1}, function (result) {
                    result.code === 1 ? $.show_success(result.msg, result.url)
                        : $.show_error(result.msg);
                });
                layer.close(index);
            });
        });

    });
</script>

