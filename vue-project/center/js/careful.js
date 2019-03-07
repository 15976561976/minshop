let careful = new Vue({
	el: "#careful",
	data: {
		userInfo: '',
		more: '没有更多内容了',
		dataType: "all",
		active: 0, //默认选项
		list: [], //提现申请列表
		"nav": [{
			id: 0,
			"title": "全部",
			dataType: "all"
		}, {
			id: 1,
			"title": "待审核",
			dataType: "check"
		}, {
			id: 2,
			"title": "待打款",
			dataType: "paying"
		}, {
			id: 3,
			"title": "已打款",
			dataType: "payed"
		}, {
			id: 4,
			"title": "无效",
			dataType: "invalid"
		}],
	},
	mounted () {
		this.getUserInfo ();
		this.getListInfo ();
	},
	methods: {
		// 是否登录
		isLogin() {
			if (sessionStorage.getItem('userInfo')) {
				return true;
			}else {
				return false;	
			}
		},
		// 获取用户基本信息
		getUserInfo () {
			if (this.isLogin()) {
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			}else {
				location.href = '../login.html';
			}
		},
		// 获取列表信息
		getListInfo () {
			let type = '';
			switch (this.active) {
				case 0:
					type = 'all';
					break;
				case 1:
					type = 'check';
					break;
				case 2:
					type = 'paying';
					break;
				case 3:
					type = 'payed';
					break;
				case 4:
					type = 'invalid';
					break;
			}
			if (this.isLogin()) {
				let data = {
					user_id: this.userInfo.user_id,
					type,
				}
				this.$http.post(webPath + '/index.php?s=/api/dist_amount/withdrawDetail', data).then((res) => {
					console.log(res.data.data.withdrawDetail);
					res.data.data.withdrawDetail.forEach((item) => {
						this.list.push(item);
						
					});		

				})
			}
		},
		// // 切换列表,清空原先的列表,重新获取列表信息
		navTab(i) {
			this.list.splice(0, this.list.length);
			this.active = i;
			this.getListInfo ();
		}
	}
})
console.log(1)
