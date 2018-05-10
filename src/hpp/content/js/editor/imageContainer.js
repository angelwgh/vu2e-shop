(function (root, factory) {
	root.imgContainer = factory(root)
})(this, function (root) {
	
	function MyCanvas(canvas) {
		this.canvas = canvas

		this._init()
	}

	MyCanvas.prototype = {
		_init: function () {
			
		},

		config: function (options) {
			if(typeof options != 'object') return;

			for( var key in options){
				this.canvas[key] = options.key;
			}
		}
		draw: function () {
			
		}
	};


	return {
		template: '<div class="img-container"\
					v-on:click.stop="select" \
					v-on:touchstart.stop="touchstart"\
					v-on:touchmove.stop="touchmove"\
					v-on:touchend.stop="touchend">\
						<div class="img"\
							 :class="{\'show-border\': isSowrBorder}"\
							 :style="{\
									left: editorData.left + \'px\',\
									top: editorData.top + \'px\',\
									width: editorData.width + \'px\',\
									height: editorData.height + \'px\',\
									backgroundColor: editorData.backgroundColor,\
									borderStyle: editorData.borderStyle,\
									borderColor: editorData.borderColor,\
									borderWidth: editorData.borderWidth + \'px\',\
									transformOrigin: editorData.width/2+\'px \'+  editorData.height/2 + \'px\',\
									transform: \'rotate(\'+editorData.rotate+\'deg)\',\
									borderTopLeftRadius: borderTopLeftRadius ,\
									borderTopRightRadius: borderTopRightRadius ,\
									borderBottomLeftRadius: borderBottomLeftRadius ,\
									borderBottomRightRadius: borderBottomRightRadius ,\
								}">\
							<img v-if="src"\
								:src="src" \
								:style="{\
								}"\
							/>\
						</div>\
						<span class="add"\
							  v-if="isSowrBorder"\
							  :style="{\
									left: add.left + \'px\',\
									top: add.top + \'px\'\
							  }"><i class="iconfont icon-tianjia"></i></span>\
				  </div>',
		props: {
			editorData: {
				type: Object,
				defult: function () {
					return {}
				}
			},
			moduleIndex: {
				type: Number
			},
			editorIndex: {
				type: Number
			},
			showBorder: {
				type: Boolean,
				default: true
			}
		},
		data: function () {
			return {
				title: '图片'
			}
		},

		computed: {
			isSowrBorder: function () {
				return 	this.showBorder && (!this.src && (!this.editorData.backgroundColor || this.editorData.backgroundColor == 'transparent'))
			},
			src: function () {
				return this.editorData.src
			},
			add: function () {
				var obj = this.editorData
				return {
					left: obj.width / 2 + obj.left ,
					top: obj.height / 2 + obj.top
				}
			},
			width: function () {
				return typeof editorData.width === 'string'
			},
			borderTopLeftRadius: function () {
				console.log(this.editorData.borderTopLeftRadius_w + 'px ' + this.editorData.borderTopLeftRadius_h + 'px')
				return this.editorData.borderTopLeftRadius_w + 'px ' + this.editorData.borderTopLeftRadius_h + 'px'
			},
			borderTopRightRadius: function () {
				return this.editorData.borderTopRightRadius_w + 'px ' + this.editorData.borderTopRightRadius_h + 'px'
				
			},
			borderBottomLeftRadius: function () {
				return this.editorData.borderBottomLeftRadius_w + 'px ' + this.editorData.borderBottomLeftRadius_h + 'px'
				
			},
			borderBottomRightRadius: function () {
				return this.editorData.borderBottomRightRadius_w + 'px ' + this.editorData.borderBottomRightRadius_h + 'px'
				
			}
		},
		methods: {
			select (event) {

				this.$emit('select', this.editorData, this.moduleIndex, this.editorIndex, event)
			},
			touchstart(){
				// console.log('touchstart')
				this.longtouchTimeout = setTimeout(() => {
					this.longtouch()
				},500)

			},
			touchmove() {
				this.cancelLongtouch()
			},
			touchend() {
				// console.log('touchend')
				this.cancelLongtouch()
			},
			longtouch() {
				console.log('长按事件')
				this.$emit('longtouch', this.editorIndex)
			},
			cancelLongtouch: function () {
	            clearTimeout(this.longtouchTimeout);
	        },

	        loadCanvas: function () {
	        	var canvas = document.createElement('canvas')

	        	console.dir(canvas)
	        }
		},

		mounted: function () {
			this.loadCanvas()
			// console.log(this)
		}
	}


})