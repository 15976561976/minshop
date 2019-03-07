let vmRegister = new Vue({
	el: '#yh-register',
	data: {
		tips: false,
		msg: '注册成功/失败',
		phone: '',
		pw: '',
		url: webPath + '/index.php?s=/api/user/register'
	},
	methods: {
		submit() {
			console.log(this.phone + this.nn + this.pw)
			this.$http.post(this.url, {phone: this.phone, password: this.pw}).then(res => {
				// 请求成功
				console.log(res);
				this.tips = true;
				this.msg = res.body.msg;
				window.setTimeout(() => {
					this.tips = false;
					// 注册成功
					if (res.body.code == 1) {
						location.href = './login.html';
					}
				},2000);
			}, res => {
				// 请求失败
				console.log(res);
				this.phone = '';
				this.pw = '';
				this.nn = '';
				this.tips = true;
				this.msg = '注册失败';
				window.setTimeout(() => {
					this.tips = false;
				},1500);
			});
		}
	}
});