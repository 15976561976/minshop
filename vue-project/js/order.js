let order = {
	img: './img/pd/sf-10.jpg',
	title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
	currentPrice: '399.99',
	beforePrice: '495.65',
	weight: '2.8020',
	count: 1
}



let vm = new Vue({
	el: '#order',
	data: {
		orders: [{
			goods_weight: 1
		}],
		pay: 0,
		freight: 1,
		realPay: 0,
		userInfo: '',
		address: {
			name: '',
			phone: '',
			region: {
				province: '',
				city: '',
				region: ''
			},
			detail: ''
		},
		flag: {
			hasChange: false
		},
		orderInfo: '',
		alertbool: false, //提示信息
		alertext: '请添加收货地址'
	},
	mounted() {
		this.getUserInfo();
		this.getDefaultAddr();
		this.getOrderInfo();
	},
	beforeUpdate() {
		if (this.flag.hasChange == true) {
			this.getDefaultAddr();
		}
	},

	methods: {
		// 是否登录
		isLogin() {
			if (sessionStorage.getItem('userInfo')) {
				return true;
			} else {
				return false;
			}
		},
		// 获取用户基本信息
		getUserInfo() {
			if (this.isLogin()) {
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			} else {
				location.href = './login.html';
			}
		},
		// 获取默认地址
		getDefaultAddr() {
			let options = {
				params: {
					user_id: this.userInfo.user_id
				}
			}
			this.$http.get(webPath + '/index.php?s=/api/address/lists', options).then(res => {
				let defaultID = res.body.data.default_id;
				res.body.data.list.forEach(item => {
					if (item.address_id == defaultID) {
						this.address = item;
					}
				});
			});
		},
		changeAddr() {
			this.flag.hasChange = true;
			window.setTimeout(() => {
				location.href = 'my-addres.html';
			}, 10)

		},
		// 获取订单信息
		getOrderInfo() {
			let search = location.search.slice(1);
			let orderInfo = {};

			if (search == "") {
				let user = JSON.parse(sessionStorage.getItem('userInfo'));
				let options = {
					params: {
						user_id: user.user_id
					}
				}

				//结算购物车接口数据
				this.$http.get(webPath + "/index.php?s=/api/order/cart", options).then((res) => {
					console.log(JSON.parse(res.bodyText))
					let data = JSON.parse(res.bodyText)
					this.orders = [];
					this.realPay = data.data.order_pay_price; //结算总价
					this.pay = data.data.order_total_price; //商品总价
					this.freight = data.data.express_price; //商品总价
					res.body.data.goods_list.forEach(item => {
						this.orders.push({
							proimg: item.image[0].file_path,
							protitle: item.goods_name,
							proprice: item.goods_price,
							beforePrice: item.goods_sku.line_price,
							goods_weight: item.goods_sku.goods_weight,
							total_num: item.total_num,
							prosize: item.goods_sku.goods_attr,
							count: item.total_num
						});
					});
				})

			} else {

				search.split('&').forEach(item => {
					let key = '';
					let val = '';
					item.split('=').forEach((item, ind) => {
						if (ind == 0) {
							key = item;
						} else {
							val = item;
						}
					});
					orderInfo[key] = val;
				})
				orderInfo.goods_id = Number(orderInfo.goods_id);
				orderInfo.goods_num = Number(orderInfo.goods_num);
				this.orderInfo = orderInfo;
				let options = {
					params: {
						user_id: this.userInfo.user_id,
						goods_id: this.orderInfo.goods_id,
						goods_num: this.orderInfo.goods_num,
						goods_sku_id: this.orderInfo.goods_sku_id
					}
				}
				this.$http.get(webPath + '/index.php?s=/api/order/buyNow', options).then(res => {
					let data = JSON.parse(res.bodyText)
					console.log(data);
					this.realPay = data.data.order_pay_price; //结算总价
					this.pay = data.data.order_total_price; //商品总价
					this.freight = data.data.express_price; //商品总价
					res.body.data.goods_list.forEach(item => {
						this.orders = [];
						this.orders.push({
							proimg: item.image[0].file_path,
							protitle: item.goods_name,
							proprice: item.goods_price,
							beforePrice: item.goods_sku.line_price,
							goods_weight: item.goods_sku.goods_weight,
							total_num: item.total_num,
							prosize: item.goods_sku.goods_attr,
							count: item.total_num
						});
					});


					// this.orders.push ({
					// 	img: res.body.data.detail.image[0].file_path,
					// 	title: res.body.data.detail.category.name,
					// 	currentPrice: '399.99',
					// 	beforePrice: '495.65',
					// 	weight: '2.8020',
					// 	count: 1,
					// });

				});
			}
		},
		Settlement() {
			let that = this;
			if (this.address.name !== '') {
				location.href = 'Settlement.html'
			} else {
				this.alertbool = true;
				setTimeout(() => {
					that.alertbool = false;
				}, 1500)
			}
		}
	},
	computed: {
		all_weight() {
			let all = 0;
			this.orders.forEach(function(item, i) {
				all += item.goods_weight * item.total_num
			})
			return all
		}
	}
});
