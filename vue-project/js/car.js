let myCar = new Vue({
	el: '#myCar',
	data: {
		// a: '888',
		length: 0, //勾选数
		delbool: true, //删除按钮
		shopcart: false, //购物车是否为空
		titlecheck: true, //店铺勾选状态
		allcheck: false, //全选勾选状态
		prolist: [],
	},
	//初始化,读取本地离线存储
	mounted() {

		// 获取后台购物车列表数据
		// 未登录
		if (sessionStorage.getItem('userInfo') == null) {
			location.href = "login.html";
		} else { // 已经登录
			let data = {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).user_id
			}
			this.$http.post(webPath + '/index.php?s=/api/cart/lists', data).then((res) => {
				console.log(res.body.data.goods_list)
				res.body.data.goods_list.forEach((item) => {
					this.prolist.unshift({
						proimg: item.image[0].file_path,
						protitle: item.goods_name,
						prosize: item.goods_sku.goods_attr,
						proprice: item.goods_price,
						goods_id: item.goods_id,
						goods_sku_id: item.goods_sku.spec_sku_id,
						total_num: item.total_num,
						total_price: item.total_price,
						line_price: item.goods_sku.line_price,
						goods_weight: item.goods_sku.goods_weight
					});
				});
				// 切换样式
				if (this.prolist.length == 0) {
					this.shopcart = false
				} else {
					this.shopcart = true
				}
			});
		}

	},


	methods: {
		// 编辑按钮
		toEdit(e) {
			this.delbool = !this.delbool;
		},

		//删除所选产品
		partdel() {
			var that = this;
			var newarr = [];
			let deleteList = [];
			that.prolist.forEach(function(item) {
				//选择未勾选的元素给新数组
				if (!item.checked) {
					newarr.push(item)
				} else {
					deleteList.push(item);
				}
			})

			// 获取需要删除的商品信息
			let deletePros = [];
			deleteList.forEach((item) => {
				deletePros.push({
					user_id: JSON.parse(sessionStorage.getItem('userInfo')).user_id,
					goods_id: item.goods_id,
					goods_sku_id: item.goods_sku_id
				})
			});
			// 请求后台删除
			deletePros.forEach((item) => {
				this.$http.post(webPath + '/index.php?s=/api/cart/delete', item).then((res) => {
					// 删除成功后，重新获取列表
					let data = {
						user_id: JSON.parse(sessionStorage.getItem('userInfo')).user_id
					}
					let newProList = [];
					this.$http.post(webPath + '/index.php?s=/api/cart/lists', data).then((res) => {
						res.body.data.goods_list.forEach((item) => {
							newProList.unshift({
								proimg: item.image[0].file_path,
								protitle: item.goods_name,
								prosize: item.goods_sku.goods_attr,
								proprice: item.goods_price,
								goods_id: item.goods_id,
								goods_sku_id: item.goods_sku.spec_sku_id,
								total_num: item.total_num,
								total_price: item.total_price,
								line_price: item.goods_sku.line_price,
								goods_weight: item.goods_sku.goods_weight
							});
						});
						this.prolist = newProList;
						//显示为空购物车
						if (!this.prolist.length >= 1) {
							this.shopcart = false
						}
					});
				});
			});
		},


		//选完变全选
		goodsCheck(idx) {
			let goodsLength = this.prolist.length; //产品总数
			let goodsCheck = document.getElementsByClassName("goodsCheck")[idx]; //产品勾选 
			let allcheck = document.getElementById("AllCheck"); //全选

			if (goodsCheck.checked) {
				this.length += 1;
				this.prolist[idx].checked = true
			} else {
				this.length -= 1;
				this.prolist[idx].checked = false
			}

			if (goodsLength === this.length) {
				allcheck.checked = true
			} else {
				allcheck.checked = false
			}
		},
		//全选
		AllCheck() {
			let goodsLength = this.prolist.length; //产品总数
			let goodsCheck = document.getElementsByClassName("goodsCheck"); //产品勾选 
			for (i = 0; i < goodsCheck.length; i++) {
				goodsCheck[i].checked = true
				this.prolist[i].checked = true
			}
			this.length = goodsLength;
		},
		// 点击增加数量1
		addNum(goods_id, goods_num, goods_sku_id) {
			let data = {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).user_id,
				goods_id: goods_id,
				goods_num: 1,
				goods_sku_id: goods_sku_id
			};
			this.$http.post(webPath + '/index.php?s=/api/cart/add', data).then((res) => {
				// 刷新列表
				let newProList = [];
				this.$http.post(webPath + '/index.php?s=/api/cart/lists', data).then((res) => {
					res.body.data.goods_list.forEach((item) => {
						newProList.unshift({
							proimg: item.image[0].file_path,
							protitle: item.goods_name,
							prosize: item.goods_sku.goods_attr,
							proprice: item.goods_price,
							goods_id: item.goods_id,
							goods_sku_id: item.goods_sku.spec_sku_id,
							total_num: item.total_num,
							total_price: item.total_price,
							line_price: item.goods_sku.line_price,
							goods_weight: item.goods_sku.goods_weight
						});
					});
					this.prolist = newProList;

					//显示为空购物车
					if (!this.prolist.length >= 1) {
						this.shopcart = false
					}
				});
			});
		},
		// 点击减少数量1
		reduceNum(goods_id, goods_num, goods_sku_id) {
			let data = {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).user_id,
				goods_id: goods_id,
				goods_sku_id: goods_sku_id
			};
			this.$http.post(webPath + '/index.php?s=/api/cart/sub', data).then((res) => {
				// 刷新列表
				let newProList = [];
				this.$http.post(webPath + '/index.php?s=/api/cart/lists', data).then((res) => {
					res.body.data.goods_list.forEach((item) => {
						newProList.unshift({
							proimg: item.image[0].file_path,
							protitle: item.goods_name,
							prosize: item.goods_sku.goods_attr,
							proprice: item.goods_price,
							goods_id: item.goods_id,
							goods_sku_id: item.goods_sku.spec_sku_id,
							total_num: item.total_num,
							total_price: item.total_price,
							line_price: item.goods_sku.line_price,
							goods_weight: item.goods_sku.goods_weight
						});
					});
					this.prolist = newProList;

					//显示为空购物车
					if (!this.prolist.length >= 1) {
						this.shopcart = false
					}
				});
			});
		},
		//去结算
		payment() {
			sessionStorage.setItem("prolist", JSON.stringify(this.prolist));
			location.href = "./order.html"
		}
	},

	computed: {
		//计算总价
		allprice() {
			var allprice = 0;
			let sum = 0;
			this.prolist.forEach((item) => {
				sum += Number(item.total_price);
			});
			return sum;
		}

	}
})
