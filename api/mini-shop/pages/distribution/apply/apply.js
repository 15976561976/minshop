// pages/distribution/apply/apply.js
let App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		"current": false //条款是否勾选
	},
	//
	tab: function() {
		this.setData({
			current: !this.data.current
		})
	},
	//跳转协议
	protocol() {
		wx.navigateTo({
			url:"./protocol"
		})
	},
	
  /**
   * 表单提交
   */
  saveData: function(e) {
    let _this = this,
      values = e.detail.value
    values.region = this.data.region;

    // 表单验证
    if (!_this.validation(values)) {
      App.showError(_this.data.error);
      return false;
    }

    // 按钮禁用
    _this.setData({
      disabled: true
    });

    // 提交到后端
    App.my_post_form('dist_user/register', values, function(result) {
      App.showSuccess(result.msg, function() {
        wx.navigateBack();
      });
    }, false, function() {
      // 解除禁用
      _this.setData({
        disabled: false
      });
    });
  },
	/**
	* 表单验证
	*/
	validation: function(values) {
		if (values.full_name === '') {
			this.data.error = '姓名不能为空';
			return false;
		}
		if (values.mobile.length < 1) {
			this.data.error = '手机号不能为空';
			return false;
		}
		if (values.mobile.length !== 11) {
			this.data.error = '手机号长度有误';
			return false;
		}
		let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if (!reg.test(values.mobile)) {
			this.data.error = '手机号不符合要求';
			return false;
		}
		if (values.email.length < 1) {
			this.data.error = '邮箱不能为空';
			return false;
		}
		let ma = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
		if (!ma.test(values.email)) {
			this.data.error = '邮箱不符合要求';
			return false;
		}
		//勾选协议
		if(!this.data.current){
			this.data.error = '同意萤火协议再申请';
			return false;
		}
		return true;
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
