/**
*	编辑器模块组件
*/

define([
	'golbal',
	'js/components/panels/hpp-text-editor',
	'js/components/panels/hpp-img-editor',
	'text!view/panels/hpp-panels.html'
	],function (golbal,hppTextEditor,hppImgEditor,html) {
		console.log(hppTextEditor)
	return {
		name: 'hpp-panels',
		components: {
			[hppTextEditor.name]: hppTextEditor,
			[hppImgEditor.name]: hppImgEditor
		},
		template: html,
		props: {
			editModules: {
				type: Array,
				default: function () {
					return []
				}
			}
		},

		data: function () {
			return {
				alloyTouchData: {
					options: {
						touch: "",
						target:"#J_detail_content",
						prototype: 'translateY'
					},
					max: 0,
					min: -500,
					handleAlloyTouch: null
				},

			}	
		},
		methods: {
			init: function () {
				this.formateEditModulesData()
				this.initAlloyTouchData()
			},
			initAlloyTouch: function (handle) {
				this.handleAlloyTouch = handle
			},
			animationEnd: function () {

			},
			initAlloyTouchData: function () {
				// 初始化AlloyTouch参数
				 var vm = this;

            	 this.$nextTick(function () {
            	 	var target = document.getElementById('wrapper')
            	 	var min = -target.offsetHeight + window.innerHeight - 140
					vm.alloyTouchData.min = min > 0 ? 0 : min

					// console.log(vm.alloyTouchData.min)
				})
			},
			formateEditModulesData: function () {
				// 初始化模板数据，把xx%的字符串转成数值
				this.editModules.forEach(function (module) {

					module.editors.forEach(function (editor) {
						
						if(typeof editor.defaultWidth === 'string'){
							editor.defaultWidth =  window.innerWidth * parseInt(editor.width) / 100
						}
						if(typeof editor.width === 'string'){
							editor.width = window.innerWidth * parseInt(editor.width) / 100

						}
						if(typeof editor.left === 'string'){
							
							editor.left = window.innerWidth * parseInt(editor.left) / 100
						}
					})
				})
			}

			
		},

		created: function () {
			this.init()	
			console.log(this.$refs)
		},
		mounted: function () {
			// console.log(this.panelsData)
		}
	}
})