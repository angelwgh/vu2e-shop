define(['golbal','text!view/commom/hpp-navbar.html'],function (golbal,html) {

	return {
		name: 'hpp-navbar',
		template: html,
		props:{
			bgcolor: {
				type:String,
				default: '#000'
			},
			color: {
				type: String,
				default: '#fff'
			},
			title: {
				type: String,
				default: '自定义标题'
			},
			rightIcon: {
				type: String,
				default: 'iconfont icon-jia'
			},
			rightShow: {
				type:Boolean,
				default: false
			}
		},
		data: function () {
			return {
			}
		},
		methods: {
			back: function () {
				console.log(this.rightShow)
				this.$emit('back')	
			},

			rightBtn: function () {
				this.$emit('right-click')
			},
		}

	}
})