<?php
/**
 * 后台菜单配置
 *    'home' => [
 *       'name' => '首页',                // 菜单名称
 *       'icon' => 'icon-home',          // 图标 (class)
 *       'index' => 'index/index',         // 链接
 *     ],
 */
return [
    'index' => [
        'name' => '首页',
        'icon' => 'icon-home',
        'index' => 'index/index',
    ],
    'goods' => [
        'name' => '商品管理',
        'icon' => 'icon-goods',
        'index' => 'goods/index',
        'submenu' => [
            [
                'name' => '商品列表',
                'index' => 'goods/index',
                'uris' => [
                    'goods/index',
                    'goods/add',
                    'goods/edit'
                ],
            ],
            [
                'name' => '商品分类',
                'index' => 'goods.category/index',
                'uris' => [
                    'goods.category/index',
                    'goods.category/add',
                    'goods.category/edit',
                ],
            ]
        ],
    ],
    'order' => [
        'name' => '订单管理',
        'icon' => 'icon-order',
        'index' => 'order/delivery_list',
        'submenu' => [
            [
                'name' => '待发货',
                'index' => 'order/delivery_list',
            ],
            [
                'name' => '待收货',
                'index' => 'order/receipt_list',
            ],
            [
                'name' => '待付款',
                'index' => 'order/pay_list',
            ],
            [
                'name' => '已完成',
                'index' => 'order/complete_list',

            ],
            [
                'name' => '已取消',
                'index' => 'order/cancel_list',
            ],
            [
                'name' => '全部订单',
                'index' => 'order/all_list',
            ],
        ]
    ],
    'user' => [
        'name' => '用户管理',
        'icon' => 'icon-user',
        'index' => 'user/index',
    ],
    'distribution' => [
        'name' => '分销管理',
        'icon' => 'icon-star',
        'index' => 'distribution.dist_user/index',
        'submenu' => [
            [
                'name' => '分销会员列表',
                'index' => 'distribution.dist_user/index',
                'uris' => [
                    'distribution.dist_user/index',
                    'distribution.dist_user/add',
                    'distribution.dist_user/edit'
                ],
            ],
            [
                'name' => '提现申请',
                'active' => true,
                'submenu' => [
                    [
                        'name' => '待审核',
                        'index' => 'distribution.dist_withdraw_detail/waitcheck'
                    ],
                    [
                        'name' => '待打款',
                        'index' => 'distribution.dist_withdraw_detail/waitpay'
                    ],
                    [
                        'name' => '已打款',
                        'index' => 'distribution.dist_withdraw_detail/payed'
                    ],
                    [
                        'name' => '无效',
                        'index' => 'distribution.dist_withdraw_detail/invalid'
                    ],
                ]
            ],
        ],
    ],
    'booking' => [
        'name' => '预约管理',
        'icon' => 'icon-goods',
        'index' => 'booking.worker/index',
        'submenu' => [
            [
                'name' => '预约技师列表',
                'index' => 'booking.worker/index',
                'uris' => [
                    'booking.worker/index',
                    'booking.worker/add',
                    'booking.worker/edit'
                ],
            ],
            [
                'name' => '技师班表列表',
                'index' => 'booking.work_time/index',
                'uris' => [
                    'booking.work_time/index',
                    'booking.work_time/upload',
//                    'booking.worker/edit'
                ],
            ],
            [
                'name' => '客户预约明细',
                'index' => 'booking.booking_detail/index',
                'uris' => [
                    'booking.booking_detail/index',
//                    'booking.worker/add',
//                    'booking.worker/edit'
                ],
            ],
            [
                'name' => '服务类型列表',
                'index' => 'booking.type/index',
                'uris' => [
                    'booking.type/index',
                    'booking.type/add',
                    'booking.type/edit',
                ],
            ]
        ],
    ],
//    'marketing' => [
//        'name' => '营销管理',
//        'icon' => 'icon-marketing',
//        'index' => 'marketing/index',
//        'submenu' => [],
//    ],
    'wxapp' => [
        'name' => '小程序',
        'icon' => 'icon-wxapp',
        'color' => '#36b313',
        'index' => 'wxapp/setting',
        'submenu' => [
            [
                'name' => '小程序设置',
                'index' => 'wxapp/setting',
            ],
            [
                'name' => '页面管理',
                'active' => true,
                'submenu' => [
                    [
                        'name' => '首页设计',
                        'index' => 'wxapp.page/home'
                    ],
                    [
                        'name' => '页面链接',
                        'index' => 'wxapp.page/links'
                    ],
                ]
            ],
            [
                'name' => '帮助中心',
                'index' => 'wxapp.help/index',
                'urls' => [
                    'wxapp.help/index',
                    'wxapp.help/add',
                    'wxapp.help/edit',
                    'wxapp.help/delete'
                ]
            ],
            [
                'name' => '导航设置',
                'index' => 'wxapp/tabbar'
            ],

        ],
    ],
//    'plugins' => [
//        'name' => '应用中心',
//        'icon' => 'icon-application',
//        'is_svg' => true,   // 多色图标
//        'index' => 'plugins/index',
//    ],
    'setting' => [
        'name' => '设置',
        'icon' => 'icon-setting',
        'index' => 'setting/store',
        'submenu' => [
            [
                'name' => '商城设置',
                'index' => 'setting/store',
            ],
            [
                'name' => '交易设置',
                'index' => 'setting/trade',
            ],
            [
                'name' => '配送设置',
                'index' => 'setting.delivery/index',
                'uris' => [
                    'setting.delivery/index',
                    'setting.delivery/add',
                    'setting.delivery/edit',
                ],
            ],
            [
                'name' => '短信通知',
                'index' => 'setting/sms'
            ],
            [
                'name' => '上传设置',
                'index' => 'setting/storage',
            ],
            [
                'name' => '其他',
                'active' => true,
                'submenu' => [
                    [
                        'name' => '清理缓存',
                        'index' => 'setting.cache/clear'
                    ],
                    [
                        'name' => '环境检测',
                        'index' => 'setting.science/index'
                    ],
                ]
            ]
        ],
    ],
];
