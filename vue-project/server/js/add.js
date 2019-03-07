let add = new Vue({
	el: "#add",
	data: {
		visit: false, //询问弹窗
		success: false, //成功提示
		alertText:"添加成功",
		user: "",
		phone: ""
	},
	methods: {
		remind() {
			this.visit = true;
		},
		saveData() {
			let userid = JSON.parse(sessionStorage.getItem("userInfo")).user_id;

			let data = {
				user_id: userid,
				username: this.user,
				mobile: this.phone
			}
			this.$http.post(webPath + "/index.php?s=/api/booking/addCustomerInfo", data).then((res) => {
				let resData = JSON.parse(res.bodyText);
				if (resData.msg == "添加成功") {
					this.success = true;
					setTimeout(function() {
						this.alertText = "添加成功"
						this.success = false
							window.history.back()
					}, 1500)
				} else {
					this.success = true;
					setTimeout(function() {
						this.alertText = "添加失败"
						this.success = false
					}, 1500)
				}
			})
		}
	},
	computed: {
		//禁用按钮
		disabledFn() {
			if (1 != 1) {
				return this.disabled = false;
			} else {
				return this.disabled = true;
			}
		}
	},
})
