define(function () {


	function hasClass(el, classname) {
		var classes = el.className.split(' ')
		for(var i = 0; i < classes.length; i++){
			if(classname=== classes[i])
				return true
		}

		return false;
		// console.log(classes)
	}


	function Change() {
		
	}

	Change.prototype= {
		constructor: Change,

		change: function (evt,type,data, module) {
			this._evt = evt
			this._data = data
			this._module = module
			this._max_height = module.height
			// console.log(type)
			this[type]()
		},


		move: function () {
			this._data.left += this._evt.deltaX;
			this._data.top += this._evt.deltaY

			this.checkSize()
		},

		bottom: function () {
			var rotate = this._data.rotate || 0;
			var height;
			var scaleY;

			height = this._data.height - 
					 this._evt.deltaX*Math.sin(rotate*Math.PI/180) + 
					 this._evt.deltaY*Math.cos(rotate*Math.PI/180)

			height = height > 0 ? height : 0;

			this._data.height = height;
		},

		top() {	
			var rotate = this._data.rotate || 0;
			const height = this._data.height + this._evt.deltaX*Math.sin(rotate*Math.PI/180) - this._evt.deltaY*Math.cos(rotate*Math.PI/180)
			const top = this._data.top -this._evt.deltaX*Math.sin(rotate*Math.PI/180) + this._evt.deltaY*Math.cos(rotate*Math.PI/180)
			if(top <= 0) return
			const maxTop =  top + height;
			console.log(top)
			this._data.height = height > 0 ? height : 0;
			this._data.top = top > maxTop ? maxTop : top
			// this._options.top = this._data.top + this._moduleTop
		},
		left() {
			var rotate = this._data.rotate || 0;
			const width = this._data.width - this._evt.deltaX*Math.cos(rotate*Math.PI/180) - this._evt.deltaY*Math.sin(rotate*Math.PI/180)
			const left = this._data.left +this._evt.deltaX*Math.cos(rotate*Math.PI/180) + this._evt.deltaY*Math.sin(rotate*Math.PI/180)
			const mxLeft = left + width;
			if(left <= 0 ) return;
			this._data.width = width > 0 ? width : 0;
			this._data.left = left > mxLeft ? mxLeft : left;

		},
		right () {
			var rotate = this._data.rotate || 0;
			console.log()
			var  width = this._data.width + this._evt.deltaX*Math.cos(rotate*Math.PI/180) + this._evt.deltaY*Math.sin(rotate*Math.PI/180)
			// var  left = this._data.left + 
			// var left = this._data.left + this._evt.deltaX / 2;
			console.log(this._evt.deltaY / 2)
			var top = this._data.top + this._evt.deltaY
			if(this._data.left + width >= window.innerWidth) return;
			// this.
			this._data.width = width > 0 ? width : 0;
		},
		corner1() {
			this.top()
			this.left()
		},

		corner2() {
			this.top()
			this.right()
		},

		corner3() {
			this.right()
			this.bottom()
		},

		corner4() {
			this.left()
			this.bottom()
		},

		// 检查尺寸， 不超过显示范围
		checkSize: function () {

			if(this._data.left <= 0){
				this._data.left = 0;
			}

			if(this._data.top <= 0){
				this._data.top =0
			}

			console.log(this._max_height)
			if(this._data.left + this._data.width >= window.innerWidth){
				this._data.left = window.innerWidth - this._data.width
			}

			// console.log(this._max_height)
			if(this._data.top + this._data.height >= this._max_height){
				this._data.top = this._max_height - this._data.height
			}
		}
	};

	return {
		Change: Change,
		hasClass: hasClass
	}

})