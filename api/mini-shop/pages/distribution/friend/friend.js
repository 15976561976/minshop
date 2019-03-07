// pages/distribution/friend/friend.js
let App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		friends: "",
    more:  '没有更多内容了',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {	
    this.tab();
	},

/**
 * 
 */
  tab() {
    let that = this
    that.setData({
      more: '努力刷新中',
    });
    setTimeout(() => {
      App._get("dist_user/getFriList", {}, function (res) {
        console.log(res)
        that.setData({
          friends: res.data.list,
          length: res.data.list.length,
          more: '没有更多内容了',
        });
        wx.stopPullDownRefresh();
      })
    }, 1000);
    
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
