<div class="row-content am-cf">
    <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="widget am-cf">
                <div class="widget-head am-cf">
                    <div class="widget-title am-cf"><?= $title ?></div>
                </div>
                <div class="widget-body am-fr">
<!--                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">-->
<!--                        <div class="am-form-group">-->
<!--                            <div class="am-btn-toolbar">-->
<!--                                <div class="am-btn-group am-btn-group-xs">-->
<!--                                    <a class="am-btn am-btn-default am-btn-success am-radius"-->
<!--                                       href="--><?//= url('distribution.dist_user/add') ?><!--">-->
<!--                                        <span class="am-icon-plus"></span> 新增-->
<!--                                    </a>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="am-u-sm-12">
                        <table width="100%" class="am-table am-table-compact am-table-striped tpl-table-black ">
                            <thead>
                            <tr>
                                <th>分销会员ID</th>
                                <th>分销会员姓名</th>
<!--                                <th>微信头像</th>-->
                                <th>提现金额</th>
                                <th>提交时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php if (!empty($list)): foreach ($list as $item): ?>
                                <tr>
                                    <td class="am-text-middle"><?= $item['dist_user_id'] ?></td>
                                    <td class="am-text-middle"><?= $item['dist_user']['full_name'] ?></td>
<!--                                    <td class="am-text-middle"><img src="--><?//= $item['user']['avatarUrl'] ?><!--"></td>-->
                                    <td class="am-text-middle"><?= $item['withdraw_price'] ?></td>
                                    <td class="am-text-middle"><?= $item['create_time'] ?></td>
                                    <td class="am-text-middle">
                                        <div class="tpl-table-black-operation">
                                            <?php if(request()->action() == 'waitcheck'): ?>
                                                <a href="javascript:;" class="check" data-id="<?= $item['id'] ?>">
        <!--                                                <i class="am-icon-pencil"></i> -->
                                                    通过
                                                </a>
                                                <a href="javascript:;" class="tpl-table-black-operation-del unCheck"
                                                   data-id="<?= $item['id'] ?>">
        <!--                                                <i class="am-icon-trash"></i> -->
                                                    不通过
                                                </a>
                                            <?php endif; ?>
                                            <?php if(request()->action() == 'waitpay'): ?>
                                                <a href="javascript:;" class="tpl-table-black-operation-del payed"
                                                   data-id="<?= $item['id'] ?>">
                                                    <!--                                                <i class="am-icon-trash"></i> -->
                                                    确认打款
                                                </a>
                                            <?php endif; ?>
                                            <?php if(!in_array(request()->action(),['waitcheck', 'payed'])): ?>
<!--                                                <a href="javascript:;" class="tpl-table-black-operation-green cancel"-->
<!--                                                   data-id="--><?//= $item['id'] ?><!--">-->
                                                    <!--                                                <i class="am-icon-trash"></i> -->
<!--                                                    撤销-->
<!--                                                </a>-->
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; else: ?>
                                <tr>
                                    <td colspan="5" class="am-text-center">暂无记录</td>
                                </tr>
                            <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        //审核通过
        $(".check").click(function () {
            var id = $(this).attr('data-id');
            var url = "<?= url('/store/distribution.dist_withdraw_detail/check') ?>";
            layer.confirm('确定要通过吗？', function (index) {
                $.post(url, {id:id, status:1}, function (result) {
                    result.code === 1 ? $.show_success(result.msg, result.url)
                        : $.show_error(result.msg);
                });
                layer.close(index);
            });
        });

        //审核不通过
        $(".unCheck").click(function () {
            var id = $(this).attr('data-id');
            var url = "<?= url('/store/distribution.dist_withdraw_detail/check') ?>";
            layer.confirm('确定不通过吗？', function (index) {
                $.post(url, {id:id, status:3}, function (result) {
                    result.code === 1 ? $.show_success(result.msg, result.url)
                        : $.show_error(result.msg);
                });
                layer.close(index);
            });
        });

        //确认打款
        $(".payed").click(function () {
            var id = $(this).attr('data-id');
            var url = "<?= url('/store/distribution.dist_withdraw_detail/check') ?>";
            layer.confirm('确定已经打款了吗？', function (index) {
                $.post(url, {id:id, status:2}, function (result) {
                    result.code === 1 ? $.show_success(result.msg, result.url)
                        : $.show_error(result.msg);
                });
                layer.close(index);
            });
        });

        //撤销操作
        $('.cancel').click(function () {
            var id = $(this).attr('data-id');
            var url = "<?= url('/store/distribution.dist_withdraw_detail/check') ?>";
            layer.confirm('确定要撤销吗？', function (index) {
                $.post(url, {id:id, status:0}, function (result) {
                    result.code === 1 ? $.show_success(result.msg, result.url)
                        : $.show_error(result.msg);
                });
                layer.close(index);
            });
        });
    });
</script>

