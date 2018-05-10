/**
 * 图片编辑组件
 * @return {[type]}
 */
define([
		'golbal',
		'text!view/panels/hpp-img-editor.html'
	],function (golbal, html) {
	return {
		name: 'hpp-img-editor',
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

		created: function () {
			console.log(this.editorData)
		}
	}
})