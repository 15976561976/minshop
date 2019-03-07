let friend = new Vue({
	el:"#friend",
	data:{
		friends: [],
		more:  '没有更多内容了',
		userInfo: ''
	},
	mounted () {
		this.isLogin ();
		this.getUserInfo ();
		this.getFriendsInfo ();
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
		// 获取列表信息
		getFriendsInfo () {
			if (this.isLogin()) {
				let data = {
					user_id: this.userInfo.user_id,
				}
				this.$http.post(webPath + '/index.php?s=/api/dist_user/getFriList', data).then((res) => {
					console.log(res);
					res.data.data.list.forEach((item) => {
						this.friends.push({
							create_time: item.create_time,
							nickName: item.user.nickName,
							avatarUrl: item.user.avatarUrl
						});				
					});	
				})
			}
		},
	}
});
