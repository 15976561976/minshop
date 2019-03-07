// pages/reserve/reserve.js
let App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navOn: 0, //当前项目
		nav: [], //服务项目列表
		select: [] //服务项目子列表
	},
	//选择服务列表
	nav: function(e) {
		let that = this;
		let idx = e.target.dataset.item; //当前点击的列表id
		let list = that.data.nav; //服务项目列表
		//判断所选列表
		list.forEach(function(item, i) {
			if (item.id == idx) {
				that.setData({
					navOn: idx,
					select: item.child
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function() {
		let that = this
		//获取手机信息宽高
		wx.getSystemInfo({
			success(res) {
				that.setData({
					screenHeight: res.windowHeight-70
				})
			}
		})
		App._get("booking/getTypeList", {}, function(res) {
      console.log(res.data.list)
			that.setData({
				nav: res.data.list, //服务项目列表
				navOn: res.data.list[0].id, //初始选择项目id
				select: res.data.list[0].child //初始项目子列表
			})
			wx.stopPullDownRefresh();
		})
	},
	//选择服务类型跳转
	selectType: function(e) {
		var data = {
			id: e.currentTarget.dataset.id,
			text: e.currentTarget.dataset.text
		}
		wx.setStorage({
			key: "serveType",
			data: data
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {},

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
		this.onLoad()
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
