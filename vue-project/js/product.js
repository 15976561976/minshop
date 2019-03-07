let recommend = new Vue({
	el: '#recommend',
	data: {
		selectList: false, //显示顶部导航
		optionbool: false, //显示规格
		newPrice: 10000,
		oldPrice: 18888,
		alertbool: false, //加入购物车成功提示
		protitle: "苹果（Apple） Apple iPhone X 移动联通电信全网通4G手机(深空灰)",
		prosize: ["32G,颜色:标配版 版本:5.7英寸", "64G,颜色:标配版 版本:5.7英寸", "128G,颜色:标配版 版本:5.7英寸"],
		ifAddPuy: false,
		addpuy: "加入购物车",
		success: "添加成功",

		spec: [],
		prosizeon: [],
		pronum: 1,
		proarr: [],
		imglist: [], //轮播图片
		bannerIndex: 0,
		banners: [],
		left: 0,
		switchTime: 4000,
		isPromotion: false,
		spec_list: [],
		groups: [],
		idInfo: [],
		mySelect: [],
		select: '',
		htmlContent: '',

		goods_id: '', //商品id
		goods_num: 1, //商品数量
		goods_sku_id: '', //商品规格
		stock_num: "" //当前商品库存
	},
	methods: {
		//打开选规格 
		addCar() {
			this.optionbool = true;
			this.ifAddPuy = false;
			this.addpuy = "加入购物车";
		},
		//关闭选规格
		shut() {
			this.optionbool = false
		},
		//选规格
		toclick(id, g_ind, i) {
			this.mySelect.splice(g_ind, 1, i.spec_value);
			// 点击高亮效果
			this.prosizeon.splice(g_ind, 1, id);
			// 展示、获取规格的价格等信息
			this.idInfo.splice(g_ind, 1, id);
			if (this.idInfo.length == this.groups.length) {
				let s = this.idInfo.join('_')
				this.spec_list.forEach((item) => {
					if (item.spec_sku_id == s) {
						// 获取与规格对应的商品信息
						this.newPrice = item.form.goods_price;
						this.oldPrice = item.form.line_price;
						this.stock_num = item.form.stock_num;
						console.log(item)
						// 记录选择的信息
						this.select = this.mySelect.join(',');
					}
				});
			}
			this.goods_sku_id = this.idInfo.join('_');
		},
		//点击添加购物车或购买
		affirm() {
			let that = this;

			function add() {
				that.optionbool = false;
				that.alertbool = true;
				setTimeout(function() {
					that.alertbool = false;
				}, 1000)
				var prolists = {
					checked: false,
					protitle: that.protitle,
					goods_num: that.goods_num,
					// prosize: that.prosize[that.prosizeon],
					prosize: that.select[0],
					proprice: that.newPrice,
					proimg: that.imglist[0].url

				}
				//获取本地离线的prolists文件
				var have = JSON.parse(localStorage.getItem("prolists"))
				//判断本地离线如果有prolists文件就先赋值给上面的空数组，否则就直接添加
				if (have) {
					//添加给上面的数组再添加到本地
					that.proarr = have
					//添加给上面已有本地数据的数组
					that.proarr.push(prolists)
					localStorage.setItem("prolists", JSON.stringify(that.proarr))
					document.body.style.overflow = ''; //允许页面滑动
				} else {
					that.proarr.push(prolists)
					localStorage.setItem("prolists", JSON.stringify(that.proarr))
					document.body.style.overflow = ''; //允许页面滑动
				}

				that.goods_num = prolists.goods_num;
				that.addToCar();
			}

			//判断点击了加入购物车还是购买
			if (this.ifAddPuy) {
				//判断是否是多规格商品
				if (this.spec.length >= 1 && this.goods_sku_id !== "") {
					//判断是否有库存
					if (that.stock_num < 1) {
						that.alertbool = true;
						that.success = "抱歉！此商品暂无库存";
						setTimeout(function() {
							that.alertbool = false;
							that.success = "添加成功";
						}, 1500)
						return false
					}
					let goods_id = 'goods_id=' + this.goods_id;
					let goods_num = 'goods_num=' + this.goods_num;
					let goods_sku_id = 'goods_sku_id=' + this.goods_sku_id;
					console.log(goods_num)
					location.href = 'order.html?' + goods_id + '&' + goods_num + '&' + goods_sku_id;
				} else if (this.spec.length < 1) {
					//判断是否有库存
					if (that.stock_num < 1) {
						that.alertbool = true;
						that.success = "抱歉！此商品暂无库存";
						setTimeout(function() {
							that.alertbool = false;
							that.success = "添加成功";
						}, 1500)
						return false
					}
					let goods_id = 'goods_id=' + this.goods_id;
					let goods_num = 'goods_num=' + this.goods_num;
					let goods_sku_id = 'goods_sku_id=' + this.goods_sku_id;
					location.href = 'order.html?' + goods_id + '&' + goods_num + '&' + goods_sku_id;
				} else {
					this.alertbool = true;
					this.success = "请选择规格";
					setTimeout(function() {
						that.alertbool = false;
						that.success = "添加成功";
					}, 1500)
				}
			} else {
				//判断是否是多规格商品
				if (this.spec.length >= 1 && this.goods_sku_id !== "") {
					//判断是否有库存
					if (that.stock_num < 1) {
						that.alertbool = true;
						that.success = "抱歉！此商品暂无库存";
						setTimeout(function() {
							that.alertbool = false;
							that.success = "添加成功";
						}, 1500)
						return false
					}
					add()
				} else if (this.spec.length < 1) {
					//判断是否有库存
					if (that.stock_num < 1) {
						that.alertbool = true;
						that.success = "抱歉！此商品暂无库存";
						setTimeout(function() {
							that.alertbool = false;
							that.success = "添加成功";
						}, 1500)
						return false
					}
					add()
				} else {
					this.alertbool = true;
					this.success = "请选择规格";
					setTimeout(function() {
						that.alertbool = false;
						that.success = "添加成功";
					}, 1500)
				}



			}
		},
		// 下一张banner
		next() {
			if (this.bannerIndex == 0 && this.banners.length > 1) {
				this.left = (-100) + '%';
				// this.bannerIndex += 2;
				this.bannerIndex += 1;
			} else if (this.bannerIndex < this.banners.length - 1) {
				this.bannerIndex += 1;
				this.left = this.bannerIndex * (-100) + '%';
			}
		},
		// 上一张banner
		prev() {
			if (this.bannerIndex > 0) {
				let currentLeft = this.left.match(/[0-9]+/)[0];

				this.left = -Number(currentLeft) + 100 + '%';
				this.bannerIndex -= 1;
			}
		},
		// 停止轮播
		stop() {
			window.clearInterval(this.interval);
		},
		// 开始轮播
		start() {
			this.interval = window.setInterval(() => {
				if (this.bannerIndex < this.banners.length - 1) {
					this.next();
				} else {
					this.left = '0';
					this.bannerIndex = 0;
				}
			}, this.switchTime);
		},
		// 监听开始点击事件
		touchStartHandler(e) {
			this.startX = e.changedTouches[0].clientX;
			this.stop();
		},
		// 监听结束点击事件
		touchEndHandler(e) {
			this.endX = e.changedTouches[0].clientX;
			switch (this.direction()) {

				case 'left':
					if (this.bannerIndex < this.banners.length) {
						this.next();
					}
					break;
				case 'right':
					if (this.bannerIndex > 0) {
						this.prev();
					}
					break;
			}
			this.start();
		},
		// 判断滑动方向，return 'left' | return 'right'
		direction() {
			let d = this.endX - this.startX;
			if (d > 0) {
				return 'right';
			} else if (d < 0) {
				return 'left'
			}
		},
		// 商品添加至购物车
		addToCar(goods_id, goods_num, goods_sku_id) {
			// 未登录
			if (sessionStorage.getItem('userInfo') == null) {
				location.href = "login.html";
			} else { // 已经登录
				console.log('已经登录');

				let data = {
					user_id: JSON.parse(sessionStorage.getItem('userInfo')).user_id,
					goods_id: this.goods_id,
					goods_num: this.goods_num,
					goods_sku_id: this.goods_sku_id
				}

				console.log(this.goods_sku_id);
				this.$http.post(webPath + '/index.php?s=/api/cart/add', data).then((res) => {

					console.log(data);
					console.log(res)
				});
			}
		},
		// 点击购买
		buy() {
			this.optionbool = true;
			this.ifAddPuy = true;
			this.addpuy = "购买";
		}
	},
	mounted() {
		this.banners = this.imglist;
		// 轮播
		this.start();
		// 获取后台数据
		let goods_id = location.search;
		this.goods_id = goods_id.slice(goods_id.indexOf('=') + 1);
		goods_id = Number(goods_id.slice(goods_id.indexOf('=') + 1));
		let data = {
			goods_id: goods_id
		}
		this.$http.post(webPath + '/index.php?s=/api/goods/detail', data).then((res) => {
			console.log(JSON.parse(res.bodyText));
			// 设置banner
			res.body.data.detail.image.forEach((item) => {
				let img = {
					id: item.id,
					url: item.file_path
				}
				this.imglist.push(img);
			})
			// 设置头部信息
			this.newPrice = res.body.data.detail.spec[0].goods_price;
			this.oldPrice = res.body.data.detail.spec[0].line_price;
			this.stock_num = res.body.data.detail.spec[0].stock_num;
			this.protitle = res.body.data.detail.goods_name;
			if (Number(this.oldPrice) > Number(this.newPrice)) {
				this.isPromotion == true;
			}
			// 设置规格、数量
			// 获取规格
			let spec = [];
			if (res.body.data.specData != null) {
				//多规格 
				res.body.data.specData.spec_attr.forEach((item, ind) => {
					this.groups.push(item);
					spec.push({
						group_name: item.group_name,
					})

					let spac_items = [];
					item.spec_items.forEach((item, ind) => {
						spac_items.push(item);
					});
					spec[ind].spac_items = spac_items;
				});
				this.spec = spec;
				this.spec_list = res.body.data.specData.spec_list;
			}
			// 设置内容
			this.htmlContent = res.body.data.detail.content;
		})
	}
});
