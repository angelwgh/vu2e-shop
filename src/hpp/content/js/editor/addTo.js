(function (root, factory) {
	root.addTo = factory(root)
})(this, function (root) {

	// 文字模板
	function TextTemplate(opt) {
		var obj = {
			name: 'template',
			type: 'text',
			componentName: 'text-container',
			content:'',
			top:10,
			left:'10%',
			defaultWidth: '80%',
			width: '80%',
			defaultHeight:100,
			height: 100,
			rotate:0,
			scaleX:1,
			scaleY:1,
			lineHeight:1,
			fontFamily: 'Microsoft YaHei',
			fontSize: 30,
			letterSpacing: 0,
			color: '#000',
			textAlign: 'center',
			webkitTextStrokeColor: 'transparent',
			webkitTextStrokeWidth: 1,
			locked:false,
			focus: false,
		}

		// for(var key in obj) {
		// 	this[key] = obj[key]
		// }
		this.data = obj
		this.init(opt)
	}

	TextTemplate.prototype =  {
		init: function (opt) {
			console.log(opt)
			var temp = '_temp' + opt.name.replace('text_', '')
			// if(typeof opt !== 'object' || opt === null) return
			this[temp]()
			// for(var key in opt) {
			// 	this[key] = opt[key]
			// }
		},
		config: function (options) {
			for(var k in options){
				this.data[k] = options[k]
			}

			this.data.defaultWidth = this.data.width;
			this.data.defaultHeight = this.data.height;
		},
		_temp1: function () {
			// console.log('模块2')

		},
		_temp2: function () {
			// this.rotate = 90
			// this.width = 200;
			this.data.left='30%';
			this.data.width= '40%';
			this.data.height = 200
			this.data.top = 30
			console.log('模块3')
		},
		_temp3: function () {
			console.log('模块4')
		},
		_temp4: function () {
			console.log('模块5')
		},
		_temp5: function () {
			console.log('模块6')
		}



	};




	// 图片模板

	function ImgTemplate(opt) {
		var obj = {
			type: 'img',
			componentName: 'img-container',
			locked:false,
			src:'',
			top:0,
			left:0,
			width: '100%',
			height: 60,
			rotate:0,
			backgroundColor:'transparent',
			borderColor:'transparent',
			borderWidth:0,
			borderStyle:'solid',
			// border: '0px solid #000',
			borderRadiusWidth:0,

			
			fixed:false,
			borderTopLeftRadius_w:0,
			borderTopLeftRadius_h:0,
			borderTopRightRadius_w:0,
			borderTopRightRadius_h:0,
			borderBottomLeftRadius_w: 0,
			borderBottomLeftRadius_h: 0,
			borderBottomRightRadius_w:0,
			borderBottomRightRadius_h:0,
			clipType:''
		};

		for(var key in obj) {
			this[key] = obj[key]
		}
		this.data = obj
		this.init(opt)
		
	}

	ImgTemplate.prototype =  {
		init: function (opt) {
			console.log(opt)
			// if(!opt) return;
			var temp = '_temp' + opt.name.replace('img_', '')
			// if(typeof opt !== 'object' || opt === null) return
			this[temp]()
			// for(var key in opt) {
			// 	this[key] = opt[key]
			// }
		},
		config: function (options) {
			for(var k in options){
				this.data[k] = options[k]
			}
		},
		_temp1: function () {
			// console.log('模块2')
			this.data.width = window.innerWidth - 20;
			this.data.height = this.data.width;
			this.data.left = 10;
			this.data.top = 10
		},
		_temp2: function () {
			this._temp1()
			this.data.borderRadiusWidth = 20
			this.data.borderTopLeftRadius_w = 20
			this.data.borderTopLeftRadius_h = 20
			this.data.borderTopRightRadius_w = 20
			this.data.borderTopRightRadius_h = 20
			this.data.borderBottomLeftRadius_w = 20
			this.data.borderBottomLeftRadius_h = 20
			this.data.borderBottomRightRadius_w = 20
			this.data.borderBottomRightRadius_h = 20
			console.log('模块2')
		},
		_temp3: function () {
			this._temp1();
			// this.borderRadiusWidth = 20
			// this.borderTopLeftRadius_w = 20
			// this.borderTopLeftRadius_h = 20
			// this.borderTopRightRadius_w = 20
			// this.borderTopRightRadius_h = 20
			this.data.clipType="clip3"
			console.log('模块3')
		},
		_temp4: function () {
			
			this._temp1();
			var width = this.data.width
			this.data.borderRadiusWidth = width/2
			this.data.borderTopLeftRadius_w = width/2
			this.data.borderTopLeftRadius_h = width/2
			this.data.borderTopRightRadius_w = width/2
			this.data.borderTopRightRadius_h = width/2
			this.data.borderBottomLeftRadius_w = width/2
			this.data.borderBottomLeftRadius_h = width/2
			this.data.borderBottomRightRadius_w = width/2
			this.data.borderBottomRightRadius_h = width/2
			console.log('模块4')
		},
		_temp5: function () {
			this._temp1();
			this.data.clipType = 'clip5'

			// console.log('模块5')
		},

		_temp6: function () {
			this._temp1()
			this.data.clipType="clip6"
			// console.log('模块6')
		},
		_temp7: function () {
			this._temp1()
			this.data.clipType="clip7"
			// console.log('模块7')
		},
		_temp8: function () {
			this._temp1()
			this._temp3()
			this.data.clipType="clip8"
			// console.log('模块8')
		},
		_temp9: function () {
			this._temp1()
			this.data.clipType="clip9"
			// console.log('模块9')
		},
		_temp10: function () {
			this._temp1()
			this.data.clipType="clip10"
			// console.log('模块10')
		},

		_temp11: function () {
			this._temp1()
			this.data.clipType="clip11"
			// console.log('模块10')
		},
		_temp12: function () {
			this._temp1()
			this.data.clipType="clip12"
			// console.log('模块10')
		},
		_temp13: function () {
			this._temp1()
			this.data.clipType="clip13"
			// console.log('模块10')
		},
		_temp14: function () {
			this._temp1()
			this.data.clipType="clip14"
			// console.log('模块10')
		},
		_temp15: function () {
			this._temp1()
			this.data.clipType="clip15"
			// console.log('模块10')
		}
	};

// 模块
	function ModuleTemplate (height) {

			this.editors=[];
			this.type= 'module';
			this.width='100%';
			this.height=800;
			this.data = {
				editors: [],
				type: 'module',
				width: '100%',
				height: 800
			}
			this.init(height)
	}

	ModuleTemplate.prototype = {

		init: function (height) {
			if(height) {
				this.data.height = height
			}
			
		},
		addEditor: function () {
			for(var i = 0; i < arguments.length; i++){
				this.data.editors.push(arguments[i])
			}
			
		}
	}


// 产品细节图
function Detail(item) {
	
	this.item = item
	this.init()
}

Detail.prototype = {
	init: function () {
		// console.log(this.item)
		var type = this.item.name.match(/_(\d+)/)[1]
		this.type = 'detail_' + type
		// console.log(this.type)
		this.moduleTemplate = new ModuleTemplate()
		// this.module = ().data
		this.events()[this.type]()

	},

	events: function () {
		var self = this

		return {
			detail_1: function () {
				var img_1 = new ImgTemplate({name:'8'})
				var img_2 = new ImgTemplate({name:'9'})
				img_2.data.top = img_1.data.top + img_1.data.height - 20
				self.moduleTemplate.addEditor(img_1.data,img_2.data)
				self.module = self.moduleTemplate.data
				self.module.height = img_2.data.top + img_2.data.height + 10
			},
			detail_2: function () {
				var img_1 = new ImgTemplate({name:'8'})
				var img_2 = new ImgTemplate({name:'11'})
				img_2.data.top = img_1.data.top + img_1.data.height - 20
				self.moduleTemplate.addEditor(img_1.data,img_2.data)
				self.module = self.moduleTemplate.data
				self.module.height = img_2.data.top + img_2.data.height + 10
			},
			detail_3: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'1'})
				var img_2 = new ImgTemplate({name:'1'})
				var text_1 = new TextTemplate({name: '1'})
				// console.log(22222222222222222222)
				img_1.config({
					width: w * 0.4,
					height: w,
					left: w * 0.05
				})
				
				img_2.config({
					width: w * 0.4,
					height: w * 0.4,
					left: w * 0.55
				})

				text_1.config({
					left: w * 0.55,
					width: w * 0.4,
					height: w * 0.4,
					top: w * 0.6 + 10,
					textAlign: ''
				})
				// text_1.data.left = w * 0.45;
				// text_1.data.

				// img_2.data.top = img_1.data.top + img_1.data.height - 20
				self.moduleTemplate.addEditor(img_1.data,img_2.data,text_1.data)
				self.module = self.moduleTemplate.data
				self.module.height = img_1.data.top + img_1.data.height + 10
			},
			detail_4: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'1'})
				var img_2 = new ImgTemplate({name:'1'})
				var text_1 = new TextTemplate({name: '1'})
				// console.log(22222222222222222222)
				img_1.config({
					width: w * 0.4,
					height: w * 0.4,
					left: w * 0.05,
					top: w * 0.6 + 10,
				})
				
				img_2.config({
					width: w * 0.4,
					height: w,
					left: w * 0.55
				})

				text_1.config({
					left: w * 0.05,
					width: w * 0.4,
					height: w * 0.4,
					
					textAlign: ''
				})
				// text_1.data.left = w * 0.45;
				// text_1.data.

				// img_2.data.top = img_1.data.top + img_1.data.height - 20
				self.moduleTemplate.addEditor(img_1.data,img_2.data,text_1.data)
				self.module = self.moduleTemplate.data
				self.module.height = img_2.data.top + img_2.data.height + 10
			},
			detail_5: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'1'})
				var img_2 = new ImgTemplate({name:'1'})
				var img_3 = new ImgTemplate({name:'1'})
				var text_1 = new TextTemplate({name: '1'})
				// console.log(22222222222222222222)
				img_1.config({
					width: w * 0.4,
					height: w,
					left: w * 0.05
				})
				
				img_2.config({
					width: w * 0.4,
					height: w * 0.4,
					left: w * 0.55
				})

				text_1.config({
					left: w * 0.55,
					width: w * 0.4,
					height: w * 0.16,
					top: w * 0.42 + 10,
					textAlign: ''
				})

				img_3.config({
					top: w * 0.6 + 10,
					width: w * 0.4,
					height: w * 0.4,
					left: w * 0.55
				})
				// text_1.data.left = w * 0.45;
				// text_1.data.

				// img_2.data.top = img_1.data.top + img_1.data.height - 20
				self.moduleTemplate.addEditor(img_1.data,img_2.data,text_1.data,img_3.data)
				self.module = self.moduleTemplate.data
				self.module.height = img_1.data.top + img_1.data.height + 10
			},
			detail_6: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'1'})
				var img_2 = new ImgTemplate({name:'1'})
				var img_3 = new ImgTemplate({name:'1'})
				var text_1 = new TextTemplate({name: '1'})
				// console.log(22222222222222222222)
				img_1.config({
					width: w * 0.9,
					height: w * 0.45,
					left: w * 0.05
				})
				
				img_2.config({
					width: w * 0.45,
					height: w * 0.45,
					left: w * 0.5,
					top: w*0.45 + 10 + 10
				})

				text_1.config({
					left: w * 0.05,
					width: w * 0.4,
					height: w * 0.45,
					top: w*0.45 + 10 + 10,
					// top: w * 0.42 + 10,
					textAlign: ''
				})

				// img_3.config({
				// 	top: w * 0.6 + 10,
				// 	width: w * 0.4,
				// 	height: w * 0.4,
				// 	left: w * 0.55
				// })
				// text_1.data.left = w * 0.45;
				// text_1.data.

				// img_2.data.top = img_1.data.top + img_1.data.height - 20
				self.moduleTemplate.addEditor(img_1.data,img_2.data,text_1.data)
				self.module = self.moduleTemplate.data
				self.module.height = w + 10
			},
			detail_7: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'12'})
				var text_1 = new TextTemplate({name: '1'})
				var img_2 = new ImgTemplate({name:'13'})

				img_1.config({
					width: w * 0.9,
					height: w * 0.45,
					left: w * 0.05
				})
				img_2.config({
					width: w* 0.45,
					height: w* 0.45,
					left: w*0.5,
					top: w*0.45 + 20
				})
				text_1.config({
					width: w*0.4,
					height: w * 0.45,
					left: w*0.05,
					top: w*0.45 + 20,
					textAlign: '',
				})
				self.moduleTemplate.addEditor(img_1.data, img_2.data, text_1.data)
				self.module = self.moduleTemplate.data
				self.module.height = w + 10
			},
			detail_8: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'14'})
				var img_2 = new ImgTemplate({name:'12'})

				img_1.config({
					width: w * 0.9,
					height: w * 0.45,
					left: w * 0.05
				})
				img_2.config({
					width: w* 0.9,
					height: w* 0.45,
					left: w*0.05,
					top: w*0.45
				})

				self.moduleTemplate.addEditor(img_1.data, img_2.data)
				self.module = self.moduleTemplate.data
				self.module.height = w - 10
			},
			detail_9: function () {
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'1'})
				var img_2 = new ImgTemplate({name:'1'})
				var img_3 = new ImgTemplate({name:'1'})

				img_1.config({
					width: w * 0.9,
					height: w * 0.45,
					left: w * 0.05
				})
				img_2.config({
					width: w* 0.45,
					height: w* 0.45,
					left: w*0.05,
					top: w*0.45 + 20
				})
				img_3.config({
					width: w* 0.45,
					height: w* 0.45,
					left: w*0.5,
					top: w*0.45 + 20
				})

				self.moduleTemplate.addEditor(img_1.data, img_2.data, img_3.data)
				self.module = self.moduleTemplate.data
				self.module.height = w - 10
			},

			detail_10: function () {
				// console.log('detail10')
				var w = window.innerWidth;
				var img_1 = new ImgTemplate({name:'1'})
				var img_2 = new ImgTemplate({name:'1'})
				var img_3 = new ImgTemplate({name:'1'})
				var img_4 = new ImgTemplate({name:'1'})

				img_1.config({
					width: w * 0.3,
					height: w * 0.3,
					left: w * 0.05
				})
				img_2.config({
					width: w* 0.3,
					height: w* 0.3,
					left: w*0.35
				})
				img_3.config({
					width: w* 0.3,
					height: w* 0.3,
					left: w*0.65,
				})

				img_4.config({
					width: w* 0.9,
					height: w* 0.45,
					left: w*0.05,
					top: w*0.3 + 20
				})

				self.moduleTemplate.addEditor(img_1.data, img_2.data, img_3.data, img_4.data)
				self.module = self.moduleTemplate.data
				self.module.height = w*.75 +30
			},

			detail_11: function () {
				var img_1 = new ImgTemplate({name:'4'})
				var img_2 = new ImgTemplate({name:'4'}) 
				var img_3 = new ImgTemplate({name:'4'})
				var img_4 = new ImgTemplate({name:'4'})
				var img_5 = new ImgTemplate({name:'4'})
				var w = window.innerWidth;
				img_1.config({
					width: w * 0.8,
					height: w * 0.8,
					left: w * 0.1,
					top: w * 0.1
				})

				img_2.config({
					width: w * 0.2,
					height: w * 0.2,
					left: w * 0.1,
					top: w * 0.1
				})

				img_3.config({
					width: w * 0.2,
					height: w * 0.2,
					left: w * 0.7,
					top: w * 0.1
				})
				img_4.config({
					width: w * 0.2,
					height: w * 0.2,
					left: w * 0.1,
					top: w * 0.7
				})
				img_5.config({
					width: w * 0.2,
					height: w * 0.2,
					left: w * 0.7,
					top: w * 0.7
				})

				self.moduleTemplate.addEditor(img_1.data, img_2.data, img_3.data, img_4.data, img_5.data)
				self.module = self.moduleTemplate.data
				self.module.height = w
			},

			detail_12: function () {
				var img_1 = new ImgTemplate({name:'15'})
				var img_2 = new ImgTemplate({name:'4'})
				var text_1 = new TextTemplate({name: '1'})
				var w = window.innerWidth;

				img_1.config({
					width: w * 0.8,
					height: w * 0.5,
					left: w * 0.1,
					top: w * 0.3
				})

				img_2.config({
					width: w * 0.4,
					height: w* 0.4,
					left: w * 0.05,
					top: w*0.1,
				})
				text_1.config({
					width: w*0.4,
					height: w * 0.15,
					left: w * 0.5,
					top: w * 0.1,
					textAlign:''
				})

				self.moduleTemplate.addEditor(img_1.data, img_2.data,text_1.data)
				self.module = self.moduleTemplate.data
				self.module.height = w
			}

		}
	}
};



	var EVENTMAP = {
		'text': 'addTextContent',
		'img' : 'addImgContent',
		'detail': 'addDetail',
		"add_video": "addVideo",
		'other': 'addOther',
		'module': 'addModule'
	}
	var AddTo = function () {
		this.init()
	}

	AddTo.prototype = {
		constructor: AddTo,

		init: function () {
			
		},

		add: function (item, moduleIndex, editorIndex, editModules) {
			var type = item ? item.type : 'module'
			this.item = item;
			this.editModules = editModules;
			this.moduleIndex = moduleIndex;
			this.editorIndex = editorIndex
			this.currentMoule = editModules[moduleIndex]
			this.currentEditor = moduleIndex > -1 ? this.currentMoule.editors[editorIndex] : undefined
			// console.log(this)
			this[EVENTMAP[type]]()
		},

		addTextContent: function () {
			if(this.moduleIndex == -1){
				this.addModule()
				this.currentMoule = this.editModules[this.moduleIndex]
			}
			var textContent = (new TextTemplate(this.item)).data
			var editors;
			if(this.moduleIndex > -1){
				editors = this.currentMoule.editors
				editors.push(textContent)
			}
			console.log(this.currentMoule.editors)
			this.editorIndex = editors.length - 1;
		},

		addImgContent: function () {
			if(this.moduleIndex == -1){
				this.addModule()
				this.currentMoule = this.editModules[this.moduleIndex]
			}
			var imgContent = (new ImgTemplate(this.item)).data
			var editors;
			if(this.moduleIndex > -1){
				editors = this.currentMoule.editors
				editors.push(imgContent)
			}
			this.editorIndex = editors.length - 1;
		},

		addDetail: function () {
			// console.log(this.item)
			// console.log('添加产品细节')
			var detail = new Detail(this.item)
			this.editModules.push(detail.module)
			this.editorIndex = -1;
			this.moduleIndex = this.editModules.length -1
			// this.currentMoule = this.editModules[this.moduleIndex]
		},

		addVideo: function () {
			
		},

		addOther: function () {
			
		},
		addModule: function () {
			var module 
			if(this.item){
				module = (new ModuleTemplate()).data

				this.editModules.push(module);
				this.editorIndex = -1;
				this.moduleIndex = this.editModules.length -1
			}else {
				module = (new ModuleTemplate()).data

				this.editModules.push(module);
				this.editorIndex = -1;
				this.moduleIndex = this.editModules.length -1
			}
		}
	};

	return new AddTo()
})