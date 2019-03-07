let vm = new Vue({
	el: '#help',
	data: {
		title: '',
		content: ''
	},
	mounted () {
		this.getHelp ();
	},
	methods: {
		getHelp () {
			this.$http.get(webPath + '/index.php?s=/api/wxapp/help', null).then((res) => {
				console.log(res);
				this.title =  res.body.data.list[0].title;
				this.content = res.body.data.list[0].content;
			});
		}
	}
});