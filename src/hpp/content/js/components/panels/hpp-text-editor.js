/**
 * 文字编辑组件
 * @return {[type]}
 */
define([
		'golbal',
		'AlloyFinger',
		'util',
		'js/components/panels/hpp-focus-wrap-text',
		'text!view/panels/hpp-text-editor.html'
	],function (golbal, AlloyFinger, util, hppFocusWrapText, html) {
		// console.log(hppFocusWrapText)

		var change = new util.Change()
	

	return {
		name: 'hpp-text-editor',
		template: html,
		components:{
			[hppFocusWrapText.name]: hppFocusWrapText
		},
		props:{
			editorData: {
				type: Object,
				default: function () {
					return {}
				}
			},
			module: {
				type: Object
			},
			moduleIndex: {
				type: Number
			},
			editorIndex: {
				type: Number
			}
		},
		data: function () {
			return {
				viewWidth: 0,
				viewHeight: 0
			}	
		},
		methods:{
			longTap: function () {
				// 长按
				var editorData = this.editorData;
				if(editorData.locked){

				}else if(editorData.selected){
					if(editorData.editorStatus === 1){
						// 白点状态
						editorData.focus = true
					}else if(editorData.editorStatus === 2){
						// 黑点状态
						editorData.showTools = true;
					}
				}
				// console.log(this.editorData) 
			},
			tap: function (evt) {
				console.log(evt.target.className)
				var editorData = this.editorData

				if(evt.target.className == 'tool'){
					// 触发工具条点击事件
					editorData.showTools = false;
					this.$emit('toolTap')
					return
				}


				// 单击
				// 触发选择事件
				
				// 点击后隐藏工具条
				editorData.showTools = false;
				// 获得焦点状态时不触发点击事件
				if(editorData.focus) return;
				// 触发选择编辑器事件
				this.$emit('tap',this.editorData)	
			},
			pressMove: function (evt) {
				console.log(evt)
				if(this.editorData.editorStatus !== 2){
					// 黑点时可以拖动改变编辑器的位置
					return
					
				}
				evt.stopPropagation();
				var target = evt.target;

				if(util.hasClass(target, 'corner')){
					console.log(target.dataset.dir)
					change.change(evt, target.dataset.dir, this.editorData, this.module)
				}else{
					change.change(evt, 'move', this.editorData, this.module)
				}
				
				
				
				
				
			},
			addEvents: function () {
				// 监听事件
				var el = this.$el;
				// console.log(this)
				var elEvents = new AlloyFinger(el, {
					longTap: this.longTap,
					tap: this.tap,
					pressMove: this.pressMove
				})
				// this.setTextAreaSize()
			},


			// 根据文字内容设置文字框的大小
			setTextAreaSize: function () {
				var editorData = this.editorData;
				var $el = this.$el;
				var text_view = $el.querySelector('.text-view')
				var content = editorData.content;	
					
					console.log(text_view.innerHTML)
				// 获取文字显示div的尺寸，
				// 用来设置编辑框的尺寸
				this.$nextTick(function () {
					var w = text_view.offsetWidth,
						h = text_view.offsetHeight
					// console.log(w,h)
					// 模块尺寸
					editorData.width = w * editorData.scaleX || editorData.defaultWidth
					editorData.height = h * editorData.scaleY || editorData.defaultHeight * editorData.scaleY;

					// textarea尺寸
					// console.log(w)
					this.viewWidth = w || editorData.defaultWidth;
					this.viewHeight = h || editorData.defaultHeight;

					// 超出显示范围删除多余字符
					if(window.innerWidth - editorData.left - editorData.width < 0){
						editorData.content = content.substr(0, content.length - 1); 
					}
					
				})

			}

			changeSize: function () {
				var editorData = this.editorData;
				var el = this.$el;
				var textView = el.getElementsByClassName('text-view')[0];
				var scaleX, scaleY;
				if(!editorData.content) return;
				this.$nextTick(function () {
					editorData.scaleY = editorData.height / textView.offsetHeight || 0
					editorData.scaleX = editorData.width / textView.offsetWidth || 0
				})
			}
		},
		created: function () {
			// console.log(this.editorData)
			this.$nextTick(function () {

				this.addEvents()
				this.setTextAreaSize()
			})
		},

		watch: {
			'editorData.content': function () {
				this.setTextAreaSize()
			},

			'editorData.selected': function (nVal, oVal) {
				// 失去选择状态后
				if(nVal == false){
					// 1.失去焦点
					this.editorData.focus = false;
					// 2.圆点状态统一为白点
					this.editorData.editorStatus = 1;
					// 3. 隐藏工具条
					this.editorData.showTools = false;
				}
				
			}

			'editorData.height': function () {
				this.changeSize()
			}
		}
	}
})