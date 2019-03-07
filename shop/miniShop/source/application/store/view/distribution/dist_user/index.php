<div class="row-content am-cf">
    <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="widget am-cf">
                <div class="widget-head am-cf">
                    <div class="widget-title am-cf">分销会员列表</div>
                </div>
                <div class="widget-body am-fr">
                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
                        <div class="am-form-group">
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs">
                                    <a class="am-btn am-btn-default am-btn-success am-radius"
                                       href="<?= url('distribution.dist_user/add') ?>">
                                        <span class="am-icon-plus"></span> 新增
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="am-u-sm-12">
                        <table width="100%" class="am-table am-table-compact am-table-striped tpl-table-black ">
                            <thead>
                            <tr>
                                <th>分销会员ID</th>
<!--                                <th>微信头像</th>-->
                                <th>微信昵称</th>
                                <th>姓名</th>
                                <th>手机号</th>
                                <th>分销佣金比(%)</th>
                                <th>邮箱</th>
<!--                                <th>分销二维码</th>-->
                                <th>添加时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php if (!empty($list)): foreach ($list as $item): ?>
                                <tr>
                                    <td class="am-text-middle"><?= $item['id'] ?></td>
<!--                                    <td class="am-text-middle"><img src="--><?//= $item['user']['avatarUrl'] ?><!--" /></td>-->
                                    <td class="am-text-middle"><?= $item['wx_nickname'] ?></td>
                                    <td class="am-text-middle"><?= $item['full_name'] ?></td>
                                    <td class="am-text-middle"><?= $item['mobile'] ?></td>
                                    <td class="am-text-middle"><?= $item['discount'] ?></td>
                                    <td class="am-text-middle"><?= $item['email'] ?></td>
<!--                                    <td class="am-text-middle"><img width="40" height="30" src="--><?//= $item['dist_user_code']['wx_code'] ?><!--"></td>-->
                                    <td class="am-text-middle"><?= $item['create_time'] ?></td>
                                    <td class="am-text-middle">
                                        <div class="tpl-table-black-operation">
                                            <a href="<?= url('distribution.dist_user/edit',
                                                ['dist_user_id' => $item['id']]) ?>">
                                                <i class="am-icon-pencil"></i> 编辑
                                            </a>
                                            <a href="javascript:;" class="item-delete tpl-table-black-operation-del"
                                               data-id="<?= $item['id'] ?>">
                                                <i class="am-icon-trash"></i> 删除
                                            </a>
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
        // 删除元素
        var url = "<?= url('distribution.dist_user/delete') ?>";
        $('.item-delete').delete('dist_user_id', url);

    });
</script>

