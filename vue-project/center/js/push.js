
let vm = new Vue({
	el: '#push',
	data: {
		userInfo: '',
		qrCode: '',
		canv: null, //canvas对象
		cxt: null, //canvas
		browserInfo: {
			width: '',
			height: ''
		}
	},
	mounted () {
		this.getUserInfo();
		this.getBrowserInfo();
		this.canv = document.getElementById('canv');
		this.cxt = this.canv.getContext('2d');
		this.getQRCode();
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
		// 获取二维码信息、图片背景
		getQRCode () {
			let options = {
				params: {
					// dist_user_id: this.userInfo.dist_user_id,
					// link_url: location.hostname
					user_id: this.userInfo.user_id
				}
			}
			console.log(options);
			this.$http.get(webPath + '/index.php?s=/api/dist_user/createQrCode', options).then(res => {
				this.qrCode = webPath + '/' + res.body.data.imageName;

				let bg = new Image();
				bg.src = "../img/push/push.jpg"
				window.setTimeout(() => {
					this.cxt.drawImage(bg, 0, 0, this.browserInfo.width, this.browserInfo.height);
				}, 100);



				let qrCode = new Image();
				qrCode.src = this.qrCode;
				window.setTimeout(() => {
					this.cxt.drawImage(qrCode, (this.browserInfo.width - 150) / 2, (this.browserInfo.height - 180), 150, 150);
				}, 100);

				
			});
		},
		// 使用canvas绘图
		drawImg () {
			this.cxt.drawImage();
		},
		// 获取浏览器信息
		getBrowserInfo () {
			this.browserInfo = {
				width: window.innerWidth,
				height: window.innerHeight
			}
		},
		// 保存为图片
		save () {
			// this.cxt.toDataURL("image/jpeg");
		}
	}
});