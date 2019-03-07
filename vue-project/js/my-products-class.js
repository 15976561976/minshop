let searchTap = new Vue({
	el: '#main',
	data: {
		index: 0,
		currentSort:0,
		nav: ['综合', '销量', '价格'],
		// proList: [{
		// 	id:0,
		// 	img: './img/pd/sf-11.jpg',
		// 	title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
		// 	currentPrice: 100,
		// 	beforePrice: '495.65',
		// 	assess: 1000,
		// 	assessPercent: '99',
		// }, {
		// 	id:1,
		// 	img: './img/pd/sf-11.jpg',
		// 	title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
		// 	currentPrice: 300,
		// 	beforePrice: '495.65',
		// 	assess: 998,
		// 	assessPercent: '99',
		// }, {
		// 	id:2,
		// 	img: './img/pd/sf-11.jpg',
		// 	title: '2016夏天新款男士短袖t恤青少年韩版修身印花圆领半袖男装衣服潮领半袖男装衣服潮领半袖男装衣服潮',
		// 	currentPrice: 200,
		// 	beforePrice: '495.65',
		// 	assess: 798,
		// 	assessPercent: '99',
		// }],
		proList: [],
		search: {
			category_id: 0,
			search: '',
			sortType: '',
			sortPrice: ''
		}

	},
	mounted () {
		
		let temp = location.search.slice(1);
		// 获取url数据
		temp.split('&').forEach(item => {
			let key = '';
			let val = '';
			// console.log(1)
			item.split('=').forEach((item, ind) => {
				if (ind == 0) {
					key = item;
				}else {
					val = item;
				}
			});
			this.search[key] = val;
		})
		this.search.category_id = Number(this.search.category_id);

		// console.log(this.search)
		// 第一次默认搜索
		let data = {
			category_id: this.search.category_id,
			search: this.search.search,
			sortType: 'all',
			sortPrice: false
		}
		console.log(data);
		this.getData(data);
	},
	methods: {
		switchItem(index) {
			let that = this;
			let list = this.proList;

			this.index = index;
			//价格排序
			if (index == 2) {
				if(that.currentSort==0){
					// function sort(a, b) {
					// 	return a.currentPrice - b.currentPrice
					// }
					// list.sort(sort);
					// that.list = list;
					// this.currentSort = 1;
					let data = {
						category_id: this.search.category_id,
						search: this.search.search,
						sortType: 'all',
						sortPrice: 'price'
					}
					this.getData(data);
				}else{
					function sort(a, b) {
						return b.currentPrice - a.currentPrice
					}
					list.sort(sort);
					that.list = list;
					this.currentSort = 0
				}
				//销量排序
			}else if(index == 1){
				let data = {
					category_id: this.search.category_id,
					search: this.search.search,
					sortType: 'sales',
					sortPrice: 'false'
				}
				this.getData(data);
				// if(that.currentSort==0){
				// 	function sort(a, b) {
				// 		return a.assess - b.assess
				// 	}
				// 	list.sort(sort);
				// 	that.list = list;
				// 	this.currentSort = 1
				// }else{
				// 	function sort(a, b) {
				// 		return b.assess - a.assess
				// 	}
				// 	list.sort(sort);
				// 	that.list = list;
				// 	this.currentSort = 0

				// }
				//原排序
			}else{
				let data = {
					category_id: this.search.category_id,
					search: this.search.search,
					sortType: 'all',
					sortPrice: 'false'
				}
				this.getData(data);
				// history.go(0)
			}
		},
		// 点击商品跳转
		goto (p) {
			// console.log(p.id)
			location.href = './product.html?id=' + p.id;
		},
		// 向后台请求数据
		getData (data) {
			// console.log(data)
			this.$http.post(webPath + '/index.php?s=/api/goods/lists', data, {emulateJSON: true}).then((res) => {
				this.proList.splice(0);
				// console.log(res)



				let products = res.body.data.list.data;
				products.forEach((item, ind) => {
					this.proList.push ({
						id: item.goods_id,
						title: item.goods_name,
						img: item.image[0].file_path,				
						currentPrice: item.spec[0].goods_price,
						beforePrice: item.spec[0].line_price,
						// assess: 1000,
						// assessPercent: '99',
					});
				});
			});
		},
		
	}
});
