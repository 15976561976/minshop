let card = new Vue({
	el:"#card",
	data:{
		visit:false, //询问弹窗
		success:false, //成功提示
		userInfo: '',
		bank_card_name: '',
		bank_card_num: '',
		msg: ''
	},
	mounted () {
		this.getUserInfo ();
	},
	methods:{
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
				location.href = '../login.html';
			}
		},
		// 添加银行卡
		addCard () {
			console.log(111);
			let data = {
				user_id: this.userInfo.user_id,
				bank_card_name: this.bank_card_name,
				bank_card_num: this.bank_card_num
			}
			this.$http.post(webPath + '/index.php?s=/api/dist_amount/addBankCard/', data).then((res) => {
				this.msg = res.data.msg;
				this.success = true;
				window.setTimeout(() => {
					this.success = false;
					location.href = './drawmoney.html'
				}, 1000);
			});
		},


		// 弹出提示框？号
		remind(){
			this.visit = true;
		},
		saveData(){
			
		}
	},
	computed: {
		//禁用按钮
		disabledFn() {
			if (this.bank_card_name == '' && this.bank_card_num == '') {
				return this.disabled = true;
			} else {
				return this.disabled = false;
			}
		}
	},
})