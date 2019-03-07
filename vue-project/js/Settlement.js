let vm = new Vue({
	el: '#settlement',
	data: {
		payWays: [
			{
				img: './img/icon/apy-5.png',
				name: '微信支付',
				desc: '微信安全支付',
				select: true,
			},
			{
				img: './img/icon/apy-5.png',
				name: '支付宝支付',
				desc: '支付宝安全支付',
				select: false,
			}
		],
		url: '',
		id: '',
		money: '',
		ways: ['微信', '支付宝'],
		way: '',
	},
	mounted () {
		this.id = location.search.substring(1).split('=')[1];
			console.log(location.search)
		// 获取支付金额
		this.$http.post().then((res) => {
			console.log('获取成功');
			this.money = '获取成功';
		}, (res) => {
			console.log('获取失败');
			this.money = '获取失败';
		});
	},
	methods: {
		//点击支付按钮
		pay (e) {
			let data = {
				id: this.id,
				way: this.way
			}
			this.$http.post(this.url, data).then((res) => {
				console.log('支付成功');
			}, (res) => {
				console.log('支付失败');
			});
		},
		//选中支付方式
		selectWay ($e, ind) {
			this.way = this.ways[ind];
			console.log(this.way)
		}
	}
});