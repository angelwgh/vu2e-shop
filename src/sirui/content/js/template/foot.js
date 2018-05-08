;(function (root, factory) {
	if(!root.templates){
		root.templates = {}
	}

	root.templates.footer = factory(root)

})(this, function (window) {
	
	var html = '<p class="copyright">\
            Copyright © 2016-2019<a href="#" target="_blank">浙ICP备16006669号</a>义乌司睿知识产权代理有限公司 版权所有\
        </p>'

	function Footer() {
		this.temptext = html
    
	}

	Footer.prototype = {
		constructor: Footer,

		render: function (opt) {
			var el = typeof opt.el ==='string' ? $(opt.el): opt.el;
			el.html(this.temptext)
		}
	}


	return new Footer()


})