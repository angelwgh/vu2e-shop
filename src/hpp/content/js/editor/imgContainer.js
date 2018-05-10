(function (root, factory) {
	root.imgContainer = factory(root)
})(this, function (root) {


	return {
		// template: '<div class="img-container">\
		// 				<div class="img"\
		// 					 :class="{\'show-border\': isSowrBorder}"\
		// 					 :style="{\
		// 							left: editorData.left + \'px\',\
		// 							top: editorData.top + \'px\',\
		// 							width: editorData.width + \'px\',\
		// 							height: editorData.height + \'px\',\
		// 							borderStyle: editorData.borderStyle,\
		// 							borderColor: editorData.borderColor,\
		// 							borderWidth: editorData.borderWidth + \'px\',\
		// 							transformOrigin: editorData.width/2+\'px \'+  editorData.height/2 + \'px\',\
		// 							transform: \'rotate(\'+editorData.rotate+\'deg)\',\
		// 							borderTopLeftRadius: borderTopLeftRadius ,\
		// 							borderTopRightRadius: borderTopRightRadius ,\
		// 							borderBottomLeftRadius: borderBottomLeftRadius ,\
		// 							borderBottomRightRadius: borderBottomRightRadius ,\
		// 						}">\
		// 					<img v-if="src"\
		// 						:src="src" \
		// 						:style="{\
		// 						}"\
		// 					/>\
		// 				</div>\
		// 				<span class="add"\
		// 					  v-if="showAddImg"\
		// 					  v-finger:tap="addImg.bind(\'addImg\')"\
		// 					  :style="{\
		// 							left: add.left + \'px\',\
		// 							top: add.top + \'px\'\
		// 					  }"><i class="iconfont icon-tianjia"></i></span>\
		// 		  </div>',
		template: '<div class="img-container">\
						<div class="img"\
							 :class="{\'show-border\': isSowrBorder}"\
							 :style="{\
									left: editorData.left + \'px\',\
									top: editorData.top + \'px\',\
									width: editorData.width + \'px\',\
									height: editorData.height + \'px\',\
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
							<img v-show="src"\
								:src="src" \
								:style="{\
								}"\
							/>\
							<div v-show="src && type==\'video\'"\
								@click="playVideo"\
								class="video-view">\
								<video :src="editorData.src" style="height: 200%; display: block; position: relative;z-index:0"></video>\
								<i v-if="!playing" class="iconfont icon-icon_video"></i>\
							</div>\
						</div>\
						<span class="add"\
							  v-show="showAddImg"\
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
			currentEditor: {
				type: Object
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
			},
			focusWrapData: {
				type: Object
			}
		},
		data: function () {
			return {
				title: '图片',
				imgData: {
					src: ''
				},
				startTime:0,
				touchmoved: false,
				longtouchTimeout: null,
				taptouchTimeout:null,
				stoppropagation:false,
				playing: false
				// longtouchTimeout
			}
		},

		computed: {
			type: function () {
				return this.editorData.type;	
			},
			showAddImg: function () {
				// console.log()
				// return 	this.isSowrBorder && (!this.focusWrapData.showTools || this.currentEditor !== this.editorData)
				return this.showBorder && !this.editorData.locked && this.type != 'video'
			},
			isSowrBorder: function () {
				// console.log()
				return 	this.showBorder && (!this.editorData.src && (!this.editorData.backgroundColor || this.editorData.backgroundColor == 'transparent'))
			},
			src: function () {
				
				// console.log(myCanvas.imgData)
				return this.imgData.src
			},
			add: function () {
				var obj = this.editorData
				return {
					left: obj.width / 2 + obj.left - 13,
					top: obj.height / 2 + obj.top - 13
				}
			},
			width: function () {
				return typeof editorData.width === 'string'
			},
			borderTopLeftRadius: function () {
				// console.log(this.editorData.borderTopLeftRadius_w + 'px ' + this.editorData.borderTopLeftRadius_h + 'px')
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
				
			},
			borderRadiusWidth: function() {
				return this.editorData.borderRadiusWidth
			}
		},
		methods: {
			select (evt) {
				// console.log(evt)
				// console.log(evt.target.className)
				// console.log(this.currentEditor)
				if(/iconfont/.test(evt.target.className) && this.currentEditor == this.editorData) return
				// this.stoppropagation = true;
				this.$emit('select', this.editorData, this.moduleIndex, this.editorIndex, evt)
			},
			openMenu: function (evt) {
				evt.stopPropagation()
				console.log('打开功能菜单')
				if(this.currentEditor !== this.editorData){
					this.$emit('select', this.editorData, this.moduleIndex, this.editorIndex, evt)
				}
				this.$emit('open-menu')
			},
			longtouch(evt) {
				// evt.preventDefault()
				console.log('长按事件')
				this.$emit('longtouch', this.editorIndex)
			},

	        loadCanvas: function () {
	        	// 加载canvas画布
	        	var myCanvas = new util.MyCanvas(this.editorData, this.imgData)
	        	myCanvas.draw()

	        	// console.dir(myCanvas)
	        	// this.src = myCanvas.imgData
	        },

	        touchstart: function (evt) {
	        	evt.preventDefault()
	        },

	        addEvent: function () {
	        	console.log(this.$el)
	        	var el = this.$el;
	        	var addImg = this.$el.getElementsByClassName('add')[0]
	        	var event = new AlloyFinger(el, {
	        		tap: this.select,
	        		longTap: this.longtouch
	        	})
	        	// addImg.addEventListener('click',function () {
	        	// 	console.log('click')
	        	// })
	        	var addImgEvent = new AlloyFinger(addImg,{
	        		tap: this.openMenu
	        	})
	        	// console.log(AlloyFinger)
	        },
	        playVideo: function () {
	        	var video = this.$el.querySelector('video')
	        	console.log(video)
	        	// video.paly()
	        	if(!this.playing){
	        		video.play()
	        	}else {
	        		video.pause()
	        	}

	        	this.playing = !this.playing
	        }

		},

		mounted: function () {
			var vm = this
			this.$nextTick(function () {
				vm.loadCanvas()
				vm.addEvent()
				// if(vm.type === 'img'){
					
				// }
				
			})
			
			// console.log(this)
		},

		watch:{
			'editorData.src': function (val, oval) {
				// if(val !== oval){
				// 	// this.loadCanvas()
				// }
				this.loadCanvas()

				// console.log(this.editorData)
			},
			'editorData.backgroundColor': function () {
				this.loadCanvas()
			}
		}
	}


})