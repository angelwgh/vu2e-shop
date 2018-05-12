define(['text!view/panels/hpp-text-style.html'],function (html) {

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

	return {
		name: 'hpp-text-style',
		template: html,
		data: function () {
			var textStyle = new TextStyleData()
			// console.log(golbal)
			// var headStyle = golbal.headStyle
			// console.log(headStyle)
			return {
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
			data: {
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
			editorData: function () {
				return this.data
			}
		},
		methods: {
			init: function() {
				

				// console.log(this.headStyle)
				var  editorData = this.editorData;
				var  currentStyle = this.currentStyle
				var  editor = this.editor = editorData
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
				this.$emit('set-text-align', align)
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
				this.$root.back()
			}
		},
		created: function() {
			this.init()

			// console.log(this.global)
		}
	}
	

})