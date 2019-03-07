let leftNav = new Vue({
	el: '#class',
	data: {
		index: 0,
		navList: ['热门推荐', '美容彩妆'],
		title: '热门推荐',
		headImg: './img/pd/cf-4.jpg',
		classlist: [{
			name: "test",
			child: [{
				image: {
					file_path: webPath + "/uploads/2019022215135489dd00377.jpg"
				}

			}]
		}]
	},
	mounted() {
		this.$http.get(webPath + '/index.php?s=/api/category/lists').then((res) => {
			console.log(JSON.parse(res.bodyText))
			this.classlist = res.body.data.list;
		})
	},
	methods: {
		selectClass(ind) {
			console.log(ind)
			this.index = ind;
		},
		ToList($event, item) {
			console.log(item)
			let data = {
				category_id: item.category_id,
				search: item.name,
				sortType: "all",
				sortPrice: false
			}
			console.log(data);
			this.$http.post(webPath + "/index.php?s=/api/goods/lists", data, {emulateJSON:true}).then((res) => {

				console.log(JSON.parse(res.bodyText).data)
				if (JSON.parse(res.bodyText).data) {
					location.href = './my-products-class.html?category_id=' + data.category_id;
				} else {
					console.log("获取失败")
				}
			})

		}
	}
});
