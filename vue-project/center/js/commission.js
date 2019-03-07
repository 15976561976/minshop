let commission = new Vue({
	el:"#commission",
	data:{
		all_amount: 0,
		CommissionInfo: {

		},
		items: [],
		userInfo: ''
	},
	mounted () {
		this.getUserInfo ();
		this.getCommissionInfo ();
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
		// 获取分销佣金的详细信息
		getCommissionInfo () {
			if (this.isLogin()) {
				let data = {
					user_id: this.userInfo.user_id
				}
				this.$http.post(webPath + '/index.php?s=/api/dist_amount/getDistAmount', data).then((res) => {
					console.log(res);
					this.commissionInfo = res.body.data.distAmount;
					// 拼接数据
					this.tidy ();
				});
			}else {
				location.href = '../login.html';
			}
		},
		// 拼接数据
		tidy () {
			this.all_amount = this.commissionInfo.dist_all_amount;
			this.items.push({
				id: 'withdrawable',
				option: '可提现佣金',
				sideInfo: this.commissionInfo.withdrawing_amount + '元'
			});
			this.items.push({
				id: 'withdrawals',
				option: '已提现佣金',
				sideInfo: this.commissionInfo.withdrawed_amount + '元'
			});
			this.items.push({
				id: 'wait',
				option: '待打款佣金',
				sideInfo: this.commissionInfo.wait_pay_amount + '元'
			});
		}
	}
})
// console.log(res);