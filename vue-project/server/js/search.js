let vm = new Vue({
	el: '#search',
	data: {
		inp: null,
		url: '',
		titles: [],
		localSearch: 'mySearch',
		isShowDelete: false,
		deleteIndex: -1,
		timeoutID: null,
		
		value: "", //搜索框
		newarr: [], //人员列表
		typeLi:[]//类型列表
	},
	mounted () {
		if (localStorage.getItem(this.localSearch)) {
			this.titles = localStorage.getItem(this.localSearch).split(',');
		}
	},
	methods: {
		//发起搜索请求
		search (e, search) {
			if (search == null) {
				return ;
			}else if (search.trim() == '') {
				return ;
			}
			// 将搜索数据保存在本地
				// 有缓存
			if (localStorage.getItem(this.localSearch)) {
				let temp = localStorage.getItem(this.localSearch);
				// 去重
				let isRepeat = false;
				for (item of temp.split(',')) {
					if(search == item) {
						isRepeat = true;
					}
				}
				if (!isRepeat) {
					temp = temp + ',' + search;
					console.log(temp);
					this.titles = temp.split(',');
					localStorage.setItem(this.localSearch, temp);	
				}
			}else {
				// 无缓存
				localStorage.setItem(this.localSearch, search);
				this.titles = [search];
			}
			// 有无查询数据
			if(search == null) {
				console.log('都没有');
				return null;
			}else {
				let user_id = JSON.parse(sessionStorage.getItem("userInfo")).user_id;
				let data = {
					user_id: user_id,
					keyword: search,
				}
				this.$http.post(webPath + '/index.php?s=/api/booking/search', data).then((res) => {
					console.log('搜索成功');
					console.log(res.data);
					this.typeLi  = res.data.data.typeInfo;
					this.newarr = res.data.data.userInfo;
				}, (res) => {
					console.log('搜索失败');

				});
			}
		},
		// 清除记录
		clear () {
			this.titles.splice(0);
			localStorage.removeItem(this.localSearch);
		},
		// 取消删除记录
		cancel () {
			console.log('取消删除记录')
			this.isShowDelete  = false;
			this.deleteIndex = -1;
		},
		// 确定删除记录
		sure () {
			console.log('确定删除记录')
			this.isShowDelete  = false;
			
			// 删除记录
			let temp = localStorage.getItem(this.localSearch);
			temp = temp.split(',');
			temp.splice(this.deleteIndex,1);
			this.titles = temp;
			localStorage.setItem(this.localSearch, temp.join(','));

			this.deleteIndex = -1;
		},
		// 开始按下记录（实现长按删除记录）
		displayDelete1(e, ind) {
			this.deleteIndex = ind;
			//开始计时
			this.timeoutID = window.setTimeout(() => {
				this.isShowDelete  = true;
			}, 600);
		},
		// 弹出删除记录（实现长按删除记录）
		displayDelete2(e, ind) {
			this.deleteIndex = ind;
			//结束计时,取消弹窗
			window.clearTimeout(this.timeoutID);
		}
	}
});
