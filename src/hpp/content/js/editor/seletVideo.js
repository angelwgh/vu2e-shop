// 添加视频

(function (root, factory) {
	root.selectVideo = factory(root)
})(this, function (root) {
	function doInput(id){
	    var inputObj = document.createElement('input');
	    inputObj.addEventListener('change',readFile,false);
	    inputObj.type = 'file';
	    inputObj.accept = 'video/*';
	    inputObj.id = id;
	    inputObj.click();
	}

	function readFile(){
	    var file = this.files[0];//获取input输入的图片
	    console.log(file)
	    if(!/video\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型");
	        return false;
	    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
	    // var reader = new FileReader();
	    // reader.readAsDataURL(file);//转化成base64数据类型
	    // reader.onload = function(e){
	    // 	// console.log(this)
	    // 	console.log(this.result)
     //        // drawToCanvas(this.result);
     //    }
	}

	return{
		template: '<div class="m-select-video">'+
						'<div :style="{'+
							'paddingTop: headTop,'+
							'backgroundColor: headTopColor'+
						'}"'+
						'slot="navbar">'+
							'<div is="yd-navbar"'+
								':title="title"'+
								':bgcolor="headStyle.bgcolor"'+
								':color="headStyle.color">'+
								'<div slot="left" :style="{color: headStyle.color}"'+
								 	 'v-on:click="back">'+
									'<div is="yd-navbar-back-icon" :color="headStyle.color">返回</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="container">'+
							'<div  style="text-align: center; margin-top: 5px;">'+
								'<div :style="{'+
									'width:width + \'px\','+
									'height: height + \'px\''+	
								'}" v-show="videoSrc" class="video-show" >'+
									'<video \
									 :width="width"\
									 :src="videoSrc"></video>\
									 <i @click="play" v-if="!playing" class="iconfont icon-icon_video"></i>\
								</div>\
							</div>\
							<div class="btns-group" v-if="!videoSrc">\
								<div class="btn-item" v-on:click="selectVideo">\
									选择视频\
								</div>\
								<div class="btn-item"  v-on:click="back">\
									取消\
								</div>\
							</div>\
							<div class="btns-group-1 flex">\
								<button v-on:touchend="cancel">取消</button>\
								<button v-on:touchend="complate">完成</button>\
								<button v-on:touchend="changeImg">替换</button>\
							</div>\
						</div>\
				  </div>',
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
				headTop: golbal.headTop,
				headTopColor: golbal.headTopColor,
				headStyle: {
					bgcolor: golbal.headStyle.bgColor,
					color: golbal.headStyle.color
				},
				title:'选择视频',
				myCroppa: {},
				imgData:'',
				videoSrc:'',
				playing:false,
				video: null

			}
		},
		computed: {
			width: function () {
				return this.editorData.width;
			},
			height: function () {
				return this.editorData.height
			}
		},
		methods: {
			back: function () {
				this.$emit('close')
			},
			selectVideo: function () {
				console.log(this)
				this.$root.uploadVideo(this.viewVideo.bind(this))
				// doInput()
			},
			cancel: function () {
				
			},
			complate: function () {
				// console.log(111111111111111)
				this.editorData.src = this.videoSrc;
				this.editorData.type = "video"
				this.back()
			},
			changeImg: function () {
				
			},
			viewVideo: function (src) {
				console.log(this.title)
				console.log(src)
				this.videoSrc = src
			},
			addEvent: function () {
				var video = this.video = document.querySelector('.video-show video')

				console.log(video)
				var vm = this
				video.addEventListener('click', function (event) {
					if(this.paused){
						this.play()
						vm.playing = true
					}else{
						this.pause()
						vm.playing = false
					}
					// this.play()
					console.log(this.paused)
				})
				video.addEventListener('ended',function () {
					vm.playing = false
					this.currentTime = 0
				}),

				video.addEventListener('timeupdate', function () {
					console.log(this.currentTime)
				})
			},
			play: function () {
				this.video.play()
				this.playing = true
			}
		},

		mounted: function () {
			console.log(this.editorData.type)
			var vm = this;
			if(this.editorData.type == 'text'){
				this.back()
			}
			// var vm = this
			this.$nextTick(function () {
				vm.addEvent()
			})
		},
		watch:{
			editorData:function (val,olVal) {
				if(val.type  == 'text'){
					this.back()
				}
				// console.log(val.type)
				// console.log(olVal.type)
			}
		}
	}
})