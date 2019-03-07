let vmRegister = new Vue({
	el: '#yh-login',
	data: {
		tips: false,
		msg: '登录成功/失败',
		phone: '',
		pw: ''
	},
	methods: {
		submit() {
			this.$http.post(webPath + '/index.php?s=/api/user/webLogin', {phone: this.phone, password: this.pw}).then(res => {
				// 请求成功
				console.log(res);
				this.tips = true;
				this.msg = res.body.msg;
				window.setTimeout(() => {
					this.tips = false;
					// 登录成功
					if (res.body.code == 1) {
						let userInfo = JSON.stringify(res.data.data.userInfo);
						sessionStorage.setItem('userInfo', userInfo);
						window.history.back(-1); 
						// location.href = './index.html'
					}		
				},2000);
			}, res => {
				// 请求失败
				console.log(res);
				this.pw = '';
				this.tips = true;
				this.msg = '登录失败';
				window.setTimeout(() => {
					this.tips = false;
				},1500);
			});
		}
	}
});
