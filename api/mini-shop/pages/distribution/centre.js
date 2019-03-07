// pages/distribution/centre.js
let App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		baseAmount:{
			withdrawing_amount:0,
			withdrawed_amount:0,
			unsettled_amount:0
		},
		piece: [{
			"name": "分销佣金",
			"icon": "icon-purse",
			"url": "commission/commission"
		}, {
			"name": "分销订单",
			"icon": "icon-dingdan",
			"url": "order/order"
		}, {
			"name": "提现明细",
			"icon": "icon-shourumingxi",
			"url": "careful/careful"
		}, {
			"name": "我的好友",
			"icon": "icon-31haoyou",
			"url": "friend/friend"
		}, {
			"name": "推广二维码",
			"icon": "icon-erweima",
			"url": "push/push"
		}]
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		let that = this;
		//获取用户信息
		wx.getUserInfo({
			withCredentials: true,
			lang: '',
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {
				that.setData({
					userInfo: {
						avatar: res.userInfo.avatarUrl,
						name:res.userInfo.nickName
					}
				});
			},
		})
		//获取佣金信息
		App._get("dist_amount/getBaseAmount", {}, function(res) {
			if(res.data.baseAmount){
				that.setData({
					baseAmount: res.data.baseAmount
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
