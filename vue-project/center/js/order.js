let myOrder = new Vue({
	el: "#myOrder",
	data: {
		userInfo: '',
		more: "没有更多内容了",
		items: [], //全部订单列表
		index: 0, //当前顶部索引
		options: [{
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
		],	
		orders: []
	},
	mounted () {
		this.getUserInfo ();
		this.getListInfo ();
	},
	methods:{
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
			switch (this.index) {
				case 0:
					type = 'all';
					break;
				case 1:
					type = 'paying';
					break;
				case 2:
					type = 'payed';
					break;
				case 3:
					type = 'finished';
					break;
			}
			if (this.isLogin()) {
				let data = {
					user_id: this.userInfo.user_id,
					type,
				}
				this.$http.post(webPath + '/index.php?s=/api/dist_order/getDistOrder', data).then((res) => {
					res.data.data.distOrder.forEach((item) => {
						this.orders.push(item);
					});		
				})
			}
		},
		
		// 切换列表,清空原先的列表,重新获取列表信息
		tab(i){
			this.orders.splice(0, this.orders.length);
			this.index = i;
			this.getListInfo ();
		}
	}
})