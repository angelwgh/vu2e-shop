(function (root, factory) {
	root.util = factory(root)
})(this,function (root) {
	function MyCanvas(options, data) {
		this.canvas = document.createElement('canvas')
		// this.canvas = document.getElementById("canva")
		// console.log(this.canvas)
		this.options = options
		this.data = data
		this._init()
	}

	MyCanvas.prototype = {
		_init: function () {
			var canvas = this.canvas;
			var opt = this.options;

			this.width = canvas.width = opt.width * 2;
			this.height = canvas.height = opt.height * 2;
			this.clipType = opt.clipType;
			this.src = opt.src

			// this.width = this.width*2
			// this.height = this.height*2
		},

		draw: function () {
			// console.log(this)
			
			this.clip()
		},

		clip: function () {
			// var ctx = this.canvas.getContext('2d');
			console.log(this.options.backgroundColor)
			// ctx.fillStyle = 'transparent';
			// ctx.fillRect(0,0, this.width, this.height);
			// this.clip1()
			var  ctx = this.canvas.getContext('2d');
			if(this.clipType){
				this[this.clipType](ctx)
			}
			if(this.options.src){
				this.drawImage(ctx)
			}else {
				this.drawBgColor(ctx)
			}
			// this.imgData = this.canvas.toDataURL()
		},
		clip3: function (ctx) {
			// body...
			// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
			// 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
			var w = this.width, h = this.height, d = h / 5;
			ctx.strokeStyle= 'transparent';
			// console.log('clik3')
			ctx.beginPath();
			ctx.moveTo(0, d);
			ctx.bezierCurveTo(0,0,0,0,d,0)
			ctx.lineTo(w - d,0);
			ctx.bezierCurveTo(w,0,w,0,w,d)
			ctx.lineTo(w,h);
			ctx.lineTo(0,h);
			ctx.lineTo(0,d);
			ctx.stroke();
			ctx.clip()

		},
		clip5: function (ctx) {
			// body...
			// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
			// 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
			var w = this.width, h = this.height, d = h / 10;
			ctx.strokeStyle= 'transparent';
			// console.log('clik3')
			ctx.beginPath();
			ctx.moveTo(0, d);
			ctx.bezierCurveTo(w/2,0,w/2,0,w,d)
			ctx.lineTo(w,h -d);
			ctx.bezierCurveTo(w/2,h,w/2,h,0,h-d)
			ctx.lineTo(0,d);
			ctx.stroke();
			ctx.clip()

		},
		clip6: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 10;
			ctx.strokeStyle= 'transparent';
			// console.log(ctx.strokeStyle)
			ctx.beginPath();
			ctx.moveTo(0 ,d);
			ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			ctx.lineTo(w,h);
			ctx.bezierCurveTo(w/2 ,h - d/2, w/2 , h - d/2, 0, h);
			ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},
		clip7: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 8;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			ctx.beginPath();
			ctx.moveTo(0 ,0);
			// ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			ctx.lineTo(w, 0)
			ctx.lineTo(w,h);
			ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},

		clip8: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 8;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			ctx.beginPath();
			ctx.moveTo(0, d);
			ctx.bezierCurveTo(0,0,0,0,d,0)
			ctx.lineTo(w - d,0);
			ctx.bezierCurveTo(w,0,w,0,w,d)

			// ctx.moveTo(0 ,0);
			// // ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			ctx.lineTo(w,h);
			ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},

		clip9: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 10
			ctx.strokeStyle=this.options.borderColor || 'transparent'
			ctx.beginPath();
			ctx.moveTo(0,0)
			ctx.bezierCurveTo(w/2, 0 , w/2, d ,  w, d);
			// ctx.lineTo(800,100);
			ctx.lineTo(w,h);
			ctx.bezierCurveTo(w/2 ,h , w/2 , h - d/2,  0,h - d);
			// ctx.lineTo(0,500);
			ctx.lineTo(0, 0);
			ctx.stroke();
			ctx.clip()
		},
		clip10: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = w / 10
			ctx.strokeStyle=this.options.borderColor || 'transparent'
			ctx.beginPath();
			ctx.moveTo(0,0)
			ctx.lineTo(w, 0);
			ctx.lineTo(w - d, h- 10);
			ctx.quadraticCurveTo(w - d ,h, w - d - 10 , h);
			ctx.lineTo( d + 10,h);
			ctx.quadraticCurveTo(d, h, d, h-10)
			// ctx.lineTo(w,h);
			// ctx.bezierCurveTo(w/2 ,h , w/2 , h - d/2,  0,h - d);
			// ctx.lineTo(0,500);
			ctx.lineTo(0, 0);
			ctx.stroke();
			ctx.clip()
		},

		clip11: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 8;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			// ctx.beginPath();
			// ctx.moveTo(0, d);
			// ctx.bezierCurveTo(0,0,0,0,d,0)
			// ctx.lineTo(w - d,0);
			// ctx.bezierCurveTo(w,0,w,0,w,d)
			ctx.beginPath();
			ctx.moveTo(0 ,0);
			ctx.bezierCurveTo(w/2 ,0 , w/2 , d, w, d);
			// ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			ctx.lineTo(w, 0)
			ctx.lineTo(w,h);
			// ctx.bezierCurveTo(w,h,w,h,w-d,h)
			ctx.lineTo(0,h)
			// ctx.bezierCurveTo(0,h,0,h,0,h-d)
			// ctx.moveTo(0 ,0);
			// // ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			ctx.lineTo(0,d);
			// ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			// ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},
		clip12: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 5;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			// ctx.beginPath();
			// ctx.moveTo(0, d);
			// ctx.bezierCurveTo(0,0,0,0,d,0)
			// ctx.lineTo(w - d,0);
			// ctx.bezierCurveTo(w,0,w,0,w,d)
			ctx.beginPath();
			ctx.moveTo(0 ,d);
			// ctx.bezierCurveTo(w/2 ,0 , w/2 , d, w, d);
			// ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			ctx.lineTo(w, 0)
			ctx.lineTo(w,h-d);
			// ctx.bezierCurveTo(w,h,w,h,w-d,h)
			ctx.lineTo(0,h)
			// ctx.bezierCurveTo(0,h,0,h,0,h-d)
			// ctx.moveTo(0 ,0);
			// // ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			ctx.lineTo(0,d);
			// ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			// ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},
		clip13: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 10;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			// ctx.beginPath();
			// ctx.moveTo(0, d);
			// ctx.bezierCurveTo(0,0,0,0,d,0)
			// ctx.lineTo(w - d,0);
			// ctx.bezierCurveTo(w,0,w,0,w,d)
			ctx.beginPath();
			ctx.moveTo(0 ,d);
			// ctx.bezierCurveTo(w/2 ,0 , w/2 , d, w, d);
			// ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			ctx.lineTo(w, 0)
			ctx.lineTo(w,h-d);
			// ctx.bezierCurveTo(w,h,w,h,w-d,h)
			ctx.lineTo(0,h)
			// ctx.bezierCurveTo(0,h,0,h,0,h-d)
			// ctx.moveTo(0 ,0);
			// // ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			ctx.lineTo(0,d);
			// ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			// ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},
		clip14: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 5;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			// ctx.beginPath();
			// ctx.moveTo(0, d);
			// ctx.bezierCurveTo(0,0,0,0,d,0)
			// ctx.lineTo(w - d,0);
			// ctx.bezierCurveTo(w,0,w,0,w,d)
			ctx.beginPath();
			ctx.moveTo(0 ,0);
			// ctx.bezierCurveTo(w/2 ,0 , w/2 , d, w, d);
			// ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			ctx.lineTo(w, 0)
			ctx.lineTo(w,h-d);
			// ctx.bezierCurveTo(w,h,w,h,w-d,h)
			ctx.lineTo(0,h)
			// ctx.bezierCurveTo(0,h,0,h,0,h-d)
			// ctx.moveTo(0 ,0);
			// // ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			ctx.lineTo(0,0);
			// ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			// ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},
		clip15: function (ctx) {
			// var ctx = this.canvas.getContext('2d');
			var w = this.width, h = this.height, d = h / 5;
			ctx.strokeStyle=  'transparent';
			// console.log(ctx.strokeStyle)
			// ctx.beginPath();
			// ctx.moveTo(0, d);
			// ctx.bezierCurveTo(0,0,0,0,d,0)
			// ctx.lineTo(w - d,0);
			// ctx.bezierCurveTo(w,0,w,0,w,d)
			ctx.beginPath();
			ctx.moveTo(0 ,h / 12 * 5);
			ctx.bezierCurveTo(w/6, h *0.6, w/2, h*0.6, w/2, 0)
			ctx.lineTo(w,0)
			ctx.lineTo(w,h)
			ctx.lineTo(0,h)
			ctx.lineTo(0, h/3)
			// ctx.bezierCurveTo(w/2 ,0 , w/2 , d, w, d);
			// ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			// ctx.lineTo(w,h-d);
			// ctx.bezierCurveTo(w,h,w,h,w-d,h)
			// ctx.lineTo(0,h)
			// ctx.bezierCurveTo(0,h,0,h,0,h-d)
			// ctx.moveTo(0 ,0);
			// // ctx.bezierCurveTo(w/2, 0 , w/2, 0 ,  w, d);
			// ctx.lineTo(w, 0)
			// ctx.lineTo(0,0);
			// ctx.bezierCurveTo(w/2 ,h , w/2 , h - d, 0, h -d);
			// ctx.lineTo(0, d);
			ctx.stroke();
			ctx.clip()
		},

		drawBgColor: function (ctx) {
			// console.log('载入背景色')
			if(this.options.backgroundColor == 'transparent' || !this.options.backgroundColor){

				ctx.fillStyle = "#ccc";
				// this.imgData =  ''
			}else{
				// var ctx = this.canvas.getContext('2d');
			// console.log(this.options.backgroundColor)
				ctx.fillStyle = this.options.backgroundColor;
				
			}
			ctx.fillRect(0,0, this.width, this.height);
			this.data.src = this.canvas.toDataURL()

			// this.options.src = this.imgData
		},
		drawImage: function (ctx) {
			console.log('载入图片')
			var w = this.width, h = this.height;
			var canvas = this.canvas;
			// var ctx = canvas.getContext('2d');
			var self = this
			// console.lo()
			var img = new Image()
			img.src = this.options.src;
			// console.log(img.src)
			img.onload = function () {
				// console.dir(self)
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h)
				self.data.src = canvas.toDataURL()
				console.dir(self.data.src)
				// self.options.src = self.imgData

			}

		}

	};

	function Util() {
		
	}

	Util.prototype = {
		constructor:Util,

		isDom: function (obj) {
			return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType)); 
		},

		size: function(el) {
			
			return this.isDom(el)?
			{
				height: el.offsetHeight,
				width: el.offsetWidth
			}:
			{
				height: window.innerHeight,
				width: window.innerWidth
			}
		},

		width: function (el) {
			return this.size(el).width
		},

		height: function (el) {
			return this.size(el).height
		},

		parseSearch(search){
			if(typeof search !== 'string') return 
			var str = search.slice(1)
			var item = str.split(';')
			var obj = {}
			item.forEach(function(value){
				var arr = value.split('=')
				obj[arr[0]] = arr[1]
			})

			return obj;
		},

		MyCanvas: MyCanvas
	}


	return new Util()
})