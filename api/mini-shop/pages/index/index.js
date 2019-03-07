let App = getApp();

Page({
	data: {
		// banner轮播组件属性
		indicatorDots: true, // 是否显示面板指示点	
		autoplay: true, // 是否自动切换
		interval: 3000, // 自动切换时间间隔
		duration: 800, // 滑动动画时长
		imgHeights: {}, // 图片的高度
		imgCurrent: {}, // 当前banne所在滑块指针

		// 页面元素
		items: {},
		newest: {},
		best: {},

		scrollTop: 0,
		userInfo: {},
		orderCount: {},
	},

	onLoad: function(query) {
		let that = this
		//判断是否有scene
		if (query.scene) {
			wx.setStorage({
				key: 'scene',
				data: decodeURIComponent(query.scene),
				// data: options.scene,
				success() {
					that.getUserDetail();
				},
				fail() {
					console.log("无scene")
				}
			});
		}
		// 设置页面标题
		App.setTitle();

		// 获取首页数据
		this.getIndexData();

		//判断进入场景
		let scene = wx.getLaunchOptionsSync()
		if (scene.scene === 1011 || scene.scene === 1012 || scene.scene === 1013 || scene.scene === 1047 || scene.scene ===1048 || scene.scene === 1049) {
			console.log(scene)
			wx.getStorage({
				key: 'scene',
				success: function(res) {
					if (res.data != 'undefined') {
						that.getUserDetail();
					}
				},
			})
		} else {

		}
	},

	/**
	 * 获取首页数据
	 */
	getIndexData: function() {
		let _this = this;
		App._get('index/page', {}, function(result) {
			_this.setData(result.data);
		});
	},

	/**
	 * 计算图片高度
	 */
	imagesHeight: function(e) {
		let imgId = e.target.dataset.id,
			itemKey = e.target.dataset.itemKey,
			ratio = e.detail.width / e.detail.height, // 宽高比
			viewHeight = 750 / ratio, // 计算的高度值
			imgHeights = this.data.imgHeights;

		// 把每一张图片的对应的高度记录到数组里
		if (typeof imgHeights[itemKey] === 'undefined') {
			imgHeights[itemKey] = {};
		}
		imgHeights[itemKey][imgId] = viewHeight;
		// 第一种方式
		let imgCurrent = this.data.imgCurrent;
		if (typeof imgCurrent[itemKey] === 'undefined') {
			imgCurrent[itemKey] = Object.keys(this.data.items[itemKey].data)[0];
		}
		this.setData({
			imgHeights,
			imgCurrent
		});
	},

	bindChange: function(e) {
		let itemKey = e.target.dataset.itemKey,
			imgCurrent = this.data.imgCurrent;
		// imgCurrent[itemKey] = e.detail.current;
		imgCurrent[itemKey] = e.detail.currentItemId;
		this.setData({
			imgCurrent
		});
	},

	goTop: function(t) {
		this.setData({
			scrollTop: 0
		});
	},

	scroll: function(t) {
		this.setData({
			indexSearch: t.detail.scrollTop
		}), t.detail.scrollTop > 300 ? this.setData({
			floorstatus: !0
		}) : this.setData({
			floorstatus: !1
		});
	},

	onShow() {
		let that = this;
		wx.setStorage({
			key: 'myFlag',
			data: '1',
		})
    // 获取小程序基础信息
    that.getWxappBase(function (wxapp) {
      // 设置navbar标题、颜色
      wx.setNavigationBarColor({
        frontColor: wxapp.navbar.top_text_color.text,
        backgroundColor: wxapp.navbar.top_background_color

      })
    });
	},

	onShareAppMessage: function() {
		return {
			title: "小程序首页",
			desc: "",
			path: "/pages/index/index"
		};
	},
	/**
	 * 获取当前用户信息
	 */
	getUserDetail: function() {
		let that = this;
		App._get('user.index/detail', {}, function(result) {
			that.setData(result.data);
			if (result.data.userInfo.dist_user_id) {
				//获取分销员id
				wx.setStorage({
					key: "dist_user_id",
					data: result.data.userInfo.dist_user_id
				})
			}
			//绑定好友
			App._post_form('dist_user/bindFriRelation', {
				dist_user_id: result.data.userInfo.dist_user_id
			}, function(friend) {
				console.log(friend)
			}, function(e) {
				console.log(e)
			}, function() {

			});
		});
	},
  /**
  * 获取小程序基础信息
  */
  getWxappBase: function (callback) {
    // let App = this;
    App._get('wxapp/base', {}, function (result) {
      // 记录小程序基础信息
      wx.setStorageSync('wxapp', result.data.wxapp);
      callback && callback(result.data.wxapp);
    }, false, false);
  },
});
