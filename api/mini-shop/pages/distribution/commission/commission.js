// pages/distribution/commission/commission.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		all_amount:0,
    items: [
      {
        id: 'withdrawable',
        option: '可提现佣金',
        sideInfo: 0+'元'
      },
      {
        id: 'withdrawals',
        option: '已提现佣金',
        sideInfo: 0+'元'
      },
      {
        id: 'wait',
        option: '待打款佣金',
        sideInfo: 0+'元'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let that = this
		App._get("dist_amount/getDistAmount",{},function(res){
			//是否有信息
			if(res.data.distAmount){
				that.setData({
					all_amount:res.data.distAmount.dist_all_amount,//分销佣金
					"items[0].sideInfo.":res.data.distAmount.withdrawing_amount +"元",//可提现佣金
					"items[1].sideInfo.":res.data.distAmount.withdrawed_amount +"元",//已提现佣金
					"items[2].sideInfo.":res.data.distAmount.wait_pay_amount +"元"//待打款佣金
				})
			}
		})
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
   * 点击我要提现的处理函数
   */
  onWithdrawal: function() {
    wx.navigateTo({
      url: '/pages/distribution/drawmoney/drawmoney',
    })
  },


})