/**
*	编辑器模块组件
*/

define([
	'golbal',
	'js/components/panels/hpp-text-editor',
	'js/components/panels/hpp-img-editor',
	'text!view/panels/hpp-panels.html',
	
	],function (golbal,hppTextEditor,hppImgEditor,html) {
		// console.log(hppTextEditor)

	var  EVENTMAP = {
		'delete': 'remove',
		'set-style': 'setStyle',
		'set-color': 'setColor',
		'copy': 'copy',
		'paste': 'paste',
		'lock' : 'lock',
		'unlock': 'unlock',
		'photo': 'selectImg',
		'video': 'selectVideo',
		'align-center': 'alignCenter',
		'align-left':'alignLeft',
		'align-right': 'alignRight'
	}
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
				currentEditors:[],
				textCopyData: null

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
			},

			select: function (editor) {
				// 选择编辑器
				// console.log(editor)
				// editor.selected = true
				var list = this.currentEditors;

				if(list.length == 0){
					list.push(editor)
				}else if(list.length == 1){
					if(list[0] === editor){
						editor.editorStatus = editor.editorStatus == 1 ? 2 : 1;
						console.log(editor.editorStatus)
						return
					}else {
						var oldVal = list.shift();
						oldVal.selected = false;
						list.push(editor)
					}
				}else if(list.length > 1){
					for(var i = list.length - 1; i >= 0; i--){
						list[i].selected = false;
						list.pop()
					}
					list.push(editor)
				}
				// console.log(111)
				editor.selected = true
				editor.editorStatus = 1;

			},

			toolsclick: function (options) {
				// console.log(options)
				this[EVENTMAP[options.type]](options)
			},
			copy: function (options) {
				var obj = {}
				for(var key in options.data){
					if(key != 'left' && key !="top"){
						obj[key] = options.data[key]
					}
				}
				if(obj.type = 'text'){
					this.textCopyData = obj
				}
				
				// console.log(obj)
				// console.log('复制')
			},
			paste: function (options) {
				var maxHeight = this.editModules[options.moduleIndex].height;
				// console.log(maxHeight)
				if(options.data.type === 'text'){
					if(this.textCopyData != null){
						for(var key in this.textCopyData){
							options.data[key] = this.textCopyData[key]
						}
					}
				}

				if(options.data.height > maxHeight){
					options.data.height = maxHeight
				}
				console.log()


			},
			setStyle: function(options){
				// 设置文字样式
				var obj = {
					title: '应用',
					data: options.data,
					name: 'hpp-text-style'
				}

				this.$root.openPopviews(obj)
			},

			remove: function (options) {
				this.editModules[options.moduleIndex].editors.splice(options.editorIndex, 1)
				console.log(this.editModules)
			},

			

			
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