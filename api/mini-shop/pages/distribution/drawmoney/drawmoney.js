// pages/distribution/drawmoney/drawmoney.js
let App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		option: false, //选择银行框
		havecard: false, //是否有添加银行卡
		defaultcard: 0, //默认提现银行卡
		cardlist: "", //银行卡列表
		cardId: "",
		withAmount:0//默认提现金额
	},
	selectCard: function(e) {
		this.setData({
			havecard: true,
			option: false,
			defaultcard: e.currentTarget.dataset.item
		})
	},
	/**
	 * 表单提交提现申请
	 */
	saveData: function(e) {
		if (this.data.havecard) {
			let _this = this,
				values = e.detail.value
				values.bank_card_id = this.data.cardlist[this.data.defaultcard].id // 银行卡id
			// 表单验证
			if (!_this.validation(values)) {
				App.showError(_this.data.error);
				return false;
			} else if (!_this.validation(values)) {

			}

			// 按钮禁用
			_this.setData({
				disabled: true
			});

			// 提交申请
			App._post_form('dist_amount/withdraw', values, function(result) {
				App.showSuccess(result.msg, function() {
					wx.navigateBack();
				});
			}, false, function() {
				// 解除禁用
				_this.setData({
					disabled: false
				});
			});
		}else{
			wx.showModal({
				title: '友情提示',
				content: "请添加银行卡",
				showCancel: false
			});
		}

	},
	/**
	 * 表单验证
	 */
	validation: function(values) {
		if (values.withdraw_price.length < 1) {
			this.data.error = '请输入提现金额';
			return false;
		}
		// 		let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
		// 		if (!reg.test(values.withdraw_price)) {
		// 			this.data.error = "请输入正确金额";
		// 			return false;
		// 		}
		if (this.data.withAmount < values.withdraw_price) {
			this.data.error = "不能超过可提现金额";
			return false;
		}
		if (values.withdraw_price < 1) {
			this.data.error = "请输入正确金额";
			return false;
		}
		return true;
	},
	//显示选择
	option: function() {
		if (this.data.cardlist.length >= 1) {
			this.setData({
				option: true
			})
		} else {
			wx.navigateTo({
				url: "./card"
			})
		}
	},
	//隐藏选择
	hide: function() {
		this.setData({
			option: false
		})
	},
	//移除银行卡
	delCard: function(e) {
		let that = this;
		let bank_card_id = e.target.dataset.idx.id
		wx.showModal({
			title: '友情提示',
			content: '请选择是否确认移除此银行卡',
			success(res) {
				if (res.confirm) {
					App._post_form("dist_amount/delBankCard", {
						bank_card_id
					}, function(res) {
						that.hide()
						that.onShow()
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
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
		var that = this
		App._get("dist_amount/getBankCardList", {}, function(res) {
			console.log(res)
			//判断返回的信息是否为空
			if(res.data.withAmount){
				if (res.data.bankCardList.length >= 1) {
					that.setData({
						havecard: true,
						cardlist: res.data.bankCardList, //银行卡信息列表
					})
				} else {
					that.setData({
						havecard: false,
						cardlist: res.data.bankCardList, //银行卡信息列表
						cardId: ""
					})
				}
				that.setData({
					withAmount: res.data.withAmount //可提现佣金
				})
			}
		})
	},
	//添加银行卡
	addCard: function() {
		var that = this

		if (that.data.cardlist.length < 3) {
			wx.navigateTo({
				url: "./card"
			})
		} else {
			wx.showModal({
				title: "友情提示",
				content: "银行卡最多只能3张",
				confirmText: "知道了",
				showCancel: false
			})
		}
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
