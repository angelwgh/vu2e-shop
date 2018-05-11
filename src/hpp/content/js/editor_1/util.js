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


		// 检查尺寸， 不超过显示范围
		checkSize: function () {

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
		}
	};

	return {
		Change: Change,
		hasClass: hasClass
	}

})