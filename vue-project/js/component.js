// 推荐产品组件
// let recommendInfo = {
// 	href: '链接',
// 	img: '图片',
// 	title: '标题', 
// 	currentPrice: '当前价格', 
// 	beforePrice: '打折前价格', 
// 	comment: '评论数', 
// }
Vue.component('recommend', {
	template: `
		<a :href="recommendInfo.href" class="aui-list-product-item" :style="{'clear': recommendInd%2==0?'left':''}">
			<div class="aui-list-product-item-img">
				<img :src="recommendInfo.img" alt="">
			</div>
			<div class="aui-list-product-item-text">
				<h3>{{recommendInfo.title}}</h3>
				<div class="aui-list-product-mes-box">
					<div>
						<span class="aui-list-product-item-price">
							<em>¥</em>
							{{recommendInfo.currentPrice}}
						</span>

						<span class="aui-list-product-item-del-price">
							{{recommendInfo.beforePrice}}
						</span>
					</div>
					<!-- <div class="aui-comment">{{recommendInfo.comment}}评论</div> -->
				</div>
			</div>
		</a>
	`,
	props: ['recommendInfo', 'recommendInd'],
})

// 产品组件（小）
// let productInfo = {
// 	href: '链接', 
// 	img: '图片', 
// 	title: '标题', 
// 	currentPrice: '当前价格', 
// 	beforePrice: '打折前价格',
// }
Vue.component('product-small-list', {
	template: `
		<ul class="aui-slide-item-list">
			<li class="aui-slide-item-item" v-for="product in productInfo">
				<a :href="product.href" class="v-link">
					<img class="v-img" :src="product.img">
					<p class="aui-slide-item-title aui-slide-item-f-els">{{product.title}}</p>
					<p class="aui-slide-item-info">
						<span class="aui-slide-item-price">¥{{product.currentPrice}}</span>&nbsp;&nbsp;<span class="aui-slide-item-mrk">¥{{product.beforePrice}}</span>
					</p>
				</a>
			</li>
		</ul>
	`,
	props: ['productInfo'],
});

// 专场组件
// let specialFieldInfo = {
// 	headImg: ['图片1', '图片2'],
// 		listData: [
// 			{
// 				img: '产品图片',
// 				href: '链接',
// 				title: '标题',
// 				currentPrice: '当前价格',
// 				beforePrice: '打折前价格',
// 			},
// 		]
// }
Vue.component('special-field', {
	template: `
		<div>
			<div class="aui-title-head">
				<img :src="specialFieldInfo.headImg[0]"  alt="">
			</div>
			<div class="aui-list-item">
	
				<div class="aui-slide-box">
					<div class="aui-slide-list">
						<product-small-list :product-info="specialFieldInfo.listData"></product-small-list>
					</div>
				</div>
			</div>
		</div>
	`,
	props: ['specialFieldInfo'],
})