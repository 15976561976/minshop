// pages/distribution/careful/careful.js
let App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    more: '没有更多内容了',
		dataType: "all",
		active:0,//默认选项
		"list": "", //提现申请列表
		"nav": [{
			id: 0,
			"title": "全部",
			dataType:"all"
		}, {
			id: 1,
			"title": "待审核",
			dataType:"check"
		}, {
			id: 2,
			"title": "待打款",
			dataType:"paying"
		}, {
			id: 3,
			"title": "已打款",
			dataType:"payed"
		}, {
			id: 4,
			"title": "无效",
			dataType:"invalid"
		}],
	},
	
	//获取提现明细信息
	tab:function(){
		let that = this;
		let type = this.data.nav[this.data.active].dataType;//获取请求参数
    that.setData({
      more: '努力加载中'
    });
		App._get("dist_amount/withdrawDetail",{type},function(res){
			
      that.setData({
        list: res.data.withdrawDetail,//全部订单列表
        more: '没有更多内容了'
      });
      wx.stopPullDownRefresh();
		})
	},
	
	//切换选项卡
	navtab: function(e) {
		var idx = e.currentTarget.dataset.index;//当前点击的选项卡索引
		this.setData({
			active: idx
		})
		this.tab()
		wx.pageScrollTo({
			scrollTop: 0
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(dataType) {
		this.tab()
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
    this.tab();
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
