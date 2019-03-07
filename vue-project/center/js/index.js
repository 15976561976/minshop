let vm = new Vue({
	el: '#container',
	data: {
		// 用户基本信息
		userInfo: '',
		// 佣金基本信息
		commissionInfo: ''

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
		// 获取佣金的基本信息
		getCommissionInfo () {
			if (this.isLogin()) {
				let data = {
					user_id: this.userInfo.user_id
				}
				this.$http.post(webPath + '/index.php?s=/api/dist_amount/getBaseAmount', data).then((res) => {
					this.commissionInfo = res.body.data.baseAmount;
				});
			}else {
				location.href = '../login.html';
			}
		}
	},
	mounted () {
		this.getUserInfo ();
		this.getCommissionInfo ();
	}
});
