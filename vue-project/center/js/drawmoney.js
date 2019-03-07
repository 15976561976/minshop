let drawmoney = new Vue({
	el: "#drawmoney",
	data: {
		option: false, //选择银行框
		defaultcard: 0, //默认提现银行卡
		visit:false, //询问弹窗
		cardlist: "", //银行卡列表
		cardId: "",
		success:false,//成功提示
		withAmount: 0, //默认提现金额
		bankCardList: [],
		userInfo: '',
		deleteCardId: '',
		msg: '',
		withdraw_price: ''
	},
	mounted() {
		this.getUserInfo ();
		this.getBankCards ();
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
				location.href = '../login.html';
			}
		},
		// 获取银行卡列表
		getBankCards () {
			let data = {
				user_id: this.userInfo.user_id
			}
			this.$http.post(webPath + '/index.php?s=/api/dist_amount/getBankCardList', data).then((res) => {
				res.data.data.bankCardList.forEach((item) => {
					this.bankCardList.push ({
						id: item.id,
						bank_card_name: item.bank_card_name,
						bank_card_num: item.bank_card_num
					});
				});
			});
		},
		// 提交提现申请
		submit () {
			console.log(232)
			let data = {
				user_id: this.userInfo.user_id,
				withdraw_price: this.withdraw_price,
				bank_card_id: this.bankCardList[this.defaultcard].id
			}
			this.$http.post(webPath + '/index.php?s=/api/dist_amount/withdraw', data).then((res) => {
				this.success = true;
				this.msg = res.body.msg;
				window.setTimeout(() => {					
					this.success = false;
				}, 1500);
				
			})
		},
		//隐藏遮罩层
		hide() {
			this.option = false;
		},
		//显示遮罩层
		toOption() {
			this.option = true;
		},
		//选择银行卡
		selectCard(i) {
			this.option = false;
			this.defaultcard = i;
		},
		//移除银行卡
		delCard(item) {
			this.visit = true;
			console.log(item.id);
			this.deleteCardId= item.id;
		},
		//是否确定移除
		conSelect(e){
			let ele = e.target.innerHTML;
			let item = this.bankCardList;
			let newarr = [];
			if(ele =="确定"){
				let data = {
					user_id: this.userInfo.user_id,
					bank_card_id: this.deleteCardId
				}
				// 请求删除
				this.$http.post(webPath + '/index.php?s=/api/dist_amount/delBankCard',data).then((res) => {
					this.msg = res.data.msg;
					this.success = true;
					window.setTimeout(() => {
						this.success = false;
					},800);
					// 清空本地数组，重新获取
					this.bankCardList = [];
					this.getBankCards();
				});
				this.visit = false;
			}else{
				this.visit = false;
			}
		}
	},
	computed: {
		//禁用按钮
		disabledFn() {
			if (this.withdraw_price == '' || this.bankCardList[this.defaultcard] == null) {
				return this.disabled = true;
			} else {
				return this.disabled = false;
			}
		}
	},
	filters: {
		toSlice: function(value) {
			value = value.toString()
			return "**" + value.slice(-4)
		}
	}
})
console.log(1)