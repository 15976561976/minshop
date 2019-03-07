let vm = new Vue({
	el: '#order-detail',
	data: {
		addr: {
			name: '姓名',
			phone: '手机',
			province: '省',
			city: '市',
			region: '县',
			detial: '门牌号'
		},
		order: {
			state: 'state',
			orderNum: 'orderNum',
			orderDate: 'orderDate',
			list: [
				{
					imgUrl: '',
					proName: 'proName',
					proNum: 'proNum',
					proCount: 'proCount'
				}
			],
			totalCount: 'totalCount',
			totalNum: 'totalNum',
		}
	},
	methods: {

	}
});