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

	var Canvas2Image = function () {

		// check if support sth.
		var $support = function () {
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d');

			return {
				canvas: !!ctx,
				imageData: !!ctx.getImageData,
				dataURL: !!canvas.toDataURL,
				btoa: !!window.btoa
			};
		}();

		var downloadMime = 'image/octet-stream';

		function scaleCanvas (canvas, width, height) {
			var w = canvas.width,
				h = canvas.height;
			if (width == undefined) {
				width = w;
			}
			if (height == undefined) {
				height = h;
			}

			var retCanvas = document.createElement('canvas');
			var retCtx = retCanvas.getContext('2d');
			retCanvas.width = width;
			retCanvas.height = height;
			retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
			return retCanvas;
		}

		function getDataURL (canvas, type, width, height) {
			canvas = scaleCanvas(canvas, width, height);
			return canvas.toDataURL(type);
		}

		function saveFile (strData,filename) {
			var save_link = document.createElement('a');
			save_link.href = strData;
			save_link.download = filename;
			var event = new MouseEvent('click',{"bubbles":false, "cancelable":false});
			save_link.dispatchEvent(event);

		}

		function genImage(strData) {
			var img = document.createElement('img');
			img.src = strData;
			return img;
		}
		function fixType (type) {
			type = type.toLowerCase().replace(/jpg/i, 'jpeg');
			var r = type.match(/png|jpeg|bmp|gif/)[0];
			return 'image/' + r;
		}
		function encodeData (data) {
			if (!window.btoa) { throw 'btoa undefined' }
			var str = '';
			if (typeof data == 'string') {
				str = data;
			} else {
				for (var i = 0; i < data.length; i ++) {
					str += String.fromCharCode(data[i]);
				}
			}

			return btoa(str);
		}
		function getImageData (canvas) {
			var w = canvas.width,
				h = canvas.height;
			return canvas.getContext('2d').getImageData(0, 0, w, h);
		}
		function makeURI (strData, type) {
			return 'data:' + type + ';base64,' + strData;
		}


		/**
		 * create bitmap image
		 * 按照规则生成图片响应头和响应体
		 */
		var genBitmapImage = function (oData) {

			//
			// BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
			// BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
			//

			var biWidth  = oData.width;
			var biHeight	= oData.height;
			var biSizeImage = biWidth * biHeight * 3;
			var bfSize  = biSizeImage + 54; // total header size = 54 bytes

			//
			//  typedef struct tagBITMAPFILEHEADER {
			//  	WORD bfType;
			//  	DWORD bfSize;
			//  	WORD bfReserved1;
			//  	WORD bfReserved2;
			//  	DWORD bfOffBits;
			//  } BITMAPFILEHEADER;
			//
			var BITMAPFILEHEADER = [
				// WORD bfType -- The file type signature; must be "BM"
				0x42, 0x4D,
				// DWORD bfSize -- The size, in bytes, of the bitmap file
				bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
				// WORD bfReserved1 -- Reserved; must be zero
				0, 0,
				// WORD bfReserved2 -- Reserved; must be zero
				0, 0,
				// DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
				54, 0, 0, 0
			];

			//
			//  typedef struct tagBITMAPINFOHEADER {
			//  	DWORD biSize;
			//  	LONG  biWidth;
			//  	LONG  biHeight;
			//  	WORD  biPlanes;
			//  	WORD  biBitCount;
			//  	DWORD biCompression;
			//  	DWORD biSizeImage;
			//  	LONG  biXPelsPerMeter;
			//  	LONG  biYPelsPerMeter;
			//  	DWORD biClrUsed;
			//  	DWORD biClrImportant;
			//  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
			//
			var BITMAPINFOHEADER = [
				// DWORD biSize -- The number of bytes required by the structure
				40, 0, 0, 0,
				// LONG biWidth -- The width of the bitmap, in pixels
				biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
				// LONG biHeight -- The height of the bitmap, in pixels
				biHeight & 0xff, biHeight >> 8  & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
				// WORD biPlanes -- The number of planes for the target device. This value must be set to 1
				1, 0,
				// WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
				// has a maximum of 2^24 colors (16777216, Truecolor)
				24, 0,
				// DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
				0, 0, 0, 0,
				// DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
				biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
				// LONG biXPelsPerMeter, unused
				0,0,0,0,
				// LONG biYPelsPerMeter, unused
				0,0,0,0,
				// DWORD biClrUsed, the number of color indexes of palette, unused
				0,0,0,0,
				// DWORD biClrImportant, unused
				0,0,0,0
			];

			var iPadding = (4 - ((biWidth * 3) % 4)) % 4;

			var aImgData = oData.data;

			var strPixelData = '';
			var biWidth4 = biWidth<<2;
			var y = biHeight;
			var fromCharCode = String.fromCharCode;

			do {
				var iOffsetY = biWidth4*(y-1);
				var strPixelRow = '';
				for (var x = 0; x < biWidth; x++) {
					var iOffsetX = x<<2;
					strPixelRow += fromCharCode(aImgData[iOffsetY+iOffsetX+2]) +
								   fromCharCode(aImgData[iOffsetY+iOffsetX+1]) +
								   fromCharCode(aImgData[iOffsetY+iOffsetX]);
				}

				for (var c = 0; c < iPadding; c++) {
					strPixelRow += String.fromCharCode(0);
				}

				strPixelData += strPixelRow;
			} while (--y);

			var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

			return strEncoded;
		};

		
		/**
		 * [saveAsImage]
		 * @param  {[obj]} canvas   [canvasElement]
		 * @param  {[Number]} width    [optional] png width
		 * @param  {[Number]} height   [optional] png height
		 * @param  {[String]} type     [image type]
		 * @param  {[String]} filename [image filename]
		 * @return {[type]}          [description]
		 */
		var saveAsImage = function (canvas, width, height, type,filename) {
			if ($support.canvas && $support.dataURL) {
				if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
				if (type == undefined) { type = 'png'; }
				filename = filename == undefined||filename.length === 0 ?Date.now()+'.'+type: filename+'.'+type
				type = fixType(type);

				if (/bmp/.test(type)) {
					var data = getImageData(scaleCanvas(canvas, width, height));
					var strData = genBitmapImage(data);

					saveFile(makeURI(strData, downloadMimedownloadMime),filename);
				} else {
					var strData = getDataURL(canvas, type, width, height);
					saveFile(strData.replace(type, downloadMime),filename);
				}
			}
		};

		var convertToImage = function (canvas, width, height, type) {
			if ($support.canvas && $support.dataURL) {
				if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
				if (type == undefined) { type = 'png'; }
				type = fixType(type);

				if (/bmp/.test(type)) {
					var data = getImageData(scaleCanvas(canvas, width, height));
					var strData = genBitmapImage(data);
					return genImage(makeURI(strData, 'image/bmp'));
				} else {
					var strData = getDataURL(canvas, type, width, height);
					return genImage(strData);
				}
			}
		};


		return {
			saveAsImage: saveAsImage,
			saveAsPNG: function (canvas, width, height, fileName) {
				return saveAsImage(canvas, width, height, 'png',fileName);
			},
			saveAsJPEG: function (canvas, width, height, fileName) {
				return saveAsImage(canvas, width, height, 'jpeg',fileName);
			},
			saveAsGIF: function (canvas, width, height, fileName) {
				return saveAsImage(canvas, width, height, 'gif',fileName);
			},
			saveAsBMP: function (canvas, width, height, fileName) {
				return saveAsImage(canvas, width, height, 'bmp',fileName);
			},

			convertToImage: convertToImage,
			convertToPNG: function (canvas, width, height) {
				return convertToImage(canvas, width, height, 'png');
			},
			convertToJPEG: function (canvas, width, height) {
				return convertToImage(canvas, width, height, 'jpeg');
			},
			convertToGIF: function (canvas, width, height) {
				return convertToImage(canvas, width, height, 'gif');
			},
			convertToBMP: function (canvas, width, height) {
				return convertToImage(canvas, width, height, 'bmp');
			}
		};

	}();

	function checkChange(data, module) {
		var _max_height = module.height
		var _max_width = golbal.width;

		(data.width > _max_width) && (data.width = _max_width);
		(data.height > _max_height) && (data.height = _max_height);
		console.log(data.height)

		if(data.left <= 0){
			data.left = 0;
		}

		if(data.top <= 0){
			data.top =0
		}

		// console.log(_max_height)
		if(data.left + data.width >= window.innerWidth){
			data.left = window.innerWidth - data.width
		}

		// console.log(_max_height)
		if(data.top + data.height >= _max_height){
			data.top = _max_height - data.height
		}
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

	function Util() {

		this.checkChange = checkChange
		this.Change = Change
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
		Canvas2Image: Canvas2Image,
		MyCanvas: MyCanvas,

	}


	return new Util()
})