<div class="row-content am-cf">
    <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="widget am-cf">
                <form id="my-form" class="am-form tpl-form-line-form" enctype="multipart/form-data" method="post">
                    <div class="widget-body">
                        <fieldset>
                            <div class="widget-head am-cf">
                                <div class="widget-title am-fl">编辑服务技师信息</div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">技师名称 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="text" class="tpl-form-input" name="bookingWorker[worker_name]"
                                           value="<?= $model['worker_name'] ?>" required>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">技师级别 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="text" class="tpl-form-input" name="bookingWorker[level]"
                                           value="<?= $model['level'] ?>" required>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">服务类型 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <select name="bookingWorker[type_id]"
                                            data-am-selected="{searchBox: 1, btnSize: 'sm'}">
                                        <option value="0">上级服务类型</option>
                                        <?php if (isset($type)): foreach ($type as $first): ?>
                                            <option value="<?= $first['id'] ?>"
                                                <?= $model['type_id'] === $first['id'] ? 'selected' : '' ?> disabled>
                                                <?= $first['name'] ?></option>
                                                <?php if (isset($first['child'])): foreach ($first['child'] as $two): ?>
                                                    <option value="<?= $two['id'] ?>"
                                                        <?= $model['type_id'] === $two['id'] ? 'selected' : '' ?>>
                                                        　　<?= $two['name'] ?></option>
                                                    <?php if (isset($two['child'])): foreach ($two['child'] as $three): ?>
                                                        <option value="<?= $three['id'] ?>"
                                                            <?= $model['type_id'] === $three['id'] ? 'selected' : '' ?>>
                                                            　　　<?= $three['name'] ?></option>
                                                    <?php endforeach; endif; ?>
                                                <?php endforeach; endif; ?>
                                        <?php endforeach; endif; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">技师头像 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <div class="am-form-file">
                                        <button type="button"
                                                class="upload-file am-btn am-btn-secondary am-radius">
                                            <i class="am-icon-cloud-upload"></i> 选择图片
                                        </button>
                                        <div class="uploader-list am-cf">
                                            <?php if ($model['avatar']): ?>
                                                <div class="file-item">
                                                    <img src="<?= $model['avatar']['file_path'] ?>">
                                                    <input type="hidden" name="bookingWorker[avatar_id]"
                                                           value="<?= $model['avatar_id'] ?>">
                                                    <i class="iconfont icon-shanchu file-item-delete"></i>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="help-block am-margin-top-sm">
                                        <small>尺寸150x150像素以上，大小2M以下</small>
                                    </div>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">描述 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <textarea class="" rows="6" placeholder="请输入帮助内容" name="bookingWorker[describe]" required><?= $model['describe'] ?></textarea>
                                </div>
                            </div>
<!--                            <div class="am-form-group">-->
<!--                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">可预约数 </label>-->
<!--                                <div class="am-u-sm-9 am-u-end">-->
<!--                                    <input type="number" class="tpl-form-input" name="bookingWorker[booking_num]"-->
<!--                                           value="--><?//= $model['booking_num'] ?><!--" required>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">排序 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="number" class="tpl-form-input" name="bookingWorker[sort]"
                                           value="<?= $model['sort'] ?>" required>
                                    <small>数字越小越靠前</small>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <div class="am-u-sm-9 am-u-sm-push-3 am-margin-top-lg">
                                    <button type="submit" class="j-submit am-btn am-btn-secondary">提交
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 图片文件列表模板 -->
{{include file="layouts/_template/tpl_file_item" /}}

<!-- 文件库弹窗 -->
{{include file="layouts/_template/file_library" /}}

<script>
    $(function () {

        // 选择图片
        $('.upload-file').selectImages({
            name: 'bookingWorker[avatar_id]'
        });

        /**
         * 表单验证提交
         * @type {*}
         */
        $('#my-form').superForm();

    });
</script>
