// let order1 = {
// 	id: '001',
// 	date: '2017-11-14',
// 	state: '已完成',
// 	products: [
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '1'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '2'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '3'
// 	}
// 	],
// };
// let order2 = {
// 	id: '002',
// 	date: '2017-11-14',
// 	state: '待付款',
// 	products: [
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '1'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '2'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '3'
// 	}
// 	],
// };

// let order3 = {
// 	id: '003',
// 	date: '2017-11-14',
// 	state: '待发货',
// 	products: [
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '1'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '2'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '3'
// 	}
// 	],
// };
// let order4 = {
// 	id: '004',
// 	date: '2017-11-14',
// 	state: '待收货',
// 	products: [
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '1'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '2'
// 	},
// 	{	
// 		img: './img/pd/sf-1.jpg',
// 		url: '',
// 		title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
// 		currentPrice: '399.99',
// 		count: '3'
// 	}
// 	],
// };

let vm = new Vue({
	el: '#yh-my-order',
	data: {
		listNav: ['全部订单', '待付款', '待发货', '待收货'],
		states: {
			complete: {
				title: '全部订单',
				btns: []
			},
			paying: {
				title: '待付款',
				btns: ['取消订单', '立即付款']
			},
			backOrder: {
				title: '待发货',
				btns: []
			},
			waitReceiving: {
				title: '待收货',
				btns: ['', '确认收货']
			}
		},
		orders: [],
		index: 0,
		url: '',
		userInfo: ''
	},
	mounted () {
		this.getUserInfo ();
		this.showList = location.hash.substring(1);
		switch (this.showList) {
			case 'all':
				this.index = 0;
				break;
			case 'paying':
				this.index = 1;
				break;
			case 'backOrder':
				this.index = 2;
				break;
			case 'waitReceiving':
				this.index = 3;
				break;
		}
		this.init ();
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
				location.href = './login.html';
			}
		},
		// 初始化列表
		init () {
			let hash = location.hash.slice(1);
			let dataType = '';
			switch (hash) {
				case 'all': //全部
					dataType = 'all';
					break;
				case 'paying': //待付款 
					dataType = 'payment';
					break;
				case 'backOrder': //待发货 
					dataType = 'delivery';
					break;
				case 'waitReceiving': //待收货 
					dataType = 'received';
					break;
			}
			let data = {
				user_id: this.userInfo.user_id,
				dataType
			}
			//请求后台数据
			this.$http.post(webPath + '/index.php?s=/api/user.order/lists', data).then((res) => {
				this.orders = [];
				res.data.list.forEach((item, ind) => {
					this.orders.push({
						id: item.order_id,
						date: '2017-11-14',
						state: '待收货',
						products: []
					});
					this.orders.products[ind].push({
						img: './img/pd/sf-1.jpg',
						url: '',
						title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
						currentPrice: '399.99',
						count: '1'
					});
				});
				console.log('获取成功');
			}, (res) => {
				console.log('获取失败');
			})
		},
		selectBtn (state) {
			switch (state) {
				case '全部订单':
				return this.states.complete;
				break;
				case '待付款':
				return this.states.paying;
				break;
				case '待发货':
				return this.states.backOrder;
				break;
				case '待收货':
				return this.states.waitReceiving;
				break;
			}
		},
		// 监听各个状态下的按钮
		clickBtn (e, btn, id) {
			//待付款
			if (btn == '取消订单') {
				console.log('取消订单');
			}	
			if (btn == '立即付款') {
				console.log('立即付款');
				location.href = './Settlement.html?' + 'id=' + id;
			}
			//待收货
			if (btn == '确认收货') {
				console.log('确认收货');
			}
		},
		//改变状态列表，获取数据
		changeList (e, list) {
			//全部
			if (list == '全部订单') {
				this.index = 0;
				let data = {
					user_id: this.userInfo.user_id,
					dataType: 'all'
				}	
				//请求后台数据
				this.$http.post(webPath + '/index.php?s=/api/user.order/lists', data).then((res) => {
					console.log(res);
					console.log('获取成功');
				}, (res) => {
					console.log('获取失败');
				})
			}
			//待付款
			if (list == '待付款') {
				this.index = 1;
				let data = {
					user_id: this.userInfo.user_id,
					dataType: 'payment'
				}	
				//请求后台数据
				this.$http.post(webPath + '/index.php?s=/api/user.order/lists', data).then((res) => {
					console.log(res);
					console.log('获取成功');
				}, (res) => {
					console.log('获取失败');
				})
			}
			//待发货
			if (list == '待发货') {
				this.index = 2;
				let data = {
					user_id: this.userInfo.user_id,
					dataType: 'delivery'
				}	
				//请求后台数据
				this.$http.post(webPath + '/index.php?s=/api/user.order/lists', data).then((res) => {
					console.log(res);
					console.log('获取成功');
				}, (res) => {
					console.log('获取失败');
				})
			}
			//待收货
			if (list == '待收货') {
				this.index = 3;
				let data = {
					user_id: this.userInfo.user_id,
					dataType: 'received'
				}	
				//请求后台数据
				this.$http.post(webPath + '/index.php?s=/api/user.order/lists', data).then((res) => {
					console.log(res);
					console.log('获取成功');
				}, (res) => {
					console.log('获取失败');
				})
			}
		},
		toDetail (e, order) {
			location.href = 'order-detail.html?order_id=' + order.id;
		}
	}
});