let App = getApp();
Page({
	data: {
		value: "", //搜索框
		history: [], //历史搜索
		newarr: [], //人员列表
		typeLi:[],//类型列表
		url: App.siteInfo.siteroot + "uploads/" //图片url前段
	},
	//点击搜索框
	search: function(val) {
		var that = this
		var keyword = val.detail.value.text.replace(/\s+/g, '') //表单数据
		//添加搜索历史
		if (keyword !== "") {
			var historyArr = this.data.history
			//超10个删除最后一个
			if (historyArr.length > 10) {
				historyArr.splice(-1, 1)
			}
			//在第一个前插入搜索记录
			historyArr.unshift(keyword)
			that.setData({
				value: "",
				history: historyArr
			})
			that.send(keyword)
		} else {
			wx.showModal({
				title: '友情提示',
				content: "请输入内容",
				showCancel: false
			});
		}
		//添加记录到本地
		var value = that.data.history
		wx.setStorage({
			key: "history",
			data: value
		})
	},
	//搜索功能
	send(keyword) {
		let that = this
		App._post_form("booking/search", {
			keyword
		}, function(res) {
			that.setData({
				newarr: res.data.userInfo,
				typeLi:res.data.typeInfo
			})
		})
	},
	//点击记录搜索
	record: function(e) {
		var that = this
		//获取点击的元素传搜索的参数
		var keyword = e.currentTarget.dataset.item;
		that.send(keyword)
	},
	//清空搜索记录
	empty: function() {
		this.setData({
			history: []
		})
		wx.removeStorage({
			key: 'history'
		})

	},
	//点击服务人员跳转
	clickWorker: function(e) {
		wx.setStorage({
			key: "worker_id",
			data: e.currentTarget.dataset.id
		})
		wx.removeStorage({
			key: "weekIdx"
		})
	},
	//点击服务类型跳转
	typeLi:function(e){
		console.log(e)
		var data = {
			id: e.currentTarget.dataset.id,
			text: e.currentTarget.dataset.text
		}
		wx.setStorage({
			key: "serveType",
			data: data
		})
	},
	onLoad: function() {
		let that = this;
		wx.getStorage({
			key: "history",
			success(res) {
				that.setData({
					history: res.data
				})
			}
		})
	}
})
