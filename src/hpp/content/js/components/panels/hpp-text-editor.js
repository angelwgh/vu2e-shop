/**
 * 文字编辑组件
 * @return {[type]}
 */
define([
		'golbal',
		'AlloyFinger',
		'text!view/panels/hpp-text-editor.html'
	],function (golbal, AlloyFinger,html) {
	return {
		name: 'hpp-text-editor',
		template: html,
		props:{
			editorData: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data: function () {
			return {
				viewWidth: 375,
				viewHeight: 200
			}	
		},
		methods:{
			longTap: function () {
				// 长按
				console.log('长按') 
			},
			select: function () {
				// 单击
				console.log('选择模块')	
			},
			addEvents: function () {
				// 添加事件
				var el = this.$el;
				console.log(this)
				var elEvents = new AlloyFinger(el, {
					longTap: this.longTap,
					tap: this.select
				})
			}
		},
		created: function () {
			// console.log(this.editorData)
			this.$nextTick(function () {
				this.addEvents()
			})
		}
	}
})