(function (root, factory) {
	root.util = factory(root)
})(this, function (window) {
	function Util() {
		
	}


	Util.prototype = {
		constructor: Util,

		/**
		*	分割数组
		*/
		cutArray: function (array, num) {
			console.log(1)
			var len = array.length,
				result = [],
				sub_arr = [],
				i = 0;

			for( ; i< len; i++){
				sub_arr.push(array[i])

				if(i !==0 && (i+1)%num ===0 || i == len-1){
					result.push(sub_arr);
					sub_arr = []
				}
				

			}

			return result;
		},

		getUrlParam: function(name) {
	      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	      var r = window.location.search.substr(1).match(reg); //匹配目标参数
	      if (r != null) return unescape(r[2]); return null; //返回参数值
	    }
	};

	return new Util()
})