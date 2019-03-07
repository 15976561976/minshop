// let recommendProduct = {
// 	href: 'product.html',
// 	img: './img/pd/sf-15.jpg',
// 	title: 'KOBE LETTUCE 秋冬新款 女士日系甜美纯色半高领宽松套头毛衣针织衫',
// 	currentPrice: '399.99',
// 	beforePrice: '495.65', 
// 	comment: '986',
// }

let vm = new Vue({
	el: '#index',
	data: {
		height: window.innerHeight - 45,
		hasBg: false,
		banners: [],
		items: [
			{
				title: '首页',
				href: './index.html',
				icon: 'aui-footer-icon-home',
				isActive: true,
			},
			{
				title: '分类',
				href: './class.html',
				icon: 'aui-footer-icon-class',
				isActive: false,
			},
			{
				title: '购物车',
				href: './car.html',
				icon: 'aui-footer-icon-car',
				isActive: false,
			},
			{
				title: '我的',
				href: './me.html',
				icon: 'aui-footer-icon-me',
				isActive: false,
			}
		],
		specialFields: [{
			headImg: ['./img/icon/i-i5.png', './img/pd/cf-8.jpg'],
			listData: []
		}],
		headImg: ['./img/bg/icon-tj1.jpg'],
		recommends: [],
		interval: null,
		bannerStyle: {
			'margin-right': '-10rem'
		},
		left: '0',
		bannerIndex: 0,
		startX: 0,
		endX: 0,
		switchTime: 4000,
		placeholder: ''
	},
	methods: {
		scroll(e) {
			if(e.currentTarget.scrollTop > 20) {
				this.hasBg = true;
			}else {
				this.hasBg = false;
			}
		},
		// 下一张banner
		next () {
			if (this.bannerIndex == 0 && this.banners.length > 1)  {
				console.log(this.banners.length);
				this.left = (-100) + '%';
				// this.bannerIndex += 2;
				this.bannerIndex += 1;
			}else if (this.bannerIndex < this.banners.length - 1){
				this.bannerIndex += 1;
				this.left = this.bannerIndex * (-100) + '%';
			}	
		},
		// 上一张banner
		prev () {
			if (this.bannerIndex > 0) {
				let currentLeft = this.left.match(/[0-9]+/)[0];
				
				this.left = -Number(currentLeft) + 100 + '%';
				this.bannerIndex -= 1;
			}
			
		},
		// 停止轮播
		stop () {
			window.clearInterval(this.interval);
		},
		// 开始轮播
		start () {
			this.interval = window.setInterval(() => {
				if(this.bannerIndex < this.banners.length - 1) {
					this.next();
				}else {
					this.left = '0';
					this.bannerIndex = 0;
				}
			},this.switchTime);
		},
		// 监听开始点击事件
		touchStartHandler (e) {
			this.startX = e.changedTouches[0].clientX;
			this.stop();
		},
		// 监听结束点击事件
		touchEndHandler (e) {
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
		direction (){
			let d = this.endX - this.startX;
			if (d > 0) {
				return 'right';
			}else if (d < 0) {
				return 'left'
			}
		},
		// 获取banner按键样式
		btnStyle (item) {
			// console.log(item);
			switch (item.btnShape) {
				case 'rectangle':
					return 'slider-pagination-rectangle';
					break;
				case 'square':
					return 'slider-pagination-square';
					break;
				case 'round':
					return 'slider-pagination-round';
					break;
			}		
		}
	},
	mounted() {
		if(this.$el.scrollTop > 20) {
				this.hasBg = true;
		}else {
			this.hasBg = false;
		}
		// 轮播
		this.start();
		// 获取后台数据
		this.$http.get(webPath + '/index.php?s=/api/index/page', null).then((res) => {
			console.log(res.data.data);
			// 设置搜索框的placeholder
			this.placeholder = res.data.data.items.s10001.params.placeholder;
			// 设置banner
			for(let i in res.data.data.items['n606196612728596'].data) {
				let banner = {
					img: res.data.data.items['n606196612728596'].data[i].imgUrl,
					href: res.data.data.items['n606196612728596'].data[i].linkUrl,
					alt: res.data.data.items['n606196612728596'].data[i].imgName,
					// 按钮形状、颜色
					btnShape: res.data.data.items['n606196612728596'].style.btnShape,
					btnColor: res.data.data.items['n606196612728596'].style.btnColor
				}
				this.banners.push(banner);
			}
			// 设置推荐商品
			res.data.data.newest.forEach ((item, ind) => {		
				let data = {
					img: item.image[0].file_path,
					href: 'product.html?goods_id=' + item.goods_id,
					title: item.goods_name,
					currentPrice: item.spec[0].goods_price
					
				}
				this.specialFields[0].listData.push(data);
			});
			// 设置猜你喜欢
			res.data.data.best.forEach ((item, ind) => {		
				let data = {
					img: item.image[0].file_path,
					href: 'product.html?goods_id=' + item.goods_id,
					title: item.goods_name,
					currentPrice: item.spec[0].goods_price,
				}
				this.recommends.push(data);
			});
		});
	}
});
