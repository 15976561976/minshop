// pages/distribution/order/order.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      more: "没有更多内容了",
      items: [],//全部订单列表
			rootapi:App.siteInfo.siteroot + "uploads/",//商品图片文件路径
      index: 0,//当前顶部索引
      options: [
        {
          type: 'all',
          title: '全部',
        },
        {
          type: 'paying',
          title: '待付款',
        },
        {
          type: 'payed',
          title: '已付款',
        },
        {
          type: 'finished',
          title: '已完成',
        }
      ]
  },
	//获取分销订单信息
	tab:function(call){
		let that =this
		let type = this.data.options[this.data.index].type;//获取请求参数
    this.setData({
      more: '努力刷新中'
    });
		App._get("dist_order/getDistOrder",{type},function(res){
      that.setData({
        items: res.data.distOrder,//全部订单列表
        more: '没有更多内容了'
      });
      wx.stopPullDownRefresh();
			
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.tab();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.tab()//加载列表信息
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 当切换顶部的列表栏时的处理函数
	 * 切换顶部列表加载信息
   */
  onSwitch: function(even) {
    let index = even.currentTarget.dataset.index;
    this.setData({
      index: index
    });
		this.tab()//加载列表信息
    wx.pageScrollTo({
      scrollTop: 0,
    })
  }
})