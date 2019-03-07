let edit = new Vue({
	el: '#yh-edit-address',
	data: {
		name: '',
		phone: '',
		area: '',
		msg: '',
		addr: '',
		saveTips: false,
		isChoice: false,
		area: [],
		index: 0,
		list: null, 

		// 省，市，区
		provinces: [],
		cities: [],
		regions: [],
		myProvince: '',
		myCity: '',
		myRegion: '',
		userInfo: '',
		addr_id: ''
	},
	mounted () {
		this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		if (this.userInfo == null) {
			location.href = 'login.html';
		}
		this.init ();
	},
	methods: {
		// 获取省
		getProvinces () {
			this.$http.get(webPath + '/index.php?s=/api/region/province').then((res) => {
				this.provinces = [];
				res.body.data.provinces.forEach ((item) => {
					this.provinces.push({
						name: item.name,
						id: item.id
					});
				});
				this.list = this.provinces;
			});	
		},

		// 获取市
		getCities (id) {
			this.$http.post(webPath + '/index.php?s=/api/region/city', {province_id: id}).then((res) => {
				this.cities = [];
				res.body.data.cities.forEach ((item) => {
					this.cities.push({
						name: item.name,
						id: item.id
					});
				});
				this.list = this.cities;
			});
		},
		// // 获取区
		getRegions (id) {
			this.$http.post(webPath + '/index.php?s=/api/region/area', {city_id: id}).then((res) => {
				this.regions = [];
				res.body.data.areas.forEach ((item) => {
					this.regions.push({
						name: item.name,
						id: item.id
					});
				});
				this.list = this.regions;
				// console.log(res.body.data.areas)
			});
		},
		// 保存编辑的地址
		saveAddr () {
			if (this.addr_id != '') {
				// 重新编辑
				this.reedit ();
			}else {
				// 新建编辑
				let d = {
					user_id: this.userInfo.user_id,
					name: this.name,
					phone: this.phone,
					region: this.myProvince.name + ',' + this.myCity.name + ',' + this.myRegion.name,
					detail: this.addr
				}
				this.$http.post(webPath + '/index.php?s=/api/address/add', d).then(res => {
					// 成功
					this.saveTips = true;
					this.msg = res.body.msg;
					window.setTimeout(() => {
						this.saveTips = false;
						if (res.body.code == 1) {
							history.back();
						}
					},1000);
				}, res => {
					// 失败
					this.saveTips = true;
					this.msg = '保存失败';
					window.setTimeout(() => {
						this.saveTips = false;
					},1000);
					
				});	
			}


			
		},
		//选择地区
		choice () {
			this.isChoice = true;
			switch (this.index) {
				case 0: 
					// this.area.splice(0, 1, '请选择');
					this.getProvinces();

					break;
				case 1: 
					// this.area.splice(1, 1, '请选择');
					this.getCities(this.myProvince.id);
					break;
				case 2: 
					// this.area.splice(2, 1, '请选择');
					this.getCities(this.myCity.id);
					break;
			}
		},
		// 退出地区选择
		exitChoice ()  {
			this.isChoice = false;
		},
		// 点击选择地区选项
		myChoice (e, item) {
			if (this.index < 3) {	
				// 切换列表
				switch (this.index) {
					case 0: 
						this.area.splice(0, 3, item.name);
						this.myProvince = item;
						this.getCities(this.myProvince.id);
						break;
					case 1: 
						this.area.splice(1, 3, item.name);
						this.myCity = item;
						this.getRegions(this.myCity.id);

						break;
					case 2: 
						this.area.splice(2, 3, item.name);
						this.myRegion = item;
						this.exitChoice();
						break;
				}
				this.index += 1;
			}else {
				this.area.splice(2, 3, item.name);
			}
		},
		// 重新设置地区
		resetArea(e, ind) {
			this.index = ind;
			this.area.splice(ind + 1, 3)
			// 切换列表
			switch (this.index) {
				case 0: 
					this.list = this.provinces;
					break;
				case 1: 
					this.list = this.cities;
					break;
				case 2: 
					this.list = this.regions;
					break;			
			}
		},
		// 初始化数据
		init () {
			// 如果有addr_id，则进行该操作，否则跳出
			if (location.search.match(/addr_id=/)) {
				this.addr_id = location.search.slice(location.search.indexOf('=') + 1);

				// 获取地址列表，进行筛选
				this.$http.post(webPath + '/index.php?s=/api/address/lists', {user_id: this.userInfo.user_id}).then((res) => {
					res.body.data.list.forEach((item) => {
						console.log(item);
						if (item.address_id == this.addr_id) {
							// 初始化编辑数据
							this.name = item.name;
							this.phone = item.phone;
							this.area = [item.region.province, item.region.city, item.region.region];
							this.addr = item.detail;
							this.myProvince = {
								id: item.province_id,
								name: item.region.province
							}
							this.myCity = {
								id: item.city_id,
								name: item.region.city
							}
							this.myRegion = {
								id: item.region_id,
								name: item.region.region
							}

						}else {
							return ;
						}
					});
				});
			}
		},
		// 获取已有的信息，重新编辑
		reedit () {
			let data = {
				user_id: this.userInfo.user_id,
				address_id: this.addr_id,
				name: this.name,
				phone: this.phone,
				region: this.area[0] + ',' + this.area[1] + ',' + this.area[2],
				detail: this.addr
			}
			// 编辑请求
			this.$http.post(webPath + '/index.php?s=/api/address/edit', data).then((res) => {
				// 成功
				this.saveTips = true;
				this.msg = res.body.msg;
				window.setTimeout(() => {
					this.saveTips = false;
						if (res.body.code == 1) {
							history.back();
						}
					},1000);
				}, res => {
					// 失败
				this.saveTips = true;
				this.msg = '保存失败';
				window.setTimeout(() => {
					this.saveTips = false;
				},1000);	
			});	
		}
	}
});