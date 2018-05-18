/*
** 编辑器插件， 包含图片导入、样式编辑，文字内容、样式编辑，
*  图片文字编辑模块的添加删除
*  模块添加删除，高度调整
*/

(function (root, factory) {
	root.editor = factory(root)
})(this, function (root) {
	// console.log(typeof root.Vue)
	// console.log(AlloyFingerVue)
	// console.log(AlloyFinger)
	if(typeof root.Vue !== 'function') return
	Vue.use(AlloyFingerVue,{ AlloyFinger });
	Vue.use(Croppa);

	function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var sin = y/z;
        var radina = Math.asin(sin);//用反三角函数求弧度
        var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if(mx>px&&my>py){//鼠标在第四象限
            angle = 360 - angle;
        }

        if(mx==px&&my>py){//鼠标在y轴负方向上
            angle = 270;
        }

        if(mx>px&&my==py){//鼠标在x轴正方向上
            angle = 0;
        }

        if(mx<px&&my>py){//鼠标在第三象限
            angle = 180+angle;
        }

        if(mx<px&&my==py){//鼠标在x轴负方向
            angle = 180;
        }

        if(mx<px&&my<py){//鼠标在第二象限
            angle = 180 - angle;
        }



            return angle;
    }
	function Change() {
		
	}
	Change.prototype =  {
		contructor: Change,
		change(evt,type,data,module,moduleTop){
			const self = this
			self._evt = evt;
			self._type = type;
			self._data = data;
			// console.log(data)
			this.rotate = data.rotate
			this._options = {}
			self._module = module
			self._moduleTop = moduleTop
			// console.log(self)
			this.maxHeight = module.height
			self[type+'Change']()
			
			// console.log(editorData)
		},
		bottomChange(){
			// console.log(this._data)
			var rotate = this.rotate || 0
			var height;
			var scaleY;
			// console.log()
			// if(this._data.type == 'img'){
				height = this._data.height -this._evt.deltaX*Math.sin(rotate*Math.PI/180) + this._evt.deltaY*Math.cos(rotate*Math.PI/180)
				height = height > 0 ? height : 0;
				this._data.height = height;
			// }else if(this._data.type = 'text'){
			// 	// var scale = 
			// 	height = this._data.height * this._data.scaleY -this._evt.deltaX*Math.sin(rotate*Math.PI/180) + this._evt.deltaY*Math.cos(rotate*Math.PI/180);
			// 	// height = height
			// 	// console.log(height)
			// 	// console.log(this._data.height)
			// 	scaleY = height / this._data.height
			// 	this._data.scaleY = scaleY;
			// 	this._data.height = height;
			// }
			// this._options.height = this._data.height = height
		},
		topChange() {	
			const height = this._data.height + this._evt.deltaX*Math.sin(this.rotate*Math.PI/180) - this._evt.deltaY*Math.cos(this.rotate*Math.PI/180)
			const top = this._data.top -this._evt.deltaX*Math.sin(this.rotate*Math.PI/180) + this._evt.deltaY*Math.cos(this.rotate*Math.PI/180)
			if(top <= 0) return
			const maxTop =  top + height;
			this._options.height = this._data.height = height > 0 ? height : 0;
			this._data.top = top > maxTop ? maxTop : top
			this._options.top = this._data.top + this._moduleTop
		},
		leftChange() {
			const width = this._data.width - this._evt.deltaX*Math.cos(this.rotate*Math.PI/180) - this._evt.deltaY*Math.sin(this.rotate*Math.PI/180)
			const left = this._data.left +this._evt.deltaX*Math.cos(this.rotate*Math.PI/180) + this._evt.deltaY*Math.sin(this.rotate*Math.PI/180)
			const mxLeft = left + width;
			if(left <= 0 ) return;
			this._options.width = this._data.width = width > 0 ? width : 0;
			this._options.left = this._data.left = left > mxLeft ? mxLeft : left;

		},
		rightChange () {
			console.log()
			var  width = this._data.width + this._evt.deltaX*Math.cos(this.rotate*Math.PI/180) + this._evt.deltaY*Math.sin(this.rotate*Math.PI/180)
			// var  left = this._data.left + 
			// var left = this._data.left + this._evt.deltaX / 2;
			console.log(this._evt.deltaY / 2)
			var top = this._data.top + this._evt.deltaY
			if(this._data.left + width >= window.innerWidth) return;
			// this.
			this._options.width = this._data.width = width > 0 ? width : 0;
		},

		corner1Change() {
			this.topChange()
			this.leftChange()
		},

		corner2Change() {
			this.topChange()
			this.rightChange()
		},

		corner3Change() {
			this.leftChange()
			this.bottomChange()
		},

		corner4Change() {
			this.rightChange()
			this.bottomChange()
		},

		moveChange() {
			// if(this._data.left <= 0 || this._data.top <= 0 || this._data.left + this._data.width >= window.innerWidth){
			// 	return
			// }
			this._options.left =  this._data.left += this._evt.deltaX
			this._data.top += this._evt.deltaY
			this._options.top = this._data.top + this._moduleTop

			if(this._data.left <= 0){
				this._data.left = 0;
			}

			if(this._data.top <= 0){
				this._data.top =0
			}

			if(this._data.left + this._data.width >= window.innerWidth){
				this._data.left = window.innerWidth - this._data.width
			}

			if(this._data.top + this._data.height >= this.maxHeight){
				this._data.top = this.maxHeight - this._data.height
			}
		},

		rotateChange() {
			console.log(1)
			// this._options.rotate = this._data.rotate += this._evt.deltaY
		}
	};


	function TextStyleData() {
		this.init()
	};

	TextStyleData.prototype = {
		constructor: TextStyleData,

		init: function () {

			this.setFontFamily()
			this.setFontSize()
			this.setLetterSpacing()
			this.setMainColors()
			this.setOtherColors()
			this.setStandardColors()
		},

		setFontFamily: function ( arr ) {
			arr = arr || ['Microsoft YaHei','黑体','宋体','新宋体','Helvetica','Arial','Lucida Family','Times']
			var fontFamily = this.fontFamily = ['设置字体']
			fontFamily.push.apply(fontFamily, arr)
		},

		setFontSize: function ( n ) {
			n = n || 50
			var fontSize = this.fontSize = ['字体大小']

			for(let i = 12; i < n; i++){
				fontSize.push(i)
			}
		},

		setLetterSpacing: function ( n ){
			n = n || 30;
			var letterSpacing = this.letterSpacing = ['字间距']

			for(let i = 0; i < n; i++){
				letterSpacing.push(i)
			}
		},

		setMainColors (){
			this.mainColors = [
				'#ffffff', '#000000', '#e7e6e6', '#44546a', '#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc002', '#4472c4', '#70ad47'
			]
		},

		setOtherColors () {
			this.otherColors = [
				['#e4dae5', '#7f7f7f', '#dbdad6', '#d7dbe4', '#dfe8e3', '#fbe5d7', '#ededed', '#fff1cc', '#dae3f4', '#e2eed8'],
				['#c6b3c7', '#595959', '#bbb3b0', '#aeb9cb', '#bdd2d3', '#f8cbac', '#dbdbdb', '#fde69a', '#b5c5e6', '#c5e0b3'],
				['#ab8ead', '#3f3f3f', '#948d83', '#8496b0', '#9cbbc3', '#f3b184', '#c9c9c9', '#ffd965', '#8eaadb', '#a8d08d'],
				['#926993', '#262626', '#524436', '#323f4f', '#336f91', '#c55a11', '#7b7b7b', '#bf9000', '#2f5496', '#538135'],
				['#754477', '#0c0c0c', '#514434', '#222a35', '#1d4d63', '#833d0a', '#525252', '#805f00', '#203864', '#385624']
			]
		},

		setStandardColors() {
			this.standardColors = [
				'#c10003', '#fe0000', '#ffc102', '#ffff01', '#b8d200', '#00af50', '#01b0ef', '#0170c1', '#012061', '#7030a2'
			]
		}
	};
	/**
	*	文字编辑器组件
	*/

	// <textarea v-model="editorData.content"\
	// 	:class="{\'show-border\': showBorder}"\
	// 	:style="{\
	// 		left: editorData.left + \'px\',\
	// 		top: editorData.top + \'px\',\
	// 		width: editorData.width + \'px\',\
	// 		height: editorData.height + \'px\',\
	// 		lineHeight: editorData.lineHeight,\
	// 		transformOrigin: editorData.width/2+\'px \'+  editorData.height/2 + \'px\',\
	// 		transform: \'rotate(\'+editorData.rotate+\'deg)\',\
	// 		fontFamily: editorData.fontFamily,\
	// 		fontSize: editorData.fontSize + \'px\',\
	// 		letterSpacing: editorData.letterSpacing + \'px\',\
	// 		color: editorData.color\
	// 	}"></textarea>\

	// <div class="text-mask"\
	// 	 v-if="!editorData.focus"\
	// 	 :style="{\
	// 	 	left: editorData.left + \'px\',\
	// 		top: editorData.top + \'px\',\
	// 		width: editorData.width + \'px\',\
	// 		height: editorData.height + \'px\',\
	// 	 }"></div>\
	var textContainer = {
		template:'<div class="text-container">\
					<div class="textarea" :class="{\'show-border\': showBorder}"\
						 :style="{\
						 	left: editorData.left + \'px\',\
						 	top: editorData.top + \'px\',\
						 	width: editorData.width + \'px\',\
						 	height: editorData.height + \'px\',\
						 	lineHeight: editorData.lineHeight,\
						 	transformOrigin: editorData.width/2+\'px \'+  editorData.height/2 + \'px\',\
						 	transform: \'rotate(\'+editorData.rotate+\'deg)\',\
						 	fontFamily: editorData.fontFamily,\
						 	fontSize: editorData.fontSize + \'px\',\
						 	letterSpacing: editorData.letterSpacing + \'px\',\
						 	textAlign: editorData.textAlign || \'left\',\
						 	color: editorData.color,\
						 	webkitTextStrokeColor: editorData.webkitTextStrokeColor,\
						 	webkitTextStrokeWidth: editorData.webkitTextStrokeWidth + \'px\'\
						 }">\
						<textarea :style="{\
							transformOrigin:\'0px 0px\',\
							transform: \'scale(\'+editorData.scaleX+\',\'+editorData.scaleY+\')\',\
							textAlign: editorData.textAlign || \'left\',\
							width: initSize.width + \'px\',\
							height: initSize.height + \'px\'\
						}"  v-model="editorData.content"\ v-show="editorData.focus"></textarea>\
						<div class="text-view"\
							 :style="{\
							 	transformOrigin:\'0px 0px\',\
							 	width: initSize.width + \'px\',\
							 	minHeight: initSize.height+  \'px\',\
								transform: \'scale(\'+editorData.scaleX+\',\'+editorData.scaleY+\')\',\
							}"\
							:class="{\'hide-text-view\':editorData.focus}" v-text="editorData.content"></div>\
					</div>\
					<div style="display: none">{{initSize.width}}</div>\
					</div>',
		props:{
			editorData:{
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
			},
			showBorder: {
				type: Boolean,
				default: true
			},
			currentEditor: {
				type: Object
			}
		},
		data () {
			return {
				longtouchTimeout: null,
				viewWidth:0,
				viewHeight:0,
				initSize: null
			}
		},
		computed: {
			showMask: function() {
				// return this.editorData !== this.currentEditor || !editorData.focus
			},
			
		},
		methods: {
			init: function () {
				this.getInitSize()
			},
			maxHeight: function () {
				return this.module.height	
			},
			getInitSize: function () {
				/**
				*	获取初始尺寸
				*/
				var data = this.editorData;
				this.initSize = {
						width: data.width / data.scaleX,
						height: data.height / data.scaleY
					}
			},
			select () {
				// console.log(this.moduleIndex)
				this.$emit('select', this.editorData, this.moduleIndex, this.editorIndex)
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
				// console.log('长按事件')
				// console.log()
				this.$emit('longtouch', this.editorIndex)
			},
			cancelLongtouch: function () {
	            clearTimeout(this.longtouchTimeout);
	        },
	        addEvent: function () {
	        	var vm = this
	        	var el = this.$el;
	        	var editorData = this.editorData
	        	var textarea = el.getElementsByTagName('textarea')[0]
	        	var textView = el.getElementsByClassName('text-view')[0]
	        	// console.log(el)
	        	var elEvents = new AlloyFinger(el, {
	        		longTap: this.longtouch,
	        		tap: this.select
	        	})

	        	// textarea.addEventListener('input', function (evt) {
	        	// 	vm.$nextTick(function () {
	        	// 		editorData.width =  textView.offsetWidth || editorData.defaultWidth
	        	// 		console.log(vm.editorData)
	        	// 		console.dir(textView)
	        	// 		console.dir(textView.offsetWidth)
	        	// 	})
	        		
	        	// })
	        },

	        // 设置文字外框的高度
	        setSize: function (fn) {
				var editorData = this.editorData
				var vm = this;
				var el = this.$el;
	        	var textView = el.getElementsByClassName('text-view')[0]
	        	var content = editorData.content;
	        	var app = document.getElementById('app')
	        	app.scrollTop = 0;
				this.$nextTick(function () {
					this.initSize.height = textView.offsetHeight
					
					editorData.height = this.initSize.height * editorData.scaleY;

					util.checkChange(editorData, this.module)
					this.changeScale()
					console.log('textView.offsetHeight='+textView.offsetHeight)
					// console.log(textView.offsetHeight)


					// editorData.width =  textView.offsetWidth * editorData.scaleX || editorData.defaultWidth;
					// console.log(111111111)
					// editorData.height = textView.offsetHeight * editorData.scaleY || editorData.defaultHeight * editorData.scaleY;
					// console.log(editorData.height)
					// vm.setTextareaSize()
					// editorData.height = height * editorData.scaleY
					// console.log(textView.offsetHeight)
					// console.log(window.innerWidth - editorData.left - editorData.width)
					// if(window.innerWidth - editorData.left - editorData.width<0){
					// 	editorData.content = content.substr(0, content.length - 1); 
					// }
					if(typeof fn === "function"){
						fn.call(vm)
					}

				})


	        },

	        // 设置文字形变大小
	        changeScale: function () {
	        	var editorData = this.editorData;
	        	// var el = this.$el;
	        	// var textView = el.getElementsByClassName('text-view')[0];
	        	// var scaleX, scaleY;
	        	// if(!editorData.content) return;

	        	this.$nextTick(function () {
	        		console.log(editorData.scaleY)
	        		editorData.scaleY = editorData.height / this.initSize.height || 0
	        		editorData.scaleX = editorData.width / this.initSize.width || 0
	        		console.log(editorData.scaleY)
	        	})

	        },
	        setTextareaSize: function () {
	        	var el = this.$el;
	        	var editorData = this.editorData
	        	var textView = el.getElementsByClassName('text-view')[0]

	        	this.viewWidth = textView.offsetWidth|| editorData.defaultWidth;
	        	this.viewHeight = textView.offsetHeight ||  editorData.defaultHeight;

	        },

			
			setTextAlign: function () {
				// console.log(this.editorData.textAlign)
				var align = this.editorData.textAlign
				if(align == 'left'){
					this.alignLeft()
				}

				if(align == 'center'){
					this.alignCenter()
				}

				if(align == 'right'){
					this.alignRight()
				}
			},

			alignCenter:function () {
				var winWidth = window.innerWidth;
				var width = this.editorData.width
				var left = (winWidth - width)/2

				this.setAlign(left)
			},
			alignLeft: function () {
				this.setAlign(0)
			},

			alignRight: function () {
				var winWidth = window.innerWidth;
				var width = this.editorData.width
				var left = (winWidth - width)
				this.setAlign(left)
			},
			setAlign: function (left) {
				console.log(left)
				this.editorData.left = left
			}
		},
		created: function () {
			this.init()
		},
		mounted: function () {
			
			var vm = this;

			this.$nextTick(function () {
				this.addEvent()
				this.setTextareaSize()
				// vm.setSize(function () {
				// 	vm.setTextAlign()
				// })
				
			})
		},
		watch: {
			'editorData.content': function (newVal, oldVal) {
				this.setSize()
				// var app = document.getElementById('app')
				// alert(app.scrollTop)
			},
			'editorData.lineHeight': function () {
				this.setSize()
			},
			'editorData.fontSize': function () {
				this.setSize()
			},
			'editorData.width': function () {
				this.changeScale()
			},
			'editorData.height': function () {
				this.changeScale()
			}
		}
		// watch: {
		// 	// currentEditor: function (val) {
		// 	// 	console.log(val)
		// 	// }
		// }
	}


	/*
		节点工具组件
	*/
	


	/**
	* 文字样式设置组件
	*/
	var textStyle = {
		components: {
			'color-picker': colorPicker
		},
		template: '<div class="m-text-style">\
				   <yd-layout>\
					<div :style="{\
						paddingTop: headTop,\
						backgroundColor: headTopColor\
					}" \
						slot="navbar">\
					<yd-navbar :title="title" \
						:bgcolor= "headStyle.bgColor" '+
						':color="headStyle.color" '+
					    ':fontsize="headStyle.title.fontSize">'+
					    ':style={""}'+
						'<div slot="left" :style="{color: headStyle.color, fontSize:headStyle.fontSize}" v-on:click="back">'+
							'<yd-navbar-back-icon :color="headStyle.color" v-on:touchstart="back">返回</yd-navbar-back-icon>'+
						'</div>'+	   	
					'</yd-navbar>\
					</div>\
					<div>\
						<div class="flex font-style">\
							<el-select v-model="currentStyle.fontFamily" placeholder="请选择">\
							    <el-option\
							      v-for="item in styles.fontFamily"\
							      :key="item"\
							      :label="item"\
							      :value="item"\
							      :disabled="item == \'设置字体\'">\
							    </el-option>\
							    \
							</el-select>\
							<el-select v-model="currentStyle.fontSize" placeholder="请选择">\
							    <el-option\
							      v-for="item in styles.fontSize"\
							      :key="item"\
							      :label="item"\
							      :value="item"\
							      :disabled="item == \'字体大小\'">\
							    </el-option>\
							</el-select>\
							<el-select v-model="currentStyle.letterSpacing" placeholder="请选择">\
							    <el-option\
							      v-for="item in styles.letterSpacing"\
							      :key="item"\
							      :label="item"\
							      :value="item"\
							      :disabled="item == \'字间距\'">\
							    </el-option>\
							</el-select>\
						</div>\
						<div class="text-content"\
							>\
							<span class="text" \
								:style="{\
										fontFamily: currentStyle.fontFamily,\
										fontSize: currentStyle.fontSize + \'px\',\
										letterSpacing: currentStyle.letterSpacing + \'px\',\
										color: currentStyle.color,\
										lineHeight:currentStyle.lineHeight,\
										textAlign: currentStyle.textAlign,\
										webkitTextStrokeColor: currentStyle.webkitTextStrokeColor,\
										webkitTextStrokeWidth: currentStyle.webkitTextStrokeWidth + \'px\'\
									}">\
								{{editor.content}}\
							</span>\
						</div>\
						<div class="paragraph-style flex">\
							<div class="f-color"\
								:class="{active: colorTarget == \'f-color\'}"\
								v-on:click="pickColorTarget(\'f-color\')">填色</div>\
							<div class="f-color"\
								:class="{active: colorTarget == \'b-color\'}"\
								v-on:click="pickColorTarget(\'b-color\')">描边</div>\
							<div class="t-align flex">\
								<div class="left" v-on:click="setTextAlign(\'left\')"><i class="iconfont icon-align-left"></i></div>\
								<div class="center" v-on:click="setTextAlign(\'center\')"><i class="iconfont icon-align-center"></i></div>\
								<div class="right" v-on:click="setTextAlign(\'right\')"><i class="iconfont icon-align-right"></i></div>\
							</div>\
							<div class="l-height">\
								行距\
								<span>{{currentStyle.lineHeight.toFixed(1)}}</span>\
							</div>\
							<div class="l-height-ctr" @click="setLineHeight(\'+\')">\
								+\
							</div>\
							<div class="l-height-ctr" @click="setLineHeight(\'-\')">\
								<span>-</span>\
							</div>\
							<!-- <div class="text-align"></div> -->\
						</div>\
						<div class="colors">\
							<div class="title">主题颜色</div>\
							<div class="colors-group main-colors flex">\
								<div class="color-item" \
									v-for="color in colors.mainColors"\
									:key="color"\
									:class="{white: color == \'#ffffff\'}"\
									:style="{\
										backgroundColor: color\
									}"\
									v-on:click="pickColor(color)"></div>\
							</div>\
							<div class="colors-group flex" \
								v-for="group in colors.otherColors">\
								<div class="color-item" \
									v-for="color in group"\
									:key="color"\
									:class="{white: color == \'#ffffff\'}"\
									:style="{\
										backgroundColor: color\
									}"\
									v-on:click="pickColor(color)"></div>\
							</div>\
							<div class="title">标准颜色</div>\
							<div class="colors-group main-colors flex">\
								<div class="color-item" \
									v-for="color in colors.standardColors"\
									:key="color"\
									:class="{white: color == \'#ffffff\'}"\
									:style="{\
										backgroundColor: color\
									}"\
									v-on:click="pickColor(color)"></div>\
							</div>\
							<div class="all-colors">\
								<div class="flex">\
									<div class="icon" v-on:click="openColorPicker">\
										<img src="../../content/images/color_pcketor.png">\
									</div>\
									<div class="text" v-on:click="openColorPicker">更多颜色</div>\
									<div class="right">\
										<yd-button type="primary" v-on:click.native="saveStyle()">完成编辑</yd-button>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					</yd-layout>\
					<transition name="slide-left">\
						<color-picker\
						v-if="showColorPicker"\
						v-on:change="changeColor"></color-picker>\
					</transition>\
				</div>',

		data: function () {
			var textStyle = new TextStyleData()
			// console.log(golbal)
			var headStyle = golbal.headStyle
			console.log(headStyle)
			return {
				title:'应用',
				headStyle:headStyle,
				headTop:golbal.headTop,
				headTopColor:golbal.headTopColor,
				styles:{
					fontFamily:textStyle.fontFamily,
					fontSize:textStyle.fontSize,
					letterSpacing: textStyle.letterSpacing
				},
				colors:{
					mainColors: textStyle.mainColors,
					otherColors: textStyle.otherColors,
					standardColors: textStyle.standardColors
				},
				currentStyle: {
					fontFamily:'微软雅黑',
					fontSize: 50,
					letterSpacing:0,
					color:'#00000',
					textAlign: 'left',
					lineHeight: 1,
					webkitTextStrokeColor:'transparent',
					webkitTextStrokeWidth:0
				},
				colorTarget:'f-color',
				editor: null,
				showColorPicker: false
			}
		},
		props: {
			editorData: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		computed: {
			// ...mapGetters({
			// 	editData: 'getEditData'
				
			// })
		},
		methods: {
			init: function() {
				

				// console.log(this.headStyle)
				var  editorData = this.editorData;
				var  currentStyle = this.currentStyle
				var  editor = this.editor = editorData.editModules[editorData.moduleIndex].editors[editorData.editorIndex];
				for(var key in currentStyle){
					currentStyle[key] = editor[key]
				}

				console.log(this.editorData)



			},
			// ...mapMutations({
			// 	setEditData: 'setEditData'
			// }),
			setTextAlign: function (align) {
				this.currentStyle.textAlign = align
				// this.$emit('set-text-align', align)
			},
			setLineHeight: function (type) {
				// console.log(evt)
				// evt.preventDefault()
				// console.log(this.currentStyle.lineHeight + evt.deltaY/100) * 10
				// var lineHeight = (this.currentStyle.lineHeight + evt.deltaY/100) * 100
				// console.log(lineHeight)
				// this.currentStyle.lineHeight =parseInt(lineHeight) / 100
				if(type === '+'){
					this.currentStyle.lineHeight = this.currentStyle.lineHeight + 0.1
				}else {
					this.currentStyle.lineHeight = this.currentStyle.lineHeight - 0.1
				}
				// this.currentStyle.lineHeight += evt.deltaY/100
			},
			pickColor: function(color) {
				var  MAP = {
					'f-color': 'color',
					'b-color': 'webkitTextStrokeColor'
				}
				console.log(color)
				this.currentStyle[MAP[this.colorTarget]] = color

				// const dom = document.getElementsByClassName('text-content')[0];
				// console.dir(dom)
			},
			pickColorTarget: function(target){
				this.colorTarget = target;
			},
			back: function () {
				if(this.showColorPicker){
					this.closeColorPicker()
					return;
				}
				this.$emit('close')
			},
			confirm: function () {
				this.$emit('confirm')
			},
			openColorPicker: function () {
				// 打开拾色器
				this.showColorPicker= true;
				// this.$router.push({name:'color_picker'})
			},
			closeColorPicker: function () {
				this.showColorPicker= false;
			},
			changeColor: function (color) {
				console.log(color)
				if(color){
					this.pickColor(color)
				}
				
				this.closeColorPicker()
			},
			saveStyle: function () {
				// console.log(222)
				const editor = this.editor;
				const currentStyle = this.currentStyle;
				for(let key in currentStyle){
					 editor[key] = currentStyle[key] 
				}
				this.$emit('savestyle', editor)
				// this.$router.push({name: 'new_user_panel'})
			}
		},
		created: function() {
			this.init()

			// console.log(this.global)
		}
	}

	// console.log(textContainer)

	var change = new Change()

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
	},
		BORDERRADIUSMAP = {
			'corner1':'borderTopLeftRadius',
			'corner2':'borderTopRightRadius',
			'corner3':'borderBottomLeftRadius',
			'corner4':'borderBottomRightRadius'
		}

	/**
	*	编辑器模板
	*/
	Vue.component('v-edit',{
		template: '<div class="m-edit">\
					<div id="wrapper"  v-alloytouch="{options: alloyTouchData.options, methods:{ initAlloyTouch: initAlloyTouch, animationEnd: animationEnd}, min: alloyTouchData.min, max: alloyTouchData.max}">\
					<div id="J_detail_content">\
						<div class="edit-module" \
							v-for="(module, cmoduleIndex) in editModules" \
							:id="\'module_\'+ cmoduleIndex "\
							:style="{\
								height: module.height + \'px\',\
								width: module.width,\
								border:moduleIndex === cmoduleIndex ? \'1px dashed #ccc\' : \'none\'\
							}"\
							v-finger:tap="selectModule.bind(this,module, cmoduleIndex)"\
							>\
							<!-- \
								编辑器模块组件，文本编辑器和图片编辑器\
								\
							 -->\
							<components v-for="(editor, editorIndex) in module.editors"\
										ref="editor"\
										:is="editor.componentName"\
										v-on:select="select"\
										v-on:longtouch="longtouch"\
										v-on:open-menu="openImgMenu"\
										:showBorder="showBorder"\
										:key="editorIndex"\
										:editorData="editor"\
										:module="module"\
										:focusWrapData="focusWrapData"\
										:currentEditor="currentEditor"\
										:moduleIndex="cmoduleIndex"\
										:editorIndex="editorIndex">\
							</components>\
							<div class="module-scale"\
								 v-if="moduleIndex === cmoduleIndex && currentType === \'module\'"\
								 v-finger:press-move="changeModuleHeight">\
								 =\
							</div>\
						</div>\
						<edit-focus-wrap \
						 v-show="currentEditor !== null"\
						 :options="options"\
						 :focus-wrap-data="focusWrapData"\
						 :focus-wrap-editor="focusWrapEditor"\
						 :focus-wrap-top="focusWrapTop"\
						 v-on:move="change"\
						 v-on:edit="edit"\
						 v-on:rotate="rotate"\
						 v-on:longtouch-mask="longtouch"\
						 >\
						</edit-focus-wrap>\
					</div>\
					</div>\
					<div class="module-editor-tools"\
						 v-if="showModuleEditorTools"\
						 :style="{\
							top:moduleToolsBarPositions.top + \'px\',\
							left:moduleToolsBarPositions.left + \'px\'\
						 }">\
						<div v-for="item in moduleToolsBar"\
							 class="bar-item"\
							 v-on:click="moduleEvent(item)">\
							<span v-text="item.name"></span>\
						</div>\
					</div>\
					<transition name="slide-left">\
						<text-style \
							v-if="showTextStyle" \
							:editorData=\'editorData\'\
							v-on:close="closeTopWin"\
							v-on:savestyle="confirmTextStyle"\
							v-on:set-text-align="setTextAlign"\
							></text-style>\
					</transition>\
					<transition name="slide-left">\
						<img-style \
							v-if="showImgStyle" \
							:editorData=\'editorData\'\
							v-on:close="closeTopWin"\
							v-on:savestyle="confirmTextStyle"\
							></img-style>\
					</transition>\
					<transition name="slide-left">\
						<function-bar v-if="showFunctionBar"\
							:editorData=\'editorData\'\
							v-on:close="closeTopWin"\
							v-on:choice="addModule"\
							></function-bar>\
					</transition>\
					<transition name="slide-left">\
						<select-img v-if="showSelectImg"\
							:module="currentMudule"\
							:editorData=\'focusWrapEditor\'\
							v-on:close="closeTopWin"\
							></select-img>\
					</transition>\
					<transition name="slide-left">\
						<select-video v-if="showSelectVideo"\
							:editorData=\'focusWrapEditor\'\
							v-on:close="closeTopWin"\
							></select-video>\
					</transition>\
					\
				</div>',
		components: {
			'text-container': textContainer,
			'edit-focus-wrap': editFocusWrap,
			'img-container': imgContainer,
			'text-style': textStyle,
			'img-style': imgStyle,
			'function-bar': functionBar,
			'select-img': selectImg,
			'color-picker': colorPicker,
			'select-video': selectVideo
		},
		props:{
			editorData:{
				type: Object,
				default:function () {
					return {}
				}
			},
			winWidth: {
				type: Number,
				default:0
			}
		},
		data() {
			// console.log(colorPicker)
			return {
				showBorder:true,
				showTextStyle: false,
				showImgStyle:false,
				showFunctionBar: false,
				showSelectImg: false,
				showSelectVideo: false,
				showModuleEditorTools:false,
				moduleEditorToolsPosition:{
					left:0,
					top:0,
				},
				// currentMudule: null, // 当前选中的模块
				// currentEditor: null, // 当前选中的编辑器
				currentType:'',	 // 当前选择模块的类型 是模块 还是 编辑器
				moduleIndex: -1, // 当前模块的序号
				editorIndex: -1, // 当前编辑器在模块中的序号
				// 编辑器数据
				// editModules: null,
				// 节点工具框参数
				options: {
					type:'text',
					left:20,
					top:20,
					width:30,
					height:200,
					move: false,
					wordEdit:false,
					model:2,
					rotate:0,
					locked: false,
				},
				focusWrapData:null,
				clipboard:null,
				alloyTouchData: {
					options: {
						touch: "",
						target:"#scroller",
						prototype: 'translateY'
					},
					max: 0,
					min: -2000,
					handleAlloyTouch: null
				},
				handleAlloyTouch: null,
				translateY:0,
				radius: {
					width:0,
					x:0,
					y:0
				},
				rotateDeg:0,
				moduleToolsBar:[
					{
						type: 'delete',
						name: '删除'
					},
					{
						type:'function',
						name: '功能',
					},
					{
						type:'paste',
						name: '粘贴'
					},
					{
						type: 'cancle',
						name:'取消'
					}
				],
				winHeight:0
				
			}
		},
		computed: {
			editModules: function () {
				// 编辑器数据
				return this.editorData.editModules
			},
			currentMudule: function(){
				// 当前选中模块
				return this.editModules[this.moduleIndex];
			},
			currentEditor: function (argument) {
				// 当前选中编辑器
				// console.log(this.currentMudule)
				if(!this.currentMudule || this.editorIndex == -1){
					return null
				}else{
					return this.currentMudule.editors[this.editorIndex]
				}
				// return this.currentMudule ? this.editorIndex > -1 this.currentMudule.editors[this.editorIndex] : null
			},
			moduleTop: function () {
				// 选中模块模块距离顶部的高度
				let top = 0;
				const index = this.moduleIndex;
				const editModules = this.editModules

				for( let i = 0; i < this.moduleIndex; i++){
					top += parseInt(editModules[i].height)
				}

				return top;
			},

			focusWrapEditor: function () {
				// 当前焦点的模块
				var obj = this.currentType === 'module' ?
						this.currentMudule:
						this.currentEditor
				return obj || {};
			},

			focusWrapTop: function () {
				var top = this.currentEditor ? this.currentEditor.top : 0
				return this.currentType === 'module' ?
						this.moduleTop :
						this.moduleTop + top
			},
			maxRadiuwidth: function() {
				var w = this.currentEditor.width,
				    h = this.currentEditor.height;
				    return w > h ? h / 2 : w / 2
			},
			moduleToolsBarPositions: function () {
				console.log(this.moduleEditorToolsPosition)
				var obj = this.moduleEditorToolsPosition
				var bar = this.moduleToolsBar
				var left = obj.left;
				var winWidth =golbal.width
				var width = this.moduleToolsBar.length * 55;
				if(left + width > winWidth){
					left = winWidth - width
				}
				console.log(this.winWidth)
				return {
					top: obj.top,
					left: left
				}
			}
		},

		methods: {
			init () {
				// this.winWidth = util.size().width
				// console.log('------------------------------------')
				// console.log(this.editorData)
				this.winHeight = window.innerHeight
				// console.log(window.innerHeight)
				var editorData = this.editorData
				// this.editModules = editorData.editModules;
				// console.log(editorData)
				if(editorData.moduleIndex >= 0 ){
					this.currentMudule = this.editModules[editorData.moduleIndex]
					this.moduleIndex = editorData.moduleIndex
					this.selectModule(this.currentMudule, this.moduleIndex)
				}
				this.formateEditModulesData()
				this.initFocusWrapData()
				this.initAlloyTouchData()
			},
			initAlloyTouch(handle){
                // console.log(handle)
               
                this.handleAlloyTouch = handle
               
            },
            animationEnd: function () {
            	this.translateY = this.handleAlloyTouch.target.matrix3d.elements[13]
            	// console.log()	
            },
            initAlloyTouchData: function () {
            	 var vm = this;

            	 this.$nextTick(function () {
            	 	var target = document.getElementById('wrapper')
            	 	var min = -target.offsetHeight + window.innerHeight - 140
					vm.alloyTouchData.min = min > 0 ? 0 : min

					console.log(vm.alloyTouchData.min)
				})
            },
			hideShowBorder: function () {
				this.showBorder = false;
				this.cancleSelect()
			},
			cancleSelect() {
				this.moduleIndex= -1 // 当前模块的序号
				this.editorIndex= -1
			},
			formateEditModulesData: function () {
				var editModules = this.editModules
				editModules.forEach(function (module) {
					// console.log(module)
					module.editors.forEach(function (editor) {
						// console.log(editor.width)
						if(typeof editor.defaultWidth === 'string'){
							editor.defaultWidth =  window.innerWidth * parseInt(editor.width) / 100
						}
						if(typeof editor.width === 'string'){
							editor.width = window.innerWidth * parseInt(editor.width) / 100

						}
						if(typeof editor.left === 'string'){
							// console.log(editor.left)
							editor.left = window.innerWidth * parseInt(editor.left) / 100
						}
					})
				})
			},
			test () {
				// console.log(11)
			},
			initFocusWrapData: function () {
				this.focusWrapData = {
					model: 1,
					showTools: false,
					showRotate: false,
					showAlignTools: false
				}

			},
			isSelect: function (editor, event) {
				var w = editor.width, 
					h = editor.height,
					x = event.offsetX,
					y = event.offsetY,

					t = 30
				// console.log(editor === this.currentEditor)
				if(editor !== this.currentEditor){
					return true
				}
				if((x < t && (y < t || h - y < t)) || (w - x < t && (y < t ||  h - y < t))){
					return false
				}

				return true

			},
			select(editor, moduleIndex, editorIndex, event){
				// 选择编辑区域
				// if(this.showSelectImg) return;
				// 选中的是编辑器
				this.showModuleEditorTools = false;
				if(editorIndex > -1){
					console.log(editorIndex)
					if(this.moduleIndex == moduleIndex && this.editorIndex === editorIndex){
							// 如果选中的是当编已经选中的编辑器，
							if(this.currentEditor && this.currentEditor.type === 'text' && this.currentEditor.focus){
								return
							}
							this.changeOptionsModel()
							this.focusWrapData.showTools = false;
							return
							
					}else{
						// 如果选中的是当前未选中的编辑器， 则切换已选中的编辑器
						if(this.currentEditor && this.currentEditor.type === 'text'){
							this.currentEditor.focus = false
						}
						this.moduleIndex = moduleIndex;
						this.editorIndex = editorIndex;
						this.currentType = 'editor';
						this.initBordius()
						// 初始化焦点数据
						this.initFocusWrapData()
					}
				}else{
				// 选择模块
				// console.log(2)
					if(this.currentEditor && this.currentEditor.type === 'text'){
						this.currentEditor.focus = false
					}
					if(this.moduleIndex == moduleIndex && this.editorIndex == -1){
						// 如果选中的是当编已经选中的木块，则失去焦点
						this.moduleIndex = -1;
						this.currentType = '';
					}else {
						// 切换模块
						this.editorIndex = -1
						this.moduleIndex = moduleIndex;
						this.currentType = 'module'
						console.log(this.editorIndex)
					}

				}

				return;

			},

			selectModule(module, index, evt){
				// 选择模块
				// return
				// console.log(evt.target.className)
				if(evt.target.className === 'edit-module'){
					this.select(null, index, -1)
				}
				
			},


			setOptions(data) {
				// 设置节点工具框参数
				// console.log(data)
				for(let k in data){
					this.options[k] = data[k]
				}
				// this.options = data
			},

			changeOptionsModel () {
				// 选择编辑框类型
				// 1 白点， 2 黑点
				// console.log(1111)
				this.focusWrapData.model = this.focusWrapData.model === 1 ? 2 : 1;
				
				// this.initOptions()
			},


			// longtouchFocusCorners: function (evt) {
			// 	// 长按节点
			// 	console.log(this.currentEditor)
				
			// },
			initOptions () {
				// 初始化编辑框按钮
				this.options.move = false;
				this.options.wordEdit = false;
				// this.options.model = 1
			},
			change(evt,type){
				// 移动、改变编辑框大小
				// console.log(this.currentMudule)
				if(this.currentType === 'editor'){
					change.change(evt, type, this.currentEditor, this.currentMudule, this.moduleTop)
					this.setBorderRadius()
				}else if(this.currentType === 'module') {
					if(type === 'bottom'){
						change.change(evt, 'bottom', this.currentMudule, this.currentMudule, this.moduleTop)
						this.initAlloyTouchData()
					}
				}
				
				
			},


			rotate: function (evt, type) {
				// console.log(evt.changedTouches[0].clientX)
				// console.log(evt.changedTouches[0].clientY)
				// console.log(this.focusWrapTop)
				// console.log( this.handleAlloyTouch)
				
				// console.log(this.handleAlloyTouch.target.matrix3d.elements[13])
				// 旋转
				// change.rotate(evt, )
				// console.log(this.$refs)
				// 编辑器距离屏幕的高度
				console.log(this.handleAlloyTouch)
				var focusTop = this.focusWrapTop + 60 + this.handleAlloyTouch.target.matrix3d.elements[13],
				    focusLeft = this.currentEditor.left,
				    cx = focusLeft + this.currentEditor.width/2,
				    cy = focusTop + this.currentEditor.height/2,
				    px = evt.changedTouches[0].clientX,
				    py = evt.changedTouches[0].clientY;
				// var deltaDeg =
				var rotateDeg,deltaDeg
				if(type === 'start'){
					this.rotateDeg =   getAngle(cx, cy, px, py);
				}else if(type === 'rotate'){
					rotateDeg = getAngle(cx, cy, px, py);
					deltaDeg = rotateDeg - this.rotateDeg;
					this.rotateDeg = rotateDeg;
					this.currentEditor.rotate += -deltaDeg;
				}
				

				// console.log(cx,cy,px,py)
				// console.log(getAngle(cx, cy, px, py))
			},

			changeModuleHeight(evt){
				console.log(evt)
				evt.stopPropagation()
				evt.preventDefault()
				this.focusWrapData.model = 2;
				this.change(evt, 'bottom')
			},

			edit(type) {
				// console.log(type)
				if(type === 'setBorderRadius'){
					// console.log(arguments)
					this.changeBorderRadius(arguments[1])
				}else if(this.currentType=='editor'){
					this.focusWrapData.showTools = false;
					this[EVENTMAP[type]]()
				}

			},

			// 复制

			copy: function () {
				// 复制
				console.log(this.currentEditor)
				var obj = {}
				var editor = this.currentEditor
				for(var key in editor){
					obj[key] = editor[key]
				}
				this.clipboard = obj

				console.log(this)

			},

			paste: function () {
				// 粘贴
				var editor = this.currentEditor;
				var module = this.currentMudule;
				var paste = this.clipboard;
				console.log(module)
				if(paste == null) {
					return
				}
				console.log(editor)
				if(editor){
					for(var key in paste) {
						if(key != 'left' && key != 'top'){
							editor[key] = paste[key]
						}
						
					}
				}else if(module !=null){
					this.pasteModule()
					
					// console.log(this.moduleEditorToolsPosition)

				}
				
				this.setOptions(paste)
			},
			pasteModule: function () {
				console.log(this.focusWrapTop)
				console.log(this.translateY)
				console.log(this.focusWrapTop + this.translateY)
				var paste = this.clipboard;
				var module = this.currentMudule;
				var position = this.moduleEditorToolsPosition;
				console.log(this.currentMudule)
				var obj = {};
				for(var key in paste){
					obj[key] = paste[key];
					
				}
				obj.top = position.top - (this.focusWrapTop + this.translateY);
				obj.left = position.left
				// obj.textAlign = ''
				util.checkChange(obj, module)
				module.editors.push(obj)
			},

			lock: function () {
				// 锁定	// 
				console.log(this.currentEditor)
				this.currentEditor.locked = true;
			},
			unlock: function () {
				this.currentEditor.locked = false;
			},
			alignCenter:function () {
				var winWidth = window.innerWidth;
				var width = this.currentEditor.width
				var left = (winWidth - width)/2

				this.setAlign(left)
			},
			alignLeft: function () {
				this.setAlign(0)
			},

			alignRight: function () {
				var winWidth = window.innerWidth;
				var width = this.currentEditor.width
				var left = (winWidth - width)
				this.setAlign(left)
			},
			setAlign: function (left) {
				this.currentEditor.left = left
			},
			setTextAlign: function (align) {
				if(align == 'left'){
					this.alignLeft()
				}

				if(align == 'center'){
					this.alignCenter()
				}

				if(align == 'right'){
					this.alignRight()
				}
			},
			setStyle: function(argument){
				// 打开文字样式编辑器

				this.editorData.moduleIndex = this.moduleIndex
				this.editorData.editorIndex = this.editorIndex
				this.showTextStyle = true;

			},
			setColor:function () {
				// 打开图片颜色设置
				this.editorData.moduleIndex = this.moduleIndex
				this.editorData.editorIndex = this.editorIndex
				this.showImgStyle = true;
			},



			closeTopWin: function () {
				// closeTopWin: function () {
				// 关闭样式编辑器

				this.showTextStyle = false;
				this.showImgStyle = false;
				this.showFunctionBar = false;
				this.showSelectImg = false;
				this.showSelectVideo = false;

			},

			confirmTextStyle: function (data) {
				// 完成样式编辑器
				var editor = this.currentEditor
				// console.log(data)
				if(editor.type == 'img'){
					editor.src=""
				}
				// var myCanvas = new util.MyCanvas(editor)
	   //      	myCanvas.draw()
				for(var key in data){
					editor[key] = data[key]
				}
				this.closeTopWin()
			},

			remove(type) {
				// 删除模块
				if(type === 'module'){

				}else {
					// console.log(this.moduleIndex,this.editorIndex)
					this.currentMudule.editors.splice(this.editorIndex, 1);
					this.editorIndex = -1
					this.currentType = 'module'
					// this.currentMudule = null;

				}
				
			},
			openImgMenu: function () {
				console.log('打开功能菜单')
				// console.log(this.focusWrapData.showTools)
				this.focusWrapData.showTools = true;
				// 打开图片功能菜单
			},
			selectImg: function () {
				this.currentEditor.type = 'img';
				this.showSelectImg = true;
			},
			selectVideo: function () {
				// this.currentEditor.type = 'video';
				this.showSelectVideo = true;
			},
			initBordius: function() {
				// 根据当前选择的编辑器初始化圆角数据
				if(!this.currentEditor) return;
				var radius = this.radius
				if(this.currentEditor.type == 'text'){
					radius.width = radius.x = radius.y = 0
				} else {
					radius.width = radius.x = radius.y = this.currentEditor.borderRadiusWidth
				}
				
				
			},
			changeBorderRadius: function (evt) {
				// 改变圆角大小
				// console.log(evt)
				var max = this.maxRadiuwidth
				var type = evt.target.dataset.type,
				x,
				w,
				h,
				radius = this.radius,
				editor = this.currentEditor;
				console.log(radius)
				w = this.currentEditor.width;
				h = this.currentEditor.height;
				console.log(type)
				// console.log(evt.colorTarget)
				if(type == 'corner1'){
					this.radius.x += evt.deltaX;
					this.radius.y += evt.deltaY;
				}

				if( type == 'corner2'){
					this.radius.x += - evt.deltaX;
					this.radius.y += evt.deltaY;
				}

				if( type == 'corner3'){
					this.radius.x += evt.deltaX;
					this.radius.y += - evt.deltaY;
				}

				if( type == 'corner4'){
					this.radius.x += - evt.deltaX;
					this.radius.y += - evt.deltaY;
				}
				// this.radius.x = this.radius.x > w/2 ? w/2 : this.radius.x
				// this.radiusy = this.radiusy > h/2 ? h/2 : this.radiusy
				// var radius
				// var radius = x > y ? x : y
				// var max = this.maxRadiuwidth
				if(this.radius.x < this.radius.y ){
					this.radius.x = this.radius.x > max ? max : this.radius.x
					radius.width = this.radius.x > 0 ? this.radius.x : 0
					// radius = radius > w/2 ? w/2 : radius
				}else {
					this.radius.y = this.radius.y > max ? max : this.radius.y
					radius.width = this.radius.y > 0 ? this.radius.y : 0
					// radius = radius > h/2 ? h/2 : radius
				}

				(radius.x < 0) && (radius.x = 0);
				(radius.y < 0) && (radius.y = 0)


				this.setBorderRadius()


				/*var editor = this.focusWrapEditor

				for(var dir in BORDERRADIUSMAP){
					editor[BORDERRADIUSMAP[dir] + '_w'] = radius.width;
					editor[BORDERRADIUSMAP[dir] + '_h'] = radius.width;
				}
				return 
				var editor = this.focusWrapEditor
				if(editor.type == 'text') return;
				
				var radius = editor.borderTopLeftRadius_w;

				// radius = radius ? 0 : 20;

				for(var dir in BORDERRADIUSMAP){
					editor[BORDERRADIUSMAP[dir] + '_w'] = radius;
					editor[BORDERRADIUSMAP[dir] + '_h'] = radius
				}
*/

			},

			// 设置圆角大小
			setBorderRadius: function(){
				var editor = this.focusWrapEditor
				var w = this.radius.width;
				var max = this.maxRadiuwidth;
				var bw = editor.borderRadiusWidth
				console.log(max)
				w = w > max ? max : w; 
				
				for(var dir in BORDERRADIUSMAP){
					if(editor[BORDERRADIUSMAP[dir] + '_w'] == bw &&  editor[BORDERRADIUSMAP[dir] + '_h']== bw){
						editor[BORDERRADIUSMAP[dir] + '_w'] = w ;
						editor[BORDERRADIUSMAP[dir] + '_h'] = w;
					}
					// editor[BORDERRADIUSMAP[dir] + '_w'] = w ;
					// editor[BORDERRADIUSMAP[dir] + '_h'] = w;
				}
				editor.borderRadiusWidth = w;

			},

			longtouch(editorIndex){
				// 长按函数
				console.log(editorIndex)
				if(editorIndex === this.editorIndex){
					

					if(this.focusWrapData.model === 1 && this.currentEditor.locked == false){
						// 选择的是当前模板。白点状态并且不锁定的情况下长按获得焦点可以修改文字
						this.currentEditor.focus = true
						// this.focusWrapData.showTools = !this.focusWrapData.showTools

					}else if(this.focusWrapData.model === 2){
						
						// this.focusWrapData.showAlignTools = true;
					}
				}
				
				this.focusWrapData.showTools = true;
				
				
				// console.log(this.options)
			},
			openFunctionBar: function () {
				// 打开功能菜单
				// console.log('打开功能栏目')
				this.showFunctionBar = true
			},

			addModule: function (item) {
				// 添加模块
				this.closeTopWin()
				// console.log(item)

				addTo.add(item, this.moduleIndex, this.editorIndex, this.editModules)
				this.moduleIndex = addTo.moduleIndex;
				this.editorIndex = addTo.editorIndex;
				if(this.editorIndex > -1){
					this.currentType='editor'
				}

				// console.log(addTo)
				// console.log(this.currentEditor)
				// console.log(this.currentType)
				this.formateEditModulesData()
				this.initFocusWrapData()
				this.initBordius()
				// 添加模块

				
				this.initAlloyTouchData()
				this.handleAlloyTouch.to(-this.moduleTop + 60)
				
			},
			addEvent: function () {
				var vm = this
				var app = document.getElementById('app')
				// app.addEventListener('touchmove', function (evt) {
				// 	evt.preventDefault()
				// 	// evt.stopPropagation()
				// 	// // console.log(evt)
				// })
				var appEvent = new AlloyFinger(app, {
					singleTap: function (evt) {
						// console.log(evt.target == app)
						if(evt.target == app){
							vm.moduleIndex = -1;
							vm.editorIndex = -1;
							vm.initFocusWrapData()
						}
					}
				})



				// 模块长按事件
				var detailContent = document.getElementById('J_detail_content');
				var detailContentEvent = new AlloyFinger(detailContent, {
					longTap:function (evt) {
						console.log(evt.target)
						if( evt.target.className == 'edit-module'){
							var moduleIndex = parseInt(evt.target.id.match(/_(\d+)$/)[1])
							if(moduleIndex != vm.moduleIndex || vm.editorIndex != -1){
								console.log(moduleIndex)
								vm.select(null,moduleIndex, -1, evt )
							}
							vm.showModuleEditorTools = true
							console.log(evt)
							vm.moduleEditorToolsPosition={
								top:evt.changedTouches[0].clientY,
								left:evt.changedTouches[0].clientX
							}
						}
						


						console.log(evt.target.id)
						console.log(vm.moduleIndex)
						// if(vm.currentType == 'module' && evt.target.id == 'module_' + vm.moduleIndex){
						// 	vm.showModuleEditorTools = true
						// 	console.log(evt.changedTouches[0])
						// 	vm.moduleEditorToolsPosition={
						// 		top:evt.changedTouches[0].clientY,
						// 		left:evt.changedTouches[0].clientX
						// 	}
						// }
					},
				})


				window.onresize= function () {
					// alert(window.innerHeight)
					vm.initAlloyTouchData()
					// var winHeight = window.innerHeight;
					// var translateY = vm.translateY + (winHeight - vm.winHeight)
					// translateY = translateY > vm.alloyTouchData.max ? vm.alloyTouchData.max : translateY;
					// translateY = translateY < 
					vm.handleAlloyTouch.to(-vm.focusWrapTop+10)
					// vm.winHeight = winHeight;
					// console.log(vm.handleAlloyTouch.target.matrix3d.elements[13])
				}
				
			},
			moduleEvent: function (item) {
				if(item.type === 'delete'){
					console.log(this.editorData)
					this.editorData.editModules.splice(this.moduleIndex, 1)
					// this.moduleIndex = -1;
					if(!this.currentMudule && this.moduleIndex != -1){
						this.moduleIndex --
						// this.handleAlloyTouch.to(-this.moduleTop + 60)
					}
					this.initAlloyTouchData();
					this.handleAlloyTouch.to(-this.moduleTop)
				}

				if(item.type === 'function'){
					this.openFunctionBar()
				}

				if(item.type === 'paste'){
					this.paste()
				}

				this.showModuleEditorTools = false;
			}

		},

		watch: {

			focusWrapEditor: function (val) {
				// console.log(val)

			}
		},

		created(){
			this.init();
			// 获取设备宽度
			
			// console.log(this.winWidth)
			// console.log(this)
		},
		mounted: function () {
			var vm = this
			this.$nextTick(function () {
				vm.addEvent()
			})
		}
	})




	function Editor() {
		
	}

	return new Editor()
})