(function (root, factory) {
	root.imgStyle = factory(root)
})(this, function (root) {
	var ImgStyleData = function () {
		this.init()
	}
	ImgStyleData.prototype = {
		constructor: ImgStyleData,

		init: function () {

			// this.setFontFamily()
			// this.setFontSize()
			// this.setLetterSpacing()
			this.setMainColors()
			this.setOtherColors()
			this.setStandardColors()
		},

		// setFontFamily: function ( arr ) {
		// 	arr = arr || ['微软雅黑']
		// 	var fontFamily = this.fontFamily = ['设置字体']
		// 	fontFamily.push.apply(fontFamily, arr)
		// },

		// setFontSize: function ( n ) {
		// 	n = n || 50
		// 	var fontSize = this.fontSize = ['字体大小']

		// 	for(let i = 12; i < n; i++){
		// 		fontSize.push(i)
		// 	}
		// },

		// setLetterSpacing: function ( n ){
		// 	n = n || 30;
		// 	var letterSpacing = this.letterSpacing = ['字间距']

		// 	for(let i = 0; i < n; i++){
		// 		letterSpacing.push(i)
		// 	}
		// },

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


	return {
		components: {
			'color-picker': colorPicker
		},
		template: '<div class="m-img-style"> '+
					' <yd-layout>\
					<div :style="{\
						paddingTop: headTop,\
						backgroundColor: headTopColor\
					}" slot="navbar">'+
					'<yd-navbar :title="title" '+
						':bgcolor= "headStyle.bgColor" '+
						':color="headStyle.color" '+
					    ':fontsize="headStyle.title.fontSize">'+
					    ':style={""}'+
						'<div slot="left" :style="{color: headStyle.color, fontSize:headStyle.fontSize}" v-on:click="back">'+
							'<yd-navbar-back-icon :color="headStyle.color">返回</yd-navbar-back-icon>'+
						'</div>'+	   	
					'</yd-navbar></div>'+
						'<div class="show-style"\
							:style="{\
								backgroundColor: currentStyle.backgroundColor,\
								borderStyle: currentStyle.borderStyle,\
								borderColor: currentStyle.borderColor,\
								borderWidth: currentStyle.borderWidth + \'px\'\
							}"\
							>\
							显示着色效果\
						</div>\
						<div class="paragraph-style flex">\
							<div class="f-color"\
								:class="{active: colorTarget == \'bg-color\'}"\
								v-on:click="pickColorTarget(\'bg-color\')">填色</div>\
							<div class="b-color"\
								:class="{active: colorTarget == \'b-color\'}"\
								v-on:click="pickColorTarget(\'b-color\')">描边</div>\
							<div class="b-color2"\
								:class="{active: colorTarget == \'hide-border\'}"\
								v-on:click="hideBorder">描边</div>\
							<div class="b-width"><i class="iconfont icon-scale"></i></div>\
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
					</yd-layout>\
					<transition name="slide-left">\
						<color-picker\
						v-if="showColorPicker"\
						v-on:change="changeColor"></color-picker>\
					</transition>\
				</div>',

		data: function () {
			var imgStyleData = new ImgStyleData()
			// console.log(golbal)
			var headStyle = golbal.headStyle
			console.log(imgStyleData)
			return {
				title:'应用',
				headStyle:headStyle,
				headTop:golbal.headTop,
				headTopColor:golbal.headTopColor,
				styles:{
					// fontFamily:textStyle.fontFamily,
					// fontSize:textStyle.fontSize,
					// letterSpacing: textStyle.letterSpacing
				},
				colors:{
					mainColors: imgStyleData.mainColors,
					otherColors: imgStyleData.otherColors,
					standardColors: imgStyleData.standardColors
				},
				currentStyle: {
					backgroundColor:'transparent',
					borderStyle: 'solid',
					borderWidth: 0,
					borderColor: 'transparent'
					// border:'0px solid transparent'
					// fontFamily:'微软雅黑',
					// fontSize: 50,
					// letterSpacing:0,
					// color:'#00000',
					// textAlign: 'left',
					// webkitTextStrokeColor:'transparent',
					// webkitTextStrokeWidth:0
				},
				colorTarget:'bg-color',
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
				console.log(editorData)
				var  editor = this.editor = editorData.editModules[editorData.moduleIndex].editors[editorData.editorIndex];
				for(var key in currentStyle){
					currentStyle[key] = editor[key]
				}



			},
			// ...mapMutations({
			// 	setEditData: 'setEditData'
			// }),
			// setTextAlign: function (align) {
			// 	this.currentStyle.textAlign = align
			// },
			pickColor: function(color) {
				const MAP = {
					'bg-color': 'backgroundColor',
					'b-color': 'borderColor'
				}
				console.log(color)
				this.currentStyle[MAP[this.colorTarget]] = color

				// const dom = document.getElementsByClassName('text-content')[0];
				// console.dir(dom)
			},
			pickColorTarget: function(target){
				if(target == 'b-color'){
					this.currentStyle.borderWidth = 1
				}
				this.colorTarget = target;
			},
			hideBorder: function () {
				this.colorTarget = 'hide-border'
				this.currentStyle.borderWidth = 0
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
})