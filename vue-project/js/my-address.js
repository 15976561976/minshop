let address = new Vue({
	el: '#yh-my-address-addr',
	data: {
		msg: '',
		defaultAddrTips: false,
		addrs: [],
		isShowDelete: false,
		deleteAddrID: '12',
		userInfo: ''
	},
	mounted () {
		this.getUserInfo ();
		this.getAddressList ();	
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
		// 获取列表
		getAddressList () {
			if (this.userInfo) {
			// 获取列表
			let data = {
				user_id: this.userInfo.user_id
			}
			this.$http.post(webPath + '/index.php?s=/api/address/lists', data).then((res) => {
				let defaultId = res.body.data.default_id;
				this.addrs = [];
				res.body.data.list.forEach ((item) => {
					this.addrs.push ({
						id: item.address_id,
						name: item.name,
						phone: item.phone,
						address: item.region.province + item.region.city + item.region.region + item.detail,
						isDefault: item.address_id == defaultId ? true : false
					});
					
				});
				
			});
			}
		},		
		// 点击修改默认地址
		defaultBtn(e, id, ind) {
			let data = {
				user_id: this.userInfo.user_id,
				address_id: id
			}
			console.log(id)
			this.$http.post(webPath + '/index.php?s=/api/address/setDefault', data).then(res => {
				console.log(res);
				// 请求成功
				for(let i of this.addrs) {
					i.isDefault = false;
				}
				this.addrs[ind].isDefault = true;
				this.defaultAddrTips = true;
				this.msg = res.body.msg;
				window.setTimeout(() => {
					this.defaultAddrTips = false;
				},2000);
			}, res => {
				// 请求失败
				this.defaultAddrTips = true;
				this.msg = res.body.msg;
				window.setTimeout(() => {
					this.defaultAddrTips = false;
				},1500);
			});
		},
		// 点击删除地址,弹出确认框
		deleteAddr (e, id) {
			this.isShowDelete  = true;
			this.deleteAddrID = id;
		},
		// 取消删除记录
		cancel () {
			console.log('取消删除记录')
			this.isShowDelete  = false;
			this.deleteAddrID = '';
		},
		// 确定删除记录
		sure () {
			console.log('确定删除记录')			
			// 发送删除请求
			let data = {
				user_id: this.userInfo.user_id,
				address_id: this.deleteAddrID
			}
			this.$http.post(webPath + '/index.php?s=/api/address/delete', data).then((res) => {
				// 请求成功
				// this.addrs.splice(ind,1);
				// console.log('修改成功');
				// console.log(res);
				this.getAddressList ();
				this.deleteAddrID = '';

			}, (res) => {
				// 请求失败
				this.deleteAddrID = '';
			});
			this.isShowDelete  = false;	// 隐藏弹框	
		},
		// 编辑地址
		editAddr ($event, addr) {
			location.href  = 'my-edit-address.html?addr_id=' + addr.id;
		}
	}
});