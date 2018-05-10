(function (root, factory) {
	root.selectImg = factory(root)
})(this, function (root) {


	function doInput(id){
	    var inputObj = document.createElement('input');
	    inputObj.addEventListener('change',readFile,false);
	    inputObj.type = 'file';
	    inputObj.accept = 'image/*';
	    inputObj.id = id;
	    inputObj.click();
	}

	function readFile(){
	    var file = this.files[0];//获取input输入的图片
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型");
	        return false;
	    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
	    var reader = new FileReader();
	    reader.readAsDataURL(file);//转化成base64数据类型
	    reader.onload = function(e){
	    	// console.log(this)
            drawToCanvas(this.result);
        }
	}

	function drawToCanvas(imgData){
	    // var cvs = document.querySelector('#cvs');
	    //     cvs.width=375;
	    //     cvs.height=400;
	        // var ctx = cvs.getContext('2d');
	        var img = document.getElementById('imgsrc')
	        img.src = imgData
	        // var img = new Image;
	        //     img.src = imgData;
	            // console.dir(img)

	            // img.onload = function(){//必须onload之后再画
	            //     ctx.drawImage(img,0,0,img.width,img.height);
	            //     strDataURI = cvs.toDataURL();//获取canvas base64数据
	            // }
	}


	return{
		template: '<div class="m-select-img">\
						<div :style="{\
							paddingTop: headTop,	\
							backgroundColor: headTopColor\
						}"\
						slot="navbar">\
							<div is="yd-navbar"\
								:title="title"\
								:bgcolor="headStyle.bgcolor"\
								:color="headStyle.color">\
								<div slot="left" :style="{color: headStyle.color}"\
								 	 v-on:click="back">\
									<div is="yd-navbar-back-icon" :color="headStyle.color">返回</div>\
								</div>\
							</div>\
						</div>\
						<div class="container">\
							<div style="text-align: center; margin-top: 5px;">\
								<croppa v-model="myCroppa"\
										:width="width"\
										:height="height"\
										placeholder=""\
										:disable-click-to-choose="true"\
										:canvas-color="\'#f2f2f2\'"\
										:show-remove-button="false"\
									    v-on:loading-end="loadingEnd"\
									    v-on:loading-start="loadingStart"\
									    v-on:image-remove="remove"\
									    ></croppa>\
							</div>\
							<div class="btns-group" v-if="!imgData">\
								<div class="btn-item" v-on:click="selectImg">\
									从手机相册选择\
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
				title:'手机相册',
				myCroppa: {},
				imgData:'',
				imgsrc:''
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

			selectImg: function () {
				// console.log(111111)
				// 打开手机相册
				this.myCroppa.chooseFile()
				
			},
			cancel:function () {
				// 取消
				this.myCroppa.remove()
			},
			complate: function () {
				// 完成
				this.imgsrc = this.myCroppa.generateDataUrl()
				// console.log(this.imgsrc)
				this.editorData.src = this.imgsrc
				// console.log(this.editorData)
				// var img = new()
				this.back()
			},
			changeImg: function () {
				// 替换	
				// this.editorData.src = this.imgsrc
				// var myCanvas = new util.MyCanvas(this.editorData)

				// myCanvas.draw()

				// this.back()
				// this.console()
				this.cancel()
				this.myCroppa.chooseFile()
			},
			loadingStart: function () {
				this.$dialog.loading.open('正在加载图片');
			},
			loadingEnd: function(){
				this.$dialog.loading.close();
				this.imgData = this.myCroppa.generateDataUrl()
				// console.log(this.myCroppa.generateDataUrl())
			},
			remove: function() {
				console.log('删除图片')
				this.imgsrc = this.imgData = this.myCroppa.generateDataUrl()
				// this.imgsrc = 
			},
			setCanvasView: function () {
				var canvas = document.getElementsByTagName('canvas')[0];
				var w = parseInt(canvas.style.width);
				var h = parseInt(canvas.style.height);
				console.log(w, h )
				var scale = window.innerWidth  * 0.9 / w
				canvas.style.width = w * scale + 'px',
				canvas.style.height = h * scale + 'px'

				// console.log('scale=' +scale)
				// // console.log(w,h)
				// console.log(window.innerWidth)
			}
		},

		mounted: function () {
			console.log(this.editorData.type)
			if(this.editorData.type == 'text'){
				this.back()
			}
			var vm = this
			this.$nextTick(function () {
				vm.setCanvasView()
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