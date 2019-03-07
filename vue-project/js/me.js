// Vue.http.options.root = webPath;
let vm = new Vue({
	el: '#recommend',
	data: {
		avatar: './img/user/head-2.jpg',
		name: '',
		// collection: '100',
		// follow: '200',
		// share: '300',
		userInfo: ''
	},
	mounted () {
		// let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		this.getUserInfo ();
		
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
				let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
				let data = {
					user_id: userInfo.user_id
				}
				this.$http.post(webPath + '/index.php?s=/api/user/getUserInfo', data, {emulateJSON:true}).then(res => {
					this.userInfo = res.body.data.userInfo;
					this.name = this.userInfo.phone;
					this.avatar = this.userInfo.avatarUrl;
					if (this.userInfo.avatarUrl) {
						this.avatar = this.userInfo.avatarUrl;
					}
				});
			}else {
				location.href = './login.html';
			}
			this
		},
	}
});
